import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

import routes from '../navigation/routes';
import * as eventActions from '../store/events';
import { types } from '../config/eventTypes';
import EventTypesSelect from '../components/EventTypesSelect';
import Screen from '../components/Screen';

//screen that renders the calendar
function CalendarScreen({ navigation }) {
	const eventsByType = useSelector(
		eventActions.getEventsGroupedByTypeAsObject()
	); //fetching all events from the store, grouped by their type
	const [selectedEventTypes, setSelectedEventTypes] = useState(types);

	//function to parse dates to strings
	//parameter is a dayjs date object, not a regular JavaScript date!
	const dateToCalendarFormat = dayjsDate => {
		//this function uses dayjs
		return dayjsDate.format('YYYY-MM-DD');
	};

	//filtering the events that have the selected type
	const getEventsForSelectedTypes = selectedTypes => {
		//the events are stored in a object with nested objects that have the events type as a key
		//all appintments are therefore stored in events:{appointments:{...}}
		let eventsToReturn = {};
		selectedTypes.forEach(t => {
			eventsToReturn = { ...eventsToReturn, ...eventsByType[t] };
		});
		return eventsToReturn;
	};

	//generate calendar markings for the shown events
	const mapEventsToMarkings = eventsToMap => {
		const currentlyMarkedDates = {};

		//iterating over all events and add one marking object for each day they span
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

	//function to navigate to the event edit screen
	const goToEventEdit = (id, dayTimestamp) => {
		navigation.push(routes.EVENT_EDIT, {
			id,
			dayTimestamp,
		});
	};

	//function to navigate to a screen showing all events of the selected day
	const goToDateEventScreen = day => {
		navigation.push(routes.DATE_EVENT_OVERVIEW, {
			dayTimestamp: day.timestamp,
		});
	};

	//since this screen is written as a function, we can create a constant with the events we want to show here
	const eventsToShow = mapEventsToMarkings(
		getEventsForSelectedTypes(selectedEventTypes)
	);

	//rendering the screen, consisting of a event type selection as the calendar component
	//for the calendar a foreign module is used
	return (
		<ImageBackground
			source={require('../images/Background.png')}
			style={styles.image}
		>
			<Screen>
				<View style={styles.container}>
					<EventTypesSelect
						selectedEventTypes={selectedEventTypes}
						onSelectEventType={setSelectedEventTypes}
						style={{ width: '100%' }}
					/>

					<Calendar
						onDayPress={goToDateEventScreen}
						onDayLongPress={day => {
							goToEventEdit('new', day.timestamp);
						}}
						style={styles.calen}
						monthFormat={'MMMM yyyy'}
						firstDay={1}
						markedDates={eventsToShow}
						markingType='multi-period'
					/>
				</View>
			</Screen>
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
		maxHeight: 400,
		borderRadius: 10,
		marginTop: '.75%',
		marginBottom: '.75%',
		backgroundColor: 'rgba(0,0,0,.5)',
		textAlign: 'center',
		justifyContent: 'space-between',
	},
	calen: {
		width: 350,
	},

	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
});

export default CalendarScreen;
