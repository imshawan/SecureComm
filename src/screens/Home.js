import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, StatusBar, BackHandler, Alert } from "react-native";
import { SpeedDial } from '@rneui/themed';

import { io } from 'socket.io-client';

import HeaderComponent from "../components/HeaderComponent";
import { List } from "../components/chat";

import { log } from '../config';
import { colors, dummyJSON } from '../common';
import { APP_REMOTE_HOST } from '../common';

import { listMyRooms } from '../database';
import { getLoggedInUser } from '../utils';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    }
})

const Home = ({navigation}) => {
    const [roomList, setRoomList] = useState([]);
    const [currentUser, setCurrentUser] = useState({});

    const socketIO = io(APP_REMOTE_HOST, {
        transports: ['websocket']
    });
    let userName = 'Pinky Paul';

    useEffect(() => {
        getLoggedInUser().then(usr => setCurrentUser(usr));

        listMyRooms().then(rooms => {
            setRoomList(rooms)
        });

        socketIO.on('connect', () =>{
            log('Connected to remote server!')
            socketIO.emit('join-room', {room: userName})
        });

        
        socketIO.on('message:receive', (socket) => {
            // alert(JSON.stringify(socket))
        })

        

        socketIO.on('error', (err) => log(err));
        
        socketIO.on('connect_failed', function() {
            log("Sorry, there seems to be an issue with the connection!");
         })

        const backHandler = BackHandler.addEventListener("hardwareBackPress", function () {
            Alert.alert("Hold on!", "Are you sure exit?", [
                {
                  text: "Cancel",
                  onPress: () => null,
                  style: "cancel"
                },
                { text: "YES", onPress: () => {
                    BackHandler.exitApp();
                    socketIO.emit('leave-room', {room: userName })
                } }
              ]);
              return true;
        });
    
        return () => backHandler.remove();

        
    }, [])

    return (
        <View style={styles.container}>

            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <HeaderComponent />
            <ScrollView>
                {roomList.map((item) => { 
                        let memberDetails = JSON.parse(item.memberDetails);
                        let chatUser = memberDetails.find(el => el._id != currentUser._id);
                        chatUser = Object.values(chatUser||{})[0] || {};
                        let name = [chatUser.firstname, chatUser.lastname].join(' ') || chatUser.username;

                        return (
                            <List name={name} key={item._id} message={'@' + chatUser.username} />
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