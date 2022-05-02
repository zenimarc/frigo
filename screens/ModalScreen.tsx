import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
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
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import ScannerBarCode from "../components/ScannerBarCode";
import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";

export default function ModalScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  const colorScheme = useColorScheme();
  const chosenStyle = colorScheme === "light" ? stylesLight : stylesDark;
  const [showScanner, setShowScanner] = useState(true);
  return (
    <>
      {showScanner && <ScannerBarCode onSuccess={() => {}} onFail={() => setShowScanner(false)} />}
      {!showScanner && <Form />}
    </>
  );
}

const Form = () => {
  const colorScheme = useColorScheme();
  const chosenStyle = colorScheme === "light" ? stylesLight : stylesDark;
  const [name, setName] = useState<string | undefined>();
  const [quantity, setQuantity] = useState<string | undefined>();
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState("date");

  const showMode = () => {
    setShowPicker(true);
    setMode("date");
  };
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  return (
    <View style={chosenStyle.container}>
      <View style={chosenStyle.container2}>
        <View style={chosenStyle.container3}>
          <Text style={chosenStyle.text}>Scan the barcode or insert your food data below</Text>
          <Pressable onPress={() => {}} style={chosenStyle.button}>
            <Text style={chosenStyle.buttonText}>Scan</Text>
          </Pressable>
        </View>
      </View>
      <View style={chosenStyle.rectangle1}>
        <View>
          <Text style={chosenStyle.rectangleText}>Name of food</Text>
          <TextInput
            style={chosenStyle.textInput}
            placeholder="Insert name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
              marginHorizontal: 5,
            }}>
            <View style={{ flexDirection: "row", flex: 2 }}>
              <Text style={chosenStyle.text}>Quantity</Text>
              <TextInput
                style={chosenStyle.textInput2}
                placeholder="0"
                value={quantity}
                onChangeText={(n) => setQuantity(n)}
                keyboardType="number-pad"
              />
            </View>
            <View style={{ flexDirection: "row", flex: 1 }} />
            <View style={{ flexDirection: "row", flex: 4 }}>
              <Text style={chosenStyle.text}>Exp. Date</Text>
              {/* TODO: still don't work on iOS, i'll check it later */}
              <Pressable style={chosenStyle.pickerButton} onPress={() => showMode()}>
                <Text style={chosenStyle.buttonText}>
                  {date.toLocaleDateString("en-US", { year: "numeric", month: "short" })}
                </Text>
              </Pressable>
              {showPicker && (
                <DateTimePicker
                  style={{ width: "100%", height: "100%" }}
                  value={date}
                  onChange={onChange}
                  display="default"
                  minimumDate={new Date(Date.now())}
                />
              )}
            </View>
          </View>

          {/*<Pressable onPress={() => {}} style={chosenStyle.submitButton}>
        <Text style={chosenStyle.buttonText}>Submit</Text>
      </Pressable>
      */}
        </View>
      </View>
    </View>
  );
};

const stylesLight = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    flex: 1,
    flexDirection: "column",
  },
  container2: {
    backgroundColor: "#eee",
    flexDirection: "column",
    margin: 20,
  },
  container3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    color: "#000",
    marginVertical: 5,
  },
  rectangleText: {
    fontSize: 16,
    color: "#000",
    marginTop: 5,
    marginLeft: 5,
  },
  textInput: {
    fontSize: 16,
    color: "#000",
    borderColor: "#111",
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "#eee",
  },
  textInput2: {
    fontSize: 16,
    color: "#000",
    borderColor: "#111",
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "#eee",
    width: 50,
    maxWidth: 100,
    textAlign: "center",
  },
  rectangle1: {
    backgroundColor: "#fff",
    flex: 1,
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  button: {
    flexDirection: "row-reverse",
    backgroundColor: "#007AFF",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
    marginLeft: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
  pickerButton: {},
  datePicker: {
    width: 320,
    height: 260,
  },
  submitButton: {},
});

const stylesDark = StyleSheet.create({
  container: {
    backgroundColor: "#111",
    flex: 1,
    flexDirection: "column",
  },
  container2: {
    backgroundColor: "#111",
    flexDirection: "column",
    margin: 20,
  },
  container3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginVertical: 5,
  },
  rectangleText: {
    fontSize: 16,
    color: "#fff",
    marginVertical: 5,
    marginLeft: 5,
  },
  textInput: {
    fontSize: 16,
    color: "#aaa",
    borderColor: "#fff",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "#111",
  },
  textInput2: {
    fontSize: 16,
    color: "#aaa",
    borderColor: "#fff",
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "#111",
    width: 50,
    maxWidth: 100,
    textAlign: "center",
  },
  rectangle1: {
    backgroundColor: "#000",
    flex: 1,
    marginTop: 5,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 5,
  },
  button: {
    flexDirection: "row-reverse",
    backgroundColor: "#007AFF",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
    marginLeft: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
  pickerButton: {
    marginHorizontal: 5,
    flexDirection: "row-reverse",
    backgroundColor: "#555",
    borderRadius: 2,
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
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
    marginRight: 10,
  },
});
