import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SpoonacularAPI } from "../apiCalls";

import EditScreenInfo from "../components/EditScreenInfo";
import { RecipeResponse } from "../components/RecipeCard";
import { Text, View } from "../components/Themed";
import { AppContext } from "../context";

export default function TabTwoScreen() {
  const [items, setItems] = useContext(AppContext);
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
  const RecipeApi = SpoonacularAPI();

  useEffect(() => {
    (async () => {
      try {
        const recipesData = await RecipeApi.searchRecipesGivenIngredients(
          items.map((x) => x.productNameEng)
        );
        setRecipes(recipesData);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [items]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
