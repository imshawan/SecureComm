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

export const AnimColor = (interpolatedColor, defaultColor) => interpolatedColor.interpolate({
    inputRange: [0, 1],
    outputRange: [defaultColor, colors.brandColor],
});