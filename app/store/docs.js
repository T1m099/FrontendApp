import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import * as FileSystem from 'expo-file-system';

let lastId = 0;

const slice = createSlice({
	name: 'docs',
	initialState: {
		foldersListObject: {},
		filesListObject: {},
	},
	reducers: {
		documentSaved: (docs, action) => {
			docs.filesListObject[action.payload.id] = action.payload;
		},
		documentDeleted: (docs, action) => {
			delete docs.filesListObject[action.payload.id];
		},
		folderSaved: (docs, action) => {
			docs.foldersListObject[action.payload.id] = action.payload;
		},
		folderDeleted: (docs, action) => {
			Object.keys(docs.foldersListObject).forEach(k => {
				if (docs.foldersListObject[k].parentId === action.payload.id) {
					docs.foldersListObject[k].parentId =
						docs.foldersListObject[action.payload.id].parentId;
				}
			});
			delete docs.foldersListObject[action.payload.id];
		},
	},
});

const {
	documentSaved,
	documentDeleted,
	folderSaved,
	folderDeleted,
} = slice.actions;
export default slice.reducer;

// Action Creators

export const deleteDocument = doc => async dispatch => {
	FileSystem.deleteAsync(doc.uri, { idempotent: true });

	dispatch(documentDeleted({ id: doc.id }));
};
export const deleteFolder = id => async dispatch => {
	dispatch(folderDeleted({ id }));
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

export const saveFolder = folder => async dispatch => {
	const f = { ...folder };
	if (f.id === 'new') {
		f.id = genId();
	}

	dispatch(folderSaved(f));
};

//Selectors
export const getDocuments = () =>
	createSelector(
		state => state.entities.docs,
		docs => docs.filesListObject
	);
export const getFolders = () =>
	createSelector(
		state => state.entities.docs,
		docs => docs.foldersListObject
	);

export const genId = () => '' + Date.now() + lastId++;

export const filterElementsByParentId = (elementsObject, parentId) => {
	const filtered = {};
	Object.keys(elementsObject).forEach(k => {
		if (elementsObject[k].parentId === parentId)
			filtered[k] = elementsObject[k];
	});
	return filtered;
};
