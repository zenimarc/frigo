import React, { useState } from "react";
import { Platform, Alert } from "react-native";
import ScannerBarCode from "../components/ScannerBarCode";
import useColorScheme from "../hooks/useColorScheme";
import { RootTabScreenProps } from "../types";
import Form from "../components/ProductForm";

export default function ModalScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  const colorScheme = useColorScheme();
  const [showScanner, setShowScanner] = useState(true);

  const getProduct = async (code: string) => {
    const url = "https://world.openfoodfacts.org/api/v0/product/" + code + ".json";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
          UserAgent: "Frigo -" + Platform.OS === "ios" ? "ios" : "android" + "- 1.0",
        },
      });

      const product = await response.json();
      if (product.status === 0) {
        Alert.alert("Error", "The product does not exists", [{ text: "OK" }]);
      } else {
        //Alert.alert("Success", "Product", [{text: "OK"}]);
        console.log(product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showScanner && (
        <ScannerBarCode
          onSuccess={(code: string) => {
            setShowScanner(false);
            getProduct(code);
          }}
          onFail={() => setShowScanner(false)}
        />
      )}
      {!showScanner && <Form setScanner={setShowScanner} />}
    </>
  );
}
