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
 
const Loader = ({visible, color='#000', text='Please wait...'}) => {
  return (
    <Dialog isVisible={visible} overlayStyle={styles.container} animationType='fade' statusBarTranslucent>
      <ActivityIndicator
        animating={visible}
        color={color}
        size="large"
        style={styles.activityIndicator}
      />
      <Text style={styles.loaderText}>{text}</Text>
    </Dialog>
  );
};
 
export default Loader;
