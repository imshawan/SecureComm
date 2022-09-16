import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView, BackHandler } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-community/async-storage";
import { View as AnimatableView } from 'react-native-animatable';

import ProfileAvtar from "../components/ProfileAvtar";
import DialogBox from "../components/DialogBox";
import { colors, HEADER_HEIGHT, fontSizes, DIALOG_LABELS, BUTTONS } from '../common';
import { isAuthenticated } from "../utils";
import { log } from "../config";


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    },
    
});

const SettingsScreen = ({navigation, route}) => {
    

    return (<>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <View style={styles.container}>
               

                
            </View>
        </>
    );
}

export default SettingsScreen;