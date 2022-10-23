import React, {useState, useEffect, memo} from 'react';
import { View, StyleSheet, ScrollView, StatusBar, FlatList } from "react-native";
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
import { storeNewRoom, Rooms, updateRoomData } from '../database';
import { displayNotification } from '../utils';

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
    const currentRoomId = useSelector(state => state.rooms.currentRoomId);

    const dispatch = useDispatch();

    useEffect(() => {
        setSocket(io(APP_REMOTE_HOST, {
            transports: ['websocket'],
            })
        );        
      }, []);


    const roomExists = (roomId) => {
        let rooms = roomList.find(e => e.roomId == roomId);
        return Boolean(rooms);
    }


    useEffect(() => {

        if (!currentUser || !currentUser._id || !socketIO) return;

        socketIO.on('connect', () =>{
            log('Connected to remote server with userId ' + currentUser._id)
            socketIO.emit('join-room', {room: currentUser._id})
        });
        
        socketIO.on('global:message:receive', async (socket) => {
            let {chatUser, currentRoom, message, room} = socket;
            if (room != currentUser._id) return;
            
            await updateRoomData({latestMessage: message.message}, currentRoom._id);
            await displayNotification(
                [chatUser.firstname, chatUser.lastname].join(' '), 
                message.message, 
                chatUser.picture);

            if (!roomExists(currentRoom.roomId)) {
                currentRoom.creator = {};
                currentRoom.latestMessage = message.message;

                dispatch(roomActions.addRoomToStore(currentRoom));
                let realmObj = await Rooms();
                await storeNewRoom(currentRoom, realmObj);

            }

            dispatch(roomActions.updateLatestMessage({
                message: message.message,
                _id: currentRoom._id
            }));
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