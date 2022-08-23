import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, StatusBar, TextInput, Animated } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import Thread from '../../components/chat/Thread';
import ProfileAvtar from '../../components/ProfileAvtar';

import { log } from '../../config';
import { colors, HEADER_HEIGHT, fontSizes, dummyChat } from '../../common';
import { showOriginColor, showFocusColor, AnimColor } from '../../utils';


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        paddingHorizontal: 10,
    },
    headerContainer: {
        backgroundColor: colors.white,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: HEADER_HEIGHT,
        alignItems: 'center',
        shadowColor: colors.lightestGrey,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 3,
        zIndex: 9
      },
    headerRow: {
        flexDirection: 'row', 
        height: '100%'
    },
    backNavStyle: {
        marginTop: 5,
        marginRight: 5
    },
    avtarStyles: {
        paddingTop: 10,
        marginTop: 2
    },
    headerTextStyle: {
        flexDirection: 'row',
        fontSize: fontSizes.big,  
        fontWeight: 'bold',
        color: colors.black
    },
    activeTimeStyle: {
        fontSize: fontSizes.small
    },
    touchControlStyle: {
        marginHorizontal: 10,
        marginVertical: 10
    },
    senderThreadStyles: {
        backgroundColor: colors.blue,
        color: colors.white,
    },
    receiverThreadStyles: {
        
    },
    textInputSectionStyle: {
        position: 'relative',
        flexDirection: 'row',
        height: 55,
        margin: 10,
    },
    textInputStyles: {
        flex: 1,
        color: colors.placeholderColor,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 25,
        borderWidth: 1,
        height: 50,
        borderColor: colors.borderColor,
        fontSize: fontSizes.medium,
        backgroundColor: '#eceef5'
    },
    sendMessageButton: {
        marginLeft: 6,
        marginTop: 3,
        backgroundColor: colors.brandColor,
        height: 45,
        width: 45,
        borderRadius: 25
    },
    sendIconStyle: {
        color: colors.whiteSmock,
        padding: 10
    }
});


const ViewScreen = ({navigation, route}) => {
    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
    const interpolatedColor = new Animated.Value(0);
    const { id, name } = route.params;

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor="#fff" />
            <View style={styles.headerContainer}>

                <View style={styles.headerContent}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={fontSizes.regular} style={styles.backNavStyle}/>
                        </TouchableOpacity>
                        <ProfileAvtar name={name} customStyles={styles.avtarStyles} />
                        <View>
                            <Text style={styles.headerTextStyle}>{name}</Text>
                            <Text style={styles.activeTimeStyle} numberOfLines={1} ellipsizeMode='tail'>{'Last online 2 min ago'}</Text>
                        </View>
                    </View>
                </View>

            </View>

            <ScrollView>
                {dummyChat.map(item => (
                    <View key={item.id} style={{flexDirection: 'row', justifyContent: item.name == name ? 'flex-start' : 'flex-end'}}>
                        <Thread key={item.id} name={item.name} message={item.message} customStyles={item.name == name ? styles.receiverThreadStyles : styles.senderThreadStyles}/>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.textInputSectionStyle}>
                <AnimatedTextInput
                    style={{...styles.textInputStyles, borderColor: AnimColor(interpolatedColor, 'transparent')}}
                    onFocus={() => showFocusColor(interpolatedColor)}
                    onBlur={() => showOriginColor(interpolatedColor)}
                    placeholder="Type a message..."
                    keyboardType="default"
                    underlineColorAndroid="#f000"
                    returnKeyType="next"
                />
                <TouchableOpacity style={styles.sendMessageButton}>
                    <Icon name="send" style={styles.sendIconStyle} size={fontSizes.extraLarge}/>
                </TouchableOpacity>
            </View>
            
        </View>
    )
};

export default ViewScreen;