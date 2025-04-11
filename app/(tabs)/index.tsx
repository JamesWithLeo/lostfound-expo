import HomeHeader from "@/components/HomeHeader";
import QuickSearchSection from "@/components/QuickSearchSection";
import { useSession } from "@/context/SessionContext";
import { Image } from "expo-image";
import { Redirect } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const { session, logout } = useSession();

  if (!session) {
    return <Redirect href={"/signup"} />;
  }
  const {
    user: { firstName, lastName },
  } = session;
  return (
    <>
      <ScrollView className="h-full w-full" scrollEventThrottle={16}>
        <HomeHeader isAbsolute={true} />
        <Image
          source={require("../../assets/images/hero.png")}
          style={{ height: 192 }}
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
          <Text className="text-center">Logout</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}
