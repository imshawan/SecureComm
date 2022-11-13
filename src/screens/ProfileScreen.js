import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useNavigation } from "@react-navigation/native";

import ProfileAvtar from "../components/ProfileAvtar";
import { colors, HEADER_HEIGHT, fontSizes, DIALOG_LABELS, BUTTONS, fontFamily, APP_REMOTE_HOST } from '../common';
import { getUserPicture } from "../utils";
import { log } from "../config";


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
        fontFamily: fontFamily.bold,
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
        height: 218,
        width: '90%',
        marginTop: -160,
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
        fontFamily: fontFamily.bold,
    },
    profileRightContainer: {
        width: '60%',
        marginLeft: 2,
        // marginLeft: 0,
    },
    profileNameText: {
        fontSize: fontSizes.large,
        fontFamily: fontFamily.bold,
        color: colors.black,
        lineHeight: fontSizes.large,
        // marginTop: 10,
        marginBottom: 4,
    },
    usernameText: {
        fontFamily: fontFamily.regular,
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
        fontFamily: fontFamily.regular,
        color: colors.lightBlack,
        fontSize: fontSizes.small,
        lineHeight: fontSizes.small,
    },
    detailsSubText: {
        marginTop: 4,
        fontFamily: fontFamily.bold,
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
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        width: 150,
    },
    buttonTextStyle: {
        color: colors.white,
        fontSize: fontSizes.regular,
        fontFamily: fontFamily.bold,
        lineHeight: fontSizes.regular,
        marginTop: 1,
    },
    requestButton: {
        backgroundColor: colors.white,
        borderColor: colors.brandColor,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
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
        fontFamily: fontFamily.bold,
        lineHeight: fontSizes.large
    },
    aboutSectionSubHeaderText: {
        fontSize: fontSizes.medium,
        color: colors.black,
        fontFamily: fontFamily.regular,
        lineHeight: fontSizes.medium + 5
    },
    displayIconsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 8,
        width: 45,
        height: 45,
        backgroundColor: colors.brandColor,
        borderRadius: 10,
    },
    iconsBlack: {
        color: colors.black,
        marginRight: 8
    },
    listCard: {
        marginVertical: 8,
        flexDirection: 'row',
    },
      listCardIcon: {
        color: colors.black
    },
      listText: {
        justifyContent: 'center',
        width: '80%'
    },
      listHeader: {
        color: colors.black,
        fontFamily: fontFamily.bold,
        fontSize: fontSizes.medium,
        lineHeight: fontSizes.regular + 5,
    },
      listSubText: {
        color: colors.lightBlack,
        fontFamily: fontFamily.regular,
        fontSize: fontSizes.medium,
        lineHeight: fontSizes.regular + 5,
    },
      displayIconCustom: {
        backgroundColor: colors.white, 
        marginLeft: 0
    },
      displayIconCustomIcon: {
        color: colors.black
    },
});


const ProfileChipContent = ({header, subHeader}) => {
    return (
        <View style={styles.detailsContainer}>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.detailsHeadText}>{header}</Text>
            <Text numberOfLines={1} ellipsizeMode='tail' style={styles.detailsSubText}>{subHeader}</Text>
        </View>
    );
}

const CurrentUserProfileActions = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.profileButtonsContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('BasicProfileEdit')} activeOpacity={0.8} style={[styles.buttonStyle, {flexDirection: 'row'}]}>
                <Icon name={'pencil'} style={[styles.iconStyles, {marginRight: 10}]} size={18} />
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.buttonTextStyle}>Edit profile</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')} activeOpacity={0.4} style={[styles.buttonStyle, styles.requestButton]}>
                <Icon name={'cog'} style={styles.iconsBlack} size={18} />
                <Text numberOfLines={1} ellipsizeMode='tail' style={{...styles.buttonTextStyle, color: colors.black}}>Manage</Text>
            </TouchableOpacity>
        </View>
    );
}

