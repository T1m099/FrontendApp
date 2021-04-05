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
					color={'#ffffff'}
				/>
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.decline,
		borderRadius: 10,
		marginTop: 5.8,
		marginRight:12,
		width: 35,
		height: 35,
		justifyContent: 'center',
		alignItems: 'center',

	},
});

export default ListItemDeleteAction;
