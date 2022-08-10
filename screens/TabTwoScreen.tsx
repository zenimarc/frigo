import React, { useContext, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { SpoonacularAPI } from "../apiCalls";

import EditScreenInfo from "../components/EditScreenInfo";
import RecipeCard, { RecipeGivenIngredientsResponse } from "../components/RecipeCard";
import { Text, View } from "../components/Themed";
import { AppContext } from "../context";
import { ComplexSearchResultsEntity } from "../helper_data_types";
import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";

export default function TabTwoScreen({ navigation }: RootTabScreenProps<"TabTwo">) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [firstLoading, setFirstLoading] = React.useState(true);
  const [items, setItems] = useContext(AppContext);
  const [recipes, setRecipes] = useState<ComplexSearchResultsEntity[]>([]);
  const RecipeApi = SpoonacularAPI();
  const styles = themedStyle();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    recipeApiCall().then(() => setRefreshing(false));
  }, [items]);

  const recipeApiCall = async () => {
    try {
      const recipesData = await RecipeApi.searchRecipesGivenIngredientsIncludeDetails(
        items.map((x) => x.productNameEng)
      );
      setRecipes(recipesData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // get recipes only at app loading, then manual refresh is required
    (async () => {
      await recipeApiCall();
      setFirstLoading(false);
    })();
  }, []);

  //console.log(recipes); //log all recipes

  const renderRecipeFun = ({ item }: { item: ComplexSearchResultsEntity }) => {
    const { id, image, missedIngredientCount, title, usedIngredientCount, readyInMinutes, servings } = item;
    return (
      <RecipeCard
        id={id}
        image={image}
        missedIngredientCount={missedIngredientCount}
        title={title}
        usedIngredientCount={usedIngredientCount}
        key={id}
        readyInMinutes={readyInMinutes}
        servings={servings}
        navigateToRecipe={() => navigation.navigate("recipeModal", { recipeData: item })}
      />
    );
  };

  return (
    <View style={styles.container}>
      {firstLoading && <Text>Loading...</Text>}
      <FlatList
        data={recipes}
        renderItem={renderRecipeFun}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const themedStyle = () => {
  const colorScheme = useColorScheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
      padding: 5,
      paddingTop: 10,
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
}
