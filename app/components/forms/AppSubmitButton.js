import React from 'react';
import { useFormikContext } from 'formik';

import {ButtonAccept} from '../Buttons';


function AppSubmitButton({ title, position, size=340, margin }) {
	const { handleSubmit } = useFormikContext();

	return <ButtonAccept Content={title} onPress={handleSubmit} size={size} position={position} margin={margin} />;
}

export default AppSubmitButton;
