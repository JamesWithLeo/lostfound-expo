import TeamCard from "@/components/TeamCard";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function About() {
  return (
    <ScrollView className="bg-white">
      <View className="bg-gray-300 px-8 py-8">
        <View className="flex w-full flex-col items-center gap-8 bg-gray-200 p-4">
          <Text className="text-lg">Our Mission</Text>
          <Text className="text-center">
            Our online platform is dedicated to reuniting lost items with their
            owners and helping the community thrive. Join us in making a
            diffrence today!
          </Text>
          <Pressable>
            <Text>Join Now</Text>
          </Pressable>
        </View>
      </View>
      <View className="flex w-full flex-col items-center gap-8 px-8 py-8">
        <Text>Meet the team</Text>
        <View className="flex h-max flex-row flex-wrap items-center justify-center gap-4">
          <TeamCard
            firstName="James Leo"
            lastName="Ocampo"
            fbLink="fb://facewebmodal/f?href=https://www.facebook.com/JAMES.ocampoGI"
            gLink="mailto:jamesocampogi04@gmail.com?"
            photo={require("../../assets/images/james.jpg")}
          />
          <TeamCard
            firstName="Darrell"
            lastName="Laizon"
            photo={require("../../assets/images/darelle.jpg")}
            fbLink="fb://facewebmodal/f?href=https://www.facebook.com/JDlaizon.MachineGunKelly"
            gLink="mailto:Johndarrellelaizon@gmail.com"
          />
          <TeamCard
            firstName="Leona Grachelle"
            lastName="Buriel"
            photo={require("../../assets/images/leona.jpg")}
            fbLink="fb://facewebmodal/f?href=https://www.facebook.com/sai.yona123#"
            gLink="mailto:tsmsaiyona@gmail.com"
          />
        </View>
      </View>

      <View className="flex w-full flex-col items-center gap-8 px-8 py-8">
        <Text>Our Story</Text>
        <Text>
          Founded with a passion for helping others, our online lost and found
          platform has been connecting lost items with their owners since its
          inception. Join us in mission today!
        </Text>
      </View>
    </ScrollView>
  );
}
