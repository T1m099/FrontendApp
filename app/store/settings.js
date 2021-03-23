import { createSlice, action } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const baseSettings = {
	trackingCategories: [{ category: 'Blutzucker', unit: 'mg' }],
};

const slice = createSlice({
	name: 'settings',
	initialState: baseSettings,
	reducers: {
		trackingCategoryAdded: (settings, action) => {
			settings.trackingCategories.push(action.payload);
		},
		trackingCategoryRemoved: (settings, action) => {
			settings.trackingCategories = settings.trackingCategories.filter(
				c => c.category !== action.payload.category
			);
		},
		settingsReset: (settings, action) => {
			settings.credentials = { ...baseSettings };
		},
	},
});

const {
	trackingCategoryAdded,
	trackingCategoryRemoved,
	settingsReset,
} = slice.actions;
export default slice.reducer;

export const addTrackingCategory = category => async dispatch => {
	dispatch(trackingCategoryAdded(category));
};
export const removeTrackingCategory = category => async dispatch => {
	dispatch(trackingCategoryRemoved(category));
};

//Selectors
export const getTrackingCategories = () =>
	createSelector(
		state => state.settings,
		settings => settings.trackingCategories
	);
