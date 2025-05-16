import React from 'react';
import { useColorScheme, View, StatusBar, StyleSheet } from 'react-native';
//import "react-native-gesture-handler";
//import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/ui/screens/LoginScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? '#4F3680' : '#8258D1',
  };

  return (
      <View style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <LoginScreen />
      </View>
  );
}

export default App;
