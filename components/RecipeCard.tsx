import React from "react";
import { Text } from "./Themed";
import { Image, StyleSheet, View } from "react-native";
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
    <View style={[styles.container, { backgroundColor: Colors[colorScheme].backgroundNeutral }]}>
      <View style={styles.cardContentWrapper}>
        <Text style={styles.recipeTitle}>{title}</Text>

        <View style={styles.contentBody}>
          <Image source={{ uri: image }} style={styles.image} />

          <View style={styles.details}>
            <Text style={styles.text}>used ingredients: {usedIngredientCount}</Text>
            <Text style={styles.text}>missing ingredients: {missedIngredientCount}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    borderRadius: 10,
  },
  cardContentWrapper: { flex: 1, padding: 5, flexDirection: "column" },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  contentBody: { flex: 1, flexDirection: "row", marginTop: 10 },

  image: {
    flex: 2,
    minHeight: 130,
    borderRadius: 5,
    //backgroundColor: "#fff",
  },
  details: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  text: { fontSize: 15, fontWeight: "400", fontFamily: "lato-regular" },
});

export default RecipeCard;
