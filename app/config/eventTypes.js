export const APPOINTMENT = 'Appointment';
export const THERAPY = 'Therapy';
export const SYMPTOM = 'Symptom';
export const TRACKING = 'Tracking';

export const baseEvent = {
	id: 'new',
	type: APPOINTMENT,
	markingColor: '#ff0000',
	title: '',
	notes: '',
	time: new Date(),
};

export const eventTypes = {
	[APPOINTMENT]: {
		end: new Date(),
		reminders: [],
	},
	[THERAPY]: {
		end: new Date(),
		reminders: [],
		disease: '',
	},
	[SYMPTOM]: {
		symptoms: [],
		mood: '',
	},
	[TRACKING]: {
		trackingItems: {},
	},
};

export const allAdditionalProperties = {
	end: new Date(),
	reminders: [],
	symptoms: [],
	mood: '',
	trackingItems: {},
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
export const moodsEvaluation = {
	Great: { val: 6 },
	Good: { val: 5 },
	Okay: { val: 4 },
	Meh: { val: 3 },
	Bad: { val: 2 },
	Terrible: { val: 1 },
};
/* export const trackingItem = {
	category: '',
	unit: '',
	value: '',
};
 */
