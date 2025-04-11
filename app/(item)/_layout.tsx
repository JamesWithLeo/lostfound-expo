import HomeHeader from "@/components/HomeHeader";
import { Stack } from "expo-router";

export default function ItemLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(new)" options={{ headerShown: false }} />
      <Stack.Screen
        name="found-item"
        options={{ headerShown: true, title: "Found item" }}
      />
      <Stack.Screen
        name="my-item"
        options={{
          title: "Your lost items",
          headerShown: true,
          // header: (props) => <HomeHeader />,
        }}
      />
    </Stack>
  );
}
