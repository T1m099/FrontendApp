import React, { useState } from 'react';
import {View, StyleSheet, FlatList, TouchableHighlight, TouchableOpacity} from 'react-native';
import { useFormikContext } from 'formik';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import ListItemDeleteAction from './ListItemDeleteAction';
import DatePickerInput from './DatePickerInput';
import {AntDesign} from "@expo/vector-icons";
import colors from '../config/colors';

function ReminderList({
	name,
	style,
	valueViewTransform = date => {
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

	const handlePressNewReminder = async () => {
		const reminder = { id: `new_${reminderCount}`, date: new Date() };
		setReminderCount(reminderCount + 1);

		reminder.date.setSeconds(0);

		const vals = [...values[name]];
		vals.push(reminder);

		setFieldValue(name, vals);
	};

	const handleUpdateReminder = async (reminder, date) => {
		const reminders = [...values[name]];
		const index = reminders.findIndex(r => r.id === reminder.id);

		reminders[index].date = date;
		setFieldValue(name, reminders);
	};

	const handleDeleteReminder = reminder => {
		let reminders = [...values[name]];
		reminders = reminders.filter(r => r.id !== reminder.id);
		setFieldValue(name, reminders);
		onReminderDelete(reminder);
	};
	return (
		<View style={[styles.container, style]}>
			<TouchableOpacity
				style={ styles.addReminderButton }
				onPress={handlePressNewReminder}			>
				<AntDesign name="plus" size={ 24 } color="white"/>
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
	container: {flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		minHeight: 90,
		marginBottom: '.75%',
		textAlign: 'center',
		justifyContent: 'space-between' },

	reminderListItemChildren: {
		flexDirection: 'row',
		width: '100%',

	},
	reminderListItem: {},
	addReminderButton: {
		backgroundColor: colors.navigation,
		minWidth: 30,
		minHeight:30,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft:5,
		marginRight:5
	},
	listContainerStyle: { flex: 7,  },
});

export default ReminderList;
