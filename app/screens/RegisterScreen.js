import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import ErrorMessage from '../components/forms/AppErrorMessage';
import Form from '../components/forms/AppForm';
import FormField from '../components/forms/AppFormField';
import SubmitButton from '../components/forms/AppSubmitButton';
import * as authActions from '../store/auth';
/* import useApi from '../hooks/useApi';
 import ActivityIndicator from '../components/ActivityIndicator';*/

const validationSchema = Yup.object().shape({
	name: Yup.string().required().label('Name'),
	email: Yup.string().required().email().label('Email'),
	password: Yup.string().required().min(1).label('Password'),
});

function RegisterScreen() {
	const dispatch = useDispatch();

	const handleSubmit = async userInfo => {
		dispatch(
			authActions.register({
				username: userInfo.name,
				mail: userInfo.email,
				password: userInfo.password,
			})
		);
	};

	return (
		<>
			{/* <ActivityIndicator
				visible={}
			/> */}
			<SafeAreaView style={styles.container}>
				<Form
					initialValues={{ name: '', email: '', password: '' }}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					<FormField
						autoCorrect={false}
						icon='account'
						name='name'
						placeholder='Name'
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
					<SubmitButton title='Register' />
				</Form>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
});

export default RegisterScreen;
