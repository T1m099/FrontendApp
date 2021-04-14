import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import { types as defaultTypes } from '../config/eventTypes';
import colors from '../config/colors';

//function component to render a field that allows the user to choose one event type such as "appointment"
//needed e.g. in the calendar screen or the timeline screen
function EventTypesSelect({
	selectedEventTypes,
	onSelectEventType,
	single = false,
	types = defaultTypes,
	style,
}) {
	const eventTypeSelectItems = [
		{
			name: 'Event Types',
			sub: types.map(t => ({ name: t })),
		},
	];

	//to render the field a foreign module is used and customized
	return (
		<SectionedMultiSelect
			items={eventTypeSelectItems}
			selectedItems={selectedEventTypes}
			uniqueKey='name'
			subKey='sub'
			selectToggleIconComponent={
				<MaterialIcons
					name='calendar'
					size={0}
					color={colors.background}
				/>
			}
			selectText='Select Event Types'
			readOnlyHeadings={true}
			showChips={false}
			showDropDowns={false}
			single={single}
			hideSearch={true}
			onSelectedItemsChange={types => {
				onSelectEventType(types);
			}}
			colors={{
				primary: colors.accept,
				text: colors.text,
				itemBackground: colors.background,
				subItemBackground: colors.background,
				subText: colors.text,
				searchSelectionColor: colors.background,
				disabled: colors.text,
			}}
			styles={{
				container: styles.container,

				selectToggle: {
					...style,
				},
				selectToggleText: {
					width: '100%',
					flexGrow: 1,
					fontSize: 21,
					fontWeight: 'bold',
					color: colors.magenta,
					textAlign: 'center',
				},
			}}
			IconRenderer={MaterialIcons}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.background,
		maxHeight: 250,
	},
});

export default EventTypesSelect;
