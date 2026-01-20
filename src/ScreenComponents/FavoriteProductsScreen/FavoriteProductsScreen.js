import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ProductCard from "../../Components/ProductCard/ProductCard";

const FavoriteListScreen = ({ navigation }) => {
  const favorites = useSelector(state => state.favorites.items);

  if (!favorites || favorites.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No favorite products ❤️</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favorites}
      numColumns={2}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() =>
            navigation.navigate("ProductsTab", {
              screen: "ProductDetailsScreen",
              params: { product: item },
            })
          }
        />
      )}
      contentContainerStyle={{ padding: 8 }}
      columnWrapperStyle={{ justifyContent: "space-between" }}
    />
  );
};

export default FavoriteListScreen;
