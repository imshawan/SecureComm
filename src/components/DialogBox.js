import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Dialog } from '@rneui/themed';
import { colors, fontSizes } from '../common';
import { log } from '../config';

const styles = StyleSheet.create({
    titleTextStyle: {
        color: colors.black,
        fontSize: fontSizes.extraLarge,
        fontFamily: 'SF-Pro-Rounded-Bold',
        lineHeight: fontSizes.extraLarge + 6
    },
    bodyTextStyle: {
        color: colors.black,
        fontSize: fontSizes.medium,
        fontFamily: 'SF-Pro-Rounded-Regular',
        marginTop: 8
    },
    buttonStyle: {
        backgroundColor: colors.grey,
        borderWidth: 0,
        color: colors.white,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: 14,
        marginLeft: 10,
        marginBottom: 6
    },
    buttonTextStyle: {
        color: colors.black,
        fontSize: fontSizes.medium,
        fontFamily: 'SF-Pro-Rounded-Bold',
        lineHeight: fontSizes.medium
    },
})

const DialogBox = ({title, body, visible, setVisible, action1, action2, action1Text, action2Text}) => {
    
    const toggleDialog = () => {
        setVisible(!visible);
    };
    
    const defaultAction = () => {
        setVisible(false);
    }

    return (
        <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
        >
            
            <Text style={styles.titleTextStyle}>{title}</Text>
            <Text style={styles.bodyTextStyle}>{body}</Text>
            <Dialog.Actions>
                <TouchableOpacity 
                    onPress={action1 || defaultAction} 
                    style={{...styles.buttonStyle, backgroundColor: colors.brandColor}}>
                    <Text style={{...styles.buttonTextStyle, color: colors.white}}>{action1Text || 'Click'}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={action2 || defaultAction}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonTextStyle}>{action2Text || 'Close'}</Text>
                </TouchableOpacity>
            </Dialog.Actions>
        </Dialog>
    );
  };
   
  export default DialogBox; 