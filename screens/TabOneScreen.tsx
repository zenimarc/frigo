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
  {
    name: "milk",
    exp_date: "7/05/2022",
    quantity: 1,
    barCode: "202338832",
    photo: "https://it.openfoodfacts.org/images/products/800/272/400/2966/front_it.42.400.jpg",
  },
  { name: "banana", exp_date: "7/05/2022", quantity: 1, barCode: "202338832", photo: "" },
  {
    name: "yogurt",
    exp_date: "7/05/2022",
    quantity: 1,
    barCode: "202338832",
    photo: "https://it.openfoodfacts.org/images/products/800/233/013/4341/front_it.20.400.jpg",
  },
  { name: "cheese", exp_date: "7/05/2022", quantity: 1, barCode: "202338832", photo: "" },
];

const getRenderItemFuncGivenLayoutColumns = ({ columns }: { columns: number }) => {
  return ({ item }: { item: productsProps }) => {
    const { name, barCode, exp_date, photo, quantity } = item;
    return (
      <View lightColor="white" darkColor="black" style={{ flex: 1 / columns }}>
        <ProductCard expDate={exp_date} name={name} photo={photo} quantity={quantity} />
      </View>
    );
  };
};

export default function TabOneScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  /* da decidere: Magari dare la possibilità di avere 2 viste, 
una tipo questa più semplice con magari pallini colorati per indicare in scadenza 
e un'altra più dettagliata dove ogni elemento è una riga */
  const layoutColumns = 3;
  return (
    <View lightColor="white" darkColor="black" style={styles.container}>
      <FlatList
        data={mocked_data}
        renderItem={getRenderItemFuncGivenLayoutColumns({ columns: layoutColumns })}
        keyExtractor={(item) => item.name}
        numColumns={layoutColumns}
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
