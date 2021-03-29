import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

import defaultStyles from '../config/styles';
import colors from '../config/colors';

function AppTextInput({icon, style, ...otherProps}) {
    return (
        <View style={ [styles.container, style] }>
            { icon && (
                <AntDesign
                    name={ icon }
                    size={ 20 }
                    color={ colors.text }
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
        backgroundColor: colors.navigation,
        borderRadius: 17,
        flexDirection: 'row',
        padding: 15,
        marginTop: 5,
        width: 340,
        alignItems: 'center'
    },
    icon: {
        marginRight: 10,
    },
});

export default AppTextInput;
