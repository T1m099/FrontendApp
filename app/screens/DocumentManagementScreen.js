import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Permissions from 'expo-permissions';

import AppButton from '../components/AppButton';

import * as documentActions from '../store/docs/documents';
import * as documentManagement from '../config/documentManagement';

import colors from '../config/colors';

function CollectionManagementScreen({ navigation, route }) {
	const allDocuments = useSelector(documentActions.getDocuments());
	const dispatch = useDispatch();

	const { collectionId } = route.params;
	const documents = documentActions.filterDocumentsByCollectionId(
		allDocuments,
		collectionId
	);

	const mapDocuments = docsObject => {
		const docsArray = [];
		Object.keys(docsObject).forEach(k => {
			docsArray.push(docsObject[k]);
		});
		return docsArray;
	};

	const handlePressAddDocument = async () => {
		const permission = await Permissions.askAsync('mediaLibrary');

		if (!permission.granted) return;

		const doc = await DocumentPicker.getDocumentAsync({ multiple: false });
		if (doc.type === 'cancel') return;

		IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
			data: doc.uri,
			flags: 1,
		});
		console.log(doc);
		//dispatch(documentActions.saveDocument(d));
	};

	return (
		<View style={styles.container}>
			<FlatList
				style={styles.documentList}
				data={mapDocuments(documents)}
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
						style={styles.newDocumentButton}
						title='Add Document'
						onPress={handlePressAddDocument}
					/>
				}
			/>
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
	documentList: { flexGrow: 1, width: '100%' },
	documentListItem: {
		margin: 1,
		padding: 5,
		borderRadius: 10,
		width: '100%',
		flexDirection: 'row',
		backgroundColor: colors.primary,
	},
	newDocumentButton: {
		width: '100%',
	},
});

export default CollectionManagementScreen;
