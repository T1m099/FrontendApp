import { useFormikContext } from 'formik';

//function component that allows to write conditionally visible fileds in forms
function AppFormConditionalElement({ name, children, checkVisible }) {
	const { values } = useFormikContext();
	//only return the components children if the checkvisible function returns true, otherwise null is returned and the component is hidden
	if (checkVisible(values, name)) {
		return children;
	}
	return null;
}

export default AppFormConditionalElement;
