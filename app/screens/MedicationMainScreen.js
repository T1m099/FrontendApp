import React from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	ImageBackground,
	Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonAccept } from '../components/Buttons';
import MedicationListItem from '../components/MediactionListItem';
import routes from '../navigation/routes';
import colors from '../config/colors';

import reminderService from '../services/reminderService';

import { deleteMedItem, getMeds } from '../store/meds';
import { AntDesign } from '@expo/vector-icons';
import { TRACKING } from '../config/eventTypes';

//screen that shows all saved medications
function MedicationMainScreen({ navigation }) {
	const meds = useSelector(getMeds());
	const dispatch = useDispatch();

	//handler for deleting a med item
	const handleDeleteMedication = async item => {
		item.reminders?.forEach(r => {
			if (r.id) {
				reminderService.cancelReminderAsync(r);
			}
		});
		dispatch(deleteMedItem({ id: item.id }));
	};

	//function to navigate to the medication edit screen
	const goToMedicationEdit = id => {
		navigation.push(routes.MEDICATION_EDIT, {
			id,
		});
	};

	//rendering the screen which is a list of all medication items
	//the list items are swipable to delete them
	return (
		<ImageBackground
			source={require('../images/Background.png')}
			style={styles.image}
		>
			<View>
				<FlatList
					data={Object.values(meds)}
					keyExtractor={item => {
						return item.id;
					}}
					renderItem={({ item }) => {
						return (
							<MedicationListItem
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
							<View style={styles.container}>
								<Text style={styles.text}>Add Medication</Text>

								<ButtonAccept
									onPress={() => {
										goToMedicationEdit('new');
									}}
									Content={
										<AntDesign
											name='addfolder'
											size={24}
											color='white'
										/>
									}
									margin={8}
								/>
							</View>
							<View style={styles.container}>
								<Text style={styles.text}>Go to Tracking</Text>

								<ButtonAccept
									onPress={() => {
										navigation.navigate(
											routes.ORGANIZATION_STACK_NAVIGATION,
											{
												screen: routes.EVENT_EDIT,
												params: {
													id: 'new',
													newEventType: TRACKING,
													dayTimestamp: Date.now(),
												},
											}
										);
									}}
									Content={
										<AntDesign
											name='addfolder'
											size={24}
											color='white'
										/>
									}
									margin={8}
								/>
							</View>
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
		height: 81,
		borderRadius: 10,
		marginTop: '.75%',
		marginBottom: '.75%',
		backgroundColor: 'rgba(0,0,0,.5)',
		textAlign: 'center',
		justifyContent: 'space-between',
	},

	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	text: {
		alignItems: 'flex-start',
		flex: 1,
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.text,
		marginLeft: '2%',
	},
});

export default MedicationMainScreen;
