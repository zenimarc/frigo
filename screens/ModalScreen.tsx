import { DarkTheme, Theme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
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
  TextStyle,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import ScannerBarCode from "../components/ScannerBarCode";
import useColorScheme from "../hooks/useColorScheme";

export default function ModalScreen(theme: Theme) {
  // Per un utilizzo più immediato farei partire direttamente la scansione con in overlay le interazioni
  // come per esempio, il bottone per inserire manualmente il prodotto
  // modifichiamo direttamente tutto dentro nel ScannerBarCode component
  // (Ho spostato tutto il codice precendete in ModalContent qui sotto per riutilizzare eventualmente.)
  return <ScannerBarCode />;
}

const ModalContnet = (theme: Theme) => {
  const chosenStyle = theme !== DarkTheme ? stylesLight : stylesDark;
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
};

const Form = () => {
  const colorScheme = useColorScheme();
  const chosenStyle = colorScheme === "light" ? stylesLight : stylesDark;
  return (
    <View>
      <Text style={chosenStyle.text}>Name of food</Text>
    </View>
  );
};

const stylesLight = StyleSheet.create({
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

const stylesDark = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    flex: 1,
    flexDirection: "column",
  },
  container2: {},
  container3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 12,
    color: "#fff",
  },
  rectangle1: {
    backgroundColor: "#000",
    flex: 1,
    margin: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "blue",
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },
});
