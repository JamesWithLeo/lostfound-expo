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

export default function MyItem() {
  const { top, bottom } = useSafeAreaInsets();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDateVisible, setIsDateVisible] = useState<boolean>(false);
  const [isTimeVisible, setIsTimeVisible] = useState<boolean>(false);
  const [category, setCategory] =
    useState<(typeof CATEGORIES)[number]>("accessory");

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setIsDateVisible(false);
    if (event.type === "dismissed") {
      setIsDateVisible(false);
    } else if (event.type === "set") {
      setCurrentDate(selectedDate ?? currentDate);
      setIsTimeVisible(true);
    } else if (event.type === "neutralButtonPressed") {
      setIsDateVisible(false);
    }
  };
  const onTimeChange = (e: DateTimePickerEvent, selectedTime?: Date) => {
    if (e.type === "set") {
      setCurrentDate(selectedTime ?? currentDate);
    }
    setIsTimeVisible(false);
  };

  return (
    <>
      <ScrollView
        className="gap-8 bg-slate-50 px-[1.5rem] py-4 pb-8"
        style={{
          paddingTop: top,
          paddingBottom: bottom,
        }}
      >
        <View className="gap-4">
          <View className="flex gap-1">
            <Text>Category *</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              {CATEGORIES.map((cat) => {
                return (
                  <Pressable
                    key={cat}
                    onPress={() => {
                      setCategory(cat);
                    }}
                  >
                    <View
                      className={`w-max rounded-2xl border border-gray-300 ${category === cat ? "bg-primary border-primary" : "bg-white"} px-4 py-1 text-lg`}
                    >
                      <Text
                        className={`${category === cat ? "text-white" : "text-gray-700"}`}
                      >
                        {cat}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="gap-1">
            <Text className="text-gray-700">Item name *</Text>
            <TextInput className="h-[40px] rounded-lg border border-slate-200 bg-white pl-2" />
          </View>

          <View className="gap-1">
            <Text className="text-gray-700">Color *</Text>
            <TextInput className="h-[40px] rounded-lg border border-slate-200 bg-white pl-2" />
          </View>

          <View className="gap-1">
            <Text className="text-gray-700">Brand/Model *</Text>
            <TextInput className="h-[40px] rounded-lg border border-slate-200 bg-white pl-2" />
          </View>

          <View className="gap-1">
            <Text className="text-gray-700">Location *</Text>
            <TextInput className="h-[40px] rounded-lg border border-slate-200 bg-white pl-2" />
          </View>

          <View className="gap-1">
            <Text className="text-gray-700">Time & Date *</Text>
            <View className="flex w-full gap-4">
              <Pressable
                onPress={() => {
                  setIsDateVisible(true);
                }}
              >
                <Text className="h-[40px] grow rounded border border-slate-200 bg-white pl-2 align-middle">
                  {new Date(currentDate).toLocaleString()}
                </Text>
              </Pressable>
            </View>

            {isDateVisible && (
              <DateTimePicker
                value={currentDate}
                mode="date"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={onDateChange}
                maximumDate={new Date()}
              />
            )}
            {isTimeVisible && !isDateVisible && (
              <DateTimePicker
                value={currentDate}
                mode="time"
                display={Platform.OS === "ios" ? "inline" : "default"}
                onChange={onTimeChange}
                maximumDate={new Date()}
              />
            )}
          </View>

          <View className="gap-1">
            <Text className="text-gray-700">caption *</Text>
            <TextInput className="h-[40px] rounded-lg border border-slate-200 bg-white pl-2" />
          </View>

          <View className="gap-1">
            <Text className="text-gray-700">Description *</Text>
            <TextInput
              className="h-[120px] rounded-lg border border-slate-200 bg-white pl-2 align-text-top"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>
        <View className="w-full py-4">
          <Button title="Report and search" disabled />
        </View>
      </ScrollView>
    </>
  );
}
