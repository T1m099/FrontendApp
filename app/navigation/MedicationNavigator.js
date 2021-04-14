import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';
import MedicationMainScreen from '../screens/MedicationMainScreen';
import MedicationEditScreen from '../screens/MedicationEditScreen';

const Stack = createStackNavigator();

//navigator for the medication management
//consisting of the main medicaiton screen with the list of medications and a screen to edit those meds
const MedicationNavigator = () => (
	<Stack.Navigator mode='modal'>
		<Stack.Screen
			name={routes.MEDICATION_STACK_NAVIGATION}
			component={MedicationMainScreen}
		/>
		<Stack.Screen
			name={routes.MEDICATION_EDIT}
			component={MedicationEditScreen}
		/>
	</Stack.Navigator>
);

export default MedicationNavigator;
