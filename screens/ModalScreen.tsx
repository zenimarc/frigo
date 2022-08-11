import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";
import ScannerBarCode from "../components/ScannerBarCode";
import { RootTabScreenProps } from "../types";
import Form from "../components/ProductForm";
import { getProductDataFromApi } from "../apiCalls";
import { CameraCapturedPicture } from "expo-camera";
import { getStoredItems, removeTimeFromDate } from "../helper_functions";

export default function ModalScreen({ route, navigation }: RootTabScreenProps<"TabOne">) {
  const [showScanner, setShowScanner] = useState(true);
  const [productName, setProductName] = useState<string | undefined>();
  const [productNameEng, setProductNameEng] = useState<string | undefined>();
  const [productImage, setProductImage] = useState<string | undefined>();
  const [productBarCode, setProductBarCode] = useState<string | undefined>();
  const [productExpDate, setProductExpDate] = useState<Date>(removeTimeFromDate(new Date()));
  const [productQuantity, setProductQuantity] = useState<number>(0);

  const params = useMemo(
    () => route.params || { photo: undefined, key: undefined, scanner: false, editing: false },
    [route.params]
  );

  const onSnapPhoto = useCallback(
    (photo: CameraCapturedPicture) => {
      setProductImage(photo.uri); // basic useState
    },
    [setProductImage]
  );

  useEffect(() => {
    if (params.photo) onSnapPhoto(params.photo);
  }, [params, onSnapPhoto]);

  useEffect(() => {
    (async () => {
      if (params.key) {
        const storedItems = await getStoredItems();
        setProductName(storedItems[params.key].productName);
        setProductNameEng(storedItems[params.key].productNameEng);
        setProductImage(storedItems[params.key].productImage);
        setProductBarCode(storedItems[params.key].productBarCode);
        setProductExpDate(new Date(storedItems[params.key].expDate));
        setProductQuantity(storedItems[params.key].quantity);
        setShowScanner(params.scanner);
      }
    })();
  }, [params]);

  const getProduct = async (code: string) => {
    const resp = await getProductDataFromApi(code);
    if (resp.status === 0) {
      Alert.alert("Error", "The product does not exists", [{ text: "OK" }]);
    } else {
      //Alert.alert("Success", "Product", [{text: "OK"}]);
      setProductName(resp.data?.name);
      setProductBarCode(code);
      setProductImage(resp.data?.imageUrl);
      setProductNameEng(resp.data?.name_eng);
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
          productNameEng={productNameEng}
          setScanner={setShowScanner}
          productImage={productImage}
          productQuantity={productQuantity}
          productExpDate={productExpDate}
          navigateToHome={() => navigation.navigate("TabOne")}
          productEditing={params.editing}
        />
      )}
    </>
  );
}
