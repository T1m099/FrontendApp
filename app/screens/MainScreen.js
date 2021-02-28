import React from 'react';
import { View, StyleSheet, Text, Button, Platform } from 'react-native';

import SafeAreaScreen from '../components/SafeAreaScreen';
import routes from '../navigation/routes';
import notificationService from '../services/notificationService';

function MainScreen({ navigation }) {
	return (
		<SafeAreaScreen>
			<View style={styles.container}>
				<Text>Homescreen</Text>
				<Button
					title='Go to calendar'
					onPress={() => {
						navigation.navigate(routes.ORGANIZATION, {
							screen: routes.CALENDAR,
						});
					}}
				></Button>
				<Button
					title='Magic.'
					onPress={async () => {
						//console.log(await notificationService.cancelAllAsync());
						console.log(await notificationService.magicMethod());
					}}
				></Button>
			</View>
		</SafeAreaScreen>
	);
}

const styles = StyleSheet.create({
	container: { justifyContent: 'center', alignItems: 'center', flex: 1 },
});

export default MainScreen;
