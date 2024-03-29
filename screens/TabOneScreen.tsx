import React, { useContext, useEffect } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, Image } from "react-native";
import ProductCard, { ProductTile } from "../components/ProductCard";
import { AddButton, View } from "../components/Themed";
import { AppContext } from "../context";
import {
  computeProductKey,
  convertObjToArray,
  getStoredItems,
  RemoveFood,
} from "../helper_functions";
import { RootTabScreenProps } from "../types";
import { ProductDataToBeStored } from "../helper_data_types";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

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

const getRenderFunctionRows = (setItems: Function, navigate: Function) => {
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
        onPress={() =>
          Alert.alert(
            productName,
            "Quantity: " + quantity + "\nExpiration date: " + expDate.toDateString(),
            [
              {
                text: "Close",
                onPress: () => {},
              },
              {
                text: "Remove",
                onPress: () => {
                  const key = computeProductKey(item);
                  RemoveFood({ key, setItems });
                },
              },
              {
                text: "Edit",
                onPress: () => {
                  const key = computeProductKey(item);
                  navigate("addFoodModal", {
                    photo: undefined,
                    key,
                    scanner: false,
                    editing: true,
                  });
                },
              },
            ],
            {
              cancelable: true,
            }
          )
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

export default function TabOneScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  const [items, setItems] = useContext(AppContext);
  useEffect(() => {
    (async () => {
      const data = await getStoredItems(); // for now we get data from asyncStorage at every refresh
      setItems(convertObjToArray(data));
      console.log("\nuseEffect della flatlist");
    })();
  }, []);

  const colorScheme = useColorScheme();
  const layoutColumns = 2;
  return (
    <View lightColor="white" darkColor="black" style={styles.container}>
      {items.length > 0 && (
        <FlatList
          data={items.sort((a, b) => a.expDate.getTime() - b.expDate.getTime())}
          renderItem={
            getRenderFunctionRows(
              setItems,
              navigation.navigate
            ) /*|| getRenderItemFuncGivenLayoutColumns({ columns: layoutColumns })*/
          }
          keyExtractor={(item) =>
            item.productBarCode
              ? String(item.productBarCode) + item.expDate
              : String(item.productName + item.expDate)
          }
          numColumns={1}
          horizontal={false}
          showsVerticalScrollIndicator={false}
        />
      )}

      {items.length === 0 && (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Image source={require("../assets/images/dish.png")} style={styles.image} />
          <Text
            style={{
              color: Colors[colorScheme].text,
              opacity: 0.5,
            }}>
            No ingredient inserted yet. Add one below.
          </Text>
        </View>
      )}
      <AddButton
        size={80}
        style={styles.buttonAdd}
        onPress={() =>
          navigation.navigate("addFoodModal", {
            photo: undefined,
            key: undefined,
            scanner: true,
            editing: false,
          })
        }
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
  image: {
    opacity: 0.5,
    maxHeight: "30%",
    maxWidth: "50%",
    resizeMode: "center",
  },
});
