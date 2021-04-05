import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	Modal,
	Button,
	FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppText from './AppText';
import defaultStyles from '../config/styles';
import PickerItem from './PickerItem';
import SafeAreaScreen from './SafeAreaScreen';
import colors from '../config/colors';

function PickerModal({
	items,
	modalVisible,
	numberOfColumns = 1,
	labelProp,
	idProp,
	onSelectItem,
	onPressClose,
}) {
	return (
		<SafeAreaScreen>
			<View style={styles.container}>
				<Modal visible={modalVisible} animationType='slide'>
					<Button title='Close' onPress={onPressClose} />
					<FlatList
						data={items}
						keyExtractor={(item) => item[idProp]}
						numColumns={numberOfColumns}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => {
									onSelectItem(item);
									onPressClose();
								}}
							>
								<AppText>{item[labelProp]}</AppText>
							</TouchableOpacity>
						)}
					/>
				</Modal>
			</View>
		</SafeAreaScreen>
	);
}

const styles = StyleSheet.create({
});

export default PickerModal;
