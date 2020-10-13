import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet,StatusBar } from 'react-native';
import { Provider as ThemeProvider } from 'react-native-paper';
import theme from './config/theme';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './Navigator';
import FirebaseProvider from './components/FirebaseProvider';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.primary}/>
      <FirebaseProvider>
        <NavigationContainer>
          < Navigator />
        </NavigationContainer>
      </FirebaseProvider>
    </ThemeProvider>
  );
}

