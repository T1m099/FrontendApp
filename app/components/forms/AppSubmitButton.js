import React from 'react';
import { useFormikContext } from 'formik';

import {ButtonStandard} from '../Buttons';

function SubmitButton({ title, style }) {
	const { handleSubmit } = useFormikContext();

	return <ButtonStandard Content={title} onPress={handleSubmit} style={{style} />;
}

export default SubmitButton;
