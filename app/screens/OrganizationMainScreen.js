import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

import routes from '../navigation/routes';

function OrganisationMainScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<Button
				title='Go to calendar'
				onPress={() => {
					navigation.navigate(routes.CALENDAR);
				}}
			></Button>
			<Button
				title='Go to timeline'
				onPress={() => {
					navigation.navigate(routes.TIMELINE);
				}}
			></Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default OrganisationMainScreen;
