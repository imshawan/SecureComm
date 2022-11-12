import React, {useState, useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Switch } from 'react-native';
import { colors, fontSizes, fontFamily, } from '../../common';


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  notificationSection: {
    //   backgroundColor: 'red',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingVertical: 20
  },
  notificationTextSection: {
    width: '85%'
  },
  notificationItemHeader: {
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.regular,
    lineHeight: fontSizes.regular,
    color: colors.black
  },
  notificationItemSubHeader: {
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    color: colors.black,
  }
});


const NotificationSwitchItem = ({header, subHeader, onPressAction, enabled}) => {

    return (
        <TouchableOpacity onPress={onPressAction} activeOpacity={1} style={styles.notificationSection}>
            <View style={styles.notificationTextSection}>
                <Text style={styles.notificationItemHeader}>{header}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={styles.notificationItemSubHeader}>{subHeader}</Text>
            </View>

            <Switch
                trackColor={{ false: colors.lightestGrey, true: colors.brandColor + '50' }}
                thumbColor={enabled ? colors.brandColor : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                // onValueChange={toggleSwitch}
                value={enabled}
                style={{}}
            />
        </TouchableOpacity>
    );
}

export default NotificationSwitchItem;