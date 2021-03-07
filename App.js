import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './app/store/configureStore';
import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/NavigationTheme';

export default function App() {
	const store = configureStore();
	return (
		<Provider store={store}>
			<NavigationContainer theme={navigationTheme}>
				<AppNavigator />
			</NavigationContainer>
		</Provider>
	);
}
