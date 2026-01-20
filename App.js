import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './src/redux/store';
import BottomTabNavigator from './src/navigation/BottomTabNavigator/BottomTabNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
