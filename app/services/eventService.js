import SecureCache from '../utils/secureCache';

const eventCacheKey = 'apmntCache';

//could be optimized
const safeEvent = async event => {
	const loaded = await SecureCache.load(eventCacheKey);
	const events = Array.isArray(loaded) ? loaded : [];

	const eventToSave = { ...event };
	//simulating the id from the database
	if (event.id === 'new') {
		eventToSave.id = '' + Date.now() + Math.floor(Math.random() * 100000);
	}

	const index = events.findIndex(e => e.id === event.id);
	if (index === -1) {
		events.push(eventToSave);
	} else {
		events[index] = eventToSave;
	}

	await SecureCache.store(eventCacheKey, events);

	return eventToSave;
};
const safeEvents = async event => {
	try {
		await SecureCache.store(
			eventCacheKey,
			Array.isArray(event) ? event : []
		);
	} catch (error) {
		alert('Events could not be safed.');
	}
};

const loadEvents = async () => {
	const events = await SecureCache.load(eventCacheKey);
	if (!events) return [];
	return events;
};
const deleteEvent = async event => {
	let events = await loadEvents();
	events = events.filter(e => e.id !== event.id);

	await safeEvents(events);
	return event;
};
const clearEvents = async () => {
	await SecureCache.remove(eventCacheKey);
	await SecureCache.store(eventCacheKey, []);
};

export default {
	safeEvent,
	safeEvents,
	loadEvents,
	deleteEvent,
	clearEvents,
};
