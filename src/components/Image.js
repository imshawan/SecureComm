import React from "react";
import { Animated, View, StyleSheet } from "react-native";

const generateImageStyles = ({height, width}) => {
    return StyleSheet.create({
        height: height || '40%',
        width: width || '40%',
        resizeMode: 'contain',
        alignSelf: 'center',
    })
}

const Image = ({height, width, imageSource, styles}) => {
    const defaultStyles = generateImageStyles({height, width});
    return (
        <>
            <Animated.Image 
                source={imageSource}
                style={[defaultStyles, styles]}
            />
        </>
    );
}

export default Image;