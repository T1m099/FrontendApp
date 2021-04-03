import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from '../components/AppButton';
import MediactionListItem from '../components/MediactionListItem';
import routes from '../navigation/routes';

import medicationService from '../services/medicationService';
import reminderService from '../services/reminderService';

import { deleteMedItem, getMeds } from '../store/meds';

function MedicationMainScreen({ navigation }) {
	const meds = useSelector(getMeds());
	const dispatch = useDispatch();

	//TODO: Persist deletions
	const handleDeleteMedication = async item => {
		item.reminders?.forEach(r => {
			if (r.id) {
				reminderService.cancelReminderAsync(r);
			}
		});
		dispatch(deleteMedItem({ id: item.id }));
	};

	const goToMedicationEdit = id => {
		navigation.push(routes.MEDICATION_EDIT, {
			id,
		});
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={Object.values(meds)}
				keyExtractor={item => {
					return item.id;
				}}
				renderItem={({ item }) => {
					return (
						<MediactionListItem
							data={item}
							onPress={() => {
								goToMedicationEdit(item.id);
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
								goToMedicationEdit('new');
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
