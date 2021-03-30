import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import MainScreen from '../screens/MainScreen';
import routes from './routes';
import AuthNavigator from './AuthNavigator';
import OrganisationNavigator from './OrganisationNavigator';
import MedicationNavigator from '../navigation/MedicationNavigator';
import DocumentsNavigator from '../navigation/DocumentsNavigator';
import useNotifications from '../hooks/useNotifications';
import * as authActions from '../store/auth';
import SettingsNavigator from './SettingsNavigator';

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
				name={routes.ORGANIZATION_STACK_NAVIGATION}
				component={OrganisationNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="calendar" size={size} color={color}/>

					),
				}}
			/>
			<Tab.Screen
				name={routes.DOCUMENTS_STACK_NAVIGATION}
				component={DocumentsNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign
							name='book'
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
						<AntDesign
							name='home'
							color={color}
							size={size}
						/>
					),
				}}
			/>
			<Tab.Screen
				name={routes.MEDICATION_STACK_NAVIGATION}
				component={MedicationNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name='medicinebox' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name={routes.SETTINGS_STACK_NAVIGATION}
				component={SettingsNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign
							name='user'
							color={color}
							size={size}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
};

export default AppNavigator;
