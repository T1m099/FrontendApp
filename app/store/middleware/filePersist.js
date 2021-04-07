import * as FileSystem from 'expo-file-system';

import * as actions from '../file';
import * as docActions from '../docs';

const filePersist = ({ dispatch, getState }) => next => async action => {
	if (
		action.type !== actions.persistFile.type &&
		action.type !== actions.removeFile.type
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
		}
	} catch (error) {
		console.log(error);
	}
};

export default filePersist;
