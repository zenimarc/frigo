import React, { Dispatch, SetStateAction, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import WheelPicker from "react-native-wheely";

import {
  Button,
  Falsy,
  Platform,
  Pressable,
  RecursiveArray,
  RegisteredStyle,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  Text,
  Alert,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import EditScreenInfo from "../components/EditScreenInfo";
import ScannerBarCode from "../components/ScannerBarCode";
import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";
import { mainColor1 } from "../constants/Colors";

export default function ModalScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  const colorScheme = useColorScheme();
  const [showScanner, setShowScanner] = useState(true);
  return (
    <>
      {showScanner && <ScannerBarCode onSuccess={() => {}} onFail={() => setShowScanner(false)} />}
      {!showScanner && <Form setScanner={setShowScanner} />}
    </>
  );
}

const Form = ({ setScanner }: { setScanner: Function }) => {
  const colorScheme = useColorScheme();
  const [name, setName] = useState<string | undefined>();
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState("date");

  const showMode = () => {
    setShowPicker(true);
    setMode("date");
  };
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    if (Platform.OS !== "ios") setShowPicker(false);
    setDate(currentDate);
  };

  const storeData = async () => {
    try {
      const val = await AsyncStorage.getItem(name + "date");
      if (val === null) {
        await AsyncStorage.setItem(
          name + "date",
          date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
        );
        await AsyncStorage.setItem(name + "quantity", quantity.toString());
        Alert.alert("Insert", "Product inserted succesfully", [{ text: "OK" }]);
      } else {
        Alert.alert("Error", "Product already inserted", [{ text: "OK" }]);
      }
    } catch {
      console.log("Error getting data:" + name);
    }
  };

  return (
    <View style={themedStyles().container}>
      <View style={themedStyles().container2}>
        <View style={themedStyles().container3}>
          <View style={{ flex: 3 }}>
            <Text style={themedStyles().text}>Scan the barcode or insert your food data below</Text>
          </View>
          <View style={{ flex: 1, paddingLeft: 20 }}>
            <Pressable
              onPress={() => {
                setScanner(true);
              }}
              style={themedStyles().button}>
              <Text style={themedStyles().buttonText}>Scan</Text>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={themedStyles().rectangle1}>
        <View>
          <Text style={themedStyles().rectangleText}>Name of food</Text>
          <TextInput
            style={themedStyles().textInput}
            placeholder="Insert name"
            placeholderTextColor={"#aaa"}
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
              <Text style={[themedStyles().text, { marginRight: 10 }]}>Quantity</Text>
              <WheelPicker
                selectedIndex={quantity}
                options={new Array(99).fill(0).map((_, index) => String(index))}
                onChange={(index) => setQuantity(index)}
                itemTextStyle={themedStyles().wheelItemText}
                selectedIndicatorStyle={themedStyles().selectedWheelItem}
                visibleRest={1}
              />
              {/* (
                <TextInput
                  style={ThemedStyles().textInput2}
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
              <Text style={themedStyles().text}>Exp. Date</Text>
              {Platform.OS !== "ios" && (
                <Pressable style={themedStyles().pickerButton} onPress={() => showMode()}>
                  <Text style={themedStyles().pickerButtonText}>
                    {date.toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                  </Text>
                </Pressable>
              )}
              {showPicker && Platform.OS !== "ios" && (
                <DateTimePicker
                  style={{ width: "100%", height: "100%" }}
                  value={date}
                  onChange={onChange}
                  display="default"
                  minimumDate={new Date(Date.now())}
                />
              )}
              {Platform.OS === "ios" && (
                <View style={{ width: 100 }}>
                  <DateTimePicker value={date} onChange={onChange} minimumDate={new Date()} />
                </View>
              )}
            </View>
          </View>
        </View>

        <View
          style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10, marginHorizontal: 10 }}>
          <Pressable
            onPress={() => {
              storeData();
            }}
            style={themedStyles().submitButton}>
            <Text style={themedStyles().buttonText}>Submit</Text>
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
    container2: {
      backgroundColor: colorScheme === "dark" ? "#111" : "#eee",
      flexDirection: "column",
      margin: 40,
    },
    container3: {
      flexDirection: "row",
      alignItems: "center",
    },
    text: {
      fontSize: 16,
      color: colorScheme === "dark" ? "#fff" : "#000",
      marginVertical: 5,
    },
    rectangleText: {
      fontSize: 16,
      color: colorScheme === "dark" ? "#fff" : "#000",
      marginVertical: 5,
      marginLeft: 5,
    },
    textInput: {
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
    rectangle1: {
      backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
      flex: 1,
      marginTop: 5,
      marginBottom: 20,
      marginHorizontal: 20,
      padding: 20,
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
  });
};
