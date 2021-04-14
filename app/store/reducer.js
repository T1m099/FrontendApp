import { combineReducers } from 'redux';
import entitiesReducer from './entities';
import authReducer from './auth';
import settingReducer from './settings';

//main redux reducer combining all other reducers
export default combineReducers({
	entities: entitiesReducer,
	auth: authReducer,
	settings: settingReducer,
});
