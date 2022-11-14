import { APP_NAME, APP_VERSION } from "./constants";

export const AUTHOR = {
    name: 'Shawan Mandal',
    contribution: 'Lead Developer and Designer',

    facebook: 'https://www.facebook.com/shawan.sm/',
    github: 'https://github.com/imshawan',
    linkedin: 'https://www.linkedin.com/in/shawan-mandal',
}

export const ERRORS = {
    invalidEmail: 'Invalid email Id',
    noEmail: 'Email Id is required',
    noUsernameOrEmailSupplied: 'Field cannot be empty',
    noPasswordSupplied: 'Password field cannot be empty',
    noUsernameSupplied: 'Username cannot be empty',
    noOtpSupplied: 'Please fill the OTP',
    invalidOtp: 'Invalid OTP',
    noConfirmPassword: 'Please re-enter your password',
    passwordsNoMatch: 'Passwords do not match',
    noMessage: 'Please write something for us',
    noNewPassword: 'Please enter your new passwword',
    noConfirmPassword: 'Please re-enter new password',
    passwordsDoNotMatch: 'Passwords do not match',
};

export const PLACEHOLDERS = {
    userNameOrEmail: 'Enter Username or Email',
    enterPassword: 'Enter Password',

    createUsername: 'Create username',
    enterEmail: 'Email address',

    enterCode: 'Enter Code',
    createPassword: 'Create Password',
    confirmPassword: 'Confirm Password',

    updatedSuccessfully: 'Updated successfully',
    pleaseWait: 'Please wait',

    sendingMessage: 'Sending your message.'
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
        passwords: 'Passwords',
        passwordsSubText: 'Change your account passwords',

        notifications: 'Notifications',
        notificationsSubText: 'Manage app notifications and sound',

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

    firstname: 'First name',
    firstnamePlaceholder: 'Enter your first name',
    lastname: 'Last name',
    lastnamePlaceholder: 'Enter your last name',
    about: 'About me',
    aboutPlaceholder: 'Write something about yourself',
    work: 'Work information',
    workPlaceholder: 'Tell us what\'s your profession',
    organization: 'Organization',
    organizationPlaceholder: 'Where do you work?',

    changePicture: 'Change profile picture',
}

const ABOUT_SCREEN = {
    title: 'About',

    software: 'About the Software',

    github: {
        header: 'Github',
        text: 'Contribute to the project on GitHub',
    },
    report: {
        header: 'Report',
        text: 'Report bug and issues and make the application better'
    },
    share: {
        header: 'Share',
        text: 'Share this app with your friends and family'
    },
    dependencies: {
        header: 'Open-source dependencies',
        text: 'See all the various dependencies and open-source licenses used',
    },
    version: {
        header: 'App version',
        text: APP_VERSION,
    },
    footer: 'Made with ❤️ in India'
}

const CONTACT_SCREEN = {
    title: 'Reach us',
    header: 'Send us your queries',
    subHeader: 'and valuable thoughts'
}

const CHANGE_PASSWORD_SCREEN = {
    title: 'Passwords',
    header: 'Change existing app password',
    subHeader: 'this helps in keeping your account secure',

    currentPassword: 'Current password',
    currentPasswordPlaceholder: 'Enter your current password',

    newPassword: 'New password',
    newPasswordPlaceholder: 'Create new password',

    confirmPassword: 'Confirm password',
    confirmPasswordPlaceholder: 'Re-enter your new password',

    actionBtn: 'CHANGE PASSWORD'
}

const NOTIFICATION_SCREEN = {
    title: 'Notifications',
    header: 'Update your notification',
    subHeader: 'and sound preferences',

    notificationItems: {
        incomingMessage: 'Play notifications sounds',
        incomingMessageSubtext: 'Play sounds while receiving new incoming messages',

        vibrate: 'Enable vibration',
        vibrateSubtext: 'Vibrate on new incoming messages'
    }
}

const EMAIL_SCREEN = {
    title: 'Email',
    header: 'Change your existing email',
    subHeader: 'with a new one',

    enterEmail: 'New email',
    enterEmailSubtext: 'Your new email address',

    codeSent: 'Code sent to ',
    enterCode: 'Enter the 6-digit code',
}

export const LABELS = {
    FORGOT_PASSWORD_SCREEN,
    LOCATION_EDIT_SCREEN,
    BASIC_PROFILE_EDIT,
    HOME_SCREEN,
    ABOUT_SCREEN,
    CONTACT_SCREEN,
    CHANGE_PASSWORD_SCREEN,
    NOTIFICATION_SCREEN,
    EMAIL_SCREEN
};