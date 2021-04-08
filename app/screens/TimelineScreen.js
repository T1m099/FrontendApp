import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../config/colors';
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
		<ImageBackground
			source={require('../images/Background.png')}
			style={styles.image}
		>
			<View style={[styles.container]}>
				<View style={[{ maxHeight: 160 }]}>
					<EventTypesSelect
						selectedEventTypes={selectedEventTypeArray}
						onSelectEventType={setSelectedEventTypeArray}
						single={true}
						types={trackableTypes}
						style={styles.eventTypeSelect}
					/>
					<View style={styles.dateSelectContainer}>
						<DatePickerInput
							value={fromDay}
							valueToDisplay={fromDay.toDateString()}
							onDateSelection={e => {
								setFromDay(e);
							}}
							style={styles.datePicker}
						/>

						<DatePickerInput
							value={toDay}
							valueToDisplay={toDay.toDateString()}
							onDateSelection={e => {
								setToDay(e);
							}}
							style={styles.datePicker}
						/>
					</View>
				</View>
				<View style={styles.diagramContainer}>
					{!hasData && (
						<AppText>
							Select a time interval with data to show the
							timeline
						</AppText>
					)}
					{hasData && (
						<LineChart
							data={chartData}
							width={350}
							height={550}
							chartConfig={{
								decimalPlaces: 0, // optional, defaults to 2dp
								color: (opacity = 0) =>
									`rgba(255, 255, 255, ${opacity})`,
								labelColor: (opacity = 0) =>
									`rgba(255, 255, 255, ${opacity})`,
							}}
							bezier={true}
							fromZero={true}
							transparent={true}
							withDots={false}
							withShadow={false}
							style={styles.diagram}
						/>
					)}
				</View>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexDirection: 'column',
		alignSelf: 'center',
		width: '92%',
		borderRadius: 10,
		marginVertical: '.75%',
		backgroundColor: 'rgba(0,0,0,.5)',
		textAlign: 'center',
		justifyContent: 'space-evenly',
	},
	dateSelectContainer: {
		flexDirection: 'row',
		width: '100%',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	text: {
		alignItems: 'flex-start',
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.text,
		marginLeft: '2%',
	},
	datePicker: {
		width: '46%',
		marginHorizontal: '2%',
		marginBottom: 5,
	},
	eventTypeSelect: {
		backgroundColor: colors.navigation,
		borderRadius: 10,
		margin: '2%',
		height: 30,
		width: '96%',
	},
	diagramContainer: {},
	diagram: {
		marginLeft: -35,
		marginBottom: -20,
		paddingBottom: -80,
		marginTop: -30,
	},
});

export default TimelineScreen;
