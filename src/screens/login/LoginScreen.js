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
  KeyboardAvoidingView, Platform
} from 'react-native';
 
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import { log, showAlert } from '../../config';
import { colors, fontSizes, headerFontSize, ERRORS } from '../../common';
import { showFocusColor, AnimColor, showOriginColor, validateEmail } from '../../utils';
import { styles } from '../styles';
 
// import Loader from './Components/Loader';

const pageStyles = StyleSheet.create({
  headerStyle: {
    position: 'absolute',
    textAlign: 'right',
    fontSize: headerFontSize,
    fontFamily: 'SF-Pro-Rounded-Bold',
    lineHeight: headerFontSize + 5,
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
    // flexDirection: 'row',
  },
});


const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const interpolatedColor1 = new Animated.Value(0);
const interpolatedColor2 = new Animated.Value(0);
 
const LoginScreen = ({navigation}) => {
  const [display, setDisplay] = useState('flex');
  const [justifyContent, setJustifyContent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ });
  const [errorStyles, setErrorStyles] = useState({ });
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  })
 
  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    Keyboard.dismiss();

    if (!userInput.email) {
      handleErrors(ERRORS.noEmailSupplied, 'email');
    }
    if (!userInput.password) {
      handleErrors(ERRORS.noPasswordSupplied, 'password')
    }

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
      <View style={{...pageStyles.headerContainer, display }}>
        <TouchableHighlight
              style = {{
                borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').width,
                backgroundColor: colors.brandColor,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
              }}>
                <View style={styles.backNav}>
                 
                    <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={{
                      fontWeight: 'bold',
                      marginLeft: -10,
                      marginTop: (Dimensions.get('window').height / 3.2),
                      color: colors.white
                    }}>
                      <Text style={{color: colors.white, fontSize: fontSizes.regular}}>
                        <Icon name="arrow-left" size={fontSizes.regular} /> &nbsp; Back
                      </Text>
                    </TouchableOpacity>
                  
                  <Text style={pageStyles.headerStyle}>Log in</Text>

                </View>
        </TouchableHighlight>
      </View>
      <ScrollView
        
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: justifyContent ? 'center' :'flex-start',
          paddingTop: justifyContent ? 0 : Dimensions.get('window').height / 10,
          alignContent: 'center',
        }}>
            
            <View>
                <Text style={styles.headTextStyle}>We're happy to see you back</Text>
                <Text style={styles.subTextStyle}>Please login to continue.</Text>
                <KeyboardAvoidingView enabled={false} keyboardVerticalOffset={0} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View style={styles.SectionStyle}>
                        <AnimatedTextInput
                            style={{...styles.inputStyle,
                              borderColor: errors.email ? colors.red : AnimColor(interpolatedColor1, 'transparent')}}
                            onChangeText={(UserEmail) => handleOnChange(UserEmail, "email")}
                            onFocus={() => {
                              showFocusColor(interpolatedColor1); 
                              handleErrors(null, 'email'); 
                              
                            }}
                            onBlur={() => {
                              showOriginColor(interpolatedColor1); 
                              
                            }}
                            placeholder="Enter Email"
                            placeholderTextColor={errors.email ? colors.red : AnimColor(interpolatedColor1, colors.placeholderColor)}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                        />
                    </View>
                        {errors.email ? <Text style={styles.errorTextStyle}>{errors.email}</Text> : ''}
                    <View style={styles.SectionStyle}>
                        <AnimatedTextInput
                            style={{...styles.inputStyle,
                              borderColor: errors.password ? colors.red : AnimColor(interpolatedColor2, 'transparent'), 
                              ...errorStyles}}
                            onChangeText={(UserPassword) => handleOnChange(UserPassword, "password")}
                            onFocus={() => {
                              showFocusColor(interpolatedColor2); 
                              handleErrors(null, 'password'); 
                              
                            }}
                            onBlur={() => {
                              showOriginColor(interpolatedColor2); 
                              
                            }}
                            placeholder="Enter Password" //12345
                            placeholderTextColor={errors.password ? colors.red : AnimColor(interpolatedColor2, colors.placeholderColor)}
                            keyboardType="default"
                            ref={passwordInputRef}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            secureTextEntry={!showPassword}
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                        >
                        </AnimatedTextInput>
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconContainerStyle}>
                          <Icon name={showPassword ? "eye-slash" : "eye"} size={fontSizes.regular} style={styles.iconStyle} />
                        </TouchableOpacity>
                    </View>
                    {errors.password ? <Text style={styles.errorTextStyle}>{errors.password}</Text> : ''}

                    <Text style={styles.forgotPasswordTextStyle} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    Forgot password?
                    </Text>

                    <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={handleSubmitPress}>
                        <Text style={styles.buttonTextStyle}>LOGIN</Text>
                    </TouchableOpacity>
                    
                    <Text
                    style={styles.registerTextStyle}
                    onPress={() => navigation.navigate('SignupScreen')}>
                    New Here? Please register!
                    </Text>
                </KeyboardAvoidingView>
            </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;