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
 
import AsyncStorage from '@react-native-community/async-storage';
import TopNavigation from '../../components/TopNavigation';

import { log, showAlert } from '../../config';
import { colors, fontSizes, headerFontSize, APP_NAME } from '../../common';
import { showFocusColor, AnimColor, showOriginColor } from '../../utils';
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
  const [userFullName, setUserFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
 
  const passwordInputRef = createRef();

 
  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      showAlert('Please fill Email');
      return;
    }
    if (!userPassword) {
      showAlert('Please fill Password');
      return;
    }
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
          setJustifyContent(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [])
 
  return (
    <View style={styles.mainBody}>

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
                            style={{...styles.inputStyle, borderColor: AnimColor(interpolatedColor1, 'transparent')}}
                            onChangeText={(UserFullName) => setUserFullName(UserFullName)}
                            onFocus={() => showFocusColor(interpolatedColor1)}
                            onBlur={() => showOriginColor(interpolatedColor1)}
                            placeholder="Full name" //12345
                            placeholderTextColor={AnimColor(interpolatedColor1, colors.placeholderColor)}
                            keyboardType="default"
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                        />
                    </View>

                    <View style={styles.SectionStyle}>
                        <AnimatedTextInput
                            style={{...styles.inputStyle, borderColor: AnimColor(interpolatedColor2, 'transparent')}}
                            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                            onFocus={() => showFocusColor(interpolatedColor2)}
                            onBlur={() => showOriginColor(interpolatedColor2)}
                            placeholder="Email address"
                            placeholderTextColor={AnimColor(interpolatedColor2, colors.placeholderColor)}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <AnimatedTextInput
                            style={{...styles.inputStyle, borderColor: AnimColor(interpolatedColor3, 'transparent')}}
                            onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                            onFocus={() => showFocusColor(interpolatedColor3)}
                            onBlur={() => showOriginColor(interpolatedColor3)}
                            placeholder="Create Password" //12345
                            placeholderTextColor={AnimColor(interpolatedColor3, colors.placeholderColor)}
                            keyboardType="default"
                            ref={passwordInputRef}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            secureTextEntry={true}
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
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
  );
};
export default SignupScreen;