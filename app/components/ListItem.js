import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import AppText from './AppText';
import colors from '../config/colors';

//function component  to render an item in a list
//the item could be an image or text with an optional icon
function ListItem({
	title,
	message,
	image,
	IconComponent,
	onPress,
	renderRightActions,
	containerStyle,
}) {
	//conditial rendering of the image, icon etc.
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
	},
	icon: { flexGrow: 1 },
	message: {
		color: colors.text,
	},
	title: {
		fontWeight: '500',
		color: colors.text,
		width: '100%',
	},
	swipableChildren: {
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
		justifyContent: 'space-between',
	},
});

export default ListItem;
