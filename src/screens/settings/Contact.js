import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

import AnimatedTextInput from '../../components/AnimatedTextInput';
import { currentUserActions } from '../../store/userStore';
import { colors, HEADER_HEIGHT, fontSizes, LABELS, fontFamily, ERRORS } from '../../common';
import { notifyUser } from '../../utils';
import { styles as defaultStyles } from '../styles';
import { log } from '../../config';

const { CONTACT_SCREEN } = LABELS;
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
  sectionCard: {
    width: '90%',
    alignSelf: 'center',
    // paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  sectionHeadingContainer: {
    marginTop: 12
  },
  sectionHeading: {
    color: colors.black,
    fontSize: fontSizes.extraLarge + 2,
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
  displayIconsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    width: 45,
    height: 45,
    backgroundColor: colors.brandColor,
    borderRadius: 10,
  },
  displayIcons: {
    color: colors.white,
  },
  listCard: {
    // marginHorizontal: 12,
    marginVertical: 10,
    flexDirection: 'row',
  },
  listCardIcon: {
    color: colors.black
  },
  listText: {
    justifyContent: 'center',
    width: '80%'
  },
  listHeader: {
    color: colors.black,
    fontFamily: fontFamily.bold,
    fontSize: fontSizes.medium,
    lineHeight: fontSizes.regular + 5,
  },
  listSubText: {
    color: colors.lightBlack,
    fontFamily: fontFamily.regular,
    fontSize: fontSizes.medium,
    lineHeight: fontSizes.regular + 5,
  },
  displayIconCustom: {
    backgroundColor: colors.white, 
    marginLeft: 0
  },
  displayIconCustomIcon: {
    color: colors.black
  },
  formContainer: {
    width: '100%',
    alignSelf: 'center',
    marginVertical: 10
  },
  textArea: {
    height: 100, 
    textAlignVertical: 'top'
  },
  buttonStyle: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 40
  },
  errorTextStyle: { 
    marginLeft: 10, 
    marginTop: 5
  },
});


const Contact = ({navigation}) => { 
  const {email} = useSelector(state => state.user.currentUser)
  const [state, setState] = useState({email: email, message: ''});
  const [errors, setErrors] = useState({email: '', message: ''});

  const handleOnChange = (field, value) => {
    setState(prevState => ({...prevState, [field]: value}));
  }

  const handleErrors = (errorMessage, field) => {
    setErrors(prevState => ({...prevState, [field]: errorMessage}));
  }

  const sendMessage = async (payload) => {
    // TODO
    // Add API calls and logic
  }

  const handleSubmitPress = async () => {
    Keyboard.dismiss();
    
    let errors = 0;
    if (!state.email) {
      handleErrors(ERRORS.noEmail, 'email');
      errors++;
    }
    if (!state.message) {
      handleErrors(ERRORS.noMessage, 'message');
      errors++;
    }
    if (errors) return;

    await sendMessage(state);
    navigation.goBack();
    notifyUser('Message was sent!');

  }

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
                      <Text style={styles.headerTextStyle}>{CONTACT_SCREEN.title}</Text>
                  </View>
              </View>
          </View>

          <View style={{...styles.sectionCard, alignItems: 'flex-start'}}>
            <View style={styles.sectionHeadingContainer}>
              <Text style={styles.sectionHeading}>{CONTACT_SCREEN.header}</Text>
              <Text style={styles.sectionSubHeading}>{CONTACT_SCREEN.subHeader}</Text>
            </View>

            <View style={styles.formContainer}>
            
              <AnimatedTextInput 
                label={'Your email'}
                placeholder='Your email'
                onChange={(val) => handleOnChange('email', val)}
                value={state.email}
                disabled={email != ''}
                error={!!errors.email}
                onFocused={() => handleErrors(null, 'email')}
                />

              {errors.email ? <Text style={[defaultStyles.errorTextStyle, styles.errorTextStyle]}>{errors.email}</Text> : ''}

              <AnimatedTextInput 
                label={'Your message'}
                placeholder='Your message'
                onChange={(val) => handleOnChange('message', val)}
                value={state.message}
                inputStyle={styles.textArea}
                multiline={true}
                error={!!errors.message}
                onFocused={() => handleErrors(null, 'message')}
                />

              {errors.message ? <Text style={[defaultStyles.errorTextStyle, styles.errorTextStyle]}>{errors.message}</Text> : ''}

              <TouchableOpacity
                style={{...defaultStyles.buttonStyle, ...styles.buttonStyle}}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                  <Text style={defaultStyles.buttonTextStyle}>SEND MESSAGE</Text>
              </TouchableOpacity>

          </View>
        </View>

      </View>  
    </>
  );
};
 
export default Contact; 
