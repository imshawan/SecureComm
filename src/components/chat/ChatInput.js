import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors, fontSizes } from '../../common'
import { log } from '../../config';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        margin: 10,
        marginLeft: 0,
        alignItems: 'flex-end',
    },
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: colors.g,
        borderRadius: 50,
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    inputStyles: {
        flex: 1,
        marginRight: 6,
        color: colors.black,
        backgroundColor: colors.inputBackground,
        borderRadius: 20,
        padding: 10,
    },
    buttonContainer: {
        backgroundColor: colors.brandColor,
        borderRadius: 47,
        width: 47,
        height: 47,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendIconStyle: {
        color: colors.whiteSmock,
        marginTop: -2,
        marginLeft: -2
    }
});

export const ChatInput = ({value, setValue, onActionSend, onFocused, onRemoveFocus}) => {
    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <TextInput 
                    value={value}
                    onChangeText={setValue}
                    style={styles.inputStyles} 
                    onFocus={onFocused}
                    onBlur={onRemoveFocus}
                    multiline 
                    autoCapitalize 
                    placeholder='Type a message...'
                    placeholderTextColor={colors.placeholderColor}
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                    />
            </View>
            <TouchableOpacity activeOpacity={0.6} onPress={onActionSend} style={styles.buttonContainer}>
                <Icon name="send" style={styles.sendIconStyle} size={fontSizes.extraLarge}/>
            </TouchableOpacity>
        </View>
    );
}