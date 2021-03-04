import React from 'react';
import {View, StyleSheet, Text, Button, ImageBackground} from 'react-native';

import routes from '../navigation/routes';
import SafeAreaScreen from "../components/SafeAreaScreen";

function OrganisationMainScreen({ navigation }) {
	return (
		<ImageBackground source={require('../images/Background.png')} style={styles.image}>
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
		</ImageBackground>

	);
}

const styles = StyleSheet.create({
	container: {},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center"
	},
});

export default OrganisationMainScreen;
