import { createAction } from '@reduxjs/toolkit';

//defining the events that relate to api calls
export const apiCallBegan = createAction('api/callBegan');
export const apiCallSuccess = createAction('api/callSuccess');
export const apiCallFailed = createAction('api/callFailed');
