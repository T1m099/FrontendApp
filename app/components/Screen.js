import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../config/colors';
import { isLoading } from '../store/settings';

//function componet to wrap other components and show a activity indicator on top if api calls are ongoing; used e.g. in the document management screen
function Screen({ children }) {
	const loading = useSelector(isLoading());
	return (
		<>
			<ActivityIndicator animating={loading} color={colors.yellow} />
			{children}
		</>
	);
}

export default Screen;
