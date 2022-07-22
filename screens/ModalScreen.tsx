import React, { useState } from "react";
import { Platform, Alert } from "react-native";
import ScannerBarCode from "../components/ScannerBarCode";
import { RootTabScreenProps } from "../types";
import Form from "../components/ProductForm";

export default function ModalScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  const [showScanner, setShowScanner] = useState(true);
  const [productName, setProductName] = useState<string | undefined>();
  const [productImage, setProductImage] = useState<string | undefined>();
  const [productBarCode, setProductBarCode] = useState<number | undefined>();

  const getProduct = async (code: number) => {
    const url = "https://world.openfoodfacts.org/api/v0/product/" + code + ".json";

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "Application/json",
          "Content-Type": "Application/json",
          UserAgent: "Frigo -" + (Platform.OS === "ios" ? "ios" : "android") + " - Version - 1.0",
        },
      });

      const product = await response.json();
      if (product.status === 0) {
        Alert.alert("Error", "The product does not exists", [{ text: "OK" }]);
      } else {
        //Alert.alert("Success", "Product", [{text: "OK"}]);
        const pName = product.product.product_name || product.product.product_name_it;
        setProductName(pName);
        setProductBarCode(code);
        setProductImage(product.product.image_url);
        const imageUrlSmall = product.product.image_url_small;
        //console.log(product);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showScanner && (
        <ScannerBarCode
          onSuccess={async (code: number) => {
            setShowScanner(false);
            await getProduct(code);
          }}
          onFail={() => setShowScanner(false)}
        />
      )}
      {!showScanner && (
        <Form
          productBarCode={productBarCode}
          productName={productName}
          setScanner={setShowScanner}
          productImage={productImage}
        />
      )}
    </>
  );
}
