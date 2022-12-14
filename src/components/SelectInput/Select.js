import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dialog } from '@rneui/themed';

import IndividualListItem from "./IndividualListItem";
import { colors, fontSizes, fontFamily } from "../../common";
import { log } from "../../config";


const styles = StyleSheet.create({
    touchable: {
        width: '100%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: colors.inputBackground,
        height: 50,
        borderRadius: 10,
    },
    valueContainer: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between'
    },
    value: {
        color: colors.black,
        fontSize: fontSizes.medium,
        fontFamily: fontFamily.bold,
        lineHeight: fontSizes.medium,
        alignSelf: 'center',
    },
    dropdownIcon: {
        color: colors.black,
    },
    dialogContainer: {
        width: '100%',
        flex: 1,
    },
    dialogInnerContainer: {
        marginVertical: 20,
        width: '100%'
    },
    titleTextStyle: {
        color: colors.black,
        fontSize: fontSizes.extraLarge,
        fontFamily: fontFamily.bold,
        lineHeight: fontSizes.extraLarge + 6,
        marginBottom: 20,
        alignSelf: 'center'
    },
    listContainer: {

    },
});

const FullScreenDialog = ({title, visible, setVisible, data=[], setSelected}) => {
    const toggleDialog = () => {
        setVisible(!visible);
    };

    const handleItemSelect = (item) => {
        setSelected(item);
        toggleDialog();
    }

    const renderItem = ({item}) => <IndividualListItem item={item} onSelect={() => handleItemSelect(item)}/>
    
    return (
        <Dialog
            overlayStyle={styles.dialogContainer}
            animationType='fade'
            isVisible={visible}
            onBackdropPress={toggleDialog}
            statusBarTranslucent
            >
        
            <View style={styles.dialogInnerContainer}>
                <Text style={styles.titleTextStyle}>{title}</Text>
                <FlatList data={data} 
                    // style={{width: '100%', backgroundColor: 'red'}}
                    // scrollEventThrottle={false}
                    // maxToRenderPerBatch={8}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}/>
            </View>
            
            
        </Dialog>
    );
}

const Select = ({data, currentValue, onChange, textStyle={}, listTitle}) => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(currentValue || {name: 'Select'});

    useEffect(() => {
        if (Object.keys(selected).length) {
            onChange(selected);
        } else {
            onChange({name: 'Select'})
        }
    }, [selected])

    useEffect(() => {
        setSelected(currentValue)
    }, [currentValue])

    return (
        <>
            <FullScreenDialog 
                title={listTitle} 
                visible={visible} 
                setVisible={setVisible} 
                data={data}
                setSelected={setSelected}
            />
            <TouchableOpacity style={styles.touchable} onPress={() => setVisible(true)}>
                <View style={styles.valueContainer}>
                    <Text style={[styles.value, textStyle]}>{selected.name}</Text>
                    <Icon name="chevron-down" style={styles.dropdownIcon} size={fontSizes.regular} /> 
                </View>
            </TouchableOpacity>
        </>
    );
}

export default Select;