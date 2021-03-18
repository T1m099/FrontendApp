import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import MainScreen from '../screens/MainScreen';
import routes from './routes';
import AuthNavigator from './AuthNavigator';
import OrganisationNavigator from './OrganisationNavigator';
import MedicationNavigator from '../navigation/MedicationNavigator';
import DocumentsNavigator from '../navigation/DocumentsNavigator';
import useNotifications from '../hooks/useNotifications';
import * as authActions from '../store/auth';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
	useNotifications();

	const isLoggedIn = useSelector(authActions.isLoggedIn());

	if (!isLoggedIn) return <AuthNavigator />;

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
