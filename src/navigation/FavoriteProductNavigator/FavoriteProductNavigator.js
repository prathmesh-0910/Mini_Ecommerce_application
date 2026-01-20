import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProductDetailsScreen from '../../ScreenComponents/ProductDetailsScreen/ProductDetailsScreen';
import FavoriteListScreen from '../../ScreenComponents/FavoriteProductsScreen/FavoriteProductsScreen';

const Stack = createStackNavigator();

const FavoriteProductNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="FavoriteListScreen"
                component={FavoriteListScreen}
                options={{ title: 'Favorite Products' }}
            />
            <Stack.Screen
                name="ProductDetailsScreen"
                component={ProductDetailsScreen}
                options={{ title: 'Product Details' }}
            />

        </Stack.Navigator>
    );
};

export default FavoriteProductNavigator;
