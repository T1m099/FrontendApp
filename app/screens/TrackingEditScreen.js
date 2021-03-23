import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useState } from 'react/cjs/react.development';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import AppSubmitButton from '../components/forms/AppSubmitButton';
import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';

function TrackingEditScreen(props) {
	const [cats, setCats] = useState([]);

	const handleNewCategory = cat => {
		const newCats = [...cats];
		newCats.push(cat);

		setCats(newCats);
	};
	const handleDeleteCategory = cat => {
		let newCats = [...cats];
		newCats = newCats.filter(c => c.category !== cat.category);

		setCats(newCats);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={cats}
				renderItem={({ item }) => {
					return (
						<ListItem
							title={item.category}
							message={'Unit: ' + item.unit}
							renderRightActions={() => {
								return (
									<ListItemDeleteAction
										onPress={() => {
											handleDeleteCategory(item);
										}}
									/>
								);
							}}
						/>
					);
				}}
				keyExtractor={item => item.category}
				ListFooterComponent={
					<>
						<AppForm
							initialValues={{ category: '', unit: '' }}
							onSubmit={(values, actions) => {
								handleNewCategory(values);
								actions.resetForm();
							}}
						>
							<View style={styles.inputGroup}>
								<AppFormField
									name='category'
									width='100%'
									placeholder='What to track?'
									style={styles.inputFields}
								/>
								<AppFormField
									name='unit'
									width='100%'
									placeholder='Unit'
									style={styles.inputFields}
								/>
							</View>

							<AppSubmitButton
								title='New Tracking Category'
								style={{ marginVertical: 0 }}
							/>
						</AppForm>
					</>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {},
	inputFields: { flex: 1 },
	inputGroup: { flexDirection: 'row' },
});

export default TrackingEditScreen;
