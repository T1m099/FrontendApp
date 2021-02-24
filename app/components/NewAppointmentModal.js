import React from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import * as Yup from 'yup';

import AppButton from './AppButton';
import AppText from './AppText';

import SafeAreaScreen from './SafeAreaScreen';
import AppForm from './forms/AppForm';
import AppFormField from './forms/AppFormField';
import AppFormDateTimePicker from './forms/AppFormDateTimePicker';
import SubmitButton from './forms/AppSubmitButton';
import AppFormPicker from './forms/AppFormPicker';

function NewAppointmentModal({
	visible,
	onPressClose,
	valueDateViewTransform,
	valueTimeViewTransform,
	startDate,
	endDate,
	title,
	description,
	onSubmit,
}) {
	const validationSchema = Yup.object().shape({
		title: Yup.string().required().min(1).label('Title'),
		description: Yup.string().label('Description'),
	});

	const pickerItems = [
		{ label: 'Blue', value: '#0000ff' },
		{ label: 'Green', value: '#00ff00' },
		{ label: 'Red', value: '#ff0000' },
	];

	const handleSubmit = (appointment) => {
		const apmnt = { ...appointment };
		apmnt.color = appointment.color.value;
		onSubmit(apmnt);
		onPressClose();
	};

	return (
		<SafeAreaScreen>
			<Modal visible={visible} animationType='slide'>
				<View style={styles.container}>
					<AppText>New Appointment</AppText>

					<AppForm
						initialValues={{
							start: startDate,
							end: endDate,
							title,
							description,
						}}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}
					>
						<AppText>Title:</AppText>
						<AppFormField
							name='title'
							width='100%'
							placeholder='Title'
						/>
						<AppText>Start of Appointment:</AppText>
						<AppFormDateTimePicker
							name='start'
							valueDateTransform={valueDateViewTransform}
							valueTimeTransform={valueTimeViewTransform}
						/>
						<AppText>End of Appointment:</AppText>
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
						<SubmitButton title='Create new Appointment' />
					</AppForm>
					<AppButton title='Close' onPress={onPressClose} />
				</View>
			</Modal>
		</SafeAreaScreen>
	);
}

const styles = StyleSheet.create({
	container: { padding: 5 },
	dateTimePickerContainer: {
		flexDirection: 'row',
		marginVertical: 10,
	},
});

export default NewAppointmentModal;
