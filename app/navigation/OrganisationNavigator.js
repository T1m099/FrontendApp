import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OrganizationMainScreen from '../screens/OrganizationMainScreen';
import CalendarScreen from '../screens/CalendarScreen';
import TimelineScreen from '../screens/TimelineScreen';
import routes from './routes';

const Stack = createStackNavigator();

const OrganisationNavigator = () => (
	<Stack.Navigator mode='modal' initialRouteName={routes.ORGANIZATION}>
		<Stack.Screen
			name={routes.ORGANIZATION}
			component={OrganizationMainScreen}
		/>
		<Stack.Screen name={routes.CALENDAR} component={CalendarScreen} />
		<Stack.Screen name={routes.TIMELINE} component={TimelineScreen} />
	</Stack.Navigator>
);

export default OrganisationNavigator;
