import React from "react";
import { StyleSheet } from "react-native";
import { daysBetweenTwoDates, removeTimeFromDate } from "../helper_functions";
import { View, Text } from "./Themed";

const mapDaysLeftToColors = (daysLeft: number) => {
  if (daysLeft <= 0) {
    //expired
    return "#ff0505";
  } else if (daysLeft <= 2) {
    return "#ff5805";
  } else if (daysLeft <= 5) {
    return "#ffea05";
  } else {
    return "green";
  }
};

const ExpireIndicator = ({ expDate, insertionDate }: { expDate: Date; insertionDate: Date }) => {
  const currentDate = removeTimeFromDate(new Date());
  const daysLeft = daysBetweenTwoDates(currentDate, expDate);
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
