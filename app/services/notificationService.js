import * as Notifications from 'expo-notifications';
import logger from '../utils/logger';

let handlerSet = false;

//collection of various functions that help with scheduling notifications

const defaultHandler = async () => ({
	shouldShowAlert: true,
	shouldPlaySound: false,
	shouldSetBadge: false,
});

//function to cancel all scheduled notification
const cancelAllAsync = async () => {
	await Notifications.cancelAllScheduledNotificationsAsync();
	return await Notifications.getAllScheduledNotificationsAsync();
};
//function to cancel one specific notification
const cancelAsync = async id => {
	try {
		await Notifications.cancelScheduledNotificationAsync(id);
	} catch (error) {
		logger.log('Could not cancel notification: ' + error);
	}
};
//function to set a notification handler that defines how notifications are displayed
const setHandler = (handler = defaultHandler) => {
	Notifications.setNotificationHandler({
		handleNotification: handler,
	});
};
//function to schedule a notification
const scheduleAsync = async (platform, content, time, repeat = false) => {
	if (!handlerSet) {
		setHandler();
		handlerSet = true;
	}
	let trigger;
	//depending on the platform notificaitons have to be scheduled differently
	if (platform === 'android') {
		if (repeat) {
			trigger = {
				hour: time.getHours(),
				minute: time.getMinutes(),
				repeats: true,
			};
		} else {
			trigger = time;
		}
	} else {
		trigger = {
			type: 'calendar',
			repeats: repeat,
			dateComponents: {
				hour: time.getHours(),
				minute: time.getMinutes(),
			},
		};
	}
	return await Notifications.scheduleNotificationAsync({
		content,
		trigger,
	});
};

export default {
	cancelAllAsync,
	setHandler,
	scheduleAsync,
	cancelAsync,
};
