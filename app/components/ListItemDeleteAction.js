import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import colors from '../config/colors';

function ListItemDeleteAction({ onPress }) {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				<AntDesign
					name='delete'
					size={25}
					color={colors.background}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.decline,
		borderRadius: 10,
		marginTop: 10,
		width: 35,
		height: 35,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default ListItemDeleteAction;
