/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text, View} from 'react-native';
import ShopList from './pages/ShopList';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ShopDetail from './pages/ShopDetail';
import ImageWindow from './components/ImageWindow/ImageWindow';

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <View>
      {/* <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
      <Stack.Screen name="Home" component={ShopList} />
      </Stack.Navigator>
    </NavigationContainer> */}
      {/* <ShopList /> */}
      <ShopDetail />
      
    </View>
  );
}

export default App;
