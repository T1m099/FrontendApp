import React from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFormikContext } from 'formik';

import AppErrorMessage from './AppErrorMessage';

function AppFormDropdownPicker({ name, items, containerStyle }) {
	const {
		setFieldTouched,
		setFieldValue,
		errors,
		touched,
		values,
	} = useFormikContext();
	return (
		<>
			<DropDownPicker
				items={items}
				containerStyle={[styles.pickerContainer, containerStyle]}
				defaultValue={values[name]}
				onChangeItem={(item) => {
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
