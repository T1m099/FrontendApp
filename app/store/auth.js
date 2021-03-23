import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const baseCredentials = { username: '', mail: '', password: '' };

const slice = createSlice({
	name: 'auth',
	initialState: {
		credentials: { ...baseCredentials },
		token: '',
		loginFailed: false,
	},
	reducers: {
		credentialsSaved: (auth, action) => {
			auth.credentials = action.payload;
		},
		credentialsDeleted: (auth, action) => {
			auth.credentials = { ...baseCredentials };
		},
		loginSucceeded: (auth, action) => {
			auth.loginFailed = false;
		},
		loginFailed: (auth, action) => {
			auth.loginFailed = true;
		},
	},
});

const {
	credentialsSaved,
	credentialsDeleted,
	loginSucceeded,
	loginFailed,
} = slice.actions;
export default slice.reducer;

export const login = credentials => async dispatch => {
	dispatch(credentialsSaved(credentials));
	dispatch(loginSucceeded());
};
export const logout = () => async dispatch => {
	dispatch(credentialsDeleted());
};
export const register = credentials => async dispatch => {
	dispatch(credentialsSaved(credentials));
	dispatch(loginSucceeded());
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
