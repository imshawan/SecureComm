import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
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
import { storeNewRoom, Rooms, listMyRooms } from '../database';

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
    const [loading, setLoading] = useState(false);
    const [socketIO, setSocket] = useState(null);

    const roomList = useSelector(state => state.rooms.roomList);
    const currentUser = useSelector(state => state.user.currentUser);

    const dispatch = useDispatch();

    useEffect(() => {
        setSocket(io(APP_REMOTE_HOST, {
            transports: ['websocket'],
            })
        );
      }, []);

    const userCardOnClick = async (card) => {
        card = JSON.parse(JSON.stringify(card));
        dispatch(roomActions.addToRecent(card));
        navigation.navigate('ChatScreen', card);
    }

    const roomExists = (roomId) => {
        let rooms = roomList.find(e => e.roomId == roomId) || [];
        return Boolean(rooms.length);
    }


    useEffect(() => {

        listMyRooms().then(rooms => {
            if (rooms && rooms.length) {
                log(Object.keys(rooms[0]))
                dispatch(roomActions.initRooms(rooms));
            }
        });

        if (!currentUser || !currentUser._id || !socketIO) return;

        socketIO.on('connect', () =>{
            log('Connected to remote server with userId ' + currentUser._id)
            socketIO.emit('join-room', {room: currentUser._id})
        });

        
        socketIO.on('global:message:receive', async (socket) => {
            let {chatUser, currentRoom, message, room} = socket;
            if (room != currentUser._id) return;

            if (!roomExists(currentRoom.roomId)) {
                currentRoom.creator = {};
                dispatch(roomActions.addRoomToStore(currentRoom));
                log(Object.keys(currentRoom))
                log((currentRoom.memberDetails))
                // let realmObj = await Rooms();
                // await storeNewRoom(currentRoom, realmObj);
                // log(Object.keys(currentRoom))
            }

        })

        return () => socketIO.removeListener('global:message:receive');

        
    }, [currentUser._id, socketIO])

    return (
        <AnimatedView animation={'fadeIn'} duration={800} style={styles.container}>

            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <HeaderComponent />
            { roomList.length ? (<ScrollView>
                {roomList.map((item) => { 
                    let {memberDetails} = item;
                    if (typeof memberDetails == 'string') {
                        memberDetails = JSON.parse(memberDetails);
                    }
                    let chatUser = memberDetails.find(el => el && Object.keys(el)[0] != currentUser._id);
                    chatUser = Object.values(chatUser||{})[0] || {};
                    let name = [chatUser.firstname, chatUser.lastname].join(' ') || chatUser.username;

                    return (
                        <List name={name} image={chatUser.picture} callback={() => userCardOnClick({currentRoom: item, chatUser})} key={item._id} message={`@${chatUser.username}`} />
                    );
                })}
            </ScrollView>) : <EmptyComponent 
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