import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AppNavigator from './app/navigation/AppNavigator';
import navigationTheme from './app/navigation/NavigationTheme';
import { store, persistor } from './app/store/store';

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<NavigationContainer theme={navigationTheme}>
					<AppNavigator />
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
}
