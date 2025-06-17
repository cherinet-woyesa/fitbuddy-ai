import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function requestNotificationPermission() {
  // Skip notification permission request on web
  if (Platform.OS === 'web') {
    return;
  }

  try {
    const settings = await Notifications.getPermissionsAsync();
    if (!settings.granted) {
      await Notifications.requestPermissionsAsync();
    }
  } catch (error) {
    console.log('Notification permission error:', error);
  }
}

export async function scheduleReminder(title: string, body: string, hour: number, minute: number) {
  // Skip scheduling notifications on web
  if (Platform.OS === 'web') {
    console.log('Notifications are not supported on web platform');
    return;
  }

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        channelId: 'default', // required for Android
        hour,
        minute,
        repeats: true,
      },
    });
  } catch (error) {
    console.log('Schedule notification error:', error);
  }
}
