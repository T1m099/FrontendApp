import React from 'react';
import { useFormikContext } from 'formik';

import {ButtonStandard} from '../Buttons';

function SubmitButton({ title }) {
	const { handleSubmit } = useFormikContext();

	return <ButtonStandard Content={title} onPress={handleSubmit} />;
}

export default SubmitButton;
