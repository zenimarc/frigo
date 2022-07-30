import React, { useState } from "react";
import { Platform, Alert } from "react-native";
import ScannerBarCode from "../components/ScannerBarCode";
import { RootTabScreenProps } from "../types";
import Form from "../components/ProductForm";
import { getProductDataFromApi } from "../apiCalls";

export default function ModalScreen({ navigation }: RootTabScreenProps<"TabOne">) {
  const [showScanner, setShowScanner] = useState(true);
  const [productName, setProductName] = useState<string | undefined>();
  const [productImage, setProductImage] = useState<string | undefined>();
  const [productBarCode, setProductBarCode] = useState<string | undefined>();

  const getProduct = async (code: string) => {
    const resp = await getProductDataFromApi(code);
    if (resp.status === 0) {
      Alert.alert("Error", "The product does not exists", [{ text: "OK" }]);
    } else {
      //Alert.alert("Success", "Product", [{text: "OK"}]);
      setProductName(resp.data?.name);
      setProductBarCode(code);
      setProductImage(resp.data?.imageUrl);
      //console.log(product);
    }
  };

  return (
    <>
      {showScanner && (
        <ScannerBarCode
          onSuccess={async (code: string) => {
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
          navigateToHome={() => navigation.navigate("TabOne")}
        />
      )}
    </>
  );
}
