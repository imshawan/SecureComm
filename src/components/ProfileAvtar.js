import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { stringAvatar, stringToColor } from "../utils";
import { log } from "../config";
import { colors, IMAGES } from "../common";


const styles = StyleSheet.create({
    container: {
        minHeight: 50,
        minWidth: 50
    },
    avtarStyle: {
        height: 40,
        width: 40,
        borderRadius: 40
    },
    avtarTextStyle: {
        height: 40,
        width: 40,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    textstyle: {
        marginTop: 1,
        color: colors.white,
        fontFamily: 'SF-Pro-Rounded-Bold'
    }
})


const ProfileAvtar = ({image, name, customStyles={}, textStyle = {}}) => {
    const authToken = useSelector(state => state.application.authToken);
    const headers = {
        Authorization: `Bearer ${authToken}`
    };
    const [imageData, setImageData] = useState({
        uri: image,
        headers,
    })
    let component, style = {...styles.avtarStyle, ...customStyles};

    useEffect(() => setImageData(prevstate => ({...prevstate, uri: image, headers})), [image])
    
    const props = {
        style: style,
        defaultSource: IMAGES.defaultUserProfile,
        source: imageData || IMAGES.defaultUserProfile,
        onError: () => setImageData(IMAGES.defaultUserProfile)
    }

    if (image) {
        component = React.createElement(Image, props);
    } else if (name){
        let { text, backgroundColor } = stringAvatar(name, 2);
        component = <View style={{...styles.avtarTextStyle, backgroundColor, ...customStyles}}>
            <Text style={{...styles.textstyle, ...textStyle}}>{text}</Text>
        </View>
    } else {
        component = <View style={{...styles.avtarTextStyle, backgroundColor: stringToColor('Unknown'), ...customStyles}}>
            <Text style={{...styles.textstyle, ...textStyle}}>{'UN'}</Text>
        </View>
    }

    return (
        <View style={styles.container}>
            {component}
        </View>
    );
}


export default ProfileAvtar;