import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import reminderService from '../services/reminderService';

let lastId = 0;

const slice = createSlice({
	name: 'meds',
	initialState: {
		listObject: {},
	},
	reducers: {
		medItemSaved: (meds, action) => {
			meds.listObject[action.payload.id] = action.payload;
		},
		medItemDeleted: (meds, action) => {
			delete meds.listObject[action.payload.id];
		},
	},
});

export const { medItemSaved, medItemDeleted } = slice.actions;
export default slice.reducer;

export const saveMedItem = medItem => async dispatch => {
	const mi = { ...medItem };

	//cancel all scheduled notifications for the edited item, in case there are any
	mi.reminders.forEach(r => {
		if (!r.id.match(reminderService.NEW_REMINDER_PREFIX)) {
			reminderService.cancelReminderAsync(r);
		}
		return r;
	});

	//checking if reminders are new and schedule notifications for them
	mi.reminders = await reminderService.scheduleReminderNotificationsAsync(
		mi.reminders,
		mi,
		Platform.OS
	);

	mi.reminders = mi.reminders.map(r => {
		r.date = r.date.getTime();
		return r;
	});

	dispatch(medItemSaved(mi));
};

//Selectors
export const getMeds = () =>
	createSelector(
		state => state.entities.meds,
		meds => {
			const medications = JSON.parse(JSON.stringify(meds.listObject));

			Object.keys(medications).forEach(k => {
				medications[k].reminders = medications[k].reminders.map(r => {
					r.date = new Date(r.date);
					return r;
				});
			});

			return medications;
		}
	);

export const genId = () => '' + Date.now() + lastId++;
