import React, {useState, useEffect} from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { settingsActions } from '../../store/settingsStore';
import Select from '../../components/SelectInput/Select';
import NotificationSwitchItem from '../../components/settings/NotificationSwitchItem';
import { colors, HEADER_HEIGHT, fontSizes, LABELS, fontFamily, PLACEHOLDERS, ENDPOINTS } from '../../common';
import { HTTP } from '../../services';
import { log } from '../../config';
import { setNotificationPreferences, notifyUser } from '../../utils';

const { NOTIFICATION_SCREEN } = LABELS;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
},

headerContainer: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    flexDirection: 'column',
    height: HEADER_HEIGHT - 10,
    shadowColor: colors.lightestGrey,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    zIndex: 9,
            
  },
  headerRow: {
      flexDirection: 'row', 
      height: '100%', 
      alignItems: 'center',
  },
  headerTextStyle: {
      flexDirection: 'row',
      fontSize: fontSizes.extraLarge, 
      color: colors.black,
      fontFamily: fontFamily.bold,
      lineHeight: fontSizes.extraLarge + 5,
  },
  headerContent: {
      flexDirection: 'row', 
      paddingHorizontal: 25,
  },
  touchControlStyle: {
    marginLeft: 0,
    paddingLeft: 0,
    marginTop: -2,
    width: 35,
  },
  iconStyles: {
    color: colors.black
  },
  sectionHeadingContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 12
  },
  sectionHeading: {
    color: colors.black,
    fontSize: fontSizes.extraLarge,
    fontFamily: fontFamily.bold,
    lineHeight: fontSizes.extraLarge + 5,
  },
  sectionSubHeading: {
    color: colors.black,
    fontSize: fontSizes.medium,
    fontFamily: fontFamily.regular,
    lineHeight: fontSizes.medium + 5,
    marginTop: 2
  },
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20
  },
  sectionStyle: {
    position: 'relative',
    flexDirection: 'row',
    height: 40,
  },
});
 

const Notification = ({navigation}) => {
  const notifications = useSelector(state => state.settings.notifications);

  const toggleSwitch = async (field, val) => {
    dispatch(settingsActions.setNotificationData({[field]: val}));
    await setNotificationPreferences({...notifications, [field]: val});
  }

  const dispatch = useDispatch();
 
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
      <View style={styles.container}>
          <View style={styles.headerContainer}>
              <View style={styles.headerContent}>
                  <View style={styles.headerRow}>
                      <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.goBack()}>
                          <Icon name="arrow-left" style={styles.iconStyles} size={fontSizes.large} />
                      </TouchableOpacity>
                      <Text style={styles.headerTextStyle}>{NOTIFICATION_SCREEN.title}</Text>
                  </View>
              </View>
          </View>
          
          <View style={styles.sectionHeadingContainer}>
            <Text style={styles.sectionHeading}>{NOTIFICATION_SCREEN.header}</Text>
            <Text style={styles.sectionSubHeading}>{NOTIFICATION_SCREEN.subHeader}</Text>
          </View>

          <View style={styles.formContainer}>

            <NotificationSwitchItem
                header={NOTIFICATION_SCREEN.notificationItems.incomingMessage}
                subHeader={NOTIFICATION_SCREEN.notificationItems.incomingMessageSubtext}
                enabled={notifications.tune}
                onPressAction={() => toggleSwitch('tune', !notifications.tune)}
            />

            <NotificationSwitchItem
                header={NOTIFICATION_SCREEN.notificationItems.vibrate}
                subHeader={NOTIFICATION_SCREEN.notificationItems.vibrateSubtext}
                enabled={notifications.vibrate}
                onPressAction={() => toggleSwitch('vibrate', !notifications.vibrate)}
            />
            
          </View>

        </View>  
    </>
  );
};
 
export default Notification; 