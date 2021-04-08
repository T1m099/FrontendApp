import React from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	ImageBackground,
	Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';

import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import {
	ButtonAccept,
	ButtonDecline,
	ButtonYellow,
} from '../components/Buttons';
import * as eventActions from '../store/events';
import routes from '../navigation/routes';
import { AntDesign } from '@expo/vector-icons';
import colors from '../config/colors';

function DateEventScreen({ navigation, route }) {
	const dispatch = useDispatch();
	const allEvents = useSelector(eventActions.getEvents());

	const { dayTimestamp } = route.params;
	const thisDaysEvents = eventActions.filterEventsForDay(
		allEvents,
		dayTimestamp
	);

	return (
		<ImageBackground
			source={require('../images/Background.png')}
			style={styles.image}
		>
			<View>
				<FlatList
					data={Object.values(thisDaysEvents)}
					keyExtractor={item => item.id}
					renderItem={({ item }) => {
						return (
							<ListItem
								title={item.title}
								onPress={() => {
									navigation.dispatch(
										StackActions.replace(
											routes.EVENT_EDIT,
											{
												id: item.id,
											}
										)
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
						);
					}}
					ListFooterComponent={
						<React.Fragment>
							<View style={styles.container}>
								<Text style={styles.text}>
									New Calendar Entry
								</Text>
								<ButtonAccept
									Content={
										<AntDesign
											name='bells'
											size={24}
											color='white'
										/>
									}
									margin={8}
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
							</View>
							<View style={styles.container}>
								<Text style={styles.text}>Close</Text>

								<ButtonDecline
									onPress={() => {
										navigation.pop();
									}}
									Content={
										<AntDesign
											name='close'
											size={24}
											color='white'
										/>
									}
									margin={8}
								/>
							</View>
						</React.Fragment>
					}
				/>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		width: '92%',
		height: 81,
		borderRadius: 10,
		marginTop: '.75%',
		marginBottom: '.75%',
		backgroundColor: 'rgba(0,0,0,.5)',
		textAlign: 'center',
		justifyContent: 'space-between',
	},

	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	text: {
		alignItems: 'flex-start',
		flex: 1,
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.text,
		marginLeft: '2%',
	},
});

export default DateEventScreen;
