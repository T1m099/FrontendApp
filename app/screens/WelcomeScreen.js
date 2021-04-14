import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { ButtonMagenta, ButtonStandard } from '../components/Buttons';
import routes from '../navigation/routes';
import colors from '../config/colors';

//screen that is shown when the user is not logged in
function WelcomeScreen({ navigation }) {
	//presenting the user with the options to either login or register
	return (
		<ImageBackground
			source={require('../images/Background.png')}
			style={styles.image}
		>
			<View style={[styles.container, { maxHeight: 200 }]}>
				<ButtonStandard
					Content='Login'
					onPress={() => {
						navigation.push(routes.LOGIN);
					}}
					size={300}
					position={'center'}
				/>
				<ButtonMagenta
					Content='Register'
					onPress={() => {
						navigation.push(routes.REGISTER);
					}}
					size={300}
					position={'center'}
				/>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		alignSelf: 'center',
		width: '92%',
		maxHeight: 81,
		borderRadius: 10,
		marginTop: '.75%',
		marginBottom: '.75%',
		backgroundColor: 'rgba(0,0,0,.5)',
		textAlign: 'center',
		justifyContent: 'space-evenly',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	text: {
		alignItems: 'flex-start',
		flex: 1,
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.text,
		marginLeft: '2%',
	},
});

export default WelcomeScreen;
