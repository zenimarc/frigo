import AsyncStorage from "@react-native-async-storage/async-storage";
import { convertObjToArray, initAsyncStorage } from "./helper_functions";

describe("helper functions", () => {
  it("convertObjToArray", () => {
    expect(convertObjToArray({ cod1: { name: "value" }, cod2: { name: "value2" } })).toEqual([
      { name: "value" },
      { name: "value2" },
    ]);
  });

  test("init asyncStorage starts with empty {}", async () => {
    await initAsyncStorage();
    expect(await AsyncStorage.getItem("@storedItems")).toEqual("{}");
  });
});
