import { DefaultTheme } from '@react-navigation/native';
import colors from '../config/colors';

//defining how the navigation should look like
export default {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: colors.accent,
		background: colors.background,
		card: colors.navigation,
		text: colors.text,
		border: colors.navigation,
	},
};
