import React from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';

function TimelineScreen(props) {
	return (
		<ImageBackground source={require('../images/Background.png')} style={styles.image}>
		<View style={styles.container}>
			<Text>This will be the timeline</Text>
		</View>
</ImageBackground>

);
}

const styles = StyleSheet.create({
	container: {},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center"
	},
});

export default TimelineScreen;
