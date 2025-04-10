import { Link } from "expo-router";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function QuickSearchSection() {
  return (
    <View className="flex h-max w-full flex-col items-center px-[1.5rem] py-2">
      <View className="flex w-full items-center bg-slate-100 text-sm">
        <View className="flex w-full flex-row items-center justify-center gap-2">
          <View className="flex w-max grow flex-row items-center justify-between gap-2 rounded-full border border-gray-300 bg-white px-4 py-1">
            <TextInput
              className="p-1 text-gray-400 outline-0"
              placeholder="Item name"
            />
            <View className="flex flex-row items-center gap-2">
              <View className="h-4 border-l border-gray-300"></View>
              <Pressable onPress={() => {}} className="text-primary w-max">
                <Text className="text-primary">Quick Search</Text>
              </Pressable>
            </View>
          </View>

          <Link
            href={"/report"}
            className="bg-primary h-max w-max rounded-full px-4 py-2 text-center text-white"
          >
            Report item
          </Link>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Link: {
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    backgroundColor: " #4c96d7",
  },
  TextInput: {
    // borderWidth: 1,
    padding: 4,
  },
});
