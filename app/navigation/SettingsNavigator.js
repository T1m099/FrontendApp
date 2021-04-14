import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';

import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();

//navigator for the settings screen
//currently there is only one screen, nested navigation would be neccessary in case more configuration options would be added
const SettingsNavigator = () => (
	<Stack.Navigator mode='modal' initialRouteName={routes.SETTINGS}>
		<Stack.Screen name={routes.SETTINGS} component={SettingsScreen} />
	</Stack.Navigator>
);

export default SettingsNavigator;
