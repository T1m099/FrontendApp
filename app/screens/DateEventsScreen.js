import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';

import {ButtonAccept, ButtonDecline, } from "../components/Buttons";
import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import * as eventActions from '../store/events';
import routes from '../navigation/routes';
import { filterDaysEvents } from '../store/events';
import {AntDesign} from "@expo/vector-icons";

function DateEventScreen({ navigation, route }) {
	const dispatch = useDispatch();
	const allEvents = useSelector(eventActions.getEvents());

	const {dayTimestamp} = route.params;
	const thisDaysEvents = filterDaysEvents(allEvents, dayTimestamp);

	//console.log(thisDaysEvents);
	return (
		<View>
			<FlatList
				data={ Object.values(thisDaysEvents) }
				keyExtractor={ item => item.id }
				renderItem={ ({item}) => (
					<ListItem
						title={ item.title }
						message={ item.description }
						onPress={ () => {
							navigation.dispatch(
								StackActions.replace(routes.EVENT_EDIT, {
									id: item.id,
								})
							);
						} }
						renderRightActions={ () => {
							return (
								<ListItemDeleteAction
									onPress={ () => {
										dispatch(
											eventActions.eventDeleted({
												id: item.id,
											})
										);
										navigation.pop();
									} }
								/>
							);
						} }
					/>
				) }
				ListFooterComponent={
					<View style={styles.container}>
					<React.Fragment>
						{ Object.keys(thisDaysEvents).length === 0 && (
							<ButtonAccept
								Content={ <AntDesign name="plus" size={ 24 } color="white"/> }
								onPress={ () => {
									navigation.dispatch(
										StackActions.replace(
											routes.EVENT_EDIT,
											{
												id: 'new',
												dayTimestamp: dayTimestamp,
											}
										)
									);
								} }
							/>
						) }
						<ButtonDecline
							Content={ <AntDesign name="minus" size={ 24 } color="white"/> }
							onPress={ () => {
								navigation.pop();
							} }
						/>
					</React.Fragment>
					</View>
						}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
		container: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			alignSelf: 'center',
			width: '92%',
			maxHeight: 81,
			borderRadius: 10,
			marginTop: '.75%',
			marginBottom: '.75%',
			backgroundColor: 'rgba(0,0,0,.5)',
			textAlign: 'center',
			justifyContent: 'space-between'
		},
});

export default DateEventScreen;
