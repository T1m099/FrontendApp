import { createSlice, action } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const baseSettings = { loading: 0 };

const slice = createSlice({
	name: 'settings',
	initialState: baseSettings,
	reducers: {
		loadingStarted: (settings, action) => {
			settings.loading = settings.loading + 1;
		},
		loadingFinished: (settings, action) => {
			settings.loading =
				settings.loading - 1 > 0 ? settings.loading - 1 : 0;
		},
		settingsReset: (settings, action) => {
			settings = { ...baseSettings };
		},
	},
});

export const { settingsReset, loadingFinished, loadingStarted } = slice.actions;
export default slice.reducer;
export const isLoading = () =>
	createSelector(
		state => state.settings,
		settings => settings.loading > 0
	);
