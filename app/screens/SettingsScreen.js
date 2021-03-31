import React from 'react';
import {View, StyleSheet, ImageBackground, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout} from '../store/auth';
import {AntDesign} from "@expo/vector-icons";
import {ButtonDecline, ButtonMagenta} from "../components/Buttons";
import routes from '../navigation/routes';
import colors from "../config/colors";

function SettingsScreen({navigation}) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <ImageBackground source={ require('../images/Background.png') } style={ styles.image }>
            <View style={ styles.container }>
                <Text style={ styles.text }>Logout</Text>

                <ButtonDecline
                    Content={ <AntDesign name="logout" size={ 24 } color="white"/> }
                    onPress={ handleLogout }
                    margin={ 8 }
                />
            </View>
            <View style={ styles.container }>
                <Text style={ styles.text }>Tracking</Text>
                <ButtonMagenta
                    Content={ <AntDesign name="edit" size={ 24 } color="white"/> }
                    onPress={ () => {
                        navigation.push(routes.TRACKING_CATEGORY_EDIT);
                    } }

                    margin={ 8 }
                />
            </View>
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
        maxHeight: 81,
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

    }
});


export default SettingsScreen;
