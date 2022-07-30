import { Platform } from "react-native";

type ProductDataResp = {
  status: 0 | 1;
  data?: {
    name?: string;
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
      const imageUrl = product.product.image_url;
      const imageUrlSmall = product.product.image_url_small;
      //console.log(product);
      return {
        status: 1,
        data: {
          name: pName,
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
    const resp = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });
    return await resp.json();
  };

  return { searchRecipesGivenIngredients };
};
