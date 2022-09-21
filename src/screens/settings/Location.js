import React, {useState, useEffect} from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Select from '../../components/Select';

import { colors, IMAGES, HEADER_HEIGHT, fontSizes, appHeaderSize } from '../../common';

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
      fontFamily: 'SF-Pro-Rounded-Bold',
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
    marginTop: 20
  },
  sectionHeading: {
    color: colors.black,
    fontSize: appHeaderSize,
    fontFamily: 'SF-Pro-Rounded-Bold',
    lineHeight: appHeaderSize + 5,
  },
  sectionSubHeading: {
    color: colors.black,
    fontSize: fontSizes.regular,
    fontFamily: 'SF-Pro-Rounded-Regular',
    lineHeight: fontSizes.regular + 5
  },
  formContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 20
  },
  formLabel: {
    fontSize: fontSizes.regular, 
    color: colors.black,
    fontFamily: 'SF-Pro-Rounded-Bold',
    lineHeight: fontSizes.regular + 5,
    marginVertical: 10
  },
  selectTextValue: {
    fontFamily: 'SF-Pro-Rounded-Regular',
  },
});
 
const LocationScreen = ({navigation}) => {
  const [country, setCountry] = useState("");
 
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
                      <Text style={styles.headerTextStyle}>Location</Text>
                  </View>
              </View>
          </View>
          
          <View style={styles.sectionHeadingContainer}>
            <Text style={styles.sectionHeading}>Select your country</Text>
            <Text style={styles.sectionSubHeading}>and region</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Country</Text>
            <Select textStyle={styles.selectTextValue} currentValue={'India'} />

            <Text style={styles.formLabel}>State</Text>
            <Select textStyle={styles.selectTextValue} currentValue={'Assam'} />

          </View>

        </View>  
    </>
  );
};
 
export default LocationScreen; 
