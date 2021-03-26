import * as eventTypes from '../config/eventTypes';

export const createChartData = (events, type) => {
	const eventsOrderedByDayArray = orderEventsByDay(events);

	return mappingAlgorithms[type](eventsOrderedByDayArray);
};

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

const mappingAlgorithms = {
	[eventTypes.SYMPTOM]: eventsOrderedByDayArray => {
		const mapped = {
			datasets: [],
			legend: ['Sympoms tracked', 'Mood'],
		};

		const symptomCount = [];
		eventsOrderedByDayArray.forEach(e => {
			symptomCount.push(e.symptoms.length);
		});

		const moods = [];
		eventsOrderedByDayArray.forEach(e => {
			const val = e.mood ? eventTypes.moodsEvaluation[e.mood].val : 0;
			moods.push(val);
		});

		mapped.datasets.push({
			data: symptomCount,
			color: () => `rgba(134, 65, 244, 1)`,
		});
		mapped.datasets.push({ data: moods });

		return mapped;
	},
	[eventTypes.TRACKING]: eventsOrderedByDayArray => {
		const datasetsObject = {};
		const legend = [];

		eventsOrderedByDayArray.forEach(e => {
			if (!e.trackingItems) return;

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

function generateColorReturningFunction() {
	const round = Math.round,
		random = Math.random,
		upperBound = 255;
	const r = round(random() * upperBound);
	const g = round(random() * upperBound);
	const b = round(random() * upperBound);
	return opacity => `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
