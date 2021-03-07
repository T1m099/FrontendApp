import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	Alert,
	TouchableHighlight,
} from 'react-native';
import { useFormikContext } from 'formik';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import AppButton from './AppButton';
import ListItemDeleteAction from './ListItemDeleteAction';
import DatePickerInput from './DatePickerInput';
import reminderService from '../services/reminderService';
import AppText from './AppText';
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
		if (!reminder.id.match(reminderService.NEW_REMINDER_PREFIX)) {
			try {
				await reminderService.cancelReminderAsync(reminder.id);
			} catch (error) {
				Alert.alert(
					'Error',
					'Could not cancel reminder before updating.'
				);
			}
		}

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
			<TouchableHighlight onPress={handlePressNewReminder}>
				<View style={styles.addReminderButton}>
					<AppText>+</AppText>
				</View>
			</TouchableHighlight>
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
									onDateSelection={(event, selectedDate) => {
										if (!event.type === 'dismissed') {
											handleUpdateReminder(
												reminder,
												selectedDate
											);
										}
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
	container: { flexDirection: 'row' },
	reminderListItemChildren: {
		flexDirection: 'row',
		width: '100%',
	},
	reminderListItem: { marginTop: 10 },
	addReminderButton: {
		flexGrow: 1,
		backgroundColor: colors.primary,
		minWidth: 30,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},
	listContainerStyle: { flex: 7 },
});

export default ReminderList;
