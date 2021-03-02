import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';

import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import AppFormDateTimePicker from '../components/forms/AppFormDateTimePicker';
import SubmitButton from '../components/forms/AppSubmitButton';
import AppFormPicker from '../components/forms/AppFormPicker';

function EventEditScreen({ navigation, route }) {
	const {
		valueDateViewTransform,
		valueTimeViewTransform,
		event,
		onSubmit,
	} = route.params;
	event.color = { label: 'Red', value: '#ff0000' };

	const validationSchema = Yup.object().shape({
		title: Yup.string().required().min(1).label('Title'),
		description: Yup.string().label('Description'),
	});

	const pickerItems = [
		{ label: 'Blue', value: '#0000ff' },
		{ label: 'Green', value: '#00ff00' },
		{ label: 'Red', value: '#ff0000' },
	];

	const handleSubmit = (event) => {
		const e = { ...event };
		e.color = event.color.value;
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
				<AppText>Title:</AppText>
				<AppFormField name='title' width='100%' placeholder='Title' />
				<AppText>Start:</AppText>
				<AppFormDateTimePicker
					name='start'
					valueDateTransform={valueDateViewTransform}
					valueTimeTransform={valueTimeViewTransform}
				/>
				<AppText>End:</AppText>
				<AppFormDateTimePicker
					name='end'
					valueDateTransform={valueDateViewTransform}
					valueTimeTransform={valueTimeViewTransform}
				/>
				<AppText>Description:</AppText>
				<AppFormField
					maxLength={255}
					multiline
					name='description'
					numberOfLines={3}
					placeholder='Description'
				/>
				<AppFormPicker
					name='color'
					items={pickerItems}
					placeholder='Choose color'
				/>
				<SubmitButton title='Mark in Calendar' />
			</AppForm>
			<AppButton
				title='Close'
				onPress={() => {
					navigation.pop();
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { padding: 5 },
	dateTimePickerContainer: {
		flexDirection: 'row',
		marginVertical: 10,
	},
});

export default EventEditScreen;
