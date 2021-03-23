import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';

import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

const SettingsNavigator = () => (
	<Stack.Navigator mode='modal' initialRouteName={routes.SETTINGS}>
		<Stack.Screen name={routes.SETTINGS} component={SettingsScreen} />
	</Stack.Navigator>
);

export default SettingsNavigator;
