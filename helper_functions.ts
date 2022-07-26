import AsyncStorage from "@react-native-async-storage/async-storage";
import { StoredProductData } from "./components/ProductForm";

export const initAsyncStorage = async () => {
  const stored = await AsyncStorage.getItem("@storedItems");
  if (!stored) {
    await AsyncStorage.setItem("@storedItems", "{}");
  }
};

//takes the stored object in asyncStorage and convert to a list of ProductDataToBeStored with correct date type
export const convertObjToArray = (obj: { [key: string]: StoredProductData }) => {
  return Object.keys(obj).map((x) => {
    return { ...obj[x], expDate: new Date(obj[x].expDate) };
  });
};
