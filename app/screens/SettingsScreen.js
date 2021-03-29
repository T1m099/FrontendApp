import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth';

import {ButtonStandard} from "../components/Buttons";
import routes from '../navigation/routes';

function SettingsScreen({ navigation }) {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<View style={styles.container}>
			<ButtonStandard title='Logout' onPress={handleLogout}></ButtonStandard>
			<ButtonStandard
				title='Tracking Items'
				onPress={() => {
					navigation.push(routes.TRACKING_CATEGORY_EDIT);
				}}
			></ButtonStandard>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
});

export default SettingsScreen;
