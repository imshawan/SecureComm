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

    const hideSplashScreen = (value) => {
        if (applicationState.loading) {
            dispatch(applicationActions.setLoading(!value));
        }
    }

    const loadInitialState = async () => {
        hideSplashScreen(false);

        let token = await getToken();
        if (token) {
            setAuthToken(token);
            let {payload} = await HTTP.post(ENDPOINTS.checkAuthentication, {});
            dispatch(applicationActions.setAuthenticated(payload.authenticated));
        } else {
            setTimeout(() => hideSplashScreen(true), 1000);
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