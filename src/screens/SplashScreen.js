import React, {useState, useEffect} from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { View as AnimatedView } from 'react-native-animatable';
import Image from '../components/Image';

import { colors, IMAGES } from '../common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandColor,
  },
});
 
const SplashScreen = ({navigation}) => { 
  // useEffect(() => {
  //   setTimeout(() => {
  //     setAnimating(false);
  //     AsyncStorage.getItem('authToken').then((value) =>
  //       navigation.navigate(
  //         value === null ? 'LoginScreen' : 'Home'
  //       ),
  //     );
  //   }, 2000);
  // }, []);
 
  return (
    <AnimatedView animation={'fadeIn'} duration={500} style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={colors.brandColor} />
        <Image styles={{marginTop: -20}} imageSource={IMAGES.appImage} height={'45%'} width={'45%'} />
    </AnimatedView>
  );
};
 
export default SplashScreen; 
