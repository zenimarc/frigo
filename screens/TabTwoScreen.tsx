import React, { useContext, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, Image, ActivityIndicator } from "react-native";
import { SpoonacularAPI } from "../apiCalls";

import EditScreenInfo from "../components/EditScreenInfo";
import RecipeCard, { RecipeGivenIngredientsResponse } from "../components/RecipeCard";
import { Text, View } from "../components/Themed";
import { AppContext } from "../context";
import { ComplexSearchResultsEntity } from "../helper_data_types";
import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";
import Colors from "../constants/Colors";
import { daysBetweenTwoDates, removeTimeFromDate } from "../helper_functions";

export default function TabTwoScreen({ navigation }: RootTabScreenProps<"TabTwo">) {
  const [refreshing, setRefreshing] = React.useState(false);
  const [firstLoading, setFirstLoading] = React.useState(true);
  const [items, setItems] = useContext(AppContext);
  const [recipes, setRecipes] = useState<ComplexSearchResultsEntity[]>([]);
  const RecipeApi = SpoonacularAPI();
  const styles = themedStyle();
  const colorScheme = useColorScheme();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    recipeApiCall().then(() => setRefreshing(false));
  }, [items]);

  const recipeApiCall = async () => {
    try {
      let ingredients = items
        .filter((value) => daysBetweenTwoDates(removeTimeFromDate(new Date()), value.expDate) <= 5)
        .map((x) => x.productNameEng);

      if (ingredients.length === 0) {
        ingredients = items.map((x) => x.productNameEng);
      }

      const ingredientsNotPassedToApi = items
        .map((x) => x.productNameEng)
        .filter((x) => !ingredients.includes(x));

      const recipesData = await RecipeApi.searchRecipesGivenIngredientsIncludeDetails(ingredients);

      //update the object counting items in frigo not passed to api request
      const recipes = recipesData.map((recipe) => {
        const newMissed = recipe.missedIngredients.filter((recipeItem) => {
          return !ingredientsNotPassedToApi.some((frigoItem) =>
            recipeItem.name.toLocaleLowerCase().includes(frigoItem.toLocaleLowerCase())
          );
        });
        const notMissedAnymore = recipe.missedIngredients.filter((x) => !newMissed.includes(x));
        const newUsed = recipe.usedIngredients.concat(notMissedAnymore);
        return {
          ...recipe,
          missedIngredients: newMissed,
          usedIngredients: newUsed,
          missedIngredientCount: newMissed.length,
          usedIngredientCount: newUsed.length,
        };
      });

      setRecipes(recipes);
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
  }, [items]);

  //console.log(recipes); //log all recipes

  const renderRecipeFun = ({ item }: { item: ComplexSearchResultsEntity }) => {
    const {
      id,
      image,
      missedIngredientCount,
      title,
      usedIngredientCount,
      readyInMinutes,
      servings,
    } = item;
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
      {firstLoading && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator
            animating={firstLoading}
            color={Colors[colorScheme].buttonTint}
            size="large"
          />
          <Text
            style={{
              color: Colors[colorScheme].buttonTint,
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "lato-regular",
            }}>
            Loading
          </Text>
        </View>
      )}

      {items.length == 0 && !firstLoading && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Image source={require("../assets/images/recipe.png")} style={styles.image} />
          <Text style={styles.initialText}>Add an ingredient to start seeing some recipes</Text>
        </View>
      )}
      {items.length > 0 && !firstLoading && (
        <FlatList
          data={recipes}
          renderItem={renderRecipeFun}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
        />
      )}
    </View>
  );
}

const themedStyle = () => {
  const colorScheme = useColorScheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme].background,
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
    image: {
      opacity: 0.5,
      resizeMode: "center",
      maxHeight: "30%",
    },
    initialText: {
      color: Colors[colorScheme].text,
      opacity: 0.5,
    },
  });
};
