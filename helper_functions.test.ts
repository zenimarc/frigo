import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { AppContext } from "./context";
import { ProductDataToBeStored, StoredProductData } from "./helper_data_types";
import {
  convertObjToArray,
  daysBetweenTwoDates,
  removeTimeFromDate,
  initAsyncStorage,
  computeProductKey,
  RemoveFood,
  getStoredItems,
  saveData,
} from "./helper_functions";

describe("helper functions", () => {
  it("convertObjToArray", () => {
    expect(
      convertObjToArray({
        "8002670008746": {
          expDate: "2022-07-23T01:52:58.387Z",
          addedDate: "2022-06-23T01:52:58.387Z",
          productBarCode: "8002670008746",
          productImage:
            "https://images.openfoodfacts.org/images/products/800/267/000/8746/front_it.3.400.jpg",
          productName: "Mozzarella",
          productNameEng: "Mozzarella",
          quantity: 1,
        },
        "8002330064600": {
          expDate: "2022-07-23T01:58:06.155Z",
          addedDate: "2022-06-23T01:52:58.387Z",
          productBarCode: "8002330064600",
          productImage:
            "https://images.openfoodfacts.org/images/products/800/233/006/4600/front_en.12.400.jpg",
          productName: "Esselunga crescenza bio",
          productNameEng: "Esselunga crescenza bio",
          quantity: 1,
        },
      })
    ).toEqual([
      {
        expDate: new Date("2022-07-23T01:52:58.387Z"),
        addedDate: new Date("2022-06-23T01:52:58.387Z"),
        productBarCode: "8002670008746",
        productImage:
          "https://images.openfoodfacts.org/images/products/800/267/000/8746/front_it.3.400.jpg",
        productName: "Mozzarella",
        productNameEng: "Mozzarella",
        quantity: 1,
      },
      {
        expDate: new Date("2022-07-23T01:58:06.155Z"),
        addedDate: new Date("2022-06-23T01:52:58.387Z"),
        productBarCode: "8002330064600",
        productImage:
          "https://images.openfoodfacts.org/images/products/800/233/006/4600/front_en.12.400.jpg",
        productName: "Esselunga crescenza bio",
        productNameEng: "Esselunga crescenza bio",
        quantity: 1,
      },
    ]);
  });

  test("init asyncStorage starts with empty {}", async () => {
    await initAsyncStorage();
    expect(await AsyncStorage.getItem("@storedItems")).toEqual("{}");
  });

  test("if count days between two dates correctly", () => {
    const startDate = new Date("2022-01-01");
    const expDate = new Date("2022-01-03");
    expect(daysBetweenTwoDates(startDate, expDate)).toBe(2);
  });

  test("if dates are truncated correctly (remove time)", () => {
    expect(removeTimeFromDate(new Date("2022-07-23T01:58:06.155Z")).toString()).toEqual(
      "Sat Jul 23 2022 00:00:00 GMT+0200 (Central European Summer Time)"
    );
  });

  test("if truncate and calculate days remaining", () => {
    const startDate = removeTimeFromDate(new Date("2022-07-23T01:58:06.155Z"));
    const expDate = removeTimeFromDate(new Date("2022-07-25T02:58:06.155Z"));
    expect(daysBetweenTwoDates(startDate, expDate)).toBe(2);
  });

  test("storing data and checking their correctness", async () => {
    const barCode = "8002670008746";
    const image = "https://images.openfoodfacts.org/images/products/800/267/000/8746/front_it.3.400.jpg";
    const name = "Mozzarella";
    const nameEng = "Mozzarella";
    const expDate = "2022-07-23T01:52:58.387Z";
    const addedDate = new Date().toISOString();
    const quantity = 1;

    let items : ProductDataToBeStored[] = [];
    const setItems = (v: ProductDataToBeStored[]) => {items = v};

    const newItem: StoredProductData = {
      productBarCode: barCode || undefined,
      productImage: image,
      productName: name || "undefined",
      productNameEng: nameEng || name || "undefined", //maybe try to translate in case
      expDate: expDate,
      addedDate: addedDate,
      quantity,
    };

    const key = computeProductKey(newItem);
    try{
      const storedItems = await getStoredItems();
      const val = storedItems[key];
      if(!val){
        storedItems[key] = newItem;
        saveData({storedItems, setItems})

        expect(storedItems).toEqual({
          "8002670008746": {
            expDate: "2022-07-23T01:52:58.387Z",
            addedDate: "2022-06-23T01:52:58.387Z",
            productBarCode: "8002670008746",
            productImage:
              "https://images.openfoodfacts.org/images/products/800/267/000/8746/front_it.3.400.jpg",
            productName: "Mozzarella",
            productNameEng: "Mozzarella",
            quantity: 1,
          }
        },
        );

        expect(items).toEqual(
          [
            {
              expDate: new Date("2022-07-23T01:52:58.387Z"),
              addedDate: new Date("2022-06-23T01:52:58.387Z"),
              productBarCode: "8002670008746",
              productImage:
                "https://images.openfoodfacts.org/images/products/800/267/000/8746/front_it.3.400.jpg",
              productName: "Mozzarella",
              productNameEng: "Mozzarella",
              quantity: 1,
            }
          ]
        )
      }
    }catch{
      console.log("Error getting data:" + name);
    }
  });

  /*test("Removal of ingredients from list",
    async () => {
      var items : ProductDataToBeStored[] = [];
      const setItems = (v: ProductDataToBeStored[]) => {items = v}

      const storedItems = {
        "8002670008746": {
          expDate: "2022-07-23T01:52:58.387Z",
          addedDate: "2022-06-23T01:52:58.387Z",
          productBarCode: "8002670008746",
          productImage:
            "https://images.openfoodfacts.org/images/products/800/267/000/8746/front_it.3.400.jpg",
          productName: "Mozzarella",
          productNameEng: "Mozzarella",
          quantity: 1,
        },
        "8002330064600": {
          expDate: "2022-07-23T01:58:06.155Z",
          addedDate: "2022-06-23T01:52:58.387Z",
          productBarCode: "8002330064600",
          productImage:
            "https://images.openfoodfacts.org/images/products/800/233/006/4600/front_en.12.400.jpg",
          productName: "Esselunga crescenza bio",
          productNameEng: "Esselunga crescenza bio",
          quantity: 1,
        },
      };

      await AsyncStorage.setItem("@storedItems", JSON.stringify(storedItems));
      setItems(convertObjToArray(storedItems));

      const item = items[0];
      const key = computeProductKey(item);

      RemoveFood({ key, setItems });

      expect(items).toEqual([
        {
          expDate: new Date("2022-07-23T01:52:58.387Z"),
          addedDate: new Date("2022-06-23T01:52:58.387Z"),
          productBarCode: "8002670008746",
          productImage:
            "https://images.openfoodfacts.org/images/products/800/267/000/8746/front_it.3.400.jpg",
          productName: "Mozzarella",
          productNameEng: "Mozzarella",
          quantity: 1,
        },
        {
          expDate: new Date("2022-07-23T01:58:06.155Z"),
          addedDate: new Date("2022-06-23T01:52:58.387Z"),
          productBarCode: "8002330064600",
          productImage:
            "https://images.openfoodfacts.org/images/products/800/233/006/4600/front_en.12.400.jpg",
          productName: "Esselunga crescenza bio",
          productNameEng: "Esselunga crescenza bio",
          quantity: 1,
        },
      ]);

      const resultItems = await getStoredItems();
      expect(resultItems).toEqual({
        "8002670008746": {
          expDate: "2022-07-23T01:52:58.387Z",
          addedDate: "2022-06-23T01:52:58.387Z",
          productBarCode: "8002670008746",
          productImage:
            "https://images.openfoodfacts.org/images/products/800/267/000/8746/front_it.3.400.jpg",
          productName: "Mozzarella",
          productNameEng: "Mozzarella",
          quantity: 1,
        },
        "8002330064600": {
          expDate: "2022-07-23T01:58:06.155Z",
          addedDate: "2022-06-23T01:52:58.387Z",
          productBarCode: "8002330064600",
          productImage:
            "https://images.openfoodfacts.org/images/products/800/233/006/4600/front_en.12.400.jpg",
          productName: "Esselunga crescenza bio",
          productNameEng: "Esselunga crescenza bio",
          quantity: 1,
        }
      });
    }
  );*/
});
