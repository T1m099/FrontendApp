import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OrganizationMainScreen from '../screens/OrganizationMainScreen';
import CalendarScreen from '../screens/CalendarScreen';
import TimelineScreen from '../screens/TimelineScreen';
import routes from './routes';
import MedicationMainScreen from '../screens/MedicationMainScreen';

const Stack = createStackNavigator();

const MedicationNavigator = () => (
	<Stack.Navigator mode='modal'>
		<Stack.Screen
			name={routes.MEDICATION}
			component={MedicationMainScreen}
		/>
		<Stack.Screen name={routes.CALENDAR} component={CalendarScreen} />
		<Stack.Screen name={routes.TIMELINE} component={TimelineScreen} />
	</Stack.Navigator>
);

export default MedicationNavigator;
