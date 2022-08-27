import React from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import ProfileAvtar from "../components/ProfileAvtar";

import { colors, HEADER_HEIGHT, fontSizes } from '../common';


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    },
    headerContainer: {
        backgroundColor: colors.white,
        paddingVertical: 12,
        flexDirection: 'column',
        height: HEADER_HEIGHT - 5,
        shadowColor: colors.lightestGrey,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 3,
        zIndex: 9
      },
    headerRow: {
        flexDirection: 'row', 
        height: '100%', 
        alignItems: 'center',
    },
    headerTextStyle: {
        flexDirection: 'row',
        fontSize: fontSizes.extraLarge, 
        marginLeft: 5, 
        fontWeight: 'bold',
        color: colors.black,
    },
    headerContent: {
        flexDirection: 'row', 
        paddingHorizontal: 25,
        marginBottom: 8
    },
    touchControlStyle: {
        marginRight: 14,
        marginLeft: 0,
        paddingLeft: 0
    },
    iconStyles: {
        color: colors.black
    },
    rowContainerStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        width: '100%',
    },
    avtarStyles: {
        height: 150,
        width: 150,
        borderRadius: 150,
        paddingVertical: 38,
        paddingRight: 7,
        borderWidth: 5,
        borderColor: colors.white
    },
    avtarTextStyles: {
        fontSize: 50,
    },
});

const SettingsScreen = ({navigation, route}) => {
    return (<>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerContent}>
                        <View style={styles.headerRow}>
                            <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.goBack()}>
                                <Icon name="arrow-left" style={styles.iconStyles} size={fontSizes.large} />
                            </TouchableOpacity>
                            <Text style={styles.headerTextStyle}>Settings</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.rowContainerStyle}>
                    <ProfileAvtar textStyle={styles.avtarTextStyles} customStyles={styles.avtarStyles} />
                </View>
                <View>
                    <Text>Shawan Mandal</Text>
                </View>
            </View>
        </>
    );
}

export default SettingsScreen;