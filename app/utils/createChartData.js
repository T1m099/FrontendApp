import * as eventTypes from '../config/eventTypes';

//function to create chart data point out of the stored events
export const createChartData = (events, type) => {
	const eventsOrderedByDayArray = orderEventsByDay(events);

	return mappingAlgorithms[type](eventsOrderedByDayArray);
};

//function to sort events by their starting time
function orderEventsByDay(eventsObject) {
	let eventsOrderedByDay = [];
	eventsOrderedByDay = [...Object.values(eventsObject)];
	eventsOrderedByDay.sort((a, b) => {
		const startE1 = Math.trunc((a.time / 24) * 60 * 60 * 1000);
		const startE2 = Math.trunc((b.time / 24) * 60 * 60 * 1000);

		return startE1 - startE2;
	});
	return eventsOrderedByDay;
}

//a collection of mapping algorithms, one for every event type with a timeline representation
const mappingAlgorithms = {
	[eventTypes.SYMPTOM]: eventsOrderedByDayArray => {
		//algorithm to map symptom events to data points
		const mapped = {
			datasets: [],
			legend: ['Sympoms tracked', 'Mood'],
		};
		//counting how many symptoms have been tracked in this event
		const symptomCount = [];
		eventsOrderedByDayArray.forEach(e => {
			symptomCount.push(e.symptoms.length);
		});
		//making a number out of the selected mood for this event
		const moods = [];
		eventsOrderedByDayArray.forEach(e => {
			const val = e.mood ? eventTypes.moodsEvaluation[e.mood].val : 0;
			moods.push(val);
		});

		//pushing the symptom count and the mood into an array of data points
		mapped.datasets.push({
			data: symptomCount,
			color: () => `rgba(134, 65, 244, 1)`,
		});
		mapped.datasets.push({ data: moods });

		return mapped;
	},
	[eventTypes.TRACKING]: eventsOrderedByDayArray => {
		//function to generate data points for tracking events
		const datasetsObject = {};
		const legend = [];

		eventsOrderedByDayArray.forEach(e => {
			if (!e.trackingItems) return;
			//creating one graph for all different tracking items
			Object.keys(e.trackingItems).forEach(k => {
				if (!datasetsObject[k]) {
					datasetsObject[k] = [];
					legend.push(k);
				}
				datasetsObject[k].push(e.trackingItems[k]);
			});
		});

		const mapped = {
			datasets: [],
			legend: [],
		};
		//adding a label to show which graph belongs to which tracked item
		legend.forEach(label => {
			mapped.datasets.push({
				data: datasetsObject[label],
				color: generateColorReturningFunction(),
			});
			mapped.legend.push(label);
		});

		return mapped;
	},
};

//function that returns a function that returns a random color
function generateColorReturningFunction() {
	const round = Math.round,
		random = Math.random,
		upperBound = 255;
	const r = round(random() * upperBound);
	const g = round(random() * upperBound);
	const b = round(random() * upperBound);
	return opacity => `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
