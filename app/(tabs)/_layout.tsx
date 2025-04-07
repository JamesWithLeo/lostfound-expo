import HomeHeader from "@/components/HomeHeader";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="index"
        options={{
          header: (props) => <HomeHeader />,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          headerShown: false,
          title: "About",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="users" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
