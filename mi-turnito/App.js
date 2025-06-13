import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigationStack from './src/navigator/NavigationStack.js';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/theme/ThemeContext.js';
import './src/languages/i18n';

export default function App() {
  return (
    <ThemeProvider>
    <NavigationContainer>
      <View>
        <StatusBar style="auto" />
      </View>
      <NavigationStack/>
    </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
