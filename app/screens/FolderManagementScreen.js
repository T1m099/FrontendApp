import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	Text,
	FlatList,
	Modal,
	TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as DocumentPicker from 'expo-document-picker';

import * as folderActions from '../store/docs/folders';
import * as documentActions from '../store/docs/documents';
import * as documentManagement from '../config/documentManagement';

import AppButton from '../components/AppButton';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import colors from '../config/colors';
import routes from '../navigation/routes';
import AppSubmitButton from '../components/forms/AppSubmitButton';

function FolderManagementScreen({ navigation, route }) {
	const allFolders = useSelector(folderActions.getFolders());
	const allDocuments = useSelector(documentActions.getDocuments());

	const dispatch = useDispatch();
	const [newFolderModalVisible, setNewFolderModalVisble] = useState(false);

	const { parentId } = route.params;
	const folders = folderActions.filterFoldersByParentId(allFolders, parentId);
	const documents = documentActions.filterDocumentsByCollectionId(
		allDocuments,
		parentId
	);

	const mapElements = (foldersObject, documentsObject) => {
		const elementsArray = [];
		Object.keys(foldersObject).forEach(k => {
			elementsArray.push(foldersObject[k]);
		});
		Object.keys(documentsObject).forEach(k => {
			elementsArray.push(documentsObject[k]);
		});
		return elementsArray;
	};

	const handleSaveFolder = folder => {
		const c = { ...folder, parentId };

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
						<TouchableOpacity
							onPress={() => {
								navigation.push(routes.FOLDER_MANAGEMENT, {
									parentId: item.id,
								});
							}}
						>
							<View style={styles.collectionListItem}>
								<Text>{item.name}</Text>
							</View>
						</TouchableOpacity>
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

export default FolderManagementScreen;
