import React, {useState, useEffect, createRef, useCallback} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, FlatList, BackHandler, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { io } from 'socket.io-client';

import { Thread, ChatInput } from '../../components/chat';
import ProfileAvtar from '../../components/ProfileAvtar';
import { log } from '../../config';
import { colors, HEADER_HEIGHT, fontSizes, dummyChat, APP_REMOTE_HOST } from '../../common';
import { generateUUID } from '../../utils';


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
    headerTextStyle: {
        flexDirection: 'row',
        fontSize: fontSizes.big,  
        // fontWeight: 'bold',
        color: colors.black,
        fontFamily: 'SF-Pro-Rounded-Bold',
        lineHeight: fontSizes.big + 5
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
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(dummyChat);
    
    const { chatUser, currentRoom } = route.params;
    const { roomId } = currentRoom;
    let fullname = [chatUser.firstname, chatUser.lastname].join(' ') || chatUser.username;

    const socketIO = io(APP_REMOTE_HOST, {
        transports: ['websocket']
    });
    
    const sendMessage = () => {
        if (!message) return;
        setMessages(prevState => ([{
            name: fullname, message, id: messages.length + 1
        }, ...prevState]));
        
       socketIO.emit('message:send', {name: fullname, message, room: roomId})

        setMessage('')
    }

    const goBack = () => {
        socketIO.emit('leave-room', {room: roomId });
        navigation.goBack();
        return true;
    }
    
    useEffect(() => {

        socketIO.on('connect', () =>{
            log('Connected to remote server!')
            socketIO.emit('join-room', {room: roomId })
        });

        
        socketIO.on('message:receive', (socket) => {
            setMessages(prevState => ([{
                ...socket, id: messages.length + 1
            }, ...prevState]));
        })
        

        socketIO.on('error', (err) => log(err));
        
        socketIO.on('connect_failed', function() {
            log("Sorry, there seems to be an issue with the connection!");
         })

        const backHandler = BackHandler.addEventListener("hardwareBackPress", goBack);
    
        return () => backHandler.remove();
    
        
    }, [])

    return (<>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <View style={styles.headerContainer}>
                <View>
                    <View style={styles.headerRow}>
                        <TouchableOpacity style={{flexDirection: 'row', paddingLeft: 5}} activeOpacity={0.5} onPress={goBack}>
                            <View style={styles.touchControlStyle}>
                                <Icon name="arrow-left" size={fontSizes.large} style={styles.backNavStyle}/>
                            </View>
                            <ProfileAvtar name={fullname} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.headerTextStyle}>{fullname}</Text>
                            <Text style={styles.activeTimeStyle} numberOfLines={1} ellipsizeMode='tail'>{'Last online 2 min ago'}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.container}>

                <FlatList 
                    data={messages}
                    renderItem={({item}) => (
                        <View key={item.id} style={{flexDirection: 'row', justifyContent: item.name == fullname ? 'flex-start' : 'flex-end'}}>
                            <Thread key={item.id} name={item.name} message={item.message} customStyles={item.name == fullname ? styles.receiverThreadStyles : styles.senderThreadStyles}/>
                        </View>
                    )}
                    style={{scaleY: -1}}
                />
                

                <ChatInput 
                    onActionSend={sendMessage} 
                    value={message} 
                    setValue={setMessage} 
                    />

                
            </View>
        </>
    )
};

export default ViewScreen;