import React from 'react';
import { StyleSheet } from 'react-native';

import Text from '../AppText';

//simple function to display an error message if input validation in a form fails
function AppErrorMessage({ error, visible }) {
	if (!visible || !error) return null;

	return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
	error: { color: 'red' },
});

export default AppErrorMessage;
