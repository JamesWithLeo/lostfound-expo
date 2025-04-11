import { useSession } from "@/context/SessionContext";
import { View } from "react-native";

import SetupForm from "@/components/SetupForm";
import SignupForm from "@/components/SignupForm";

export default function Signup() {
  const { session } = useSession();
  const user = session?.user;
  const isIncomplete =
    !user?.firstName || !user?.lastName || !user?.birthDate || !user?.gender;

  return (
    <View className="h-full w-full flex-col items-center justify-center bg-white px-[1.5rem]">
      <View className="mb-16 flex w-full flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white px-3 pb-3 pt-16">
        {!isIncomplete ? (
          <>
            <SignupForm />
          </>
        ) : (
          <>
            <SetupForm userId={user?.id} />
          </>
        )}
      </View>
    </View>
  );
}
