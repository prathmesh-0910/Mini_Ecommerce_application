import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Footer = ({navigation, stackName}) => {
  const [activeTab, setActiveTab] = useState('HomeTab');
  const {width} = useWindowDimensions();

  const tabs = [
    {name: 'ProductsTab', label: 'Products', icon: 'archive'},
    {name: 'FavoritesTab', label: 'Favorite', icon: 'heart-outline'},
  ];

  useEffect(() => {
    setActiveTab(stackName);
  }, [stackName]);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: width < 380 ? 10 : 20,
        width: '100%',
        paddingHorizontal: 10,
        alignItems: 'center',

      }}>
      <View
        style={{
          width: '100%',
          paddingVertical: 8,
          borderRadius: 18,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 6, // Responsive spacing (RN 0.71+)
          backgroundColor: 'green',
        }}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab.name}
            style={{flex: 1, alignItems: 'center'}}
            onPress={() => navigation.navigate(tab.name)}>
            <MaterialCommunityIcons
              name={tab.icon}
              size={width < 380 ? 22 : 28} // Auto resize icons
              color={activeTab === tab.name ? 'black' : 'white'}
            />
            <Text
              style={{
                fontSize: width < 380 ? 9 : 11, // Responsive font size
                color: 'white',
                fontWeight: '600',
                marginTop: 2,
              }}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Footer;
