import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/auth';

import AppButton from '../components/AppButton';

function SettingsScreen(props) {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};
	return (
		<View style={styles.container}>
			<AppButton title='Logout' onPress={handleLogout}></AppButton>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
});

export default SettingsScreen;
