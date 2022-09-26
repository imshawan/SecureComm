 import React from 'react';
 import { View, Text } from 'react-native';

 import {NavigationContainer} from '@react-navigation/native';
 import {createStackNavigator} from '@react-navigation/stack';
 
 import SplashScreen from './screens/SplashScreen';
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
 
 
 const Stack = createStackNavigator();
 
 
 export const PublicRoutes = () => {
   return (
       <NavigationContainer>
         <Stack.Navigator initialRouteName="SplashScreen">
           {/* SplashScreen which will come once for 5 Seconds */}
           <Stack.Screen
             name="SplashScreen"
             component={SplashScreen}
             // Hiding header for Splash Screen
             options={{headerShown: false}}
           />
           <Stack.Screen
             name="LoginScreen"
             component={LoginScreen}
             options={{headerShown: false}}
           />
           <Stack.Screen
             name="SignupScreen"
             component={SignupScreen}
             options={{headerShown: false}}
           />
           <Stack.Screen
             name="ForgotPasswordScreen"
             component={ForgotPasswordScreen}
             options={{headerShown: false}}
           />
           <Stack.Screen
             name="EnterOtpScreen"
             component={EnterOtpScreen}
             options={{headerShown: false}}
           />

          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerShown: false}}/>
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}}/>
          <Stack.Screen name="NewChatScreen" component={NewChatScreen} options={{headerShown: false}}/>
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}}/>
          <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: false}}/>

          <Stack.Screen name="LocationScreen" component={LocationScreen} options={{headerShown: false}}/>
          <Stack.Screen name="BasicProfileEdit" component={BasicProfileEdit} options={{headerShown: false}}/>

           </Stack.Navigator>
       </NavigationContainer>
   );
 };
 
 // Demo screen route, just for checking the drawer navigation system
 const DummyScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{fontSize: 40, fontWeight: 'bold'}}>Hello world!</Text>
      <Text style={{fontSize: 16}}>I'm a DummyScreen, made just for testing.</Text>
    </View>
  );
}

 export const PrivateRoutes = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">

          <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={{headerShown: false}}/>
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerShown: false}}/>
          <Stack.Screen name="NewChatScreen" component={NewChatScreen} options={{headerShown: false}}/>
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}}/>

        </ Stack.Navigator>
      </NavigationContainer>
  );
}