import React from 'react';
import { useFormikContext } from 'formik';

import AppButton from '../AppButton';

function AppSubmitButton({ title, style }) {
	const { handleSubmit } = useFormikContext();

	return <AppButton title={title} onPress={handleSubmit} style={style} />;
}

export default AppSubmitButton;
