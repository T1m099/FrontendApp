import { combineReducers } from 'redux';
import eventsReducer from './events';
import medsReducer from './meds';

export default combineReducers({
	events: eventsReducer,
	meds: medsReducer,
});
