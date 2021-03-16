import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

let lastId = 0;

const slice = createSlice({
	name: 'folders',
	initialState: {
		listObject: {},
	},
	reducers: {
		folderSaved: (folders, action) => {
			folders.listObject[action.payload.id] = action.payload;
		},
		folderDeleted: (folders, action) => {
			delete folders.listObject[action.payload.id];
		},
	},
});

const { folderSaved, folderDeleted } = slice.actions;
export default slice.reducer;

// Action Creators

export const deleteFolder = id => async dispatch => {
	dispatch(folderDeleted({ id }));
};

export const saveFolder = folder => async dispatch => {
	const f = { ...folder };
	if (f.id === 'new') {
		f.id = genId();
	}

	dispatch(folderSaved(f));
};

//Selectors
export const getFolders = () =>
	createSelector(
		state => state.entities.docs.folders,
		folders => folders.listObject
	);

export const genId = () => '' + Date.now() + lastId++;

export const filterFoldersByParentId = (foldersObject, id) => {
	const filtered = {};
	Object.keys(foldersObject).forEach(k => {
		if (foldersObject[k].parentId === id) filtered[k] = foldersObject[k];
	});
	return filtered;
};
