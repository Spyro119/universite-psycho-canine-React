import './Register.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../../redux/index';
import { ErrorMessage } from '../../components/index';
import useToken from '../../utils/token';
import {
  useNavigate,
} from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { clearState } from '../../redux/action';

const Register = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [err, setErr] = useState({ message : null });

  const { token } = useToken();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  
  
  const { register } = bindActionCreators(actionCreators, dispatch);
  const { clearState } = bindActionCreators(actionCreators, dispatch);

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate(-1);
    }
  });

  return (
    <>
			<div className="row" style={{  paddingTop: "6rem" }}>
				<div className="container">
					<div className="row">
						<div className="col-md-6 offset-md-3">
							<div>
                <form onSubmit={handleSubmit}>
                  { err.message != null ?
                    <Alert key="danger" onClose={() => setErr({ message : null })} dismissible variant="danger">
                      { err.message }
                    </Alert> : <></> }
                  { 
                    state?.register?.errorMessage ? 
                      <ErrorMessage errorStatus={state.register.errorStatus} errorMessage={state.register.errorMessage} actionType="CLEARREGISTER" /> 
                      : null 
                  }
                <div className="clearfix">
                  <div className="form-group">
                    <input type="text_field" id="firstName" placeholder="Prénom" name="firstName" className="tm-input" onChange={handleChange} /> 
                  </div>
                  <div className="form-group">
                    < input type="text_field" id="lastName" placeholder="Nom" autoComplete="family-name" className="tm-input" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                  <input id="email" name="email" placeholder='email' className="tm-input" onChange={handleChange}/>
                  </div>
                  <div className="form-group">
                    <input type="password" id="password" name="password" placeholder="Mot de passe: 6 caractères minimum)" autoComplete="new-password" className="tm-input" onChange={handleChange} required />
                  </div> 
                  <div className="form-group">
                    <input type="password" id="passwordConfirmation" placeholder="Confirmation du mot de passes" name="passwordConfirmation" className="tm-input" onChange={handleChange} required />
                  </div>
								</div>
              <div className="mt-30 text-center">
                <input type="submit" className="btn btn-primary" />
              </div>
              <div className="mt-10 text-center">
                {/* <%= link_to 'Se connecter', new_user_session_path, :className => "btn btn-primary" %> */}
              </div>
                </form>
							</div>
						</div>
					</div>
				</div>
      </div>
    </>
  )

  function handlePasswordConfirmation() {
    let errorMessage = null;
    if ( form.password !== form.passwordConfirmation ) {
      errorMessage = "Password confirmation must match password";
    } else if (form.password.length < 8) {
      errorMessage = "Password must contain more than 8 characters"
    }
    console.log(err.message);
    setErr({
      message : errorMessage
    })
    return errorMessage;
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    let errorMessage = await handlePasswordConfirmation();
    dispatch( await clearState("CLEARREGISTER"))
    if (!errorMessage) {
      dispatch( await register(form.email, form.password))
      if (state?.token?.token) {
        navigate(-1);
      }
    }
	}

  function handleChange(event) {
		switch(event.target.name){
			case "password":
				setForm( prevState => ({
						...prevState, 
						password: event.target.value
				}) )
				break;
			case "email":
				setForm( prevState => ({
						...prevState, 
						email: event.target.value
				}) )
				break;
      case "passwordConfirmation" :
        setForm ( prevState => ({
          ...prevState,
          passwordConfirmation: event.target.value
        }))
        break
			default:
				return ""
		}
  }
}

export default Register;