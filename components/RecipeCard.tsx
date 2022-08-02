import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export type RecipeGivenIngredientsResponse = {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
};

const RecipeCard = ({
  id,
  image,
  title,
  missedIngredientCount,
  usedIngredientCount,
}: RecipeGivenIngredientsResponse) => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[styles.containerTile, { backgroundColor: Colors[colorScheme].backgroundNeutral }]}>
      <Image source={{ uri: image }} style={styles.imageTile} resizeMode="contain" />
      <View style={{ flex: 1 }} />
      <View style={{ flex: 10 }}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={{ flexDirection: "column", flex: 7 }}>
        <Text style={styles.title}>used ingredients: {usedIngredientCount}</Text>
        <Text style={styles.title}>missing ingredients: {missedIngredientCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 25, height: 150 },
  cardContentWrapper: { margin: 5, alignItems: "center", justifyContent: "flex-end" },
  title: { fontSize: 15, fontWeight: "400", fontFamily: "lato-regular" },
  image: { resizeMode: "contain" },

  containerTile: {
    height: 200,
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    borderRadius: 10,
  },
  imageTile: {
    height: undefined,
    width: undefined,
    flex: 3,
    //backgroundColor: "#fff",
    borderRadius: 30,
  },
});

export default RecipeCard;
