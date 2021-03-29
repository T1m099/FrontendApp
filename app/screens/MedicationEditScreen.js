import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import * as Yup from 'yup';
import {ButtonAccept, ButtonDecline, ButtonStandard} from "../components/Buttons";
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
import {AntDesign} from "@expo/vector-icons";
import colors from "../config/colors";

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
        <ImageBackground source={require('../images/Background.png')} style={styles.image}>

        <View style={styles.maincontainer}>
			<AppForm
				initialValues={initMedItem(id, meds)}
				onSubmit={(values, actions) => {
					handleSubmit(values);
					actions.resetForm();
				}}
				validationSchema={validationSchema}
			>
                <View style={[styles.container, {maxHeight:150, marginBottom:5}]}>
				<AppFormField name='title' width='100%' placeholder='Title' />

				<AppText>Description:</AppText>
				<AppFormField
                    maxHeight={25}
					maxLength={255}
					multiline
					name='description'
					numberOfLines={3}
					placeholder='Description'
				/>
                </View>
                <View style={[styles.container, {maxHeight:75}]}>
                <View style={[styles.doseArea, {marginTop: 8}]}>
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
                </View>
                <View style={styles.container}>

                <AppText>Reminders:</AppText>
				<ReminderList
					name='reminders'
					style={styles.reminderList}
					onReminderDelete={reminder => {
						reminderService.cancelReminderAsync(reminder);
					}}
				/>
                </View>
				   <View style={ [styles.container, {marginTop: 5, maxHeight: 90, flexDirection: 'row'}] }>
                    <View style={ styles.buttonContainer }>
                        <ButtonDecline
                            Content={ <AntDesign name="close" size={ 24 } color="white"/> }
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
					/>
                        <ButtonAccept
                            Content={ <AntDesign name="addfile" size={ 24 } color="white"/> }
					/>
				</View>
                </View>
			</AppForm>
		</View>
        </ImageBackground>
	);
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        width: '92%',
        marginTop: '.75%',
        marginBottom: '.75%',
        textAlign: 'center',
    },    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        width: 400,
        maxHeight: 132,
        borderRadius: 10,
        marginTop: '.75%',
        marginBottom: '.75%',
        backgroundColor: 'rgba(0,0,0,.5)',
        textAlign: 'center',
        justifyContent: 'space-between'
    },
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
	doseArea: { flexDirection: 'row'  },
	unitPicker: {
        width:75,
        marginLeft: 5,
        marginRight:5,
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
