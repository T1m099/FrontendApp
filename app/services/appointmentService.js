import secureCache from '../utils/secureCache';
import SecureCache from '../utils/secureCache';

const appointmentCacheKey = 'apmntCache';

//could be optimized
const safeAppointment = async (appointment) => {
	const loaded = await secureCache.load(appointmentCacheKey);
	const appointments = Array.isArray(loaded) ? loaded : [];
	appointments.push(appointment);
	await SecureCache.store(appointmentCacheKey, appointments);
};

const loadAppointments = async () => {
	const appointments = await secureCache.load(appointmentCacheKey);
	if (!appointments) return [];
	return appointments;
};
const clearAppointments = async () => {
	await SecureCache.remove(appointmentCacheKey);
	await SecureCache.store(appointmentCacheKey, []);
};

export default {
	safeAppointment,
	loadAppointments,
	clearAppointments,
};
