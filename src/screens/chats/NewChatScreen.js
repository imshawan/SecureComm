import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, StatusBar, BackHandler } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { roomActions } from '../../store/roomListStore';

import { List } from '../../components/chat';
import Loader from '../../components/Loader';

import { log } from '../../config';
import { colors, HEADER_HEIGHT, fontSizes, ENDPOINTS } from '../../common';
import { HTTP } from '../../services';
import { getLoggedInUser } from '../../utils';
import { storeNewRoom, Rooms } from '../../database';


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
        fontFamily: 'SF-Pro-Rounded-Bold',
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
        fontFamily: 'SF-Pro-Rounded-Bold',
    },
    inputStyles: {
        width: '90%',
        height: 40,
        backgroundColor: colors.white,
        fontFamily: 'SF-Pro-Rounded-Regular'
    },
    iconStyles: {
        color: colors.black
    },
});

const NewChatScreen = ({navigation, route}) => {
    const [apiResponse, setApiResponse] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleSearch = async (query) => {
        if (!query || (query && query.length < 3)) return setApiResponse([]);
        let {payload} = await HTTP.get(ENDPOINTS.getUsersByUsername, {
            query
        });
        if (payload) {
            setApiResponse(payload.data);
        }
    }

    const userCardOnClick = async (selectedUser) => {
        setLoading(true);
        let {_id} = await getLoggedInUser();
        let payload = {
            members: [_id, selectedUser._id]
        }
        let room = await HTTP.post(ENDPOINTS.createRoom, payload);
        if (room.payload) {
            let realmObj = await Rooms();
            await storeNewRoom(room.payload, realmObj);
            dispatch(roomActions.addRoomToStore(room.payload));
            // realmObj.close();
        }
        setLoading(false);
    }

    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", function () {
            navigation.goBack();
            return true;
        });
    
        return () => backHandler.remove();
    }, []);

    return (<>
            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            {loading ? <Loader animating={loading} color={colors.white} /> : ''}
            <View style={styles.container}>
                <View style={styles.headerContainer}>

                    <View style={styles.headerContent}>
                        <View style={styles.headerRow}>
                            <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.goBack()}>
                                <Icon name="arrow-left" style={styles.iconStyles} size={fontSizes.large} />
                            </TouchableOpacity>
                            <Text style={styles.headerTextStyle}>New Message</Text>
                        </View>
                    </View>
                    <View style={styles.headerContent}>
                        <Text style={styles.labelStyle}>To</Text>
                        <TextInput 
                            style={styles.inputStyles} 
                            placeholder="@username"
                            onChangeText={(searchText) => handleSearch(searchText)}
                        />
                    </View>
                </View>

                <ScrollView>
                    {apiResponse.map((item, index) => { 
                            let name = [item.firstname, item.lastname].join(' ') || item.username;
                            return (<List name={name} callback={() => userCardOnClick(item)} key={item._id} message={`@${item.username}`} />);
                        })}
                </ScrollView>

            </View>
        </>
    )
};

export default NewChatScreen;