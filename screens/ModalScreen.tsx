import { DarkTheme, Theme } from "@react-navigation/native";
import { setStatusBarBackgroundColor, StatusBar } from "expo-status-bar";
import React from "react";
import DateTimePicker from '@react-native-community/datetimepicker'
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
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { View, Text } from "react-native";
import useColorScheme from "../hooks/useColorScheme";

export default function ModalScreen() {
  const colorScheme = useColorScheme();
  const chosenStyle = colorScheme === "light" ? stylesLight : stylesDark;
  return (
    <SafeAreaView style={chosenStyle.container}>
      <View style={chosenStyle.container2}>
        <SafeAreaView style={chosenStyle.container3}>
          <Text style={chosenStyle.text}>Scan the barcode or insert your food data below</Text>
          <Pressable onPress={() => {}} style={chosenStyle.button}>
            <Text style={chosenStyle.buttonText}>Scan</Text>
          </Pressable>
        </SafeAreaView>
      </View>
      <View style={chosenStyle.rectangle1}>
        <Form />
      </View>
    </SafeAreaView>
  );
}

const Form = () => {
  const colorScheme = useColorScheme();
  const chosenStyle = colorScheme === "light" ? stylesLight : stylesDark;
  const [name, setName] = React.useState<String | undefined>();
  const [quantity, setQuantity] = React.useState<String | undefined>();
  const [date, setDate] = React.useState(new Date());
  return (
    <View>
      <Text style={chosenStyle.rectangleText}>Name of food</Text>
      <TextInput style={chosenStyle.textInput}
                placeholder="Insert name"
                value = {name}
                onChangeText= {(text) => setName(text)}
      />
      <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 20, marginHorizontal: 5}}>
        <View style={{flexDirection: "row", flex: 1}}>
          <Text style={chosenStyle.text}>Quantity</Text>
          <TextInput style={chosenStyle.textInput2}
                     placeholder = "0"
                     value = {quantity}
                     onChangeText = {(n) => setQuantity(n)}
                     keyboardType= "number-pad"
          ></TextInput>
        </View>
        <View style={{flex: 1}}/>
        <View style={{flexDirection: "row", flex: 1}}>
        <Text style={chosenStyle.text}>Exp. Date</Text>
          <DateTimePicker value={date}
                          onChange= {(d) => setDate(d)}
          />
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
    marginLeft: 5
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
    flex: 1
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
});
