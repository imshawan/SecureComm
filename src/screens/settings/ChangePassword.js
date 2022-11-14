import React, {useState, useEffect} from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, TextInput, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedTextInput from '../../components/AnimatedTextInput';
import { colors, HEADER_HEIGHT, fontSizes, LABELS, fontFamily, ERRORS, ENDPOINTS } from '../../common';
import { HTTP } from '../../services';
import { notifyUser } from '../../utils';
import { styles as defaultStyles } from '../styles';
import { log } from '../../config';


const { CHANGE_PASSWORD_SCREEN } = LABELS;
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
    formLabel: {
      fontSize: fontSizes.regular, 
      color: colors.black,
      fontFamily: fontFamily.bold,
      lineHeight: fontSizes.regular + 5,
      marginTop: 12,
      marginBottom: 5
    },
    selectTextValue: {
      fontFamily: fontFamily.regular,
    },
    sectionStyle: {
      position: 'relative',
      flexDirection: 'row',
      height: 40,
    },
    inputStyle: {
      flex: 1,
      color: colors.placeholderColor,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 10,
      height: 50,
      fontSize: fontSizes.medium,
      backgroundColor: colors.inputBackground,
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
 
  
  const ChangePassword = ({navigation}) => {
    const [state, setState] = useState({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

  
    const handleOnChange = (field, value) => {
      setState(prevState => ({...prevState, [field]: value}));
    }

    const handleErrors = (errorMessage, field) => {
        setErrors(prevState => ({...prevState, [field]: errorMessage}));
    }
  
    const handleSubmitPress = async () => {
        Keyboard.dismiss();

        let errors = 0;
        if (!state.oldPassword) {
            handleErrors(ERRORS.noPasswordSupplied, 'oldPassword');
            errors++;
        }
        if (!state.newPassword) {
            handleErrors(ERRORS.noNewPassword, 'newPassword');
            errors++;
        }
        if (!state.confirmPassword) {
            handleErrors(ERRORS.noConfirmPassword, 'confirmPassword');
            errors++;
        }
        if (state.newPassword != state.confirmPassword) {
            handleErrors(ERRORS.passwordsDoNotMatch, 'confirmPassword');
            errors++;
        }
        if (errors) return;
        
      log(state)
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
                        <Text style={styles.headerTextStyle}>{CHANGE_PASSWORD_SCREEN.title}</Text>
                    </View>
                </View>
            </View>
            
            <View style={styles.sectionHeadingContainer}>
              <Text style={styles.sectionHeading}>{CHANGE_PASSWORD_SCREEN.header}</Text>
              <Text style={styles.sectionSubHeading}>{CHANGE_PASSWORD_SCREEN.subHeader}</Text>
            </View>
  
            <View style={styles.formContainer}>
              
                <AnimatedTextInput 
                    label={CHANGE_PASSWORD_SCREEN.currentPassword}
                    placeholder={CHANGE_PASSWORD_SCREEN.currentPasswordPlaceholder}
                    onChange={(val) => handleOnChange('oldPassword', val)}
                    value={state.oldPassword}
                    error={!!errors.oldPassword}
                    onFocused={() => {
                        if (errors.oldPassword) handleErrors(null, 'oldPassword');
                    }}
                    />

                {errors.oldPassword ? <Text style={[defaultStyles.errorTextStyle, styles.errorTextStyle]}>{errors.oldPassword}</Text> : ''}

                <AnimatedTextInput 
                    label={CHANGE_PASSWORD_SCREEN.newPassword}
                    placeholder={CHANGE_PASSWORD_SCREEN.newPasswordPlaceholder}
                    onChange={(val) => handleOnChange('newPassword', val)}
                    value={state.newPassword}
                    error={!!errors.newPassword}
                    onFocused={() => {
                        if (errors.newPassword) handleErrors(null, 'newPassword');
                    }}
                    />

                {errors.newPassword ? <Text style={[defaultStyles.errorTextStyle, styles.errorTextStyle]}>{errors.newPassword}</Text> : ''}

                <AnimatedTextInput 
                    label={CHANGE_PASSWORD_SCREEN.confirmPassword}
                    placeholder={CHANGE_PASSWORD_SCREEN.confirmPasswordPlaceholder}
                    onChange={(val) => handleOnChange('confirmPassword', val)}
                    value={state.confirmPassword}
                    error={!!errors.confirmPassword}
                    onFocused={() => {
                        if (errors.confirmPassword) handleErrors(null, 'confirmPassword');
                    }}
                    />

                {errors.confirmPassword ? <Text style={[defaultStyles.errorTextStyle, styles.errorTextStyle]}>{errors.confirmPassword}</Text> : ''}
  
                <TouchableOpacity
                    style={{...defaultStyles.buttonStyle, ...styles.buttonStyle}}
                    activeOpacity={0.5}
                    onPress={handleSubmitPress}>
                    <Text style={defaultStyles.buttonTextStyle}>{CHANGE_PASSWORD_SCREEN.actionBtn}</Text>
                </TouchableOpacity>
  
            </View>
  
          </View>  
      </>
    );
  };
   
  export default ChangePassword; 