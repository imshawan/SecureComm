import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from "react-native";
import { useNavigation } from '@react-navigation/native';

import ProfileAvtar from '../ProfileAvtar';
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
    },
    avtarTextStyle: {
        fontSize: fontSizes.large
    },
    avtarContainer: {
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

export const UserList = ({item, callback}) => {
    const interpolatedColor = new Animated.Value(0);
    const navigation = useNavigation();

    const name = [item.firstname, item.lastname].join(' ');

    const onPresshandler = () => {
        if (typeof callback === 'function') {
            callback()
        } else {
            navigation.navigate('ChatScreen', {
                id, name
            });
        }
    }

    return (
        <AnimatedTouchable 
        activeOpacity={1}
        style={{backgroundColor: AnimColor(interpolatedColor, colors.white, colors.grey), borderRadius: 10, marginHorizontal: 10}}
        onPressIn={() => showFocusColor(interpolatedColor, TOUCHABLE_TAP.onTapDuration)} 
        onPressOut={() => showOriginColor(interpolatedColor, TOUCHABLE_TAP.onReleaseDuration)}
        onPress={onPresshandler}
        >
            <View style={styles.container}>
                <View style={styles.avtarContainer}>
                    <ProfileAvtar name={name} image={getUserPicture(item)} textStyle={styles.avtarTextStyle} customStyles={styles.avtarStyles} />
                </View>
                <View style={styles.textContainer}>

                    <Text style={styles.userNameText} numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
                    <Text style={styles.latestMsgText} numberOfLines={1} ellipsizeMode='tail'>{`@${item.username}`}</Text>
                    
                </View>
            </View>
        </AnimatedTouchable>
    );
}