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
          paddingBottom: insets.bottom + 90, 
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageCard}>
        <Image source={{ uri: product.image }} style={styles.image} />
      </View>

      <Text style={styles.title}>{product.title}</Text>

      <Text style={styles.price}>₹ {product.price}</Text>

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

      <View style={styles.descCard}>
        <Text style={styles.descTitle}>Product Description</Text>
        <Text style={styles.desc}>{product.description}</Text>
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
};

export default ProductDetailsScreen;

