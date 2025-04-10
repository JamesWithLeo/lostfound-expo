import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Image, ImageBackground } from "expo-image";
import { View, Text, Pressable, Linking } from "react-native";
import { BlurView } from "expo-blur";
import { StyleSheet } from "react-native";

export default function TeamCard({
  firstName,
  lastName,
  photo,
  gLink,
  fbLink,
}: {
  firstName: string;
  lastName: string;
  photo?: string;
  gLink: string;
  fbLink: string;
}) {
  const openLink = async (link: string) => {
    await Linking.openURL(link);
  };
  return (
    <View className="grid h-32 w-full grid-cols-3 grid-rows-3 flex-row gap-8 rounded bg-slate-50 shadow">
      {photo && (
        <ImageBackground
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100%",
            paddingHorizontal: 16,
            paddingVertical: 16,
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
            borderRadius: "inherit",
          }}
          source={photo}
        >
          <BlurView
            intensity={50}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
          <View className="z-10 col-span-2 col-start-1 h-28 w-28 overflow-hidden rounded-full">
            <Image
              source={photo}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "inherit",
              }}
              contentFit="fill"
            />
          </View>
        </ImageBackground>
        // </View>
      )}

      <View className="col-span-2 col-start-2 row-start-1 flex h-full grow flex-col justify-center gap-4">
        <Text className="text-lg font-bold">
          {firstName} {lastName}
        </Text>
        <View className="flex flex-row gap-4">
          <Pressable
            onPress={() => {
              openLink(fbLink);
            }}
          >
            <FontAwesome6
              name="facebook-messenger"
              size={24}
              color={"#4c96d7"}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              openLink(gLink);
            }}
          >
            <FontAwesome name="envelope" size={24} color={"#4c96d7"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
