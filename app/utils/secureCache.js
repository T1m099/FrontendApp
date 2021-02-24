import * as SecureStore from 'expo-secure-store';
import logger from './logger';

const store = async (key, value) => {
	await SecureStore.setItemAsync(key, JSON.stringify(value));
};

const load = async (key) => {
	try {
		const res = await SecureStore.getItemAsync(key);
		if (typeof res !== 'string') return null;

		const parsed = JSON.parse(res);
		return parsed;
	} catch (error) {
		logger.log('Loading from secure cache failed: ' + error);
	}
};

const remove = async (key) => {
	await SecureStore.deleteItemAsync(key);
};

export default {
	store,
	load,
	remove,
};
