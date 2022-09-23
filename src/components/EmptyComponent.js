import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors, fontSizes, fontFamily } from '../common';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    headerStyle: {
        fontSize: fontSizes.extraLarge,
        fontFamily: fontFamily.bold,
        color: colors.lightBlack,
        textAlign: 'center',
    },
    subHeaderStyle: {
        fontSize: fontSizes.medium,
        fontFamily: fontFamily.medium,
        color: colors.lightestGrey,
        lineHeight: fontSizes.medium + 5,
        textAlign: 'center',
    },
  });

 
const EmptyComponent = ({header, subHeader, IconComponent}) => {
  return (
    <View style={styles.container}>
      {IconComponent ? <IconComponent/> : ''}
        <Text style={styles.headerStyle}>{header}</Text>
        <Text style={styles.subHeaderStyle}>{subHeader}</Text>
    </View>
  );
};
 
export default EmptyComponent; 
