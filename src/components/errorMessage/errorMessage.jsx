import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../../redux/index';
import { Alert } from 'react-bootstrap';

const ErrorMessage = (props) => {

	const state = useSelector((state) => state);
  const dispatch = useDispatch();

	const { clearState } = bindActionCreators(actionCreators, dispatch);


	return (
		<Alert key="danger" onClose={() => clearErr(props.actionType)} dismissible variant="danger">
		{ props.errorStatus + ": " + props.errorMessage }
		</Alert>
  )

	function clearErr(actionType) {
		dispatch( clearState(actionType) )
	}
	
}

export default ErrorMessage;