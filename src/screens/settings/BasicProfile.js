import React, {useState, useEffect} from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, TextInput, Animated,
  Keyboard, ScrollView, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

import ProfileAvtar from '../../components/ProfileAvtar';
import ImagePickerDialog from '../../components/settings/ImagePIcker';

import { currentUserActions } from '../../store/userStore';
import { colors, HEADER_HEIGHT, fontSizes, LABELS, fontFamily } from '../../common';
import { showFocusColor, showOriginColor, AnimColor } from '../../utils';
import { styles as defaultStyles } from '../styles';
import { log } from '../../config';

const { BASIC_PROFILE_EDIT } = LABELS;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
},

headerContainer: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    flexDirection: 'column',
    height: HEADER_HEIGHT - 10,
    shadowColor: colors.lightestGrey,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 3,
    zIndex: 9,
            
  },
  headerRow: {
      flexDirection: 'row', 
      height: '100%', 
      alignItems: 'center',
  },
  headerTextStyle: {
      flexDirection: 'row',
      fontSize: fontSizes.extraLarge, 
      color: colors.black,
      fontFamily: fontFamily.bold,
      lineHeight: fontSizes.extraLarge + 5,
  },
  headerContent: {
      flexDirection: 'row', 
      paddingHorizontal: 25,
  },
  touchControlStyle: {
    marginLeft: 0,
    paddingLeft: 0,
    marginTop: -2,
    width: 35,
  },
  iconStyles: {
    color: colors.black
  },
  cameraIconStyle: {
    color: colors.white,
  },
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10
  },
  formLabel: {
    fontSize: fontSizes.regular, 
    color: colors.black,
    fontFamily: fontFamily.bold,
    lineHeight: fontSizes.regular + 5,
    marginTop: 12,
    marginBottom: 5,
},
profilePictureContainer: {
    alignItems: 'center',
    position: 'relative'
},
avtarStyles: {
    height: 140,
    width: 140,
    borderRadius: 140,
},
avtarTextStyles: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: fontFamily.bold,
    fontSize: 40,
    paddingTop: 4
},
selectTextValue: {
    fontFamily: fontFamily.regular,
},
  sectionStyle: {
    position: 'relative',
    flexDirection: 'row',
    // height: 40,
},
inputStyle: {
    flex: 1,
    color: colors.black,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    height: 50,
    fontSize: fontSizes.medium,
    backgroundColor: colors.inputBackground,
    fontFamily: fontFamily.regular,
    borderWidth: 1,
},
buttonStyle: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 40
},
about: {
    height: 80, 
    textAlignVertical: 'top'
},
changePictureContainer: {
  position: 'absolute', 
  bottom: 0, 
  right: 5, 
  backgroundColor: colors.brandColor, 
  height: 40, 
  width: 40, 
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
},
});


const Input = ({label, placeholder, value, onChange, inputStyle, multiline=false}) => {
    const AnimatedInput = Animated.createAnimatedComponent(TextInput);
    const interpolatedColor = new Animated.Value(0);

    return (
          <>
            <Text style={styles.formLabel}>{label}</Text>
            <View style={styles.sectionStyle}>
              <AnimatedInput
                style={[styles.inputStyle, inputStyle, {borderColor: AnimColor(interpolatedColor, 'transparent')}]}
                onChangeText={onChange}
                placeholder={placeholder}
                placeholderTextColor={AnimColor(interpolatedColor, colors.placeholderColor)}
                keyboardType="default"
                value={value}
                onFocus={() => showFocusColor(interpolatedColor)}
                onBlur={() => showOriginColor(interpolatedColor)}
                multiline={multiline}
                blurOnSubmit={false}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                />
            </View>
          </>
    );
}

const BasicProfileEdit = ({navigation}) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const currentUser = useSelector(state => state.user.currentUser);
  const [state, setState] = useState({
    picture: '',
    firstname: '',
    lastname: '',
    about: '',
    work: '',
    ...currentUser,
  });

  const dispatch = useDispatch();

  const handleOnChange = (field, value) => {
    setState(prevState => ({...prevState, [field]: value}));
  }

  const handleSubmitPress = () => {
    Keyboard.dismiss();
    dispatch(currentUserActions.setCurrentUser(state));
  }
 
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
      <ImagePickerDialog visible={dialogVisible} onChange={handleOnChange} setVisible={setDialogVisible} />
      <View style={styles.container}>
          <View style={styles.headerContainer}>
              <View style={styles.headerContent}>
                  <View style={styles.headerRow}>
                      <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.goBack()}>
                          <Icon name="arrow-left" style={styles.iconStyles} size={fontSizes.large} />
                      </TouchableOpacity>
                      <Text style={styles.headerTextStyle}>{BASIC_PROFILE_EDIT.title}</Text>
                  </View>
              </View>
          </View>

            <ScrollView keyboardShouldPersistTaps="handled">
                <KeyboardAvoidingView enabled>
                    <View style={styles.formContainer}>

                        <View style={styles.profilePictureContainer}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => setDialogVisible(true)}>
                                <ProfileAvtar image={state.picture} name={[state.firstname, state.lastname].join(' ')} customStyles={styles.avtarStyles} textStyle={styles.avtarTextStyles} />
                                <View style={styles.changePictureContainer}>
                                  <Icon style={styles.cameraIconStyle} name="camera" size={fontSizes.large} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        <Input 
                            label={BASIC_PROFILE_EDIT.firstname}
                            placeholder={BASIC_PROFILE_EDIT.firstnamePlaceholder}
                            onChange={(firstname) => handleOnChange('firstname', firstname)}
                            value={state.firstname}
                        />

                        <Input 
                            label={BASIC_PROFILE_EDIT.lastname}
                            placeholder={BASIC_PROFILE_EDIT.lastnamePlaceholder}
                            onChange={(lastname) => handleOnChange('lastname', lastname)}
                            value={state.lastname}
                        />

                        <Input 
                            label={BASIC_PROFILE_EDIT.about}
                            placeholder={BASIC_PROFILE_EDIT.aboutPlaceholder}
                            onChange={(about) => handleOnChange('about', about)}
                            value={state.about}
                            multiline={true}
                            inputStyle={styles.about}
                        />

                        <Input 
                            label={BASIC_PROFILE_EDIT.work}
                            placeholder={BASIC_PROFILE_EDIT.workPlaceholder}
                            onChange={(work) => handleOnChange('work', work)}
                            value={state.work}
                        />

                        <Input 
                            label={BASIC_PROFILE_EDIT.organization}
                            placeholder={BASIC_PROFILE_EDIT.organizationPlaceholder}
                            onChange={(organization) => handleOnChange('organization', organization)}
                            value={state.organization}
                        />

                        <TouchableOpacity
                            style={{...defaultStyles.buttonStyle, ...styles.buttonStyle}}
                            activeOpacity={0.5}
                            onPress={handleSubmitPress}>
                            <Text style={defaultStyles.buttonTextStyle}>SAVE</Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAvoidingView>
            </ScrollView>

        </View>  
    </>
  );
};
 
export default BasicProfileEdit;