import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Animated } from "react-native";
import { useNavigation } from '@react-navigation/native';

import ProfileAvtar from '../ProfileAvtar';

import { colors, HEADER_HEIGHT, fontSizes, TOUCHABLE_TAP } from '../../common'
import { log } from '../../config';
import { AnimColor, showFocusColor, showOriginColor } from '../../utils';


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 70,
        paddingHorizontal: 10,
        paddingVertical: 12,
        marginVertical: 2,
        width: '80%',
    },
    avtarStyles: {
        height: 50,
        width: 50,
        paddingTop: 10,
        fontSize: fontSizes.large
    },
    avtarContainer: {
        marginLeft: 5,
        marginTop: -2.5,
        paddingBottom: 10
    },
    textContainer: {
        marginLeft: 10,
       
    },
    userNameText: {
        fontSize: fontSizes.regular,
        fontWeight: 'bold',
        color: colors.black,
    },
    latestMsgText: {
        fontSize: fontSizes.medium
    }
})


const List = ({name, message}) => {
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const interpolatedColor = new Animated.Value(0);

    return (
        <AnimatedTouchable 
        activeOpacity={1}
        style={{backgroundColor: AnimColor(interpolatedColor, '#fff', colors.grey), borderRadius: 10, marginHorizontal: 10}}
        onPressIn={() => showFocusColor(interpolatedColor, TOUCHABLE_TAP.onTapDuration)} 
        onPressOut={() => showOriginColor(interpolatedColor, TOUCHABLE_TAP.onReleaseDuration)}
        >
            <View style={styles.container}>
                <View style={styles.avtarContainer}>
                    <ProfileAvtar name={name} customStyles={styles.avtarStyles} />
                </View>
                <View style={styles.textContainer}>

                    <Text style={styles.userNameText} numberOfLines={1} ellipsizeMode='tail'>{name}</Text>
                    <Text style={styles.latestMsgText} numberOfLines={1} ellipsizeMode='tail'>{message}</Text>
                    
                </View>
            </View>
        </AnimatedTouchable>
    );
}

export default List;