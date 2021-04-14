import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const defaultHandler = async () => ({
	shouldShowAlert: true,
	shouldPlaySound: false,
	shouldSetBadge: false,
});

//hook to set up the use of push notifications.
export default useNotifications = (notificationHandler = defaultHandler) => {
	const [pushNotificationsToken, setPushNotificationsToken] = useState();
	useEffect(() => {
		registerForPushNotifications();
		//defining how push notifications should be handled
		Notifications.setNotificationHandler(notificationHandler);
	}, []);

	//function for the inital setup of push notifications
	const registerForPushNotifications = async () => {
		try {
			let token;
			const {
				status: existingStatus,
			} = await Notifications.getPermissionsAsync(); //checking permissions to use push notifications
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const {
					status, //asking the user for permission in case the permission has not been granted yet
				} = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert(
					//notifiing the user that declining the request was a bad idea
					'Failed to get push token for push notification! Permission was not granted.'
				);
				return;
			} //fetching a push notifications token
			token = (await Notifications.getExpoPushTokenAsync()).data;

			/* 			const permission = await Permissions.askAsync(
				Permissions.NOTIFICATIONS
			);
			if (!permission.granted) return; */

			setPushNotificationsToken(token); //saving the token for later use
		} catch (error) {
			console.log('Error getting a push token', error);
		}
	};

	return [pushNotificationsToken, setPushNotificationsToken];
};
