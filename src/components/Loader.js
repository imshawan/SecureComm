import React from 'react';
import { Dialog } from "@rneui/themed";
import { ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, fontFamily, fontSizes } from '../common';

const styles = StyleSheet.create({
  container: {
    width: '85%',
    borderRadius: 6
},
  activityIndicator: {
    alignItems: 'center',
    height: 48,
  },
  loaderText: {
    alignSelf: 'center', 
    fontFamily: fontFamily.regular, 
    fontSize: fontSizes.medium, 
    color: colors.black
  }
});
 
const Loader = ({animating, color='#000', text='Please wait...'}) => {
  return (
    <Dialog isVisible={animating} overlayStyle={styles.container} animationType='fade' statusBarTranslucent>
      <ActivityIndicator
        animating={animating}
        color={color}
        size="large"
        style={styles.activityIndicator}
      />
      <Text style={styles.loaderText}>{text}</Text>
    </Dialog>
  );
};
 
export default Loader;
