import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect } from "react";
import { Alert, FlatList, Pressable, StyleSheet } from "react-native";

import ProductCard, { ProductTile } from "../components/ProductCard";

import {
  ProductDataToBeStored,
  getStoredItems,
  StoredProductData,
} from "../components/ProductForm";
import { AddButton, View } from "../components/Themed";
import { AppContext } from "../context";
import { computeProductKey, convertObjToArray } from "../helper_functions";
import { RootTabScreenProps } from "../types";

const getRenderItemFuncGivenLayoutColumns = ({ columns }: { columns: number }) => {
  return ({ item }: { item: ProductDataToBeStored }) => {
    const {
      expDate,
      productBarCode,
      productImage,
      productName,
      quantity,
      addedDate,
      productNameEng,
    } = item;
    return (
      <View lightColor="white" darkColor="black" style={{ flex: 1 / columns }}>
        <ProductCard
          addedDate={addedDate}
          expDate={expDate}
          productBarCode={productBarCode}
          productImage={productImage}
          productName={productName}
          productNameEng={productNameEng}
          quantity={quantity}
        />
      </View>
    );
  };
};

const getRenderFunctionRows = (row: number) => {
  return ({ item }: { item: ProductDataToBeStored }) => {
    const {
      expDate,
      productBarCode,
      productImage,
      productName,
      quantity,
      addedDate,
      productNameEng,
    } = item;

    return (
      <Pressable
        onLongPress={() =>
          Alert.alert(productName, "Quantity: " + quantity, [
            {
              text: "Remove",
              onPress: () => {
                RemoveFood(item);
              },
            },
          ])
        }>
        <View lightColor="white" darkColor="black">
          <ProductTile
            addedDate={addedDate}
            expDate={expDate}
            productBarCode={productBarCode}
            productImage={productImage}
            productName={productName}
            productNameEng={productNameEng}
            quantity={quantity}
          />
        </View>
      </Pressable>
    );
  };
};

const RemoveFood = async ({ item }: { item: ProductDataToBeStored }) => {
  const [, setItems] = useContext(AppContext);
  const { expDate, productBarCode, productImage, productName, quantity, addedDate } = item;
  const key = computeProductKey(item);

  /*try{
    const storedItems = await getData();
    storedItems[key] = undefined;
    await AsyncStorage.setItem("@storedItems", JSON.stringify(storedItems));
    setItems(convertObjToArray(storedItems));
  } catch {
    console.log("Error getting data:" + name);
  }*/
};

export default function TabOneScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  /* da decidere: Magari dare la possibilità di avere 2 viste, 
una tipo questa più semplice con magari pallini colorati per indicare in scadenza 
e un'altra più dettagliata dove ogni elemento è una riga */
  const [items, setItems] = useContext(AppContext);
  useEffect(() => {
    (async () => {
      const data = await getStoredItems(); // for now we get data from asyncStorage at every refresh
      setItems(convertObjToArray(data));
      console.log("\nuseEffect della flatlist");
    })();
  }, []);

  const layoutColumns = 2;
  return (
    <View lightColor="white" darkColor="black" style={styles.container}>
      <FlatList
        data={items}
        renderItem={
          getRenderFunctionRows(
            items.length
          ) /*|| getRenderItemFuncGivenLayoutColumns({ columns: layoutColumns })*/
        }
        keyExtractor={(item) =>
          item.productBarCode
            ? String(item.productBarCode) + item.expDate
            : String(item.productName + item.expDate)
        }
        numColumns={1}
        horizontal={false}
      />
      <AddButton
        size={80}
        style={styles.buttonAdd}
        onPress={() => navigation.navigate("addFoodModal")}
      />
      <AddButton
        size={80}
        style={[styles.buttonAdd, { right: 200 }]}
        onPress={async () => await AsyncStorage.setItem("@storedItems", "{}")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 10,
  },
  box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    width: "93%",
    maxHeight: "98%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonAdd: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
