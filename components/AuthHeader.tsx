import { View } from "react-native";
import { Image } from "expo-image";
export default function AuthHeader({ link }: { link: React.ReactNode }) {
  return (
    <View
      className={`$ top-0 flex h-12 w-full flex-row items-center justify-between bg-white px-[1.5rem]`}
    >
      <Image
        source={require("../assets/images/logo.png")}
        className="h-16 w-16"
        contentFit="contain"
      />
      {link}
    </View>
  );
}
