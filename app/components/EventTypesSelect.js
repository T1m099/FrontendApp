import React from 'react';
import { View, StyleSheet } from 'react-native';
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
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
				selectToggleIconComponent={<MaterialIcons name="calendar" size={0} color={colors.background}/>}
				selectText='Filter Event Types'
				readOnlyHeadings={true}
				showChips={false}
				showDropDowns={false}
				single={single}
				hideSearch={true}
				alwaysShowSelectText={true}
				onSelectedItemsChange={types => {
					onSelectEventType(types);
				}}
				colors={{ primary: colors.accept, text: colors.text, itemBackground: colors.background, subItemBackground: colors.background, subText: colors.text,  searchSelectionColor: colors.background, disabled: colors.text}}
				styles={{
					container: {
						backgroundColor: colors.background,
						maxHeight:250,
					},

					selectToggle: {
						backgroundColor: colors.navigation,
						borderRadius: 10,
						marginTop:10 ,
						height: 65,
						width: 200,


					},
					selectToggleText:{
						marginTop:30,
						flex: 1,
						fontSize: 21,
						fontWeight: 'bold',
						color: colors.text,
						marginLeft: '15%',
					}
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
