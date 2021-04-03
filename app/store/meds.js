import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

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
		medsReceived: (meds, action) => {
			const medsObject = {};
			action.payload.medications.forEach(d => {
				medsObject[d.id] = d;
			});
			meds.listObject = medsObject;
		},
	},
});

const { medItemSaved, medItemDeleted, medsReceived } = slice.actions;
export default slice.reducer;

export const deleteMedItem = id => async dispatch => {
	dispatch(
		apiCallBegan({
			url: 'medications',
			data: id,
			method: 'DELETE',
			onSuccess: medItemDeleted.type,
		})
	);
};

export const saveMedItem = medItem => async dispatch => {
	const mi = { ...medItem };

	//cancel all scheduled notifications for the edited item, in case there are any
	reminderService.cancelRemindersAsync(mi.reminders);

	//checking if reminders are new and schedule notifications for them
	mi.reminders = await reminderService.scheduleReminderNotificationsAsync(
		mi.reminders,
		mi.title,
		mi.description
	);

	mi.reminders = reminderService.makeRemindersSerializable(mi.reminders);

	let method = 'PUT';
	if (mi.id === 'new') {
		method = 'POST';
	}

	dispatch(
		apiCallBegan({
			url: 'medications',
			data: mi,
			method,
			onSuccess: medItemSaved.type,
		})
	);
};

export const fetchMeds = () => async dispatch => {
	dispatch(
		apiCallBegan({
			url: 'medications',
			method: 'GET',
			onSuccess: medsReceived.type,
		})
	);
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
