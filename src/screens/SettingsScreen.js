import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage";

import { clearCurrentRooms } from "../database";
import { roomActions } from '../store/roomListStore';
import { applicationActions } from '../store/appStore';
import ProfileAvtar from "../components/ProfileAvtar";
import DialogBox from "../components/DialogBox";
import { colors, HEADER_HEIGHT, fontSizes, DIALOG_LABELS, BUTTONS, SETTINGS, APP_NAME, LABELS, fontFamily, ENDPOINTS } from '../common';
import { log } from "../config";
import { HTTP } from "../services";


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
        color: colors.black,
        fontFamily: fontFamily.bold,
        lineHeight: fontSizes.extraLarge + 5,
    },
    headerContent: {
        flexDirection: 'row', 
        paddingHorizontal: 25,
    },
    touchControlStyle: {
        marginLeft: 0,
        paddingLeft: 0,
        marginTop: -2,
        width: 35,
    },
    iconStyles: {
        color: colors.black
    },
    sectionHeading: {
        marginVertical: 16,
        flexDirection: 'row',
        height: 46,
        width: '90%',
        alignSelf: 'center',
    },
    sectionHeadingIconContainer: {
        height: 42,
        width: 42,
        backgroundColor: colors.brandColor,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 2
    },
    sectionHeadingIcon: {
        color: colors.white,
    },
    sectionHeadingText: {
        marginLeft: 15,
        alignSelf: 'center'
    },
    sectionHeadingTextMain: {
        fontSize: fontSizes.large - 3,
        fontFamily: fontFamily.bold,
        lineHeight: fontSizes.large,
        color: colors.black
    },
    sectionHeadingSubtext: {
        fontSize: fontSizes.medium,
        fontFamily: fontFamily.regular,
        lineHeight: fontSizes.medium,
        color: colors.lightBlack,
        marginTop: 6
    },
    cardStyle: {
        flexDirection: 'column',
        backgroundColor: colors.lightestBlue,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 15,
        // marginBottom: 5,
    },
    individualList: {
        flexDirection: 'row',
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        alignItems: 'center'
    },
    individualListAvtar: {
        margin: 3,
        marginLeft: 15,
        height: 45,
        width: 45,
        borderRadius: 8
    },
    individualListContainer: {
        width: '75%',
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    individualListTextContainer: {
        width: '85%',
        alignSelf: 'center'
    },
    individualListHead: {
        fontSize: fontSizes.regular - 1,
        fontFamily: fontFamily.bold,
        color: colors.black,
        lineHeight: fontSizes.regular - 1,
        marginBottom: 5,
    },
    individualListSubtext: {
        fontSize: fontSizes.medium,
        fontFamily: fontFamily.regular,
        color: colors.lightBlack,
        lineHeight: fontSizes.medium
    },
    individualListIcon: {
        color: colors.lightBlack
    },
});

const SectionHeading = ({icon, header, subHeader}) => {
    return (
        <View style={styles.sectionHeading}>
            <View style={styles.sectionHeadingIconContainer}>
                <Icon name={icon} style={styles.sectionHeadingIcon} size={28} />
            </View>
            <View style={styles.sectionHeadingText}>
                <Text style={styles.sectionHeadingTextMain}>{header}</Text>
                <Text style={styles.sectionHeadingSubtext}>{subHeader}</Text>
            </View>
        </View>
    );
}

const IndividualList = ({border=1, header, subHeader, onClicked}) => {
    return (
        <TouchableOpacity activeOpacity={0.3} onPress={onClicked} style={{...styles.individualList, borderBottomWidth: border}}>
            <View style={{...styles.individualListContainer, width: '91%', marginLeft: 15}}>
                <View style={styles.individualListTextContainer}>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.individualListHead}>{header}</Text>
                    <Text numberOfLines={1} ellipsizeMode='tail' style={styles.individualListSubtext}>{subHeader}</Text>
                </View>
                <Icon name="chevron-right" style={styles.individualListIcon} size={fontSizes.regular} /> 
            </View>
        </TouchableOpacity>
    );
}

