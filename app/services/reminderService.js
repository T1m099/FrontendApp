import notificationService from './notificationService';

const NEW_REMINDER_PREFIX = 'new_';

const scheduleReminderNotificationsAsync = async (
	reminders,
	messageDetails,
	os,
	repeats = false
) => {
	return await Promise.all(
		reminders.map(async (r, i) => {
			if (r.id.match('new_')) {
				let id = r.id;
				try {
					id = await notificationService.scheduleAsync(
						os,
						{
							title: messageDetails.title,
							message: messageDetails.description,
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
	return stringifiedReminders.map(r => {
		r.date = new Date(r.date);
		return r;
	});
};

const cancelReminderAsync = async reminder => {
	if (reminder.id && !reminder.id.match(NEW_REMINDER_PREFIX)) {
		await notificationService.cancelAsync(reminder.id);
	}
};

export default {
	scheduleReminderNotificationsAsync,
	parseStringifiedReminders,
	cancelReminderAsync,
	NEW_REMINDER_PREFIX,
};
