import { createSlice, action } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const baseSettings = { loading: 0 };

//redux store slice for settings
const slice = createSlice({
	name: 'settings',
	initialState: baseSettings,
	reducers: {
		//counting how many api calls are currently active
		loadingStarted: (settings, action) => {
			settings.loading = settings.loading + 1;
		},
		//Decresing how many api calls are currently active
		loadingFinished: (settings, action) => {
			settings.loading =
				settings.loading - 1 > 0 ? settings.loading - 1 : 0;
		},
		//resetting the current settings
		settingsReset: (settings, action) => {
			settings = { ...baseSettings };
		},
	},
});

export const { settingsReset, loadingFinished, loadingStarted } = slice.actions;
export default slice.reducer;
//function to check whether there are any active api calls
export const isLoading = () =>
	createSelector(
		state => state.settings,
		settings => settings.loading > 0
	);
