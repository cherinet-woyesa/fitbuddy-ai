import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    // Create a notification channel on Android
    Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.HIGH,
      sound: 'default', // optional
    });
  }, []);

  return (
    <AppNavigator />
    // your app's navigation or layout
  );
}
