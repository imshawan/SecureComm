 import React from 'react';
 import { View, Text } from 'react-native';

 import {NavigationContainer} from '@react-navigation/native';
 import {createStackNavigator} from '@react-navigation/stack';
 import {createDrawerNavigator} from '@react-navigation/drawer';
 
 import SplashScreen from './screens/SplashScreen';
 import LoginScreen from './screens/login/LoginScreen';
 import SignupScreen from './screens/signup/SignupScreen';
 import ForgotPasswordScreen from './screens/forgotPassword/ForgotPasswordScreen';
 import EnterOtpScreen from './screens/forgotPassword/EnterOtpScreen';
 
 
 const Stack = createStackNavigator();
 const Drawer = createDrawerNavigator();
 
 
 export const PublicRoutes = () => {
   return (
       <NavigationContainer>
         <Stack.Navigator initialRouteName="SplashScreen">
           {/* SplashScreen which will come once for 5 Seconds */}
           <Stack.Screen
             name="SplashScreen"
             component={DummyScreen}
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

 export const DrawerRoutes = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="DummyScreen">
                <Drawer.Screen name="DummyScreen" component={DummyScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
 }