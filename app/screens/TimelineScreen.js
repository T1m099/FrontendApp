import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import colors from "../config/colors";
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
	        <ImageBackground source={require('../images/Background.png')} style={styles.image}>

		<View style={styles.container}>
			<EventTypesSelect
				selectedEventTypes={selectedEventTypeArray}
				onSelectEventType={setSelectedEventTypeArray}
				single={true}
				types={trackableTypes}
				style={{ width: '100%', marginBottom:8, marginLeft: 15  }}
			/>
        </View>
                <View style={[styles.container, {maxHeight: 100}]}>
			<DatePickerInput
				value={fromDay}
				valueToDisplay={fromDay.toDateString()}
				onDateSelection={e => {
					setFromDay(e);
				}}
				style={{ width: 150, alignSelf: 'flex-start', marginLeft: 4 }}
			/>

			<DatePickerInput
				value={toDay}
				valueToDisplay={toDay.toDateString()}
				onDateSelection={e => {
					setToDay(e);
				}}
                style={{ width: 150, alignSelf: 'flex-start', marginLeft: 4 }}
			/>
                </View>
			<View style={[styles.container, {maxHeight: 500}]}>
			{!hasData && (
				<AppText>
					Select a time interval with data to show the timeline
				</AppText>
			)}
			{hasData && (
				<LineChart
					data={chartData}
					width={400}
					height={500}
					chartConfig={{
						decimalPlaces: 0, // optional, defaults to 2dp
						color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
						labelColor: (opacity = 0) =>
							`rgba(255, 255, 255, ${opacity})`,
					}}
					bezier={true}
					fromZero={true}
					transparent={true}
					withDots={false}
					withShadow={false}
					style={{
marginLeft:-50, marginTop: 20					}}
				/>
			)}
		</View>
            </ImageBackground>
	);
}


const styles = StyleSheet.create({
	container: {
            flex: 1,
            flexDirection: 'column',
		alignItems: 'center',
            alignSelf: 'center',
            width: '92%',
            maxHeight: 81,
            borderRadius: 10,
            marginTop: '.75%',
            marginBottom: '.75%',
            backgroundColor: 'rgba(0,0,0,.5)',
            textAlign: 'center',
            justifyContent: 'space-evenly'
        },
        image: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center"
	},
        text: {
            alignItems: 'flex-start',
            flex: 1,
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.text,
            marginLeft: '2%',

        }



});

export default TimelineScreen;
