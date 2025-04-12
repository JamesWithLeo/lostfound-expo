import { Platform, Pressable, Text, TextInput, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { setupSchema } from "@/constants/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/constants/api";
import { useSession } from "@/context/SessionContext";
import { useRouter } from "expo-router";

export default function SetupForm({ userId }: { userId: string | undefined }) {
  const router = useRouter();
  const { updateUserProfile } = useSession();
  const [isDatePickerVisible, setIsDatePickerVisible] =
    useState<boolean>(false);
  const [isTimePickerVisible, setIsTimePickerVisible] =
    useState<boolean>(false);
  const [newBirthDate, setNewBirthDate] = useState<Date>(new Date());

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === "dismissed") {
      setIsDatePickerVisible(false);
    } else if (event.type === "set") {
      const newDate = selectedDate ?? newBirthDate;
      setNewBirthDate(newDate);
      setIsDatePickerVisible(false);
      setIsTimePickerVisible(true);
    }
  };

  const onTimeChange = (e: DateTimePickerEvent, selectedTime?: Date) => {
    if (e.type === "set") {
      const newTime = selectedTime ?? newBirthDate;
      setNewBirthDate(newTime);
    }
    setIsTimePickerVisible(false);
  };
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof setupSchema>>({
    resolver: zodResolver(setupSchema),
  });
  const onSubmit: SubmitHandler<z.infer<typeof setupSchema>> = async (data) => {
    if (!userId) return;
    try {
      const response = await fetch(`${api}/auth/setup/${userId}`, {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Fetch failed with status ${response.status}`);
      }
      const result = await response.json();
      if (result.user) {
        updateUserProfile(result.user);
        router.replace("/");
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  return (
    <>
      <View className="w-full">
        <>
          <View className="mb-4">
            <Text className={`text-left text-sm text-gray-600`}>
              Step 2 of 2
            </Text>
            <Text className="text-xs">UID:{userId}</Text>
          </View>
          <View className="flex w-full flex-row items-center gap-2">
            <View className="border-primary w-1/2 border-b-4"></View>
            <View className="border-primary w-1/2 border-b-4"></View>
          </View>
        </>
      </View>
      <View className="flex w-full flex-col gap-2">
        <View className="rounded-xl border border-gray-300 px-2 pb-1 pt-1">
          <View className="flex flex-row items-center justify-between">
            <Text>First Name *</Text>
            {errors.firstName && (
              <Text className="text-xs text-red-500">
                {errors.firstName.message}
              </Text>
            )}
          </View>
          <View className="p-2">
            <Controller
              control={control}
              name="firstName"
              render={({ field }) => (
                <TextInput
                  {...field}
                  onChangeText={field.onChange}
                  placeholder=""
                  className="outline-0"
                />
              )}
            />
          </View>
        </View>

        <View className="rounded-xl border border-gray-300 px-2 pb-1 pt-1">
          <View className="flex flex-row items-center justify-between">
            <Text>Last Name *</Text>
            {errors.lastName && (
              <Text className="text-xs text-red-500">
                {errors.lastName.message}
              </Text>
            )}
          </View>
          <View className="p-2">
            <Controller
              control={control}
              name="lastName"
              render={({ field }) => (
                <TextInput
                  {...field}
                  onChangeText={field.onChange}
                  placeholder=""
                  className="outline-0"
                />
              )}
            />
          </View>
        </View>

        <View className="rounded-xl border border-gray-300 px-2 pb-1 pt-1">
          <View className="flex flex-row items-center justify-between">
            <Text>Gender</Text>
            {errors.gender && (
              <Text className="text-xs text-red-500">
                {errors.gender.message}
              </Text>
            )}
          </View>

          <View className="rounded border border-gray-300">
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Picker
                  // onValueChange={(newValue) => {
                  //   console.log(newValue);
                  //   if (newValue) {
                  //     onChange(newValue);
                  //   }
                  // }}
                  {...field}
                  onValueChange={field.onChange}
                >
                  <Picker.Item label="Select your gender" />
                  <Picker.Item label="Male" value={"male"} />
                  <Picker.Item label="Female" value={"female"} />
                </Picker>
              )}
            />
          </View>
        </View>

        <View className="rounded-xl border border-gray-300 px-2 pb-1 pt-1">
          <View className="flex flex-row items-center justify-between">
            <Text>Birth day</Text>
            {errors.birthDate && (
              <Text className="text-xs text-red-500">
                {errors.birthDate.message}
              </Text>
            )}
          </View>
          <Controller
            name="birthDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <>
                <Pressable
                  className="rounded p-2"
                  onPress={() => {
                    setIsDatePickerVisible(true);
                  }}
                >
                  <Text>
                    {value
                      ? new Date(value).toLocaleString()
                      : "Select your birth date"}
                  </Text>
                </Pressable>

                {isDatePickerVisible && (
                  <DateTimePicker
                    value={newBirthDate}
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
                {isTimePickerVisible && !isDatePickerVisible && (
                  <DateTimePicker
                    value={newBirthDate}
                    mode="time"
                    display={Platform.OS === "ios" ? "inline" : "default"}
                    onChange={(event, selectedDate) => {
                      onTimeChange(event, selectedDate);
                      if (selectedDate) {
                        onChange(selectedDate);
                      }
                    }}
                    maximumDate={new Date()}
                  />
                )}
              </>
            )}
          />
        </View>

        <Pressable
          className="bg-primary w-full rounded-xl py-2 text-center text-white"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          <Text className="text-center text-white">
            {isSubmitting ? "Submitting" : "Submit"}
          </Text>
        </Pressable>
      </View>
    </>
  );
}
