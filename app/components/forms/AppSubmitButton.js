import React from 'react';
import { useFormikContext } from 'formik';

import {ButtonAccept} from '../Buttons';


function AppSubmitButton({ title, position }) {
	const { handleSubmit } = useFormikContext();

	return <ButtonAccept Content={title} onPress={handleSubmit} size={340} position={position} />;
}

export default AppSubmitButton;
