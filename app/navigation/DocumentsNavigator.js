import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OrganizationMainScreen from '../screens/OrganizationMainScreen';
import CalendarScreen from '../screens/CalendarScreen';
import TimelineScreen from '../screens/TimelineScreen';
import routes from './routes';
import EventEditScreen from '../screens/EventEditScreen';
import DateEventScreen from '../screens/DateEventsScreen';
import TestScreen from '../screens/TestScreen';
import DocumentManagementScreen from '../screens/DocumentManagementScreen';

const Stack = createStackNavigator();

const OrganisationNavigator = () => (
	<Stack.Navigator mode='modal' initialRouteName={routes.DOCUMENT_MANAGEMENT}>
		<Stack.Screen
			name={routes.DOCUMENT_MANAGEMENT}
			component={DocumentManagementScreen}
		/>
	</Stack.Navigator>
);

export default OrganisationNavigator;
