import React, { useEffect } from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "../global.css";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "@/hooks/useColorScheme";
// import Index from "./(tabs)/index";
// import { View } from "react-native";
// import HomeHeader from "@/components/HomeHeader";
import "../global.css";
import { Stack } from "expo-router/stack";
// const Stack = createNativeStackNavigator();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="about" options={{ headerShown: false }} />
      <Stack.Screen name="Report" options={{ presentation: "modal" }} />
    </Stack>
    // <Stack.Navigator initialRouteName="Home">
    //   <Stack.Screen
    //     name="Home"
    //     component={Index}
    //     options={{ header: (props) => <HomeHeader /> }}
    //   />
    // </Stack.Navigator>
  );
}
