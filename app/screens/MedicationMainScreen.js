import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, FlatList, Platform, ImageBackground } from 'react-native';

import {ButtonYellow} from "../components/Buttons";
import MediactionListItem from '../components/MediactionListItem';
import routes from '../navigation/routes';
import colors from "../config/colors";

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
		<ImageBackground source={require('../images/Background.png')} style={styles.image}>
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
                            <ButtonYellow
                                onPress={() => {
                                    goToMedicationEdit(baseMedItemDetails);
                                }}
                                Content='New Medication Item'
                            />
                            <ButtonYellow
                                onPress={() => {
                                    medicationService.clear();
                                    setMeds([]);
                                }}
                                Content='Clear Cache'
                            />
                        </React.Fragment>
                    }
                />
			</View>

		</ImageBackground>

    );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		width: '92%',
		maxHeight: 81,
		borderRadius: 10,
		marginTop: '.75%',
		marginBottom: '.75%',
		backgroundColor: 'rgba(0,0,0,.5)',
		textAlign: 'center',
		justifyContent: 'space-between'
	},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center"
	},
	text: {
		alignItems: 'flex-start',
		flex: 1,
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.text,
		marginLeft: '2%',

	}
});

export default MedicationMainScreen;
