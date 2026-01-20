import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProductListScreen from '../../ScreenComponents/ProductListScreen/ProductListScreen';
import ProductDetailsScreen from '../../ScreenComponents/ProductDetailsScreen/ProductDetailsScreen';
import FavoriteListScreen from '../../ScreenComponents/FavoriteProductsScreen/FavoriteProductsScreen';

const Stack = createStackNavigator();

const ProductStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductListScreen"
        component={ProductListScreen}
        options={{ title: 'Products' }}
      />

      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
        options={{ title: 'Product Details' }}
      />

      
    </Stack.Navigator>
  );
};

export default ProductStackNavigator;
