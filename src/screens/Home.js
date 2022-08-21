import React, {useState, useEffect} from 'react';
import { View } from "react-native";
import HeaderComponent from "../components/HeaderComponent";

const Home = () => {
    return (
        <View style={{flex: 1}}>
            <HeaderComponent />
        </View>
    )
};

export default Home;