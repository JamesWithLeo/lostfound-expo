import { Text, View } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
export default function HomeHeader({
  isNotFixed: isFixed,
}: {
  isNotFixed?: boolean;
}) {
  const [isBlur, setIsBlur] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      const triggerHeight = 1;
      setIsBlur(window.scrollY > triggerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return (
    <View
      className={`${!!isFixed && "fixed"} top-0 flex h-12 w-full flex-row items-center justify-between bg-transparent px-[1.5rem] ${isBlur && "backdrop-blur-sm"}`}
    >
      <Image
        source={require("../assets/images/logo.png")}
        className="h-16 w-16"
        contentFit="contain"
      />
    </View>
  );
}
