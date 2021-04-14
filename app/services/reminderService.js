import Constants from 'expo-constants';

import notificationService from './notificationService';

const NEW_REMINDER_PREFIX = 'new_';

//collection of functions that help with creating reminders

//function to schedule multiple reminders
const scheduleReminderNotificationsAsync = async (
	reminders,
	title,
	description,
	repeats = false
) => {
	return await Promise.all(
		reminders.map(async (r, i) => {
			//only reminders that do not have a valid id yet (which are not scheduled) are scheduled
			if (r.id.match('new_')) {
				let id = r.id;
				try {
					//scheduling the reminder as a notification
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

//function to rehydrate reminders which have been stringyfied
const parseStringifiedReminders = stringifiedReminders => {
	return stringifiedReminders.map(reminder => {
		const r = { ...reminder };
		r.date = new Date(reminder.date);
		return r;
	});
};

//function to cancel a reminder
const cancelReminderAsync = async reminder => {
	if (reminder.id && !reminder.id.match(NEW_REMINDER_PREFIX)) {
		await notificationService.cancelAsync(reminder.id);
	}
};
//function to cancel multiple reminders
const cancelRemindersAsync = async reminders => {
	reminders.forEach(async r => {
		if (!r.id.match(NEW_REMINDER_PREFIX)) {
			await cancelReminderAsync(r);
		}
	});
};
//function to make reminders serializable so they can be persisted
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
