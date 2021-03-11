import React from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFormikContext } from 'formik';

function AppFormDropdownPicker({
	name,
	items,
	containerStyle,
	checkVisible = (vals, name) => true,
}) {
	const {
		setFieldTouched,
		setFieldValue,

		values,
	} = useFormikContext();
	if (!checkVisible(values, name)) return null;

	return (
		<>
			<DropDownPicker
				items={items}
				containerStyle={[styles.pickerContainer, containerStyle]}
				defaultValue={values[name]}
				onChangeItem={item => {
					setFieldTouched(name, true);
					setFieldValue(name, item.value);
				}}
			/>

			{/* <AppErrorMessage error={errors[name]} visible={touched[name]} /> */}
		</>
	);
}

const styles = StyleSheet.create({
	pickerContainer: {},
});

export default AppFormDropdownPicker;
