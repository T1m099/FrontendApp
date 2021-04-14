import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormikContext } from 'formik';

import DatePickerInput from '../DatePickerInput';

//function component to display a form element that allows the user to choose a date and time
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

	//returning the component, consisting of two date input elements (one for the date and one for the time) in a row
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
