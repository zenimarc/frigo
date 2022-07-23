import { Image, StyleSheet, View } from "react-native";

import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";

import { Text, View as ThemedView } from "./Themed";

import { storedProductData } from "./ProductForm";

const ProductCard = ({
  expDate,
  productBarCode,
  productImage,
  productName,
  quantity,
}: storedProductData) => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <ThemedView
        style={[styles.cardContentWrapper, { borderBottomColor: Colors[colorScheme].text }]}
        lightColor={Colors[colorScheme].backgroundNeutral}>
        <View style={{ width: "60%" }}>
          <Image source={{ uri: productImage, height: 100 }} style={styles.image} />
        </View>
        <Text style={styles.title}>{productName}</Text>
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 25, height: 150 },
  cardContentWrapper: { margin: 5, alignItems: "center", justifyContent: "flex-end" },
  title: { fontSize: 15, fontWeight: "400", fontFamily: "lato-regular" },
  image: { resizeMode: "contain" },
});

export default ProductCard;
