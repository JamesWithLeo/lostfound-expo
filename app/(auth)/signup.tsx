import GoogleButton from "@/components/GoogleButton";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Signup() {
  return (
    <View className="h-full w-full flex-col items-center justify-center bg-white px-[1.5rem]">
      <View className="mb-16 flex w-full flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white px-3 pb-3 pt-16">
        <View className="w-full">
          <Text className={`mb-4 text-left text-sm text-gray-600`}>
            Step 1 of 2
          </Text>
          <View className="grid w-full grid-cols-2 items-center gap-2">
            <View className="border-primary w-full border-b-4"></View>
            <View className="w-full border-b-2 border-gray-200"></View>
          </View>
        </View>
        <View className="flex w-full flex-col gap-2">
          <View className="rounded-xl border border-gray-300 px-2 pb-0.5 pt-1">
            <Text>First Name *</Text>
            <TextInput placeholder="" className="outline-0" />
          </View>

          <View className="rounded-xl border border-gray-300 px-2 pb-0.5 pt-1">
            <Text>Last Name *</Text>
            <TextInput placeholder="" className="outline-0" />
          </View>

          <View className="rounded-xl border border-gray-300 px-2 pb-0.5 pt-1">
            <Text>Email Address*</Text>
            <TextInput placeholder="" className="outline-0" />
          </View>
        </View>

        <Text className="w-[250px] text-center text-xs">
          By tapping Create new account, you agree with the Terms and Condition
          and Privacy Policy.
        </Text>
        <Pressable className="bg-primary w-full rounded-xl py-2 text-center text-white">
          <Text className="text-center text-white">Create new account</Text>
        </Pressable>
        <GoogleButton />
      </View>
    </View>
  );
}
