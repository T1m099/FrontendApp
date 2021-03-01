import React from 'react';
import {View, Text, Button,StyleSheet, ImageBackground} from 'react-native';
import SafeAreaScreen from '../components/SafeAreaScreen';
import routes from '../navigation/routes';


function MainScreen({ navigation }) {

	return (
		<SafeAreaScreen>
			<ImageBackground source={require('../images/Background.png')} style={styles.image}>

			<View style={styles.container}>
				<Text>Homescreen</Text>
				<Button
					borderRadius:100
					onPress={() => {
						navigation.navigate(routes.ORGANIZATION, {
							screen: routes.CALENDAR,
						});
					}}
				></Button>
			</View>
				<View style={styles.container}>
					<Text>Homescreen</Text>
					<Button style={styles.button}
						title='Go to calendar'
						onPress={() => {
							navigation.navigate(routes.ORGANIZATION, {
								screen: routes.CALENDAR,
							});
						}}
					></Button>
				</View>

			</ImageBackground>

		</SafeAreaScreen>
	);
}

const styles = StyleSheet.create({
	container: { flex:1, flexDirection:'row', alignSelf:'center',  width: '92%', maxHeight:'10%', borderRadius:10 ,marginTop:'.75%', marginBottom: '.75%', backgroundColor: 'rgba(0,0,0,.5)'},
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center"
	},
	button:{    width: 100,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 10,
		borderRadius: 100,
		backgroundColor: 'orange',  }
});

export default MainScreen;
