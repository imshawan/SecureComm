import React, {useState, createRef, useEffect} from 'react';
import {
  TextInput,
  View,
  Text,
  ScrollView,
  Animated, ToastAndroid,
  Keyboard, StatusBar,
  TouchableOpacity, StyleSheet,
  Dimensions, TouchableHighlight,
  KeyboardAvoidingView, Platform
} from 'react-native';
 
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import TopNavigation from '../../components/TopNavigation';
import Loader from '../../components/Loader';

import { log, showAlert } from '../../config';
import { colors, fontSizes, ENDPOINTS, ERRORS, PLACEHOLDERS } from '../../common';
import { showFocusColor, AnimColor, showOriginColor } from '../../utils';
import { styles } from '../styles';
import { HTTP, setAuthToken } from '../../services';
 
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
const interpolatedColor1 = new Animated.Value(0);
const interpolatedColor2 = new Animated.Value(0);
 
const LoginScreen = ({navigation}) => {
  const [display, setDisplay] = useState('flex');
  const [justifyContent, setJustifyContent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ });
  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
 
  const passwordInputRef = createRef();

  const handleSubmitPress = async () => {
    Keyboard.dismiss();

    let errors = 0;
    if (!userInput.username) {
      handleErrors(ERRORS.noUsernameOrEmailSupplied, 'username');
      errors++;
    }
    if (!userInput.password) {
      handleErrors(ERRORS.noPasswordSupplied, 'password');
      errors++;
    }
    if (errors) return;

    processLogin();
  };

  const processLogin = async () => {
    setLoading(true);
    try {
      let { payload } = await HTTP.post(ENDPOINTS.logIn, userInput);
      if (payload) {
        await AsyncStorage.setItem('authToken', payload.token);
        await AsyncStorage.setItem('user', JSON.stringify(payload.user));
      }
      setAuthToken(payload.token);
      navigation.navigate('Home');
    } catch (err) {
      if (Platform.OS === 'android') {
        ToastAndroid.show(err, Snackbar.LENGTH_SHORT);
      } else {
        Snackbar.show({
          text: err,
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
        setJustifyContent(false)
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [])
 
  return (<>
    <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
    <View style={styles.mainBody}>
      {loading ? <Loader animating={loading} color={colors.white} /> : ''}
      <TopNavigation name={'Log in'} customStyles={{display}} />
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
                <View />
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
                              borderColor: errors.username ? colors.red : AnimColor(interpolatedColor1, 'transparent')}}
                            onChangeText={(Userusername) => handleOnChange(Userusername, "username")}
                            onFocus={() => {
                              showFocusColor(interpolatedColor1); 
                              handleErrors(null, 'username'); 
                              
                            }}
                            onBlur={() => {
                              showOriginColor(interpolatedColor1); 
                              
                            }}
                            placeholder={PLACEHOLDERS.userNameOrEmail}
                            placeholderTextColor={errors.username ? colors.red : AnimColor(interpolatedColor1, colors.placeholderColor)}
                            autoCapitalize="none"
                            keyboardType="default"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                        />
                    </View>
                        {errors.username ? <Text style={styles.errorTextStyle}>{errors.username}</Text> : ''}
                    <View style={styles.SectionStyle}>
                        <AnimatedTextInput
                            style={{...styles.inputStyle,
                              borderColor: errors.password ? colors.red : AnimColor(interpolatedColor2, 'transparent')
                            }}
                            onChangeText={(UserPassword) => handleOnChange(UserPassword, "password")}
                            onFocus={() => {
                              showFocusColor(interpolatedColor2); 
                              handleErrors(null, 'password'); 
                              
                            }}
                            onBlur={() => {
                              showOriginColor(interpolatedColor2); 
                              
                            }}
                            placeholder={PLACEHOLDERS.enterPassword}
                            placeholderTextColor={errors.password ? colors.red : AnimColor(interpolatedColor2, colors.placeholderColor)}
                            keyboardType="default"
                            autoCapitalize="none"
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
                    disabled={loading}
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
    </>
  );
};
export default LoginScreen;