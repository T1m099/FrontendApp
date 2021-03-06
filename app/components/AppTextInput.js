import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

import defaultStyles from '../config/styles';
import colors from '../config/colors';

function AppTextInput({icon, style, ...otherProps}) {
    return (
        <View style={ [styles.container, style] }>
            { icon && (
                <MaterialCommunityIcons
                    name={ icon }
                    size={ 20 }
                    color={ defaultStyles.colors.medium }
                    style={ styles.icon }
                />
            ) }
            <TextInput
                placeholderTextColor={ colors.text }
                style={ defaultStyles.text }
                { ...otherProps }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        borderRadius: 20,
        flexDirection: 'row',
        padding: 15,
        marginTop: 5,
        width: 390,
    },
    icon: {
        marginRight: 10,
    },
});

export default AppTextInput;
