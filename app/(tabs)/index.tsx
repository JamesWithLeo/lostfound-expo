import QuickSearchSection from "@/components/QuickSearchSection";
import { Image } from "expo-image";
import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="h-full w-full">
      <Image
        source={require("../../assets/images/hero.png")}
        className="h-48 w-full"
      />
      <QuickSearchSection />
      <View className="px-[1.5rem]">
        <Text>Welcome Back,</Text>
        <Text>Juan Carlorossi</Text>
      </View>
    </View>
  );
}
