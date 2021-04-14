import React from 'react';
import { useFormikContext } from 'formik';

import Picker from '../Picker';
import ErrorMessage from './AppErrorMessage';
import { View } from 'react-native';

//components to render a picker in a form; tapping the picker shows a modal with the available items
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
	checkVisible = (vals, name) => true,
}) {
	const { errors, setFieldValue, touched, values } = useFormikContext();

	if (!checkVisible(values, name)) return null;

	//return a wrapped picker component to be controlled by a form
	return (
		<View style={style}>
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
		</View>
	);
}

export default AppFormPicker;
