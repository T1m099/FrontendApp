import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

function MedicationMainScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.container}>
				<Button
					title='Go to Medication Dashboard'
					onPress={() => {
						navigation.navigate(routes.CALENDAR);
					}}
				></Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default MedicationMainScreen;
