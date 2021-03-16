import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import AppText from './AppText';
import colors from '../config/colors';

function ListItem({
	title,
	message,
	image,
	IconComponent,
	onPress,
	renderRightActions,
	containerStyle,
}) {
	return (
		<Swipeable
			renderRightActions={renderRightActions}
			containerStyle={containerStyle}
			childrenContainerStyle={styles.swipableChildren}
		>
			<TouchableOpacity onPress={onPress} style={styles.container}>
				<View style={styles.icon}>{IconComponent}</View>

				{image && <Image style={styles.image} source={image} />}

				<View style={styles.detailsContainer}>
					<AppText style={styles.title} numberOfLines={1}>
						{title}
					</AppText>

					{message && message !== '' && (
						<AppText style={styles.message} numberOfLines={2}>
							{' '}
							{message}
						</AppText>
					)}
				</View>

				{/* <MaterialCommunityIcons
					color={colors.secondary}
					name='chevron-right'
					size={25}
				/> */}
			</TouchableOpacity>
		</Swipeable>
	);
}

const styles = StyleSheet.create({
	container: { flexDirection: 'row' },
	detailsContainer: {
		flexGrow: 7,
		marginLeft: 10,
		justifyContent: 'center',
	},
	image: {
		width: 70,
		height: 70,
		borderRadius: 35,
	},
	icon: { flexGrow: 1 },
	message: {
		color: colors.text,
	},
	title: {
		fontWeight: '500',
		color: colors.text,
		width: '80%',
	},
	swipableChildren: {
		flexDirection: 'row',
		padding: 10,
		backgroundColor: colors.primary,
		borderRadius: 25,
		width: '100%',
	},
});

export default ListItem;
