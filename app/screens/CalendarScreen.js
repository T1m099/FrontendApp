import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';

import EventService from '../services/eventService';
import AppButton from '../components/AppButton';
import routes from '../navigation/routes';
import PickerModal from '../components/PickerModal';

function CalendarScreen({ navigation }) {
	const [events, setEvents] = useState([]);
	const [selectedDateEvents, setSelectedDateEvents] = useState([]);
	const [selectEventModalVisible, setSelectEventModalVisible] = useState(
		false
	);
	const loadEvents = async () => {
		let loadedEvents = await EventService.loadEvents();
		loadedEvents = loadedEvents.map(e => {
			e.start = new Date(e.start);
			e.end = new Date(e.end);
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

		const event = {
			id: 'new',
			start,
			end,
			title: 'New Event',
			description: '',
		};
		goToEventEdit(event);
	};

	const goToEventEdit = event => {
		navigation.push(routes.EVENT_EDIT, {
			valueDateViewTransform: toDateString,
			valueTimeViewTransform: toTimeString,
			event,
			onSubmit: handleSubmitEventEdit,
		});
	};
	const goToDateEventScreen = selectedDateEvents => {
		navigation.push(routes.DATE_EVENT_OVERVIEW, {
			events: selectedDateEvents,
			labelProp: 'title',
			idProp: 'id',
			onSelectEvent: goToEventEdit,
			onPressClose: () => {
				//setSelectEventModalVisible(false);
			},
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
			//setSelectedDateEvents(eventsAtThisDate);
			//setSelectEventModalVisible(true);
			goToDateEventScreen(eventsAtThisDate);
		}
	};

	return (
		<View style={styles.container}>
			<Calendar
				onDayPress={handlePressDay}
				onDayLongPress={handlePressNewEvent}
				monthFormat={'MMMM yyyy'}
				firstDay={1}
				markedDates={mapEventsToMarkings(events)}
				markingType='multi-period'
			/>
			<AppButton
				onPress={() => {
					EventService.clearEvents();
					setEvents([]);
				}}
				title='Clear Calender'
			/>
			{/* todo: proper id */}
			<PickerModal
				items={selectedDateEvents}
				modalVisible={selectEventModalVisible}
				labelProp='title'
				idProp='id'
				onSelectItem={item => {
					goToEventEdit(item);
				}}
				onPressClose={() => {
					setSelectEventModalVisible(false);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default CalendarScreen;
