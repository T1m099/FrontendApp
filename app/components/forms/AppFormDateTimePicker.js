import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

import DatePickerInput from '../DatePickerInput';

function AppFormDateTimePicker({
	name,
	valueDateTransform,
	valueTimeTransform,
	checkVisible = (vals, name) => true,
}) {
	const { setFieldValue, values } = useFormikContext();
	if (!checkVisible(values, name)) return null;

	return (
		<View style={styles.container}>
			<DatePickerInput
				value={values[name]}
				valueToDisplay={valueDateTransform(values[name])}
				onDateSelection={selectedDate => {
					setFieldValue(name, selectedDate);
				}}
				style={{ flex: 2 }}
			/>
			<DatePickerInput
				value={values[name]}
				valueToDisplay={valueTimeTransform(values[name])}
				onDateSelection={selectedDate => {
					setFieldValue(name, selectedDate);
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
		marginVertical: 8,
	},
});

export default AppFormDateTimePicker;
