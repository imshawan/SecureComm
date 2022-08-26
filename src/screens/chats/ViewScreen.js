import React, {useState, useEffect, createRef, useCallback} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, StatusBar, FlatList, TextInput, Animated, KeyboardAvoidingView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { Thread, ChatInput } from '../../components/chat';
import ProfileAvtar from '../../components/ProfileAvtar';

import { log } from '../../config';
import { colors, HEADER_HEIGHT, fontSizes, dummyChat } from '../../common';
import { showOriginColor, showFocusColor, AnimColor } from '../../utils';


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1,
        paddingHorizontal: 6,
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
        color: colors.black,
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
        marginVertical: 6
    },
    senderThreadStyles: {
        backgroundColor: colors.blue,
        color: colors.white,
        marginVertical: 5,
        scaleY: -1,
    },
    receiverThreadStyles: {
        scaleY: -1,
        minWidth: 20
    },
    hiddenContainer: {
        width: 0,
        height: 0,
    },
});


const ViewScreen = ({navigation, route}) => {
    const [value, setValue] = useState("");
    const [messages, setMessages] = useState(dummyChat);

    const { id, name } = route.params;

    const sendMessage = () => {
        setMessages(prevState => ([{
            name: 'Shawan Mandal', message: value, id: messages.length + 1
        }, ...prevState]));

        setValue('')
    }

    return (<>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <View style={styles.headerContainer}>
                <View>
                    <View style={styles.headerRow}>
                        <TouchableOpacity style={{flexDirection: 'row', paddingLeft: 5}} activeOpacity={0.5} onPress={() => navigation.goBack()}>
                            <View style={styles.touchControlStyle}>
                                <Icon name="arrow-left" size={fontSizes.large} style={styles.backNavStyle}/>
                            </View>
                            <ProfileAvtar name={name} customStyles={styles.avtarStyles} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.headerTextStyle}>{name}</Text>
                            <Text style={styles.activeTimeStyle} numberOfLines={1} ellipsizeMode='tail'>{'Last online 2 min ago'}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.container}>

                <FlatList 
                    data={messages}
                    renderItem={({item}) => (
                        <View key={item.id} style={{flexDirection: 'row', justifyContent: item.name == name ? 'flex-start' : 'flex-end'}}>
                            <Thread key={item.id} name={item.name} message={item.message} customStyles={item.name == name ? styles.receiverThreadStyles : styles.senderThreadStyles}/>
                        </View>
                    )}
                    style={{scaleY: -1}}
                />
                

                <ChatInput 
                    onActionSend={sendMessage} 
                    value={value} 
                    setValue={setValue} 
                    />

                
            </View>
        </>
    )
};

export default ViewScreen;