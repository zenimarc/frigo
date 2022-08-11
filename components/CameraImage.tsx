import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { View, Text } from "./Themed";

export default function CameraImage({
  onSuccess,
  onFail,
}: {
  onSuccess: (image: CameraCapturedPicture) => any;
  onFail: () => any;
}) {
  const colorScheme = useColorScheme();
  const [hasCameraPermission, setHasCameraPermission] = useState<null | boolean>(null);
  let camera: Camera | null;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      console.log(photo);
      onSuccess(photo);
    }
  };

  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Camera style={styles.camera} type={CameraType.back} ref={(r) => (camera = r)} />
      <View style={{ alignItems: "center", flex: 1 }}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={async () => {
              takePicture();
            }}
            style={{
              width: 70,
              height: 70,
              bottom: 0,
              borderRadius: 50,
              backgroundColor: Colors[colorScheme].textColorful,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 10,
  },
  container: {
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    flex: 1,
    width: "100%",
    padding: 20,
    justifyContent: "center",
  },
});
