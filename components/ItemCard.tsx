import { ItemType } from "@/constants/types";
import { Text, TouchableHighlight, View } from "react-native";
// import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function ItemCard({ item }: { item: ItemType }) {
  let bg;
  let bgDark;

  if (item.itemStatus === "pending") {
    bg = " bg-orange-200 ";
    bgDark = " bg-orange-400 ";
  } else if (item.itemStatus === "expired") {
    bg = " bg-gray-200 ";
    bg = " bg-gray-400 ";
  } else if (item.itemStatus === "returned") {
    bg = " bg-green-200 ";
    bgDark = " bg-orange-400 ";
  }
  return (
    <TouchableHighlight className={`h-24 rounded p-4 ${bg}`}>
      <View className="flex flex-row gap-4 overflow-hidden">
        <View className="flex w-2/5 flex-col gap-1">
          <Text className="text-lg font-bold">{item.itemName}</Text>

          <View className={`${bgDark} w-max self-start rounded-2xl px-2 py-1`}>
            <Text className="text-white">{item.itemStatus}</Text>
          </View>
        </View>
        <View>
          <Text>{new Date(item.timeDate).toLocaleString()}</Text>

          <Text>0 claimants</Text>
          {/* <FontAwesome name="caret-right" size={24} color="#4b5563" /> */}
        </View>
      </View>
    </TouchableHighlight>
  );
}
