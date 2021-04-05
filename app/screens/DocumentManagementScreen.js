import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as DocumentPicker from 'expo-document-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';

import * as folderActions from '../store/docs/folders';
import * as documentActions from '../store/docs/documents';
import * as documentManagement from '../config/documentManagement';

import AppButton from '../components/AppButton';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import AppSubmitButton from '../components/forms/AppSubmitButton';
import routes from '../navigation/routes';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';

function FolderManagementScreen({ navigation, route }) {
	const allFolders = useSelector(folderActions.getFolders());
	const allDocuments = useSelector(documentActions.getDocuments());

	const dispatch = useDispatch();
	const [newFolderModalVisible, setNewFolderModalVisble] = useState(false);

	const { parentId } = route.params;
	const folders = folderActions.filterFoldersByParentId(allFolders, parentId);
	const documents = documentActions.filterDocumentsByParentId(
		allDocuments,
		parentId
	);

	const mapElements = (foldersObject, documentsObject) => {
		const elementsArray = [];
		Object.keys(foldersObject).forEach(k => {
			elementsArray.push({
				...foldersObject[k],
				icon: 'folder',
				onPress: () => {
					navigation.push(routes.FOLDER_MANAGEMENT, {
						parentId: foldersObject[k].id,
					});
				},
				onDelete: folder => {
					dispatch(folderActions.deleteFolder(folder.id));
				},
			});
		});
		Object.keys(documentsObject).forEach(k => {
			elementsArray.push({
				...documentsObject[k],
				icon: 'file-document',
				onPress: () => {
					Sharing.shareAsync(documentsObject[k].uri, {
						dialogTitle: 'Share Document',
					});
				},
				onDelete: doc => {
					dispatch(documentActions.deleteDocument(doc));
				},
			});
		});
		return elementsArray;
	};

	const handleSaveFolder = folder => {
		const c = { ...folder, parentId: parentId ? parentId : 'root' };

		dispatch(folderActions.saveFolder(c));
		setNewFolderModalVisble(false);
	};

	const handlePressAddDocument = async () => {
		const permission = await Permissions.askAsync('mediaLibrary');

		if (!permission.granted) return;

		const doc = await DocumentPicker.getDocumentAsync({ multiple: false });
		if (doc.type === 'cancel') return;

		//Seems to be bugged - opened an issue at expo
		//Linking.openURL(fileName);

		const d = {
			...documentManagement.baseDocument,
			name: doc.name,
			size: doc.size,
			uri: doc.uri,
			parentId,
		};
		dispatch(documentActions.saveDocument(d));
	};

	return (
		<View style={styles.container}>
			<FlatList
				style={styles.folderList}
				data={mapElements(folders, documents)}
				keyExtractor={item => item.id}
				renderItem={({ item }) => {
					return (
						<ListItem
							title={item.name}
							IconComponent={
								<View style={styles.icon}>
									<MaterialCommunityIcons
										color={colors.accent}
										name={item.icon}
										size={25}
									/>
								</View>
							}
							onPress={item.onPress}
							renderRightActions={() => (
								<ListItemDeleteAction
									onPress={() => {
										item.onDelete(item);
									}}
								/>
							)}
							containerStyle={styles.listItem}
						/>
					);
				}}
				ListFooterComponent={
					<>
						<AppButton
							style={styles.newCollectionButton}
							title='Add Document'
							onPress={() => {
								handlePressAddDocument();
							}}
						/>
						<AppButton
							style={styles.newCollectionButton}
							title='New Folder'
							onPress={() => {
								setNewFolderModalVisble(true);
							}}
						/>
					</>
				}
			/>
			<Modal visible={newFolderModalVisible} animationType='slide'>
				<AppForm
					initialValues={documentManagement.baseFolder}
					onSubmit={handleSaveFolder}
				>
					<AppFormField name='name' width='100%' placeholder='Name' />
					<AppSubmitButton title='Create Folder'></AppSubmitButton>
				</AppForm>
				<AppButton
					title='Close'
					onPress={() => {
						setNewFolderModalVisble(false);
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
	folderList: { flexGrow: 1, width: '100%' },
	listItem: {
		marginVertical: 1,
		borderRadius: 20,
		width: '100%',
		flexDirection: 'row',
	},
	newCollectionButton: {
		width: '100%',
	},
	icon: {
		backgroundColor: colors.secondary,
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default FolderManagementScreen;
