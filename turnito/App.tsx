import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme, StatusBar, StyleSheet, View, Text, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Registro from './src/ui/screens/Registro.js';
import Recuperar from './src/ui/screens/RecuperarCuenta.js';
import LoginScreen from './src/ui/screens/LoginScreen.js';

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundColor = isDarkMode ? '#4F3680' : '#8258D1';
  return (
    <NavigationContainer>
      
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <Text>Hola</Text>
      
    </NavigationContainer>
  );
}
