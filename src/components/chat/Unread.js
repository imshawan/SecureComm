import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, fontFamily, fontSizes } from "../../common";

const styles = StyleSheet.create({
    unreadContainer: {
        height: 20,
        width: 20,
        right: 0,
        top: 0,
        borderRadius: 20,
        position: 'absolute',
        zIndex: 9,
        backgroundColor: colors.brandColor,
        borderWidth: 1,
        borderColor: colors.white
    },
    counterText: {
          color: colors.white,
          justifyContent: 'center',
          alignSelf: 'center',
          fontFamily: fontFamily.regular,
          lineHeight: fontSizes.large
    }
})

const UnreadMessagesCount = ({count}) => {
    if (!count) return;
    
    let style = {fontSize: fontSizes.extraSmall};
    if (count > 99) {
        count = '99+';
        style.fontSize = fontSizes.extraSmall - 2;
        style.lineHeight = fontSizes.regular + 2;
    }

    return (
        <TouchableOpacity style={styles.unreadContainer}>
            <Text style={[styles.counterText, style]}>{count}</Text>
        </TouchableOpacity>
    );
}

export default UnreadMessagesCount;