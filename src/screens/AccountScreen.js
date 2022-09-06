import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView, BackHandler } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { ListItem } from "@rneui/themed";

import ProfileAvtar from "../components/ProfileAvtar";

import { colors, HEADER_HEIGHT, fontSizes } from '../common';
import { isAuthenticated } from "../utils";
import AsyncStorage from "@react-native-community/async-storage";
import { log } from "../config";


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    },
    headerContainer: {
        backgroundColor: colors.white,
        paddingVertical: 12,
        flexDirection: 'column',
        height: HEADER_HEIGHT - 10,
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
        alignItems: 'center',
    },
    headerTextStyle: {
        flexDirection: 'row',
        fontSize: fontSizes.extraLarge, 
        // marginLeft: 5, 
        // fontWeight: 'bold',
        color: colors.black,
        fontFamily: 'SF-Pro-Rounded-Bold',
        lineHeight: fontSizes.extraLarge + 5,
    },
    headerContent: {
        flexDirection: 'row', 
        paddingHorizontal: 25,
        // marginBottom: 8
    },
    touchControlStyle: {
        // marginRight: 14,
        marginLeft: 0,
        paddingLeft: 0,
        marginTop: -2,
        width: 40,
    },
    iconStyles: {
        color: colors.black
    },
    rowContainerStyle: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 12,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
    },
    avtarStyles: {
        height: 90,
        width: 90,
        borderRadius: 90,
        paddingVertical: 25,
        paddingRight: 2,
    },
    avtarTextStyles: {
        fontSize: 40,
        lineHeight: 44,
        textAlign: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    profileHeaderStyle: {
        fontSize: fontSizes.extraLarge + 2, 
        // fontWeight: 'bold',
        color: colors.black,
        fontFamily: 'SF-Pro-Rounded-Bold',
        lineHeight: fontSizes.extraLarge + 2,
    },
    profileText: {
        textAlign: 'left',
        fontSize: fontSizes.medium,
        fontFamily: 'SF-Pro-Rounded-Regular',
    },
    profileTextContainer: {
        marginLeft: 10,
        justifyContent: 'center',
        width: '66%',
    },
    menuRowsContainer: {
        flexDirection: 'row',

    },
    buttonStyle: {
        backgroundColor: colors.brandColor,
        borderWidth: 0,
        color: colors.white,
        borderColor: colors.borderColor,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 120,
        elevation: 5,
        shadowColor: colors.brandColor,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        
        elevation: 14,
    },
    buttonTextStyle: {
        color: colors.white,
        fontSize: fontSizes.regular,
        fontFamily: 'SF-Pro-Rounded-Bold',
        lineHeight: fontSizes.regular
    },
});

const AccountScreen = ({navigation, route}) => {
    const [profile, setProfile] = useState({
        username: 'Shawan Mandal',
        about: 'DeepTech Software Developer, fascinated by up and coming technologies'
    });
   
    const image = 'https://images.pexels.com/photos/38537/woodland-road-falling-leaf-natural-38537.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    
    const processLogOut = async () => {
        await AsyncStorage.clear();
        navigation.navigate('LoginScreen');
    }

    useState(() => {
        isAuthenticated();
        AsyncStorage.getItem('user').then(user => setProfile(JSON.parse(user)));

        const backHandler = BackHandler.addEventListener("hardwareBackPress", function () {
            navigation.goBack();
            return true;
        });
    
        return () => backHandler.remove();

    }, [])

    return (<>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerContent}>
                        <View style={styles.headerRow}>
                            <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.goBack()}>
                                <Icon name="arrow-left" style={styles.iconStyles} size={fontSizes.large} />
                            </TouchableOpacity>
                            <Text style={styles.headerTextStyle}>Account</Text>
                        </View>
                    </View>
                </View>

                <ScrollView>
                    <View style={styles.rowContainerStyle}>
                        <ProfileAvtar textStyle={styles.avtarTextStyles} image={profile.image} name={profile.fullname || profile.username} customStyles={styles.avtarStyles} />
                        <View style={styles.profileTextContainer}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.profileHeaderStyle}>{profile.fullname || profile.username}</Text>
                            <Text numberOfLines={2} ellipsizeMode='tail' style={styles.profileText}>{profile.about}</Text>
                        </View>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon name="chevron-right" style={styles.iconStyles} size={fontSizes.large} />
                        </View>
                    </View>
                    <View style={styles.profileContainer}>

                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={processLogOut}
                            style={{...styles.buttonStyle}}
                        >
                            <Text style={styles.buttonTextStyle}>Sign out</Text>
                        </TouchableOpacity>
                    </View>
                    
                </ScrollView>
            </View>
        </>
    );
}

export default AccountScreen;