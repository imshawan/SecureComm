import notifee, { EventType } from '@notifee/react-native';
import Store from '../store';
import { displayChatNotification } from './notifications';

const getRoomById = (id) => {
    const {rooms} = Store.getState();
    const {roomList=[]} = rooms;

    return roomList.find(el => el.roomId == id);
}

export const firebaseBackgroundMessageHandler = async (remoteMessage) => {
    // console.log('Message handled in the background!', remoteMessage);
    const {data, sentTime} = remoteMessage;
    var {user, message, roomId} = data;

    if (user) {
        user = JSON.parse(user);
    }

    if (typeof roomId === 'string') {
        roomId = Number(roomId)
    }

    await displayChatNotification(user._id,
        [user.firstname, user.lastname].join(' '), 
        message, user.picture, roomId);
}

export const notifeeBackgroundEventsHandler = async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    if (type === EventType.ACTION_PRESS) {
        if (pressAction.id === 'open') {
            const {id=''} = notification;
            const roomId = id.split(':')[1];
            // const currentRoom = getRoomById(roomId);


        } else if (pressAction.id === 'dismiss') {}
    }

}