import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import * as eventActions from '../store/events';

import { LineChart } from 'react-native-chart-kit';
import { eventTypes, SYMPTOM, moodsEvaluation } from '../config/eventTypes';

import colors from '../config/colors';
import DatePickerInput from '../components/DatePickerInput';

function TimelineScreen(props) {
	const allSymptomEvents = useSelector(eventActions.getEventsByType(SYMPTOM));

	const today = new Date(
		Math.trunc(Date.now() / (24 * 60 * 60 * 1000)) * 24 * 60 * 60 * 1000
	);

	const [fromDay, setFromDay] = useState(today);
	const [toDay, setToDay] = useState(today);

	const eventsInSelectedRange = eventActions.filterEventsBetweenDays(
		allSymptomEvents,
		fromDay.getTime(),
		toDay.getTime()
	);

	const createChartData = symptomEvents => {
		let eventsOrderedByDay = [];
		eventsOrderedByDay = [...Object.values(symptomEvents)];
		eventsOrderedByDay.sort((a, b) => {
			const startE1 = Math.trunc((a.time / 24) * 60 * 60 * 1000);
			const startE2 = Math.trunc((b.time / 24) * 60 * 60 * 1000);

			return startE1 - startE2;
		});

		const mapped = {
			datasets: [],
			legend: ['Sympoms tracked', 'Mood'],
		};
		const symptomCount = [];
		eventsOrderedByDay.forEach(e => {
			symptomCount.push(e.symptoms.length);
		});
		const moods = [];
		eventsOrderedByDay.forEach(e => {
			const val = e.mood ? moodsEvaluation[e.mood].val : 0;
			moods.push(val);
		});

		mapped.datasets.push({
			data: symptomCount,
			color: () => `rgba(134, 65, 244, 1)`,
		});
		mapped.datasets.push({ data: moods });
		return mapped;
	};

	const chartData = createChartData(eventsInSelectedRange);

	return (
		<View style={styles.container}>
			<DatePickerInput
				value={fromDay}
				valueToDisplay={fromDay.toDateString()}
				onDateSelection={e => {
					setFromDay(e);
				}}
			/>

			<DatePickerInput
				value={toDay}
				valueToDisplay={toDay.toDateString()}
				onDateSelection={e => {
					setToDay(e);
				}}
			/>

			{chartData.datasets[0].data.length > 0 && (
				<LineChart
					data={chartData}
					width={Dimensions.get('window').width - 10} // from react-native
					height={Dimensions.get('window').height / 2}
					chartConfig={{
						backgroundColor: colors.primary,
						decimalPlaces: 0, // optional, defaults to 2dp
						color: (opacity = 1) =>
							`rgba(255, 255, 255, ${opacity})`,
						labelColor: (opacity = 1) =>
							`rgba(255, 255, 255, ${opacity})`,
					}}
					withDots={false}
					style={{
						flexGrow: 1,
					}}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default TimelineScreen;
