import React from "react";
import { StyleSheet } from "react-native";
import { AddButton, View } from "../components/Themed";
import { RootStackScreenProps, RootTabScreenProps } from "../types";
import TabOneScreen from "./TabOneScreen";
import TabTwoScreen from "./TabTwoScreen";

export default function TabOneAndTwo(props: any) {
  return (
    <View style={styles.container}>
      <TabOneScreen {...props} />
      <TabTwoScreen {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
});
