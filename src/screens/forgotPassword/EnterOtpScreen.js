import React, {useState, createRef, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  ScrollView,
  Animated,
  Keyboard,
  TouchableOpacity, StyleSheet,
  Dimensions, TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';


import PageHeader from '../../components/PageHeaderComponent';
import { log, showAlert } from '../../config';
import { colors, fontSizes, headerFontSize, ERRORS, PLACEHOLDERS, BASE_ANIMATION_DURATION } from '../../common';
import { showFocusColor, AnimColor, showOriginColor, validateEmail } from '../../utils';
import { styles } from '../styles';
 
// import Loader from './Components/Loader';

const pageStyles = StyleSheet.create({
  headerStyle: {
    position: 'absolute',
    textAlign: 'right',
    fontSize: headerFontSize,
    fontWeight: 'bold',
    marginLeft: -10,
    marginTop: (Dimensions.get('window').height / 2.7),
    color: colors.white
  },
  headerContainer: {
    backgroundColor: colors.white,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    marginTop: -(Dimensions.get('window').width / 2),
    marginLeft: -(Dimensions.get('window').width / 3.2),
  },
});


const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const [interpolatedColor1, interpolatedColor2, interpolatedColor3] = [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)];
 
const EnterOtpScreen = ({navigation, route}) => {
  if (route.params && !route.params.email) {
    navigation.navigate('EnterOtpScreen');
  }

  const [display, setDisplay] = useState('flex');
  const [justifyContent, setJustifyContent] = useState(false);
  const [errors, setErrors] = useState({ });
  const [userInput, setUserInput] = useState({
    otp: '',
    password: '',
    confirmPassword: '',
    email: route.params.email
  })
 
  const passwordInputRef = createRef();

 
  const handleSubmitPress = () => {
    Keyboard.dismiss();
    let errors = 0;

    if (!userInput.otp) {
      handleErrors(ERRORS.noOtpSupplied, 'otp');
      errors++;
    }
    if (!userInput.password) {
      handleErrors(ERRORS.noPasswordSupplied, 'password');
      errors++;
    }
    if (!userInput.confirmPassword) {
      handleErrors(ERRORS.noConfirmPassword, 'confirmPassword');
      errors++;
    }
    if (userInput.password != userInput.confirmPassword) {
      handleErrors(ERRORS.passwordsNoMatch, 'confirmPassword');
      handleErrors(ERRORS.passwordsNoMatch, 'password');
      errors++;
    }

    if (errors) return;
    log(userInput)
  };

  const handleOnChange = (value, field) => {
    setUserInput(prevState => ({...prevState, [field]: value}));
  }

  const handleErrors = (errorMessage, field) => {
    setErrors(prevState => ({...prevState, [field]: errorMessage}));
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setDisplay('none');
        setJustifyContent(true)
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setDisplay('flex');
        setJustifyContent(false)
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [])
 
  return (
    <View style={styles.mainBody}>
      
      {display === 'flex' ? <PageHeader name={'Reset'} /> : <></>}

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: justifyContent ? 'center' :'flex-start',
          alignContent: 'center',
          paddingTop: justifyContent ? 0 : 50
        }}>
            
            <View>
            
                <Text style={styles.headTextStyle}>Enter the Authorization Code</Text>
                <Text style={{...styles.subTextStyle, fontSize: fontSizes.medium, marginBottom: 10}}>Sent to {userInput.email}</Text>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <AnimatedTextInput
                            style={{...styles.inputStyle, borderColor: errors.otp ? colors.red : AnimColor(interpolatedColor1, 'transparent')}}
                            onChangeText={(OTP) => handleOnChange(OTP, "otp")}
                            onFocus={() => {
                              showFocusColor(interpolatedColor1);
                              handleErrors(null, 'otp');
                            }}
                            onBlur={() => showOriginColor(interpolatedColor1)}
                            placeholder={PLACEHOLDERS.enterCode}
                            placeholderTextColor={errors.otp ? colors.red : AnimColor(interpolatedColor1, colors.placeholderColor)}
                            autoCapitalize="none"
                            keyboardType="numeric"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                        />
                    </View>

                    {errors.otp ? <Text style={styles.errorTextStyle}>{errors.otp}</Text> : ''}

                    <Text
                    style={styles.forgotPasswordTextStyle}
                    onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    Re-send OTP
                    </Text>

                    <View style={styles.SectionStyle}>
                        <AnimatedTextInput
                            style={{...styles.inputStyle, borderColor: errors.password ? colors.red : AnimColor(interpolatedColor2, 'transparent')}}
                            onChangeText={(UserPassword) => handleOnChange(UserPassword, "password")}
                            onFocus={() => {
                              showFocusColor(interpolatedColor2);
                              handleErrors(null, 'password');
                            }}
                            onBlur={() => showOriginColor(interpolatedColor2)}
                            placeholder={PLACEHOLDERS.createPassword}
                            placeholderTextColor={errors.password ? colors.red : AnimColor(interpolatedColor2, colors.placeholderColor)}
                            keyboardType="default"
                            ref={passwordInputRef}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                        />
                    </View>

                    {errors.password ? <Text style={styles.errorTextStyle}>{errors.password}</Text> : ''}

                    <View style={{...styles.SectionStyle}}>
                        <AnimatedTextInput
                            style={{...styles.inputStyle, 
                              borderColor: errors.confirmPassword ? colors.red : AnimColor(interpolatedColor3, 'transparent'),
                            }}
                            onChangeText={(UserPassword) => handleOnChange(UserPassword, "confirmPassword")}
                            onFocus={() => {
                              showFocusColor(interpolatedColor3);
                              handleErrors(null, 'confirmPassword');
                            }}
                            onBlur={() => showOriginColor(interpolatedColor3)}
                            placeholder={PLACEHOLDERS.confirmPassword}
                            placeholderTextColor={errors.confirmPassword ? colors.red : AnimColor(interpolatedColor3, colors.placeholderColor)}
                            keyboardType="default"
                            ref={passwordInputRef}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                        />
                    </View>

                    {errors.confirmPassword ? <Text style={styles.errorTextStyle}>{errors.confirmPassword}</Text> : ''}

                    <TouchableOpacity
                    style={{...styles.buttonStyle}}
                    activeOpacity={0.5}
                    onPress={handleSubmitPress}>
                        <Text style={styles.buttonTextStyle}>CHANGE PASSWORD</Text>
                    </TouchableOpacity>
                
                </KeyboardAvoidingView>
            </View>
      </ScrollView>
    </View>
  );
};

export default EnterOtpScreen;