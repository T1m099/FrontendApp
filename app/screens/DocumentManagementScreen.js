import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Modal, ImageBackground,Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as DocumentPicker from 'expo-document-picker';
import {AntDesign} from '@expo/vector-icons';

import * as folderActions from '../store/docs/folders';
import * as documentActions from '../store/docs/documents';
import * as documentManagement from '../config/documentManagement';

import {ButtonAccept, ButtonStandard} from "../components/Buttons";
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import AppSubmitButton from '../components/forms/AppSubmitButton';
import routes from '../navigation/routes';
import colors from '../config/colors';
import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';

function FolderManagementScreen({navigation, route}) {
    const allFolders = useSelector(folderActions.getFolders());
    const allDocuments = useSelector(documentActions.getDocuments());

    const dispatch = useDispatch();
    const [newFolderModalVisible, setNewFolderModalVisble] = useState(false);

    const {parentId} = route.params;
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
                icon: 'folder1',
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
                icon: 'file1',
                onPress: doc => {
                    console.log(doc);
                },
                onDelete: doc => {
                    dispatch(documentActions.deleteDocument(doc.id));
                },
            });
        });
        return elementsArray;
    };

    const handleSaveFolder = folder => {
        const c = {...folder, parentId: parentId ? parentId : 'root'};

        dispatch(folderActions.saveFolder(c));
        setNewFolderModalVisble(false);
    };

    const handlePressAddDocument = async () => {
        const permission = await Permissions.askAsync('mediaLibrary');

        if (!permission.granted) return;

        const doc = await DocumentPicker.getDocumentAsync({multiple: false});
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
        <ImageBackground source={ require('../images/Background.png') } style={ styles.image }>
            <View>
                <FlatList
                    style={ styles.folderList }
                    data={ mapElements(folders, documents) }
                    keyExtractor={ item => item.id }
                    renderItem={ ({item}) => {
                        return (
                            <ListItem
                                title={ item.name }
                                IconComponent={
                                    <View style={ styles.icon }>
                                        <AntDesign
                                            color={ colors.accent }
                                            name={ item.icon }
                                            size={ 25 }
                                        />
                                    </View>
                                }
                                onPress={ item.onPress }
                                renderRightActions={ () => (
                                    <ListItemDeleteAction
                                        onPress={ () => {
                                            item.onDelete(item);
                                        } }
                                    />
                                ) }
                                containerStyle={ styles.listItem }
                            />
                        );
                    } }
                    ListFooterComponent={
                        <View>
                            <View style={ styles.container }>
                                <Text style={ styles.text }>Add Document</Text>

                                <ButtonAccept
                                    Content={ <AntDesign name="addfile" size={ 24 } color="white"/> }
                                    onPress={ () => {
                                        handlePressAddDocument();
                                    } }
                                    margin={8}
                                />
                            </View>
                            <View style={ styles.container }>
                                <Text style={ styles.text }>New Folder</Text>
                                <ButtonAccept
                                    Content={ <AntDesign name="addfolder" size={ 24 } color="white"/> }
                                    onPress={ () => {
                                        setNewFolderModalVisble(true);
                                    } }
                                    margin={8}

                                />
                            </View>

                        </View>
                    }
                />
                <Modal visible={ newFolderModalVisible } animationType='slide'>
                    <AppForm
                        initialValues={ documentManagement.baseFolder }
                        onSubmit={ handleSaveFolder }
                    >
                        <AppFormField name='name' width='100%' placeholder='Name'/>
                        <AppSubmitButton title='Create Folder'></AppSubmitButton>
                    </AppForm>
                    <ButtonStandard
                        title='Close'
                        onPress={ () => {
                            setNewFolderModalVisble(false);
                        } }
                    ></ButtonStandard>
                </Modal>

            </View>
        </ImageBackground>

    );
}

const styles = StyleSheet.create(
    {
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
            justifyContent: 'space-between'
        },
        image: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center"
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
            width: '100%'
        },
        listItem: {
            marginVertical: 1,
            borderRadius: 14,
            width: '92%',
            flexDirection: 'row',
            alignSelf: 'center'

        },
        newCollectionButton: {
            width: '100%',
        },
        icon:{
            marginLeft: 10,
        }
    }
);

export default FolderManagementScreen;
