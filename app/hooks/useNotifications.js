import { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const defaultHandler = async () => ({
	shouldShowAlert: true,
	shouldPlaySound: false,
	shouldSetBadge: false,
});

export default useNotifications = (notificationHandler = defaultHandler) => {
	const [pushNotificationsToken, setPushNotificationsToken] = useState();
	useEffect(() => {
		registerForPushNotifications();

		console.log(notificationHandler);
		Notifications.setNotificationHandler(notificationHandler);
	}, []);

	const registerForPushNotifications = async () => {
		try {
			let token;
			const {
				status: existingStatus,
			} = await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const {
					status,
				} = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert(
					'Failed to get push token for push notification! Permission was not granted.'
				);
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;

			const permission = await Permissions.askAsync(
				Permissions.NOTIFICATIONS
			);
			if (!permission.granted) return;

			setPushNotificationsToken(token);
		} catch (error) {
			console.log('Error getting a push token', error);
		}
	};

	return [pushNotificationsToken, setPushNotificationsToken];
};
