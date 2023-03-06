import {version} from '../../package.json';

export const LOGS = false;

export const APP_NAME = 'SecureComm';
export const APP_VERSION = version;

export const APP_REMOTE_HOST = 'https://apps.imshawan.dev';
// export const APP_REMOTE_HOST = 'http://192.168.1.5:3000';

export const HEADER_HEIGHT = 65;
export const SEARCHBAR_HEIGHT = 45;
export const TOUCHABLE_TAP = {
    onTapDuration: 100,
    onReleaseDuration: 200
};
export const BASE_ANIMATION_DURATION = 300;

export const PROFILE_PICTURE_DIMENSIONS = {
    height: 400,
    width: 400,
}

const API_VERSION = 'v1';

export const ENDPOINTS = {
    logIn: '/api/' + API_VERSION +'/auth/signin',
    logOut: '/api/' + API_VERSION +'/auth/signout',
    register: '/api/' + API_VERSION +'/auth/register',

    forgotPassword: '/api/' + API_VERSION +'/auth/password/forgot',
    resetPassword: '/api/' + API_VERSION +'/auth/password/reset',
    changePassword: '/api/' + API_VERSION +'/auth/password/change',
    changeEmail: '/api/' + API_VERSION +'/auth/email/change',
    sendOtp: '/api/' + API_VERSION +'/auth/otp',

    checkAuthentication: '/api/' + API_VERSION +'/users/authentication',
    getUsersByUsername: '/api/' + API_VERSION +'/users/username',
    updateUserData: '/api/' + API_VERSION +'/users/update',
    changePicture: '/api/' + API_VERSION +'/users/picture',
    checkUserActivityStatus: '/api/' + API_VERSION +'/users/status',

    saveFCMToken: '/api/' + API_VERSION +'/tokens/fcm',

    createRoom: '/api/' + API_VERSION +'/rooms/create',
    contactUs: '/api/' + API_VERSION +'/query/contact',
};