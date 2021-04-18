import React, { useEffect } from 'react';
import {
	StyleSheet,
	ImageBackground,
	Text,
	FlatList,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import SafeAreaScreen from '../components/SafeAreaScreen';
import * as medActions from '../store/meds';
import * as eventActions from '../store/events';
import * as docActions from '../store/docs';
import colors from '../config/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import routes from '../navigation/routes';
import Screen from '../components/Screen';

//the main screen of the app
function MainScreen({ navigation }) {
	const dispatch = useDispatch();

	const events = useSelector(eventActions.getEvents());
	const meds = useSelector(medActions.getMeds());

	//upon loading this screen for the first time, fetch updates to events, meds and docs from the server
	useEffect(() => {
		dispatch(eventActions.fetchEvents());
		dispatch(medActions.fetchMeds());
		dispatch(docActions.fetchFolders());
		dispatch(docActions.fetchDocuments());
	}, []);

	//function to generate a list of events and meds of the day
	const getPlannerItems = () => {
		const plannerItems = [];
		const thisDaysEvents = eventActions.filterEventsForDay(
			events,
			Date.now()
		);

		//adding all events of this day to the list
		Object.keys(thisDaysEvents).forEach(k => {
			plannerItems.push({
				type: 'event',
				id: thisDaysEvents[k].id,
				time: thisDaysEvents[k].time,
				title: thisDaysEvents[k].title,
			});
		});
		//adding all meds of this day to the list
		Object.keys(meds).forEach(k => {
			meds[k].reminders.forEach(r => {
				plannerItems.push({
					type: 'med',
					id: meds[k].id,
					time: r.date.getTime(),
					title: meds[k].title,
				});
			});
		});
		//sorting the items in the list
		plannerItems.sort((a, b) => {
			return a.time - b.time;
		});
		return plannerItems;
	};

	//function to render the list of meds and events if there are any, otherwise return a banner to inform the user nothins is planned for the day
	const renderPlanner = () => {
		if (getPlannerItems().length !== 0) {
			return (
				<FlatList
					data={getPlannerItems()}
					keyExtractor={item => item.id + item.time}
					renderItem={({ item }) => {
						const time = dayjs(item.time);
						return (
							<TouchableOpacity
								onPress={() => {
									handlePlannerItemPress(item);
								}}
								style={styles.eventListItem}
							>
								<Text style={styles.text}>
									{time.format('HH:mm')} | {item.title}
								</Text>
							</TouchableOpacity>
						);
					}}
				/>
			);
		} else
			return (
				<View>
					<Text style={[styles.text, styles.upcomingEventsText]}>
						{' '}
						No upcoming events
					</Text>
				</View>
			);
	};

	//handling a click on a item in the list; a click takes the user to the corresponding edit screen
	const handlePlannerItemPress = item => {
		if (item.type === 'event') {
			navigation.navigate(routes.ORGANIZATION_STACK_NAVIGATION, {
				screen: routes.EVENT_EDIT,
				params: {
					id: item.id,
					dayTimestamp: Date.now(),
				},
			});
		} else if (item.type === 'med') {
			navigation.navigate(routes.MEDICATION_STACK_NAVIGATION, {
				screen: routes.MEDICATION_EDIT,
				params: {
					id: item.id,
				},
			});
		}
	};

	//rendering the screen (via calling the earlier defined render method)
	return (
		<SafeAreaScreen>
			<Screen>
				<ImageBackground
					source={require('../images/Background.png')}
					style={styles.image}
				>
					{renderPlanner()}
				</ImageBackground>
			</Screen>
		</SafeAreaScreen>
	);
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
	},
	text: {
		alignItems: 'flex-start',
		flex: 1,
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: '2%',
		color: colors.text,
		marginLeft: '2%',
	},
	upcomingEventsText: {
		width: '92%',
		marginLeft: '4%',
		marginRight: '4%',
		height: 35,
		maxHeight: 35,
		borderRadius: 10,
		marginTop: '.75%',
		marginBottom: '.75%',
		backgroundColor: 'rgba(0,0,0,.5)',
		textAlign: 'center',
	},
	eventListItem: {
		width: '92%',
		marginLeft: '4%',
		height: 35,
		borderRadius: 10,
		marginTop: '.75%',
		marginBottom: '.75%',
		backgroundColor: 'rgba(0,0,0,.5)',
	},
});

export default MainScreen;
