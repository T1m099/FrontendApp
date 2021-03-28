import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import * as eventActions from '../store/events';

import { LineChart } from 'react-native-chart-kit';
import { trackableTypes } from '../config/eventTypes';
import { createChartData } from '../utils/createChartData';

import DatePickerInput from '../components/DatePickerInput';
import AppText from '../components/AppText';
import EventTypesSelect from '../components/EventTypesSelect';

function TimelineScreen(props) {
	const allEventsOrderedByTypeAsObject = useSelector(
		eventActions.getEventsGroupedByTypeAsObject()
	);
	const [selectedEventTypeArray, setSelectedEventTypeArray] = useState([
		trackableTypes[0],
	]);

	const today = new Date(
		Math.trunc(Date.now() / (24 * 60 * 60 * 1000)) * 24 * 60 * 60 * 1000
	);

	const [fromDay, setFromDay] = useState(
		new Date(today.getTime() - 1000 * 60 * 60 * 24 * 30)
	);
	const [toDay, setToDay] = useState(today);

	let eventsWithSelectedType =
		allEventsOrderedByTypeAsObject[selectedEventTypeArray[0]];
	if (!eventsWithSelectedType) eventsWithSelectedType = {};

	const eventsInSelectedRange = eventActions.filterEventsBetweenDays(
		eventsWithSelectedType,
		fromDay.getTime(),
		toDay.getTime()
	);

	const chartData = createChartData(
		eventsInSelectedRange,
		selectedEventTypeArray[0]
	);
	const hasData =
		chartData.datasets.length > 0 && chartData.datasets[0].data.length > 0;

	return (
		<View style={styles.container}>
			<EventTypesSelect
				selectedEventTypes={selectedEventTypeArray}
				onSelectEventType={setSelectedEventTypeArray}
				single={true}
				types={trackableTypes}
				style={{ width: '100%' }}
			/>
			<DatePickerInput
				value={fromDay}
				valueToDisplay={fromDay.toDateString()}
				onDateSelection={e => {
					setFromDay(e);
				}}
				style={{ width: '100%' }}
			/>

			<DatePickerInput
				value={toDay}
				valueToDisplay={toDay.toDateString()}
				onDateSelection={e => {
					setToDay(e);
				}}
				style={{ width: '100%' }}
			/>
			{!hasData && (
				<AppText>
					Select a time interval with data to show the timeline
				</AppText>
			)}
			{hasData && (
				<LineChart
					data={chartData}
					width={Dimensions.get('window').width - 10}
					height={Dimensions.get('window').height / 2}
					chartConfig={{
						decimalPlaces: 0, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
						labelColor: (opacity = 1) =>
							`rgba(0, 0, 0, ${opacity})`,
					}}
					bezier={true}
					fromZero={true}
					transparent={true}
					withDots={false}
					withShadow={false}
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
