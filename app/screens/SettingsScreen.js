import React, {useState} from 'react';
import {ImageBackground, Modal, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout} from '../store/auth';
import {AntDesign} from '@expo/vector-icons';
import {ButtonDecline, ButtonYellow} from '../components/Buttons';
import colors from '../config/colors';

//screen with configuration options
//Currently there is only a logout button on this screen
function SettingsScreen({navigation}) {
    const dispatch = useDispatch();
    const [securityDisclaimerVisible, setSecurityDisclaimerVisible] = useState(
        false
    );

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <ImageBackground
            source={require('../images/Background.png')}
            style={styles.image}
        >
            <View style={styles.container}>
                <Text style={styles.text}>Logout</Text>

                <ButtonDecline
                    Content={
                        <AntDesign name='logout' size={24} color='white'/>
                    }
                    onPress={handleLogout}
                    margin={8}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.text}>Security Disclaimer</Text>

                <ButtonYellow
                    Content={<AntDesign name='lock' size={24} color='white'/>}
                    onPress={() => {
                        setSecurityDisclaimerVisible(true);
                    }}
                    margin={8}
                />
            </View>
            <Modal visible={securityDisclaimerVisible} animationType='slide'>
                <ImageBackground
                    source={require('../images/Background.png')}
                    style={styles.image}
                >
                    <View
                        style={[
                            styles.container,
                            {
                                maxHeight: 281,
                                paddingTop: 10,
                                flexDirection: 'column',
                                justifyContent: 'space-evenly',
                            },
                        ]}
                    >
                        <Text style={styles.text}>
                            Your local data is fully encrypted, with the exception
                            being files, which are stored in your devices file
                            system. The files are hidden, so only this app can
                            access them.
                        </Text>
                        <Text style={styles.text}>
                            Everything you enter in this app is sent to our servers,
                            where the data is securely stored. This is neccessary
                            for synchronization accross multiple devices.
                        </Text>
                        <ButtonDecline
                            Content={'close'}
                            onPress={() => {
                                setSecurityDisclaimerVisible(false);
                            }}
                            margin={8}
                            size={'96%'}
                        />
                    </View>

                </ImageBackground>
            </Modal>
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
});

export default SettingsScreen;
