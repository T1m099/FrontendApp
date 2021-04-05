import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import ErrorMessage from '../components/forms/AppErrorMessage';
import Form from '../components/forms/AppForm';
import FormField from '../components/forms/AppFormField';
import SubmitButton from '../components/forms/AppSubmitButton';

import * as authActions from '../store/auth';
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
	email: Yup.string().required().email().label('Email'),
	password: Yup.string().required().min(4).label('Password'),
});

function LoginScreen(props) {
	const loginFailed = useSelector(authActions.loginHasFailed());
	const dispatch = useDispatch();

	const handleSubmit = async credentials => {
		dispatch(authActions.login(credentials));
	};

	return (
		<ImageBackground source={require('../images/Background.png')} style={styles.image}>
		<View style={styles.container}>
			{/* 			<Image
				style={styles.logo}
				source={require('../assets/logo-red.png')}
			/> */}

			<Form
				initialValues={{ email: '', password: '' }}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
				<ErrorMessage
					error='Invalid email and/or password.'
					visible={loginFailed}
				/>
				<FormField
					autoCapitalize='none'
					autoCorrect={false}
					icon='mail'
					keyboardType='email-address'
					name='email'
					placeholder='Email'
					textContentType='emailAddress'
				/>
				<FormField
					autoCapitalize='none'
					autoCorrect={false}
					icon='lock'
					name='password'
					placeholder='Password'
					secureTextEntry
					textContentType='password'
				/>
				<SubmitButton title='Login' position={'center'} />
			</Form>
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
		maxHeight: 300,
		borderRadius: 10,
		marginTop: '.75%',
		marginBottom: '.75%',
		backgroundColor: 'rgba(0,0,0,.5)',
		textAlign: 'center',
		justifyContent: 'space-evenly'
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

export default LoginScreen;
