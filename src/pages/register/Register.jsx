import './Register.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../../redux/index';
import useToken from '../../utils/token';
import {
  useNavigate,
} from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const Register = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errMessage, setErr] = useState();

  const { token } = useToken();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  
  
  const { register } = bindActionCreators(actionCreators, dispatch);

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate(-1);
    }
  });

  return (
    <>
			<div className="row">
				<div className="container">
					<div className="row">
						<div className="col-md-6 offset-md-3">
							<div>
                <form onSubmit={handleSubmit}>
                  { errMessage?.errMessage || state?.register?.errorMessage ? 
                  <Alert key="danger" variant="danger">
                    { errMessage?.errMessage ? `Error: ${errMessage.errMessage}`  : `${state.register.errorStatus}: ${state.register.errorMessage}`}
                  </Alert> : null }
                <div className="clearfix">
                  <div className="form-group">
                    <input type="text_field" id="firstName" placeholder="Prénom" name="firstName" className="tm-input" onChange={handleChange} /> 
                  </div>
                  <div className="form-group">
                    < input type="text_field" id="lastName" placeholder="Nom" autoComplete="family-name" className="tm-input" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                  <input id="email" name="email" placeholder='email' className="tm-input" onChange={handleChange}/>
                    {/* <%= f.email_field :email, placeholder: "Identifiant/email", autoComplete: "email", :className => 'tm-input', :required => true %> */}
                  </div>
                  <div className="form-group">
                    <input type="password" id="password" name="password" placeholder="Mot de passe: 6 caractères minimum)" autoComplete="new-password" className="tm-input" onChange={handleChange} required />
                  </div> 
                  <div className="form-group">
                    <input type="password" id="passwordConfirmation" placeholder="Confirmation du mot de passes" name="passwordConfirmation" className="tm-input" onChange={handleChange} required />
                  </div>
								</div>
              <div className="mt-30 text-center">
                {/* <Button/> */}
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
    setErr({
      errMessage: null,
    })
    if ( form.password !== form.passwordConfirmation ) {
      setErr({
        errMessage: "Password confirmation must match password"
      })
    } else if (form.password.length <= 8) {
      setErr({
        errMessage: "Password must contain more than 8 characters"
      })
    }
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    handlePasswordConfirmation();
    if (errMessage) return;
      dispatch( await register(form.email, form.password))
      if (state?.token?.token) {
        navigate(-1);
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

// function handleForm() {
//   const [useForm, setForm] = useState();
//   // Logic to handle inputs should be here
// }

export default Register;