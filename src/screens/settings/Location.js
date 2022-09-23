import React, {useState, useEffect} from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text, TextInput, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Select from '../../components/SelectInput/Select';
import { colors, HEADER_HEIGHT, fontSizes, appHeaderSize, LABELS, fontFamily } from '../../common';
import { styles as defaultStyles } from '../styles';
import { DATA } from '../../data';
import { log } from '../../config';

const { LOCATION_EDIT_SCREEN } = LABELS;
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
  sectionHeadingContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 12
  },
  sectionHeading: {
    color: colors.black,
    fontSize: fontSizes.extraLarge,
    fontFamily: fontFamily.bold,
    lineHeight: fontSizes.extraLarge + 5,
  },
  sectionSubHeading: {
    color: colors.black,
    fontSize: fontSizes.medium,
    fontFamily: fontFamily.regular,
    lineHeight: fontSizes.medium + 5,
    marginTop: 2
  },
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20
  },
  formLabel: {
    fontSize: fontSizes.regular, 
    color: colors.black,
    fontFamily: fontFamily.bold,
    lineHeight: fontSizes.regular + 5,
    marginTop: 12,
    marginBottom: 5
  },
  selectTextValue: {
    fontFamily: fontFamily.regular,
  },
  sectionStyle: {
    position: 'relative',
    flexDirection: 'row',
    height: 40,
  },
  inputStyle: {
    flex: 1,
    color: colors.placeholderColor,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
    height: 50,
    fontSize: fontSizes.medium,
    backgroundColor: colors.inputBackground,
  },
  buttonStyle: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 40
  },
});
 

const LocationScreen = ({navigation}) => {
  const [state, setState] = useState({
    country: {name: 'India'},
    region: {name: 'Assam'}
  });

  const handleOnChange = (field, value) => {
    setState(prevState => ({...prevState, [field]: value}));
  }

  const handleSubmitPress = () => {
    Keyboard.dismiss();
    log(state);
  }

  useEffect(() => {
    if (state.country.states && state.country.states.length) {
      setState(prevState => ({...prevState, region: state.country.states[0]}));
    }
  }, [state.country])
 
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={colors.white} />
      <View style={styles.container}>
          <View style={styles.headerContainer}>
              <View style={styles.headerContent}>
                  <View style={styles.headerRow}>
                      <TouchableOpacity style={styles.touchControlStyle} onPress={() => navigation.goBack()}>
                          <Icon name="arrow-left" style={styles.iconStyles} size={fontSizes.large} />
                      </TouchableOpacity>
                      <Text style={styles.headerTextStyle}>{LOCATION_EDIT_SCREEN.title}</Text>
                  </View>
              </View>
          </View>
          
          <View style={styles.sectionHeadingContainer}>
            <Text style={styles.sectionHeading}>{LOCATION_EDIT_SCREEN.header}</Text>
            <Text style={styles.sectionSubHeading}>{LOCATION_EDIT_SCREEN.subHeader}</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>{LOCATION_EDIT_SCREEN.country}</Text>

            <Select data={DATA.countryList} 
              textStyle={styles.selectTextValue} 
              listTitle={LOCATION_EDIT_SCREEN.countryList}
              onChange={(val) => handleOnChange('country', val)} 
              currentValue={state.country} />

            <Text style={styles.formLabel}>{LOCATION_EDIT_SCREEN.region}</Text>
            <Select data={state.country.states || []} 
              textStyle={styles.selectTextValue}
              listTitle={LOCATION_EDIT_SCREEN.regionList} 
              onChange={(val) => handleOnChange('region', val)} 
              currentValue={state.region} />


            <Text style={styles.formLabel}>{LOCATION_EDIT_SCREEN.city}</Text>
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(Usercity) => handleOnChange('city', Usercity)}
                placeholder={LOCATION_EDIT_SCREEN.enterCity}
                placeholderTextColor={colors.placeholderColor}
                keyboardType="default"
                blurOnSubmit={false}
                underlineColorAndroid="#f000"
                returnKeyType="next"
                />
            </View>

            <TouchableOpacity
              style={{...defaultStyles.buttonStyle, ...styles.buttonStyle}}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
                <Text style={defaultStyles.buttonTextStyle}>SAVE</Text>
            </TouchableOpacity>

          </View>

        </View>  
    </>
  );
};
 
export default LocationScreen; 
