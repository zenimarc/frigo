import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useContext, useState } from "react";
import { Platform, Pressable, StyleSheet, TextInput, View, Text, Alert, Image } from "react-native";
import WheelPicker from "react-native-wheely";

import { AppContext } from "../context";
import { convertObjToArray, removeTimeFromDate, StoredProductsDictData } from "../helper_functions";
import useColorScheme from "../hooks/useColorScheme";

interface productData {
  productName: string | undefined;
  productImage: string | undefined;
  productBarCode: string | null;
}

interface formProps extends Omit<productData, "productBarCode"> {
  setScanner: Function;
  productBarCode: string | null | undefined;
}

export interface ProductDataToBeStored extends productData {
  productName: string;
  expDate: Date;
  addedDate: Date;
  quantity: number;
}

export interface StoredProductData extends Omit<ProductDataToBeStored, "expDate" | "addedDate"> {
  expDate: string; //once stored in asyncstorage the Date is serialized into a string
  addedDate: string;
}

export const getData = async (): Promise<StoredProductsDictData> => {
  const jsonValue = await AsyncStorage.getItem("@storedItems");
  return jsonValue != null ? JSON.parse(jsonValue) : {};
};

const Form = ({ setScanner, productName, productImage, productBarCode = null }: formProps) => {
  const styles = themedStyles();
  const [name, setName] = useState(productName);
  const [barCode, setBarCode] = useState(productBarCode);
  const [image, setImage] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [expDate, setExpDate] = useState<Date>(new Date(Date.now()));
  const [showPicker, setShowPicker] = useState(false);
  const [, setMode] = useState("date");
  const [, setItems] = useContext(AppContext);

  console.log("immaghiubne: ", image);

  React.useEffect(() => {
    setName(productName);
  }, [productName]);
  React.useEffect(() => {
    setBarCode(productBarCode);
  }, [productBarCode]);
  React.useEffect(() => {
    setImage(productImage);
  }, [productImage]);

  const showMode = () => {
    setShowPicker(true);
    setMode("date");
  };
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || expDate;
    if (Platform.OS !== "ios") setShowPicker(false);
    setExpDate(currentDate);
  };

  const clearData = () => {
    setBarCode(null);
    setName(undefined);
    setImage(undefined);
    setScanner(true);
  };

  const storeData = async () => {
    const key = String(barCode || name + "-" + expDate);
    try {
      const storedItems = await getData();
      const val = storedItems[key];
      if (!val) {
        const newItem: StoredProductData = {
          productBarCode: barCode || null,
          productImage: image,
          productName: name || "undefined",
          expDate: removeTimeFromDate(expDate).toISOString(),
          addedDate: removeTimeFromDate(new Date()).toISOString(),
          quantity,
        };
        storedItems[key] = newItem;
        await AsyncStorage.setItem("@storedItems", JSON.stringify(storedItems));
        console.log("fatto asyncstorage");
        setItems(convertObjToArray(storedItems));
        console.log("fatto setItems del context");
        Alert.alert("Insert", "Product inserted succesfully", [{ text: "OK" }]);
        clearData();
      } else {
        Alert.alert("Error", "Product already inserted", [{ text: "OK" }]);
      }
    } catch {
      console.log("Error getting data:" + name);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.scanContainer}>
        <View style={styles.scanContainerWrapper}>
          <View style={{ flex: 3 }}>
            <Text style={styles.text}>Scan the barcode or insert your food data below</Text>
          </View>
          <View style={{ flex: 1, paddingLeft: 20 }}>
            <Pressable
              onPress={() => {
                setScanner(true);
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Scan</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.nameInputLabel}>Name of food</Text>
        <TextInput
          style={styles.nameTextInput}
          placeholder="Insert name"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 20,
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.text, { marginRight: 10 }]}>Quantity</Text>
            <WheelPicker
              selectedIndex={quantity}
              options={new Array(99).fill(0).map((_, index) => String(index))}
              onChange={(index: number) => setQuantity(index)}
              itemTextStyle={styles.wheelItemText}
              selectedIndicatorStyle={styles.selectedWheelItem}
              visibleRest={1}
            />
            {/* (
                  <TextInput
                    style={styles.textInput2}
                    placeholder="0"
                    placeholderTextColor={"#aaa"}
                    value={quantity}
                    onChangeText={(n) => setQuantity(n)}
                    keyboardType="number-pad"
                  />
                )*/}
          </View>
          {/*<View style={{ flexDirection: "row", flex: 1 }} />*/}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.text}>Exp. Date</Text>
            {Platform.OS !== "ios" && (
              <Pressable style={styles.pickerButton} onPress={() => showMode()}>
                <Text style={styles.pickerButtonText}>
                  {expDate.toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                </Text>
              </Pressable>
            )}
            {showPicker && Platform.OS !== "ios" && (
              <DateTimePicker
                style={{ width: "100%", height: "100%" }}
                value={expDate}
                onChange={onChange}
                display="default"
                minimumDate={new Date(Date.now())}
              />
            )}
            {Platform.OS === "ios" && (
              <View style={{ width: 100 }}>
                <DateTimePicker value={expDate} onChange={onChange} minimumDate={new Date()} />
              </View>
            )}
          </View>
        </View>

        {image && (
          <View style={styles.imageWrapper}>
            <Image resizeMode="contain" style={{ height: "100%" }} source={{ uri: image }} />
          </View>
        )}

        <View
          style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10, marginHorizontal: 10 }}>
          <Pressable
            onPress={() => {
              storeData();
            }}
            style={styles.submitButton}>
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const themedStyles = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const colorScheme = useColorScheme();
  return StyleSheet.create({
    container: {
      backgroundColor: colorScheme === "dark" ? "#111" : "#eee",
      flex: 1,
      flexDirection: "column",
    },
    scanContainer: {
      backgroundColor: colorScheme === "dark" ? "#111" : "#eee",
      flexDirection: "column",
      margin: 40,
    },
    scanContainerWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      fontSize: 16,
      color: colorScheme === "dark" ? "#fff" : "#000",
      marginVertical: 5,
    },
    nameInputLabel: {
      fontSize: 16,
      color: colorScheme === "dark" ? "#fff" : "#000",
      marginVertical: 5,
      marginLeft: 5,
    },
    nameTextInput: {
      fontSize: 16,
      color: colorScheme === "dark" ? "#fff" : "#000",
      borderColor: colorScheme === "dark" ? "#fff" : "#111",
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 5,
      backgroundColor: colorScheme === "dark" ? "#111" : "#eee",
    },
    textInput2: {
      fontSize: 14,
      color: colorScheme === "dark" ? "#fff" : "#000",
      borderColor: colorScheme === "dark" ? "#fff" : "#111",
      borderRadius: 5,
      marginHorizontal: 5,
      backgroundColor: colorScheme === "dark" ? "#333" : "#eee",
      paddingHorizontal: 15,
      maxWidth: 100,
      textAlign: "center",
    },
    formContainer: {
      backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
      flex: 1,
      marginTop: 5,
      marginBottom: 20,
      marginHorizontal: 20,
      padding: 15,
      borderRadius: 20,
    },
    button: {
      backgroundColor: colorScheme === "dark" ? "#007AFF" : "#007AFF",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 15,
    },
    buttonText: {
      color: colorScheme === "dark" ? "#fff" : "#fff",
      fontSize: 14,
    },
    pickerButtonText: {
      color: colorScheme === "dark" ? "#fff" : "#000",
      fontSize: 14,
      paddingVertical: 2,
    },
    pickerButton: {
      marginHorizontal: 5,
      flexDirection: "row-reverse",
      backgroundColor: colorScheme === "dark" ? "#333" : "#eee",
      borderRadius: 5,
      justifyContent: "center",
      alignSelf: "center",
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    datePicker: {
      width: 320,
      height: 260,
    },
    submitButton: {
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colorScheme === "dark" ? "#007AFF" : "#007AFF",
      paddingVertical: 5,
      borderRadius: 20,
      paddingHorizontal: 10,
    },
    wheelItemText: {
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    selectedWheelItem: {
      backgroundColor: colorScheme === "dark" ? "#222" : "#eee",
    },
    imageWrapper: {
      height: 250,
      marginTop: 20,
    },
  });
};

export default Form;
