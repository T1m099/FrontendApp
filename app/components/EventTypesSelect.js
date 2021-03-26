import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

import { types as defaultTypes } from '../config/eventTypes';
import colors from '../config/colors';

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
	return (
		<View style={[styles.container, style]}>
			<SectionedMultiSelect
				items={eventTypeSelectItems}
				selectedItems={selectedEventTypes}
				uniqueKey='name'
				subKey='sub'
				selectText='Event Types'
				readOnlyHeadings={true}
				showChips={false}
				showDropDowns={false}
				single={single}
				onSelectedItemsChange={types => {
					onSelectEventType(types);
				}}
				colors={{ primary: colors.accent }}
				styles={{
					selectToggle: {
						backgroundColor: colors.primary,
						borderRadius: 25,
					},
				}}
				IconRenderer={MaterialIcons}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default EventTypesSelect;
