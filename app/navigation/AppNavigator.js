import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';

import MainScreen from '../screens/MainScreen';
import routes from './routes';
import OrganisationNavigator from './OrganisationNavigator';
import MedicationNavigator from '../navigation/MedicationNavigator';
import DocumentsNavigator from '../navigation/DocumentsNavigator';
import useNotifications from '../hooks/useNotifications';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
	useNotifications();
	return (
		<Tab.Navigator
			tabBarOptions={{ showLabel: false }}
			initialRouteName={routes.HOME}
		>
			<Tab.Screen
				name={routes.ORGANIZATION_TAB_NAVIGATION}
				component={OrganisationNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='calendar'
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tab.Screen
				name={routes.DOCUMENTS_TAB_NAVIGATION}
				component={DocumentsNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='file-document'
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tab.Screen
				name={routes.HOME}
				component={MainScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='home'
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tab.Screen
				name={routes.MEDICATION_TAB_NAVIGATION}
				component={MedicationNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Fontisto name='pills' color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default AppNavigator;
