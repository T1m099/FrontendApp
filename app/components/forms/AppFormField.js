import React from 'react';
import { useFormikContext } from 'formik';

import TextInput from '../AppTextInput';
import AppErrorMessage from './AppErrorMessage';

//function component to render a text input field in forms
function AppFormField({
	name,
	width,
	checkVisible = (vals, name) => true,
	...otherProps
}) {
	const {
		setFieldTouched,
		setFieldValue,
		errors,
		touched,
		values,
	} = useFormikContext();

	if (!checkVisible(values, name)) return null;
	//return a controlled text input with an additional label that can contain a error message
	return (
		<>
			<TextInput
				onBlur={() => setFieldTouched(name)}
				onChangeText={text => setFieldValue(name, text)}
				value={values[name]}
				width={width}
				{...otherProps}
			/>
			<AppErrorMessage error={errors[name]} visible={touched[name]} />
		</>
	);
}

export default AppFormField;
