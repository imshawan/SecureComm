import React, {useState, createRef, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  ScrollView,
  Animated,
  Keyboard, StatusBar, ToastAndroid,
  TouchableOpacity, StyleSheet,
  Dimensions, TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
 
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import TopNavigation from '../../components/TopNavigation';
import Loader from '../../components/Loader';

import { log, showAlert } from '../../config';
import { colors, ENDPOINTS, APP_NAME, ERRORS, PLACEHOLDERS } from '../../common';
import { showFocusColor, AnimColor, showOriginColor, validateEmail } from '../../utils';
import { HTTP } from '../../services';
import { styles } from '../styles';
 
// import Loader from './Components/Loader';

const pageStyles = StyleSheet.create({
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
 
const SignupScreen = ({navigation}) => {
  const [display, setDisplay] = useState('flex');
  const [justifyContent, setJustifyContent] = useState(false);
  const [errors, setErrors] = useState({ });
  const [userInput, setUserInput] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
 
  const passwordInputRef = createRef();

 
  const handleSubmitPress = () => {
    Keyboard.dismiss();
    let errors = 0;

    if (!userInput.email) {
      handleErrors(ERRORS.noEmailSupplied, 'email');
      errors++;
    }
    if (!validateEmail(userInput.email)) {
      handleErrors(ERRORS.invalidEmail, 'email');
      errors++;
    }
    if (!userInput.username) {
      handleErrors(ERRORS.noUsernameSupplied, 'username');
      errors++;
    }
    if (!userInput.password) {
      handleErrors(ERRORS.noPasswordSupplied, 'password');
      errors++;
    }

    if (errors) return;
    processRegisteration();
  };

  const processRegisteration = async () => {
    setLoading(true);
    try {
      let { payload } = await HTTP.post(ENDPOINTS.register, userInput);
      if (payload) {
        setLoading(false);
        navigation.navigate('LoginScreen', { message: payload.message });
      }
    } catch (err) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(err.status ? err.status.message : err, Snackbar.LENGTH_SHORT);
      } else {
        Snackbar.show({
          text: err.status ? err.status.message : err,
          duration: Snackbar.LENGTH_SHORT,
          textColor: colors.white,
          backgroundColor: colors.black,
        });
      }
    }
    setLoading(false);
  }

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
          setJustifyContent(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [])
 
  return (
    <>
    <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
    <View style={styles.mainBody}>
      {loading ? <Loader animating={loading} color={colors.white} /> : ''}
      <TopNavigation name={'Sign up'} customStyles={{display}} />

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
              }}
            >
                <View />
          </TouchableHighlight>
      </View>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: justifyContent ? 'center' :'flex-start',
          alignContent: 'center',
          paddingTop: justifyContent ? 0 : 50,
        }}>
            
            <View>
                <Text style={styles.headTextStyle}>New to {APP_NAME}?</Text>
                <Text style={styles.subTextStyle}>Please create an account and continue.</Text>
                <KeyboardAvoidingView enabled>

                    <View style={styles.SectionStyle}>
                        <AnimatedTextInput
                            style={{...styles.inputStyle, borderColor: errors.username ? colors.red : AnimColor(interpolatedColor1, 'transparent')}}
                            onChangeText={(username) => handleOnChange(username, "username")}
                            onFocus={() => {
                              showFocusColor(interpolatedColor1);
                              handleErrors(null, 'username');
                            }}
                            onBlur={() => {
                              showOriginColor(interpolatedColor1);
                            }}
                            placeholder={PLACEHOLDERS.createUsername}
                            placeholderTextColor={errors.username ? colors.red : AnimColor(interpolatedColor1, colors.placeholderColor)}
                            keyboardType="default"
                            autoCapitalize="none"
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                        />
                    </View>

                    {errors.username ? <Text style={styles.errorTextStyle}>{errors.username}</Text> : ''}

                    <View style={styles.SectionStyle}>
                        <AnimatedTextInput
                            style={{...styles.inputStyle, borderColor: errors.email ? colors.red : AnimColor(interpolatedColor2, 'transparent')}}
                            onChangeText={(UserEmail) => handleOnChange(UserEmail, "email")}
                            onFocus={() => {
                              showFocusColor(interpolatedColor2);
                              handleErrors(null, 'email');
                            }}
                            onBlur={() => showOriginColor(interpolatedColor2)}
                            placeholder={PLACEHOLDERS.enterEmail}
                            placeholderTextColor={errors.email ? colors.red : AnimColor(interpolatedColor2, colors.placeholderColor)}
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
                            style={{...styles.inputStyle, borderColor: errors.password ? colors.red : AnimColor(interpolatedColor3, 'transparent')}}
                            onChangeText={(UserPassword) => handleOnChange(UserPassword, "password")}
                            onFocus={() => {
                              showFocusColor(interpolatedColor3);
                              handleErrors(null, 'password');
                            }}
                            onBlur={() => showOriginColor(interpolatedColor3)}
                            placeholder={PLACEHOLDERS.createPassword}
                            placeholderTextColor={errors.password ? colors.red : AnimColor(interpolatedColor3, colors.placeholderColor)}
                            keyboardType="default"
                            ref={passwordInputRef}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                        />
                    </View>

                    {errors.password ? <Text style={styles.errorTextStyle}>{errors.password}</Text> : ''}

                    <TouchableOpacity
                      style={styles.buttonStyle}
                      activeOpacity={0.5}
                      onPress={handleSubmitPress}>
                        <Text style={styles.buttonTextStyle}>CREATE ACCOUNT</Text>
                    </TouchableOpacity>
                    
                    <Text
                    style={styles.registerTextStyle}
                    onPress={() => navigation.navigate('LoginScreen')}>
                    Already registered? Please log in!
                    </Text>
                </KeyboardAvoidingView>
            </View>
      </ScrollView>
    </View>
    </>
  );
};
export default SignupScreen;