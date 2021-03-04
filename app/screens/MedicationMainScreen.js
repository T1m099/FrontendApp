import React from 'react';
import {View, StyleSheet, Button, ImageBackground} from 'react-native';

import routes from '../navigation/routes';
import SafeAreaScreen from "../components/SafeAreaScreen";

function MedicationMainScreen({ navigation }) {
	return (
		<ImageBackground source={require('../images/Background.png')} style={styles.image}>

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

export default MedicationMainScreen;
