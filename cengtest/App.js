/*
Customer Engagement MVP - Build simple UI screens or flows and demonstrate the customer engagement feature. 
Login into the application - as of now it just re-directs the flow to next page, in future - need to include firebase authentication (Issues in tagging firebase libraries with snack)
Scan feature to scan the product barcode or RFID
Details page to get the details from firebase database and render to UI. Notify stores associates
Chat feature to provide chat capability between customer and store associate 
*/

import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// You can import from local files
import Home from './components/Home';
import TryonHelp from './components/TryonHelp';
import ProductDetails from './components/ProductDetails';
import ProductLanding from './components/ProductLanding';
import Chat from './components/Chat';
// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white'
  },
};
export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
       <Stack.Navigator
       screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#0e1644',
          },
          headerTintColor: '#fff',
          headerTitleStyle :{
            fontWeight: 'bold',
          },
        }}       
       >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'GMart Engage' }}
        />
        <Stack.Screen name="ProductLanding" component={ProductLanding} />
        <Stack.Screen name="TryonHelp" component={TryonHelp} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Chat" component={Chat} />
        
      </Stack.Navigator>
    
    </NavigationContainer>
  );
}

