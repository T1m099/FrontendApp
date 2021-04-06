import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { apiCallBegan } from './api';

const baseCredentials = { mail: '', password: '' };

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
		loginSucceeded: (auth, action) => {
			auth.credentials = action.payload.user;
			auth.token = action.payload.token;
			auth.tokenExpiry = action.payload.expiresIn;

			auth.loginFailed = false;
			auth.loading = false;
		},
		logout: (auth, action) => {
			auth.credentials = { ...baseCredentials };
			auth.token = '';
		},
		loginBegan: (auth, action) => {
			auth.loading = true;
		},
		loginFailed: (auth, action) => {
			console.error(action.payload);
			auth.loginFailed = true;
			auth.loading = false;
		},
	},
});

const { loginSucceeded, loginFailed, loginBegan } = slice.actions;
export const { logout } = slice.actions;
export default slice.reducer;

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
export const isLoggedIn = () =>
	createSelector(
		state => state.auth,
		auth =>
			auth.credentials.username !== '' && auth.credentials.password !== ''
	);
export const loginHasFailed = () =>
	createSelector(
		state => state.auth,
		auth => auth.loginFailed
	);
export const isLoginExpired = () =>
	createSelector(
		state => state.auth,
		auth => new Date(auth.tokenExpiry).getTime() > Date.now()
	);
