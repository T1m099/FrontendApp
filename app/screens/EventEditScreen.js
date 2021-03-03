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

function EventEditScreen({ navigation, route }) {
	const {
		valueDateViewTransform,
		valueTimeViewTransform,
		event,
		onSubmit,
	} = route.params;

	const validationSchema = Yup.object().shape({
		title: Yup.string().required().min(1).label('Title'),
		description: Yup.string().label('Description'),
	});

	const pickerItems = ['#ff0000', '#00ff00', '#0000ff', '#0f0f00'];

	const handleSubmit = event => {
		onSubmit(event);
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

				<AppFormField
					maxLength={255}
					multiline
					name='description'
					numberOfLines={3}
					placeholder='Description'
				/>

				<AppFormColorPicker name='markingColor' colors={pickerItems} />
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
});

export default EventEditScreen;
