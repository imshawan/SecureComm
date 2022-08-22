import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ProfileAvtar from './ProfileAvtar';
import { colors, HEADER_HEIGHT, fontSizes } from '../common'
import { log } from '../config';

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
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
    headerRow: {
        flexDirection: 'row', 
        height: '100%'
    },
    headerTextStyle: {
        flexDirection: 'row',
        marginTop: 2,
        fontSize: fontSizes.extraLarge, 
        marginLeft: 5, 
        fontWeight: 'bold',
        color: colors.black
    },
});

const HeaderComponent = ({image, name}) => {
    const navigation = useNavigation()

    return (
        <View style={styles.headerContainer}>

            <View style={styles.headerRow}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <ProfileAvtar />
                </TouchableOpacity>
                <Text style={styles.headerTextStyle}>Messages</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                <Icon name="cog" size={fontSizes.large} />
            </TouchableOpacity>

        </View>
    )
}

export default HeaderComponent;