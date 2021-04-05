import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    FlatList,
} from 'react-native';
import {useFormikContext} from 'formik';
import {ButtonMagenta, ButtonStandard} from "../Buttons";
import AppText from '../AppText';
import {AntDesign} from "@expo/vector-icons";

function AppFormColorPicker({
	name,
	colors,
	style,
	checkVisible = (vals, name) => true,
}) {
	const { setFieldValue, values } = useFormikContext();
	const [modalVisible, setModalVisible] = useState(false);

	if (!checkVisible(values, name)) return null;

	return (
		<View style={style}>
			<View style={[styles.container, { backgroundColor: values[name] }]}>
				<TouchableOpacity
					onPress={() => {
						setModalVisible(true);
					}}
				>
                    <AntDesign name="tagso" size={ 24 } color="white"/>

				</TouchableOpacity>
			</View>
            <Modal visible={modalVisible} animationType='slide'>
                <View style={styles.colorContainer}>
                    <FlatList
                        contentContainerStyle={styles.colorContainer}
                        data={colors}
                        keyExtractor={item => item}
                        numColumns={3}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setFieldValue(name, item);
                                    setModalVisible(false);
                                }}
                            >
                                <View
                                    style={[
                                        styles.colorCircle,
                                        {backgroundColor: item},
                                    ]}
                                />
                            </TouchableOpacity>
                        )}
                        ListFooterComponent={
                            <ButtonStandard
                                Content='Close'
                                onPress={() => setModalVisible(false)}
                            />
                        }
                    />
                </View>
            </Modal>
		</View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        width: 65,
        height: 65,
        justifyContent: 'center',
        alignItems: 'center',
    },
    colorCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        flexDirection: 'column',
        margin: 10,
    },
    colorContainer: {
        flexGrow: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'grey',
    },
});

export default AppFormColorPicker;
