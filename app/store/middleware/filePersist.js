import * as FileSystem from 'expo-file-system';

import * as actions from '../fileEvents';
import * as docActions from '../docs';

//redux middleware that handles file persistion
const filePersist = ({ dispatch, getState }) => next => async action => {
	if (
		action.type !== actions.persistFile.type &&
		action.type !== actions.removeFile.type &&
		action.type !== actions.compareFilesWithBackend.type
	) {
		return next(action);
	}

	const { name, file, ...rest } = action.payload;
	const uri = FileSystem.documentDirectory + name;

	try {
		switch (action.type) {
			//writing a file to the filesystem as a string
			case actions.persistFile.type:
				await FileSystem.writeAsStringAsync(uri, file, {
					encoding: 'base64',
				});
				dispatch(docActions.documentSaved({ name, ...rest, uri }));
				break;
			//deleting a file from the filesystem
			case actions.removeFile.type:
				await FileSystem.deleteAsync(uri, { idempotent: true });
				dispatch(docActions.documentDeleted({ name, ...rest, uri }));
				break;
			//checking if all files from the backend are locally stored
			case actions.compareFilesWithBackend.type:
				const persistedFiles = await FileSystem.readDirectoryAsync(
					FileSystem.documentDirectory
				);
				const localFilesObject = {
					...getState().entities.docs.filesListObject,
				};

				action.payload.fileMetaData.forEach(fmd => {
					//if a file on the backend is newer that the local version, download the new version and replace the old one
					if (localFilesObject[fmd.id]?.timestamp !== fmd.timestamp) {
						dispatch(docActions.fetchDocument(fmd));
					}
				});
				const remoteFileIDs = action.payload.fileMetaData.map(
					fmd => fmd.id
				);
				//delete all local files that have not been uploaded to the backend
				//if this happens it means a user was logged in using a differnt account. With the new account he should not have access to those files
				Object.values(localFilesObject).forEach(file => {
					if (!remoteFileIDs.includes(file.id)) {
						dispatch(actions.removeFile(file));
					}
				});

				const localFileUris = Object.values(localFilesObject).map(
					file => file.uri
				);
				//deleting files in the file system that have no representation in the store
				persistedFiles.forEach(filename => {
					const uri = FileSystem.documentDirectory + filename;
					if (!localFileUris.includes(uri)) {
						FileSystem.deleteAsync(uri);
					}
				});

				await FileSystem.deleteAsync(uri, { idempotent: true });
				dispatch(docActions.documentDeleted({ name, ...rest, uri }));
				break;
		}
	} catch (error) {
		console.log(error);
	}
};

export default filePersist;
