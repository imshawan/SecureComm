import React, {useState, useEffect, createRef, useCallback} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, FlatList, BackHandler, Alert } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIsFocused } from "@react-navigation/native";
import { io } from 'socket.io-client';
import notifee from '@notifee/react-native';
import { useSelector, useDispatch } from 'react-redux';
import { messageActions } from '../../store/messagesStore';
import { roomActions } from '../../store/roomListStore';
import { counterActions } from '../../store/countersStore';

import { Thread, ChatInput } from '../../components/chat';
import ProfileAvtar from '../../components/ProfileAvtar';
import { log } from '../../config';
import { colors, HEADER_HEIGHT, fontSizes, APP_REMOTE_HOST } from '../../common';
import { generateUUID, getUserPicture } from '../../utils';
import { updateRoomData } from '../../database';


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
        marginVertical: 4,
        scaleY: -1,
    },
    receiverThreadStyles: {
        scaleY: -1,
        marginVertical: 4,
        // minWidth: 20
    },
    hiddenContainer: {
        width: 0,
        height: 0,
    },
});


// const socketIO = io(APP_REMOTE_HOST, {
//     transports: ['websocket']
// });

const ChatScreen = ({navigation, route}) => {
    const { chatUser, currentRoom, isNew } = route.params;

    const [message, setMessage] = useState("");
    const [roomId, setRoomId] = useState(currentRoom.roomId);
    const [socketIO, setSocket] = useState(null);
    const [isNewRoom, setIsNewRoom] = useState(isNew)

    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.user.currentUser);
    const messages = useSelector(state => state.messages.messageList);
    const application = useSelector(state => state.application);
    
    let fullname = [chatUser.firstname, chatUser.lastname].join(' ') || chatUser.username;

    useEffect(() => {
        setSocket(io(APP_REMOTE_HOST, {
            transports: ['websocket', 'polling'],
            extraHeaders: {
                Authorization: "Bearer " + application.authToken,
                deviceId: application.deviceId,
            }
            })
        );

        notifee.cancelNotification(chatUser._id);
        dispatch(counterActions.clearUnreadMessageCount((chatUser._id))) 
      }, []);

 
    const sendMessage = () => {
        if (!message) return;

        let payload = {
            name: fullname, 
            message, 
            id: generateUUID('msg'), 
            _id: currentUser._id, 
            room: roomId, 
            createdAt: new Date(Date.now()).toISOString(),
            status: "sent",
        };

        setMessage('');
        
        dispatch(messageActions.addMessageToStore(payload));
        
        socketIO.emit('message:send', payload);
        
        socketIO.emit('global:message:send', {chatUser: currentUser, currentRoom, message: payload, room: chatUser._id});
        if (isNewRoom) {
            // setIsNewRoom(false);
        }
    }

    const goBack = () => {
        socketIO.emit('leave-room', {room: roomId});
        dispatch(messageActions.clearMessages())
        navigation.goBack();
        return true;
    }

    const renderItem = ({item}) => {
        return (
            <Thread 
                key={item.id} 
                userId={item._id}
                name={item.name} 
                message={item.message} 
                timestamp={item.createdAt}
                status={item.status}
                isReceiver={item._id != currentUser._id}
                containerStyles={{justifyContent: item._id != currentUser._id ? 'flex-start' : 'flex-end'}} 
                customStyles={item._id != currentUser._id ? styles.receiverThreadStyles : styles.senderThreadStyles}
            />
        );
    }

    const navigateToChatUserProfile = () => {
        navigation.navigate('ProfileScreen', {currentRoom, chatUser})
    }

    const onSocketConnectionError = async (error) => {
        notifyUser(error.message);
    }
    
    useEffect(() => {
        if (!socketIO) return;

        socketIO.on('connect', () =>{
            log('Connected to remote server in room ' + roomId);
            socketIO.emit('join-room', {room: roomId});
            dispatch(roomActions.setCurrentRoom({roomId, _id: chatUser._id}));
        });

        socketIO.on("connect_error", onSocketConnectionError);

        socketIO.on('message:receive', (socket) => {
            // log(socket)
            dispatch(messageActions.addMessageToStore({...socket, id: generateUUID()}));
        })
    
        const backHandler = BackHandler.addEventListener("hardwareBackPress", goBack);
    
        return () => {
            backHandler.remove();
            socketIO.removeListener('message:receive');
            dispatch(roomActions.setCurrentRoom({}));
        }
    
        
    }, [socketIO, roomId, isFocused])

    return (<>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <View style={styles.headerContainer}>
                <View>
                    <View style={styles.headerRow}>
                        <TouchableOpacity style={{flexDirection: 'row', paddingLeft: 5}} activeOpacity={0.5} onPress={goBack}>
                            <View style={styles.touchControlStyle}>
                                <Icon name="arrow-left" size={fontSizes.large} style={styles.backNavStyle}/>
                            </View>
                            <ProfileAvtar name={fullname} image={getUserPicture(chatUser)}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={navigateToChatUserProfile} activeOpacity={0.5}>
                            <Text style={styles.headerTextStyle}>{fullname}</Text>
                            <Text style={styles.activeTimeStyle} numberOfLines={1} ellipsizeMode='tail'>{'Last online 2 min ago'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.container}>

                <FlatList 
                    bounces={true}
                    data={messages}
                    renderItem={renderItem}
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

export default ChatScreen;