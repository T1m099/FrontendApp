import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView, View } from 'react-native';

//function component to wrapp other components in a view that escapes screen notches
function SafeAreaScreen({ children, style }) {
	return (
		<SafeAreaView style={[styles.screen, style]}>
			<View style={[styles.view, style]}>{children}</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	screen: {
		paddingTop: Constants.statusBarHeight,
		flex: 1,
	},
	view: {
		flex: 1,
	},
});

export default SafeAreaScreen;
