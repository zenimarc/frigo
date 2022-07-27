import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";

import ProductCard from "../components/ProductCard";
import {
  ProductDataToBeStored,
  getData as getStoredItems,
  StoredProductData,
} from "../components/ProductForm";
import { AddButton, View } from "../components/Themed";
import { AppContext } from "../context";
import { convertObjToArray } from "../helper_functions";
import { RootTabScreenProps } from "../types";

const getRenderItemFuncGivenLayoutColumns = ({ columns }: { columns: number }) => {
  return ({ item }: { item: ProductDataToBeStored }) => {
    const { expDate, productBarCode, productImage, productName, quantity, addedDate } = item;
    return (
      <View lightColor="white" darkColor="black" style={{ flex: 1 / columns }}>
        <ProductCard
          addedDate={addedDate}
          expDate={expDate}
          productBarCode={productBarCode}
          productImage={productImage}
          productName={productName}
          quantity={quantity}
        />
      </View>
    );
  };
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
        renderItem={getRenderItemFuncGivenLayoutColumns({ columns: layoutColumns })}
        keyExtractor={(item) =>
          String(item.productBarCode) || String(item.productName + item.expDate)
        }
        numColumns={layoutColumns}
        horizontal={false}
      />
      <AddButton
        size={80}
        style={styles.buttonAdd}
        onPress={() => navigation.navigate("addFoodModal")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
