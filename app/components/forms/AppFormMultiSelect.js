import React from 'react';
import {useFormikContext} from 'formik';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {MaterialIcons} from '@expo/vector-icons';

import AppErrorMessage from './AppErrorMessage';
import colors from '../../config/colors';

function AppFormMultiSelect({
                                name,
                                items,
                                checkVisible = (vals, name) => true,
                            }) {
    const {setFieldValue, errors, touched, values} = useFormikContext();

    if (!checkVisible(values, name)) return null;

    const onSelectedItemsChange = selectedItems => {
        setFieldValue(name, selectedItems);
    };
    return (
        <>
            <SectionedMultiSelect
                items={ items }
                IconRenderer={ MaterialIcons }
                uniqueKey='name'
                subKey='children'
                selectToggleIconComponent={ <MaterialIcons name="calendar" size={ 0 } color={ colors.background }/> }
                selectText='Symptoms'
                showChips={ false }
                showDropDowns={ false }
                readOnlyHeadings={ true }
                hideSearch={true}
                onSelectedItemsChange={ onSelectedItemsChange }
                selectedItems={ values[name] }
                colors={ {
                    primary: colors.accept,
                    text: colors.text,
                    itemBackground: colors.background,
                    subItemBackground: colors.background,
                    subText: colors.text,
                    searchSelectionColor: colors.background,
                    disabled: colors.text
                } }
                styles={ {
                    container: {
                        backgroundColor: colors.background,
                        maxHeight: 450,
                    },

                    selectToggle: {
                        backgroundColor: colors.navigation,
                        borderRadius: 10,
                        marginTop: 10,
                        height: 30,
                        width: 200,


                    },
                    selectToggleText: {
                        marginTop: 10,
                        flex: 1,
                        fontSize: 21,
                        fontWeight: 'bold',
                        color: colors.text,
                        marginLeft: 10
                    }
                } }
            />
            <AppErrorMessage error={ errors[name] } visible={ touched[name] }/>
        </>
    );
}

export default AppFormMultiSelect;