const UserProfileActions = ({params}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.profileButtonsContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ChatScreen', params)} activeOpacity={0.8} style={[styles.buttonStyle, {flexDirection: 'row'}]}>
                <Icon name={'paper-plane'} style={[styles.iconStyles, {marginRight: 10}]} size={18} />
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.buttonTextStyle}>Message</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.4} style={[styles.buttonStyle, styles.requestButton]}>
                <Icon name={'phone'} style={styles.iconsBlack} size={18} />
                <Text numberOfLines={1} ellipsizeMode='tail' style={{...styles.buttonTextStyle, color: colors.black}}>Call</Text>
            </TouchableOpacity>
        </View>
    );
}

const DisplayIcon = ({icon, customStyles={}, iconStyles={}}) => {
    return (
        <View style={[styles.displayIconsContainer, customStyles]}>
            <Icon name={icon} style={[styles.iconStyles, iconStyles]} size={28} />
        </View>
    );
}

const ListCard = ({header, subHeader, icon}) => {
    if (!subHeader) return;
    
    return (
        <View style={styles.listCard}>
            <DisplayIcon icon={icon} customStyles={styles.displayIconCustom} iconStyles={styles.displayIconCustomIcon}/>
            <View style={styles.listText}>
                <Text style={styles.listHeader}>{header}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.listSubText}>{subHeader}</Text>
            </View>
        </View>
    );
}

const AccountScreen = ({navigation, route}) => {
    const {params} = route;
    const currentUser = useSelector(state => state.user.currentUser);
    const profile = params && params.chatUser ? params.chatUser : currentUser;

    const getFullname = () => {
        return [profile.firstname, profile.lastname].join(' ') || profile.username;
    }

    const getJoiningDate = () => {
        return new Date(profile.createdAt).getFullYear();
    }

    const getCurrentLocation = () => {
        if (!profile.location) return;
        let {city='', country={}, region={}} = profile.location;

        if (typeof city == 'object') {
            city = '';
        }
        return [country.name, region.name, city].join(', ');
    }

    const getPicture = (picture) => {
        if (picture.includes(APP_REMOTE_HOST)) {
            return picture;
        } else return getUserPicture(profile);
    }

    const getWorkInfo = () => {
        if (profile.work && profile.organization) {
            return [profile.work, profile.organization].join(' at ');
        }else if (profile.organization) {
            return profile.organization;
        } else if (profile.work) return profile.work;

        return null;
    }

    const isCurrentUserProfile = profile._id === currentUser._id;

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
                                    <ProfileAvtar image={getPicture(profile.picture)} customStyles={styles.avtarStyles} textStyle={styles.avtarTextStyles} name={getFullname()} />
                                    <View style={styles.profileRightContainer}>
                                        <Text numberOfLines={2} ellipsizeMode='tail' style={getFullname().length > 15 ? {...styles.profileNameText, height: 40} : styles.profileNameText}>{getFullname()}</Text>
                                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.usernameText} >{'@' + profile.username}</Text>
                                        <View style={getFullname().length <= 15 ? {...styles.statusContainer, marginTop: 30} : styles.statusContainer}>
                                            <ProfileChipContent header={'Status'} subHeader={'Online'} />
                                            <ProfileChipContent header={'Joined'} subHeader={getJoiningDate()} />
                                            <ProfileChipContent header={'Location'} subHeader={'India'} />
                                        </View>
                                    </View>
                                </View>
                                {isCurrentUserProfile ? <CurrentUserProfileActions /> : <UserProfileActions params={params} />}
                            </View>
                        </View>

                    </View>

                    <View style={styles.aboutSectionHeaderContainer}>
                        <Text style={styles.aboutSectionHeaderText}>More information about</Text>
                        <Text style={styles.aboutSectionSubHeaderText}>{getFullname()}</Text>
                    </View>
                    
                    <View style={{width: '90%', alignSelf: 'center'}}>
                        <ListCard icon={'location-arrow'} header={'Location'} subHeader={getCurrentLocation()} />
                        <ListCard icon={'briefcase'} header={'Work'} subHeader={getWorkInfo()} />
                        <ListCard icon={'envelope'} header={'Email'} subHeader={profile.email} />
                        <ListCard icon={'info-circle'} header={'Bio'} subHeader={profile.about} />
                    </View>
                    
                </ScrollView>
            </View>
        </>
    );
}

export default AccountScreen;