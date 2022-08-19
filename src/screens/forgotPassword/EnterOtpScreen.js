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
    color: '#fff'
  },
});


const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const [interpolatedColor1, interpolatedColor2, interpolatedColor3] = [new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)];
 
const EnterOtpScreen = ({navigation, route}) => {
  if (route.params && !route.params.userEmail) {
    navigation.navigate('EnterOtpScreen');
  }

  const [otp, setOTP] = useState('');
  const [userEmail, setUSerEmail] = useState(route.params.userEmail);
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
 
  const passwordInputRef = createRef();


 
  const handleSubmitPress = () => {
    setErrortext('');
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
                marginTop: -(Dimensions.get('window').width / 1.03),
                marginLeft: -(Dimensions.get('window').width / 3.2)
              }}
            >
                <View style={styles.backNav}>
                 
                    <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={{
                      fontWeight: 'bold',
                      marginLeft: -10,
                      marginTop: (Dimensions.get('window').height / 3.2),
                      color: '#fff'
                    }}>
                      <Text style={{color: '#fff', fontSize: fontSizes.regular}}>
                        <Icon name="arrow-left" size={fontSizes.regular} /> &nbsp; Back
                      </Text>
                    </TouchableOpacity>
                  
                  <Text style={pageStyles.headerStyle}>Reset</Text>

                </View>
            </TouchableHighlight>
                <Text style={styles.headTextStyle}>Enter the Authorization Code</Text>
                <Text style={{...styles.subTextStyle, fontSize: fontSizes.medium, marginBottom: 10}}>Sent to {userEmail}</Text>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <AnimatedTextInput
                            style={{...styles.inputStyle, borderColor: AnimColor(interpolatedColor1, 'transparent')}}
                            onChangeText={(OTP) => setOTP(OTP)}
                            onFocus={() => showFocusColor(interpolatedColor1)}
                            onBlur={() => showOriginColor(interpolatedColor1)}
                            placeholder="Enter Code"
                            placeholderTextColor={AnimColor(interpolatedColor1, colors.placeholderColor)}
                            autoCapitalize="none"
                            keyboardType="numeric"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                            underlineColorAndroid="#f000"
                            blurOnSubmit={false}
                        />
                    </View>

                    <Text
                    style={styles.forgotPasswordTextStyle}
                    onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    Re-send OTP
                    </Text>

                    <View style={styles.SectionStyle}>
                        <AnimatedTextInput
                            style={{...styles.inputStyle, borderColor: AnimColor(interpolatedColor2, 'transparent')}}
                            onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                            onFocus={() => showFocusColor(interpolatedColor2)}
                            onBlur={() => showOriginColor(interpolatedColor2)}
                            placeholder="Create Password"
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

                    <View style={styles.SectionStyle}>
                        <AnimatedTextInput
                            style={{...styles.inputStyle, borderColor: AnimColor(interpolatedColor3, 'transparent')}}
                            onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                            onFocus={() => showFocusColor(interpolatedColor3)}
                            onBlur={() => showOriginColor(interpolatedColor3)}
                            placeholder="Confirm Password" //12345
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
                        <Text style={styles.buttonTextStyle}>CHANGE PASSWORD</Text>
                    </TouchableOpacity>
                
                </KeyboardAvoidingView>
            </View>
      </ScrollView>
    </View>
  );
};
export default EnterOtpScreen;