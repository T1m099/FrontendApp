import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';

import routes from '../navigation/routes';
import * as eventActions from '../store/events';
import colors from '../config/colors';
import { types } from '../config/eventTypes';
import EventTypesSelect from '../components/EventTypesSelect';

function CalendarScreen({ navigation }) {
	const eventsByType = useSelector(
		eventActions.getEventsGroupedByTypeAsObject()
	);
	const [selectedEventTypes, setSelectedEventTypes] = useState(types);

	const dateToCalendarFormat = dayjsDate => {
		//this function uses dayjs
		return dayjsDate.format('YYYY-MM-DD');
	};
	const getEventsForSelectedTypes = selectedTypes => {
		let eventsToReturn = {};
		selectedTypes.forEach(t => {
			eventsToReturn = { ...eventsToReturn, ...eventsByType[t] };
		});
		return eventsToReturn;
	};

	const mapEventsToMarkings = eventsToMap => {
		const currentlyMarkedDates = {};

		let event;
		Object.keys(eventsToMap).forEach(k => {
			event = eventsToMap[k];
			const start = dayjs(event.time);
			const end = dayjs(event.end);
			const diff = end.diff(start, 'd');

			let dateToMark = dayjs(event.time);
			for (let i = 0; i <= diff; i++) {
				//mark date

				if (!currentlyMarkedDates[dateToCalendarFormat(dateToMark)]) {
					currentlyMarkedDates[dateToCalendarFormat(dateToMark)] = {
						periods: [],
					};
				}
				currentlyMarkedDates[
					dateToCalendarFormat(dateToMark)
				].periods.push({
					color: event.markingColor,
					startingDay: i === 0 ? true : false,
					endingDay: i === diff ? true : false,
				});
				//increase date
				dateToMark = dateToMark.add(1, 'd');
			}
		});

		return currentlyMarkedDates;
	};

	const goToEventEdit = (id, dayTimestamp) => {
		navigation.push(routes.EVENT_EDIT, {
			id,
			dayTimestamp,
		});
	};
	const goToDateEventScreen = day => {
		navigation.push(routes.DATE_EVENT_OVERVIEW, {
			dayTimestamp: day.timestamp,
		});
	};

	const eventsToShow = mapEventsToMarkings(
		getEventsForSelectedTypes(selectedEventTypes)
	);

	return (
		<View style={styles.container}>
			<EventTypesSelect
				selectedEventTypes={selectedEventTypes}
				onSelectEventType={setSelectedEventTypes}
			/>

			<Calendar
				onDayPress={goToDateEventScreen}
				onDayLongPress={day => {
					goToEventEdit('new', day.timestamp);
				}}
				monthFormat={'MMMM yyyy'}
				firstDay={1}
				markedDates={eventsToShow}
				markingType='multi-period'
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		alignSelf: 'center',
		width: '92%',
		maxHeight: 400,
		borderRadius: 10,
		marginTop: '.75%',
		marginBottom: '.75%',
		backgroundColor: 'rgba(0,0,0,.5)',
		textAlign: 'center',
		justifyContent: 'space-between',

	},

	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center"
	},
});

export default CalendarScreen;
