import { Dimensions, Platform, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');

// https://stackoverflow.com/questions/33628677/react-native-responsive-font-size

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

// based on iphone 5s's scale
const scaled = width / 320;

export const scale = size => width / guidelineBaseWidth * size;
export const verticalScale = size => height / guidelineBaseHeight * size;
export const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export const normalize = (size) => {
  const newSize = size * scaled;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}