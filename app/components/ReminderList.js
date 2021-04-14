import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	TouchableHighlight,
	TouchableOpacity,
} from 'react-native';
import { useFormikContext } from 'formik';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import ListItemDeleteAction from './ListItemDeleteAction';
import DatePickerInput from './DatePickerInput';
import { AntDesign } from '@expo/vector-icons';
import colors from '../config/colors';

//function component; a list with reminders, used in forms like on the event edit screen
//can only be used in formik forms!
function ReminderList({
	name,
	style,
	valueViewTransform = date => {
		//function to transform a date into a visually appealing string
		if (typeof date.getHours === 'function') {
			return `${date.getHours()}:${
				date.getMinutes() < 10 ? '0' : ''
			}${date.getMinutes()}`;
		}
		return '';
	},
	onReminderDelete,
}) {
	const { setFieldValue, values } = useFormikContext();
	const [reminderCount, setReminderCount] = useState(0);

	//handling a click on the new reminder button
	const handlePressNewReminder = async () => {
		//creating a new reminder object
		const reminder = { id: `new_${reminderCount}`, date: new Date() };
		setReminderCount(reminderCount + 1);
		//setting the seconds to zero since they cant be configured in the displayed dialog
		reminder.date.setSeconds(0);
		//adding the new reminder to the existing reminders
		const vals = [...values[name]];
		vals.push(reminder);

		setFieldValue(name, vals);
	};

	//handling changes to a existing reminder
	const handleUpdateReminder = async (reminder, date) => {
		const reminders = [...values[name]];
		//finding the reminder
		const index = reminders.findIndex(r => r.id === reminder.id);
		//updateing its value
		reminders[index].date = date;
		setFieldValue(name, reminders);
	};

	//handling the deletion of a reminder in the list
	const handleDeleteReminder = reminder => {
		let reminders = [...values[name]];
		//find the reminder in the list
		reminders = reminders.filter(r => r.id !== reminder.id);
		//remove it from the list and save the updated list
		setFieldValue(name, reminders);
		onReminderDelete(reminder);
	};
	//rendering the component
	return (
		<View style={[styles.container, style]}>
			<TouchableOpacity
				style={styles.addReminderButton}
				onPress={handlePressNewReminder}
			>
				<AntDesign name='plus' size={24} color='white' />
			</TouchableOpacity>

			<View style={styles.listContainerStyle}>
				<FlatList
					data={values[name]}
					keyExtractor={reminder => {
						return reminder.id;
					}}
					vertical
					renderItem={({ item: reminder }) => {
						return (
							<Swipeable
								childrenContainerStyle={styles.children}
								renderRightActions={() => {
									return (
										<ListItemDeleteAction
											onPress={() => {
												handleDeleteReminder(reminder);
											}}
										/>
									);
								}}
							>
								<DatePickerInput
									value={reminder.date}
									valueToDisplay={valueViewTransform(
										reminder.date
									)}
									mode='time'
									onDateSelection={selectedDate => {
										handleUpdateReminder(
											reminder,
											selectedDate
										);
									}}
								/>
							</Swipeable>
						);
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		minHeight: 90,
		marginBottom: '.75%',
		textAlign: 'center',
		justifyContent: 'space-between',
	},

	reminderListItemChildren: {
		flexDirection: 'row',
		width: '100%',
	},
	reminderListItem: {},
	addReminderButton: {
		backgroundColor: colors.navigation,
		minWidth: 30,
		minHeight: 30,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 5,
		marginRight: 5,
	},
	listContainerStyle: { flex: 7 },
});

export default ReminderList;
