import React from 'react';
import { useFormikContext } from 'formik';

import ErrorMessage from './ErrorMessage';
import ImageInputList from '../ImageInputList';

function FormImagePicker({ name, checkVisible = (vals, name) => true }) {
	const { errors, setFieldValue, touched, values } = useFormikContext();
	if (!checkVisible(values, name)) return null;

	const imageUris = values[name];

	const handleAdd = uri => {
		setFieldValue(name, [...imageUris, uri]);
	};

	const handleRemove = uri => {
		setFieldValue(
			name,
			imageUris.filter(imageUri => imageUri !== uri)
		);
	};

	return (
		<>
			<ImageInputList
				imageUris={imageUris}
				onAddImage={handleAdd}
				onRemoveImage={handleRemove}
			/>
			<ErrorMessage error={errors[name]} visible={touched[name]} />
		</>
	);
}

export default FormImagePicker;
