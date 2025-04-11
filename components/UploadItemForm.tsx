import {
  Button,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CATEGORIES } from "@/constants/Categories";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSearchSchema } from "@/constants/FormSchema";
import { z } from "zod";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { getMimeType } from "@/utils/getMimeTypes";
import { useRouter } from "expo-router";

export default function UploadItemForm({
  mode,
  userId,
}: {
  mode: "lost" | "found";
  userId: string | undefined;
}) {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDateVisible, setIsDateVisible] = useState<boolean>(false);
  const [isTimeVisible, setIsTimeVisible] = useState<boolean>(false);
  const [proofUrls, setProofUrls] = useState<string[]>(["", "", ""]);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm<z.infer<typeof postSearchSchema>>({
    resolver: zodResolver(postSearchSchema),
  });
  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setIsDateVisible(false);
    } else if (event.type === "set") {
      const newDate = selectedDate ?? currentDate;
      setCurrentDate(newDate);
      setIsDateVisible(false);
      setIsTimeVisible(true);
    }
  };

  const onTimeChange = (e: DateTimePickerEvent, selectedTime?: Date) => {
    if (e.type === "set") {
      const newTime = selectedTime ?? currentDate;
      setCurrentDate(newTime);
    }
    setIsTimeVisible(false);
  };
  const openFile = async () => {
    if (Platform.OS === "web") {
      return;
    }
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const selectedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
    });
    if (selectedImage.canceled) return;
    const imageUri = selectedImage.assets[0].uri;
    setProofUrls((prev) => {
      const updated = [...prev];
      const emptyIndex = updated.findIndex((val) => val === "");
      if (emptyIndex !== -1) {
        updated[emptyIndex] = imageUri;
      }
      return updated;
    });
  };

  const uploadToCloudinary = async (base64Images: string[]) => {
    setIsUploadingImage(true);
    const uploadPromises = base64Images
      .filter((img) => img)
      .map(async (base64Image) => {
        const formData = new FormData();
        formData.append(
          "file",
          `data:${getMimeType(base64Image)};base64,${base64Image}`,
        );
        formData.append("upload_preset", "lostfound");
        formData.append("folder", "lostfound"); // Specify folder name

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dupzzryrz/upload",
          {
            method: "POST",
            body: formData,
          },
        );

        const result = await response.json();
        if (result.secure_url) {
          return result.secure_url as string;
        } else {
          throw new Error("Failed to upload image");
        }
      });

    return Promise.all(uploadPromises).then((res) => {
      setIsUploadingImage(false);
      return res;
    });
  };

  const onSubmit: SubmitHandler<z.infer<typeof postSearchSchema>> = async (
    data,
  ) => {
    if (!userId) return;
    const formData = data;

    try {
      const base64Images = await Promise.all(
        proofUrls
          .filter((proof) => proof)
          .map(async (uri) => {
            return await FileSystem.readAsStringAsync(uri, {
              encoding: FileSystem.EncodingType.Base64,
            });
          }),
      );
      const uploadedImageUrls = await uploadToCloudinary(base64Images);

      const res = await fetch(
        `https://lost-and-found-chi.vercel.app/api/expo/upload/${mode === "found" ? "found-item" : "my-item"}/${userId}`,
        {
          method: "POST",
          body: JSON.stringify({ ...formData, itemProof: uploadedImageUrls }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        throw new Error(`Fetch failed with status ${res.status}`);
      }

      const { item } = await res.json();
      if (item && item.id) {
        router.replace(
          `/(item)/${mode === "found" ? "found-item" : "my-item"}`,
        );
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  return (
    <ScrollView
      className={`gap-8 bg-slate-50 px-[1.5rem] pb-8`}
      style={{
        paddingTop: top,
        paddingBottom: bottom,
      }}
    >
      <View className="gap-4 py-4">
        <View className="flex gap-1">
          <View className="flex w-full flex-row items-center justify-between">
            <Text>📂 Category *</Text>
            {errors.category?.message && (
              <Text className="text-xs text-red-600">
                {errors.category.message.toString()}
              </Text>
            )}
          </View>
          <Controller
            name="category"
            control={control}
            rules={{
              required: { value: true, message: "Category is required" },
            }}
            render={({ field }) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {CATEGORIES.map((cat) => (
                  <Pressable
                    key={cat}
                    onPress={() => {
                      field.onChange(cat);
                    }}
                  >
                    <View
                      className={`w-max rounded-2xl border border-gray-300 ${
                        field.value === cat
                          ? "bg-primary border-primary"
                          : "bg-white"
                      } px-4 py-1 text-lg`}
                    >
                      <Text
                        className={`${
                          field.value === cat ? "text-white" : "text-gray-700"
                        }`}
                      >
                        {cat}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            )}
          />
        </View>

        <Controller
          control={control}
          name="itemName"
          render={({ field }) => (
            <View className="gap-1">
              <View className="flex w-full flex-row items-center justify-between">
                <Text className="text-gray-700">📦 Item name *</Text>
                {errors.itemName?.message && (
                  <Text className="text-xs text-red-600">
                    {errors.itemName.message.toString()}
                  </Text>
                )}
              </View>
              <TextInput
                className="h-[40px] rounded-lg border border-slate-200 bg-white pl-2"
                onChangeText={field.onChange}
                {...field}
              />
            </View>
          )}
        />

        <View className="gap-1">
          <View className="flex w-full flex-row items-center justify-between">
            <Text className="text-gray-700">🎨 Color *</Text>
            {errors?.color?.message && (
              <Text className="text-xs text-red-600">
                {errors.color.message.toString()}
              </Text>
            )}
          </View>
          <Controller
            control={control}
            name="color"
            render={({ field }) => (
              <TextInput
                {...field}
                onChangeText={field.onChange}
                className="h-[40px] rounded-lg border border-slate-200 bg-white pl-2"
              />
            )}
          />
        </View>

        <View className="gap-1">
          <View>
            <Text className="text-gray-700">™️ Brand/Model *</Text>
            {errors?.brandModel?.message && (
              <Text className="text-xs text-red-600">
                {errors.brandModel.message.toString()}
              </Text>
            )}
          </View>
          <Controller
            control={control}
            name="brandModel"
            render={({ field }) => (
              <TextInput
                {...field}
                onChangeText={field.onChange}
                className="h-[40px] rounded-lg border border-slate-200 bg-white pl-2"
              />
            )}
          />
        </View>

        <View className="gap-1">
          <View className="flex w-full flex-row items-center justify-between">
            <View className="flex w-full flex-row gap-1">
              <Text className="text-gray-700">
                📍
                {mode === "found"
                  ? " Where did you find it?"
                  : " Where did you last see it?"}
              </Text>
            </View>
            {errors?.location?.message && (
              <Text className="text-xs text-red-600">
                {errors.location.message.toString()}
              </Text>
            )}
          </View>
          <Controller
            control={control}
            name="location"
            render={({ field }) => (
              <TextInput
                {...field}
                onChangeText={field.onChange}
                className="h-[40px] rounded-lg border border-slate-200 bg-white pl-2"
              />
            )}
          />
        </View>

        <Controller
          name="timeDate"
          control={control}
          render={({ field: { onChange, value } }) => (
            <View className="gap-1">
              <View className="flex w-full flex-row items-center justify-between">
                <View className="flex w-full flex-row gap-1">
                  <Text className="text-gray-700">📅 When was it?</Text>
                </View>
                {errors?.timeDate?.message && (
                  <Text className="text-xs text-red-600">
                    {errors.timeDate.message.toString()}
                  </Text>
                )}
              </View>
              <View className="flex w-full gap-4">
                <Pressable onPress={() => setIsDateVisible(true)}>
                  <Text className="h-[40px] grow rounded border border-slate-200 bg-white pl-2 align-middle">
                    {value
                      ? new Date(value).toLocaleString()
                      : "Select data and time"}
                  </Text>
                </Pressable>
              </View>

              {/* Date Picker */}
              {isDateVisible && (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={(event, selectedDate) => {
                    onDateChange(event, selectedDate);
                    if (selectedDate) {
                      onChange(selectedDate);
                    }
                  }}
                  maximumDate={new Date()}
                />
              )}

              {/* Time Picker */}
              {isTimeVisible && !isDateVisible && (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="time"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={(e, selectedTime) => {
                    onTimeChange(e, selectedTime);
                    if (selectedTime) {
                      onChange(selectedTime);
                    }
                  }}
                  maximumDate={new Date()}
                />
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="desc"
          render={({ field }) => (
            <View className="gap-1">
              <View className="flex w-full flex-row items-center justify-between">
                <Text className="text-gray-700">
                  📄
                  {mode === "found"
                    ? " How did you find it?"
                    : " How did you lost it?"}
                </Text>
                {errors?.desc?.message && (
                  <Text className="text-xs text-red-600">
                    {errors.desc.message.toString()}
                  </Text>
                )}
              </View>
              <TextInput
                {...field}
                onChangeText={field.onChange}
                className="h-[120px] rounded-lg border border-slate-200 bg-white pl-2 align-text-top"
                multiline
                numberOfLines={4}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="caption"
          render={({ field }) => (
            <View className="gap-1">
              <View className="flex w-full flex-row items-center justify-between">
                <Text className="text-gray-700">✍️ caption * </Text>
                {errors?.caption?.message && (
                  <Text className="text-xs text-red-600">
                    {errors.caption.message.toString()}
                  </Text>
                )}
              </View>
              <TextInput
                {...field}
                onChangeText={field.onChange}
                className="h-[40px] rounded-lg border border-slate-200 bg-white pl-2"
              />
            </View>
          )}
        />

        <View className="gap-1">
          <Text>Item Proof</Text>
          <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            {Array.isArray(proofUrls) &&
              proofUrls.map((url, index) => (
                <View key={`proof-${index}`}>
                  {url.trim() ? (
                    <View className="overflow-hidden rounded border border-slate-200 p-2">
                      <Image source={url} style={{ width: 85, height: 85 }} />
                      <Pressable
                        className="absolute right-1 top-1 rounded-full bg-gray-400 p-1"
                        onPress={() => {
                          setProofUrls((prev) => [
                            ...prev.filter((p) => p !== proofUrls[index]),
                            "",
                          ]);
                        }}
                      >
                        <AntDesign name="close" size={20} color="white" />
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable
                      className="row-end-2 flex w-max rounded border border-slate-200 bg-white p-8"
                      onPress={openFile}
                    >
                      <FontAwesome
                        name="file-image-o"
                        size={36}
                        color={"#6b7280"}
                      />
                    </Pressable>
                  )}
                </View>
              ))}
          </View>
        </View>
      </View>
      <View className={"flex w-full py-4"}>
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={!!isLoading || !!isUploadingImage}
          title={`${mode === "found" ? "Upload report" : "Report & Search"}`}
        />
      </View>
    </ScrollView>
  );
}
