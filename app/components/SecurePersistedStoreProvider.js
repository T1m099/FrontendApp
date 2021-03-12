import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Buffer } from 'buffer';
import * as Random from 'expo-random';
import * as SecureStore from 'expo-secure-store';

import configureStore from '../store/configureStore';

function SecurePersistedStoreProvider({ children }) {
	const ENCRYPTION_KEY_NAME = 'STORE_PERSIST_ENCRYPTION_KEY';
	const [storeEncryptionKey, setStoreEncryptionKey] = useState();

	const getEncryptionKey = async storedKeyName => {
		// check for existing credentials
		const existingCredentials = await SecureStore.getItemAsync(
			storedKeyName
		);
		if (existingCredentials) {
			return existingCredentials;
		}
		//if there are no existing credentails, generate some and store them
		const key = Buffer.from(
			await Random.getRandomBytesAsync(64),
			'utf-8'
		).toString('base64');
		// generate new credentials
		await SecureStore.setItemAsync(storedKeyName, key);
		if (key) {
			return key;
		}
	};

	const setupKey = async () => {
		setStoreEncryptionKey(await getEncryptionKey(ENCRYPTION_KEY_NAME));
	};

	useEffect(() => {
		setupKey();
	}, []);

	const { store, persistor } = configureStore();

	if (!storeEncryptionKey) return null;
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}

export default SecurePersistedStoreProvider;
