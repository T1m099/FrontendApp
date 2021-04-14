import { combineReducers } from 'redux';
import eventsReducer from './events';
import medsReducer from './meds';
import docsReducer from './docs';

//reducer for the application data
export default combineReducers({
	events: eventsReducer,
	meds: medsReducer,
	docs: docsReducer,
});
