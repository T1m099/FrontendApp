import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

import AppButton from '../components/AppButton';
import routes from '../navigation/routes';
import * as eventActions from '../store/events';

function CalendarScreen({ navigation }) {
	const events = useSelector(eventActions.getEvents());

	const dateToCalendarFormat = dayjsDate => {
		//this function uses dayjs
		return dayjsDate.format('YYYY-MM-DD');
	};
	const mapEventsToMarkings = eventsToMap => {
		const currentlyMarkedDates = {};

		let event;
		Object.keys(eventsToMap).forEach(k => {
			event = eventsToMap[k];
			const start = dayjs(event.start);
			const end = dayjs(event.end);
			const diff = end.diff(start, 'd');

			let dateToMark = dayjs(event.start);
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

	return (
		<View style={styles.container}>
			<Calendar
				onDayPress={goToDateEventScreen}
				onDayLongPress={day => {
					goToEventEdit('new', day.timestamp);
				}}
				monthFormat={'MMMM yyyy'}
				firstDay={1}
				markedDates={mapEventsToMarkings(events)}
				markingType='multi-period'
			/>
			<AppButton
				onPress={() => {
					//EventService.clearEvents();
					//setEvents([]);
				}}
				title='Clear Calender'
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default CalendarScreen;
