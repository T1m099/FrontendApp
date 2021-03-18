import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const MedicationNavigator = () => (
	<Stack.Navigator mode='modal'>
		<Stack.Screen name={routes.LOGIN} component={LoginScreen} />
		<Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
	</Stack.Navigator>
);

export default MedicationNavigator;
