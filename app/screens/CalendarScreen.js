import React from 'react';
import { View, StyleSheet,ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import {ButtonDecline} from '../components/Buttons';
import routes from '../navigation/routes';

function CalendarScreen({ navigation }) {
	const [events, setEvents] =React.useState([false]);

	/* useEffect(() => {
		navigation.addListener('focus', () => {
			console.log('focused');
		});
	}, [navigation]); */

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
		<ImageBackground source={require('../images/Background.png')} style={styles.image}>

		<View style={styles.container}>
			<Calendar style={[{width: 400}]}
					  onDayPress={goToDateEventScreen}
				onDayLongPress={day => {
					goToEventEdit('new', day.timestamp);
				}}
				monthFormat={'MMMM yyyy'}
				firstDay={1}
				markedDates={mapEventsToMarkings(events)}
				markingType='multi-period'
			/>
			<ButtonDecline
				onPress={() => {
					//EventService.clearEvents();
					//setEvents([]);
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
