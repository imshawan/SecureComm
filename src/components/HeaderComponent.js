import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors, HEADER_HEIGHT, fontSizes, appHeaderSize } from '../common'
import { log } from '../config';

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.white,
        paddingHorizontal: 12,
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
        zIndex: 9,
      },
    headerRow: {
        flexDirection: 'row', 
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    headerTextStyle: {
        fontSize: appHeaderSize, 
        marginLeft: 5, 
        // fontWeight: 'bold',
        color: colors.black,
        fontFamily: 'SF-Pro-Rounded-Bold',
        lineHeight: appHeaderSize
    },
    controlStyle: {
        flexDirection: 'row',
        marginTop: 2,
        marginRight: 6
    },
    touchControlStyle: {
        marginLeft: 8,
        height: 35,
        width: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
        backgroundColor: '#e9f1fe'
    },
    iconStyles: {
        color: colors.black
    }
});

const HeaderComponent = ({image, name}) => {
    const navigation = useNavigation()

    return (
        <View style={styles.headerContainer}>

            <View style={styles.headerRow}>
            {/* <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <ProfileAvtar />
                </TouchableOpacity> */}
                <Text style={styles.headerTextStyle}>Messages</Text>
            </View>

            <View style={styles.controlStyle}>

                <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.navigate('SearchScreen')}>
                    <Icon name="search" style={styles.iconStyles} size={fontSizes.large} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.navigate('ProfileScreen')}>
                    <Icon name="user" style={styles.iconStyles} size={fontSizes.large} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.navigate('SettingsScreen')}>
                    <Icon name="cog" style={styles.iconStyles} size={fontSizes.large} />
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default HeaderComponent;