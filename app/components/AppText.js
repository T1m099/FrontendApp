import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../config/colors';

function AppText({ children, style, ...otherProps }) {
	return (
		<Text style={[styles.text, style]} {...otherProps}>
			{children}
		</Text>
	);
}

export default AppText;

const styles = StyleSheet.create({
	text: {
		alignItems: 'flex-start',
		flexGrow: 1,
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.text,
		marginLeft: '2%',
	},
});
