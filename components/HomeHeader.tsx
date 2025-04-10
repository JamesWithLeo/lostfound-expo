import { ScrollView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
export default function HomeHeader({
  isBlur,
  isAbsolute,
}: {
  isBlur?: boolean;
  isAbsolute?: boolean;
}) {
  return (
    <View
      className={`${isAbsolute && "absolute"} ${!isBlur && "backdrop-blur-sm"} top-0 z-10 flex h-16 w-full flex-row items-center justify-between bg-transparent px-[1.5rem]`}
    >
      <Image
        source={require("../assets/images/logo.png")}
        style={{ height: 64, width: 64 }}
        contentFit="contain"
      />
    </View>
  );
}
