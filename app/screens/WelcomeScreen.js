import React from 'react';
import { View, StyleSheet } from 'react-native';

import {ButtonStandard} from "../components/Buttons";
import AppText from '../components/AppText';
import routes from '../navigation/routes';

function WelcomeScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<AppText>Welcome to TheraPie!</AppText>
			<ButtonStandard
				title='Login'
				onPress={() => {
					navigation.push(routes.LOGIN);
				}}
			/>
			<ButtonStandard
				title='Register'
				onPress={() => {
					navigation.push(routes.REGISTER);
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default WelcomeScreen;
