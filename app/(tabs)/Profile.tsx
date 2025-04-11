import { useSession } from "@/context/SessionContext";
import { Redirect } from "expo-router";
import { ScrollView, Text, Pressable, TouchableHighlight } from "react-native";

export default function Profile() {
  const { logout, session } = useSession();
  if (!session?.user.id) {
    return <Redirect href={"/(auth)/signup"} />;
  }
  const user = session?.user;
  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 24 }}>
      <Text className="text-2xl">
        {user.firstName} {user.lastName}
      </Text>

      <TouchableHighlight
        onPress={() => {
          logout();
        }}
        underlayColor="#fca5a5"
        style={{
          backgroundColor: "#f87171",
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 8,
          alignSelf: "center",
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Logout</Text>
      </TouchableHighlight>
    </ScrollView>
  );
}
