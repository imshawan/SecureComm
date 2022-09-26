import { APP_NAME } from "./constants";

export const ERRORS = {
    invalidEmail: 'Invalid email Id',
    noUsernameOrEmailSupplied: 'Field cannot be empty',
    noPasswordSupplied: 'Password field cannot be empty',
    noUsernameSupplied: 'Username cannot be empty',
    noOtpSupplied: 'Please fill the OTP',
    noConfirmPassword: 'Please re-enter your password',
    passwordsNoMatch: 'Passwords do not match'
};

export const PLACEHOLDERS = {
    userNameOrEmail: 'Enter Username or Email',
    enterPassword: 'Enter Password',

    createUsername: 'Create username',
    enterEmail: 'Email address',

    enterCode: 'Enter Code',
    createPassword: 'Create Password',
    confirmPassword: 'Confirm Password',
};

export const DIALOG_LABELS = {
    areYouSure: 'Are you sure to remove your account?',
    removeAccount: 'This action will remove your account from this device and your data will be lost. However your account won\'t be deleted.',
}

export const BUTTONS = {
    close: 'Cancel',
    signOut: 'Remove',
    removeAccount: 'Remove account'
}

export const SETTINGS = {
    profile: {
        header: 'Profile Settings',
        subHeader: 'Edit and manage your profile information'
    },
    account: {
        header: 'Account and Data',
        subHeader: 'Manage basic account and privacy information'
    },
    about: {
        header: 'About and Feedback',
        subHeader: 'Reach us with your suggestions and feedbacks'
    },
    menus: {
        notifications: 'Notifications',
        notificationsSubText: 'Manage notifications and sound',

        removeAccount: 'Remove account',
        removeAccountSubText: 'Remove account from this device',

        about: 'About',
        aboutSubText: 'Find more about ' + APP_NAME,

        reachUs: 'Reach us',
        reachUsSubText: 'Send us your valuable thoughts'
    }
}

const HOME_SCREEN = {
    noConversations: 'No Conversations',
    newConversationText: 'You haven\'t made any conversations yet, \n start a new conversation.',

}

const FORGOT_PASSWORD_SCREEN = {
    header: 'No worries, we got you covered',
    subText: 'Please enter the email associated with your account and we\'ll send an email with the instructions to reset your password'
};

const LOCATION_EDIT_SCREEN = {
    title: 'Country and region',
    header: 'Tell us where are you from',
    subHeader: 'this helps people to know you better',

    country: 'Country',
    region: 'Region',
    city: 'City',

    countryList: 'Select Country',
    regionList: 'Select Region',

    enterCity: 'Your current city name (optional)'
}

const BASIC_PROFILE_EDIT = {
    title: 'Basic info and profile',

    firstname: 'Firstname',
    firstnamePlaceholder: 'Enter your firstname',
    lastname: 'Lastname',
    lastnamePlaceholder: 'Enter your lastname',
    about: 'About me',
    aboutPlaceholder: 'Write something about yourself',
    work: 'Work information',
    workPlaceholder: 'Tell us what\'s your profession',

    changePicture: 'Change profile picture',
}

export const LABELS = {
    FORGOT_PASSWORD_SCREEN,
    LOCATION_EDIT_SCREEN,
    BASIC_PROFILE_EDIT,
    HOME_SCREEN,
};