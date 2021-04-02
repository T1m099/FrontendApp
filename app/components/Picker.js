
import {View,StyleSheet,TouchableWithoutFeedback,Modal,	Button,	FlatList,TouchableOpacity,} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SafeAreaScreen from './SafeAreaScreen';
import colors from '../config/colors';
import React from "react";

function AppPicker({
	items,
	extractKey,
	renderIcon,
	renderSelectedItem,
	renderPickerItem,
	renderPlaceholder,
	onSelectItem,
	numberOfColumns = 1,
	selectedItem,
	style,
}) {
	const [modalVisible, setModalVisible] = React.useState(false)

	return (
		<View>
			<TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
				<View style={[styles.container, style]}>
					{renderIcon && renderIcon()}
					{selectedItem
						? renderSelectedItem(selectedItem)
						: renderPlaceholder()}

					<View style={{ alignSelf: 'center' }}>
						<MaterialCommunityIcons
							name='chevron-down'
							size={20}
							color={colors.text}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
			<Modal visible={modalVisible} animationType='slide'>
				<SafeAreaScreen>
					<Button
						title='Close'
						onPress={() => setModalVisible(false)}
					/>
					<FlatList
						data={items}
						keyExtractor={item => extractKey(item)}
						numColumns={numberOfColumns}
						renderItem={item => {
							return (
								<TouchableOpacity
									onPress={() => {
										onSelectItem(item);
										setModalVisible(false);
									}}
								>
									{renderPickerItem(item)}
								</TouchableOpacity>
							);
						}}
					/>
				</SafeAreaScreen>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.navigation,
		borderRadius: 17,
		flexDirection: 'row',
		padding: 15,
		height:65,
		width: 300,
		alignItems: 'center'
	},
	icon: {
		marginRight: 10,
	},
	placeholder: {
		color: colors.text,
		flex: 1,
	},
	text: {
		flex: 1,
		color: colors.text,
	},
});

export default AppPicker;
