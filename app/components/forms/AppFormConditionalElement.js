import { useFormikContext } from 'formik';

function AppFormConditionalElement({ children, checkCondition }) {
	const { values } = useFormikContext();

	if (checkCondition(values)) {
		return children;
	}
	return null;
}

export default AppFormConditionalElement;
