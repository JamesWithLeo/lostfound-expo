import { View } from "react-native";
import { Image } from "expo-image";
export default function AuthHeader({ link }: { link?: React.ReactNode }) {
  return (
    <View
      className={`$ top-0 flex h-16 w-full flex-row items-center justify-between bg-white px-[1.5rem]`}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={{ height: 64, width: 64 }} // No tailwind css
        contentFit="cover"
      />
      {link}
    </View>
  );
}
