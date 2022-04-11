import { ColorValue, StyleSheet } from "react-native";

import React from "react";
import { View } from "react-native";
import Svg, { Color, Path } from "react-native-svg";

import { StyleProp } from "react-native";
import { ViewStyle } from "react-native";

export default function WavyHeader({
  customStyles,
  customHeight,
  customTop,
  customBgColor,
  customWavePattern,
}: {
  customStyles: StyleProp<ViewStyle>;
  customHeight: string | number | undefined;
  customTop: string | number | undefined;
  customBgColor: ColorValue | undefined;
  customWavePattern: string | undefined;
}) {
  return (
    <View style={customStyles}>
      <View style={{ backgroundColor: customBgColor, height: customHeight }}>
        <Svg
          height="160%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{ position: "absolute", top: customTop }}
        >
          <Path fill={customBgColor as Color} d={customWavePattern} />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginTop: 50,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 35,
  },
});
