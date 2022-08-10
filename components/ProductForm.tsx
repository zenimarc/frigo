import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { CameraCapturedPicture } from "expo-camera";
import React, { useContext, useState } from "react";
import { Platform, Pressable, StyleSheet, TextInput, View, Text, Alert, Image } from "react-native";
import WheelPicker from "react-native-wheely";

import { AppContext } from "../context";
import {
  computeProductKey,
  convertObjToArray,
  getStoredItems,
  removeTimeFromDate,
  RemoveFood,
} from "../helper_functions";
import useColorScheme from "../hooks/useColorScheme";
import Navigation from "../navigation";
import { RootTabScreenProps } from "../types";

import { formProps, StoredProductData, StoredProductsDictData } from "../helper_data_types";
import useLandscapeMode from "../hooks/useLandscapeMode";

const Form = ({
  setScanner,
  productName,
  productImage,
  productBarCode,
  navigateToHome,
  productNameEng,
  productQuantity,
  productExpDate,
  productEditing,
}: formProps) => {
  const styles = themedStyles();
  const [name, setName] = useState(productName);
  const [barCode, setBarCode] = useState(productBarCode);
  const [image, setImage] = useState<string | undefined>(productImage);
  const [quantity, setQuantity] = useState(productQuantity || 1);
  const [expDate, setExpDate] = useState<Date>(productExpDate || removeTimeFromDate(new Date()));
  const [showPicker, setShowPicker] = useState(false);
  const [, setMode] = useState("date");
  const [, setItems] = useContext(AppContext);
  const [nav, setNav] = useState<boolean>(false);
  const [isEditing] = useState<boolean>(productEditing);
  const [originalExpDate, setOriginalExpDate] = useState<Date>(
    productExpDate || removeTimeFromDate(new Date())
  );

  const navigation = useNavigation();

  const landascapeMode = useLandscapeMode();

  console.log("immaghiubne: ", image);

  const removeTimeAndSetExpDate = (date: Date) => {
    setExpDate(removeTimeFromDate(date));
  };

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
    removeTimeAndSetExpDate(currentDate);
  };

  const clearData = () => {
    setBarCode(null);
    setName(undefined);
    setImage(undefined);
  };

  const storeData = async (nav: boolean) => {
    const newItem: StoredProductData = {
      productBarCode: barCode || undefined,
      productImage: image,
      productName: name || "undefined",
      productNameEng: productNameEng || name || "undefined", //maybe try to translate in case
      expDate: expDate.toISOString(),
      addedDate: new Date().toISOString(),
      quantity,
    };
    const key = computeProductKey(newItem);
    try {
      const storedItems = await getStoredItems();
      const val = storedItems[key];
      if (!val || isEditing) {
        console.log("Value: " + val);
        storedItems[key] = newItem;
        await AsyncStorage.setItem("@storedItems", JSON.stringify(storedItems));
        console.log("fatto asyncstorage");
        setItems(convertObjToArray(storedItems));
        console.log("fatto setItems del context");

        if (originalExpDate != expDate) {
          const item = newItem;
          item.expDate = originalExpDate.toISOString();
          const key = computeProductKey(item);
          RemoveFood({ key, setItems });
        }

        Alert.alert("Insert", "Product inserted succesfully", [{ text: "OK" }]);
        clearData();
        nav ? setScanner(true) : navigateToHome();
      } else {
        Alert.alert("Error", "Product already inserted", [{ text: "OK" }]);
      }
    } catch {
      console.log("Error getting data:" + name);
    }
  };

  return (
    <>
      {!landascapeMode && (
        <>
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
              <View style={styles.quantityAndExpWrapper}>
                <View style={styles.quantityWrapper}>
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
                <View style={styles.expWrapper}>
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
                      <DateTimePicker
                        value={expDate}
                        onChange={onChange}
                        minimumDate={new Date()}
                      />
                    </View>
                  )}
                </View>
              </View>

              <View style={styles.imageWrapper}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("cameraModal", {
                      sendItemBack: true,
                      receiverRouteName: "addFoodModal",
                    })
                  }>
                  {image ? (
                    <Image
                      resizeMode="contain"
                      style={{ height: "100%" }}
                      source={{ uri: image }}
                    />
                  ) : (
                    <Image
                      resizeMode="contain"
                      style={styles.imageOverlay}
                      source={require("../assets/images/no-picture.png")}
                    />
                  )}
                </Pressable>
              </View>

              <View style={styles.buttonsWrapper}>
                <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                  {!isEditing && (
                    <Pressable
                      onPress={() => {
                        storeData(true);
                      }}
                      style={styles.submitButton}>
                      <Text style={styles.buttonText}>Add another</Text>
                    </Pressable>
                  )}
                  <Pressable
                    onPress={() => {
                      setNav(false);
                      storeData(false);
                    }}
                    style={styles.submitButton}>
                    <Text style={styles.buttonText}>Submit</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
      {landascapeMode && (
        <>
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
            <View style={styles.formContainerLandscape}>
              <View style={styles.formWrapper}>
                <View>
                  <Text style={styles.nameInputLabel}>Name of food</Text>
                  <TextInput
                    style={styles.nameTextInput}
                    placeholder="Insert name"
                    placeholderTextColor="#aaa"
                    value={name}
                    onChangeText={(text) => setName(text)}
                  />
                </View>

                <View style={styles.quantityAndExpWrapper}>
                  <View style={styles.quantityWrapper}>
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
                  <View style={styles.expWrapper}>
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
                        <DateTimePicker
                          value={expDate}
                          onChange={onChange}
                          minimumDate={new Date()}
                        />
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.buttonsWrapper}>
                  <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                    {!isEditing && (
                      <Pressable
                        onPress={() => {
                          storeData(true);
                        }}
                        style={styles.submitButton}>
                        <Text style={styles.buttonText}>Add another</Text>
                      </Pressable>
                    )}
                    <Pressable
                      onPress={() => {
                        setNav(false);
                        storeData(false);
                      }}
                      style={styles.submitButton}>
                      <Text style={styles.buttonText}>Submit</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
              <View style={styles.imageWrapper}>
                <Pressable
                  onPress={() =>
                    navigation.navigate("cameraModal", {
                      sendItemBack: true,
                      receiverRouteName: "addFoodModal",
                    })
                  }>
                  {image ? (
                    <Image
                      resizeMode="contain"
                      style={{ height: "100%" }}
                      source={{ uri: image }}
                    />
                  ) : (
                    <Image
                      resizeMode="contain"
                      style={styles.imageOverlay}
                      source={require("../assets/images/no-picture.png")}
                    />
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
};

const themedStyles = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const colorScheme = useColorScheme();
  return StyleSheet.create({
    container: {
      backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
      flex: 1,
      flexDirection: "column",
    },
    scanContainer: {
      backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
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
      fontFamily: "lato-regular",
    },
    nameInputLabel: {
      fontSize: 16,
      color: colorScheme === "dark" ? "#fff" : "#000",
      marginVertical: 5,
      marginLeft: 5,
      fontFamily: "lato-regular",
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
      fontFamily: "lato-regular",
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
      fontFamily: "lato-regular",
    },
    formContainer: {
      backgroundColor: colorScheme === "dark" ? "#111" : "#eee",
      flex: 1,
      marginTop: 5,
      marginBottom: 20,
      marginHorizontal: 20,
      padding: 15,
      borderRadius: 20,
    },
    formContainerLandscape: {
      backgroundColor: colorScheme === "dark" ? "#111" : "#eee",
      flex: 1,
      flexDirection: "row",
      marginTop: 5,
      marginBottom: 20,
      marginHorizontal: 20,
      padding: 15,
      borderRadius: 20,
    },
    formWrapper: { flex: 1 },
    quantityAndExpWrapper: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      marginTop: 20,
    },
    quantityWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    expWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    button: {
      height: 50,
      backgroundColor: colorScheme === "dark" ? "#007AFF" : "#007AFF",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 25,
    },
    buttonText: {
      color: colorScheme === "dark" ? "#fff" : "#fff",
      fontSize: 14,
      fontFamily: "lato-regular",
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
    buttonsWrapper: { flex: 1, justifyContent: "flex-end", marginBottom: 10, marginHorizontal: 10 },
    submitButton: {
      height: 50,
      minWidth: 100,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colorScheme === "dark" ? "#007AFF" : "#007AFF",
      paddingVertical: 5,
      borderRadius: 25,
      paddingHorizontal: 10,
    },
    wheelItemText: {
      color: colorScheme === "dark" ? "#fff" : "#000",
    },
    selectedWheelItem: {
      backgroundColor: colorScheme === "dark" ? "#333" : "#eee",
    },
    imageWrapper: {
      flex: 1,
      minHeight: 200,
      marginTop: 20,
      backgroundColor: colorScheme == "dark" ? "#111" : "#eee",
    },
    imageOverlay: {
      height: "100%",
      width: "100%",
      opacity: 0.5,
    },
  });
};

export default Form;
