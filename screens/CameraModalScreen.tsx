import React, { useState } from "react";
import { Platform, Alert } from "react-native";
import ScannerBarCode from "../components/ScannerBarCode";
import { RootTabScreenProps } from "../types";
import Form from "../components/ProductForm";
import { getProductDataFromApi } from "../apiCalls";
import { Camera, CameraCapturedPicture } from "expo-camera";
import CameraImage from "../components/CameraImage";

export default function CameraModalScreen({ route, navigation }: RootTabScreenProps<"TabOne">) {
  const { onSuccess }: { onSuccess: (image: CameraCapturedPicture) => void } = route.params!;
  return (
    <>
      <CameraImage
        onSuccess={(image) => {
          onSuccess(image);
          navigation.goBack();
        }}
        onFail={() => {
          console.log("fail to take photo");
        }}
      />
    </>
  );
}
