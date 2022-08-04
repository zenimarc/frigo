import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { SpoonacularAPI } from "../apiCalls";
import { StyleSheet, Image, Alert, FlatList, ScrollView } from "react-native";
import useColorScheme from "../hooks/useColorScheme";

export function RecipeModalScreen({ navigation, route }: RootStackScreenProps<"recipeModal">) {
  const [recipeId, setRecipeId] = useState<string>(route.params.recipeData.id.toString());
  const [recipeIngredients, setRecipeIngredients] = useState<any>();
  const [recipeTitle, setRecipeTitle] = useState<string>();
  const [recipeImage, setRecipeImage] = useState<string>();
  const [recipeCuisines, setRecipeCuisines] = useState<string[]>([]);
  const [recipeDishTypes, setRecipeDishTypes] = useState<string[]>([]);
  const [recipeInstructions, setRecipeInstructions] = useState<string>();
  const styles = themedStyles();

  useLayoutEffect(() => {
    navigation.setOptions({ title: recipeTitle });
  });

  useEffect(() => {
    (async () => {
      const { getRecipeInformations } = SpoonacularAPI();
      //const resp = await getRecipeInformations(route.params.id.toString());
      const resp = route.params.recipeData;
      const { extendedIngredients, title, image, cuisines, dishTypes, analyzedInstructions } = resp;
      setRecipeIngredients(extendedIngredients);
      setRecipeTitle(title);
      setRecipeImage(image);
      setRecipeCuisines(cuisines || []);
      setRecipeDishTypes(dishTypes || []);
      setRecipeInstructions(JSON.stringify(analyzedInstructions));
    })();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: recipeImage }} style={styles.image} />
      </View>
      <View style={styles.recipe}>
        <Text style={styles.subTitle}>Tags</Text>
        <View style={styles.tags}>
          <FlatList
            data={recipeCuisines.concat(recipeDishTypes)}
            renderItem={({ item }) => {
              return (
                <View style={{ backgroundColor: "#333", margin: 5, padding: 10, borderRadius: 10 }}>
                  <Text>{item}</Text>
                </View>
              );
            }}
            horizontal={true}
          />
        </View>
        <Text style={styles.subTitle}>Ingredients</Text>
        <View style={styles.tags}>
          <FlatList
            data={recipeIngredients}
            renderItem={({ item }) => {
              return (
                <View style={{ backgroundColor: "#333", margin: 5, padding: 10, borderRadius: 10 }}>
                  <Text style={{ alignSelf: "center" }}>{item.name}</Text>
                  <Text style={{ alignSelf: "center" }}>
                    {item.measures.metric.amount + " " + item.measures.metric.unitShort}
                  </Text>
                </View>
              );
            }}
            horizontal={true}
          />
        </View>
        <Text style={[styles.subTitle, { marginTop: 5 }]}>Instructions</Text>
        <ScrollView style={styles.instructionContainer}>
          <Text style={styles.instructions}>
            {recipeInstructions
              ?.replace("<ol>", "")
              .replace("</ol>", "")
              .replace(/<(?:.|\n)*?>/gm, "\n")}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const themedStyles = () => {
  const colorScheme = useColorScheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
    },
    imageContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
    },
    image: {
      height: undefined,
      width: "100%",
      borderRadius: 5,
      margin: 5,
    },
    recipe: {
      flex: 4,
      flexDirection: "column",
      backgroundColor: colorScheme == "dark" ? "#222" : "#ddd",
      borderRadius: 5,
      padding: 5,
    },
    subTitle: {
      fontWeight: "bold",
      alignSelf: "center",
      fontSize: 15,
    },
    tags: {
      flexDirection: "row",
      backgroundColor: colorScheme == "dark" ? "#222" : "#ccc",
      alignItems: "center",
    },
    instructionContainer: {
      flexDirection: "column",
      backgroundColor: colorScheme == "dark" ? "#333" : "#ccc",
      //alignItems: "center",
      borderRadius: 5,
      margin: 5,
      paddingLeft: 10,
      paddingRight: 10,
    },
    instructions: {
      fontWeight: "normal",
      textAlign: "justify",
    },
  });
};
