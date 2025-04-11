import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import "../global.css"; // Global styles
import { Stack } from "expo-router/stack"; // Expo Router Stack Navigation
import { SessionProvider } from "@/context/SessionContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Prevent splash screen from auto-hiding before assets are loaded
SplashScreen.preventAutoHideAsync();

const client = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null; // Show splash screen while fonts are loading
  }

  return (
    // Use the Stack for routing non-tab pages
    <QueryClientProvider client={client}>
      <SessionProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(item)" options={{ headerShown: false }} />
        </Stack>
      </SessionProvider>
    </QueryClientProvider>
  );
}
