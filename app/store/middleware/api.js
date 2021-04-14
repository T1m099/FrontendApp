import { create } from 'apisauce';

import * as actions from '../apiEvents';
import { loadingFinished, loadingStarted } from '../settings';

const apisauceApi = create({
	baseURL: 'https://www.itworksonmymachine.studio/',
});

//redux middleware that performs api calls if the corresponding actions are dispatched
const api = ({ dispatch, getState }) => next => async action => {
	//only process actions that should trigger api calls
	if (action.type !== actions.apiCallBegan.type) return next(action);

	const {
		auth: { token = '' },
	} = getState();

	const { url, method, data, onStart, onSuccess, onError } = action.payload;

	//signaling that a api call is about to begin
	if (onStart) dispatch({ type: onStart });

	next(action);

	//signaling that a api call is in progress
	dispatch(loadingStarted());
	//make a api call to the backend and await the response
	const response = await apisauceApi.any({
		url,
		method,
		data,
		headers: { Authorization: token },
	});
	//signaling that the call has ended
	dispatch(loadingFinished());

	//dispatching a success or failure action, depending on the response
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
