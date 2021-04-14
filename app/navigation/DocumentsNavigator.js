import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';

import FoldersManagementScreen from '../screens/DocumentManagementScreen';

const Stack = createStackNavigator();

//navigator for the document management
//only consists of a single screen, but this screen can be accessed with different root ids
//depending on the root id a different list of folders and files is shown
const OrganisationNavigator = () => (
	<Stack.Navigator mode='modal' initialRouteName={routes.FOLDER_MANAGEMENT}>
		<Stack.Screen
			name={routes.FOLDER_MANAGEMENT}
			component={FoldersManagementScreen}
			initialParams={{ parentId: 'root' }}
		/>
	</Stack.Navigator>
);

export default OrganisationNavigator;
