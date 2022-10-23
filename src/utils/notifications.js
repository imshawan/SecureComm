import notifee, { AndroidImportance, AndroidStyle, AndroidBadgeIconType }  from '@notifee/react-native';
import { IMAGES, colors } from '../common';

export const getChannelId = async (name='Default') => {
    return await notifee.createChannel({
        id: name.toLowerCase(),
        name: name + ' channel',
        importance: AndroidImportance.HIGH,
      });
}

export const displayNotification = async (title, body, icon) => {
    const channelId = await getChannelId('Notification');

    await notifee.displayNotification({
        title,
        subtitle: 'New message',
        android: {
          channelId,
          badgeIconType: AndroidBadgeIconType.SMALL,
          largeIcon: IMAGES.appImage,
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
              pressAction: { id: 'open' },
            },
            {
              title: `<span style="color: ${colors.brandColor};">Dismiss</span>`,
              pressAction: { id: 'dismiss' },
            },
          ],
        },
      });
}