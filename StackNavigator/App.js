import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CurrencyScreen from './src/screens/CurrencyScreen';
import IMCScreen from './src/screens/IMCScreen';
import TipScreen from './src/screens/TipSceen';
import HomeScreen from './src/screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Menu Principal' }} />
        <Stack.Screen name="IMC" component={IMCScreen} options={{ title: 'Calculadora de IMC' }} />
        <Stack.Screen name="tips" component={TipScreen} options={{ title: 'Calculadora de Propina' }} />
        <Stack.Screen name="divisas" component={CurrencyScreen} options={{ title: 'Calculadora de Divisas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
