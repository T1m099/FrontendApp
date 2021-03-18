import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

const baseCredentials = { username: '', password: '' };

const slice = createSlice({
	name: 'auth',
	initialState: {
		credentials: { ...baseCredentials },
		token: '',
	},
	reducers: {
		credentialsSaved: (auth, action) => {
			auth.credentials = action.payload;
		},
		credentialsDeleted: (auth, action) => {
			auth.credentials = { ...baseCredentials };
		},
	},
});

const { credentialsSaved, credentialsDeleted } = slice.actions;
export default slice.reducer;

export const login = credentials => async dispatch => {
	dispatch(credentialsSaved(credentials));
};
export const logout = () => async dispatch => {
	dispatch(credentialsDeleted());
};

//Selectors
export const isLoggedIn = () =>
	createSelector(
		state => state.auth,
		auth => auth.credentials.username && auth.credentials.password
	);
