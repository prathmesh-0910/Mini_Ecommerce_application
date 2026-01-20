import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  addToFavorites,
  removeFromFavorites,
} from '../../redux/slices/favoritesSlice';

const ProductDetailsScreen = ({ route }) => {
  const insets = useSafeAreaInsets();

  const paramProduct = route?.params?.product;
  const product = Array.isArray(paramProduct) ? paramProduct[0] : paramProduct;

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Product not found</Text>
      </View>
    );
  }

  const isFavorite = favorites.some(item => item.id === product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {
          paddingBottom: insets.bottom + 90, // ✅ SAFE SPACE FOR TAB BAR
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* IMAGE */}
      <View style={styles.imageCard}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>

      {/* TITLE */}
      <Text style={styles.title}>{product.title}</Text>

      {/* PRICE */}
      <Text style={styles.price}>₹ {product.price}</Text>

      {/* FAVORITE BUTTON */}
      <TouchableOpacity
        style={[
          styles.favButton,
          { backgroundColor: isFavorite ? '#e53935' : '#2e7d32' },
        ]}
        onPress={toggleFavorite}
        activeOpacity={0.85}
      >
        <MaterialIcons
          name={isFavorite ? 'favorite' : 'favorite-border'}
          size={22}
          color="#fff"
        />
        <Text style={styles.favText}>
          {isFavorite ? ' Remove from Favorites' : ' Add to Favorites'}
        </Text>
      </TouchableOpacity>

      {/* DESCRIPTION */}
      <View style={styles.descCard}>
        <Text style={styles.descTitle}>Product Description</Text>
        <Text style={styles.desc}>{product.description}</Text>
      </View>

      {/* EXTRA SPACER (ABSOLUTE SAFETY) */}
      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 4,
  },
  image: {
    height: 260,
    width: '100%',
    resizeMode: 'contain',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 6,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 14,
  },

  favButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  favText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 6,
  },

  descCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    elevation: 2,
  },
  descTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  desc: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
});
