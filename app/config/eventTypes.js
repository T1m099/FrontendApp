//defining the object structure of event objects and corresponding constants
export const APPOINTMENT = 'Appointment';
export const THERAPY = 'Therapy';
export const SYMPTOM = 'Symptom';
export const TRACKING = 'Tracking';

//all event objects have these basic properties
export const baseEventProperties = {
	id: 'new',
	type: APPOINTMENT,
	markingColor: '#ff0000',
	title: '',
	notes: '',
	time: new Date(),
};

//depending on their type events can have those additional properties
export const eventTypeConditionalProperties = {
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

//a list of all possible additional properties
export const allAdditionalProperties = {
	end: new Date(),
	reminders: [],
	symptoms: [],
	mood: '',
	trackingItems: {},
};

export const types = [APPOINTMENT, SYMPTOM, THERAPY, TRACKING];
export const trackableTypes = [SYMPTOM, TRACKING];

//defining the color options to mark events in the calendar
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

//defining what symptoms are availabe to choose from
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

//defining possible moods for the user to choose from and what number they should be represented with in the timeline screen
export const moods = ['Great', 'Good', 'Okay', 'Meh', 'Bad', 'Terrible'];
export const moodsEvaluation = {
	Great: { val: 6 },
	Good: { val: 5 },
	Okay: { val: 4 },
	Meh: { val: 3 },
	Bad: { val: 2 },
	Terrible: { val: 1 },
};
