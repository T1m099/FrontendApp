import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const slice = createSlice({
	name: 'collections',
	initialState: {
		listObject: {},
	},
	reducers: {
		collectionSaved: (collections, action) => {
			collections.listObject[action.payload.id] = action.payload;
		},
		collectionDeleted: (collections, action) => {
			delete collections.listObject[action.payload.id];
		},
	},
});

const { collectionSaved, collectionDeleted } = slice.actions;
export default slice.reducer;

// Action Creators

export const deleteCollection = id => async dispatch => {
	dispatch(collectionDeleted({ id }));
};

export const saveCollection = collection => async dispatch => {
	const c = { ...collection };
	if (c.id === 'new') {
		c.id = genId();
	}

	dispatch(collectionSaved(c));
};

//Selectors
export const getcollections = () =>
	createSelector(
		state => state.entities.collections,
		collections => collections.listObject
	);

export const genId = () => '' + Date.now() + lastId++;
