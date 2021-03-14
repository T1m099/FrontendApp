export const baseEvent = {
	id: 'new',
	type: 'Appointment',
	markingColor: '#ff0000',
	title: '',
	notes: '',
	time: new Date(),
};

export const eventTypes = {
	Appointment: {
		end: new Date(),
		reminders: [],
	},
	Therapy: {
		end: new Date(),
		reminders: [],
		disease: '',
	},
	Disease: {
		end: new Date(),
		symptom: '',
	},
	Symptom: {
		symptom: '',
		mood: '',
	},
};

export const allAdditionalProperties = {
	end: new Date(),
	reminders: [],
	symptom: '',
	mood: '',
};

export const typeNames = Object.keys(eventTypes);

export const markingColors = [
	'#00ff00',
	'#0f0f00',
	'#006CBE',
	'#427505',
	'#C33400',
	'#00345C',
	'#E3CC00',
	'#00A3AE',
	'#CC007E',
	'#684697',
	'#B10E1C',
	'#F9A825',
];

export const symptoms = [
	'Husten',
	'Zäher Schleim',
	'Atemnot',
	'Infekte',
	'Pneumonie',
	'Bauchschmerzen',
	'Verstopfung',
	'Fettige Stühle',
];

export const moods = ['Great', 'Good', 'Okay', 'Meh', 'Bad', 'Terrible'];
