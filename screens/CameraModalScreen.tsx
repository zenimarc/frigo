import React, { useState } from "react";
import { Platform, Alert } from "react-native";
import ScannerBarCode from "../components/ScannerBarCode";
import {
  ReceiverRouteNamesFromCamera as ReceiverRouteNameFromCamera,
  RootStackScreenProps,
  RootTabScreenProps,
} from "../types";
import Form from "../components/ProductForm";
import { getProductDataFromApi } from "../apiCalls";
import { Camera, CameraCapturedPicture } from "expo-camera";
import CameraImage from "../components/CameraImage";

export default function CameraModalScreen({
  route,
  navigation,
}: RootStackScreenProps<"cameraModal">) {
  const { sendItemBack, receiverRouteName } = route.params;
  return (
    <>
      <CameraImage
        onSuccess={(image) => {
          const recRoute = receiverRouteName as ReceiverRouteNameFromCamera; //to let typescript understand which are the possible routes
          navigation.navigate(recRoute, sendItemBack ? { photo: image, key: undefined, scanner:false , editing: false} : undefined);
        }}
        onFail={() => {
          console.log("fail to take photo");
        }}
      />
    </>
  );
}
