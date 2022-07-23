import AsyncStorage from "@react-native-async-storage/async-storage";

export const initAsyncStorage = async () => {
  const stored = await AsyncStorage.getItem("@storedItems");
  if (!stored) {
    await AsyncStorage.setItem("@storedItems", "{}");
  }
};

export const convertObjToArray = (obj: { [key: string]: any }) => {
  return Object.keys(obj).map((x) => obj[x]);
};
