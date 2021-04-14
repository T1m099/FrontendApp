import { Platform } from 'react-native';

import colors from './colors';

//a styles object with default fonts for android and iOS
export default {
	colors,
	text: {
		color: colors.text,
		fontSize: 18,
		fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
	},
};
