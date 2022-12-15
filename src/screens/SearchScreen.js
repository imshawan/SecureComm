import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, StatusBar, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux';

import { List } from "../components/chat";
import SearchBar from '../components/SearchBar';
import EmptyComponent from '../components/EmptyComponent';

import { log } from '../config';
import { colors, HEADER_HEIGHT, fontSizes, LABELS, fontFamily } from '../common';
import { getUserPicture } from '../utils';

const {SEARCH_SCREEN} = LABELS;
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
    resultHeaderContainer: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 10
    },
    resultHeaderText: {
        fontFamily: fontFamily.regular,
        fontSize: fontSizes.small,
        lineHeight: fontSizes.small,
        color: colors.lightBlack,
        marginBottom: 5
    }
});

const ResultHeader = ({header}) => {
    return (
        <View style={styles.resultHeaderContainer}>
            <Text style={styles.resultHeaderText}>{header}</Text>
        </View>
    );
}

const SearchScreen = ({navigation}) => {
    const [value, setValue] = useState("");
    const [clicked, setClicked] = useState(false);
    
    const roomList = useSelector(state => state.rooms.roomList);
    const currentUser = useSelector(state => state.user.currentUser);
    const recentRooms = useSelector(state => state.rooms.recentRooms);
    
    const [results, setResults] = useState(recentRooms);
    const [isRecents, setIsRecents] = useState(true);

    useEffect(() => {
        if (!value || (value && value.length < 3)) return;

        let results = (roomList).filter(item => new RegExp(value).test(item.name));
        if (results.length) {
            setResults(results);
            setIsRecents(false);
        } else {
            setResults(recentRooms)
            setIsRecents(true);
        }

    }, [value])

    const renderItem = ({item}) => <List key={item.roomId} item={item} />


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
            
            <ResultHeader header={isRecents ? SEARCH_SCREEN.resultHeaders.recent : SEARCH_SCREEN.resultHeaders.all} />

            {results.length ? <FlatList 
                data={results}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
            /> : (<EmptyComponent 
                    header={SEARCH_SCREEN.emptyComponent.header} 
                    subHeader={SEARCH_SCREEN.emptyComponent.subHeader}
                    IconComponent={() => <MaterialIcon name='search-off' style={{color: colors.lightGrey}} size={90} />}
                    />
                )}
        </View>
    )
};

export default SearchScreen;