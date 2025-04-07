import QuickSearchSection from "@/components/QuickSearchSection";
import { Image } from "expo-image";
import { Redirect, useRootNavigationState, useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const isAuth = false;
  const router = useRouter();

  if (!isAuth) {
    return <Redirect href={"/signup"} />;
  }
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
