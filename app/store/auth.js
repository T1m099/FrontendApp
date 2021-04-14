import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './apiEvents';

const baseCredentials = { mail: '', password: '' };

//creating a store slice for the authentication
const slice = createSlice({
	name: 'auth',
	initialState: {
		credentials: { ...baseCredentials },
		token: '',
		tokenExpiry: '',
		loginFailed: false,
		loading: false,
	},
	reducers: {
		//reducer to handle successfull login actions
		loginSucceeded: (auth, action) => {
			auth.credentials = action.payload.user;
			auth.token = action.payload.token;
			auth.tokenExpiry = action.payload.expiresIn;

			auth.loginFailed = false;
			auth.loading = false;
		},
		//reducer to handle logouts
		logout: (auth, action) => {
			auth.credentials = { ...baseCredentials };
			auth.token = '';
			auth.tokenExpiry = '';
		},
		//reducer to signalize a login action has begun
		loginBegan: (auth, action) => {
			auth.loading = true;
		},
		//reducer to handle unsuccessfull login attempts
		loginFailed: (auth, action) => {
			console.error(action.payload);

			auth.credentials = { ...baseCredentials };
			auth.token = '';
			auth.tokenExpiry = '';
			auth.loginFailed = true;
			auth.loading = false;
		},
	},
});

const { loginSucceeded, loginFailed, loginBegan } = slice.actions;
export const { logout } = slice.actions;
export default slice.reducer;

//function to trigger a login api call
export const login = credentials => async dispatch => {
	dispatch(
		apiCallBegan({
			url: 'login',
			data: {
				mail: credentials.email,
				password: credentials.password,
			},
			method: 'POST',
			onStart: loginBegan.type,
			onSuccess: loginSucceeded.type,
			onError: loginFailed.type,
		})
	);
};
//function to trigger a register api call
export const register = credentials => async dispatch => {
	dispatch(
		apiCallBegan({
			url: 'register',
			data: {
				mail: credentials.email,
				password: credentials.password,
				name: credentials.name,
			},
			method: 'POST',
			onStart: loginBegan.type,
			onSuccess: loginSucceeded.type,
			onError: loginFailed.type,
		})
	);
};

//Selectors
//check whether a user is logged in
export const isLoggedIn = () =>
	createSelector(
		state => state.auth,
		auth => auth.token !== ''
	);
//check if the last login attempt has failed
export const loginHasFailed = () =>
	createSelector(
		state => state.auth,
		auth => auth.loginFailed
	);
//check if the users login has expired
export const isLoginExpired = () =>
	createSelector(
		state => state.auth,
		auth =>
			auth.tokenExpiry !== '' &&
			new Date(auth.tokenExpiry).getTime() < Date.now()
	);
