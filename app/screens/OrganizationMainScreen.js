import React from 'react';
import {View, StyleSheet, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {ButtonMagenta, ButtonYellow} from "../components/Buttons";
import routes from '../navigation/routes';
import colors from "../config/colors";
import {AntDesign} from "@expo/vector-icons";

function OrganisationMainScreen({navigation}) {
    return (
        <ImageBackground source={ require('../images/Background.png') } style={ styles.image }>
            <View style={ styles.container }>
                <Text style={ styles.text }>Calendar</Text>

                <ButtonMagenta
                    style={ [{marginBottom: 10,}] }
                    Content={ <AntDesign name="calendar" size={ 24 } color="white"/> }
                    onPress={ () => {
                        navigation.navigate(routes.CALENDAR);
                    } }

                    margin={ 8 }
                />
            </View>
            <View style={ styles.container }>
                <Text style={ styles.text }>Timeline</Text>

                <ButtonYellow
                    Content={ <AntDesign name="barschart" size={ 24 } color="white"/> }
                    onPress={ () => {
                        navigation.navigate(routes.TIMELINE);
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

export default OrganisationMainScreen;
