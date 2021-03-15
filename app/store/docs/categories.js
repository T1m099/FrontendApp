import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const slice = createSlice({
	name: 'categories',
	initialState: {
		listObject: {},
	},
	reducers: {
		categorieSaved: (categories, action) => {
			categories.listObject[action.payload.id] = action.payload;
		},
		categoryDeleted: (categories, action) => {
			delete categories.listObject[action.payload.id];
		},
	},
});

const { categorieSaved, categoryDeleted } = slice.actions;
export default slice.reducer;

// Action Creators

export const deleteCategory = id => async dispatch => {
	dispatch(categoryDeleted({ id }));
};

export const saveCategory = category => async dispatch => {
	const c = { ...category };
	if (c.id === 'new') {
		c.id = genId();
	}

	dispatch(categorieSaved(c));
};

//Selectors
export const getcategories = () =>
	createSelector(
		state => state.entities.categories,
		categories => categories.listObject
	);

export const genId = () => '' + Date.now() + lastId++;
