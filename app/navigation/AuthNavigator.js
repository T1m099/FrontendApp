import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createStackNavigator();

//navigator to be shown when the user is not logged in or the login has expired.
//consisting of three screens: the welcome screen and screens for loggin in and registering
const MedicationNavigator = () => (
	<Stack.Navigator mode='modal' initialRouteName={routes.WELCOME}>
		<Stack.Screen name={routes.WELCOME} component={WelcomeScreen} />
		<Stack.Screen name={routes.LOGIN} component={LoginScreen} />
		<Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
	</Stack.Navigator>
);

export default MedicationNavigator;
