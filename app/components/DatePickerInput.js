import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import AppText from './AppText';
import colors from '../config/colors';

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
			style={style}
		>
			<View style={[styles.container, style]}>
				<AppText style={styles.text}>{valueToDisplay}</AppText>
				{visible && (
					<DateTimePicker
						testID='dateTimePicker'
						value={value}
						mode={mode}
						is24Hour={true}
						display='spinner'
						onChange={(event, selectedDate) => {
							setVisible(false);
							if (event.type !== 'dismissed') {
								onDateSelection(selectedDate);
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
		padding: 10,
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

export default DatePickerInput;
