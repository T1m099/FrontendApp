import { useFormikContext } from 'formik';

function AppFormConditionalElement({ name, children, checkVisible }) {
	const { values } = useFormikContext();

	if (checkVisible(values, name)) {
		return children;
	}
	return null;
}

export default AppFormConditionalElement;
