 import React, { useEffect } from 'react';
 import { useSelector, useDispatch } from 'react-redux';
 import {NavigationContainer} from '@react-navigation/native';
 import {createStackNavigator} from '@react-navigation/stack';
 import SplashScreen from 'react-native-splash-screen';

 import Loader from './components/Loader';
 
 import LoginScreen from './screens/login/LoginScreen';
 import SignupScreen from './screens/signup/SignupScreen';
 import ForgotPasswordScreen from './screens/forgotPassword/ForgotPasswordScreen';
 import EnterOtpScreen from './screens/forgotPassword/EnterOtpScreen';

 import Home from './screens/Home';
 import SearchScreen from './screens/SearchScreen';
 import ChatScreen from './screens/chats/ChatScreen';
 import NewChatScreen from './screens/chats/NewChatScreen';
 import ProfileScreen from './screens/ProfileScreen';
 import SettingsScreen from './screens/SettingsScreen';
 import LocationScreen from './screens/settings/Location';
 import BasicProfileEdit from './screens/settings/BasicProfile';
 import About from './screens/settings/About';
 import Contact from './screens/settings/Contact';
 import ChangePassword from './screens/settings/ChangePassword';
 import Notification from './screens/settings/Notification';
 import Email from './screens/settings/Email';

 import { listMyRooms } from './database';
 import { roomActions } from './store/roomListStore';
 import { applicationActions } from './store/appStore';
 

 const Stack = createStackNavigator();
 
 const PublicRoutes = () => {
   return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">

          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerShown: false}} />
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{headerShown: false}} />
          <Stack.Screen name="EnterOtpScreen" component={EnterOtpScreen} options={{headerShown: false}} />

        </Stack.Navigator>
      </NavigationContainer>
   );
 };

  const PrivateRoutes = () => {

  const application = useSelector(state => state.application);
  const dispatch = useDispatch();

  useEffect(() => {
    
    if (application.initializingRooms) {
      listMyRooms().then((rooms=[]) => {
        if (rooms && rooms.length) {
            rooms = JSON.parse(JSON.stringify(rooms)).reverse();
            dispatch(roomActions.initRooms(rooms));
          }

        dispatch(applicationActions.setinitializingRooms(false));
      });
    }
  }, [application.initializingRooms])

  if (application.initializingRooms) {
    return <Loader visible={true} />
  } 

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">

          <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerShown: false}} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}} />
          <Stack.Screen name="NewChatScreen" component={NewChatScreen} options={{headerShown: false}} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}} />
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: false}} />
          <Stack.Screen name="LocationScreen" component={LocationScreen} options={{headerShown: false}} />
          <Stack.Screen name="BasicProfileEdit" component={BasicProfileEdit} options={{headerShown: false}} />
          <Stack.Screen name="AboutScreen" component={About} options={{headerShown: false}} />
          <Stack.Screen name="ContactScreen" component={Contact} options={{headerShown: false}} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown: false}} />
          <Stack.Screen name="Notification" component={Notification} options={{headerShown: false}} />
          <Stack.Screen name="Email" component={Email} options={{headerShown: false}} />

        </Stack.Navigator>
      </NavigationContainer>
  );
 }

 export default Router = () => {
  const isAuthenticated = useSelector(state => state.application.isAuthenticated);

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <>
      {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
    </>
  );
 }