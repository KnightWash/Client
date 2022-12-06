import 'react-native-gesture-handler';
import * as Device from 'expo-device';
import React from 'react';
import { useState, useEffect, setIte, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as Notifications from 'expo-notifications';
//import { Drawer } from 'react-native-paper';
import { DefaultTheme as DefaultTheme, Provider as PaperProvider, Button } from 'react-native-paper';
import { withTheme } from 'react-native-paper';
import { HomeScreen, LocationDropdownHeader } from './Screens/Home';
import { DetailsScreen } from './Screens/Details';
import { DrawerComponent } from './components/Drawer';
import { theme } from './theme';
import { createContext } from 'react'

export const NotifContext = createContext({ expoPushToken: null, setExpoPushToken: (token) => { } })

const Drawer = createDrawerNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    //tokenListener.current = expoPushToken;

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <PaperProvider theme={theme}>
      <NotifContext.Provider value={{ expoPushToken, setExpoPushToken }}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Details" component={DetailsScreen} />
          </Drawer.Navigator>
        </NavigationContainer>
      </NotifContext.Provider>
    </PaperProvider>

  );
}

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
export async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Machine has completed job',
    body: 'Your machine has just turned off! Please grab your laundry!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

export async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#cbcadb',
    });
  }

  return token;
}