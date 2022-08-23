import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { stringAvatar, stringToColor } from "../utils";
import { log } from "../config";
import { colors } from "../common";


const styles = StyleSheet.create({
    container: {
        height: 50,
        width: 50
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
        textAlign: 'center', 
        paddingVertical: 10,
        fontWeight: 'bold',
        color: colors.white,
    }
})


const ProfileAvtar = ({image, name, customStyles}) => {
    let component;
    
    const props = {
        style: styles.avtarStyle,
        source: {uri: image},
    }
    if (image) {
        component = React.createElement(Image, props);
    } else if (name){
        let { text, backgroundColor } = stringAvatar(name, 2);
        component = <Text style={{...styles.avtarTextStyle,...customStyles, backgroundColor}}>{text}</Text>
    } else {
        component = <Text style={{...styles.avtarTextStyle,...customStyles, backgroundColor: stringToColor('Unknown')}}>UN</Text>
    }

    return (
        <View style={styles.container}>
            {component}
        </View>
    );
}


export default ProfileAvtar;