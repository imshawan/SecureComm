import React, {useState, useCallback, useRef} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar, FlatList, ActivityIndicator } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { roomActions } from '../../store/roomListStore';
import { debounce } from 'lodash';

import { UserList } from '../../components/chat';
import Loader from '../../components/Loader';
import EmptyComponent from '../../components/EmptyComponent';

import { log } from '../../config';
import { colors, HEADER_HEIGHT, fontSizes, ENDPOINTS, fontFamily, LABELS } from '../../common';
import { HTTP } from '../../services';
import { getLoggedInUser, notifyUser } from '../../utils';
import { storeNewRoom, Rooms } from '../../database';

const {NEW_CHATS_SCREEN} = LABELS;
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    },
    searchBar: {
        color: colors.black,
        height: 50
    },
    headerContainer: {
        backgroundColor: colors.white,
        paddingVertical: 12,
        paddingHorizontal: 18,
        flexDirection: 'column',
        height: HEADER_HEIGHT + 50,
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTextStyle: {
        flexDirection: 'row',
        fontSize: fontSizes.extraLarge, 
        marginLeft: 5, 
        fontFamily: fontFamily.bold,
        lineHeight: fontSizes.extraLarge + 5,
        color: colors.black,
    },
    headerContent: {
        flexDirection: 'row', 
        marginBottom: 8
    },
    touchControlStyle: {
        // marginRight: 14,
        marginLeft: 0,
        paddingLeft: 0,
        width: 30,
    },
    labelStyle: {
        fontSize: fontSizes.regular,
        color: colors.black,
        paddingVertical: 7,
        paddingRight: 7,
        fontFamily: fontFamily.bold,
    },
    inputStyles: {
        width: '90%',
        height: 40,
        backgroundColor: colors.white,
        fontFamily: fontFamily.regular,
        color: colors.black,
    },
    iconStyles: {
        color: colors.black
    },
    searchingIconContainerStyle: {
        right: 16,
        position: "absolute",
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const NewChatScreen = ({navigation, route}) => {
    const [apiResponse, setApiResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isSearching, setIsSearching] = useState(false);

    const dispatch = useDispatch();
    const textInputRef = useRef();

    const handleSearch = useCallback(debounce(async(query) => {
        if (!query || (query && query.length < 3)) return;
        if (isInitialLoad) {
            setIsInitialLoad(false);
        }

        setIsSearching(true);
        
        try {
            let {payload} = await HTTP.get(ENDPOINTS.getUsersByUsername, {
                query
            });
            if (payload) {
                setApiResponse(payload.data);
            }
        } catch (err) {
            let {status} = err;
            if (status) {
                notifyUser(status.message);
            }
        }

        setIsSearching(false);
    }, 400),[]);

    const userCardOnClick = async (selectedUser) => {
        setLoading(true);
        let {_id} = await getLoggedInUser();
        let payload = {
            members: [_id, selectedUser._id],
            name: [selectedUser.firstname, selectedUser.lastname].join(' '),
        }
        try {
            let room = await HTTP.post(ENDPOINTS.createRoom, payload);
            if (room.payload) {
                let {memberDetails=[]} = room.payload;
                let realmObj = await Rooms();
                let chatUserData = memberDetails.find(el =>  Object.keys(el)[0] != _id);
                
                if (chatUserData) {
                    chatUserData = chatUserData[selectedUser._id];
                } else {
                    chatUserData = selectedUser;
                }

                let roomPayload = {chatUser: chatUserData, currentRoom: room.payload};

                await storeNewRoom({...room.payload, memberDetails: chatUserData}, realmObj);
                dispatch(roomActions.addRoomToStore({...room.payload, memberDetails: chatUserData}));

                dispatch(roomActions.addToRecent(roomPayload))
                navigation.navigate('ChatScreen', {...roomPayload, isNew: true});
            }
        } catch (err) {
            let {status} = err;
            if (status) {
                notifyUser(status.message);
            }
        }
        setLoading(false);
    }

    const clearTextInput = () => {
        if (!isSearching) {
            textInputRef.current.clear();
        }
    }

    const renderItem = ({item}) => <UserList callback={() => userCardOnClick(item)} item={item} key={item._id} />

    return (<>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <Loader visible={loading} />
            <View style={styles.container}>
                <View style={styles.headerContainer}>

                    <View style={styles.headerContent}>
                        <View style={styles.headerRow}>
                            <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.goBack()}>
                                <Icon name="arrow-left" style={styles.iconStyles} size={fontSizes.large} />
                            </TouchableOpacity>
                            <Text style={styles.headerTextStyle}>{NEW_CHATS_SCREEN.title}</Text>
                        </View>
                    </View>
                    <View style={styles.headerContent}>
                        <Text style={styles.labelStyle}>To</Text>
                        <TextInput 
                            style={styles.inputStyles}
                            ref={textInputRef}
                            placeholder="Name or username"
                            placeholderTextColor={colors.placeholderColor}
                            onChangeText={(searchText) => handleSearch(searchText)}
                        />
                        <TouchableOpacity onPress={clearTextInput} style={styles.searchingIconContainerStyle}>
                          {isSearching ? 
                            <ActivityIndicator color={colors.brandColor} size={25} /> : 
                            <Icon name={"times"} size={fontSizes.regular} style={styles.iconStyles} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                
                {apiResponse.length ? <FlatList 
                    data={apiResponse}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                /> : (<EmptyComponent 
                        header={NEW_CHATS_SCREEN[isInitialLoad ? 'initialComponent' :'emptyComponent'].header}
                        subHeader={NEW_CHATS_SCREEN[isInitialLoad ? 'initialComponent' :'emptyComponent'].subHeader}
                        IconComponent={() => <MaterialIcon name={isInitialLoad ? 'person-search' :'people-alt'} style={{color: colors.lightGrey}} size={90} />} 
                        />
                    )}

            </View>
        </>
    )
};

export default NewChatScreen;