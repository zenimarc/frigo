import React, { useEffect, useLayoutEffect, useState } from "react";
import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { SpoonacularAPI } from "../apiCalls";
import { StyleSheet, Image, Alert, FlatList, ScrollView } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import useLandscapeMode from "../hooks/useLandscapeMode";

export function RecipeModalScreen({ navigation, route }: RootStackScreenProps<"recipeModal">) {
  const [recipeId, setRecipeId] = useState<string>(route.params.recipeData.id.toString());
  const [recipeIngredients, setRecipeIngredients] = useState<any>();
  const [recipeTitle, setRecipeTitle] = useState<string>();
  const [recipeImage, setRecipeImage] = useState<string>();
  const [recipeCuisines, setRecipeCuisines] = useState<string[]>([]);
  const [recipeDishTypes, setRecipeDishTypes] = useState<string[]>([]);
  const [recipeInstructions, setRecipeInstructions] = useState<any>();
  const [recipeDiets, setRecipeDiets] = useState<string[]>();
  const [recipeSummary, setRecipeSummary] = useState<string>("");
  const landscapeMode = useLandscapeMode();
  const styles = themedStyles();

  useLayoutEffect(() => {
    navigation.setOptions({ title: recipeTitle });
  });

  useEffect(() => {
    (async () => {
      const { getRecipeInformations } = SpoonacularAPI();
      //const resp = await getRecipeInformations(route.params.id.toString());

      const resp = route.params.recipeData;
      const {
        extendedIngredients,
        title,
        image,
        cuisines,
        dishTypes,
        analyzedInstructions,
        diets,
        summary,
        readyInMinutes,
        servings,
      } = resp;
      setRecipeIngredients(extendedIngredients);
      setRecipeTitle(title);
      setRecipeImage(image);
      setRecipeCuisines(cuisines || []);
      setRecipeDishTypes(dishTypes || []);
      setRecipeInstructions(analyzedInstructions);
      setRecipeDiets(diets ? diets : []);
      setRecipeSummary(
        summary.concat("\n\nReady in " + readyInMinutes + " minutes\nServings: " + servings)
      );
      if (analyzedInstructions) {
        if (analyzedInstructions[0])
          analyzedInstructions[0].steps?.forEach((item) => {
            console.log("Instructions: " + item.step);
          });
      }
    })();
  }, [route.params]);

  return (
    <View style={!landscapeMode ? styles.container : styles.containerTablet}>
      <View style={!landscapeMode ? styles.imageContainer : styles.imageContainerTablet}>
        <Image source={{ uri: recipeImage }} style={!landscapeMode ? styles.image : styles.imageTablet} />
      </View>
      <View style={styles.recipe}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          <Text style={!landscapeMode ? styles.subTitle : styles.subtitleTablet}>Summary</Text>
          <Text style={!landscapeMode ? styles.summary : styles.summaryTablet}>
            {recipeSummary.replace(/(<([^>]+)>)/gi, "")}
          </Text>
          <Text style={!landscapeMode ? styles.subTitle : styles.subtitleTablet}>Tags</Text>
          <View style={styles.tags}>
            <FlatList
              data={recipeCuisines.concat(recipeDishTypes).concat(recipeDiets ? recipeDiets : [])}
              renderItem={({ item }) => {
                return (
                  <View style={styles.tagItems} key={recipeTitle + item}>
                    <Text style={!landscapeMode ? styles.tagText : styles.tagTextTablet}>
                      {item}
                    </Text>
                  </View>
                );
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => String(recipeTitle? recipeTitle + index: index)}
            />
          </View>
          <Text style={!landscapeMode ? styles.subTitle : styles.subtitleTablet}>Ingredients</Text>
          <View style={styles.tags}>
            <FlatList
              data={recipeIngredients}
              renderItem={({ item }) => {
                return (
                  <View style={styles.tagItems} key={recipeTitle + item.name}>
                    <Text style={!landscapeMode ? styles.tagText : styles.tagTextTablet}>
                      {item.name}
                    </Text>
                    <Text style={!landscapeMode ? styles.tagMeasure : styles.tagMeasureTablet}>
                      {item.measures.metric.amount + " " + item.measures.metric.unitShort}
                    </Text>
                  </View>
                );
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => String(recipeTitle? recipeTitle + index: index)}
            />
          </View>
          <Text
            style={[!landscapeMode ? styles.subTitle : styles.subtitleTablet, { marginTop: 5 }]}>
            Instructions
          </Text>
          <View style={styles.instructionContainer}>
            {recipeInstructions && recipeInstructions[0]
              ? recipeInstructions[0].steps.map((value: { step: any; number: number }) => {
                  return (
                    <View key={value.number} style={styles.instructionView}>
                      <View style={styles.instructionIndex}>
                        <Text style={!landscapeMode ? styles.index : styles.indexTablet}>
                          {value.number}
                        </Text>
                      </View>
                      <Text style={!landscapeMode ? styles.instructions : styles.instructionTablet}>
                        {value.step}
                      </Text>
                    </View>
                  );
                })
              : false}
          </View>
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
      backgroundColor: Colors[colorScheme].background,
    },
    containerTablet: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: Colors[colorScheme].background,
    },
    imageContainer: {
      flex: 2,
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: Colors[colorScheme].background,
      margin: 5,
    },
    imageContainerTablet: {
      flex: 2,
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: Colors[colorScheme].background,
      margin: 5,
      marginLeft: 10,
      padding: 5,
    },
    image: {
      height: undefined,
      width: "100%",
      borderRadius: 5,
      margin: 5,
      resizeMode: "cover",
    },
    imageTablet: {
      height: undefined,
      width: "100%",
      borderRadius: 5,
      margin: 5,
      //aspectRatio: 1,
      resizeMode: "cover",
    },
    recipe: {
      flex: 4,
      flexDirection: "column",
      backgroundColor: Colors[colorScheme].background,
      borderRadius: 5,
      padding: 5,
    },
    scrollView: {
      margin: 5,
      marginTop: 0,
    },
    summary: {
      fontWeight: "100",
      alignSelf: "center",
      fontSize: 15,
      fontFamily: "lato-regular",
      textAlign: "justify",
      backgroundColor: colorScheme === "dark" ? "#111" : "#eeb",
      borderRadius: 10,
      padding: 10,
    },
    summaryTablet: {
      fontWeight: "100",
      alignSelf: "center",
      fontSize: 25,
      fontFamily: "lato-regular",
      textAlign: "justify",
      backgroundColor: colorScheme === "dark" ? "#111" : "#eeb",
      borderRadius: 10,
      padding: 10,
    },
    subTitle: {
      fontWeight: "100",
      alignSelf: "center",
      fontSize: 20,
      fontFamily: "roboto",
      marginVertical: 2,
    },
    subtitleTablet: {
      fontWeight: "100",
      alignSelf: "flex-start",
      fontSize: 40,
      fontFamily: "roboto",
      marginVertical: 1,
    },
    tags: {
      flexDirection: "row",
      backgroundColor: Colors[colorScheme].background,
      alignItems: "center",
    },
    tagItems: {
      backgroundColor: colorScheme == "dark" ? "#222" : "#5000ca",
      margin: 5,
      padding: 10,
      borderRadius: 10,
    },
    tagText: {
      alignSelf: "center",
      fontFamily: "roboto",
      fontWeight: "bold",
      textTransform: "capitalize",
      color: "#fff",
    },
    tagTextTablet: {
      alignSelf: "center",
      fontFamily: "roboto",
      fontWeight: "bold",
      textTransform: "capitalize",
      color: "#fff",
      fontSize: 20,
    },
    tagMeasure: {
      alignSelf: "center",
      fontFamily: "lato-regular",
      color: "#fff",
    },
    tagMeasureTablet: {
      alignSelf: "center",
      fontFamily: "lato-regular",
      color: "#fff",
      fontSize: 20,
    },
    instructionContainer: {
      flexDirection: "column",
      backgroundColor: colorScheme == "dark" ? "#111" : "#fec260",
      borderRadius: 5,
      margin: 5,
      paddingRight: 10,
      paddingBottom: 3,
    },
    instructionView: {
      flexDirection: "row",
      backgroundColor: colorScheme == "dark" ? "#111" : "#fec260",
      flex: 1,
      marginTop: 3,
    },
    instructionIndex: {
      justifyContent: "flex-start",
      alignItems: "center",
      backgroundColor: colorScheme == "dark" ? "#111" : "#fec260",
      flex: 1,
      borderRadius: 5,
    },
    index: {
      fontWeight: "bold",
      fontFamily: "lato-regular",
    },
    indexTablet: {
      fontWeight: "bold",
      fontFamily: "lato-regular",
      fontSize: 20,
    },
    instructions: {
      fontWeight: "100",
      textAlign: "justify",
      alignSelf: "center",
      fontFamily: "lato-regular",
      flex: 15,
    },
    instructionTablet: {
      fontWeight: "100",
      textAlign: "justify",
      alignSelf: "center",
      fontFamily: "lato-regular",
      fontSize: 25,
      flex: 20,
    },
  });
};
