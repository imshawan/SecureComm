import React, {useState, useEffect} from 'react';
import { ActivityIndicator, View, StyleSheet, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


 
const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);
 
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.replace('SignupScreen')
      // AsyncStorage.getItem('user_id').then((value) =>
      //   navigation.replace(
      //     value === null ? 'Auth' : 'DrawerNavigationRoutes'
      //   ),
      // );
    }, 4000);
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
    backgroundColor: '#fff',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
