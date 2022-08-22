import React, {useState, useEffect} from 'react';
import { View, StyleSheet } from "react-native";

import HeaderComponent from "../components/HeaderComponent";
import List from "../components/chat/List";;

import { log } from '../config';

const dummy = [
    {name: 'Shawan Mandal', msg: 'Hello there, I\'m fascinated by up-and-coming technology.'},
    {name: 'Shawan Mandal', msg: 'Backend focused full-stack developer (MERN stack)'},
    {name: 'Shawan Mandal', msg: 'Hello there, I was just wondering what to do now Oh no..!!'},
    {name: 'Shawan Mandal', msg: 'Hello there, Still there??'},
    {name: 'Shawan Mandal', msg: 'I was just wondering what to do'},
];

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1
    }
})

const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            <HeaderComponent />

            {dummy.map((item, index) => { return (<List name={item.name} key={index} message={item.msg} />) })}

        </View>
    )
};

export default Home;