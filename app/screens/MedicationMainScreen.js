import React from 'react';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import {ButtonYellow} from "../components/Buttons";
import routes from '../navigation/routes';
import colors from "../config/colors";
import {AntDesign} from "@expo/vector-icons";

function MedicationMainScreen({ navigation }) {
	return (
		<ImageBackground source={require('../images/Background.png')} style={styles.image}>

			<View style={styles.container}>
				<Text style={styles.text}>Dashboard</Text>

				<ButtonYellow
					Content={<AntDesign name="dashboard" size={24} color="white"/>}
					onPress={() => {
						navigation.navigate(routes.CALENDAR);
					}}
				></ButtonYellow>
			</View>

		</ImageBackground>

	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		width: '92%',
		maxHeight: 81,
		borderRadius: 10,
		marginTop: '.75%',
		marginBottom: '.75%',
		backgroundColor: 'rgba(0,0,0,.5)',
		textAlign: 'center',
		justifyContent: 'space-between'
	},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center"
	},
	text: {
		alignItems: 'flex-start',
		flex: 1,
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.text,
		marginLeft: '2%',

	}
});

export default MedicationMainScreen;
