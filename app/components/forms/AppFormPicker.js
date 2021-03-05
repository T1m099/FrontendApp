import React from 'react';
import { useFormikContext } from 'formik';

import Picker from '../Picker';
import ErrorMessage from './AppErrorMessage';

function AppFormPicker({
	items,
	name,
	icon,
	extractKey,
	numberOfColumns,
	renderSelectedItem,
	renderPickerItem,
	renderPlaceholder,
	style,
}) {
	const { errors, setFieldValue, touched, values } = useFormikContext();

	return (
		<>
			<Picker
				items={items}
				icon={icon}
				extractKey={extractKey}
				numberOfColumns={numberOfColumns}
				onSelectItem={({ item }) => setFieldValue(name, item)}
				renderPickerItem={renderPickerItem}
				renderSelectedItem={renderSelectedItem}
				renderPlaceholder={renderPlaceholder}
				selectedItem={values[name]}
				style={style}
			/>
			<ErrorMessage error={errors[name]} visible={touched[name]} />
		</>
	);
}

export default AppFormPicker;
