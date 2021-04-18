import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import AppText from './AppText';
import colors from '../config/colors';

//function component to render a date input field,
//the picker looks like a text field with the selected value, but upon clicking on it a date picker popup is shown
function DatePickerInput({
	value,
	valueToDisplay,
	mode = 'date',
	onDateSelection,
	style,
}) {
	const [visible, setVisible] = useState(false);
	return (
		<TouchableOpacity
			onPress={() => {
				setVisible(true);
			}}
			style={[styles.container, style]}
		>
			<AppText style={styles.text}>{valueToDisplay}</AppText>
			{visible && (
				<DateTimePicker
					testID='dateTimePicker'
					value={value}
					mode={mode}
					display={Platform.OS === 'android' ? 'spinner' : 'default'}
					onChange={(event, selectedDate) => {
						setVisible(false);
						if (event.type !== 'dismissed') {
							onDateSelection(selectedDate);
						}
					}}
				/>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flexDirection: 'row',
		backgroundColor: colors.navigation,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		marginTop: 5,
	},
	text: {
		fontWeight: 'bold',
		color: colors.text,
	},
});

export default DatePickerInput;
