import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { colors, fontSizes } from '../../common'
import { log } from '../../config';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        marginLeft: 0,
        alignItems: 'flex-end'
    },
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: colors.g,
        borderRadius: 50,
        flex: 1,
        alignItems: 'flex-end',
    },
    inputStyles: {
        flex: 1,
        marginHorizontal: 10,
        color: colors.placeholderColor,
        backgroundColor: '#eceef5',
        borderRadius: 20,
        padding: 10,
    },
    buttonContainer: {
        backgroundColor: colors.brandColor,
        borderRadius: 50,
        width: 50,
        height: 50,
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
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                    />
            </View>
            <TouchableOpacity onPress={onActionSend} style={styles.buttonContainer}>
                <Icon name="send" style={styles.sendIconStyle} size={fontSizes.extraLarge}/>
            </TouchableOpacity>
        </View>
    );
}