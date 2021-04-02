import React from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFormikContext } from 'formik';
import colors from "../../config/colors";
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
				style={[styles.pickerContainer, containerStyle]}
				defaultValue={values[name]}
				dropDownStyle={{backgroundColor: colors.navigation, borderColor: colors.navigation, maxWidth:84,marginLeft:5, zIndex:1000000}}
				labelStyle={{
					fontSize: 14,
					textAlign: 'left',
					color: colors.text
				}}
				itemStyle={{maxHeight: 20}}

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
	pickerContainer: {  backgroundColor:colors.navigation, borderColor: colors.navigation,color:colors.text, maxHeight:30},
});

export default AppFormDropdownPicker;
