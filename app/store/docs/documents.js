import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import * as FileSystem from 'expo-file-system';

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

export const deleteDocument = doc => async dispatch => {
	FileSystem.deleteAsync(doc.uri, { idempotent: true });

	dispatch(documentDeleted({ id: doc.id }));
};

export const saveDocument = document => async dispatch => {
	const d = { ...document };
	if (d.id === 'new') {
		d.id = genId();
	}

	FileSystem.copyAsync({
		from: d.uri,
		to: FileSystem.documentDirectory + d.name,
	});

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
