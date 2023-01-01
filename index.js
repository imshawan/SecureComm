/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import notifee, { EventType } from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {name as appName} from './app.json';
import { 
    notifeeBackgroundEventsHandler, 
    firebaseBackgroundMessageHandler } from './src/notification';

// Register background handler for FCM
messaging().setBackgroundMessageHandler(firebaseBackgroundMessageHandler);

notifee.onBackgroundEvent(notifeeBackgroundEventsHandler);

AppRegistry.registerComponent(appName, () => App);
