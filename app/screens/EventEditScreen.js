import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import AppText from '../components/AppText';
import {
	ButtonStandard,
	ButtonAccept,
	ButtonDecline,
} from '../components/Buttons';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import AppFormDateTimePicker from '../components/forms/AppFormDateTimePicker';
import SubmitButton from '../components/forms/AppSubmitButton';
import AppFormColorPicker from '../components/forms/AppFormColorPicker';
import AppFormPicker from '../components/forms/AppFormPicker';
import ReminderList from '../components/ReminderList';
import { AntDesign } from '@expo/vector-icons';

import * as eventActions from '../store/events';
import reminderService from '../services/reminderService';

import {
	baseEventProperties,
	eventTypeConditionalProperties,
	types,
	markingColors,
	symptoms,
	moods,
	allAdditionalProperties,
} from '../config/eventTypes';
import AppFormConditionalElement from '../components/forms/AppFormConditionalElement';
import routes from '../navigation/routes';
import AppFormMultiSelect from '../components/forms/AppFormMultiSelect';
import TrackingList from '../components/TrackingList';
import colors from '../config/colors';

function initEvent(events, id, timestamp) {
	let e;
	if (id && id === 'new') {
		e = {
			...baseEventProperties,
			...allAdditionalProperties,
			time: new Date(timestamp + 12 * 60 * 60 * 1000),
			end: new Date(timestamp + 13 * 60 * 60 * 1000),
		};
	} else {
		e = { ...events[id] };
		e.time = new Date(e.time);
		e.end = new Date(e.end);
	}
	return e;
}

