import { StyleSheet } from "react-native";
import { Text, View } from "react-native";

export default function Statistics() {
  return (
    <View style={{ flexDirection: "row", paddingHorizontal: 24, gap: 8 }}>
      <View style={styles.containers}>
        <Text>0</Text>
        <Text>Global case</Text>
      </View>
      <View style={styles.containers}>
        <Text>0%</Text>
        <Text>Honesty</Text>
      </View>
      <View style={styles.containers}>
        <Text>0</Text>
        <Text>Returned</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 8,
    alignItems: "center",
    borderRadius: 8,
  },
});
