import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import ProfileAvtar from '../ProfileAvtar';

import { colors, fontSizes, TOUCHABLE_TAP } from '../../common'
import { log } from '../../config';


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 8,
        marginVertical: 2,
        backgroundColor: colors.grey,
        borderRadius: 15,
    },
    messageTextStyle: {
        fontSize: fontSizes.medium,
    },
    parentContainerStyles: {
        flexDirection: 'row',
    },
    touchable: {
        borderRadius: 10, 
        marginHorizontal: 10,
    }
})

class Thread extends Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate () {
        return false;
    }

    render () {
        const {name, message, userId, customStyles, containerStyles} = this.props;

        return (
            <View style={[styles.parentContainerStyles, containerStyles]}>
                <TouchableOpacity 
                    activeOpacity={1}
                    style={[styles.touchable]}
                    >
                    <View style={[styles.container, customStyles]}>
                        <Text style={[styles.messageTextStyle, {color: customStyles.color || '#000'}]}>{message}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export {Thread};