function EventEditScreen({ navigation, route }) {
	const dispatch = useDispatch();
	const events = useSelector(eventActions.getEvents());

	const { id, dayTimestamp } = route.params;

	const event = initEvent(events, id, dayTimestamp);

	const validationSchema = Yup.object().shape({
		title: Yup.string().required().min(1).label('Title'),
		description: Yup.string().label('Description'),
	});

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

	const handleSubmit = event => {
		dispatch(eventActions.saveEvent(event));
		navigation.reset({
			index: 0,
			routes: [
				{ name: routes.ORGANIZATION_STACK_NAVIGATION },
				{ name: routes.CALENDAR },
			],
		});
	};

	const checkVisible = (values, name) => {
		const type = values.type;

		const visibleFields = [
			...Object.keys(baseEventProperties),
			...Object.keys(eventTypeConditionalProperties[type]),
		];
		return visibleFields.includes(name);
	};

	return (
		<View style={styles.maincontainer}>
			<ImageBackground
				source={require('../images/Background.png')}
				style={styles.image}
			>
				<AppForm
					initialValues={event}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					<View
						style={[
							styles.container,
							{
								marginTop: 5,
								maxHeight: 150,
								flexDirection: 'column',
								justifyContent: 'space-evenly',
							},
						]}
					>
						<View
							style={[
								{
									flexDirection: 'row',
									width: '94%',
									justifyContent: 'space-between',
								},
							]}
						>
							<AppFormPicker
								name='type'
								items={types}
								style={styles.typesPicker}
								extractKey={item => {
									return item;
								}}
								renderSelectedItem={item => {
									return <AppText>{item}</AppText>;
								}}
								renderPickerItem={({ item }) => {
									return <AppText>{item}</AppText>;
								}}
								renderPlaceholder={() => {
									return <AppText>Choose Category</AppText>;
								}}
								checkVisible={checkVisible}
							/>
							<AppFormColorPicker
								name='markingColor'
								colors={markingColors}
								styles={styles.colorPicker}
							/>
						</View>
						<AppFormField
							name='title'
							width={'100%'}
							placeholder='Title'
							checkVisible={checkVisible}
						/>
					</View>

					<View style={[styles.container, { maxHeight: 70 }]}>
						<View style={styles.startContainer}>
							<AppFormConditionalElement
								name='time'
								checkVisible={checkVisible}
							>
								<AppText style={styles.datePickerLabel}>
									Time:
								</AppText>
								<View style={styles.datePicker}>
									<AppFormDateTimePicker
										name='time'
										valueDateTransform={toDateString}
										valueTimeTransform={toTimeString}
									/>
								</View>
							</AppFormConditionalElement>
						</View>
						<View style={styles.startContainer}>
							<AppFormConditionalElement
								name='end'
								checkVisible={checkVisible}
							>
								<AppText style={styles.datePickerLabel}>
									End:
								</AppText>
								<View style={styles.datePicker}>
									<AppFormDateTimePicker
										name='end'
										valueDateTransform={toDateString}
										valueTimeTransform={toTimeString}
									/>
								</View>
							</AppFormConditionalElement>
						</View>
					</View>
					<View style={[styles.container, { maxHeight: 400 }]}>
						<AppFormMultiSelect
							items={symptoms}
							name='symptoms'
							checkVisible={checkVisible}
						/>

						<AppFormPicker
							name='mood'
							items={moods}
							extractKey={item => {
								return item;
							}}
							renderSelectedItem={item => {
								return <AppText>{item.toString()}</AppText>;
							}}
							renderPickerItem={({ item }) => {
								return <AppText>{item.toString()}</AppText>;
							}}
							renderPlaceholder={() => {
								return <AppText>Mood</AppText>;
							}}
							checkVisible={checkVisible}
						/>

						<AppFormConditionalElement
							name='reminders'
							checkVisible={checkVisible}
						>
							<ReminderList
								name='reminders'
								style={styles.reminderList}
								onReminderDelete={reminder => {
									reminderService.cancelReminderAsync(
										reminder
									);
								}}
							/>
						</AppFormConditionalElement>
						<AppFormConditionalElement
							name='trackingItems'
							checkVisible={checkVisible}
						>
							<TrackingList name='trackingItems'></TrackingList>
						</AppFormConditionalElement>
					</View>

					<View style={styles.container}>
						<AppFormField
							maxLength={255}
							multiline
							name='notes'
							numberOfLines={3}
							placeholder='Notes'
						/>
					</View>
					<View
						style={[
							styles.container,
							{
								marginTop: 5,
								maxHeight: 90,
								flexDirection: 'column',
							},
						]}
					>
						<View
							style={[
								{
									flexDirection: 'row',
									width: '94%',
									justifyContent: 'space-between',
								},
							]}
						>
							<SubmitButton
								title='Mark in Calendar'
								size={300}
								style={styles.submitButton}
							/>
							<ButtonDecline
								Content={
									<AntDesign
										name='close'
										size={24}
										color='white'
									/>
								}
								onPress={() => {
									navigation.reset({
										index: 0,
										routes: [
											{
												name:
													routes.ORGANIZATION_STACK_NAVIGATION,
											},
											{ name: routes.CALENDAR },
										],
									});
								}}
							/>
						</View>
					</View>
				</AppForm>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	maincontainer: {
		flex: 1,
		alignItems: 'center',
		alignSelf: 'center',
		width: '92%',
		marginTop: '.75%',
		marginBottom: '.75%',
		textAlign: 'center',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},

	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		alignSelf: 'center',
		width: 400,
		maxHeight: 132,
		borderRadius: 10,
		marginTop: '.75%',
		marginBottom: '.75%',
		backgroundColor: 'rgba(0,0,0,.5)',
		textAlign: 'center',
		justifyContent: 'space-evenly',
	},
	dateTimePickerContainer: {
		flexDirection: 'row',
		marginVertical: 10,
	},
	startContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	colorPicker: {
		flexGrow: 5,
	},

	datePickerLabel: { flex: 1 },
	datePicker: { flex: 5 },
	buttonContainer: {
		flexDirection: 'row',
	},

	closeButton: {
		flex: 1,
	},
	submitButton: {
		flex: 3,
	},
	reminderList: {
		maxHeight: '100%',
	},
});

export default EventEditScreen;
