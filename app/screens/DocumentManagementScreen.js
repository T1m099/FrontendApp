import React, { useState } from 'react';
import {
	View,
	StyleSheet,
	FlatList,
	Modal,
	ImageBackground,
	Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import { AntDesign } from '@expo/vector-icons';

import * as docActions from '../store/docs';
import * as documentManagement from '../config/documentManagement';

import { ButtonAccept, ButtonDecline } from '../components/Buttons';
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import AppSubmitButton from '../components/forms/AppSubmitButton';
import routes from '../navigation/routes';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';
import Screen from '../components/Screen';

//a screen that shows a list of folders and documents
//depending on the id passed, all folders and documents with this root id are listed
function DocumentManagementScreen({ navigation, route }) {
	const allFolders = useSelector(docActions.getFolders());
	const allDocuments = useSelector(docActions.getDocuments());

	const dispatch = useDispatch();
	const [newFolderModalVisible, setNewFolderModalVisble] = useState(false);

	const { parentId } = route.params;
	//filtering the documents and folders with this parent id
	const folders = docActions.filterElementsByParentId(allFolders, parentId);
	const documents = docActions.filterElementsByParentId(
		allDocuments,
		parentId
	);

	//function to map folder objects and document objects into list items
	const mapElements = (foldersObject, documentsObject) => {
		const elementsArray = [];
		if (foldersObject) {
			//iterating over all folders and create a list item for each one, including a icon to show
			Object.keys(foldersObject).forEach(k => {
				elementsArray.push({
					...foldersObject[k],
					icon: 'folder1',
					onPress: () => {
						navigation.push(routes.FOLDER_MANAGEMENT, {
							parentId: foldersObject[k].id,
						});
					},
					onDelete: folder => {
						dispatch(docActions.deleteFolder({ id: folder.id }));
					},
				});
			});
		}
		if (documentsObject) {
			//iterating over all documents and create a list item for each one
			Object.keys(documentsObject).forEach(k => {
				elementsArray.push({
					...documentsObject[k],
					icon: 'file1',
					onPress: () => {
						Sharing.shareAsync(documentsObject[k].uri, {
							dialogTitle: 'Share Document',
						});
					},
					onDelete: doc => {
						const { icon, onPress, onDelete, ...rest } = doc;
						dispatch(docActions.deleteDocument({ ...rest }));
					},
				});
			});
		}
		return elementsArray;
	};

	//handling taps on the "add folder" button
	const handleSaveFolder = folder => {
		const { onDelete, onPress, icon, ...rest } = folder;
		const toSave = { ...rest, parentId: parentId ? parentId : 'root' };
		//creating a folder with the parent id passed to this screen
		dispatch(docActions.saveFolder(toSave));
		setNewFolderModalVisble(false);
	};

	//handling a press on the "add document" button
	const handlePressAddDocument = async () => {
		//asking for permission to access the file system
		const permission = await Permissions.askAsync('mediaLibrary');

		if (!permission.granted) return;

		//displaying a document selection dialog that allows the user to choose a document
		const doc = await DocumentPicker.getDocumentAsync({ multiple: false });
		if (doc.type === 'cancel') return;

		//creating a document object
		const d = {
			...documentManagement.baseDocument,
			name: doc.name,
			size: doc.size,
			uri: doc.uri,
			parentId,
		};
		//saving that object
		dispatch(docActions.saveDocument(d));
	};

	//rendering the actual screen, consisting of  the list, the add document button and a modal for creating new folders
	return (
		<ImageBackground
			source={require('../images/Background.png')}
			style={styles.image}
		>
			<Screen>
				<View>
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
											<AntDesign
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
							<View>
								<View style={styles.container}>
									<Text style={styles.text}>
										Add Document
									</Text>

									<ButtonAccept
										Content={
											<AntDesign
												name='addfile'
												size={24}
												color='white'
											/>
										}
										onPress={() => {
											handlePressAddDocument();
										}}
										margin={8}
									/>
								</View>
								<View style={styles.container}>
									<Text style={styles.text}>New Folder</Text>
									<ButtonAccept
										Content={
											<AntDesign
												name='addfolder'
												size={24}
												color='white'
											/>
										}
										onPress={() => {
											setNewFolderModalVisble(true);
										}}
										margin={8}
									/>
								</View>
							</View>
						}
					/>
					<Modal
						visible={newFolderModalVisible}
						transparent={true}
						animationType='slide'
					>
						<View
							style={[
								styles.container,
								{
									maxHeight: 150,
									flexDirection: 'column',
									width: '100%',
									marginTop: '100%',
									justifyContent: 'space-evenly',
								},
							]}
						>
							<AppForm
								initialValues={documentManagement.baseFolder}
								onSubmit={handleSaveFolder}
							>
								<AppFormField
									name='name'
									width='100%'
									placeholder='please enter the desired name'
								/>
								<View
									style={[
										{
											flexDirection: 'row',
											width: '90%',
											justifyContent: 'space-between',
										},
									]}
								>
									<AppSubmitButton
										title='Create Folder'
										size={300}
									>
										{' '}
										style={[{ paddingRight: 8 }]}
									</AppSubmitButton>

									<ButtonDecline
										Content={
											<AntDesign
												name='close'
												size={24}
												color='white'
											/>
										}
										onPress={() => {
											setNewFolderModalVisble(false);
										}}
									></ButtonDecline>
								</View>
							</AppForm>
						</View>
					</Modal>
				</View>
			</Screen>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		width: '92%',
		height: 81,
		borderRadius: 10,
		marginTop: '.75%',
		marginBottom: '.75%',
		backgroundColor: 'rgba(0,0,0,.5)',
		textAlign: 'center',
		justifyContent: 'space-between',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	text: {
		alignItems: 'flex-start',
		flex: 1,
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.text,
		marginLeft: '2%',
	},
	folderList: {
		flexGrow: 1,
		width: '100%',
	},
	listItem: {
		marginVertical: 1,
		borderRadius: 14,
		width: '92%',
		flexDirection: 'row',
		alignSelf: 'center',
	},
	newCollectionButton: {
		width: '100%',
	},
	icon: {
		marginLeft: 10,
	},
});

export default DocumentManagementScreen;
