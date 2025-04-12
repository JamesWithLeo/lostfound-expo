import { useSession } from "@/context/SessionContext";
import { Pressable, Text } from "react-native";

export default function LogoutButton() {
  const { logout } = useSession();
  return (
    <Pressable
      onPress={() => {
        logout();
      }}
    >
      <Text className="text-red-500">Logout</Text>
    </Pressable>
  );
}
