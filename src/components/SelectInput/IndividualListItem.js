import React, { Component } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, fontSizes, fontFamily } from "../../common";
import { log } from "../../config";

const styles = StyleSheet.create({
    selectItem: {
        height: 40,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    selectItemText: {
        color: colors.black,
        fontSize: fontSizes.regular,
        fontFamily: fontFamily.regular,
    },
});

class IndividualListItem extends Component {

    constructor(props) {
        super(props)
    }

    shouldComponentUpdate () {
        return false;
    }

    render() {
        const {onSelect, item} = this.props;

        return (
            <TouchableOpacity onPress={onSelect} style={styles.selectItem}>
                <Text style={styles.selectItemText}>{item.name}</Text>
                <Text style={styles.selectItemText}>{item.iso3}</Text>
            </TouchableOpacity>
        );
     }
  }

export default IndividualListItem;