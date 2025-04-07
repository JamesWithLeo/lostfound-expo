import AuthHeader from "@/components/AuthHeader";
import { Link, Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="signup"
        options={{
          headerShown: true,
          header: (props) => (
            <AuthHeader
              link={
                <Link
                  href={"/signin"}
                  className="rounded-md border border-gray-300 px-2 py-1"
                >
                  Sign in
                </Link>
              }
            />
          ),
        }}
      />
      <Stack.Screen
        name="signin"
        options={{
          headerShown: true,
          header: (props) => (
            <AuthHeader
              link={
                <Link
                  href={"/signup"}
                  className="rounded-md border border-gray-300 px-2 py-1"
                >
                  Sign up
                </Link>
              }
            />
          ),
        }}
      />
    </Stack>
  );
}
