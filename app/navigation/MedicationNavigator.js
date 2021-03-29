import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CalendarScreen from '../screens/CalendarScreen';
import TimelineScreen from '../screens/TimelineScreen';
import routes from './routes';
import MedicationMainScreen from '../screens/MedicationMainScreen';
import MedicationEditScreen from '../screens/MedicationEditScreen';

const Stack = createStackNavigator();

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
		<Stack.Screen name={routes.CALENDAR} component={CalendarScreen} />
		<Stack.Screen name={routes.TIMELINE} component={TimelineScreen} />
	</Stack.Navigator>
);

export default MedicationNavigator;
