import Constants from 'expo-constants';

import notificationService from './notificationService';

const NEW_REMINDER_PREFIX = 'new_';

const scheduleReminderNotificationsAsync = async (
	reminders,
	title,
	description,
	repeats = false
) => {
	return await Promise.all(
		reminders.map(async (r, i) => {
			if (r.id.match('new_')) {
				let id = r.id;
				try {
					id = await notificationService.scheduleAsync(
						Object.keys(Constants.platform)[0] === 'android'
							? 'android'
							: 'ios',
						{
							title: title,
							message: description,
						},
						r.date,
						repeats
					);
				} catch (error) {
					console.log(error);
				}

				r.id = id;
			}
			return r;
		})
	);
};

const parseStringifiedReminders = stringifiedReminders => {
	return stringifiedReminders.map(reminder => {
		const r = { ...reminder };
		r.date = new Date(reminder.date);
		return r;
	});
};

const cancelReminderAsync = async reminder => {
	if (reminder.id && !reminder.id.match(NEW_REMINDER_PREFIX)) {
		await notificationService.cancelAsync(reminder.id);
	}
};
const cancelRemindersAsync = async reminders => {
	reminders.forEach(async r => {
		if (!r.id.match(NEW_REMINDER_PREFIX)) {
			await cancelReminderAsync(r);
		}
	});
};
const makeRemindersSerializable = reminders => {
	return reminders.map(r => {
		r.date = r.date.getTime();
		return r;
	});
};

export default {
	scheduleReminderNotificationsAsync,
	parseStringifiedReminders,
	cancelReminderAsync,
	cancelRemindersAsync,
	makeRemindersSerializable,
	NEW_REMINDER_PREFIX,
};
