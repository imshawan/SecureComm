import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import moment from 'moment';

import { colors, fontFamily, fontSizes, TOUCHABLE_TAP } from '../../common'
import { processTime } from '../../utils';
import { log } from '../../config';


const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        backgroundColor: colors.grey,
        borderRadius: 12,
        minWidth: '30%'
    },
    messageTextStyle: {
        fontSize: fontSizes.medium,
    },
    messageStats: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    messageTimestampStyle: {
        fontSize: fontSizes.xxSmall,
        color: colors.lightGrey,
        fontFamily: fontFamily.bold,
        lineHeight: fontSizes.xxSmall,
        textAlign: 'right'
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
        const {name, message, userId, status, isReceiver, timestamp, customStyles, containerStyles} = this.props;
        const receiverStatsStyles = {}, touchable = {};
        if (isReceiver) {
            receiverStatsStyles.color = colors.lightestGrey;
            touchable.marginRight = 15;
        } else {
            touchable.paddingLeft = 20;
        }

        return (
            <View style={[styles.parentContainerStyles, containerStyles]}>
                <TouchableOpacity 
                    activeOpacity={1}
                    style={[styles.touchable, touchable]}
                    >
                    <View style={[styles.container, customStyles]}>
                        <View style={{width: '95%'}}>
                            <Text style={[styles.messageTextStyle, {color: customStyles.color || '#000'}]}>{message}</Text>
                        </View>
                        <View style={styles.messageStats}>
                            <Text style={[styles.messageTimestampStyle, receiverStatsStyles]}>{processTime(timestamp)}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export {Thread};