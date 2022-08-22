import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import { SpeedDial } from '@rneui/themed';

import HeaderComponent from "../components/HeaderComponent";
import List from "../components/chat/List";;

import { log } from '../config';
import { colors, dummyJSON } from '../common';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    }
})

const Home = ({navigation}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <View style={styles.container}>

            <StatusBar barStyle='dark-content' backgroundColor="#fff" />
            <HeaderComponent />
            <ScrollView>
                {dummyJSON.map((item, index) => { return (<List name={item.name} key={index} message={item.msg} />) })}
            </ScrollView>

            <SpeedDial
                icon={{ name: 'comment', color: '#fff' }}
                overlayColor={'transparent'}
                size='large'
                color={colors.brandColor}
            >
                 
            </SpeedDial>

        </View>
    )
};

export default Home;