import { create } from 'apisauce';

import * as actions from '../api';

const apisauceApi = create({
	baseURL: 'http://192.168.178.20/',
});

const api = ({ dispatch }) => next => async action => {
	const conditionalDispatch = ({ type, payload }) => {
		if (typeof type === 'function') {
			dispatch(type(response.data));
		} else {
			dispatch({ type, payload });
		}
	};

	if (action.type !== actions.apiCallBegan.type) return next(action);

	const { url, method, data, onStart, onSuccess, onError } = action.payload;

	if (onStart) conditionalDispatch({ type: onStart });

	next(action);

	const response = await apisauceApi.any({
		url,
		method,
		data,
	});
	if (response.ok) {
		conditionalDispatch(actions.apiCallSuccess(response.data));
		if (onSuccess) {
			conditionalDispatch({ type: onSuccess, payload: response.data });
		}
		return;
	}
	conditionalDispatch(actions.apiCallFailed(response.problem));

	if (onError)
		conditionalDispatch({
			type: onError,
			payload: { error: JSON.stringify(response.originalError) },
		});
};

export default api;
