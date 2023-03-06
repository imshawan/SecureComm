import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import RNRestart from 'react-native-restart'; 
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, fontSizes, LABELS, fontFamily, BUTTONS } from '../../common';
import { styles as defaultStyles } from '../styles';

const { CONNECTION_ERROR } = LABELS;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  iconStyles: {
    color: colors.black
  },
  sectionContainer: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    marginTop: -30,
  },
  sectionItems: {
    alignItems: 'center',
  },
  buttonStyle: {
    marginLeft: 0,
    marginRight: 0,
    paddingHorizontal: 20,
    height: 46
  },
  sectionHeaderText: {
    color: colors.black,
    fontSize: fontSizes.large,
    fontFamily: fontFamily.bold,
  },
  sectionSubheaderText: {
    color: colors.black,
    fontSize: fontSizes.regular,
    fontFamily: fontFamily.regular,
    marginBottom: 10
  },
  checkedItemsContainer: {
    flexDirection: 'row',
    marginVertical: 4
  },
  checkedItemsIconStyles: {
    color: colors.lightBlack
  },
  checkedItemsTextStyles: {
    marginLeft: 4,
    color: colors.black,
    fontSize: fontSizes.regular,
    fontFamily: fontFamily.regular,
    lineHeight: fontSizes.extraLarge
  }
});
 
const CheckedItems = ({text}) => {
    return (
        <View style={styles.checkedItemsContainer}>
            <Icon name="check-circle" style={styles.checkedItemsIconStyles} size={fontSizes.large} />
            <Text style={styles.checkedItemsTextStyles}>{text}</Text>
        </View>
    );
}

const ConnectionError = ({navigation}) => {

    const reload = () => {
      RNRestart.Restart();
    }

    return (
        <>
        <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
        <View style={styles.container}>
            
            <View style={styles.sectionContainer}>
                <View style={styles.sectionItems}>
                    <Icon name="wifi-off" style={styles.iconStyles} size={150} />
                </View>

                <View style={styles.sectionItems}>
                    <Text style={styles.sectionHeaderText}>{CONNECTION_ERROR.header}</Text>
                    <Text style={styles.sectionSubheaderText}>{CONNECTION_ERROR.subHeader}</Text>
                </View>

                <View style={{marginHorizontal: 10}}>
                    <CheckedItems text={CONNECTION_ERROR.checkRouter} />
                    <CheckedItems text={CONNECTION_ERROR.reconnect} />
                </View>

                <View style={styles.sectionItems}>
                    <TouchableOpacity
                        style={{...defaultStyles.buttonStyle, ...styles.buttonStyle}}
                        activeOpacity={0.5}
                        onPress={reload}>
                            <Text style={defaultStyles.buttonTextStyle}>{BUTTONS.connectionError}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            </View>  
        </>
    );
};
 
export default ConnectionError; 