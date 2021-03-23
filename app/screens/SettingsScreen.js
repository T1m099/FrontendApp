import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth';

import AppButton from '../components/AppButton';
import routes from '../navigation/routes';

function SettingsScreen({ navigation }) {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<View style={styles.container}>
			<AppButton title='Logout' onPress={handleLogout}></AppButton>
			<AppButton
				title='Tracking Items'
				onPress={() => {
					navigation.push(routes.TRACKING_CATEGORY_EDIT);
				}}
			></AppButton>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
});

export default SettingsScreen;
