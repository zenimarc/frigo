import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProductDataToBeStored, StoredProductData } from "./components/ProductForm";

export const initAsyncStorage = async () => {
  const stored = await AsyncStorage.getItem("@storedItems");
  if (!stored) {
    await AsyncStorage.setItem("@storedItems", "{}");
  }
};

export interface StoredProductsDictData {
  [key: string]: StoredProductData;
}

//takes the stored object in asyncStorage and convert to a list of ProductDataToBeStored with correct date type
export const convertObjToArray = (obj: StoredProductsDictData): ProductDataToBeStored[] => {
  return Object.keys(obj).map((x) => {
    return { ...obj[x], expDate: new Date(obj[x].expDate), addedDate: new Date(obj[x].addedDate) };
  });
};

export const deleteTimeFromDate = (date: Date) => {
  new Date(date.setHours(0, 0, 0, 0));
};
