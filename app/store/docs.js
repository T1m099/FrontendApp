import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import * as FileSystem from 'expo-file-system';
import * as filePersistActions from './fileEvents';
import { apiCallBegan } from './apiEvents';

let lastId = 0;

//redux store slice for documents and folders
const slice = createSlice({
	name: 'docs',
	initialState: {
		foldersListObject: {},
		filesListObject: {},
	},
	reducers: {
		//reducer to handle document saving
		documentSaved: (docs, action) => {
			docs.filesListObject[action.payload.id] = action.payload;
		},
		//reduxer to handle document deletion
		documentDeleted: (docs, action) => {
			delete docs.filesListObject[action.payload.id];
		},
		//reducer to handle saving a folder
		folderSaved: (docs, action) => {
			docs.foldersListObject[action.payload.id] = action.payload;
		},
		//reduxer to handle folder deletion
		folderDeleted: (docs, action) => {
			//if a folder is deleted, all its children are added to its parent folder rather than to delete them
			Object.keys(docs.foldersListObject).forEach(k => {
				if (docs.foldersListObject[k].parentId === action.payload.id) {
					docs.foldersListObject[k].parentId =
						docs.foldersListObject[action.payload.id].parentId;
				}
			});
			delete docs.foldersListObject[action.payload.id];
		},
		//reducer to update the local folders with the data from the server
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

//function to trigger an api call to delete a document
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
//function to trigger an api call to delete a folder
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

//function to trigger an api call to upload a document to the backend
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

//function to trigger an api call to save a folder
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

//function to fetch all folders from the backend
export const fetchFolders = () => async dispatch => {
	dispatch(
		apiCallBegan({
			url: 'folders',
			method: 'GET',
			onSuccess: foldersReceived.type,
		})
	);
};
//function to fetch all documents from the backend (only the meta data, the actual files have to be downloaded individually)
export const fetchDocuments = () => async dispatch => {
	dispatch(
		apiCallBegan({
			url: 'files',
			method: 'GET',
			onSuccess: filePersistActions.compareFilesWithBackend.type,
		})
	);
};
//funtion to download a file from the backen
export const fetchDocument = file => async dispatch => {
	dispatch(
		apiCallBegan({
			url: 'files/download',
			method: 'POST',
			data: file,
			onSuccess: filePersistActions.persistFile.type,
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
