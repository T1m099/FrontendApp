import React from 'react';
import {View, StyleSheet,ImageBackground, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import SafeAreaScreen from '../components/SafeAreaScreen';
import * as medActions from '../store/meds';
import * as eventActions from '../store/events';
import colors from '../config/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import routes from '../navigation/routes';

function MainScreen({navigation}) {
    const events = useSelector(eventActions.getEvents());
    const meds = useSelector(medActions.getMeds());

    const getPlannerItems = () => {
        const plannerItems = [];
        const thisDaysEvents = eventActions.filterEventsForDay(
            events,
            Date.now()
        );

        Object.keys(thisDaysEvents).forEach(k => {
            plannerItems.push({
                type: 'event',
                id: thisDaysEvents[k].id,
                time: thisDaysEvents[k].time,
                title: thisDaysEvents[k].title,
            });
        });
        Object.keys(meds).forEach(k => {
            meds[k].reminders.forEach(r => {
                plannerItems.push({
                    type: 'med',
                    id: meds[k].id,
                    time: r.date.getTime(),
                    title: meds[k].title,
                });
            });
        });

        plannerItems.sort((a, b) => {
            return a.time - b.time;
        });
        return plannerItems;
    };
    const plannerItemsIsEmpty = () => {
        if (getPlannerItems().length !== 0) {
            return (
                <FlatList
                    data={ getPlannerItems() }
                    keyExtractor={ item => item.id }
                    renderItem={ ({item}) => {
                        const time = dayjs(item.time);
                        return (
                            <TouchableOpacity
                                onPress={ () => {
                                    handlePlannerItemPress(item);
                                } }
                            >
                                <Text style={ styles.text }>
                                    { time.format('HH:mm') } | { item.title }</Text>
                            </TouchableOpacity>
                        );
                    } }
                />
            )
        } else return (<Text style={ styles.text }> Es gibt keine Events, welche auf dich zu kommen
        </Text>)
    }
    const handlePlannerItemPress = item => {
        if (item.type === 'event') {
            navigation.navigate(routes.ORGANIZATION_STACK_NAVIGATION, {
                screen: routes.EVENT_EDIT,
                params: {
                    id: item.id,
                    dayTimestamp: Date.now(),
                },
            });
        } else if (item.type === 'med') {
            navigation.navigate(routes.MEDICATION_STACK_NAVIGATION, {
                screen: routes.MEDICATION_EDIT,
                params: {
                    id: item.id,
                },
            });
        }
    };

    return (
        <SafeAreaScreen>
            <ImageBackground source={require('../images/Background.png')} style={styles.image}>

            <View style={ styles.container }>
                { plannerItemsIsEmpty() }
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
        color: colors.text,
        marginLeft: '2%',

    }

});

export default MainScreen;
