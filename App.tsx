/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, Text, View} from 'react-native';
import ShopList from './pages/ShopList';
import ShopDetail from './pages/ShopDetail';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import firebase from 'firebase/compat/app';
import Geolocation from '@react-native-community/geolocation';
import { findClosestCity, getStateFromCoordinates } from './pages/Helper';

const stack = createNativeStackNavigator();
var config = {
  databaseURL:
    'https://store-b5a7c-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'store-b5a7c',
  storageBucket: 'gs://store-b5a7c.appspot.com',
};
firebase.initializeApp(config);

if (!firebase.apps.length) {
  firebase.initializeApp({});
} else {
  firebase.app();
}

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  },[])

  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <stack.Screen name="Home" component={ShopList} />
        <stack.Screen name="Detail" component={ShopDetail} />
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
