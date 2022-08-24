import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';

import { Thread } from '../../components/chat';
import ProfileAvtar from '../../components/ProfileAvtar';

import { log } from '../../config';
import { colors, HEADER_HEIGHT, fontSizes, dummyChat } from '../../common';
import { showOriginColor, showFocusColor, AnimColor } from '../../utils';


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    },
    searchBar: {
        olor: colors.black,
        height: 50
    },
    headerContainer: {
        backgroundColor: colors.white,
        // paddingHorizontal: 25,
        paddingVertical: 12,
        flexDirection: 'column',
        // justifyContent: 'space-between',
        height: HEADER_HEIGHT + 50,
        // alignItems: 'center',
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
        paddingVertical: 6,
        marginRight: 14,
        marginLeft: 0,
        paddingLeft: 0
    },
    labelStyle: {
        fontSize: fontSizes.regular,
        color: colors.black,
        fontWeight: 'bold',
        paddingVertical: 7,
        paddingRight: 7
    },
    inputStyles: {
        width: '90%',
        height: 40,
        backgroundColor: colors.white,
    },
    iconStyles: {
        color: colors.black
    },
});

const NewChatScreen = ({navigation, route}) => {
    const [search, setSearch] = useState('');

    return (<>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <View style={styles.headerContainer}>

                <View style={styles.headerContent}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" style={styles.iconStyles} size={fontSizes.large} />
                        </TouchableOpacity>
                        <Text style={styles.headerTextStyle}>New Message</Text>
                    </View>
                </View>
                <View style={styles.headerContent}>
                    <Text style={styles.labelStyle}>To</Text>
                    <TextInput style={styles.inputStyles} placeholder="@username or name"/>
                </View>


            </View>
        </View>
        </>
    )
};

export default NewChatScreen;