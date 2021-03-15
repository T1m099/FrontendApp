import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';

import CategoryManagementScreen from '../screens/CategoryManagementScreen';
import CollectionManagementScreen from '../screens/CollectionManagementScreen';
import DocumentManagementScreen from '../screens/DocumentManagementScreen';

const Stack = createStackNavigator();

const OrganisationNavigator = () => (
	<Stack.Navigator mode='modal' initialRouteName={routes.CATEGORY_MANAGEMENT}>
		<Stack.Screen
			name={routes.CATEGORY_MANAGEMENT}
			component={CategoryManagementScreen}
		/>
		<Stack.Screen
			name={routes.COLLECTION_MANAGEMENT}
			component={CollectionManagementScreen}
		/>
		<Stack.Screen
			name={routes.DOCUMENT_MANAGEMENT}
			component={DocumentManagementScreen}
		/>
	</Stack.Navigator>
);

export default OrganisationNavigator;
