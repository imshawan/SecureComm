import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { applicationActions } from './store/appStore';
import SplashScreen from './screens/SplashScreen';
import Router from './Router';
import { ENDPOINTS } from './common';
import { HTTP, setAuthToken } from './services';
import { getToken } from './utils';

const SecureComm = () => {
    const applicationState = useSelector(state => state.application);
    const dispatch = useDispatch();

    const hideSplashScreen = () => {
        if (applicationState.loading) {
            dispatch(applicationActions.setLoading(false));
        }
    }

    const loadInitialState = async () => {
        let token = await getToken();
        if (token) {
            setAuthToken(token);
            let {payload} = await HTTP.post(ENDPOINTS.checkAuthentication, {});
            dispatch(applicationActions.setAuthenticated(payload.authenticated));
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