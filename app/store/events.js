import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import dayjs from 'dayjs';
import _ from 'lodash';
import { apiCallBegan } from './apiEvents';

import {
	eventTypeConditionalProperties,
	baseEventProperties,
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
		eventsReceived: (events, action) => {
			const eventsObject = {};
			action.payload.events.forEach(e => {
				eventsObject[e.id] = e;
			});
			events.listObject = eventsObject;
		},
	},
});

const { eventSaved, eventDeleted, eventsReceived } = slice.actions;
export default slice.reducer;

// Action Creators

export const deleteEvent = id => async dispatch => {
	dispatch(
		apiCallBegan({
			url: 'events',
			data: id,
			method: 'DELETE',
			onSuccess: eventDeleted.type,
		})
	);
};

export const saveEvent = event => async dispatch => {
	const ev = { ...event };

	const eventStructure = {
		...baseEventProperties,
		...eventTypeConditionalProperties[ev.type],
	};

	const keysToPersist = [...Object.keys(eventStructure)];

	//const eventToSave = _.pick(ev, keysToPersist);
	let eventToSave = {};
	keysToPersist.forEach(k => {
		/* 		if (
			eventStructure[k] !== ev[k] ||
			(Array.isArray(ev[k]) && ev[k].length !== 0)
		) {
		} */
		eventToSave[k] = ev[k];
	});

	//scheduling reminders
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

	if (eventToSave.trackingItems) {
		const newTrackingItems = {};
		Object.keys(eventToSave.trackingItems).forEach(k => {
			newTrackingItems[k] = parseInt(eventToSave.trackingItems[k]);
		});
		eventToSave.trackingItems = newTrackingItems;
	}
	let method = 'PUT';
	if (ev.id === 'new') {
		method = 'POST';
	}

	dispatch(
		apiCallBegan({
			url: 'events',
			data: eventToSave,
			method,
			onSuccess: eventSaved.type,
		})
	);
};

export const fetchEvents = () => async dispatch => {
	dispatch(
		apiCallBegan({
			url: 'events',
			method: 'GET',
			onSuccess: eventsReceived.type,
		})
	);
};

// Selector

// Memoization
// bugs => get unresolved bugs from the cache

export const getEvents = () =>
	createSelector(
		state => state.entities.events,
		events => {
			const eventsToReturn = {};
			Object.keys(events.listObject).forEach(k => {
				const e = { ...events.listObject[k] };
				const event = {
					...baseEventProperties,
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
export const getEventsByType = eventType =>
	createSelector(
		state => state.entities.events,
		events => {
			const eventsToReturn = {};
			Object.keys(events.listObject).forEach(k => {
				if (events.listObject[k].type === eventType) {
					const e = { ...events.listObject[k] };
					const event = {
						...baseEventProperties,
						...allAdditionalProperties,
						end: new Date(e.time + 60 * 60 * 1000),
						...e,
					};

					event.reminders = reminderService.parseStringifiedReminders(
						event.reminders
					);

					eventsToReturn[k] = event;
				}
			});
			return eventsToReturn;
		}
	);
export const getEventsGroupedByTypeAsObject = () =>
	createSelector(
		state => state.entities.events,
		events => {
			const eventsToReturn = {};
			Object.keys(events.listObject).forEach(k => {
				const e = { ...events.listObject[k] };
				const event = {
					...baseEventProperties,
					...allAdditionalProperties,
					end: new Date(e.time + 60 * 60 * 1000),
					...e,
				};

				const { type } = event;
				if (!eventsToReturn[type]) {
					eventsToReturn[type] = {};
				}

				event.reminders = reminderService.parseStringifiedReminders(
					event.reminders
				);

				eventsToReturn[type][k] = event;
			});
			return eventsToReturn;
		}
	);

export const genId = () => '' + Date.now() + lastId++;

export const filterEventsForDay = (events, timestamp) => {
	const found = {};

	Object.keys(events).forEach(k => {
		const e = events[k];
		let eventStart = dayjs(e.time);
		eventStart = eventStart.hour(0);
		eventStart = eventStart.minute(0);
		eventStart = eventStart.second(0);

		let eventEnd = dayjs(e.end);
		eventEnd = eventEnd.hour(23);
		eventEnd = eventEnd.minute(59);
		eventEnd = eventEnd.second(59);

		const date = dayjs(new Date(timestamp));

		if (
			date.isSame(eventStart) ||
			date.isSame(eventEnd) ||
			(date.isAfter(eventStart) && date.isBefore(eventEnd))
		) {
			found[k] = e;
		}
	});
	return found;
};
export const filterEventsBetweenDays = (
	eventsObject,
	startTimestamp,
	endTimestamp
) => {
	const found = {};

	Object.keys(eventsObject).forEach(k => {
		const e = eventsObject[k];
		let eventStart = dayjs(e.time);
		eventStart = eventStart.hour(0);
		eventStart = eventStart.minute(0);
		eventStart = eventStart.second(0);

		let eventEnd = dayjs(e.end);
		eventEnd = eventEnd.hour(23);
		eventEnd = eventEnd.minute(59);
		eventEnd = eventEnd.second(59);

		const startDate = dayjs(new Date(startTimestamp));
		const endDate = dayjs(new Date(endTimestamp));

		if (
			startDate.isSame(eventStart) ||
			endDate.isSame(eventEnd) ||
			(eventStart.isAfter(startDate) && eventEnd.isBefore(endDate))
		) {
			found[k] = e;
		}
	});
	return found;
};
