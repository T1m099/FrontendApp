import React from 'react';
import { View, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {ButtonYellow} from "../components/Buttons";
import MediactionListItem from '../components/MediactionListItem';
import routes from '../navigation/routes';
import colors from "../config/colors";

import medicationService from '../services/medicationService';
import reminderService from '../services/reminderService';

import { getMeds, medItemDeleted } from '../store/meds';

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
		dispatch(medItemDeleted(item));
	};

	const goToMedicationEdit = id => {
		navigation.push(routes.MEDICATION_EDIT, {
			id,
		});
	};

	return (
		<ImageBackground source={require('../images/Background.png')} style={styles.image}>
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
                            <ButtonYellow
                                onPress={() => {
								goToMedicationEdit('new');
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
