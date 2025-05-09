import HomeHeader from "@/components/HomeHeader";
import ItemCard from "@/components/ItemCard";
import QuickSearchSection from "@/components/QuickSearchSection";
import Statistics from "@/components/Statistics";
import { ItemType } from "@/constants/types";
import { useSession } from "@/context/SessionContext";
import { useItems } from "@/hooks/useItems";
import { Image } from "expo-image";
import { Link, Redirect, router, useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function HomeScreen() {
  const { session, isLoading } = useSession();
  if (
    !session ||
    !session.user.firstName ||
    !session.user.lastName ||
    !session.user.birthDate ||
    !session.user.gender
  ) {
    return <Redirect href="/(auth)/setup" />;
  }

  const {
    user: { firstName, lastName, birthDate, gender },
  } = session;

  const lostQuery = useItems({
    type: "lost",
    id: session.user.id,
  });
  const foundQuery = useItems({
    type: "found",
    id: session.user.id,
  });

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: 8, paddingBottom: 8 }}
        scrollEventThrottle={16}
      >
        <HomeHeader isAbsolute={true} />
        <Image
          source={require("../../assets/images/hero.png")}
          style={{ height: 192 }}
        />
        <QuickSearchSection />
        <View className="px-[1.5rem]">
          <Text className="text-primary text-xl font-extrabold">
            Welcome Back,
          </Text>
          <Text className="text-xl font-bold">
            {firstName} {lastName}
          </Text>
        </View>
        <Statistics />
        <View style={{ paddingLeft: 24, paddingRight: 24, gap: 8 }}>
          {lostQuery.isSuccess && Array.isArray(lostQuery.data?.items) && (
            <View className="mt-6 gap-2">
              <View className="mb-2 flex w-full flex-row items-center justify-between">
                <Text className="text-lg font-semibold">Your Lost Items</Text>
                <Link href="/(item)/my-item">
                  <Text className="mt-2 text-blue-500">View more</Text>
                </Link>
              </View>
              {lostQuery.data.items.slice(0, 2).map((item: ItemType) => (
                <ItemCard key={item.id} item={item} />
              ))}

              {lostQuery.data.items.length === 0 && (
                <View className="flex-col items-center justify-center gap-1">
                  <Text>
                    <FontAwesome6 name="leaf" size={24} color="#4c96d7" />
                  </Text>
                  <Text>No items</Text>
                </View>
              )}
            </View>
          )}

          {foundQuery.isSuccess && Array.isArray(foundQuery.data?.items) && (
            <View className="mt-6 gap-2">
              <View className="mb-2 flex w-full flex-row items-center justify-between">
                <Text className="text-lg font-semibold">Items You Found</Text>
                <Link href="/(item)/found-item">
                  <Text className="mt-2 text-blue-500">View more</Text>
                </Link>
              </View>
              {foundQuery.data.items.slice(0, 2).map((item: ItemType) => (
                <ItemCard key={item.id} item={item} />
              ))}
              {foundQuery.data.items.length === 0 && (
                <View className="flex-col items-center justify-center gap-1">
                  <Text>
                    <FontAwesome6 name="leaf" size={24} color="#4c96d7" />
                  </Text>
                  <Text>No items</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}
