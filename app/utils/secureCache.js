import * as SecureStore from 'expo-secure-store';
import logger from './logger';

//saving a key value pair securely
const store = async (key, value) => {
	await SecureStore.setItemAsync(key, JSON.stringify(value));
};

//loading a key value pair
const load = async key => {
	try {
		const res = await SecureStore.getItemAsync(key);
		if (typeof res !== 'string') return null;

		const parsed = JSON.parse(res);
		return parsed;
	} catch (error) {
		logger.log('Loading from secure cache failed: ' + error);
	}
};

//deleting a key value pair
const remove = async key => {
	await SecureStore.deleteItemAsync(key);
};

export default {
	store,
	load,
	remove,
};
