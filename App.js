import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/NavigationTheme';
import SecurePersistedStoreProvider from './app/components/SecurePersistedStoreProvider';

//main function of the app; top level component
export default function App() {
	return (
		<SecurePersistedStoreProvider>
			<NavigationContainer theme={navigationTheme}>
				<AppNavigator />
			</NavigationContainer>
		</SecurePersistedStoreProvider>
	);
}
