import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useFormikContext } from 'formik';

import AppText from '../AppText';
import colors from '../../config/colors';

//function component to render a form element that lets the user select a date
function AppFormDatePicker({
	name,
	valueViewTransform,
	mode = 'date',
	display = 'spinner',
	style,
	checkVisible = (vals, name) => true,
}) {
	const [visible, setVisible] = useState(false);
	const { setFieldValue, values } = useFormikContext();

	if (!checkVisible(values, name)) return null;

	//transforming the internally stored date value into a displayable string
	const viewTransform = value => {
		return value ? valueViewTransform(value) : 'Pick value';
	};

	//returning the component, which looks like a button
	//upon taping the component a little modal with the picker pops up
	return (
		<TouchableOpacity
			onPress={() => {
				setVisible(true);
			}}
		>
			<View style={[styles.container, style]}>
				<AppText style={styles.text}>
					{viewTransform(values[name])}
				</AppText>
				{visible && (
					<DateTimePicker
						testID='appFormDateTimePicker'
						value={values[name]}
						mode={mode}
						is24Hour={true}
						display={display}
						onChange={(event, selectedDate) => {
							setVisible(false);
							if (event.type !== 'dismissed') {
								setFieldValue(name, selectedDate);
							}
						}}
					/>
				)}
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
		flexDirection: 'row',
		backgroundColor: colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		width: '100%',
	},
	text: {
		fontWeight: 'bold',
	},
});

export default AppFormDatePicker;
