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
	const d = { ...document };
	if (d.id === 'new') {
		d.id = genId();
	}

	dispatch(documentSaved(d));
};

//Selectors
export const getDocuments = () =>
	createSelector(
		state => state.entities.docs.documents,
		documents => documents.listObject
	);

export const genId = () => '' + Date.now() + lastId++;

export const filterDocumentsByParentId = (documentsObject, parentId) => {
	const filtered = {};
	Object.keys(documentsObject).forEach(k => {
		if (documentsObject[k].parentId === parentId)
			filtered[k] = documentsObject[k];
	});
	return filtered;
};
