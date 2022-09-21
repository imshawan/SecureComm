import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dialog } from '@rneui/themed';

import { colors, fontSizes } from "../common";


const styles = StyleSheet.create({
    touchable: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: colors.inputBackground,
        height: 50,
        borderRadius: 10,
    },
    valueContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    value: {
        color: colors.black,
        fontSize: fontSizes.medium,
        fontFamily: 'SF-Pro-Rounded-Bold',
        lineHeight: fontSizes.medium,
    },
    dropdownIcon: {
        color: colors.black,
    },
    dialogContainer: {
        width: '85%',
        borderRadius: 15
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
});

const FullScreenDialog = ({title, visible, setVisible}) => {
    const toggleDialog = () => {
        setVisible(!visible);
    };
    
    const defaultAction = () => {
        setVisible(false);
    };

    return (
        <Dialog
            overlayStyle={styles.dialogContainer}
            animationType='fade'
            isVisible={true}
            onBackdropPress={toggleDialog}
            statusBarTranslucent
            >
        
            <Text style={styles.titleTextStyle}>{title}</Text>
            {/* <Text style={styles.bodyTextStyle}>{body}</Text> */}
        </Dialog>
    );
}

const Select = ({data, currentValue, onSelect, textStyle={}}) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <FullScreenDialog title={'Select'} visible={visible} setVisible={setVisible} />
            <TouchableOpacity style={styles.touchable}>
                <View style={styles.valueContainer}>
                    <Text style={[styles.value, textStyle]}>{currentValue}</Text>
                    <Icon name="chevron-down" style={styles.dropdownIcon} size={fontSizes.regular} /> 
                </View>
            </TouchableOpacity>
        </>
    );
}

export default Select;