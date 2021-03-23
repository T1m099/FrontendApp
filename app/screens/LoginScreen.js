import React, { useState } from 'react';
import { StyleSheet, Image, SafeAreaView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import ErrorMessage from '../components/forms/AppErrorMessage';
import Form from '../components/forms/AppForm';
import FormField from '../components/forms/AppFormField';
import SubmitButton from '../components/forms/AppSubmitButton';

import * as authActions from '../store/auth';

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
		<SafeAreaView style={styles.container}>
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
					icon='email'
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
				<SubmitButton title='Login' />
			</Form>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	logo: {
		width: 80,
		height: 80,
		alignSelf: 'center',
		marginTop: 50,
		marginBottom: 20,
	},
});

export default LoginScreen;
