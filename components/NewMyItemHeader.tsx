import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function NewMyItemHeader() {
  const router = useRouter();
  return (
    <View className="top-0 grid w-full grid-rows-2 flex-col justify-between gap-4 border-slate-200 bg-white">
      <View className="col-start-1 row-start-1 flex flex-row justify-between px-[1.5rem]">
        <Image
          source={require("../assets/images/logo.png")}
          style={{ height: 64, width: 64 }}
          contentFit="contain"
        />
        <View className="flex flex-row items-center gap-8">
          <Link href={"/"}>Home</Link>
          <Link href={"/about"}>About</Link>
        </View>
      </View>

      <Pressable
        onPress={() => {
          router.replace("/(item)/(new)/found-item");
        }}
        className="col-start-1 row-start-2 flex flex-col gap-4 border-b border-slate-200 px-[1.5rem] pb-4"
      >
        <View className="">
          <Text className="text-3xl">Let's Locate your lost items!</Text>
          <Text>To find you item, Fill in the form below!</Text>
        </View>
        <View className="flex w-max flex-row items-center gap-2 rounded border border-gray-200 bg-slate-50 px-3 py-1">
          <Text>Found something? Post it instead.</Text>
          <FontAwesome6 name={"arrows-left-right"} />
        </View>
      </Pressable>
    </View>
  );
}
