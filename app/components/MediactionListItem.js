import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import colors from '../config/colors';
import AppText from './AppText';
import ListItemDeleteAction from './ListItemDeleteAction';

function MediactionListItem({
	data,
	onPress,
	onDelete,
	color,
	time,
	description,
}) {
	return (
		<Swipeable
			containerStyle={styles.container}
			childrenContainerStyle={styles.children}
			renderRightActions={() => {
				return (
					<ListItemDeleteAction
						onPress={() => {
							onDelete(data);
						}}
					/>
				);
			}}
		>
			<TouchableWithoutFeedback
				onPress={() => {
					return onPress(data);
				}}
			>
				<AppText>{data?.title}</AppText>
			</TouchableWithoutFeedback>
		</Swipeable>
	);
}

const styles = StyleSheet.create({
	children: {
		flexDirection: 'row',
		backgroundColor: colors.primary,
		borderRadius: 25,
		padding: 10,
	},
	container: { marginTop: 10 },
});

export default MediactionListItem;
