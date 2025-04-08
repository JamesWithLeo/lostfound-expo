import QuickSearchSection from "@/components/QuickSearchSection";
import { useSession } from "@/context/SessionContext";
import { Image } from "expo-image";
import { Redirect } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function HomeScreen() {
  const { session, logout } = useSession();

  if (!session) {
    return <Redirect href={"/signup"} />;
  }
  const {
    user: { firstName, lastName },
  } = session;
  return (
    <View className="h-full w-full">
      <Image
        source={require("../../assets/images/hero.png")}
        className="h-48 w-full"
      />
      <QuickSearchSection />
      <View className="px-[1.5rem]">
        <Text>Welcome Back,</Text>
        <Text>
          {firstName} {lastName}
        </Text>
      </View>
      <Pressable
        onPress={() => {
          logout();
        }}
      >
        Logout
      </Pressable>
    </View>
  );
}
