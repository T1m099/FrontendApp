import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';

import FoldersManagementScreen from '../screens/FolderManagementScreen';

const Stack = createStackNavigator();

const OrganisationNavigator = () => (
	<Stack.Navigator mode='modal' initialRouteName={routes.FOLDER_MANAGEMENT}>
		<Stack.Screen
			name={routes.FOLDER_MANAGEMENT}
			component={FoldersManagementScreen}
			initialParams={{ parantId: 'root' }}
		/>
	</Stack.Navigator>
);

export default OrganisationNavigator;
