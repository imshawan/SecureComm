import  {Animated} from 'react-native';
import { colors } from "../common";

export const showOriginColor = (interpolatedColor) => {
    Animated.timing(interpolatedColor, {
        duration: 350,
        toValue: 0,
        useNativeDriver: false,
    }).start();
};

export const showFocusColor = (interpolatedColor) => {
    Animated.timing(interpolatedColor, {
        duration: 450,
        toValue: 1,
        useNativeDriver: false,
    }).start();
};

export const AnimColor = (interpolatedColor, defaultColor, transform = colors.brandColor) => interpolatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [defaultColor, transform],
});

export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };