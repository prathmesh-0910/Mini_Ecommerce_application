import React from "react";
import { View, StyleSheet } from "react-native";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";

const ShimmerCard = () => {
  return (
    <View style={styles.card}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.image}
      />

      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.title}
      />

      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={styles.price}
      />
    </View>
  );
};

export default ShimmerCard;

const styles = StyleSheet.create({
  card: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  image: {
    height: 120,
    borderRadius: 6,
    marginBottom: 8,
  },
  title: {
    height: 14,
    borderRadius: 4,
    marginBottom: 6,
    width: "100%",
  },
  price: {
    height: 16,
    width: "50%",
    borderRadius: 4,
  },
});
