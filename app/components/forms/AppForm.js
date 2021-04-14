import React from 'react';
import { Formik } from 'formik';

//function component to wrap the "formik" component so naming (app...) is in line with other appform components
function AppForm({ initialValues, onSubmit, validationSchema, children }) {
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{() => <>{children}</>}
		</Formik>
	);
}

export default AppForm;
