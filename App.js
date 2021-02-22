import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';

import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/NavigationTheme';

export default function App() {
	return (
		<NavigationContainer theme={navigationTheme}>
			<AppNavigator />
		</NavigationContainer>
	);
}
