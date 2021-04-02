import React from 'react';
import { View, StyleSheet, FlatList, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import colors from "../config/colors";
import AppForm from '../components/forms/AppForm';
import AppFormField from '../components/forms/AppFormField';
import AppSubmitButton from '../components/forms/AppSubmitButton';
import ListItem from '../components/ListItem';
import ListItemDeleteAction from '../components/ListItemDeleteAction';

import * as settingsActions from '../store/settings';

function TrackingEditScreen(props) {
	const categories = useSelector(settingsActions.getTrackingCategories());
	const dispatch = useDispatch();

	const handleNewCategory = cat => {
		dispatch(settingsActions.addTrackingCategory());
	};
	const handleDeleteCategory = cat => {
		dispatch(settingsActions.removeTrackingCategory);
	};

	return (
		<ImageBackground source={require('../images/Background.png')} style={styles.image}>

			<View style={styles.container}>
				<FlatList
					data={categories}
					renderItem={({ item }) => {
						return (
							<ListItem
								title={item.category}
								message={'Unit: ' + item.unit}
								renderRightActions={() => {
									return (
										<ListItemDeleteAction
											onPress={() => {
												handleDeleteCategory(item);
											}}
										/>
									);
								}}
							/>
						);
					}}
					keyExtractor={item => item.category}
					ListFooterComponent={
						<>
							<AppForm
								initialValues={{ category: '', unit: '' }}
								onSubmit={(values, actions) => {
									handleNewCategory(values);
									actions.resetForm();
								}}
							>
								<View style={styles.inputGroup}>
									<AppFormField
										name='category'
										width='100%'
										placeholder='What to track?'
										style={styles.inputFields}
									/>
									<AppFormField
										name='unit'
										width='100%'
										placeholder='Unit'
										style={styles.inputFields}
									/>
								</View>

								<AppSubmitButton
									title='New Tracking Category'
									style={{ marginVertical: 0 }}
								/>
							</AppForm>
						</>
					}
				/>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	inputFields: { flex: 1 },
	inputGroup: { flexDirection: 'row' },
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'center',
		width: '100%',
		maxHeight: '100%',
		marginTop: '.75%',
		marginBottom: '.75%',

		textAlign: 'center',
		justifyContent: 'space-evenly'
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

export default TrackingEditScreen;
