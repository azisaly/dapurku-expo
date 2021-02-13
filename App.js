import React from 'react';
import { View, Text } from 'react-native'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Router from './navigations/Router';

export default props => {
  let [fontsLoaded] = useFonts({
    'Inter-Black': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Router />
    );
  }
};