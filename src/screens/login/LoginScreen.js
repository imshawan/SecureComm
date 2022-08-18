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
    marginLeft: -10,
    marginTop: (Dimensions.get('window').height / 2.7),
    color: '#fff'
  },
  subTextStyle: {
    textAlign: 'left',
    fontSize: fontSizes.regular,
    marginTop: 50,
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

const showOriginColor = (interpolatedColor) => {
  Animated.timing(interpolatedColor, {
    duration: 350,
    toValue: 0,
    useNativeDriver: false,
  }).start();
};

const showFocusColor = (interpolatedColor) => {
  Animated.timing(interpolatedColor, {
    duration: 450,
    toValue: 1,
    useNativeDriver: false,
  }).start();
};

const AnimColor = (interpolatedColor, defaultColor) => interpolatedColor.interpolate({
  inputRange: [0, 1],
  outputRange: [defaultColor, colors.brandColor],
});

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const interpolatedColor1 = new Animated.Value(0);
const interpolatedColor2 = new Animated.Value(0);
 
const LoginScreen = ({navigation}) => {
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
                 
                    <TouchableOpacity style={{
                      fontWeight: 'bold',
                      marginLeft: -10,
                      marginTop: (Dimensions.get('window').height / 3.2),
                      color: '#fff'
                    }}>
                      <Text style={{color: '#fff', fontSize: fontSizes.regular}}>
                        <Icon name="arrow-left" size={fontSizes.regular} /> &nbsp; Back
                      </Text>
                    </TouchableOpacity>
                  
                  <Text style={styles.headerStyle}>Log in</Text>

                </View>
            </TouchableHighlight>
                <Text style={styles.subTextStyle}>We're happy to see you back, please login to continue.</Text>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <AnimatedTextInput
                            style={{...styles.inputStyle, borderColor: AnimColor(interpolatedColor1, 'transparent')}}
                            onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                            onFocus={() => showFocusColor(interpolatedColor1)}
                            onBlur={() => showOriginColor(interpolatedColor1)}
                            placeholder="Enter Email"
                            placeholderTextColor={AnimColor(interpolatedColor1, colors.placeholderColor)}
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
                            style={{...styles.inputStyle, borderColor: AnimColor(interpolatedColor2, 'transparent')}}
                            onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                            onFocus={() => showFocusColor(interpolatedColor2)}
                            onBlur={() => showOriginColor(interpolatedColor2)}
                            placeholder="Enter Password" //12345
                            placeholderTextColor={AnimColor(interpolatedColor2, colors.placeholderColor)}
                            keyboardType="default"
                            ref={passwordInputRef}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            secureTextEntry={true}
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                        />
                    </View>

                    <Text
                    style={styles.forgotPasswordTextStyle}
                    onPress={() => navigation.navigate('RegisterScreen')}>
                    Forgot password?
                    </Text>

                    {errortext != '' ? (
                    <Text style={styles.errorTextStyle}>
                        {errortext}
                    </Text>
                    ) : null}

                    <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={handleSubmitPress}>
                        <Text style={styles.buttonTextStyle}>LOGIN</Text>
                    </TouchableOpacity>
                    
                    <Text
                    style={styles.registerTextStyle}
                    onPress={() => navigation.navigate('RegisterScreen')}>
                    New Here? Please register!
                    </Text>
                </KeyboardAvoidingView>
            </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;