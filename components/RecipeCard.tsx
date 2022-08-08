import React from "react";
import { Text } from "./Themed";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export type RecipeGivenIngredientsResponse = {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
};

interface RecipeGivenIngredients extends RecipeGivenIngredientsResponse {
  navigateToRecipe: Function;
}

const RecipeCard = ({
  id,
  image,
  title,
  missedIngredientCount,
  usedIngredientCount,
  navigateToRecipe,
}: RecipeGivenIngredients) => {
  const styles = themedStyles();

  return (
    <Pressable
      onPress={() => {
        navigateToRecipe();
      }}>
      <View style={[styles.container]}>
        <View style={styles.cardContentWrapper}>
          <Text style={styles.recipeTitle}>{title}</Text>

          <View style={styles.contentBody}>
            <Image source={{ uri: image }} style={styles.image} />

            <View style={styles.details}>
              <Text style={styles.text}>Owned ingredients: {usedIngredientCount}</Text>
              <Text style={styles.text}>Missing ingredients: {missedIngredientCount}</Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const themedStyles = () => {
  const colorScheme = useColorScheme();
  return StyleSheet.create({
    container: {
      margin: 5,
      padding: 10,
      flexDirection: "row",
      borderRadius: 10,
      backgroundColor: Colors[colorScheme].backgroundNeutral,
    },
    cardContentWrapper: {
      flex: 1,
      padding: 5,
      flexDirection: "column",
    },
    recipeTitle: {
      fontSize: 16,
      fontWeight: "500",
    },
    contentBody: {
      flex: 1,
      flexDirection: "row",
      marginTop: 10,
    },
    image: {
      flex: 2,
      minHeight: 100,
      borderRadius: 5,
    },
    details: {
      flex: 3,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    text: {
      fontSize: 15,
      fontWeight: "100",
      fontFamily: "lato-regular",
    },
  });
};

export default RecipeCard;
