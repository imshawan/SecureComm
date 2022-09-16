import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView, BackHandler } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage";
import { View as AnimatableView } from 'react-native-animatable';

import ProfileAvtar from "../components/ProfileAvtar";
import DialogBox from "../components/DialogBox";
import { colors, HEADER_HEIGHT, fontSizes, DIALOG_LABELS, BUTTONS } from '../common';
import { isAuthenticated } from "../utils";
import { log } from "../config";
import { clearCurrentRooms } from "../database";
import { roomActions } from '../store/roomListStore';


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
        width: 35,
    },
    iconStyles: {
        color: colors.black
    },
    rowContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },
    backgroundObject: {
        height: 230, 
        backgroundColor: '#8b97b0', 
        width: '100%', 
        borderBottomLeftRadius: 25, 
        borderBottomRightRadius: 25,
        position: 'relative'
    },
    profileSectionContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: -40
    },
    profileContainer: {
        flexDirection: 'column',
        height: 230,
        width: '90%',
        marginTop: -150,
        backgroundColor: colors.white,
        borderRadius: 20,
        elevation: 15,
        alignItems: 'center'
    },
    avtarStyles: {
        height: 130,
        width: 110,
        borderRadius: 10,
        paddingVertical: 10,
        paddingRight: 2,
        margin: 15,
        marginLeft: 0,
    },
    avtarTextStyles: {
        textAlign: 'left',
        fontSize: 45,
        fontFamily: 'SF-Pro-Rounded-Bold',
    },
    profileRightContainer: {
        width: '60%',
        marginLeft: 2,
        // marginLeft: 0,
    },
    profileNameText: {
        fontSize: fontSizes.large,
        fontFamily: 'SF-Pro-Rounded-Bold',
        color: colors.black,
        lineHeight: fontSizes.large,
        marginTop: 10,
        marginBottom: 4
    },
    usernameText: {
        fontFamily: 'SF-Pro-Rounded-Regular',
        fontSize: fontSizes.medium,
        lineHeight: fontSizes.medium,
        color: colors.lightBlack
    },
    statusContainer: {
        height: 40,
        backgroundColor: '#e9f1fe',
        marginTop: 20,
        marginRight: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    statusContainerText: {
        textTransform: 'uppercase',
        color: colors.black
    },
    profileButtonsContainer: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between'
    },
    buttonStyle: {
        backgroundColor: colors.brandColor,
        borderWidth: 0,
        color: colors.white,
        borderColor: colors.borderColor,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 150,
    },
    buttonTextStyle: {
        color: colors.white,
        fontSize: fontSizes.regular,
        fontFamily: 'SF-Pro-Rounded-Bold',
        lineHeight: fontSizes.regular
    },
    cardStyle: {
        flexDirection: 'column',
        backgroundColor: '#00543770',
        width: '90%',
        alignSelf: 'center',
        minHeight: 100,
        borderRadius: 15,
        marginBottom: 20,
    },
    cardInnerChipps: {
        margin: 15,
        backgroundColor: '#005437',
        height: 32,
        borderRadius: 5,
        width: 95
    },
    chippsTextStyle: {
        paddingHorizontal: 12,
        paddingVertical: 9,
        fontSize: fontSizes.regular,
        fontFamily: 'SF-Pro-Rounded-Bold',
        color: colors.white,
        lineHeight: fontSizes.regular,
    },
    cardContentText: {
        paddingHorizontal: 15,
        fontSize: fontSizes.medium,
        paddingBottom: 15,
        color: colors.black
    },
});

const AccountScreen = ({navigation, route}) => {
    const [profile, setProfile] = useState({
        username: '',
        about: ''
    });
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch();
   
    const image = 'https://images.pexels.com/photos/38537/woodland-road-falling-leaf-natural-38537.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    
    const processLogOut = async () => {
        await clearCurrentRooms();
        setVisible(false);
        await AsyncStorage.clear();
        dispatch(roomActions.clearRooms());
        navigation.navigate('LoginScreen');
    }

    const getFullname = () => {
        return [profile.firstname, profile.lastname].join(' ') || profile.username;
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

                <DialogBox
                    title={DIALOG_LABELS.areYouSure}
                    body={DIALOG_LABELS.removeAccount}
                    visible={visible}
                    setVisible={setVisible}
                    action1Text={BUTTONS.signOut}
                    action2Text={BUTTONS.close}
                    action1={processLogOut}
                />

                <ScrollView>
                    <View style={styles.backgroundObject} />

                    <View style={styles.rowContainerStyle}>
                        <View style={styles.profileSectionContainer}>
                            <View style={styles.profileContainer}>
                                <View style={{flexDirection: "row", alignItems: 'center', width: '90%'}}>
                                    <ProfileAvtar image={image} customStyles={styles.avtarStyles} textStyle={styles.avtarTextStyles} name={getFullname()} />
                                    <View style={styles.profileRightContainer}>
                                        <Text numberOfLines={2} ellipsizeMode='tail' style={styles.profileNameText}>{getFullname()}</Text>
                                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.usernameText} >{'@' + profile.username}</Text>
                                        <View style={styles.statusContainer}>
                                            <Text style={styles.statusContainerText}>Online</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.profileButtonsContainer}>
                                    <TouchableOpacity activeOpacity={0.5} style={styles.buttonStyle}>
                                        <Text style={styles.buttonTextStyle}>Message</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity activeOpacity={0.5} style={{...styles.buttonStyle, backgroundColor: colors.white, borderColor: colors.brandColor, borderWidth: 1}}>
                                        <Text style={{...styles.buttonTextStyle, color: colors.black}}>Ping</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={styles.cardStyle}>
                        <View style={styles.cardInnerChipps}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.chippsTextStyle}>About me</Text>
                        </View>
                        <Text style={styles.cardContentText}>{profile.about}{profile.about}{profile.about}{getFullname()}</Text>
                    </View>

                    <View style={{...styles.cardStyle, backgroundColor: '#313a5670'}}>
                        <View style={{...styles.cardInnerChipps, backgroundColor: '#313a56'}}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.chippsTextStyle}>About me</Text>
                        </View>
                        <Text style={styles.cardContentText}>{profile.about}{profile.about}{profile.about}</Text>
                    </View>
                    

                        {/* <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={() => setVisible(true)}
                            style={{...styles.buttonStyle}}
                        >
                            <Text style={styles.buttonTextStyle}>{BUTTONS.removeAccount}</Text>
                        </TouchableOpacity> */}
                 
                    
                </ScrollView>
            </View>
        </>
    );
}

export default AccountScreen;