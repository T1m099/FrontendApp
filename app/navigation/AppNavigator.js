import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import MainScreen from '../screens/MainScreen';
import routes from './routes';
import OrganisationNavigator from './OrganisationNavigator';
import MedicationNavigator from '../navigation/MedicationNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {

	return (
		<Tab.Navigator
			tabBarOptions={{ showLabel: false}}
			initialRouteName={routes.HOME}
		>
			<Tab.Screen
				name={routes.CALENDAR}
				component={OrganisationNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="calendar" size={size} color={color}/>

					),
				}}
			/>
			<Tab.Screen
				name={routes.ORGANIZATION}
				component={OrganisationNavigator}
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
				name={routes.MEDICATION}
				component={MedicationNavigator}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name='medicinebox' color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name={routes.ACCOUNT}
				component={OrganisationNavigator}
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
