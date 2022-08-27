import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { stringAvatar, stringToColor } from "../utils";
import { log } from "../config";
import { colors } from "../common";


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
        marginTop: -2,
        fontWeight: 'bold',
        color: colors.white,
    }
})


const ProfileAvtar = ({image, name, customStyles, textStyle = {}}) => {
    let component;
    
    const props = {
        style: styles.avtarStyle,
        source: {uri: image},
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