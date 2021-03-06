import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';

/*import NewAppointmentModal from '../components/NewAppointmentModal';

import AppointmentService from '../services/appointmentService';*/
import {ButtonDecline, ButtonStandard} from '../components/Buttons';
import SafeAreaScreen from "../components/SafeAreaScreen";
import EventService from '../services/eventService';
import routes from '../navigation/routes';
import eventService from '../services/eventService';
import reminderService from '../services/reminderService';

function CalendarScreen({ navigation }) {
	const [events, setEvents] = useState([]);

	/* useEffect(() => {
		navigation.addListener('focus', () => {
			console.log('focused');
		});
	}, [navigation]); */

	const loadEvents = async () => {
		let loadedEvents = await EventService.loadEvents();
		loadedEvents = loadedEvents.map(e => {
			e.start = new Date(e.start);
			e.end = new Date(e.end);
			e.reminders = reminderService.parseStringifiedReminders(
				e.reminders
			);
			return e;
		});
		setEvents(loadedEvents);
	};
	useEffect(() => {
		loadEvents();
	}, []);

	const toTimeString = date => {
		return `${date.getHours()}:${
			date.getMinutes() / 10 < 1
				? '0' + date.getMinutes()
				: date.getMinutes()
		}`;
	};
	const toDateString = date => {
		return date.toDateString();
	};
	const dateToCalendarFormat = dayjsDate => {
		//this function uses dayjs
		return dayjsDate.format('YYYY-MM-DD');
	};
	const mapEventsToMarkings = eventsToMap => {
		const currentlyMarkedDates = {};

		eventsToMap.forEach(event => {
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

	const handleSubmitEventEdit = async event => {
		const currentEvents = [...events];

		const index = currentEvents.findIndex(e => e.id === event.id);
		if (index > -1) {
			//cutting the element out of the array so it is updated instead of being created
			currentEvents.splice(index, 1);
		}
		const savedEvent = await EventService.safeEvent(event);
		currentEvents.push(savedEvent);

		setEvents(currentEvents);
	};

	const handlePressNewEvent = day => {
		const start = new Date(day.timestamp);
		const end = new Date(day.timestamp);
		end.setTime(end.getTime() + 60 * 60 * 1000);

		const event = { ...eventService.baseEvent };
		event.start = start;
		event.end = end;
		goToEventEdit(event);
	};

	const handleDeleteEvent = async event => {
		const originalEvents = [...events];
		let currentEvents = [...events];

		currentEvents = currentEvents.filter(e => e.id !== event.id);
		setEvents(currentEvents);

		try {
			await eventService.deleteEvent(event);
		} catch (error) {
			setEvents(originalEvents);
			Alert.alert('Error', 'Could not delete event');
		}
	};

	const goToEventEdit = event => {
		navigation.push(routes.EVENT_EDIT, {
			valueDateViewTransform: toDateString,
			valueTimeViewTransform: toTimeString,
			event,
			onSubmit: handleSubmitEventEdit,
			onDeleteReminder: reminder =>
				reminderService.cancelReminderAsync(reminder),
		});
	};
	const goToDateEventScreen = selectedDateEvents => {
		navigation.push(routes.DATE_EVENT_OVERVIEW, {
			events: selectedDateEvents,
			labelProp: 'title',
			idProp: 'id',
			onSelectEvent: goToEventEdit,
			onDeleteEvent: handleDeleteEvent,
		});
	};

	const handlePressDay = day => {
		const allEvents = [...events];
		const eventsAtThisDate = allEvents.filter(e => {
			const start = dayjs(e.start);
			const end = dayjs(e.end);
			const date = dayjs(new Date(day.timestamp));

			return (
				date.isSame(start) ||
				date.isSame(end) ||
				(date.isAfter(start) && date.isBefore(end))
			);
		});
		if (eventsAtThisDate.length === 0) {
			handlePressNewEvent(day);
		} else {
			goToDateEventScreen(eventsAtThisDate);
		}
	};
	return (
		<ImageBackground source={require('../images/Background.png')} style={styles.image}>

		<View style={styles.container}>
			<Calendar style={[{width: 400}]}
				onDayPress={handlePressDay}
				onDayLongPress={handlePressNewEvent}
				monthFormat={'MMMM yyyy'}
				firstDay={1}
				markedDates={mapEventsToMarkings(events)}
				markingType='multi-period'
			/>
			<ButtonDecline
				onPress={() => {
					EventService.clearEvents();
					setEvents([]);
				}}
				Content='Clear Calender'
			size={250}
				position={'center'}
			/>
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
