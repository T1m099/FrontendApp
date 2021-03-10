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
		disease: '',
	},
	Symptom: {
		disease: '',
	},
};

export const allAdditionalProperties = {
	end: new Date(),
	reminders: [],
	disease: '',
};
