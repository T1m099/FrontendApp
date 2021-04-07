import React, { useEffect } from 'react';
import {
	View,
	StyleSheet,
	ImageBackground,
	Text,
	FlatList,
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

function MainScreen({ navigation }) {
	const dispatch = useDispatch();

	const events = useSelector(eventActions.getEvents());
	const meds = useSelector(medActions.getMeds());

	useEffect(() => {
		dispatch(eventActions.fetchEvents());
		dispatch(medActions.fetchMeds());
		dispatch(docActions.fetchFolders());
		dispatch(docActions.fetchDocuments());
	}, []);

	const getPlannerItems = () => {
		const plannerItems = [];
		const thisDaysEvents = eventActions.filterEventsForDay(
			events,
			Date.now()
		);

		Object.keys(thisDaysEvents).forEach(k => {
			plannerItems.push({
				type: 'event',
				id: thisDaysEvents[k].id,
				time: thisDaysEvents[k].time,
				title: thisDaysEvents[k].title,
			});
		});
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

		plannerItems.sort((a, b) => {
			return a.time - b.time;
		});
		return plannerItems;
	};
	const plannerItemsIsEmpty = () => {
		if (getPlannerItems().length !== 0) {
			return (
				<FlatList
					data={getPlannerItems()}
					keyExtractor={item => item.id}
					renderItem={({ item }) => {
						const time = dayjs(item.time);
						return (
							<TouchableOpacity
								onPress={() => {
									handlePlannerItemPress(item);
								}}
								style={[
									{
										width: '92%',
										marginLeft: '4%',
										height: 35,
										borderRadius: 10,
										marginTop: '.75%',
										marginBottom: '.75%',
										backgroundColor: 'rgba(0,0,0,.5)',
									},
								]}
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
				<Text
					style={[
						styles.text,
						{
							width: '92%',
							marginLeft: '4%',
							marginRight: '4%',
							height: 35,
							borderRadius: 10,
							marginTop: '.75%',
							marginBottom: '.75%',
							backgroundColor: 'rgba(0,0,0,.5)',
						},
					]}
				>
					{' '}
					Es gibt keine Events, welche auf dich zu kommen
				</Text>
			);
	};
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

	return (
		<SafeAreaScreen>
			<ImageBackground
				source={require('../images/Background.png')}
				style={styles.image}
			>
				{plannerItemsIsEmpty()}
			</ImageBackground>
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
});

export default MainScreen;
