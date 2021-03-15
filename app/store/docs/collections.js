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
export const getCollections = () =>
	createSelector(
		state => state.entities.docs.collections,
		collections => collections.listObject
	);

export const genId = () => '' + Date.now() + lastId++;

export const filterCollectionsByCategoryId = (collectionsObject, id) => {
	const filtered = {};
	Object.keys(collectionsObject).forEach(k => {
		if (collectionsObject[k].categoryId === id)
			filtered[k] = collectionsObject[k];
	});
	return filtered;
};
