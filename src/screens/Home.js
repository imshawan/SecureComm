import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";
import { SpeedDial } from '@rneui/themed';

import HeaderComponent from "../components/HeaderComponent";
import { List } from "../components/chat";

import { log } from '../config';
import { colors, dummyJSON } from '../common';

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        flex: 1
    }
})

const Home = ({navigation}) => {
    const [open, setOpen] = React.useState(false);

    return (
        <View style={styles.container}>

            <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
            <HeaderComponent />
            <ScrollView>
                {dummyJSON.map((item, index) => { return (<List name={item.name} key={index} id={item.id} message={item.msg} />) })}
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