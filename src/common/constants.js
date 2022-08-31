export const LOGS = false;

export const APP_NAME = 'SecureComm';

export const APP_REMOTE_HOST = 'https://d9f2-2401-4900-1c3b-d9c9-496e-ef90-b8e8-38e5.in.ngrok.io';

export const HEADER_HEIGHT = 65;
export const TOUCHABLE_TAP = {
    onTapDuration: 100,
    onReleaseDuration: 200
};

export const ENDPOINTS = {
    logIn: '/api/v1/auth/signin',
    register: '/api/v1/auth/register',

    forgotPassword: '/api/v1/auth/password/forgot',
    resetPassword: '/api/v1/auth/password/reset',
    changePassword: '/api/v1/auth/password/change',

    checkAuthentication: '/api/v1/users/authentication',
};

export const dummyJSON = [
    {id: 1, name: 'Anirban Mukherjee', msg: 'Hello there, I\'m fascinated by up-and-coming technology.'},
    {id: 2, name: 'Shawan Mandal', msg: 'Backend focused full-stack developer (MERN stack)'},
    {id: 3, name: 'Shagun Mishra', msg: 'Hello there, I was just wondering what to do now Oh no..!!'},
    {id: 4, name: 'Pinky Paul', msg: 'Hello there, Still there??'},
    {id: 5, name: 'Pooja Sonavane', msg: 'I was just wondering what to do'},
    {id: 6, name: 'Anirban Mukherjee', msg: 'Hello there, I\'m fascinated by up-and-coming technology.'},
    {id: 7, name: 'Sidhanth Mandal', msg: 'Backend focused full-stack developer (MERN stack)'},
    {id: 8, name: 'Shagun Mishra', msg: 'Hello there, I was just wondering what to do now Oh no..!!'},
    {id: 9, name: 'Pinky Paul', msg: 'Hello there, Still there??'},
    {id: 10, name: 'Pooja Sonavane', msg: 'I was just wondering what to do'},
    {id: 11, name: 'Anirban Mukherjee', msg: 'Hello there, I\'m fascinated by up-and-coming technology.'},
    {id: 12, name: 'Shawan Mandal', msg: 'Backend focused full-stack developer (MERN stack)'},
    {id: 13, name: 'Shagun Mishra', msg: 'Hello there, I was just wondering what to do now Oh no..!!'},
    {id: 14, name: 'Pinky Paul', msg: 'Hello there, Still there??'},
    {id: 15, name: 'Pooja Sonavane', msg: 'I was just wondering what to do'},
    {id: 16, name: 'Deepanshu Gupta', msg: 'Hello there, I\'m fascinated by up-and-coming technology.'},

];

export const dummyChat = [
    {id: 1, name: 'Anirban Mukherjee', message: 'This meeting was very important for my understanding. Hariharan Sir\'s.'},
    {id: 2, name: 'Anirban Mukherjee', message: 'Couldn\'t focus. Growpital thing. Had to look them up.'},
    {id: 3, name: 'Anirban Mukherjee', message: 'Can you explain to me what went wrong? TID PID UID I need to understand.'},
    {id: 4, name: 'Shawan Mandal', message: 'No worries, I\'ll explain'},
    {id: 5, name: 'Anirban Mukherjee', message: 'That meeting not happening.'},
    {id: 6, name: 'Anirban Mukherjee', message: 'And I lost everything here as well.'},
    {id: 7, name: 'Anirban Mukherjee', message: 'Shubham and I were coming up with the detailed training module.'},
    {id: 8, name: 'Shawan Mandal', message: 'Achaaa'},
    {id: 9, name: 'Anirban Mukherjee', message: 'And I need to catch up with Ebrahim. I didn\'t get why he said he didn\'t have anything to show.'},
    {id: 10, name: 'Anirban Mukherjee', message: 'Pooja is done with Events bug fixes. She was asking if we should work on the UX. Like, there are no edit, delete UI element.'},
    {id: 11, name: 'Anirban Mukherjee', message: 'So I said, not to work on that, because that has to go to the TPM, right? (Me🤣) Or it\'s a drain on her, I thought.'},
    {id: 12, name: 'Shawan Mandal', message: 'Achaaa, that\'s right...'},

].reverse();