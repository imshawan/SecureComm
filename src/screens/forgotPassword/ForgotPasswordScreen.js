import React, {useState, useEffect, createRef} from 'react';
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
 
import AsyncStorage from '@react-native-community/async-storage';
import PageHeader from '../../components/PageHeaderComponent';

import { log, showAlert } from '../../config';
import { colors, fontSizes, headerFontSize, ERRORS, PLACEHOLDERS } from '../../common';
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
    // flexDirection: 'row',
  },
});


const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const interpolatedColor = new Animated.Value(0);
 
const ForgotPasswordScreen = ({navigation}) => {
  const [display, setDisplay] = useState('flex');
  const [justifyContent, setJustifyContent] = useState(false);
  const [errors, setErrors] = useState({ });
  const [userInput, setUserInput] = useState({
    email: '',
  })
 
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
    if (errors) return;

    navigation.navigate('EnterOtpScreen', {
      email: userInput.email
    })
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
          paddingTop: justifyContent ? 0 : 100,
        }}>
            
            <View>
            
                <Text style={styles.headTextStyle}>No worries, we got you covered</Text>
                <Text style={styles.subTextStyle}>Please enter the email associated with your account.</Text>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <AnimatedTextInput
                            style={{...styles.inputStyle, 
                              borderColor: errors.email ? colors.red : AnimColor(interpolatedColor, 'transparent')
                            }}
                            onChangeText={(UserEmail) => handleOnChange(UserEmail, "email")}
                            onFocus={() => {
                              showFocusColor(interpolatedColor);
                              handleErrors(null, 'email');
                            }}
                            // value={userInput.email}
                            onBlur={() => showOriginColor(interpolatedColor)}
                            placeholder={PLACEHOLDERS.enterEmail}
                            placeholderTextColor={errors.email ? colors.red : AnimColor(interpolatedColor, colors.placeholderColor)}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                        />
                    </View>

                    {errors.email ? <Text style={styles.errorTextStyle}>{errors.email}</Text> : ''}

                    <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={handleSubmitPress}>
                        <Text style={styles.buttonTextStyle}>SEND OTP</Text>
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
export default ForgotPasswordScreen;