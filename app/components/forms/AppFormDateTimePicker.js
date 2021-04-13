import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

import DatePickerInput from '../DatePickerInput';

function AppFormDateTimePicker({
	name,
	valueDateTransform,
	valueTimeTransform,
	containerStyle,
	dateStyle,
	timeStyle,
	checkVisible = (vals, name) => true,
}) {
	const { setFieldValue, values } = useFormikContext();
	if (!checkVisible(values, name)) return null;

	return (
		<View style={[styles.container, containerStyle]}>
			<DatePickerInput
				value={values[name]}
				valueToDisplay={valueDateTransform(values[name])}
				onDateSelection={selectedDate => {
					setFieldValue(name, selectedDate);
				}}
				style={{ flexGrow: 2, ...dateStyle }}
			/>
			<DatePickerInput
				value={values[name]}
				valueToDisplay={valueTimeTransform(values[name])}
				onDateSelection={selectedDate => {
					setFieldValue(name, selectedDate);
				}}
				mode='time'
				style={{ flexGrow: 1, ...timeStyle }}
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
