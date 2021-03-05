import React from 'react';
import {StyleSheet, View} from 'react-native';
import * as Yup from 'yup';

import AppText from '../components/AppText';
import {ButtonAccept, ButtonDecline, ButtonStandard} from "../components/Buttons";
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import AppFormDateTimePicker from '../components/forms/AppFormDateTimePicker';
import SubmitButton from '../components/forms/AppSubmitButton';
import AppFormColorPicker from '../components/forms/AppFormColorPicker';
import AppFormPicker from '../components/forms/AppFormPicker';
import AppFormConditionalElement from '../components/forms/AppFormConditionalElement';
import ReminderList from '../components/ReminderList';
import {AntDesign} from "@expo/vector-icons";

function EventEditScreen({navigation, route}) {
    const disceaseKeyword = 'Disease';
    const {
        valueDateViewTransform,
        valueTimeViewTransform,
        event,
        onSubmit,
        onDeleteReminder,
    } = route.params;

    const validationSchema = Yup.object().shape({
        title: Yup.string().required().min(1).label('Title'),
        description: Yup.string().label('Description'),
    });

    const colorPickerItems = [
        '#00ff00',
        '#0f0f00',
        '#006CBE',
        '#427505',
        '#C33400',
        '#00345C',
        '#E3CC00',
        '#00A3AE',
        '#CC007E',
        '#684697',
        '#B10E1C',
        '#F9A825',
    ];
    const categories = ['Appointment', 'Therapy', disceaseKeyword];
    const diseases = ['Flatulenzen', 'Gripaler Infekt', 'Männergrippe'];

    const handleSubmit = event => {
        const e = {...event};
        /* if (e.category === disceaseKeyword) {
            if (e.reminders) delete e.reminders;
        } else {
            if (e.disease) delete e.disease;
        } */
        onSubmit(e);
        navigation.pop();
    };

    return (
        <View style={ styles.maincontainer }>
            <AppForm
                initialValues={ event }
                onSubmit={ handleSubmit }
                validationSchema={ validationSchema }
            >
                <View style={ styles.container }>
                    <AppFormField name='title' width='100%' placeholder='Title'/>

                    <AppFormPicker
                        name='category'
                        items={ categories }
                        extractKey={ item => {
                            return item;
                        } }
                        renderSelectedItem={ item => {
                            return <AppText>{ item }</AppText>;
                        } }
                        renderPickerItem={ ({item}) => {
                            return <AppText>{ item }</AppText>;
                        } }
                        renderPlaceholder={ () => {
                            return <AppText>Choose Category</AppText>;
                        } }
                    />
                </View>

                <AppFormConditionalElement
                    checkCondition={ values => {
                        return values.category === disceaseKeyword;
                    } }
                >
                    <View style={ [styles.container, {maxHeight: 70}] }>
                        <AppFormPicker
                            name='disease'
                            items={ diseases }
                            extractKey={ item => {
                                return item;
                            } }
                            renderSelectedItem={ item => {
                                return <AppText>{ item.toString() }</AppText>;
                            } }
                            renderPickerItem={ ({item}) => {
                                return <AppText>{ item.toString() }</AppText>;
                            } }
                            renderPlaceholder={ () => {
                                return <AppText>Disease</AppText>;
                            } }
                        />
                    </View>
                </AppFormConditionalElement>
                <AppFormConditionalElement
                    checkCondition={ values => {
                        return values.category !== disceaseKeyword;
                    } }
                >
                    <View style={ styles.container }>
                        <ReminderList
                            name='reminders'
                            style={ styles.reminderList }
                            onReminderDelete={ reminder => {
                                onDeleteReminder(reminder);
                            } }
                        />
                    </View>
                </AppFormConditionalElement>
                <View style={ [styles.container, {maxHeight: 90, marginTop: 5}] }>

                    <View style={ styles.startContainer }>
                        <AppText style={ styles.datePickerLabel }>From:</AppText>
                        <View style={ styles.datePicker }>
                            <AppFormDateTimePicker
                                name='start'
                                valueDateTransform={ valueDateViewTransform }
                                valueTimeTransform={ valueTimeViewTransform }
                            />
                        </View>
                    </View>
                    <View style={ styles.startContainer }>
                        <AppText style={ styles.datePickerLabel }>To:</AppText>
                        <View style={ styles.datePicker }>
                            <AppFormDateTimePicker
                                name='end'
                                valueDateTransform={ valueDateViewTransform }
                                valueTimeTransform={ valueTimeViewTransform }
                            />
                        </View>
                    </View>
                </View>

                <View style={ [styles.container, {marginTop: 5, maxHeight: 90, flexDirection: 'row'}] }>

                    <AppFormField style={ [{width: 250, height: 80, marginTop: 1.5, marginLeft: 4}] }
                                  maxLength={ 225 }
                                  multiline
                                  name='description'
                                  numberOfLines={ 3 }
                                  placeholder='Description'
                    />

                    <AppFormColorPicker
                        name='markingColor'
                        colors={ colorPickerItems }
                    />
                </View>
                <View style={ [styles.container, {marginTop: 5, maxHeight: 90, flexDirection: 'row'}] }>
                    <View style={ styles.buttonContainer }>
                        <ButtonDecline
                            Content={ <AntDesign name="close" size={ 24 } color="white"/> }
                            onPress={ () => {
                                navigation.pop();
                            } }
                        />
                        <ButtonAccept
                            Content={ <AntDesign name="addfile" size={ 24 } color="white"/> }
                        />
                    </View>
                </View>

            </AppForm>
        </View>
    );
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        width: '92%',
        marginTop: '.75%',
        marginBottom: '.75%',
        textAlign: 'center',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        width: 400,
        maxHeight: 132,
        borderRadius: 10,
        marginTop: '.75%',
        marginBottom: '.75%',
        backgroundColor: 'rgba(0,0,0,.5)',
        textAlign: 'center',
        justifyContent: 'space-between'
    },
    dateTimePickerContainer: {
        flexDirection: 'row',
        marginVertical: 10,

    },
    startContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    datePickerLabel: {flex: 1, marginLeft: 10},
    datePicker: {flex: 5},
    buttonContainer: {
        marginLeft: 120,
        flexDirection: 'row',
    },
    closeButton: {
        flex: 1,
    },
    submitButton: {
        flex: 3,
    },
    reminderList: {
        maxHeight: '35%',
    },
});

export default EventEditScreen;
