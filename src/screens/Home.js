import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, StatusBar, FlatList } from "react-native";
import { View as AnimatedView } from 'react-native-animatable';
import { SpeedDial } from '@rneui/themed';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { roomActions } from '../store/roomListStore';

import HeaderComponent from "../components/HeaderComponent";
import EmptyComponent from '../components/EmptyComponent';
import { List } from "../components/chat";

import { log } from '../config';
import { colors, LABELS, APP_REMOTE_HOST } from '../common';
import { storeNewRoom, Rooms, updateRoomData, writeMessage } from '../database';
import { displayNotification, notifyUser } from '../utils';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    },
    iconStyles: {
        color: colors.lightestGrey
    },
})

const Home = ({navigation}) => {
    const [socketIO, setSocket] = useState(null);

    const roomList = useSelector(state => state.rooms.roomList);
    const currentUser = useSelector(state => state.user.currentUser);
    const application = useSelector(state => state.application);

    const dispatch = useDispatch();

    const roomExists = (roomId) => {
        let rooms = roomList.find(e => e.roomId == roomId);
        return Boolean(rooms);
    }

    const onSocketConnectionError = async (error) => {
        notifyUser(error.message);
        // Not sure what to do next, will have to figure out!
    }

    useEffect(() => {
        setSocket(io(APP_REMOTE_HOST, {
            transports: ['websocket', 'polling'],
            extraHeaders: {
                Authorization: "Bearer " + application.authToken,
                deviceId: application.deviceId,
            }
            })
        );
      }, []);

    useEffect(() => {

        if (!currentUser || !currentUser._id || !socketIO) return;

        socketIO.on('connect', () =>{
            log('Connected to remote server with userId ' + currentUser._id)
            socketIO.emit('join-room', {room: currentUser._id})
        });

        socketIO.on("connect_error", onSocketConnectionError);
        
        socketIO.on('global:message:receive', async (socket) => {
            let {chatUser, currentRoom, message, room} = socket;
            if (room != currentUser._id) return;

            await updateRoomData(
              {
                latestMessage: message.message,
                lastActive: message.createdAt,
                memberDetails: JSON.stringify(chatUser),
              },
              currentRoom.roomId,
            );

            await displayNotification(
                chatUser._id,
                [chatUser.firstname, chatUser.lastname].join(' '), 
                message.message, 
                chatUser.picture);

            if (!roomExists(currentRoom.roomId)) {
                // let chatUserData = currentRoom.memberDetails.find(el =>  Object.keys(el)[0] != currentUser._id);

                currentRoom.creator = {};
                currentRoom.latestMessage = message.message;
                currentRoom.lastActive = message.createdAt;
                // currentRoom.memberDetails = Object.values(chatUserData)[0];
                currentRoom.memberDetails = chatUser;

                dispatch(roomActions.addRoomToStore(currentRoom));
                let realmObj = await Rooms();
                await storeNewRoom(currentRoom, realmObj);

            }

            dispatch(roomActions.updateLatestMessage({
                _id: currentRoom._id,
                message: message.message,
                lastActive: message.createdAt,
                memberDetails: chatUser,
            }));

            await writeMessage(message);
        })

        return () => socketIO.removeListener('global:message:receive');

        
    }, [socketIO])


    const renderItem = ({item}) => <List key={item.roomId} item={item} message={item.latestMessage} />

    return (
        <AnimatedView animation={'fadeIn'} duration={800} style={styles.container}>

            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <HeaderComponent />
            { roomList.length ? <FlatList
                data={roomList}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                /> : 
            
            <EmptyComponent 
                header={LABELS.HOME_SCREEN.noConversations} 
                subHeader={LABELS.HOME_SCREEN.newConversationText} 
                IconComponent={() => <Icon name={'commenting'} style={styles.iconStyles} size={90} />}
                /> }

            <SpeedDial
                onOpen={() => navigation.navigate('NewChatScreen')}
                icon={{ name: 'comment', color: colors.white }}
                overlayColor={'transparent'}
                size='large'
                color={colors.brandColor}
            >
                 
            </SpeedDial>

        </AnimatedView>
    )
};

export default Home;