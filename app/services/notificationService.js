import * as Notifications from 'expo-notifications';
import logger from '../utils/logger';

let handlerSet = false;

const defaultHandler = async () => ({
	shouldShowAlert: true,
	shouldPlaySound: false,
	shouldSetBadge: false,
});

const cancelAllAsync = async () => {
	await Notifications.cancelAllScheduledNotificationsAsync();
	return await Notifications.getAllScheduledNotificationsAsync();
};
const cancelAsync = async (id) => {
	try {
		await Notifications.cancelScheduledNotificationAsync(id);
	} catch (error) {
		logger.log('Could not cancel notification: ' + error);
	}
};
const setHandler = (handler = defaultHandler) => {
	Notifications.setNotificationHandler({
		handleNotification: handler,
	});
};
const scheduleAsync = async (platform, content, time, repeat = false) => {
	if (!handlerSet) {
		setHandler();
		handlerSet = true;
	}
	let trigger;
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
