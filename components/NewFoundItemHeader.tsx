import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function NewFoundItemHeader() {
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

      <Link
        href={"/(item)/(new)/my-item"}
        className="col-start-1 row-start-2 flex flex-col gap-2 border-b border-slate-200 px-[1.5rem] pb-4"
      >
        <View>
          <Text className="text-3xl">Report Found items</Text>
          <Text>Let's help you return items to rightful owner!</Text>
        </View>
        <View className="flex w-max flex-row items-center gap-2 rounded border border-gray-200 bg-slate-50 px-3 py-1">
          <Text>Lost something? Search for it instead.</Text>
          <FontAwesome6 name={"arrows-left-right"} />
        </View>
      </Link>
    </View>
  );
}
