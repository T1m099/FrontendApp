import { createAction } from '@reduxjs/toolkit';

//actions that are dispatched if a file should be persisted/removed
export const persistFile = createAction('file/persist');
export const removeFile = createAction('file/removeFile');
export const compareFilesWithBackend = createAction(
	'file/compareFilesWithBackend'
);
