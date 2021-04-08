import * as FileSystem from 'expo-file-system';

import * as actions from '../fileEvents';
import * as docActions from '../docs';

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
			case actions.persistFile.type:
				await FileSystem.writeAsStringAsync(uri, file, {
					encoding: 'base64',
				});
				dispatch(docActions.documentSaved({ name, ...rest, uri }));
				break;
			case actions.removeFile.type:
				await FileSystem.deleteAsync(uri, { idempotent: true });
				dispatch(docActions.documentDeleted({ name, ...rest, uri }));
				break;
			case actions.compareFilesWithBackend.type:
				const persistedFiles = await FileSystem.readDirectoryAsync(
					FileSystem.documentDirectory
				);
				const localFilesObject = {
					...getState().entities.docs.filesListObject,
				};

				action.payload.fileMetaData.forEach(fmd => {
					if (localFilesObject[fmd.id]?.timestamp !== fmd.timestamp) {
						dispatch(docActions.fetchDocument(fmd));
					}
				});
				const remoteFileIDs = action.payload.fileMetaData.map(
					fmd => fmd.id
				);
				Object.values(localFilesObject).forEach(file => {
					if (!remoteFileIDs.includes(file.id)) {
						dispatch(actions.removeFile(file));
					}
				});

				const localFileUris = Object.values(localFilesObject).map(
					file => file.uri
				);
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
