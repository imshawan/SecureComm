import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import { colors, fontSizes, headerFontSize } from "../common";


const styles = StyleSheet.create({
    navigationContainer: {
        zIndex: 9, 
        top: 25, 
        left: 30, 
        position: 'absolute',
    },
      navigationActionStyle: {
        fontWeight: 'bold',
        color: colors.white,
        padding: 10
    },
      headerStyle: {
        textAlign: 'right',
        fontSize: headerFontSize,
        fontFamily: 'SF-Pro-Rounded-Bold',
        lineHeight: headerFontSize + 5,
        marginLeft: 8,
        marginTop: 15,
        color: colors.white
    },
})


const TopNavigation = ({name, customStyles={}}) => {
    const navigation = useNavigation();

    return (
        <View style={{...styles.navigationContainer, ...customStyles}}>
            <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.navigationActionStyle}>
              <Text style={{color: colors.white, fontSize: fontSizes.regular}}>
                <Icon name="arrow-left" size={fontSizes.regular} /> &nbsp; Back
              </Text>
            </TouchableOpacity>
          
          <Text style={styles.headerStyle}>{name}</Text>
      </View>
    );
}


export default TopNavigation;