import secureCache from '../utils/secureCache';

const medsCacheKey = 'medsCache';

const save = async (meds) => {
	await secureCache.store(medsCacheKey, Array.isArray(meds) ? meds : []);
};
const load = async () => {
	const loaded = await secureCache.load(medsCacheKey);
	return Array.isArray(loaded) ? loaded : [];
};
const clear = async () => {
	await secureCache.remove(medsCacheKey);
	await secureCache.store(medsCacheKey, []);
};

export default {
	save,
	load,
	clear,
};
