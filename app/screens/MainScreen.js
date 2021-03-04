import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import SafeAreaScreen from '../components/SafeAreaScreen';
import routes from '../navigation/routes';
import {ButtonAccept, ButtonDecline, ButtonYellow, ButtonMagenta} from "../components/Buttons";
import {AntDesign} from '@expo/vector-icons';


function MainScreen({navigation}) {

    return (
        <SafeAreaScreen>
            <ImageBackground source={require('../images/Background.png')} style={styles.image}>

                <View style={styles.container}>
                    <Text style={styles.text}>Kalender</Text>
                    <ButtonAccept style={styles.button}
                                  Content={<AntDesign name="calendar" size={24} color="white"/>}
                                  onPress={() => {
                                      navigation.navigate(routes.ORGANIZATION, {
                                          screen: routes.CALENDAR,
                                      });
                                  }}
                    ></ButtonAccept>
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Kalender</Text>
                    <ButtonYellow style={styles.button}
                                  Content={<AntDesign name="calendar" size={24} color="white"/>}
                                  onPress={() => {
                                      navigation.navigate(routes.ORGANIZATION, {
                                          screen: routes.CALENDAR,
                                      });
                                  }}
                    ></ButtonYellow>
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Kalender</Text>
                    <ButtonMagenta style={styles.button}
                                   Content={<AntDesign name="calendar" size={24} color="white"/>}
                                   onPress={() => {
                                       navigation.navigate(routes.ORGANIZATION, {
                                           screen: routes.CALENDAR,
                                       });
                                   }}
                    ></ButtonMagenta>
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>Kalender</Text>
                    <ButtonDecline style={styles.button}
                                   Content={<AntDesign name="calendar" size={24} color="white"/>}
                                   onPress={() => {
                                       navigation.navigate(routes.ORGANIZATION, {
                                           screen: routes.CALENDAR,
                                       });
                                   }}
                    ></ButtonDecline>
                </View>
            </ImageBackground>

        </SafeAreaScreen>
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
        color: '#C5C5C5',
        marginLeft: '2%',

    }


});

export default MainScreen;
