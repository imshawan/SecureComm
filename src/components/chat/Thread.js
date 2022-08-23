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
        padding: 8,
        marginVertical: 2,
        backgroundColor: colors.grey,
        borderRadius: 15,
    },
    messageTextStyle: {
        fontSize: fontSizes.medium
    },
})


export const Thread = ({name, message, id, customStyles}) => {
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const interpolatedColor = new Animated.Value(0);
    const navigation = useNavigation();

    return (
        <AnimatedTouchable 
        activeOpacity={1}
        style={{backgroundColor: AnimColor(interpolatedColor, colors.white, colors.grey), borderRadius: 10, marginHorizontal: 10}}
        >
            <View style={{...styles.container, ...customStyles}}>
                <Text style={{...styles.messageTextStyle, color: customStyles.color || '#000'}}>{message}</Text>
            </View>
        </AnimatedTouchable>
    );
}