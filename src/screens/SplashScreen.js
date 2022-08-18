import React, {useState, useEffect} from 'react';
import { ActivityIndicator, View, StyleSheet, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


 
export default SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(true);
 
  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      // AsyncStorage.getItem('user_id').then((value) =>
      //   navigation.replace(
      //     value === null ? 'Auth' : 'DrawerNavigationRoutes'
      //   ),
      // );
    }, 5000);
  }, []);
 
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color="#000"
        size="large"
        style={styles.activityIndicator}
      />
      <Text>Loading...</Text>
    </View>
  );
};
 
 
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
