import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, StatusBar } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import List from "../components/chat/List";
import SearchBar from '../components/SearchBar';

import { log } from '../config';
import { colors, HEADER_HEIGHT, fontSizes, dummyJSON } from '../common';


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
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
    },
    headerTextStyle: {
        flexDirection: 'row',
        fontSize: fontSizes.extraLarge, 
        marginLeft: 5, 
        fontWeight: 'bold',
        color: colors.black,
    },
    headerContent: {
        flexDirection: 'row', 
        paddingHorizontal: 25,
        marginBottom: 8
    },
    touchControlStyle: {
        paddingVertical: 8,
        marginRight: 14,
        marginLeft: 0,
        paddingLeft: 0
    }
})

const SearchScreen = ({navigation}) => {
    const [value, setValue] = useState("");
    const [clicked, setClicked] = useState(false);
    const [fakeData, setFakeData] = useState();

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content' backgroundColor="#fff" />
            <View style={styles.headerContainer}>

                <View style={styles.headerContent}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.goBack()}>
                            <Icon name="arrow-left" size={fontSizes.regular} />
                        </TouchableOpacity>
                        <Text style={styles.headerTextStyle}>Search</Text>
                    </View>
                </View>

                <View>
                    <SearchBar
                        value={value}
                        setValue={setValue}
                        clicked={clicked}
                        setClicked={setClicked}
                        />
                </View>

            </View>
            
            <ScrollView>
                {dummyJSON.map((item, index) => { 
                    if (item.name && new RegExp(value).test(item.name)) {
                        return (<List name={item.name} key={index} message={item.msg} />)
                    }
                    else {
                        return (<></>)
                    } })}
            </ScrollView>
        </View>
    )
};

export default SearchScreen;