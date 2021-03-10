import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import dayjs from 'dayjs';
import _ from 'lodash';

import {
	eventTypes,
	baseEvent,
	allAdditionalProperties,
} from '../config/eventTypes';
import reminderService from '../services/reminderService';

let lastId = 0;

const slice = createSlice({
	name: 'events',
	initialState: {
		listObject: {},
	},
	reducers: {
		eventSaved: (events, action) => {
			events.listObject[action.payload.id] = action.payload;
		},
		eventDeleted: (events, action) => {
			delete events.listObject[action.payload.id];
		},
	},
});

export const { eventSaved, eventDeleted } = slice.actions;
export default slice.reducer;

// Action Creators

export const saveEvent = event => async dispatch => {
	const ev = { ...event };
	if (ev.id === 'new') {
		ev.id = genId();
	}

	const keysToPersist = [
		...Object.keys(baseEvent),
		...Object.keys(eventTypes[ev.type]),
	];

	const eventToSave = _.pick(ev, keysToPersist);

	if (eventToSave.reminders) {
		reminderService.cancelRemindersAsync(eventToSave.reminders);

		eventToSave.reminders = await reminderService.scheduleReminderNotificationsAsync(
			eventToSave.reminders,
			eventToSave.title,
			eventToSave.notes
		);

		eventToSave.reminders = reminderService.makeRemindersSerializable(
			eventToSave.reminders
		);
	}

	if (eventToSave.end) {
		eventToSave.end = eventToSave.end.getTime();
	}
	eventToSave.time = eventToSave.time.getTime();

	dispatch(eventSaved(eventToSave));
};

// Selector

// Memoization
// bugs => get unresolved bugs from the cache

export const getEvents = () =>
	createSelector(
		state => state.entities.events,
		events => {
			const eventsToReturn = {};
			Object.keys(events.listObject).map(k => {
				const e = { ...events.listObject[k] };
				const event = {
					...baseEvent,
					...allAdditionalProperties,
					end: new Date(e.time + 60 * 60 * 1000),
					...e,
				};

				event.reminders = reminderService.parseStringifiedReminders(
					event.reminders
				);

				eventsToReturn[k] = event;
			});
			return eventsToReturn;
		}
	);

export const genId = () => '' + Date.now() + lastId++;

export const filterDaysEvents = (events, dayTimestamp) => {
	const found = {};

	Object.keys(events).forEach(k => {
		const e = events[k];
		let start = dayjs(e.start);
		start = start.hour(0);
		start = start.minute(0);
		start = start.second(0);

		let end = dayjs(e.end);
		end = end.hour(23);
		end = end.minute(59);
		end = end.second(59);

		const date = dayjs(new Date(dayTimestamp));

		if (
			date.isSame(start) ||
			date.isSame(end) ||
			(date.isAfter(start) && date.isBefore(end))
		) {
			found[k] = e;
		}
	});
	return found;
};
