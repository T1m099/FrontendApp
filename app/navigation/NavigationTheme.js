import { DefaultTheme } from '@react-navigation/native';
import colors from '../config/colors';

export default {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: colors.accent,
		background: colors.background,
		card:colors.navigation,
		text: colors.text,
		border: colors.navigation,

	},
};
