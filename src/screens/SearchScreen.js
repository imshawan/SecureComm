import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, StatusBar, BackHandler } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

import { List } from "../components/chat";
import SearchBar from '../components/SearchBar';

import { log } from '../config';
import { colors, HEADER_HEIGHT, fontSizes } from '../common';
import { getUserPicture } from '../utils';


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    },
    searchBar: {
        olor: colors.black,
        height: 50
    },
    headerContainer: {
        backgroundColor: colors.white,
        // paddingHorizontal: 25,
        paddingVertical: 12,
        flexDirection: 'column',
        // justifyContent: 'space-between',
        height: HEADER_HEIGHT + 50,
        // alignItems: 'center',
        shadowColor: colors.lightestGrey,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 3,
        zIndex: 9
      },
    headerRow: {
        flexDirection: 'row', 
        height: '100%', 
        alignItems: 'center'
    },
    headerTextStyle: {
        flexDirection: 'row',
        fontSize: fontSizes.extraLarge, 
        marginLeft: 5, 
        // fontWeight: 'bold',
        color: colors.black,
        fontFamily: 'SF-Pro-Rounded-Bold',
        lineHeight: fontSizes.extraLarge + 5
    },
    headerContent: {
        flexDirection: 'row', 
        paddingHorizontal: 25,
        marginBottom: 8
    },
    touchControlStyle: {
        // marginRight: 14,
        marginLeft: 0,
        paddingLeft: 0,
        width: 30,
    },
    iconStyles: {
        color: colors.black
    },
});

const SearchScreen = ({navigation}) => {
    const [value, setValue] = useState("");
    const [clicked, setClicked] = useState(false);
    
    const roomList = useSelector(state => state.rooms.roomList);
    const currentUser = useSelector(state => state.user.currentUser);
    const recentRooms = useSelector(state => state.rooms.recentRooms);
    
    const [results, setResults] = useState(recentRooms);

    const userCardOnClick = async (card) => {
        navigation.navigate('ChatScreen', JSON.parse(JSON.stringify(card)));
    }

    useEffect(() => {
        if (!value || (value && value.length < 3)) return;

        let results = (roomList).filter(item => new RegExp(value).test(item.name));
        if (results.length) {
            setResults(results);
        } else {
            setResults(recentRooms)
        }

    }, [value])


    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <View style={styles.headerContainer}>

                <View style={styles.headerContent}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" style={styles.iconStyles} size={fontSizes.large} />
                        </TouchableOpacity>
                        <Text style={styles.headerTextStyle}>Search</Text>
                    </View>
                </View>

                <View style={{marginTop: 5}}>
                    <SearchBar
                        value={value}
                        setValue={setValue}
                        clicked={clicked}
                        setClicked={setClicked}
                        />
                </View>

            </View>
            
            <ScrollView>
                {results.map(item => {
                    let {memberDetails} = item;
                    if (typeof memberDetails == 'string') {
                        memberDetails = JSON.parse(memberDetails);
                    }
                    let chatUser = memberDetails.find(el => el && Object.keys(el)[0] != currentUser._id);
                    chatUser = Object.values(chatUser||{})[0] || {};
                    let name = [chatUser.firstname, chatUser.lastname].join(' ') || chatUser.username;

                    return (
                        <List name={name} image={getUserPicture(chatUser)} callback={() => userCardOnClick({currentRoom: item, chatUser})} key={item._id} message={`@${chatUser.username}`} />
                    );
                })}
            </ScrollView>
        </View>
    )
};

export default SearchScreen;