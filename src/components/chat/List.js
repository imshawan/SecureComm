import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import ProfileAvtar from '../ProfileAvtar';
import { roomActions } from '../../store/roomListStore';
import { colors, fontFamily, fontSizes, TOUCHABLE_TAP } from '../../common'
import { log } from '../../config';
import { AnimColor, showFocusColor, showOriginColor, getUserPicture } from '../../utils';


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 70,
        paddingHorizontal: 6,
        paddingVertical: 12,
        marginVertical: 2,
        width: '80%',
    },
    avtarStyles: {
        height: 50,
        width: 50,
        // paddingTop: 10,
    },
    avtarTextStyle: {
        fontSize: fontSizes.large
    },
    avtarContainer: {
        // marginLeft: 5,
        marginTop: -2.5,
        paddingBottom: 10
    },
    textContainer: {
        marginLeft: 10,
       justifyContent: 'center'
    },
    userNameText: {
        fontSize: fontSizes.regular,
        fontFamily: fontFamily.bold,
        color: colors.black,
        lineHeight: fontSizes.regular + 5,
    },
    latestMsgText: {
        fontSize: fontSizes.medium,
        color: colors.subText,
        // fontFamily: 'SF-Pro-Rounded-Regular',
    }
})

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const List = ({item, message}) => {
    const currentUser = useSelector(state => state.user.currentUser);
    const interpolatedColor = new Animated.Value(0);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    let {memberDetails} = item;

    if (typeof memberDetails == 'string') {
        memberDetails = JSON.parse(memberDetails);
    }

    let chatUser = memberDetails.find(el => el && Object.keys(el)[0] != currentUser._id);
    chatUser = Object.values(chatUser||{})[0] || {};

    let name = [chatUser.firstname, chatUser.lastname].join(' ') || chatUser.username;

    const userCardOnClick = async card => {
      card = JSON.parse(JSON.stringify(card));
      dispatch(roomActions.addToRecent(card));
      navigation.navigate('ChatScreen', card);
    };

    return (
        <AnimatedTouchable 
        activeOpacity={1}
        style={{backgroundColor: AnimColor(interpolatedColor, colors.white, colors.grey), borderRadius: 10, marginHorizontal: 10}}
        onPressIn={() => showFocusColor(interpolatedColor, TOUCHABLE_TAP.onTapDuration)} 
        onPressOut={() => showOriginColor(interpolatedColor, TOUCHABLE_TAP.onReleaseDuration)}
        onPress={() => userCardOnClick({currentRoom: item, chatUser})}
        >
            <View style={styles.container}>
                <View style={styles.avtarContainer}>
                    <ProfileAvtar name={name} image={getUserPicture(chatUser)} textStyle={styles.avtarTextStyle} customStyles={styles.avtarStyles} />
                </View>
                <View style={styles.textContainer}>

                    <Text style={styles.userNameText} numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
                    <Text style={styles.latestMsgText} numberOfLines={1} ellipsizeMode='tail'>{message || `@${chatUser.username}`}</Text>
                    
                </View>
            </View>
        </AnimatedTouchable>
    );
}