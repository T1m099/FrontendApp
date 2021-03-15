import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import colors from '../config/colors';

function MainScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Text>Hi!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { justifyContent: 'center', alignItems: 'center', flex: 1 },
	plannerItem: {
		margin: 1,
		padding: 5,
		borderRadius: 10,
		width: '100%',
		flexDirection: 'row',
		backgroundColor: colors.primary,
	},
	plannerItemTime: { marginRight: 5 },
});

export default MainScreen;
