import React from 'react';
import { View, StyleSheet } from 'react-native';

import DatePickerInput from './DatePickerInput';

function DateTimePickerInput({
	value,
	valueDateTransform,
	valueTimeTransform,
	onChange,
}) {
	return (
		<View style={styles.container}>
			<DatePickerInput
				value={value}
				valueToDisplay={valueDateTransform(value)}
				onDateSelection={(event, selectedDate) => {
					if (event.type !== 'dismissed') {
						onChange(selectedDate);
					}
				}}
				style={{ flex: 2 }}
			/>
			<DatePickerInput
				value={value}
				valueToDisplay={valueTimeTransform(value)}
				onDateSelection={(event, selectedDate) => {
					if (event.type !== 'dismissed') {
						onChange(selectedDate);
					}
				}}
				mode='time'
				style={{ flex: 1 }}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		marginVertical: 10,
	},
});

export default DateTimePickerInput;
