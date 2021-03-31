import React from 'react';
import {StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
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
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		width: '92%',
		height: 40,
		borderRadius: 10,
		marginTop: '.75%',
		marginBottom: '.75%',
		backgroundColor: 'rgba(0,0,0,.5)',
		textAlign: 'center',
		justifyContent: 'space-between'
	},
	container: { marginTop: 10 },
});

export default MediactionListItem;
