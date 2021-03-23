import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import { useDispatch, useSelector } from 'react-redux';

import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import AppSubmitButton from '../components/forms/AppSubmitButton';
import ReminderList from '../components/ReminderList';
import AppFormDropdownPicker from '../components/forms/AppFormDropdownPicker';

import reminderService from '../services/reminderService';

import { saveMedItem, getMeds, genId } from '../store/meds';
import routes from '../navigation/routes';

const baseMedItemDetails = {
	id: 'new',
	title: 'My Medication',
	description: '',
	unit: 'pills',
	quantity: '1',
	reminders: [],
};

function initMedItem(id, meds) {
	let mi;
	if (id.match('new')) {
		mi = { ...baseMedItemDetails };
	} else {
		mi = { ...meds[id] };
	}
	return mi;
}

function MedicationEditScreen({ route, navigation }) {
	const meds = useSelector(getMeds());
	const dispatch = useDispatch();

	const { id } = route.params;

	const validationSchema = Yup.object().shape({
		title: Yup.string().required().min(1).label('Title'),
		description: Yup.string().label('Description'),
		quantity: Yup.string().required().min(0).label('Quantity'),
	});

	const dropdownItems = [
		{ label: 'Drop(s)', value: 'drops' },
		{ label: 'Pill(s)', value: 'pills' },
	];

	const handleSaveMedication = async medItemToSave => {
		const mi = { ...medItemToSave };
		if (medItemToSave.id === 'new') mi.id = genId();
		dispatch(saveMedItem(mi));
	};

	const handleSubmit = medItemToSave => {
		handleSaveMedication(medItemToSave);
		navigation.reset({
			index: 0,
			routes: [{ name: routes.MEDICATION_STACK_NAVIGATION }],
		});
	};

	return (
		<View style={styles.container}>
			<AppForm
				initialValues={initMedItem(id, meds)}
				onSubmit={(values, actions) => {
					handleSubmit(values);
					actions.resetForm();
				}}
				validationSchema={validationSchema}
			>
				<AppText>Title:</AppText>
				<AppFormField name='title' width='100%' placeholder='Title' />

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
					name='reminders'
					style={styles.reminderList}
					onReminderDelete={reminder => {
						reminderService.cancelReminderAsync(reminder);
					}}
				/>
				<View style={styles.buttonArea}>
					<AppButton
						title='Close'
						onPress={() => {
							navigation.reset({
								index: 0,
								routes: [
									{
										name:
											routes.MEDICATION_STACK_NAVIGATION,
									},
								],
							});
						}}
						style={styles.cancelButton}
					/>
					<AppSubmitButton
						title='Submit'
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
	children: {
		flexDirection: 'row',
		backgroundColor: 'white',
		borderRadius: 25,
		padding: 10,
	},
});

export default MedicationEditScreen;
