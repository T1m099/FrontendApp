import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from '../components/AppButton';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import * as categoriesActions from '../store/docs/categories';
import * as documentManagement from '../config/documentManagement';

import colors from '../config/colors';
import AppSubmitButton from '../components/forms/AppSubmitButton';

function CategoryManagementScreen({ navigation }) {
	const categories = useSelector(categoriesActions.getCategories());
	const dispatch = useDispatch();

	const [newCategoryModalVisible, setNewCategoryModalVisble] = useState(
		false
	);

	const mapCategories = catsObject => {
		const catsArray = [];
		Object.keys(catsObject).forEach(k => {
			catsArray.push(catsObject[k]);
		});
		return catsArray;
	};

	const handleSaveCategory = category => {
		dispatch(categoriesActions.saveCategory(category));
		setNewCategoryModalVisble(false);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={mapCategories(categories)}
				keyExtractor={item => item.id}
				renderItem={({ item }) => {
					return (
						<View style={styles.categoriesListItem}>
							<Text>{item.title}</Text>
						</View>
					);
				}}
				ListFooterComponent={
					<AppButton
						style={styles.newCategoryButton}
						title='New'
						onPress={() => {
							setNewCategoryModalVisble(true);
						}}
					/>
				}
			/>
			<Modal visible={newCategoryModalVisible} animationType='slide'>
				<AppForm
					initialValues={documentManagement.baseCategory}
					onSubmit={handleSaveCategory}
				>
					<AppFormField
						name='title'
						width='100%'
						placeholder='Title'
					/>
					<AppSubmitButton title='Create Category'></AppSubmitButton>
				</AppForm>
				<AppButton
					title='Close'
					onPress={() => {
						setNewCategoryModalVisble(false);
					}}
				></AppButton>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { justifyContent: 'center', alignItems: 'center', flex: 1 },
	categoriesListItem: {
		margin: 1,
		padding: 5,
		borderRadius: 10,
		width: '100%',
		flexDirection: 'row',
		backgroundColor: colors.primary,
	},
	newCategoryButton: {
		width: '100%',
	},
});

export default CategoryManagementScreen;
