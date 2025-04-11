import HomeHeader from "@/components/HomeHeader";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{}}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          headerShown: true,
          header: (props) => <HomeHeader />,
          title: "About",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="users" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: true,
          header: (props) => <HomeHeader />,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={24} name="user-circle-o" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
