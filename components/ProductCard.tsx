import React from "react";
import { Image, StyleSheet, View } from "react-native";

import Colors from "../constants/Colors";
import { ProductDataToBeStored } from "../helper_data_types";
import useColorScheme from "../hooks/useColorScheme";
import ExpireIndicator from "./ExpireIndicator";
import { Text, View as ThemedView } from "./Themed";

const ProductCard = ({
  expDate,
  productBarCode,
  productImage,
  productName,
  quantity,
  addedDate,
}: ProductDataToBeStored) => {
  const styles = themedStyle();
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <ThemedView
        style={[styles.cardContentWrapper, { borderBottomColor: Colors[colorScheme].text }]}
        lightColor={Colors[colorScheme].backgroundNeutral}>
        <View style={{ width: "60%" }}>
          <Image source={{ uri: productImage, height: 100 }} style={styles.image} />
        </View>
        <Text style={styles.title}>{productName}</Text>
        <Text>scad: {expDate.toLocaleDateString()}</Text>
        <ExpireIndicator insertionDate={addedDate} expDate={expDate} />
      </ThemedView>
    </View>
  );
};

export const ProductTile = ({
  expDate,
  productBarCode,
  productImage,
  productName,
  quantity,
  addedDate,
}: ProductDataToBeStored) => {
  const colorScheme = useColorScheme();
  const styles = themedStyle();
  return (
    <View
      style={styles.containerTile}>
      {productImage ? (
        <Image source={{ uri: productImage }} style={styles.imageTile} />
      ) : (
        <Image
          source={require("../assets/images/no-picture.png")}
          style={styles.imageTile}
          resizeMode="contain"
        />
      )}
      <View style={{ flex: 1 }} />
      <View style={{ flexDirection: "column", flex: 10 }}>
        <Text style={styles.title}>{productName}</Text>
        <Text style={styles.title}>Scad: {expDate.toLocaleDateString()}</Text>
      </View>
      <View style={{ flex: 7, alignSelf: "center" }}>
        <Text style={styles.title}>Qty: {quantity}</Text>
      </View>
      <View style={{ flex: 1, alignSelf: "center", paddingBottom: 20}}>
        <ExpireIndicator insertionDate={addedDate} expDate={expDate} />
      </View>
    </View>
  );
};

const themedStyle = () => {
  const colorScheme = useColorScheme();
  return StyleSheet.create({
    container: { 
      flex: 1, 
      marginBottom: 25, 
      height: 150, 
    },
    cardContentWrapper: { 
      margin: 5, 
      alignItems: "center", 
      justifyContent: "flex-end" 
    },
    title: { 
      fontSize: 15,
      fontWeight: "bold",
      fontFamily: "lato-regular",
      color: colorScheme === "dark" ? "#fff" : "#fff"
    },
    image: { 
      resizeMode: "contain" 
    },
    containerTile: {
      marginHorizontal: 5,
      marginBottom: 10,
      padding: 10,
      flexDirection: "row",
      borderRadius: 10,
      backgroundColor: colorScheme === "dark" ? "#222" : "#fec260",
    },
    imageTile: {
      height: undefined,
      width: undefined,
      flex: 3,
      borderRadius: 30,
      minHeight: 55,
    },
  });
}
export default ProductCard;
