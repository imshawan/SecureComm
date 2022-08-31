import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '../common';


 
const Loader = ({animating, color='#000'}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating={animating}
        color={color}
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};
 
export default Loader; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${colors.black}90`,
    zIndex: 99,
    position: 'absolute',
    height: '100%',
    width: '100%'
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
