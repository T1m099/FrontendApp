import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const slice = createSlice({
	name: 'documents',
	initialState: {
		listObject: {},
	},
	reducers: {
		documentSaved: (documents, action) => {
			documents.listObject[action.payload.id] = action.payload;
		},
		documentDeleted: (documents, action) => {
			delete documents.listObject[action.payload.id];
		},
	},
});

const { documentSaved, documentDeleted } = slice.actions;
export default slice.reducer;

// Action Creators

export const deleteDocument = id => async dispatch => {
	dispatch(documentDeleted({ id }));
};

export const saveDocument = document => async dispatch => {
	const c = { ...document };
	if (c.id === 'new') {
		c.id = genId();
	}

	dispatch(documentSaved(c));
};

//Selectors
export const getDocuments = () =>
	createSelector(
		state => state.entities.documents,
		documents => documents.listObject
	);

export const genId = () => '' + Date.now() + lastId++;
