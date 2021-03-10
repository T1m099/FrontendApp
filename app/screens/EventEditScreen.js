import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';

import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import AppFormDateTimePicker from '../components/forms/AppFormDateTimePicker';
import SubmitButton from '../components/forms/AppSubmitButton';
import AppFormColorPicker from '../components/forms/AppFormColorPicker';
import AppFormPicker from '../components/forms/AppFormPicker';
import AppFormConditionalElement from '../components/forms/AppFormConditionalElement';
import ReminderList from '../components/ReminderList';

import * as eventActions from '../store/events';
import { genId } from '../store/events';
import eventService from '../services/eventService';
import reminderService from '../services/reminderService';

const disceaseKeyword = 'Disease';

const colorPickerItems = [
	'#00ff00',
	'#0f0f00',
	'#006CBE',
	'#427505',
	'#C33400',
	'#00345C',
	'#E3CC00',
	'#00A3AE',
	'#CC007E',
	'#684697',
	'#B10E1C',
	'#F9A825',
];
const categories = ['Appointment', 'Therapy', disceaseKeyword];
const diseases = ['Flatulenzen', 'Gripaler Infekt', 'Männergrippe'];

function initEvent(events, id, timestamp) {
	let e;
	if (id && id === 'new') {
		e = {
			...eventService.baseEvent,
			start: new Date(timestamp),
			end: new Date(timestamp + 60 * 60 * 1000),
		};
	} else {
		e = { ...events[id] };
		console.log(e);
		e.start = new Date(e.start);
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
		const e = { ...event };
		if (e.id === 'new') {
			e.id = genId();
		}

		e.start = e.start.getTime();
		e.end = e.end.getTime();

		dispatch(eventActions.eventSaved(e));

		navigation.pop();
	};

	return (
		<View style={styles.container}>
			<AppForm
				initialValues={event}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				<AppFormField name='title' width='100%' placeholder='Title' />

				<AppFormPicker
					name='category'
					items={categories}
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
				/>
				<AppFormConditionalElement
					checkCondition={values => {
						return values.category === disceaseKeyword;
					}}
				>
					<AppFormPicker
						name='disease'
						items={diseases}
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
							return <AppText>Disease</AppText>;
						}}
					/>
				</AppFormConditionalElement>

				<View style={styles.startContainer}>
					<AppText style={styles.datePickerLabel}>From:</AppText>
					<View style={styles.datePicker}>
						<AppFormDateTimePicker
							name='start'
							valueDateTransform={toDateString}
							valueTimeTransform={toTimeString}
						/>
					</View>
				</View>
				<View style={styles.startContainer}>
					<AppText style={styles.datePickerLabel}>To:</AppText>
					<View style={styles.datePicker}>
						<AppFormDateTimePicker
							name='end'
							valueDateTransform={toDateString}
							valueTimeTransform={toTimeString}
						/>
					</View>
				</View>
				<AppFormConditionalElement
					checkCondition={values => {
						return values.category !== disceaseKeyword;
					}}
				>
					<ReminderList
						name='reminders'
						style={styles.reminderList}
						onReminderDelete={reminder => {
							reminderService.cancelReminderAsync(reminder);
						}}
					/>
				</AppFormConditionalElement>

				<AppFormField
					maxLength={255}
					multiline
					name='description'
					numberOfLines={3}
					placeholder='Description'
				/>

				<AppFormColorPicker
					name='markingColor'
					colors={colorPickerItems}
				/>
				<View style={styles.buttonContainer}>
					<AppButton
						title='Close'
						onPress={() => {
							navigation.pop();
						}}
						style={styles.closeButton}
					/>
					<SubmitButton
						title='Mark in Calendar'
						style={styles.submitButton}
					/>
				</View>
			</AppForm>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { padding: 5 },
	dateTimePickerContainer: {
		flexDirection: 'row',
		marginVertical: 10,
	},
	startContainer: {
		flexDirection: 'row',
		alignItems: 'center',
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
		maxHeight: '35%',
	},
});

export default EventEditScreen;
