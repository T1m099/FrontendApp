import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';

import {ButtonStandard} from "../components/Buttons";
import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import * as eventActions from '../store/events';
import routes from '../navigation/routes';
import { filterDaysEvents } from '../store/events';

function DateEventScreen({ navigation, route }) {
	const dispatch = useDispatch();
	const allEvents = useSelector(eventActions.getEvents());

	const { dayTimestamp } = route.params;
	const thisDaysEvents = filterDaysEvents(allEvents, dayTimestamp);

	//console.log(thisDaysEvents);
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
											eventActions.eventDeleted({
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
						{Object.keys(thisDaysEvents).length === 0 && (
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
						)}
						<AppButton
					<ButtonStandard
						Content='Close'
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
