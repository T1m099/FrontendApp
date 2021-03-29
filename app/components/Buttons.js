import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import colors from '../config/colors';

export function ButtonStandard({Content, onPress, size = 65, position = 'flex-end'}) {
    let Button;
    if (typeof (Content) === typeof ("dummy")) {
        Button = <Text style={ styles.text }>{ Content }</Text>
    } else {
        Button = Content
    }

    return (
        <TouchableOpacity
            style={ [styles.appbutton, {width: size, alignSelf: position}] }
            onPress={ onPress }
        >
            { Button }
        </TouchableOpacity>
    );
}

export function ButtonAccept({Content, onPress, size = 65, position = 'flex-end'}) {
    let Button;
    if (typeof (Content) === typeof ("dummy")) {
        Button = <Text style={ styles.text }>{ Content }</Text>
    } else {
        Button = Content
    }

    return (
        <TouchableOpacity
            style={ [styles.buttonAccept, {width: size, alignSelf: position}] }
            onPress={ onPress }
        >
            { Button }
        </TouchableOpacity>
    );
}

export function ButtonDecline({Content, onPress, size = 65, position = 'flex-end'}) {
    let Button;
    if (typeof (Content) === typeof ("dummy")) {
        Button = <Text style={ styles.text }>{ Content }</Text>
    } else {
        Button = Content
    }
    return (
        <TouchableOpacity
            style={ [styles.buttonDecline, {width: size, alignSelf: position}] }
            onPress={ onPress }
        >
            { Button }
        </TouchableOpacity>
    );
}

export function ButtonYellow({Content, onPress, size = 65, position = 'flex-end'}) {
    let Button;
    if (typeof (Content) === typeof ("dummy")) {
        Button = <Text style={ styles.text }>{ Content }</Text>
    } else {
        Button = Content
    }
    return (
        <TouchableOpacity
            style={ [styles.buttonYellow, {width: size, alignSelf: position}] }
            onPress={ onPress }
        >
            { Button }
        </TouchableOpacity>
    );
}

export function ButtonMagenta({Content, onPress, size = 65, position = 'flex-end'}) {
    let Button;
    if (typeof (Content) === typeof ("dummy")) {
        Button = <Text style={ styles.text }>{ Content }</Text>
    } else {
        Button = Content
    }
    return (
        <TouchableOpacity
            style={ [styles.buttonMagenta, {width: size, alignSelf: position}] }
            onPress={ onPress }
        >
            { Button }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    appbutton: {
        backgroundColor: colors.navigation,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
        alignContent: 'center',
        marginBottom: 8,
        marginRight: 8
    },
    buttonAccept: {
        backgroundColor: colors.accept,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
        alignContent: 'center',
        marginBottom: 8,
        marginRight: 8
    },
    buttonDecline: {
        backgroundColor: colors.decline,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
        alignContent: 'center',
        marginBottom: 8,
        marginRight: 8

    },
    buttonYellow: {
        backgroundColor: colors.yellow,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
        alignContent: 'center',
        marginBottom: 8,
        marginRight: 8

    },
    buttonMagenta: {
        backgroundColor: colors.magenta,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 65,
        alignContent: 'center',
        marginBottom: 8,
        marginRight: 8
    },

    text: {
        color: 'white',
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: 'bold',
    },
});

