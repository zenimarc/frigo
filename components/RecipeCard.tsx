import React from "react";
import { Text } from "./Themed";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import useLandscapeMode from "../hooks/useLandscapeMode";

export type RecipeGivenIngredientsResponse = {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  readyInMinutes: number;
  servings: number;
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
  readyInMinutes,
  servings,
}: RecipeGivenIngredients) => {
  const styles = themedStyles();
  const landscapeMode = useLandscapeMode();

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

            {landscapeMode && (
              <View style={styles.recipeInfo}>
                <Text style={styles.text}>Ready in {readyInMinutes} minutes</Text>
                <Text style={styles.text}>Servings: {servings}</Text>
              </View>
            )}
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
      marginHorizontal: 5,
      marginBottom: 10,
      marginTop: 0,
      padding: 10,
      flexDirection: "row",
      borderRadius: 10,
      backgroundColor: colorScheme === "dark" ? "#222" : "#3fc996",
    },
    cardContentWrapper: {
      flex: 1,
      padding: 5,
      flexDirection: "column",
    },
    recipeTitle: {
      fontSize: 16,
      fontWeight: "bold",
      fontFamily: "lato-regular",
      color: "#fff",
    },
    contentBody: {
      flex: 1,
      flexDirection: "row",
      marginTop: 10,
    },
    image: {
      flex: 1.5,
      minHeight: 100,
      borderRadius: 5,
      resizeMode: "cover",
    },
    recipeInfo: {
      marginLeft: 10,
      justifyContent: "center",
    },
    details: {
      flex: 3,
      justifyContent: "flex-end",
      alignItems: "flex-end",
    },
    text: {
      fontSize: 15,
      fontWeight: "normal",
      fontFamily: "lato-regular",
      color: "#fff",
    },
  });
};

export default RecipeCard;
