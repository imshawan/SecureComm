import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text } from "react-native";
import AppDrawer from './AppDrawer';
import { NavigationContainer } from '@react-navigation/native';

import { colors, HEADER_HEIGHT } from '../common'

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.white,
        paddingHorizontal: 15,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: HEADER_HEIGHT,
        alignItems: 'center',
        shadowColor: colors.lightestGrey,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 3,
        zIndex: 9
      },
});

const HeaderComponent = (props) => {
    return (
        <View style={styles.headerContainer}>
           
        </View>
    )
}

export default HeaderComponent;