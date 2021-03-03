import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import AppButton from '../components/AppButton';

function DateEventScreen({ navigation, route }) {
	const { events, onSelectEvent, onDeleteEvent } = route.params;

	return (
		<View style={styles.container}>
			<FlatList
				data={events}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<ListItem
						title={item.title}
						message={item.description}
						onPress={() => {
							onSelectEvent(item);
						}}
						renderRightActions={() => {
							return (
								<ListItemDeleteAction
									onPress={() => {
										onDeleteEvent(item);
										navigation.pop();
									}}
								/>
							);
						}}
					/>
				)}
				ListFooterComponent={
					<AppButton
						title='Close'
						onPress={() => {
							navigation.pop();
						}}
					/>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 5,
	},
});

export default DateEventScreen;
