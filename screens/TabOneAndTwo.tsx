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
      <View style={{borderWidth: 1, borderColor: "#2a0944"}}/>
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
