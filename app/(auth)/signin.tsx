import GoogleButton from "@/components/GoogleButton";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Signin() {
  return (
    <View className="flex h-full w-full flex-col items-center justify-center bg-white">
      <View className="mb-16 flex w-max flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white px-3 pb-3 pt-16 sm:w-[400px]">
        <Text className={`w-full text-left text-2xl`}>
          Sign in to Lost and found
        </Text>
        <View className="flex w-full flex-col gap-2">
          <View className="grow-1 flex flex-col rounded-xl border border-gray-200 px-2 pb-0.5 pt-1">
            <Text className={``}>Email *</Text>
            <TextInput className="focus:outline-none" />
          </View>
          <View className="grow-1 flex flex-col rounded-xl border border-gray-200 px-2 pb-0.5 pt-1">
            <Text className={``}>Password *</Text>
            <TextInput className="focus:outline-none" />
          </View>
          <Pressable className="bg-primary w-full rounded-xl py-2 text-center text-white">
            Sign in
          </Pressable>
        </View>
        <Text className="w-[250px] text-center text-xs">
          We recommend you to use <strong>Google</strong> for faster login.
        </Text>
        <GoogleButton />
      </View>
    </View>
  );
}
