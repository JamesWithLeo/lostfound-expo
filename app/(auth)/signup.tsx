import { useSession } from "@/context/SessionContext";
import { View } from "react-native";

import SignupForm from "@/components/SignupForm";
import { Redirect } from "expo-router";

export default function Signup() {
  const { session } = useSession();
  const user = session?.user;
  if (
    user &&
    (!user.lastName || !user?.firstName || !user.gender || !user.birthDate)
  ) {
    return <Redirect href={"/(auth)/setup"} />;
  }

  // if (user) {
  //   return <Redirect href={"/"} />;
  // }
  return (
    <View className="h-full w-full flex-col items-center justify-center bg-white px-[1.5rem]">
      <View className="mb-16 flex w-full flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white px-3 pb-3 pt-16">
        <SignupForm />
      </View>
    </View>
  );
}
