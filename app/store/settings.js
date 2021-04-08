import { createSlice, action } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const baseSettings = {};

const slice = createSlice({
	name: 'settings',
	initialState: baseSettings,
	reducers: {
		settingsReset: (settings, action) => {
			settings.credentials = { ...baseSettings };
		},
	},
});

const { settingsReset } = slice.actions;
export default slice.reducer;
