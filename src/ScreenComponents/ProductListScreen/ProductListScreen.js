import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import ShimmerCard from "../../Components/ShimmerCard/ShimmerCard";
import { API_URLS } from "../../utils/constant";

const PAGE_SIZE = 6;

const ProductListScreen = () => {
  const navigation = useNavigation();
  const tabBarHeight = useBottomTabBarHeight(); // ✅ MUST be at top

  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters(true);
  }, [searchText, selectedCategory, allProducts]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_URLS.PRODUCTS);
      if (!response.ok) throw new Error("Failed to load products");

      const data = await response.json();
      setAllProducts(data);
    } catch (err) {
      setAllProducts([]);
      setProducts([]);
      setError("No internet connection or server error");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_URLS.PRODUCTS);
      const data = await response.json();
      setCategories(["all", ...new Set(data.map(item => item.category))]);
    } catch (error) {
      setCategories(["all"]);
    }
  };

  const applyFilters = (reset = false) => {
    let filtered = allProducts;

    if (searchText.trim()) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    const nextPage = reset ? 1 : page + 1;
    const start = (nextPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    setHasMore(end < filtered.length);
    setPage(nextPage);
    setProducts(filtered.slice(0, end));
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      applyFilters(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchProducts();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("ProductDetailsScreen", { product: item })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text numberOfLines={2} style={styles.title}>
        {item.title}
      </Text>
      <Text style={styles.price}>₹ {item.price}</Text>
    </TouchableOpacity>
  );

  // ✅ Shimmer Loader
  if (loading && products.length === 0) {
    return (
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        numColumns={2}
        keyExtractor={item => item.toString()}
        renderItem={() => <ShimmerCard />}
        contentContainerStyle={{
          padding: 8,
          paddingBottom: tabBarHeight + 12,
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        removeClippedSubviews
      />
    );
  }

  // ✅ Error UI
  if (error && !loading) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.activeChip,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.activeChipText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{
          padding: 8,
          paddingBottom: tabBarHeight + 12,
        }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.4}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found</Text>
            </View>
          ) : null
        }
        removeClippedSubviews
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  searchContainer: { padding: 10 },
  searchInput: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },

  categoryWrapper: { height: 48, justifyContent: "center" },
  categoryContainer: { paddingHorizontal: 10 },
  categoryChip: {
    backgroundColor: "#eee",
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
    justifyContent: "center",
  },
  activeChip: { backgroundColor: "#2e7d32" },
  categoryText: { fontSize: 13, color: "#555", textTransform: "capitalize" },
  activeChipText: { color: "#fff", fontWeight: "bold" },

  card: {
    backgroundColor: "#f9f9f9",
    width: "48%",
    marginBottom: 12,
    borderRadius: 8,
    padding: 8,
    elevation: 3,
  },
  image: { height: 120, resizeMode: "contain", marginBottom: 8 },
  title: { fontSize: 14, fontWeight: "500" },
  price: { marginTop: 4, fontSize: 16, fontWeight: "bold", color: "#2e7d32" },

  emptyContainer: { alignItems: "center", marginTop: 80 },
  emptyText: { fontSize: 16, color: "#777" },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#d32f2f",
    marginBottom: 16,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#2e7d32",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
