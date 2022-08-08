import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { SpoonacularAPI } from "../apiCalls";
import { StyleSheet, Image, Alert, FlatList, ScrollView } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import { AnalyzedInstructionsEntity, StepsEntity } from "../helper_data_types";

export function RecipeModalScreen({ navigation, route }: RootStackScreenProps<"recipeModal">) {
  const [recipeId, setRecipeId] = useState<string>(route.params.recipeData.id.toString());
  const [recipeIngredients, setRecipeIngredients] = useState<any>();
  const [recipeTitle, setRecipeTitle] = useState<string>();
  const [recipeImage, setRecipeImage] = useState<string>();
  const [recipeCuisines, setRecipeCuisines] = useState<string[]>([]);
  const [recipeDishTypes, setRecipeDishTypes] = useState<string[]>([]);
  const [recipeInstructions, setRecipeInstructions] = useState<any>();
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
      setRecipeInstructions(analyzedInstructions);
      if(analyzedInstructions){
        if(analyzedInstructions[0])
          analyzedInstructions[0].steps?.forEach((item) => {
            console.log("Instructions: " + item.step);
          })
      }
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
          {recipeInstructions && recipeInstructions[0] ?
            recipeInstructions[0].steps.map((value: { step: any, number: number }) => {
              return (
                <View key={value.number} style={styles.instructionView}>
                  <View style={styles.instructionIndex}>
                    <Text style={{fontWeight: "100"}}>{value.number}</Text>
                  </View>
                  <Text style={[styles.instructions, {flex: 15}]}>{value.step}</Text>
                </View>
              );
            })

            : false
          }
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
      fontWeight: "100",
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
    instructionView: {
      flexDirection: "row",
      backgroundColor: colorScheme == "dark" ? "#333" : "#ccc",
      flex: 1,
      marginTop: 3,
    },
    instructionIndex: { 
      justifyContent: "center", 
      alignItems: "center",
      backgroundColor: colorScheme == "dark" ? "#333" : "#ccc",
      flex: 1,
    },
    instructions: {
      fontWeight: "normal",
      textAlign: "justify",
      alignSelf: "center"
    },
  });
};
