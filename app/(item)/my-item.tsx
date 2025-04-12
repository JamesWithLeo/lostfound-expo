import { useSession } from "@/context/SessionContext";
import { useItems } from "@/hooks/useItems";
import { Redirect } from "expo-router";
import { FlatList, Platform, Text, View } from "react-native";
import { ItemType } from "@/constants/types";
import ItemCard from "@/components/ItemCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function MyItem() {
  const { session } = useSession();
  const { bottom } = useSafeAreaInsets();
  if (!session?.user.id || !session.user.id) {
    return <Redirect href={"/"} />;
  }
  const { isLoading, error, data, refetch, isSuccess, isRefetching } = useItems(
    {
      type: "lost",
      id: session.user.id,
    },
  );
  return (
    <View
      style={{
        height: "100%",
        paddingTop: 16,
        paddingBottom: bottom,
        gap: 8,
      }}
    >
      <View className="border-b border-gray-200 pb-2">
        <View className="pl-4 pr-4">
          <Text className="text-3xl font-extrabold">My item</Text>
          <Text>Reuniting Lost items with Owners, Including Yours!</Text>
        </View>
      </View>
      {isLoading && (
        <View className="h-full w-full flex-col items-center justify-center pb-32">
          <Text>Loading...</Text>
        </View>
      )}
      {error && (
        <View className="h-full w-full flex-col items-center justify-center pb-32">
          <Text>{error.message}</Text>
        </View>
      )}
      {isSuccess &&
        !isLoading &&
        Array.isArray(data?.items) &&
        data.items.length !== 0 && (
          <View
            style={{
              display: "flex",
              height: "100%",
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <FlatList<ItemType>
              data={data.items}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <ItemCard item={item} />}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              refreshing={isRefetching}
              onRefresh={refetch}
            />
          </View>
        )}

      {isSuccess && !isLoading && Array.isArray(data) && data.length === 0 ? (
        <View className="h-full w-full flex-col items-center justify-center gap-1 pb-32">
          <FontAwesome6 name="leaf" size={44} color="#4c96d7" />
          <Text>No items</Text>
        </View>
      ) : null}
    </View>
  );
}
