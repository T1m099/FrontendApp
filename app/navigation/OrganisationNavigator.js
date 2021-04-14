import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OrganizationMainScreen from '../screens/OrganizationMainScreen';
import CalendarScreen from '../screens/CalendarScreen';
import TimelineScreen from '../screens/TimelineScreen';
import routes from './routes';
import EventEditScreen from '../screens/EventEditScreen';
import DateEventScreen from '../screens/DateEventsScreen';
import TestScreen from '../screens/TestScreen';

const Stack = createStackNavigator();

//navigator for the organization tab containing the calender and all corresponding screens as well as the timeline screen
const OrganisationNavigator = () => (
	<Stack.Navigator
		mode='modal'
		initialRouteName={routes.ORGANIZATION_STACK_NAVIGATION}
	>
		<Stack.Screen
			name={routes.ORGANIZATION_STACK_NAVIGATION}
			component={OrganizationMainScreen}
		/>
		<Stack.Screen name={routes.CALENDAR} component={CalendarScreen} />
		<Stack.Screen name={routes.EVENT_EDIT} component={EventEditScreen} />
		<Stack.Screen
			name={routes.DATE_EVENT_OVERVIEW}
			component={DateEventScreen}
		/>
		<Stack.Screen name={routes.TIMELINE} component={TimelineScreen} />
	</Stack.Navigator>
);

export default OrganisationNavigator;
