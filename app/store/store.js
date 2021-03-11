import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducer from './reducer';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
};

export const store = configureStore({
	reducer: persistReducer(persistConfig, reducer),
	middleware: [
		...getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER,
				],
			},
		}),
	],
});
export const persistor = persistStore(store);
