import SecureCache from '../utils/secureCache';

const appointmentCacheKey = 'apmntCache';

//could be optimized
const safeAppointment = async (appointment) => {
	const loaded = await SecureCache.load(appointmentCacheKey);
	const appointments = Array.isArray(loaded) ? loaded : [];
	appointments.push(appointment);
	await SecureCache.store(appointmentCacheKey, appointments);
};
const safeAppointments = async (appointments) => {
	await SecureCache.store(
		appointmentCacheKey,
		Array.isArray(appointments) ? appointments : []
	);
};

const loadAppointments = async () => {
	const appointments = await SecureCache.load(appointmentCacheKey);
	if (!appointments) return [];
	return appointments;
};
const clearAppointments = async () => {
	await SecureCache.remove(appointmentCacheKey);
	await SecureCache.store(appointmentCacheKey, []);
};

export default {
	safeAppointment,
	safeAppointments,
	loadAppointments,
	clearAppointments,
};
