import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Dialog } from '@rneui/themed';
import { colors, fontSizes } from '../common';
import { log } from '../config';

const styles = StyleSheet.create({
    dialogContainer: {
        width: '85%'
    },
    titleTextStyle: {
        color: colors.black,
        fontSize: fontSizes.large,
        fontFamily: 'SF-Pro-Rounded-Bold',
        lineHeight: fontSizes.large + 6
    },
    bodyTextStyle: {
        color: colors.lightBlack,
        fontSize: fontSizes.medium,
        fontFamily: 'SF-Pro-Rounded-Regular',
        marginTop: 8
    },
    buttonStyle: {
        backgroundColor: colors.grey,
        borderWidth: 0,
        color: colors.white,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginLeft: 10,
        marginBottom: 6
    },
    buttonTextStyle: {
        color: colors.black,
        fontSize: fontSizes.medium,
        fontFamily: 'SF-Pro-Rounded-Bold',
        lineHeight: fontSizes.medium,
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
                overlayStyle={styles.dialogContainer}
                animationType='fade'
                isVisible={visible}
                onBackdropPress={toggleDialog}
                statusBarTranslucent
                >
            
                <Text style={styles.titleTextStyle}>{title}</Text>
                <Text style={styles.bodyTextStyle}>{body}</Text>
                <Dialog.Actions>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={action1 || defaultAction}
                        style={{...styles.buttonStyle, backgroundColor: colors.brandColor}}>
                        <Text style={{...styles.buttonTextStyle, color: colors.white}}>{action1Text || 'Click'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={action2 || defaultAction}
                        style={styles.buttonStyle}>
                        <Text style={styles.buttonTextStyle}>{action2Text || 'Close'}</Text>
                    </TouchableOpacity>
                </Dialog.Actions>
            </Dialog>
        );
  };
   
  export default DialogBox; 