const SettingsScreen = ({navigation, route}) => {
    const currentUser = useSelector(state => state.user.currentUser);

    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const processLogOut = async () => {
        await HTTP.post(ENDPOINTS.logOut);
        
        await clearCurrentRooms();
        setVisible(false);
        await AsyncStorage.clear();
        dispatch(roomActions.clearRooms());
        dispatch(applicationActions.clearAuthentication());
        // navigation.navigate('LoginScreen');
    }
    
    const getFullname = () => {
        return [currentUser.firstname, currentUser.lastname].join(' ') || currentUser.username;
    }

    const getCurrentLocation = () => {
        let {city, country={}, region={}} = currentUser.location;
        if (!city || typeof city == 'object') {
            city = '';
        }
        return [country.name, region.name, city].join(', ');
    }

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

                <DialogBox
                    title={DIALOG_LABELS.areYouSure}
                    body={DIALOG_LABELS.removeAccount}
                    visible={visible}
                    setVisible={setVisible}
                    action1Text={BUTTONS.signOut}
                    action2Text={BUTTONS.close}
                    action1={processLogOut}
                />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <SectionHeading header={SETTINGS.profile.header} subHeader={SETTINGS.profile.subHeader} icon={'user-o'} />
                        <View style={styles.cardStyle}>
                            <TouchableOpacity onPress={() => navigation.navigate('BasicProfileEdit')} activeOpacity={0.3} style={styles.individualList}>
                                <ProfileAvtar name={getFullname()} image={currentUser.picture} customStyles={styles.individualListAvtar}/>
                                <View style={styles.individualListContainer}>
                                    <View style={styles.individualListTextContainer}>
                                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.individualListHead}>{getFullname()}</Text>
                                        <Text numberOfLines={1} ellipsizeMode='tail' style={styles.individualListSubtext}>{[currentUser.work, currentUser.organization].join(' at ')}</Text>
                                    </View>
                                    <Icon name="chevron-right" style={styles.individualListIcon} size={fontSizes.regular} />
                                </View>
                            </TouchableOpacity>
                            {/* <IndividualList border={0} header={'Birthday'} subHeader={'18th July'} /> */}
                            <IndividualList onClicked={() => navigation.navigate('Email')} header={'Email'} subHeader={currentUser.email} />
                            <IndividualList border={0} onClicked={() => navigation.navigate('LocationScreen')} header={'Location'} subHeader={getCurrentLocation()} />
                        </View>
                    </View>
                    
                    <View>
                        <SectionHeading header={SETTINGS.account.header} subHeader={SETTINGS.account.subHeader} icon={'sliders'} />
                        <View style={styles.cardStyle}>
                            <IndividualList onClicked={() => navigation.navigate('ChangePassword')} header={SETTINGS.menus.passwords} subHeader={SETTINGS.menus.passwordsSubText} />
                            <IndividualList onClicked={() => navigation.navigate('Notification')} header={SETTINGS.menus.notifications} subHeader={SETTINGS.menus.notificationsSubText} />
                            <IndividualList border={0} onClicked={() => setVisible(true)} header={SETTINGS.menus.removeAccount} subHeader={SETTINGS.menus.removeAccountSubText} />
                            {/* <IndividualList header={'Delete Account'} subHeader={'Delete your account permanently'} /> */}
                        </View>
                    </View>

                    <View>
                        <SectionHeading header={SETTINGS.about.header} subHeader={SETTINGS.about.subHeader} icon={'question-circle-o'} />
                        <View style={styles.cardStyle}>
                            <IndividualList onClicked={() => navigation.navigate('ContactScreen')} header={SETTINGS.menus.reachUs} subHeader={SETTINGS.menus.reachUsSubText} />
                            <IndividualList border={0} onClicked={() => navigation.navigate('AboutScreen')} header={SETTINGS.menus.about} subHeader={SETTINGS.menus.aboutSubText} />
                        </View>
                    </View>

                </ScrollView>
                
            </View>
        </>
    );
}

export default SettingsScreen;