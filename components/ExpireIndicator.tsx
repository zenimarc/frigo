import React from "react";
import { StyleSheet } from "react-native";
import { daysBetweenTwoDates } from "../helper_functions";
import { View, Text } from "./Themed";

const mapDaysLeftToColors = (daysLeft: number) => {
  if (daysLeft <= 0) {
    //expired
    return "red";
  } else if (daysLeft <= 2) {
    return "orange";
  } else if (daysLeft <= 5) {
    return "#ffd60a";
  } else {
    return "green";
  }
};

const ExpireIndicator = ({ expDate, insertionDate }: { expDate: Date; insertionDate: Date }) => {
  const daysLeft = daysBetweenTwoDates(insertionDate, expDate);
  console.log(daysLeft);
  const color = mapDaysLeftToColors(daysLeft);
  return <View style={[styles.coloredDot, { backgroundColor: color }]} />;
};

const styles = StyleSheet.create({
  coloredDot: {
    position: "absolute",
    top: "0%",
    right: "5%",
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default ExpireIndicator;
