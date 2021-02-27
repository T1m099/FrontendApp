import React from 'react';
import { StyleSheet, Modal, View, ScrollView } from 'react-native';
import * as Yup from 'yup';

import AppButton from './AppButton';
import AppText from './AppText';

import SafeAreaScreen from './SafeAreaScreen';
import AppForm from './forms/AppForm';
import AppFormField from './forms/AppFormField';
import AppSubmitButton from './forms/AppSubmitButton';
import ReminderList, { createReminderName } from './ReminderList';
import AppFormDropdownPicker from './forms/AppFormDropdownPicker';

function MedicationModal({
	visible,
	onPressClose,
	onSubmit,
	initialValues = {
		title: 'My Meds',
		description: '',
		reminders: [],
	},
}) {
	const validationSchema = Yup.object().shape({
		title: Yup.string().required().min(1).label('Title'),
		description: Yup.string().label('Description'),
		quantity: Yup.string().required().min(0).label('Quantity'),
	});

	const dropdownItems = [
		{ label: 'Drop(s)', value: 'drops' },
		{ label: 'Pill(s)', value: 'pills' },
	];

	const handleSubmit = (values) => {
		const vals = { ...values };
		vals.reminders = [];
		const reminderRexEx = RegExp('reminder_');
		const keys = Object.keys(values);

		keys.forEach((k) => {
			if (k.match(reminderRexEx)) {
				vals.reminders.push(values[k]);
				delete vals[k];
			}
		});
		delete vals.reminderList;

		onSubmit(vals);
		onPressClose();
	};

	const mapInitialValues = (initVals) => {
		const vals = { ...initVals };
		vals.reminderList = [];

		initVals.reminders.forEach((r, i) => {
			vals[`reminder_${i + 1}`] = r;
			vals.reminderList.push({ name: createReminderName(i + 1) });
		});
		delete vals.reminders;
		return vals;
	};

	return (
		<SafeAreaScreen>
			<Modal visible={visible} animationType='slide'>
				<View style={styles.container}>
					<AppText>New Medication</AppText>

					<AppForm
						initialValues={mapInitialValues(initialValues)}
						onSubmit={handleSubmit}
						validationSchema={validationSchema}
					>
						<AppText>Title:</AppText>
						<AppFormField
							name='title'
							width='100%'
							placeholder='Title'
						/>

						<AppText>Description:</AppText>
						<AppFormField
							maxLength={255}
							multiline
							name='description'
							numberOfLines={3}
							placeholder='Description'
						/>
						<View style={styles.doseArea}>
							<AppFormDropdownPicker
								name='unit'
								items={dropdownItems}
								containerStyle={styles.unitPicker}
							/>
							<AppFormField
								maxLength={255}
								name='quantity'
								placeholder='Quantity'
								style={styles.quanitity}
							/>
						</View>
						<AppText>Reminders:</AppText>
						<ReminderList
							name='reminderList'
							style={styles.reminderList}
						/>
						<View style={styles.buttonArea}>
							<AppButton
								title='Close'
								onPress={onPressClose}
								style={styles.cancelButton}
							/>
							<AppSubmitButton
								title='Submit'
								style={styles.submitButton}
							/>
						</View>
					</AppForm>
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
	reminderList: {
		maxHeight: '35%',
	},
	buttonArea: {
		flexDirection: 'row',
	},
	doseArea: { flexDirection: 'row', height: '10%' },
	unitPicker: {
		flex: 3,
	},
	quanitity: { flex: 1, height: '100%', marginTop: 0 },

	submitButton: {
		flex: 2,
	},
	cancelButton: {
		flex: 1,
	},
});

export default MedicationModal;
