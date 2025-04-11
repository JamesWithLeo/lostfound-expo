import { BlurView } from "expo-blur";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function QuickSearchSection() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  return (
    <>
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

            <Pressable
              onPress={() => {
                setIsModalOpen(true);
              }}
              className="bg-primary h-max w-max rounded-full px-4 py-2 text-center text-white"
            >
              <Text className="text-white">Report item</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Modal animationType="slide" visible={isModalOpen} transparent>
        <TouchableWithoutFeedback
          onPress={() => setIsModalOpen(false)}
          style={{ flex: 1 }}
        >
          <BlurView
            intensity={50}
            tint="dark"
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <Pressable
              onPress={() => {}}
              style={{
                height: "25%",
                width: "100%",
                borderTopRightRadius: 18,
                borderTopLeftRadius: 18,
                position: "absolute",
                backgroundColor: "white",
                bottom: 0,
                zIndex: 1,
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 16,
                paddingBottom: 16,
              }}
            >
              <View className="flex h-full flex-row items-center gap-2 p-2">
                <TouchableOpacity
                  className="text-primary flex h-full w-1/2 items-center justify-center rounded-lg bg-slate-100 p-4"
                  onPress={() => {
                    router.push("/(item)/(new)/my-item");
                  }}
                >
                  <FontAwesome6 name="wallet" size={24} color={"#4c96d7"} />
                  <Text className="text-lg">My item</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex h-full w-1/2 items-center justify-center rounded-lg bg-slate-100 p-4"
                  onPress={() => {
                    router.push("/(item)/(new)/found-item");
                  }}
                >
                  <FontAwesome6 name="person" size={24} color={"#4c96d7"} />
                  <Text className="text-lg">Someone item</Text>
                </TouchableOpacity>
              </View>
            </Pressable>
          </BlurView>
        </TouchableWithoutFeedback>
      </Modal>
    </>
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
