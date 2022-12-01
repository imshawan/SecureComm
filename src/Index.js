import React, {useState, useEffect} from 'react';
import DeviceInfo from 'react-native-device-info';
import { useSelector, useDispatch } from "react-redux";
import { applicationActions } from './store/appStore';
import { currentUserActions } from './store/userStore';
import { settingsActions } from './store/settingsStore';
import SplashScreen from './screens/SplashScreen';
import Router from './Router';
import { ENDPOINTS } from './common';
import { HTTP, setAuthToken } from './services';
import { getToken, getLoggedInUser, getNotificationPreferences } from './utils';

const SecureComm = () => {
    const applicationState = useSelector(state => state.application);
    const dispatch = useDispatch();

    const hideSplashScreen = () => {
        if (applicationState.loading) {
            dispatch(applicationActions.setLoading(false));
        }
    }

    const loadApplicationSettings = async () => {
        const notification = await getNotificationPreferences();

        dispatch(settingsActions.setNotificationData(notification));
    }

    const loadInitialState = async () => {
        await loadApplicationSettings();
        
        const token = await getToken();
        const deviceId = DeviceInfo.getUniqueIdSync();
        
        dispatch(applicationActions.setDeviceId(deviceId));

        if (token) {
            setAuthToken(token);
            dispatch(applicationActions.setAuthToken(token));
            let {payload} = await HTTP.post(ENDPOINTS.checkAuthentication, {});
            dispatch(applicationActions.setAuthenticated(payload.authenticated));
            if (payload.authenticated) {
                let user = await getLoggedInUser();
                dispatch(currentUserActions.setCurrentUser(user));
            }
            hideSplashScreen();
        } else {
            setTimeout(() => hideSplashScreen(), 1000);
        }
    }

    useEffect(() => {
        loadInitialState()
    }, [applicationState.isAuthenticated])
  
    return (
      <>
        {applicationState.loading ? <SplashScreen /> : <Router />}
      </>
    );
  }

export default SecureComm;