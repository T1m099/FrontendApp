import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Modal,
	FlatList,
} from 'react-native';
import { useFormikContext } from 'formik';

import AppText from '../AppText';
import AppButton from '../AppButton';

function AppFormColorPicker({ name, colors }) {
	const { setFieldValue, values } = useFormikContext();
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<>
			<TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
				<View
					style={[
						styles.container,
						{ backgroundColor: values[name] },
					]}
				>
					<TouchableOpacity
						onPress={() => {
							setModalVisible(true);
						}}
					>
						<AppText>Marking Color</AppText>
					</TouchableOpacity>
				</View>
			</TouchableWithoutFeedback>
			<Modal visible={modalVisible} animationType='slide'>
				<View style={styles.colorContainer}>
					<FlatList
						contentContainerStyle={styles.colorContainer}
						data={colors}
						keyExtractor={item => item}
						numColumns={3}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => {
									setFieldValue(name, item);
									setModalVisible(false);
								}}
							>
								<View
									style={[
										styles.colorCircle,
										{ backgroundColor: item },
									]}
								/>
							</TouchableOpacity>
						)}
						ListFooterComponent={
							<AppButton
								title='Close'
								onPress={() => setModalVisible(false)}
							/>
						}
					/>
				</View>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flexGrow: 1,
		borderRadius: 25,
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	colorCircle: {
		width: 100,
		height: 100,
		borderRadius: 50,
		flexDirection: 'column',
		margin: 10,
	},
	colorContainer: {
		flexGrow: 1,
		justifyContent: 'space-evenly',
		alignItems: 'center',
		backgroundColor: 'grey',
	},
});

export default AppFormColorPicker;
