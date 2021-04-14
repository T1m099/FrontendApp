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
import { encryptTransform } from 'redux-persist-transform-encrypt';

import api from './middleware/api';
import filePersist from './middleware/filePersist';
import reducer from './reducer';

//function to set up the redux store, including persistion, encryption and middleware
export default function (encryptionKey = 'unsecureKey') {
	const encrypt = encryptTransform({
		secretKey: encryptionKey,
		onError: function (error) {
			console.log('Encryption Error! Damn it!');
		},
	});
	//configurign how the store should be persisted
	const persistConfig = {
		key: 'root',
		storage: AsyncStorage,
		transforms: [encrypt],
	};

	const store = configureStore({
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
			api,
			filePersist,
		],
	});
	const persistor = persistStore(store);

	return { store, persistor };
}
