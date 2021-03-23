import { combineReducers } from 'redux';
import entitiesReducer from './entities';
import authReducer from './auth';
import settingReducer from './settings';

export default combineReducers({
	entities: entitiesReducer,
	auth: authReducer,
	settings: settingReducer,
});
