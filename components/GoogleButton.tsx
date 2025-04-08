import { Pressable, Text } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { fetchUserInfoAsync } from "expo-auth-session/build/TokenRequest";
import { useSession } from "@/context/SessionContext";

WebBrowser.maybeCompleteAuthSession();

export default function GoogleButton() {
  const { login } = useSession();
  //client IDs from .env
  const config = {
    androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
    scopes: ["profile", "email"],
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config);

  //request - An instance of AuthRequest that can be used to prompt the user for authorization. This will be null until the auth request has finished loading.
  //response - This is null until promptAsync has been invoked. Once fulfilled it will return information about the authorization.
  //promptAsync - When invoked, a web browser will open up and prompt the user for authentication. Accepts an AuthRequestPromptOptions object with options about how the prompt will execute.
  const fetchUser = async (token: string) => {
    try {
      const userInfo = await fetchUserInfoAsync(
        { accessToken: token },
        Google.discovery,
      );
      console.log("Fetched User:", userInfo);
      const res = await fetch(
        "https://lost-and-found-chi.vercel.app/api/expo",
        {
          headers: {
            "x-user-email": userInfo.email,
            "x-provider": "google",
            "Content-Type": "application/json",
          },
        },
      );
      const { email, user } = await res.json();
      login(email, user);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication?.accessToken) {
        fetchUser(authentication.accessToken);
      }
    }
  }, [response]);

  return (
    <Pressable
      className="w-full rounded-xl bg-gray-200 py-2"
      onPress={() => {
        promptAsync();
      }}
    >
      <Text className="text-center">Continue with Google</Text>
    </Pressable>
  );
}
