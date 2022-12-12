import Snackbar from 'react-native-snackbar';
import  {Animated} from 'react-native';
import { colors, APP_REMOTE_HOST } from "../common";

export const showOriginColor = (interpolatedColor, duration=350) => {
    Animated.timing(interpolatedColor, {
        duration,
        toValue: 0,
        useNativeDriver: false,
    }).start();
};

export const showFocusColor = (interpolatedColor, duration=450) => {
    Animated.timing(interpolatedColor, {
        duration,
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

export const generateUUID = (string='') => {
    return string.toLowerCase() + '-' + Date.now();
}

export const notifyUser = (message, action={}) => {
    let {onPressAction, actionText='OK', showAction=true} = action;
    let snackbarAction = {};

    if (typeof onPressAction !== 'function') {
      onPressAction = () => Snackbar.dismiss();
    }

    if (showAction) {
      snackbarAction = {
        text: actionText,
        textColor: colors.brandColor,
        onPress: onPressAction,
      };
    }

    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      textColor: colors.white,
      backgroundColor: colors.black,
      numberOfLines: 4,
      action: snackbarAction,
    });
  }

export const isBase64Data = string =>  new RegExp("base64").test(String(string));

export const getUserPicture = (user) => {
  if (!user.picture) return null;
  if (user.picture.includes(APP_REMOTE_HOST)) return user.picture;
  
  return [APP_REMOTE_HOST, '/', user.picture].join('');
}

// https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time
export const processTime = (timestamp, relative=false) => {
  var currentTime = Date.now();

  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = currentTime - new Date(timestamp);

  if (elapsed < msPerMinute) {
    if (relative) {
      return Math.round(elapsed/1000) + ' seconds ago';
    }
    return processShortTime(timestamp);

  } else if (elapsed < msPerHour) {
    if (relative) {
      return Math.round(elapsed/msPerMinute) + ' minutes ago';
    }
    return processShortTime(timestamp);
    
  } else if (elapsed < msPerDay) {
    if (relative) {
      return Math.round(elapsed/msPerHour ) + ' hours ago';
    }
    return processShortTime(timestamp);
  }

  if (elapsed < msPerMonth) {
    let day = Math.round(elapsed / msPerDay);
    return day + (day < 2 ? ' day' : ' days')  + ' ago';

  } else if (elapsed < msPerYear) {
    let month = Math.round(elapsed / msPerMonth);
    return month + (month < 2 ? ' month' : ' months') + ' ago';

  } else {
    let year = Math.round(elapsed / msPerYear);
    return year + (month < 2 ? ' year' : ' years') + ' ago';
  }
};


// https://www.geeksforgeeks.org/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format/
export const processShortTime = timestamp => {
  var date = new Date(timestamp);
  var hours = date.getHours();
  var minutes = date.getMinutes();

  // Check whether AM or PM
  var newformat = hours >= 12 ? 'pm' : 'am';

  // Find current hour in AM-PM Format
  hours = hours % 12;

  // To display "0" as "12"
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return hours + ':' + minutes + ' ' + newformat;
};

export const sortItemByTimestamp = (array=[], key) => {
  if (!Array.isArray(array)) return [];
  if (!array.length) return [];
  
  return array.sort((firstElem, secondElem) => new Date(firstElem[key]).getTime() < (new Date(secondElem[key])).getTime());
}