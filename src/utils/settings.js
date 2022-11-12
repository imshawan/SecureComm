import AsyncStorage from "@react-native-community/async-storage";

export const getNotificationPreferences = async () => {
    const defaultConfig = {
        vibrate: false,
        tune: true,
      };
    let data = await AsyncStorage.getItem('notifications');
    if (!data) {
        await setNotificationPreferences(defaultConfig);
        return defaultConfig;
    }
    return JSON.parse(data);
}

export const setNotificationPreferences = async (payload={}) => {
    payload = JSON.stringify(payload);
    console.log(payload);
    await AsyncStorage.setItem('notifications', payload);
}