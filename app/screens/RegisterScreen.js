import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, ImageBackground, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import colors from "../config/colors";
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
		dispatch(authActions.register(userInfo));
	};

    return (
        <>
            {/* <ActivityIndicator
				visible={}
			/> */ }
            <ImageBackground source={ require('../images/Background.png') } style={ styles.image }>


                <View style={ [styles.container, {maxHeight: 400}] }>
                    <Form
                        initialValues={ {name: '', email: '', password: ''} }
                        onSubmit={ handleSubmit }
                        validationSchema={ validationSchema }
                    >
                        <FormField
                            autoCorrect={ false }

                            icon='user'
                            name='name'
                            placeholder='Name'
                        />
                        <FormField
                            autoCapitalize='none'
                            autoCorrect={ false }
                            icon='mail'
                            keyboardType='email-address'
                            name='email'
                            placeholder='Email'
                            textContentType='emailAddress'
                        />
                        <FormField
                            autoCapitalize='none'
                            autoCorrect={ false }
                            icon='lock'
                            name='password'
                            placeholder='Password'
                            secureTextEntry
                            textContentType='password'
                        />
                        <SubmitButton title='Register' position={'center'}/>
                    </Form>
                </View>


            </ImageBackground>

        </>
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

export default RegisterScreen;
