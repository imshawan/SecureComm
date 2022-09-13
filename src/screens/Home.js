import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, StatusBar, BackHandler, Alert } from "react-native";
import { SpeedDial } from '@rneui/themed';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { roomActions } from '../store/roomListStore';
import { currentUserActions } from '../store/userStore';

import HeaderComponent from "../components/HeaderComponent";
import { List } from "../components/chat";

import { log } from '../config';
import { colors, dummyJSON } from '../common';
import { APP_REMOTE_HOST } from '../common';

import { getLoggedInUser } from '../utils';
import { storeNewRoom, Rooms, listMyRooms } from '../database';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    }
})

const Home = ({navigation}) => {
    const [loading, setLoading] = useState(false);

    const roomList = useSelector(state => state.rooms.roomList);
    const currentUser = useSelector(state => state.user.currentUser);

    const dispatch = useDispatch();

    const socketIO = io(APP_REMOTE_HOST, {
        transports: ['websocket']
    });

    const userCardOnClick = async (card) => {
        card = JSON.parse(JSON.stringify(card));
        dispatch(roomActions.addToRecent(card));
        navigation.navigate('ChatScreen', card);
    }

    useEffect(() => {
        getLoggedInUser().then(usr => {
            if (currentUser._id != usr._id) {
                dispatch(currentUserActions.setCurrentUser(usr));
            }
        });
    }, [])

    useEffect(() => {

        listMyRooms().then(rooms => {
            if (rooms && rooms.length) {
                dispatch(roomActions.initRooms(rooms));
            }
        });

        if (!currentUser || !currentUser._id) return;

        socketIO.on('connect', () =>{
            log('Connected to remote server with userId ' + currentUser._id)
            socketIO.emit('join-room', {room: currentUser._id})
        });

        
        socketIO.on('global:message:receive', (socket) => {
            alert(JSON.stringify(socket))
        })
         
        // const backHandler = BackHandler.addEventListener("hardwareBackPress", function () {
        //     socketIO.emit('leave-room', {room: userName });
        //     if (!navigation.getParent()) {
        //         BackHandler.exitApp();
        //     } else navigation.goBack();
        //     return true;
        // });
    
        // return () => backHandler.remove();
        return () => socketIO.removeListener('message:receive');

        
    }, [currentUser._id])

    return (
        <View style={styles.container}>

            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <HeaderComponent />
            <ScrollView>
                {roomList.map((item) => { 
                    let {memberDetails} = item;
                    if (typeof memberDetails == 'string') {
                        memberDetails = JSON.parse(memberDetails);
                    }
                    let chatUser = memberDetails.find(el => el && Object.keys(el)[0] != currentUser._id);
                    chatUser = Object.values(chatUser||{})[0] || {};
                    let name = [chatUser.firstname, chatUser.lastname].join(' ') || chatUser.username;

                    return (
                        <List name={name} callback={() => userCardOnClick({currentRoom: item, chatUser})} key={item._id} message={`@${chatUser.username}`} />
                    );
                })}
            </ScrollView>

            <SpeedDial
                onOpen={() => navigation.navigate('NewChatScreen')}
                icon={{ name: 'comment', color: colors.white }}
                overlayColor={'transparent'}
                size='large'
                color={colors.brandColor}
            >
                 
            </SpeedDial>

        </View>
    )
};

export default Home;