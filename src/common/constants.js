export const LOGS = false;

export const APP_NAME = 'SecureComm';

export const APP_REMOTE_HOST = 'https://apps.imshawan.dev';

export const HEADER_HEIGHT = 65;
export const SEARCHBAR_HEIGHT = 45;
export const TOUCHABLE_TAP = {
    onTapDuration: 100,
    onReleaseDuration: 200
};
export const BASE_ANIMATION_DURATION = 300;

const API_VERSION = 'v1';

export const ENDPOINTS = {
    logIn: '/api/' + API_VERSION +'/auth/signin',
    register: '/api/' + API_VERSION +'/auth/register',

    forgotPassword: '/api/' + API_VERSION +'/auth/password/forgot',
    resetPassword: '/api/' + API_VERSION +'/auth/password/reset',
    changePassword: '/api/' + API_VERSION +'/auth/password/change',

    checkAuthentication: '/api/' + API_VERSION +'/users/authentication',
    getUsersByUsername: '/api/' + API_VERSION +'/users/username',

    createRoom: '/api/' + API_VERSION +'/rooms/create',
};