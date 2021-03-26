import { useFormikContext } from 'formik';
import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import AppTextInput from './AppTextInput';
import AppButton from './AppButton';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ListItemDeleteAction from './ListItemDeleteAction';

function TrackingList({ name }) {
	const { setFieldValue, values } = useFormikContext();

	const handleDeleteTrackinItem = trackingItem => {
		const currentTrackingItems = { ...values[name] };
		delete currentTrackingItems[trackingItem.key];

		setFieldValue(name, currentTrackingItems);
	};

	const handleNewTrackingItem = () => {
		const trackingItems = { ...values[name] };
		trackingItems.new = 0;

		setFieldValue(name, trackingItems);
	};
	const handleChangedKey = (oldKey, newKey) => {
		const currentTrackingItems = { ...values[name] };
		currentTrackingItems[newKey] = currentTrackingItems[oldKey];
		delete currentTrackingItems[oldKey];

		setFieldValue(name, currentTrackingItems);
	};
	const handleChangedValue = (key, value) => {
		const currentTrackingItems = { ...values[name] };
		currentTrackingItems[key] = value;

		setFieldValue(name, currentTrackingItems);
	};

	const mapTrackingItemsToArray = trackingItems => {
		const itemArray = [];
		Object.keys(trackingItems).forEach(key =>
			itemArray.push({ key, value: trackingItems[key] })
		);
		return itemArray;
	};

	return (
		<View style={styles.container}>
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
									style={styles.input}
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
									style={styles.input}
									onChangeText={text => {
										handleChangedValue(item.key, text);
									}}
									keyboardType='numeric'
								/>
							</View>
						</Swipeable>
					);
				}}
				ListFooterComponent={
					<AppButton
						title='Add'
						onPress={handleNewTrackingItem}
					></AppButton>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
	inputRow: { flexDirection: 'row' },
	input: {
		flex: 1,
		marginVertical: 0,
	},
});

export default TrackingList;
