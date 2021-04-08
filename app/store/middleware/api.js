import { create } from 'apisauce';

import * as actions from '../apiEvents';

const apisauceApi = create({
	baseURL: 'https://www.itworksonmymachine.studio/',
});

const api = ({ dispatch, getState }) => next => async action => {
	if (action.type !== actions.apiCallBegan.type) return next(action);

	const {
		auth: { token = '' },
	} = getState();

	const { url, method, data, onStart, onSuccess, onError } = action.payload;

	if (onStart) dispatch({ type: onStart });

	next(action);

	const response = await apisauceApi.any({
		url,
		method,
		data,
		headers: { Authorization: token },
	});
	if (response.ok) {
		dispatch(actions.apiCallSuccess(response.data));
		if (onSuccess) {
			dispatch({ type: onSuccess, payload: response.data });
		}
		return;
	}
	dispatch(actions.apiCallFailed(JSON.stringify(response.originalError)));

	if (onError)
		dispatch({
			type: onError,
			payload: JSON.stringify(response.originalError),
		});
};

export default api;
