/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from "react-redux";
import Store from './src/store';
import SecureComm from './src/Index';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={Store}>
      <PaperProvider>
        <SecureComm />
      </PaperProvider>
    </Provider>
  );
};

export default App;
