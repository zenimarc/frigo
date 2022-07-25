import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Pressable, Image } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import useColorScheme from "../hooks/useColorScheme";
import { ColorfulText, View as ThemedView, Text as ThemedText } from "./Themed";
import { mainColor1, mainColor2 } from "../constants/Colors";

export default function ScannerBarCode({
  onSuccess,
  onFail,
}: {
  onSuccess: (code: string) => any;
  onFail: () => any;
}) {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    onSuccess(data);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <BarCodeOverlay />
      {scanned && <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />}
      {!scanned && (
        <View style={styles.manualDataButton}>
          <Pressable onPress={() => onFail()}>
            <ThemedView
              lightColor={mainColor1}
              darkColor={mainColor2}
              style={{ padding: 15, borderRadius: 15 }}>
              <ColorfulText>Insert data manually</ColorfulText>
            </ThemedView>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const BarCodeOverlay = () => {
  // style an overlay for the camera scanner
  return (
    <View style={styles.overlay}>
      <View style={styles.unfocusedContainer} />
      <View style={styles.middleContainer}>
        <View style={styles.unfocusedContainer} />
        <View style={styles.focusedContainer} />
        <View style={styles.unfocusedContainer} />
        <View style={styles.barcodeOverlay}>
          <Image
            source={require("../assets/images/barcode-overlay.png")}
            style={{ width: 250, height: 170, opacity: 0.2 }}
          />
        </View>
      </View>
      <View style={styles.unfocusedContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  barcodeOverlay: {
    position: "absolute",
    top: "25%",
    left: "18%",
    right: 0,
    bottom: 0,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  middleContainer: {
    flexDirection: "row",
    flex: 1.5,
  },
  focusedContainer: {
    flex: 6,
  },
  manualDataButton: {
    flex: 1,
    flexDirection: "column-reverse",
    alignItems: "center",
    marginBottom: 100,
  },
});
