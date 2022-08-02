import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { ProductDataToBeStored, StoredProductData } from "./components/ProductForm";

export const initAsyncStorage = async () => {
  const stored = await AsyncStorage.getItem("@storedItems");
  console.log(stored);
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

export const removeTimeFromDate = (date: Date) => {
  //return moment.utc(date).startOf("day").toDate();
  return new Date(date.toDateString());
};

export const daysBetweenTwoDates = (startDate: Date, endDate: Date) => {
  return moment(endDate).diff(moment(startDate), "days");
};

export const computeProductKey = (product: ProductDataToBeStored | StoredProductData) => {
  const { productBarCode, expDate: productExpDate, productName } = product;
  return productBarCode
    ? String(productBarCode + "-" + productExpDate)
    : productName + "-" + productExpDate;
};
