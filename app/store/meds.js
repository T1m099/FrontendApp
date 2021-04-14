import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './apiEvents';

import reminderService from '../services/reminderService';

let lastId = 0;

//redux store slice for medications
const slice = createSlice({
	name: 'meds',
	initialState: {
		listObject: {},
	},
	reducers: {
		//handling saving a med item
		medItemSaved: (meds, action) => {
			meds.listObject[action.payload.id] = action.payload;
		},
		//handling deleting a med item
		medItemDeleted: (meds, action) => {
			delete meds.listObject[action.payload.id];
		},
		//synchronizing local meds with the meds received from the server
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

//function to trigger an api call to delete a med item
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

////function to trigger an api call to save a med item
export const saveMedItem = medItem => async dispatch => {
	const mi = { ...medItem };

	//cancel all scheduled notifications for the edited item, in case there are any
	reminderService.cancelRemindersAsync(mi.reminders);

	//checking if reminders are new and schedule notifications for them
	mi.reminders = await reminderService.scheduleReminderNotificationsAsync(
		mi.reminders,
		mi.title,
		mi.description,
		true
	);
	//making reminders serializable
	mi.reminders = reminderService.makeRemindersSerializable(mi.reminders);

	let method = 'PUT';
	if (mi.id === 'new') {
		method = 'POST';
	}

	//triggering the call
	dispatch(
		apiCallBegan({
			url: 'medications',
			data: mi,
			method,
			onSuccess: medItemSaved.type,
		})
	);
};

//function to fetch all meds from the server for synchronization
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
//function to get all meds
export const getMeds = () =>
	createSelector(
		state => state.entities.meds,
		meds => {
			const medications = JSON.parse(JSON.stringify(meds.listObject));
			//rehydrating persisted reminders
			Object.keys(medications).forEach(k => {
				medications[k].reminders = medications[k].reminders.map(r => {
					r.date = new Date(r.date);
					return r;
				});
			});

			return medications;
		}
	);

//function to generate a unique id
export const genId = () => '' + Date.now() + lastId++;
