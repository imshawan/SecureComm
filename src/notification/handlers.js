import notifee, { EventType } from '@notifee/react-native';
import Store from '../store';

const getRoomById = (id) => {
    const {rooms} = Store.getState();
    const {roomList=[]} = rooms;

    return roomList.find(el => el.roomId == id);
}

export const firebaseBackgroundMessageHandler = async (remoteMessage) => {
    console.log('Message handled in the background!', remoteMessage);
}

export const notifeeBackgroundEventsHandler = async ({ type, detail }) => {
    const { notification, pressAction } = detail;

    if (type === EventType.ACTION_PRESS) {
        if (pressAction.id === 'open') {
            const {id=''} = notification;
            const roomId = id.split(':')[1];
            const currentRoom = getRoomById(roomId);


        } else if (pressAction.id === 'dismiss') {}
    }

}