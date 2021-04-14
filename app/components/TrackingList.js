import { useFormikContext } from 'formik';
import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import AppTextInput from './AppTextInput';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ListItemDeleteAction from './ListItemDeleteAction';
import colors from '../config/colors';
import { AntDesign } from '@expo/vector-icons';

//function component to render a list of tracking items in forms
//can only be used in formik forms
//uses an object rather than an array to store its values
function TrackingList({ name }) {
	//obtaining a reference to the values stored in the formik context
	const { setFieldValue, values } = useFormikContext();

	//handling the deletion of a tracking item
	const handleDeleteTrackinItem = trackingItem => {
		const currentTrackingItems = { ...values[name] };
		delete currentTrackingItems[trackingItem.key];

		setFieldValue(name, currentTrackingItems);
	};

	//creating a new tracking item if the add button is pressed
	const handleNewTrackingItem = () => {
		const trackingItems = { ...values[name] };
		trackingItems.new = 0;

		setFieldValue(name, trackingItems);
	};

	//handling the change of the name of a tracking item
	const handleChangedKey = (oldKey, newKey) => {
		const currentTrackingItems = { ...values[name] };
		//creating a new attribute in the data object with the new key and old value
		currentTrackingItems[newKey] = currentTrackingItems[oldKey];
		//deleting the old key from the object
		delete currentTrackingItems[oldKey];
		//updating the stored object
		setFieldValue(name, currentTrackingItems);
	};

	//handling the change of the value of a tracking item
	const handleChangedValue = (key, value) => {
		const currentTrackingItems = { ...values[name] };
		//finding the value by its key and updating it
		currentTrackingItems[key] = value;

		setFieldValue(name, currentTrackingItems);
	};

	//function to map the data object to an array with the data; neccessary because the rendering function only takes arrays
	const mapTrackingItemsToArray = trackingItems => {
		const itemArray = [];
		Object.keys(trackingItems).forEach(key =>
			itemArray.push({ key, value: trackingItems[key] })
		);
		return itemArray;
	};

	//rendering the componet which is a list of input field pairs (one for the key and one for the value)
	return (
		<View style={[styles.container]}>
			<TouchableOpacity
				style={styles.addReminderButton}
				onPress={handleNewTrackingItem}
			>
				<AntDesign name='plus' size={24} color='white' />
			</TouchableOpacity>

			<View style={styles.listContainerStyle}>
				<FlatList
					data={mapTrackingItemsToArray(values[name])}
					keyExtractor={item => item.key}
					vertical
					renderItem={({ item, index }) => {
						return (
							<Swipeable
								childrenContainerStyle={{}}
								renderRightActions={() => {
									return (
										<ListItemDeleteAction
											onPress={() => {
												handleDeleteTrackinItem(item);
											}}
										/>
									);
								}}
							>
								<View style={styles.inputRow}>
									<AppTextInput
										defaultValue={item.key}
										key={`category${index}`}
										style={styles.input1}
										onEndEditing={event => {
											handleChangedKey(
												item.key,
												event.nativeEvent.text
											);
										}}
										bufferDelay={20}
									/>
									<AppTextInput
										defaultValue={'' + item.value}
										key={`value${index}`}
										style={styles.input2}
										onChangeText={text => {
											handleChangedValue(item.key, text);
										}}
										keyboardType='numeric'
									/>
								</View>
							</Swipeable>
						);
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		minHeight: 90,
		marginBottom: '.75%',
		textAlign: 'center',
		justifyContent: 'space-between',
	},

	reminderListItemChildren: {
		flexDirection: 'row',
		width: '100%',
	},
	reminderListItem: {},
	addReminderButton: {
		backgroundColor: colors.navigation,
		minWidth: 30,
		minHeight: 30,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 5,
		marginRight: 5,
	},
	inputRow: { flexDirection: 'row' },
	input1: {
		flex: 1,
		backgroundColor: colors.primary,
		borderRadius: 10,
		width: '19%',
		marginLeft: '4%',
		height: 50,
	},
	input2: {
		width: '75%',
		marginRight: '4%',
		marginLeft: '-4%',
		backgroundColor: colors.navigation,
		borderRadius: 10,
		height: 50,
	},
	listContainerStyle: { flex: 7 },
});

export default TrackingList;
