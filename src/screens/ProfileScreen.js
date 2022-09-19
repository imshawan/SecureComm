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
        backgroundColor: '#8b97b0',
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
        color: colors.white,
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
        color: colors.white
    },
    rowContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
    },
    backgroundObject: {
        height: 160, 
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
        marginTop: -30
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
        height: 120,
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
        // marginTop: 10,
        marginBottom: 4,
    },
    usernameText: {
        fontFamily: 'SF-Pro-Rounded-Regular',
        fontSize: fontSizes.medium,
        lineHeight: fontSizes.medium,
        color: colors.lightBlack
    },
    statusContainer: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: colors.lightestBlue,
        marginTop: 10,
        marginRight: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    detailsContainer: {
        width: '30%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsHeadText: {
        // marginTop: 3,
        fontFamily: 'SF-Pro-Rounded-Regular',
        color: colors.lightBlack,
        fontSize: fontSizes.small,
        lineHeight: fontSizes.small,
    },
    detailsSubText: {
        marginTop: 4,
        fontFamily: 'SF-Pro-Rounded-Bold',
        color: colors.black,
        fontSize: fontSizes.medium,
        lineHeight: fontSizes.medium
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
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        backgroundColor: colors.lightestBlue,
        minHeight: 60,
        marginBottom: 10,
        marginTop: 0,
    },
    cardInnerChipps: {
        marginTop: 5,
        // backgroundColor: colors.white,
        height: 32,
        // borderRadius: 5,
        // width: 95,
    },
    chippsTextStyle: {
        paddingHorizontal: 15,
        paddingTop: 9,
        fontSize: fontSizes.medium,
        fontFamily: 'SF-Pro-Rounded-Bold',
        color: colors.black,
        lineHeight: fontSizes.medium,
        // backgroundColor: 'red'
    },
    cardContentText: {
        paddingHorizontal: 15,
        fontSize: fontSizes.medium,
        fontFamily: 'SF-Pro-Rounded-Regular',
        paddingBottom: 15,
        color: colors.lightBlack,
        lineHeight: fontSizes.medium + 4,
        // marginTop: -4,
        paddingTop: 15
    },
    aboutSectionHeaderContainer: {
        flexDirection: 'column',
        width: '90%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    aboutSectionHeaderText: {
        fontSize: fontSizes.large,
        color: colors.black,
        fontFamily: 'SF-Pro-Rounded-Bold',
        lineHeight: fontSizes.large
    },
    aboutSectionSubHeaderText: {
        fontSize: fontSizes.medium,
        color: colors.black,
        fontFamily: 'SF-Pro-Rounded-Regular',
        lineHeight: fontSizes.medium + 5
    },
    individualListStyle: {
        flexDirection: 'column',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: colors.lightestBlue,
        minHeight: 45,
        marginBottom: 10,
        marginTop: 0,
    },
    individualListContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 13,
    },
    individualListTextContainer: {
        paddingRight: 2,
        width: '86%'
    },
    individualListHead: {
        fontSize: fontSizes.medium,
        fontFamily: 'SF-Pro-Rounded-Bold',
        color: colors.black,
        lineHeight: fontSizes.medium,
        marginBottom: 5,
    },
    individualListSubtext: {
        fontSize: fontSizes.medium,
        fontFamily: 'SF-Pro-Rounded-Regular',
        color: colors.lightBlack,
        lineHeight: fontSizes.medium
    },
    individualListIcon: {
        color: colors.black,
        marginLeft: 15,
        width: 30,
    }
});


const ProfileChipContent = ({header, subHeader}) => {
    return (
        <View style={styles.detailsContainer}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.detailsHeadText}>{header}</Text>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.detailsSubText}>{subHeader}</Text>
        </View>
    );
}

const IndividualList = ({header, subHeader, icon}) => {
    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.individualListStyle}>
            <View style={{...styles.individualListContainer}}>
                <Icon name={icon} style={styles.individualListIcon} size={20} />
                <View style={styles.individualListTextContainer}>
                    {/* <Text numberOfLines={1} ellipsizeMode='tail' style={styles.individualListHead}>{header}</Text> */}
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.individualListSubtext}>{subHeader}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const AccountScreen = ({navigation, route}) => {
    const [profile, setProfile] = useState({
        username: '',
        about: '',
        fullname: ''
    });

    const dispatch = useDispatch();
   
    const image = 'https://images.pexels.com/photos/38537/woodland-road-falling-leaf-natural-38537.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

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
            <StatusBar barStyle='light-content' backgroundColor={"#8b97b0"} />
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.headerContent}>
                        <View style={styles.headerRow}>
                            <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.goBack()}>
                                <Icon name="arrow-left" style={styles.iconStyles} size={fontSizes.large} />
                            </TouchableOpacity>
                            <Text style={styles.headerTextStyle}>Profile</Text>
                        </View>
                    </View>
                </View>


                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.backgroundObject} />

                    <View style={styles.rowContainerStyle}>
                        <View style={styles.profileSectionContainer}>
                            <View style={styles.profileContainer}>
                                <View style={{flexDirection: "row", alignItems: 'center', width: '90%'}}>
                                    <ProfileAvtar image={image} customStyles={styles.avtarStyles} textStyle={styles.avtarTextStyles} name={getFullname()} />
                                    <View style={styles.profileRightContainer}>
                                        <Text numberOfLines={2} ellipsizeMode='tail' style={getFullname().length > 15 ? {...styles.profileNameText, height: 40} : styles.profileNameText}>{getFullname()}</Text>
                                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.usernameText} >{'@' + profile.username}</Text>
                                        <View style={getFullname().length <= 15 ? {...styles.statusContainer, marginTop: 30} : styles.statusContainer}>
                                            <ProfileChipContent header={'Status'} subHeader={'Online'} />
                                            <ProfileChipContent header={'Age'} subHeader={'24'} />
                                            <ProfileChipContent header={'Location'} subHeader={'India'} />
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

                    <View style={styles.aboutSectionHeaderContainer}>
                        <Text style={styles.aboutSectionHeaderText}>More information about</Text>
                        <Text style={styles.aboutSectionSubHeaderText}>{getFullname()}</Text>
                    </View>

                    <View style={styles.cardStyle}>
                        {/* <View style={styles.cardInnerChipps}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.chippsTextStyle}>Bio</Text>
                        </View> */}
                        <Text style={styles.cardContentText}>
                            {`Create super-engaging Instagram captions with this AI powered Instagram caption generator.`}
                            {getFullname()}
                        </Text>
                    </View>

                    <IndividualList subHeader={'Backend developer at DT'} icon={'briefcase'}/>

                    <IndividualList subHeader={'Margherita, Assam, India'} icon={'location-arrow'}/>

                    <IndividualList subHeader={'hello@imshawan.dev'} icon={'envelope'} />

                    {/* <View style={{...styles.cardStyle, backgroundColor: '#313a5670'}}>
                        <View style={{...styles.cardInnerChipps, backgroundColor: '#313a56'}}>
                            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.chippsTextStyle}>About me</Text>
                        </View>
                        <Text style={styles.cardContentText}>{profile.about}{profile.about}{profile.about}</Text>
                    </View> */}
                    
                 
                    
                </ScrollView>
            </View>
        </>
    );
}

export default AccountScreen;