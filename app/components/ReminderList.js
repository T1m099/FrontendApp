import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useFormikContext } from 'formik';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import AppButton from './AppButton';
import ListItemDeleteAction from './ListItemDeleteAction';
import DatePickerInput from './DatePickerInput';

function ReminderList({ name, style, valueViewTransform, onReminderDelete }) {
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

	const handleUpdateReminder = (reminder, date) => {
		const reminders = [...values[name]];
		const index = reminders.findIndex((r) => r.id === reminder.id);
		reminders[index].date = date;
	};

	const handleDeleteReminder = (reminder) => {
		let reminders = [...values[name]];
		reminders = reminders.filter((r) => r.id !== reminder.id);
		setFieldValue(name, reminders);
		onReminderDelete(reminder);
	};
	console.log(values[name]);
	return (
		<View style={style}>
			<FlatList
				data={values[name]}
				keyExtractor={(reminder) => {
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
								onDateSelection={(date) => {
									handleUpdateReminder(reminder, date);
								}}
							/>
						</Swipeable>
					);
				}}
				ListFooterComponent={
					<AppButton
						title='New Reminder'
						onPress={handlePressNewReminder}
					/>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	reminderListItemChildren: {
		flexDirection: 'row',
		width: '100%',
	},
	reminderListItem: { marginTop: 10 },
});

export default ReminderList;
