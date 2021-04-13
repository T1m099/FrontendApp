import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../config/colors';
import { isLoading } from '../store/settings';

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
