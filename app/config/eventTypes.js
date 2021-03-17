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
	/* Disease: {
		end: new Date(),
		symptom: '',
	}, */
	Symptom: {
		symptoms: [],
		mood: '',
	},
};

export const allAdditionalProperties = {
	end: new Date(),
	reminders: [],
	symptoms: [],
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
	{
		name: 'Atemwegsbeschwerden',
		children: [
			{ name: 'Husten' },
			{ name: 'Zäher Schleim' },
			{ name: 'Atemnot' },
			{ name: 'Infekte' },
			{ name: 'Pneumonie' },
		],
	},
	{
		name: 'Verdauungsprobleme',
		children: [
			{ name: 'Bauchschmerzen' },
			{ name: 'Verstopfung' },
			{ name: 'Fettige Stühle' },
		],
	},
];

export const moods = ['Great', 'Good', 'Okay', 'Meh', 'Bad', 'Terrible'];
