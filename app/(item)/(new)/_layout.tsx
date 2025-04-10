import NewFoundItemHeader from "@/components/NewFoundItemHeader";
import NewMyItemHeader from "@/components/NewMyItemHeader";
import { Stack } from "expo-router";

export default function NewLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="my-item"
        options={{ headerShown: true, header: (props) => <NewMyItemHeader /> }}
      />
      <Stack.Screen
        name="found-item"
        options={{
          headerShown: true,
          header: (props) => <NewFoundItemHeader />,
        }}
      />
    </Stack>
  );
}
