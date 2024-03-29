import notifee, { AndroidImportance, AndroidStyle, AndroidBadgeIconType }  from '@notifee/react-native';
import Sound from 'react-native-sound';
import Store from '../store';
import { counterActions } from '../store/countersStore';
import { IMAGES, colors } from '../common';
import { updateRoomData } from '../database';
import { getUnreadMessagesCount } from '../utils';

const notificationSound = new Sound('bell.mp3', Sound.MAIN_BUNDLE);

export const getRoomAndNotificationPreferences = () => {
    const {rooms, settings, counters} = Store.getState();
    const {unreadMessagesCount} = counters;

    return {
      currentRoom: rooms.currentRoom, 
      notifications: settings.notifications, unreadMessagesCount};
}

export const createChannelById = async (name='Default') => {
    await notifee.requestPermission();
    return await notifee.createChannel({
      id: name.toLowerCase(),
        name: name + ' channel',
        importance: AndroidImportance.HIGH,
      });
    }
    
    export const getChannelById = async (id='Default') => {
      return await notifee.getChannel(id.toLowerCase());
    }
    
    export const getChannel = async (id='Default') => {
      const channel = await getChannelById(id);
  if (!channel) {
    return await createChannelById(id);
  } else return channel.id;
}

export const displayChatNotification = async (id, title, body, icon, roomId) => {
    const channelId = await getChannel('Notification');
    const {currentRoom, notifications, unreadMessagesCount} = getRoomAndNotificationPreferences();

    if (currentRoom._id == id) return;

    Store.dispatch(counterActions.incrementUnreadCount(id));
    
    const currentCount = getUnreadMessagesCount(id, unreadMessagesCount);
    await updateRoomData({unreadMessageCount: currentCount + 1}, roomId);
    
    await notifee.displayNotification({
        id: [id, ':', roomId].join(''),
        title,
        subtitle: 'New message',
        android: {
          channelId,
          badgeIconType: AndroidBadgeIconType.SMALL,
          largeIcon: IMAGES.appImage,
          circularLargeIcon: true,
          smallIcon: 'ic_stat_securecomm',
          color: colors.brandColor,
          pressAction: {
            id: 'default',

          },
          showTimestamp: true,
          style: {
            type: AndroidStyle.MESSAGING,
            person: {
              name: title,
              icon: icon,
            },
            messages: [
              {
                text: body,
                timestamp: Date.now(),
              },
            ],
          },
          actions: [
            {
              title: `<span style="color: ${colors.brandColor};">Open</span>`,
              pressAction: { id: 'open', launchActivity: 'default' },
            },
            {
              title: `<span style="color: ${colors.brandColor};">Dismiss</span>`,
              pressAction: { id: 'dismiss' },
            },
          ],
        },
      });
    
    if (!notifications.tune) return;
    notificationSound.play()
}