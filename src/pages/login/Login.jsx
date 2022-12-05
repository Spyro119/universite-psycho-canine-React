import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../../redux/index';
import { useState, useEffect } from 'react';
import useToken from '../../utils/token';
import {
  useNavigate,
} from 'react-router-dom';
import { useCallback } from 'react';

const Login = () => {

	const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
	// const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { getToken } = bindActionCreators(actionCreators, dispatch);

	const { token } = useToken();

	const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  });

	const handleSubmit = async () => {
		dispatch( await getToken(credentials.email, credentials.password))
	}

	return (
  <>
    <div className="row">
			<div className="container">
				<div className="row">
					<div className="col-md-6 offset-md-3">
						<div>
							<form onSubmit={handleSubmit}>
							<div className="clearfix">
								<div className="form-group">
									<input type="email" name="email" id="email" placeholder="Email" autoComplete="email" className="form-control" onChange={handleChange} required />
								</div>
								<div className="form-group">
									<input type="password" name="password" id="password" placeholder="Password" autoComplete="current-password" className="form-control" onChange={handleChange} required />
								</div>
							</div>
							<div className="row">
								<div className="col-md-6 col-sm-6 col-6">
									<div className="form-tip pt-20">
										{/* <a className="no-text-decoration fs-13 mt-10 block" href="#">Forgot your password?</a> */}
									</div>
								</div>
							</div>
							<div className="mt-30 text-center">
								<div className="btn ">
									<input type="submit" className="btn btn-primary"/>
								</div>
								<div className="mt-10 text-center">
								</div>
							</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
  </>
  )

	function handleChange(event) {
		switch(event.target.name){
			case "password":
				setCredentials( prevState => ({
						...prevState, 
						password: event.target.value
				}) )
				break;
			case "email":
				setCredentials( prevState => ({
						...prevState, 
						email: event.target.value
				}) )
				break;
			default:
				return ""
		}
  }

	

	const login = async (dispatch) => {
		dispatch(getToken(credentials.email, credentials.password))
	}

}

export default Login;