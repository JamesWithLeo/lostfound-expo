import { Stack } from "expo-router";

export default function ItemLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(new)" options={{ headerShown: false }} />
      <Stack.Screen name="found-item" />
      <Stack.Screen name="my-item" />
    </Stack>
  );
}
