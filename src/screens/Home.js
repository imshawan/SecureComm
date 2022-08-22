import React, {useState, useEffect} from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from "react-native";

import HeaderComponent from "../components/HeaderComponent";
import List from "../components/chat/List";;

import { log } from '../config';

const dummy = [
    {name: 'Anirban Mukherjee', msg: 'Hello there, I\'m fascinated by up-and-coming technology.'},
    {name: 'Shawan Mandal', msg: 'Backend focused full-stack developer (MERN stack)'},
    {name: 'Shagun Mishra', msg: 'Hello there, I was just wondering what to do now Oh no..!!'},
    {name: 'Pinky Paul', msg: 'Hello there, Still there??'},
    {name: 'Pooja Sonavane', msg: 'I was just wondering what to do'},
    {name: 'Anirban Mukherjee', msg: 'Hello there, I\'m fascinated by up-and-coming technology.'},
    {name: 'Sidhanth Mandal', msg: 'Backend focused full-stack developer (MERN stack)'},
    {name: 'Shagun Mishra', msg: 'Hello there, I was just wondering what to do now Oh no..!!'},
    {name: 'Pinky Paul', msg: 'Hello there, Still there??'},
    {name: 'Pooja Sonavane', msg: 'I was just wondering what to do'},
    {name: 'Anirban Mukherjee', msg: 'Hello there, I\'m fascinated by up-and-coming technology.'},
    {name: 'Shawan Mandal', msg: 'Backend focused full-stack developer (MERN stack)'},
    {name: 'Shagun Mishra', msg: 'Hello there, I was just wondering what to do now Oh no..!!'},
    {name: 'Pinky Paul', msg: 'Hello there, Still there??'},
    {name: 'Pooja Sonavane', msg: 'I was just wondering what to do'},
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
            <StatusBar barStyle='dark-content' backgroundColor="#fff" />
            <HeaderComponent />
            <ScrollView>
                {dummy.map((item, index) => { return (<List name={item.name} key={index} message={item.msg} />) })}
            </ScrollView>
        </View>
    )
};

export default Home;