import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ProductCard = ({product, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{uri: product.image}}
        style={styles.image}
        resizeMode="contain"
      />

      <Text numberOfLines={2} style={styles.title}>
        {product.title}
      </Text>

      <Text style={styles.price}>
        ₹ {product.price}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(ProductCard);

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#f3f4f6', 
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  image: {
    height: 120,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  price: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#15803d', 
  },
});
