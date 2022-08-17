import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { ProductDataToBeStored, StoredProductData, StoredProductsDictData } from "./helper_data_types";

export const initAsyncStorage = async () => {
  const stored = await AsyncStorage.getItem("@storedItems");
  console.log(stored);
  if (!stored) {
    await AsyncStorage.setItem("@storedItems", "{}");
  }
};

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
  const expString =
    typeof productExpDate === "string" ? productExpDate : productExpDate.toISOString();
  return productBarCode ? String(productBarCode + "-" + expString) : productName + "-" + expString;
};

export const getStoredItems = async (): Promise<StoredProductsDictData> => {
  const jsonValue = await AsyncStorage.getItem("@storedItems");
  return jsonValue != null ? JSON.parse(jsonValue) : {};
};

export const RemoveFood = async ({
  key,
  setItems,
}: {
  key: string
  setItems: Function;
}) => {
  try {
    let storedItems = await getStoredItems();
    delete storedItems[key];
    await AsyncStorage.setItem("@storedItems", JSON.stringify(storedItems));
    setItems(convertObjToArray(storedItems));
    //saveData({storedItems, setItems});
  } catch {
    console.log("Error getting data:" + key);
  }
};

export const saveData = async ({
  storedItems, 
  setItems,
} : {
  storedItems: StoredProductsDictData;
  setItems: Function,
}) => {
  await AsyncStorage.setItem("@storedItems", JSON.stringify(storedItems));
  setItems(convertObjToArray(storedItems));
};
