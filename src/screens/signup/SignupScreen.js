import React, {useState, createRef} from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';

import { log, showAlert } from '../../config';
import { colors, fontSizes, headerFontSize } from '../../common';
import { showFocusColor, AnimColor, showOriginColor } from '../../utils';
 
// import Loader from './Components/Loader';

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignContent: 'center',
  },
  backNav: {
    flexDirection: 'row',
    flex: 1,
  },
  headerStyle: {
    position: 'absolute',
    textAlign: 'right',
    fontSize: headerFontSize,
    fontWeight: 'bold',
    marginLeft: -12,
    marginTop: (Dimensions.get('window').height / 2.7),
    color: '#fff'
  },
  subTextStyle: {
    textAlign: 'left',
    fontSize: fontSizes.regular,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 35,
    marginRight: 35,
    color: '#000'
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: colors.brandColor,
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: colors.borderColor,
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 15,
    elevation: 5,
    shadowRadius: 8,
    shadowOpacity: 0.6,
    shadowColor: colors.brandColor,
    shadowOffset: {
      width: 0,
      height: 13,
    },
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 13,
    fontSize: fontSizes.regular,
  },
  inputStyle: {
    flex: 1,
    color: colors.placeholderColor,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    borderColor: colors.borderColor,
    fontSize: fontSizes.medium,
    backgroundColor: '#eceef5'
  },
  forgotPasswordTextStyle: {
      color: colors.brandColor,
      textAlign: 'right',
      fontWeight: 'bold',
      fontSize: fontSizes.medium,
      padding: 10,
      paddingBottom: 0,
      marginRight: 35,
  },
  registerTextStyle: {
    color: colors.brandColor,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: fontSizes.medium,
    alignSelf: 'center',
    padding: 10,
    paddingTop: 0,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: fontSizes.medium,
  },
});

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const [interpolatedColor1, interpolatedColor2, interpolatedColor3] = [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)];
 
const SignupScreen = ({navigation}) => {
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
 
  return (
    <View style={styles.mainBody}>
      {/* <Loader loading={loading} /> */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
            
            <View>
            <TouchableHighlight
              style = {{
                borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').width,
                backgroundColor: colors.brandColor,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                marginTop: -(Dimensions.get('window').width / 0.98),
                marginLeft: -(Dimensions.get('window').width / 3.2)
              }}
            >
                <View style={styles.backNav}>
                 
                    <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={{
                      fontWeight: 'bold',
                      marginLeft: -12,
                      marginTop: (Dimensions.get('window').height / 3.2),
                      color: '#fff',
                    }}>
                      <Text style={{color: '#fff', fontSize: fontSizes.regular}}>
                        <Icon name="arrow-left" size={fontSizes.regular} /> &nbsp; Back
                      </Text>
                    </TouchableOpacity>
                  
                  <Text style={styles.headerStyle}>Sign up</Text>

                </View>
            </TouchableHighlight>
                <Text style={styles.subTextStyle}>New here? Please create an account and continue.</Text>
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