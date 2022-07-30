import { Platform } from "react-native";

type ProductDataResp = {
  status: 0 | 1;
  data?: {
    name?: string;
    name_eng?: string;
    imageUrl?: string;
    code: string;
  };
};

export const getProductDataFromApi = async (code: string): Promise<ProductDataResp> => {
  const url = "https://world.openfoodfacts.org/api/v0/product/" + code + ".json";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
        UserAgent: "Frigo -" + (Platform.OS === "ios" ? "ios" : "android") + " - Version - 1.0",
      },
    });

    const product = await response.json();
    if (product.status === 0) {
      console.log("Error", "The product does not exists");
      return {
        status: 0,
      };
    } else {
      const pName = product.product.product_name || product.product.product_name_it;
      const pNameEng = product.product.product_name_en;
      const imageUrl = product.product.image_url;
      const imageUrlSmall = product.product.image_url_small;
      //console.log(product);
      return {
        status: 1,
        data: {
          name: pName,
          name_eng: pNameEng,
          imageUrl,
          code,
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 0,
    };
  }
};

export const SpoonacularAPI = () => {
  const _baseUrl = "https://api.spoonacular.com";
  const _apiKey = "817efa11d7b94cdb9fa258c57ca90ba9";

  const _doGetRequest = async (url: string) => {
    const resp = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });
    return await resp.json();
  };

  // TODO: there is an endpoint that can combine search by ingredients and get informations and get instructions
  // it might be a good idea to use it

  const searchRecipesGivenIngredients = async (ingredients: string[]) => {
    const _apiMethod = "/recipes/findByIngredients?";
    const params = {
      ingredients: ingredients.join(","),
      number: "10",
      limitLicense: "true",
      ranking: "1",
      ignorePantry: "true",
      apiKey: _apiKey,
    };

    const queryString = new URLSearchParams(params).toString();
    const url = _baseUrl + _apiMethod + queryString;
    return await _doGetRequest(url);
  };

  const getRecipeInformations = async (recipeID: string) => {
    //gets ingredient list, prep time ecc...
    const _apiMethod = `/recipes/${recipeID}/information?`;
    const params = {
      includeNutrition: "false",
    };
    const queryString = new URLSearchParams(params).toString();
    const url = _baseUrl + _apiMethod + queryString;
    return await _doGetRequest(url);
  };

  const getAnalyzedRecipeInstructions = async (recipeID: string) => {
    //gets instructions in step
    const _apiMethod = `/recipes/${recipeID}/analyzedInstructions?`;
    const params = {
      stepBreakdown: "true",
    };
    const queryString = new URLSearchParams(params).toString();
    const url = _baseUrl + _apiMethod + queryString;
    return await _doGetRequest(url);
  };

  return { searchRecipesGivenIngredients, getRecipeInformations, getAnalyzedRecipeInstructions };
};
