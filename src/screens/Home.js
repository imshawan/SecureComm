import React, {useState, useEffect} from 'react';
import { View } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import { log } from '../config';

const Home = ({navigation}) => {
    return (
        <View style={{backgroundColor: '#fff', flex: 1}}>
            <HeaderComponent />
        </View>
    )
};

export default Home;