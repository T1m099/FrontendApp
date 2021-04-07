import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import * as FileSystem from 'expo-file-system';
import * as filePersistActions from './file';
import { apiCallBegan } from './api';

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
		foldersReceived: (docs, action) => {
			const foldersObject = {};
			action.payload.folders.forEach(folder => {
				foldersObject[folder.id] = folder;
			});
			docs.foldersListObject = foldersObject;
		},
	},
});

const { folderSaved, folderDeleted, foldersReceived } = slice.actions;
export const { documentSaved, documentDeleted } = slice.actions;
export default slice.reducer;

// Action Creators

export const deleteDocument = doc => async dispatch => {
	dispatch(
		apiCallBegan({
			url: 'files',
			method: 'DELETE',
			data: doc,
			onSuccess: filePersistActions.removeFile.type,
		})
	);

	dispatch(documentDeleted({ id: doc.id }));
};
export const deleteFolder = folder => async dispatch => {
	dispatch(
		apiCallBegan({
			url: 'folders',
			method: 'DELETE',
			data: folder,
			onSuccess: folderDeleted.type,
		})
	);
};

export const saveDocument = ({ uri, ...rest }) => async dispatch => {
	const file = await FileSystem.readAsStringAsync(uri, {
		encoding: 'base64',
	});
	const timestamp = Date.now();
	const data = { timestamp, file, ...rest };

	dispatch(
		apiCallBegan({
			url: 'files',
			method: 'POST',
			data,
			onSuccess: filePersistActions.persistFile.type,
		})
	);
};

export const saveFolder = folder => async dispatch => {
	dispatch(
		apiCallBegan({
			url: 'folders',
			method: 'POST',
			data: folder,
			onSuccess: folderSaved.type,
		})
	);
};
export const fetchFolders = () => async dispatch => {
	dispatch(
		apiCallBegan({
			url: 'folders',
			method: 'GET',
			onSuccess: foldersReceived.type,
		})
	);
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
