import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import collectionsReducer from './collections';
import documentsReducer from './documents';

export default combineReducers({
	categories: categoriesReducer,
	collections: collectionsReducer,
	documents: documentsReducer,
});
