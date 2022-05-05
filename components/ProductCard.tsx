import { StyleSheet, View } from "react-native";
import { mainColor1 } from "../constants/Colors";

import { Text, View as ThemedView } from "./Themed";

type ProductCardProps = { name: string; expDate: string; quantity: number; photo: string };

const ProductCard = ({ name, expDate, quantity, photo }: ProductCardProps) => {
  return (
    <ThemedView darkColor={mainColor1} style={styles.cardContentWrapper}>
      <Text style={styles.title}>{name}</Text>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  cardContentWrapper: { margin: 5 },
  title: { padding: 20 },
});

export default ProductCard;
