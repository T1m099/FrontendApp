import React from 'react';
import { View, StyleSheet } from 'react-native';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import routes from '../navigation/routes';

function WelcomeScreen({ navigation }) {
	return (
		<View style={styles.container}>
			<AppText>Welcome to TheraPie!</AppText>
			<AppButton
				title='Login'
				onPress={() => {
					navigation.push(routes.LOGIN);
				}}
			/>
			<AppButton
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
