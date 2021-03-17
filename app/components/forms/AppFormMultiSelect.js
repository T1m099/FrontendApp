import React from 'react';
import { useFormikContext } from 'formik';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';

import AppErrorMessage from './AppErrorMessage';
import colors from '../../config/colors';

function AppFormMultiSelect({
	name,
	items,
	checkVisible = (vals, name) => true,
}) {
	const { setFieldValue, errors, touched, values } = useFormikContext();

	if (!checkVisible(values, name)) return null;

	const onSelectedItemsChange = selectedItems => {
		setFieldValue(name, selectedItems);
	};
	return (
		<>
			<SectionedMultiSelect
				items={items}
				IconRenderer={MaterialIcons}
				uniqueKey='name'
				subKey='children'
				selectText='Symptoms'
				showDropDowns={true}
				readOnlyHeadings={true}
				onSelectedItemsChange={onSelectedItemsChange}
				selectedItems={values[name]}
				colors={{ primary: colors.accent }}
				styles={{
					selectToggle: {
						backgroundColor: colors.primary,
						borderRadius: 25,
					},
				}}
			/>
			<AppErrorMessage error={errors[name]} visible={touched[name]} />
		</>
	);
}

export default AppFormMultiSelect;
