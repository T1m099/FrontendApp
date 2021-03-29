import React from 'react';
import { useFormikContext } from 'formik';

import {ButtonStandard} from '../Buttons';


function AppSubmitButton({ title, style }) {
	const { handleSubmit } = useFormikContext();

	return <ButtonStandard title={title} onPress={handleSubmit} style={style} />;
}

export default AppSubmitButton;
