import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useFormikContext } from 'formik';

import AppButton from './AppButton';
import AppFormDatePicker from './forms/AppFormDatePicker';

function ReminderList({ name, style }) {
	const { setFieldValue, values } = useFormikContext();

	const toTimeString = (date) => {
		return date.toTimeString();
	};

	const handleSetReminderTime = (index, selectedDate) => {
		const reminders = [...values[name]];
		reminders[index].value = selectedDate;
		setFieldValue(name, reminders);
	};

	return (
		<View style={style}>
			<FlatList
				data={values[name]}
				keyExtractor={(item) => {
					return item.name;
				}}
				renderItem={({ item }) => {
					return (
						<View>
							<AppFormDatePicker
								name={item.name}
								valueViewTransform={toTimeString}
								mode='time'
							/>
						</View>
					);
				}}
			/>
			<AppButton
				title='New Reminder'
				onPress={async () => {
					const nd = new Date();
					const vals = [...values[name]];
					const itemName = createReminderName(vals.length + 1);

					vals.push({ name: itemName });
					setFieldValue(itemName, nd);
					setFieldValue(name, vals);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});
export const createReminderName = (num) => {
	return `reminder_${num}`;
};

export default ReminderList;
