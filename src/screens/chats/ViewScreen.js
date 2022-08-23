import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import List from "../../components/chat/List";
import SearchBar from '../../components/SearchBar';
import ProfileAvtar from '../../components/ProfileAvtar';

import { log } from '../../config';
import { colors, HEADER_HEIGHT, fontSizes, dummyJSON, appHeaderSize } from '../../common';


const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.white,
        paddingHorizontal: 10,
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
    backNavStyle: {
        marginTop: 5,
    },
    avtarStyles: {
        paddingTop: 10,
        marginTop: 2
    },
    headerTextStyle: {
        flexDirection: 'row',
        fontSize: fontSizes.big,  
        fontWeight: 'bold',
        color: colors.black
    },
    latestMsgText: {
        fontSize: fontSizes.small
    },
    controlStyle: {
        flexDirection: 'row',
        marginTop: 2
    },
    touchControlStyle: {
        marginHorizontal: 10,
        marginVertical: 10
    }
});
const ViewScreen = ({navigation, route}) => {
    const { id, name } = route.params;

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor="#fff" />
            <View style={styles.headerContainer}>

                <View style={styles.headerContent}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={fontSizes.regular} style={styles.backNavStyle}/>
                        </TouchableOpacity>
                        <ProfileAvtar name={name} customStyles={styles.avtarStyles} />
                        <View>
                            <Text style={styles.headerTextStyle}>{name}</Text>
                            <Text style={styles.latestMsgText} numberOfLines={1} ellipsizeMode='tail'>{'Last online 2 min ago'}</Text>
                        </View>
                    </View>
                </View>

            </View>
            
        </View>
    )
};

export default ViewScreen;