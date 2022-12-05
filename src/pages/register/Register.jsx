import './Register.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../../redux/index';
import useToken from '../../utils/token';
import {
  useNavigate,
} from 'react-router-dom';

const Register = () => {

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState();

  const { token } = useToken();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if ( form.password == form.passwordConfirmation ) {
      try { 
        dispatch( await register(form.email, form.password))
      } catch (e) {
        console.log(e);
      }
      dispatch( await getToken(form.email, form.password))
      navigate("/");
    } else {
      setError({
        error: "password must match"
      })
      console.log(error);
    }
	}
  
  const { register } = bindActionCreators(actionCreators, dispatch);
  const { getToken } = bindActionCreators(actionCreators, dispatch);

  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate('/');
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
                <div className="clearfix">
                  <div className="form-group">
                    <input type="text_field" id="firstName" placeholder="Prénom" name="firstName" className="form-control" onChange={handleChange} /> 
                  </div>
                  <div className="form-group">
                    < input type="text_field" id="lastName" placeholder="Nom" autoComplete="family-name" className="form-control" onChange={handleChange} />
                  </div>
                  <div className="form-group">
                  <input id="email" name="email" placeholder='email' className="form-control" onChange={handleChange}/>
                    {/* <%= f.email_field :email, placeholder: "Identifiant/email", autoComplete: "email", :className => 'form-control', :required => true %> */}
                  </div>
                  <div className="form-group">
                    { error? <p> error </p> : null }
                    <input type="password" id="password" name="password" placeholder="Mot de passe: 6 caractères minimum)" autoComplete="new-password" className="form-control" onChange={handleChange} required />
                  </div> 
                  <div className="form-group">
                    <input type="password" id="passwordConfirmation" placeholder="Confirmation du mot de passes" name="passwordConfirmation" className="form-control" onChange={handleChange} required />
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

  function handleChange(event) {
    console.log(form);
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