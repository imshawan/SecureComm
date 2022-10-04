import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
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
 
const SplashScreen = () => { 
  return (
    <AnimatedView animation={'fadeIn'} duration={500} style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={colors.brandColor} />
        <Image styles={{marginTop: -20}} imageSource={IMAGES.appImage} height={'45%'} width={'45%'} />
    </AnimatedView>
  );
};
 
export default SplashScreen; 
