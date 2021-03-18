import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';

import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import AppButton from '../components/AppButton';
import * as eventActions from '../store/events';
import routes from '../navigation/routes';

function DateEventScreen({ navigation, route }) {
	const dispatch = useDispatch();
	const allEvents = useSelector(eventActions.getEvents());

	const { dayTimestamp } = route.params;
	const thisDaysEvents = eventActions.filterEventsForDay(
		allEvents,
		dayTimestamp
	);

	return (
		<View style={styles.container}>
			<FlatList
				data={Object.values(thisDaysEvents)}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<ListItem
						title={item.title}
						message={item.description}
						onPress={() => {
							navigation.dispatch(
								StackActions.replace(routes.EVENT_EDIT, {
									id: item.id,
								})
							);
						}}
						renderRightActions={() => {
							return (
								<ListItemDeleteAction
									onPress={() => {
										dispatch(
											eventActions.deleteEvent({
												id: item.id,
											})
										);
										navigation.pop();
									}}
								/>
							);
						}}
					/>
				)}
				ListFooterComponent={
					<React.Fragment>
						{
							<AppButton
								title='New'
								onPress={() => {
									navigation.dispatch(
										StackActions.replace(
											routes.EVENT_EDIT,
											{
												id: 'new',
												dayTimestamp: dayTimestamp,
											}
										)
									);
								}}
							/>
						}
						<AppButton
							title='Close'
							onPress={() => {
								navigation.pop();
							}}
						/>
					</React.Fragment>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 5,
	},
});

export default DateEventScreen;
