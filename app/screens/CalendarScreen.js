import React, { useEffect, useState } from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';

import NewAppointmentModal from '../components/NewAppointmentModal';

import AppointmentService from '../services/appointmentService';
import {ButtonDecline, ButtonStandard} from '../components/Buttons';
import SafeAreaScreen from "../components/SafeAreaScreen";

function CalendarScreen(props) {
	const now = new Date();

	const [showModal, setShowModal] = useState(false);
	const [startDate, setStartDate] = useState(now);
	const [endDate, setEndDate] = useState(now);
	const [appointments, setAppointments] = useState([]);

	const toTimeString = (date) => {
		return `${date.getHours()}:${
			date.getMinutes() / 10 < 1
				? '0' + date.getMinutes()
				: date.getMinutes()
		}`;
	};
	const toDateString = (date) => {
		return date.toDateString();
	};
	const dateToCalendarFormat = (date) => {
		//this function uses dayjs
		return date.format('YYYY-MM-DD');
	};
	const createAppointment = (appointment) => {
		const currentAppointments = [...appointments];
		currentAppointments.push(appointment);
		AppointmentService.safeAppointment(appointment);
		setAppointments(currentAppointments);
	};

	const mapAppointmentsToMarkings = (appointments) => {
		const currentlyMarkedDates = {};

		appointments.forEach((appointment) => {
			const start = dayjs(appointment.start);
			const end = dayjs(appointment.end);
			const diff = end.diff(start, 'd');

			let dateToMark = dayjs(appointment.start);
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
					color: appointment.color,
					startingDay: i === 0 ? true : false,
					endingDay: i === diff ? true : false,
				});
				//increase date
				dateToMark = dateToMark.add(1, 'd');
			}
		});
		return currentlyMarkedDates;
	};

	const loadAppointments = async () => {
		const appointments = await AppointmentService.loadAppointments();
		setAppointments(appointments);
	};

	useEffect(() => {
		loadAppointments();
	}, []);

	return (
		<ImageBackground source={require('../images/Background.png')} style={styles.image}>

		<View style={styles.container}>
			<Calendar style={[{width: 400}]}
				// Initially visible month. Default = Date()
				current={now}
				// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
				// Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
				// Handler which gets executed on day press. Default = undefined
				onDayPress={(day) => {
					console.log('selected day', day);
				}}
				onDayLongPress={(day) => {
					const start = new Date(day.timestamp);
					const end = new Date(day.timestamp);
					end.setTime(end.getTime() + 60 * 60 * 1000);
					setStartDate(start);
					setEndDate(end);
					setShowModal(true);
				}}
				// Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
				monthFormat={'MMMM yyyy'}
				firstDay={1}
				markedDates={mapAppointmentsToMarkings(appointments)}
				markingType='multi-period'
			/>
			<ButtonDecline
				onPress={() => {
					AppointmentService.clearAppointments();
					setAppointments([]);

				}}
				Content='Clear Calender'
			size={250}
				position={'center'}
			/>

			<NewAppointmentModal
				startDate={startDate}
				endDate={endDate}
				title=''
				description=''
				valueDateViewTransform={toDateString}
				valueTimeViewTransform={toTimeString}
				visible={showModal}
				onPressClose={() => {
					setShowModal(false);
				}}
				onSubmit={createAppointment}
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
