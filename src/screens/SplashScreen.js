import React, {useState, useEffect} from 'react';
import { ActivityIndicator, View, StyleSheet, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../common';


 
const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);
 
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      AsyncStorage.getItem('authToken').then((value) =>
        navigation.navigate(
          value === null ? 'LoginScreen' : 'Home'
        ),
      );
    }, 2000);
  }, []);
 
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color="#000"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
 
export default SplashScreen; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
