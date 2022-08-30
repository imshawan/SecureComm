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
import TopNavigation from '../../components/TopNavigation';

import { log, showAlert } from '../../config';
import { colors, fontSizes, headerFontSize } from '../../common';
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
  const [userEmail, setUserEmail] = useState('');
  const [errortext, setErrortext] = useState('');
 
  const passwordInputRef = createRef();

 
  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      showAlert('Please fill Email');
      return;
    }
    navigation.navigate('EnterOtpScreen', {
        userEmail
    })
  };

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
      <TopNavigation name={'Reset'} customStyles={{display}} />
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
                <View style={styles.backNav}>
                 
                    

                </View>
          </TouchableHighlight>
      </View>
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
                            style={{...styles.inputStyle, borderColor: AnimColor(interpolatedColor, 'transparent')}}
                            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                            onFocus={() => showFocusColor(interpolatedColor)}
                            onBlur={() => showOriginColor(interpolatedColor)}
                            placeholder="Enter Email"
                            placeholderTextColor={AnimColor(interpolatedColor, colors.placeholderColor)}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                        />
                    </View>

                    {errortext != '' ? (
                    <Text style={styles.errorTextStyle}>
                        {errortext}
                    </Text>
                    ) : null}

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