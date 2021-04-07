import { createAction } from '@reduxjs/toolkit';

export const persistFile = createAction('file/persist');
export const removeFile = createAction('file/removeFile');
export const compareFilesWithBackend = createAction(
	'file/compareFilesWithBackend'
);
