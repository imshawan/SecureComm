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
const interpolatedColor = new Animated.Value(0);
 
const ForgotPasswordScreen = ({navigation}) => {
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
                marginTop: -(Dimensions.get('window').width / 0.809),
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
                <Text style={styles.subTextStyle}>No worries, we got you covered. Please enter the email associated with your account.</Text>
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