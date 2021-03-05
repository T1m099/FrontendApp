import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, FlatList, Platform } from 'react-native';

import AppButton from '../components/AppButton';
import MediactionListItem from '../components/MediactionListItem';
import routes from '../navigation/routes';

import medicationService from '../services/medicationService';
import reminderService from '../services/reminderService';

const baseMedItemDetails = {
	id: 'new',
	title: 'My Medication',
	description: '',
	unit: 'pills',
	quantity: '1',
	reminders: [],
};

function MedicationMainScreen({ navigation }) {
	const [meds, setMeds] = useState([]);

	const loadMeds = async () => {
		try {
			let loadedMeds = await medicationService.load();

			if (
				loadedMeds &&
				Array.isArray(loadedMeds) &&
				loadedMeds.length > 0
			)
				loadedMeds = loadedMeds.map(m => {
					m.reminders = reminderService.parseStringifiedReminders(
						m.reminders
					);
					return m;
				});
			setMeds(loadedMeds);
		} catch (error) {
			Alert.alert('Error', 'Loading failed.');
		}
	};

	useEffect(() => {
		loadMeds();
	}, []);

	const handleSaveMedication = async data => {
		const originalMeds = [...meds];
		const currentMeds = [...meds];
		const d = { ...data };
		//cancel all scheduled notifications for the edited item, in case there are any
		d.reminders.forEach(r => {
			if (!r.id.match(reminderService.NEW_REMINDER_PREFIX)) {
				reminderService.cancelReminderAsync(r);
			}
		});

		//checking if reminders are new and schedule notifications for them
		d.reminders = await reminderService.scheduleReminderNotificationsAsync(
			d.reminders,
			d,
			Platform.OS
		);

		if (data.id.match('new')) {
			d.id = '' + (meds.length + 1);
			currentMeds.push(d);
		} else {
			const index = currentMeds.indexOf(
				currentMeds.find(m => m.id === data.id)
			);
			currentMeds[index] = d;
		}
		persistMeds(currentMeds, originalMeds);
	};

	//TODO: Persist deletions
	const handleDeleteMedication = async item => {
		const originalMeds = [...meds];
		let currentMeds = [...meds];
		item.reminders?.forEach(r => {
			if (r.id) {
				reminderService.cancelReminderAsync(r);
			}
		});
		currentMeds = currentMeds.filter(m => m.id !== item.id);
		persistMeds(currentMeds, originalMeds);
	};
	const persistMeds = async (currentMeds, originalMeds) => {
		setMeds(currentMeds);
		try {
			await medicationService.save(currentMeds);
		} catch (error) {
			Alert.alert('Error', 'Saving failed.');
			setMeds(originalMeds);
		}
	};

	const goToMedicationEdit = item => {
		navigation.push(routes.MEDICATION_EDIT, {
			title: 'New Medication',
			description: '',
			onSubmit: values => {
				handleSaveMedication(values);
			},
			onDeleteReminder: reminder => {
				reminderService.cancelReminderAsync(reminder);
			},
			initialValues: item,
		});
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={meds ? meds : []}
				keyExtractor={item => {
					return item.id;
				}}
				renderItem={({ item }) => {
					return (
						<MediactionListItem
							data={item}
							onPress={() => {
								goToMedicationEdit(item);
							}}
							onDelete={item => {
								handleDeleteMedication(item);
							}}
						/>
					);
				}}
				ListFooterComponent={
					<React.Fragment>
						<AppButton
							onPress={() => {
								goToMedicationEdit(baseMedItemDetails);
							}}
							title='New Medication Item'
						/>
						<AppButton
							onPress={() => {
								medicationService.clear();
								setMeds([]);
							}}
							title='Clear Cache'
						/>
					</React.Fragment>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { padding: 5 },
});

export default MedicationMainScreen;
