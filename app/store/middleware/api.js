import { create } from 'apisauce';

import * as actions from '../api';

const apisauceApi = create({
	baseURL: 'https://www.itworksonmymachine.studio/',
});

const api = ({ dispatch, getState }) => next => async action => {
	const conditionalDispatch = ({ type, payload }) => {
		if (typeof type === 'function') {
			dispatch(type(response.data));
		} else {
			dispatch({ type, payload });
		}
	};

	if (action.type !== actions.apiCallBegan.type) return next(action);

	const {
		auth: { token = '' },
	} = getState();

	const { url, method, data, onStart, onSuccess, onError } = action.payload;

	if (onStart) conditionalDispatch({ type: onStart });

	next(action);

	const response = await apisauceApi.any({
		url,
		method,
		data,
		headers: { Authorization: token },
	});
	if (response.ok) {
		conditionalDispatch(actions.apiCallSuccess(response.data));
		if (onSuccess) {
			conditionalDispatch({ type: onSuccess, payload: response.data });
		}
		return;
	}
	conditionalDispatch(
		actions.apiCallFailed({ error: JSON.stringify(response.originalError) })
	);

	if (onError)
		conditionalDispatch({
			type: onError,
			payload: { error: JSON.stringify(response.originalError) },
		});
};

export default api;
