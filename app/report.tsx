import { Text, View } from "react-native";
import { Svg, Path } from "react-native-svg";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Link } from "expo-router";

export default function Report() {
  return (
    <View className="flex h-full items-center gap-8 px-8 py-8">
      <Link href={"/(item)/(new)/my-item"}>
        <View className="text-primary flex w-full items-center rounded border border-gray-400 p-4">
          <FontAwesome6 name="wallet" size={64} color={"#4c96d7"} />
          <Text className="text-lg">My item</Text>
        </View>
      </Link>
      <Link href={"/(item)/(new)/found-item"}>
        <View className="flex w-full items-center rounded border border-gray-400 p-4">
          <FontAwesome6 name="person" size={64} color={"#4c96d7"} />
          <Text className="text-lg">Someone item</Text>
        </View>
      </Link>
    </View>
  );
}
