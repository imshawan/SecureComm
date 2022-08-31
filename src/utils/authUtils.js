import AsyncStorage from "@react-native-community/async-storage";
import { HTTP, setAuthToken } from "../services";
import { ENDPOINTS } from "../common";

export const getToken = async () => {
    return await AsyncStorage.getItem('authToken');
}

export const isAuthenticated = async () => {
    let token = await AsyncStorage.getItem('authToken');
    setAuthToken(token);
    try {
        let {payload} = await HTTP.post(ENDPOINTS.checkAuthentication, {});
        return payload.authenticated;
    } catch (err) {
        return false;
    }
}