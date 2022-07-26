import AsyncStorage from "@react-native-async-storage/async-storage";
import { convertObjToArray, initAsyncStorage } from "./helper_functions";

describe("helper functions", () => {
  it("convertObjToArray", () => {
    expect(
      convertObjToArray({
        "8002670008746": {
          expDate: "2022-07-23T01:52:58.387Z",
          productBarCode: "8002670008746",
          productImage:
            "https://images.openfoodfacts.org/images/products/800/267/000/8746/front_it.3.400.jpg",
          productName: "Mozzarella",
          quantity: 1,
        },
        "8002330064600": {
          expDate: "2022-07-23T01:58:06.155Z",
          productBarCode: "8002330064600",
          productImage:
            "https://images.openfoodfacts.org/images/products/800/233/006/4600/front_en.12.400.jpg",
          productName: "Esselunga crescenza bio",
          quantity: 1,
        },
      })
    ).toEqual([
      {
        expDate: new Date("2022-07-23T01:52:58.387Z"),
        productBarCode: "8002670008746",
        productImage:
          "https://images.openfoodfacts.org/images/products/800/267/000/8746/front_it.3.400.jpg",
        productName: "Mozzarella",
        quantity: 1,
      },
      {
        expDate: new Date("2022-07-23T01:58:06.155Z"),
        productBarCode: "8002330064600",
        productImage:
          "https://images.openfoodfacts.org/images/products/800/233/006/4600/front_en.12.400.jpg",
        productName: "Esselunga crescenza bio",
        quantity: 1,
      },
    ]);
  });

  test("init asyncStorage starts with empty {}", async () => {
    await initAsyncStorage();
    expect(await AsyncStorage.getItem("@storedItems")).toEqual("{}");
  });
});
