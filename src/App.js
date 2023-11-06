// In App.js in a new project

import * as React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyStack from './routes/stack';
import FlashMessage from 'react-native-flash-message';
import colors from './utils/colors';

function App() {
  return (
    <>
      <NavigationContainer>
        <StatusBar hidden backgroundColor='#FFFFFF' barStyle="dark-content" />
        <MyStack />
      </NavigationContainer>
      <FlashMessage position='top' />
    </>
  );
}

export default App;