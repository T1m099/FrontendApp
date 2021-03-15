import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import SafeAreaScreen from '../components/SafeAreaScreen';
import * as medActions from '../store/meds';
import * as eventActions from '../store/events';
import colors from '../config/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import routes from '../navigation/routes';

function MainScreen({ navigation }) {
	const events = useSelector(eventActions.getEvents());
	const meds = useSelector(medActions.getMeds());

	const getPlannerItems = () => {
		const plannerItems = [];
		const thisDaysEvents = eventActions.filterDaysEvents(
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

	const handlePlannerItemPress = item => {
		if (item.type === 'event') {
			navigation.navigate(routes.ORGANIZATION, {
				screen: routes.EVENT_EDIT,
				params: {
					id: item.id,
					dayTimestamp: Date.now(),
				},
			});
		} else if (item.type === 'med') {
			navigation.navigate(routes.MEDICATION, {
				screen: routes.MEDICATION_EDIT,
				params: {
					id: item.id,
				},
			});
		}
	};

	return (
		<SafeAreaScreen>
			<View style={styles.container}>
				<FlatList
					ListHeaderComponent={
						<Text style={{ fontSize: 40 }}>Homescreen</Text>
					}
					data={getPlannerItems()}
					keyExtractor={item => item.id}
					renderItem={({ item }) => {
						const time = dayjs(item.time);
						return (
							<TouchableOpacity
								onPress={() => {
									handlePlannerItemPress(item);
								}}
							>
								<View style={styles.plannerItem}>
									<Text style={styles.plannerItemTime}>
										{time.format('HH:mm')}
									</Text>
									<Text>{item.title}</Text>
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			</View>
		</SafeAreaScreen>
	);
}

const styles = StyleSheet.create({
	container: { justifyContent: 'center', alignItems: 'center', flex: 1 },
	plannerItem: {
		margin: 1,
		padding: 5,
		borderRadius: 10,
		width: '100%',
		flexDirection: 'row',
		backgroundColor: colors.primary,
	},
	plannerItemTime: { marginRight: 5 },
});

export default MainScreen;
