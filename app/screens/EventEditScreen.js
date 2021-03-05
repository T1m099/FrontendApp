import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

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

function EventEditScreen({ navigation, route }) {
	const disceaseKeyword = 'Disease';
	const {
		valueDateViewTransform,
		valueTimeViewTransform,
		event,
		onSubmit,
		onDeleteReminder,
	} = route.params;

	const validationSchema = Yup.object().shape({
		title: Yup.string().required().min(1).label('Title'),
		description: Yup.string().label('Description'),
	});

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

	const handleSubmit = event => {
		const e = { ...event };
		/* if (e.category === disceaseKeyword) {
			if (e.reminders) delete e.reminders;
		} else {
			if (e.disease) delete e.disease;
		} */
		onSubmit(e);
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
							valueDateTransform={valueDateViewTransform}
							valueTimeTransform={valueTimeViewTransform}
						/>
					</View>
				</View>
				<View style={styles.startContainer}>
					<AppText style={styles.datePickerLabel}>To:</AppText>
					<View style={styles.datePicker}>
						<AppFormDateTimePicker
							name='end'
							valueDateTransform={valueDateViewTransform}
							valueTimeTransform={valueTimeViewTransform}
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
							onDeleteReminder(reminder);
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
