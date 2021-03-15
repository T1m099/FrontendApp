import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from '../components/AppButton';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import * as collectionActions from '../store/docs/collections';
import * as documentManagement from '../config/documentManagement';

import colors from '../config/colors';
import AppSubmitButton from '../components/forms/AppSubmitButton';

function CollectionManagementScreen({ navigation, route }) {
	const allCollections = useSelector(collectionActions.getCollections());
	const dispatch = useDispatch();
	const [newCollectionModalVisible, setNewCollectionModalVisble] = useState(
		false
	);

	const { categoryId } = route.params;
	const collections = collectionActions.filterCollectionsByCategoryId(
		allCollections,
		categoryId
	);

	const mapCollections = collsObject => {
		const collsArray = [];
		Object.keys(collsObject).forEach(k => {
			collsArray.push(collsObject[k]);
		});
		return collsArray;
	};

	const handleSaveCollection = collection => {
		const c = { ...collection, categoryId };

		dispatch(collectionActions.saveCollection(c));
		setNewCollectionModalVisble(false);
	};

	return (
		<View style={styles.container}>
			<FlatList
				style={styles.collectionList}
				data={mapCollections(collections)}
				keyExtractor={item => item.id}
				renderItem={({ item }) => {
					return (
						<View style={styles.collectionListItem}>
							<Text>{item.title}</Text>
						</View>
					);
				}}
				ListFooterComponent={
					<AppButton
						style={styles.newCollectionButton}
						title='New'
						onPress={() => {
							setNewCollectionModalVisble(true);
						}}
					/>
				}
			/>
			<Modal visible={newCollectionModalVisible} animationType='slide'>
				<AppForm
					initialValues={documentManagement.baseCollection}
					onSubmit={handleSaveCollection}
				>
					<AppFormField
						name='title'
						width='100%'
						placeholder='Title'
					/>
					<AppSubmitButton title='Create Collection'></AppSubmitButton>
				</AppForm>
				<AppButton
					title='Close'
					onPress={() => {
						setNewCollectionModalVisble(false);
					}}
				></AppButton>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flexGrow: 1,
		padding: 5,
	},
	collectionList: { flexGrow: 1, width: '100%' },
	collectionListItem: {
		margin: 1,
		padding: 5,
		borderRadius: 10,
		width: '100%',
		flexDirection: 'row',
		backgroundColor: colors.primary,
	},
	newCollectionButton: {
		width: '100%',
	},
});

export default CollectionManagementScreen;
