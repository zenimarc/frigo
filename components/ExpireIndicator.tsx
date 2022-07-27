import React from "react";
import { View, Text } from "./Themed";

const mapDaysLeftToColors = (daysLeft: number) => {
  if (daysLeft < 2) {
    return "red";
  } else if (daysLeft < 5) {
    return "yellow";
  } else {
    return "green";
  }
};

const ExpireIndicator = ({ expDate, insertionDate }: { expDate: Date; insertionDate: Date }) => {
  const currentDate = new Date();

  return (
    <View>
      <Text>test</Text>
    </View>
  );
};
