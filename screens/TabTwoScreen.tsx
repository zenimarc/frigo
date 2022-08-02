import React, { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SpoonacularAPI } from "../apiCalls";

import EditScreenInfo from "../components/EditScreenInfo";
import RecipeCard, { RecipeGivenIngredientsResponse } from "../components/RecipeCard";
import { Text, View } from "../components/Themed";
import { AppContext } from "../context";

export default function TabTwoScreen() {
  const [items, setItems] = useContext(AppContext);
  const [recipes, setRecipes] = useState<RecipeGivenIngredientsResponse[]>([]);
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

  console.log(recipes);

  const renderRecipeFun = ({ item }: { item: RecipeGivenIngredientsResponse }) => {
    const { id, image, missedIngredientCount, title, usedIngredientCount } = item;
    return (
      <RecipeCard
        id={id}
        image={image}
        missedIngredientCount={missedIngredientCount}
        title={title}
        usedIngredientCount={usedIngredientCount}
        key={id}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <FlatList data={recipes} renderItem={renderRecipeFun} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
