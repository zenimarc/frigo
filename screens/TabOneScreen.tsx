import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EditScreenInfo from "../components/EditScreenInfo";
import ProductCard from "../components/ProductCard";
import { AddButton, Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";

type productsProps = {
  name: string;
  exp_date: string;
  quantity: number;
  barCode: string;
  photo: string;
};
const mocked_data = [
  { name: "apple", exp_date: "25/05/2022", quantity: 1, barCode: "209238832", photo: "" },
  { name: "meat", exp_date: "10/05/2022", quantity: 1, barCode: "209256632", photo: "" },
  { name: "milk", exp_date: "7/05/2022", quantity: 1, barCode: "202338832", photo: "" },
  { name: "banana", exp_date: "7/05/2022", quantity: 1, barCode: "202338832", photo: "" },
  { name: "yogurt", exp_date: "7/05/2022", quantity: 1, barCode: "202338832", photo: "" },
  { name: "cheese", exp_date: "7/05/2022", quantity: 1, barCode: "202338832", photo: "" },
];

const renderItem = ({ item }: { item: productsProps }) => {
  const { name, barCode, exp_date, photo, quantity } = item;
  return (
    <View lightColor="white" darkColor="black" style={{ flex: 1 / 4 }}>
      <ProductCard expDate={exp_date} name={name} photo={photo} quantity={quantity} />
    </View>
  );
};

export default function TabOneScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  const colorScheme = useColorScheme();
  return (
    <View lightColor="white" darkColor="black" style={styles.container}>
      <FlatList
        data={mocked_data}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={4}
        horizontal={false}
      />
      <AddButton
        size={80}
        style={styles.buttonAdd}
        onPress={() => navigation.navigate("addFoodModal")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "93%",
    maxHeight: "98%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonAdd: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
