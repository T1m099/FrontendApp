import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import dayjs from 'dayjs';

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

// Selector

// Memoization
// bugs => get unresolved bugs from the cache

export const getEvents = () =>
	createSelector(
		state => state.entities.events,
		events => events.listObject
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
