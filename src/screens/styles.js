import { StyleSheet } from "react-native";
import { colors, fontFamily, fontSizes, headerFontSize } from "../common";

export const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.white,
      alignContent: 'center',
    },
    backNav: {
      flexDirection: 'row',
      flex: 1,
    },
    headTextStyle: {
      textAlign: 'left',
      fontSize: fontSizes.extraLarge,
      fontFamily: 'SF-Pro-Rounded-Bold',
      lineHeight: fontSizes.extraLarge + 5,
      color: '#000',
      // marginTop: 50,
      marginBottom: 5,
      marginLeft: 36,
      marginRight: 35,
    },
    subTextStyle: {
      textAlign: 'left',
      fontSize: fontSizes.medium,
      fontFamily: 'SF-Pro-Rounded-Regular',
      color: '#000',
      marginLeft: 36,
      marginRight: 35,
      marginBottom: 10
    },
    SectionStyle: {
      position: 'relative',
      flexDirection: 'row',
      height: 40,
      marginTop: 15,
      marginLeft: 35,
      marginRight: 35,
      margin: 10,
    },
    buttonStyle: {
      backgroundColor: colors.brandColor,
      borderWidth: 0,
      color: colors.white,
      borderColor: colors.borderColor,
      height: 50,
      justifyContent: 'center',
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
      color: colors.white,
      fontSize: fontSizes.regular,
      fontFamily: 'SF-Pro-Rounded-Bold',
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
        fontFamily: 'SF-Pro-Rounded-Bold',
        fontSize: fontSizes.medium,
        padding: 10,
        paddingTop: 0,
        paddingBottom: 0,
        marginRight: 35,
    },
    registerTextStyle: {
      color: colors.brandColor,
      textAlign: 'center',
      fontFamily: 'SF-Pro-Rounded-Bold',
      fontSize: fontSizes.medium,
      alignSelf: 'center',
      padding: 10,
      paddingTop: 0,
      marginTop: -4
    },
    errorTextStyle: {
      color: 'red',
      textAlign: 'left',
      fontSize: fontSizes.medium,
      fontFamily: fontFamily.regular,
      lineHeight: fontSizes.regular,
      marginLeft: 50,
      marginRight: 35
    },
    iconContainerStyle: {
      right: 16,
      position: "absolute",
    },
    iconStyle: {
      height: 24,
      width: 24,
      tintColor: "#b5b9bb",
      color: "#000",
      marginTop: 16
    },
  });