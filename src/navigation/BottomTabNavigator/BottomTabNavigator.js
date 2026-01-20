import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Keyboard } from 'react-native';

import ProductStackNavigator from '../ProductStacknavigator/ProductStacknavigator';
import FavoriteProductNavigator from '../FavoriteProductNavigator/FavoriteProductNavigator';
import Footer from './Footer';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardVisible(true),
    );
    const hideSub = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardVisible(false),
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props =>
        isKeyboardVisible ? null : <Footer {...props} />
      }
    >
      <Tab.Screen
        name="ProductsTab"
        component={ProductStackNavigator}
        options={{
          tabBarLabel: 'Products',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="storefront" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="FavoritesTab"
        component={FavoriteProductNavigator}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
