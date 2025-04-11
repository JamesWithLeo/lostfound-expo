import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "react-native";

export default function FoundItemDetail() {
  const { id } = useLocalSearchParams();
  return (
    <ScrollView>
      <Text>{id}</Text>
    </ScrollView>
  );
}
