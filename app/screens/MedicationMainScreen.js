import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, FlatList, Platform } from 'react-native';
import AppButton from '../components/AppButton';
import MediactionListItem from '../components/MediactionListItem';
import MedicationModal from '../components/MedicationModal';

import medicationService from '../services/medicationService';
import notificationService from '../services/notificationService';

function MedicationMainScreen({ navigation }) {
	const baseMedItemDetails = {
		id: 'new',
		title: 'My Medication',
		description: '',
		unit: 'pills',
		quantity: '1',
		reminders: [],
	};

	const [meds, setMeds] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [modalItem, setModalItem] = useState(baseMedItemDetails);

	const loadMeds = async () => {
		try {
			let loadedMeds = await medicationService.load();

			if (
				loadedMeds &&
				Array.isArray(loadedMeds) &&
				loadedMeds.length > 0
			)
				loadedMeds = loadedMeds.map((m) => {
					m.reminders = m.reminders.map((r) => {
						r.date = new Date(r.date);
						return r;
					});
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

	const handleSaveMedication = async (data) => {
		const originalMeds = [...meds];
		const currentMeds = [...meds];
		const d = { ...data };
		//checking if reminders are new (no ID) and give them a id
		d.reminders = await Promise.all(
			d.reminders.map(async (r, i) => {
				if (!r.id) {
					let id;
					try {
						id = await notificationService.scheduleAsync(
							Platform.OS,
							{ title: d.title, message: d.description },
							r.date,
							false
						);
					} catch (error) {
						console.log(error);
					}

					r.id = id;
				}
				return r;
			})
		);
		console.log('now: ' + new Date(Date.now()));
		console.log('scheduled: ' + d.reminders[0].date);

		if (data.id === 'new') {
			d.id = '' + (meds.length + 1);
			currentMeds.push(d);
		} else {
			const index = currentMeds.indexOf(
				currentMeds.find((m) => m.id === data.id)
			);
			currentMeds[index] = d;
		}
		setMeds(currentMeds);
		try {
			await medicationService.save(currentMeds);
		} catch (error) {
			Alert.alert('Error', 'Saving failed.');
			setMeds(originalMeds);
		}
	};

	const handleDelete = async (item) => {
		let currentMeds = [...meds];
		currentMeds = currentMeds.filter((m) => m.id !== item.id);
		setMeds(currentMeds);
	};
	const handlePressEditItem = (item) => {
		setModalItem(item);
		setModalVisible(true);
	};
	return (
		<View style={styles.container}>
			<FlatList
				data={meds ? meds : []}
				keyExtractor={(item) => {
					return item.id;
				}}
				renderItem={({ item }) => {
					return (
						<MediactionListItem
							data={item}
							onPress={handlePressEditItem}
							onDelete={(item) => {
								handleDelete(item);
							}}
						/>
					);
				}}
				ListFooterComponent={
					<AppButton
						onPress={() => {
							setModalItem(baseMedItemDetails);
							setModalVisible(true);
						}}
						title='New Medication Item'
					/>
				}
			/>
			<MedicationModal
				visible={modalVisible}
				onPressClose={() => {
					setModalVisible(false);
				}}
				title='New Medication'
				description=''
				onSubmit={(values) => {
					handleSaveMedication(values);
				}}
				initialValues={modalItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { padding: 5 },
});

export default MedicationMainScreen;
