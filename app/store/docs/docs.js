import { combineReducers } from 'redux';
import foldersReducer from './folders';
import documentsReducer from './documents';

export default combineReducers({
	folders: foldersReducer,
	documents: documentsReducer,
});
