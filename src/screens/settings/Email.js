import React, {useState, useEffect} from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import AnimatedTextInput from '../../components/AnimatedTextInput';

import { colors, HEADER_HEIGHT, fontSizes, LABELS, fontFamily, ERRORS, ENDPOINTS } from '../../common';
import { styles as defaultStyles } from '../styles';
import { HTTP } from '../../services';
import { log } from '../../config';
import { notifyUser, validateEmail } from '../../utils';

const { EMAIL_SCREEN } = LABELS;
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
  buttonStyle: {
    marginTop: 40,
    marginLeft: 0,
    marginRight: 0,
  },
  errorTextStyle: { 
    marginLeft: 10, 
    marginTop: 5
  },
});
 

const VerifyCodeSection = ({newEmail, visible, currentEmail}) => {
    if (!visible) return;

    const [state, setState] = useState({
        currentEmail,
        newEmail,
        oldEmailCode: '',
        newEmailcode: '',
    });

    const [errors, setErrors] = useState({
        oldEmailCode: '',
        newEmailcode: '',
    });

    const handleOnChange = (field, value) => {
        setState(prevState => ({...prevState, [field]: value}));
    }

    const handleErrors = (errorMessage, field) => {
        setErrors(prevState => ({...prevState, [field]: errorMessage}));
    }

    const handleSubmitPress = () => {
        Keyboard.dismiss();

        let errors = 0;
        if (!state.oldPassword) {
            handleErrors(ERRORS.noOtpSupplied, 'oldEmailCode');
            errors++;
        }
        if (!state.newEmailcode) {
            handleErrors(ERRORS.noOtpSupplied, 'oldEmailCode');
            errors++;
        }

        if (state.newEmailcode.length < 6) {
            handleErrors(ERRORS.invalidOtp, 'newEmailcode');
            errors++;
        }

        if (state.oldEmailCode.length < 6) {
            handleErrors(ERRORS.invalidOtp, 'oldEmailCode');
            errors++;
        }

        if (errors) return;

        log(state)
    }

    return (
        <View style={{width: '100%'}}>
            <AnimatedTextInput 
                label={EMAIL_SCREEN.codeSent + newEmail}
                placeholder={EMAIL_SCREEN.enterCode}
                onChange={(val) => handleOnChange('newEmailcode', val)}
                value={state.newEmailcode}
                error={!!errors.newEmailcode}
                onFocused={() => {
                        if (errors.newEmailcode) handleErrors(null, 'newEmailcode');
                    }}
            />

            {errors.newEmailcode ? <Text style={[defaultStyles.errorTextStyle, styles.errorTextStyle]}>{errors.newEmailcode}</Text> : ''}

            <AnimatedTextInput 
                label={EMAIL_SCREEN.codeSent + currentEmail}
                placeholder={EMAIL_SCREEN.enterCode}
                onChange={(val) => handleOnChange('oldEmailCode', val)}
                value={state.oldEmailCode}
                error={!!errors.oldEmailCode}
                onFocused={() => {
                        if (errors.oldEmailCode) handleErrors(null, 'oldEmailCode');
                    }}
            />

            {errors.oldEmailCode ? <Text style={[defaultStyles.errorTextStyle, styles.errorTextStyle]}>{errors.oldEmailCode}</Text> : ''}

            <TouchableOpacity
                style={[defaultStyles.buttonStyle, styles.buttonStyle]}
                activeOpacity={0.5}
                onPress={handleSubmitPress}>
                <Text style={defaultStyles.buttonTextStyle}>CHANGE</Text>
            </TouchableOpacity>
        </View>
    );
}

const EmailInputSection = ({value, setValue, onSubmit, visible, error, onFocused}) => {
    if (!visible) return;
    
    const handleOnChange = (field, val) => {
        setValue(prevState => ({...prevState, [field]: val}));
    }

    return (
        <View>
            <AnimatedTextInput
                label={EMAIL_SCREEN.enterEmail}
                placeholder={EMAIL_SCREEN.enterEmailSubtext}
                onChange={(val) => handleOnChange('email', val)}
                value={value}
                error={!!error}
                onFocused={onFocused}
            />
            {error ? <Text style={[defaultStyles.errorTextStyle, styles.errorTextStyle]}>{error}</Text> : ''}
            <TouchableOpacity
                style={[defaultStyles.buttonStyle, styles.buttonStyle]}
                activeOpacity={0.5}
                onPress={onSubmit}>
                <Text style={defaultStyles.buttonTextStyle}>VERIFY</Text>
            </TouchableOpacity>
        </View>
    );
}

const Email = ({navigation}) => {
  const currentUser = useSelector(state => state.user.currentUser);
  const [state, setState] = useState({
    codeSent: false,
    email: '',
    currentEmail: currentUser.email,
  });
  const [errors, setErrors] = useState({
    email: '',
  });


  const handleOnChange = (field, val) => {
    setState(prevState => ({...prevState, [field]: val}));
  }

  const handleErrors = (errorMessage, field) => {
    setErrors(prevState => ({...prevState, [field]: errorMessage}));
  }

  const handleSubmitPress = () => {
    Keyboard.dismiss();

    let errors = 0;
    if (!state.email) {
        handleErrors(ERRORS.noEmail, 'email');
        errors++;
    }

    if (!validateEmail(state.email)) {
        handleErrors(ERRORS.invalidEmail, 'email');
        errors++;
    }

    if (errors) return;

    handleOnChange('codeSent', true);
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
                      <Text style={styles.headerTextStyle}>{EMAIL_SCREEN.title}</Text>
                  </View>
              </View>
          </View>
          
          <View style={styles.sectionHeadingContainer}>
            <Text style={styles.sectionHeading}>{EMAIL_SCREEN.header}</Text>
            <Text style={styles.sectionSubHeading}>{EMAIL_SCREEN.subHeader}</Text>
          </View>

          <View style={styles.formContainer}>

            <EmailInputSection 
                value={state.email}
                setValue={setState}
                onSubmit={handleSubmitPress}
                visible={!state.codeSent}
                error={errors.email}
                onFocused={() => {
                        if (errors.email) handleErrors(null, 'email');
                    }}
            />

            <VerifyCodeSection 
                visible={state.codeSent}
                newEmail={state.email}
                currentEmail={state.currentEmail}
            />
            
          </View>

        </View>  
    </>
  );
};
 
export default Email; 