import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import PhoneInput from 'react-phone-input-2';


const SignUp = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const phoneChangeHandler = (phone) => {
      setErrMsg('');
      // console.log(errMsg);
      setPhone(phone);
  }

    const emailChangeHandler = (e) => {
      setErrMsg('');
      setEmail(e.target.value);
    }

    const dispatch = useDispatch();
    const [errMsg, setErrMsg] = useState('');
    const signUp = (e) => {
        e.preventDefault();
        const formattedPhone = "+" + phone;
        // console.log(formattedPhone);
        dispatch(login({ email: email, phone: formattedPhone}))
        .then(error => {
          if (!error) navigate('/');
          else
          setErrMsg(error);
        });
        
    };
    
    const navigate = useNavigate();
    const onSuccess = (response) => {
      // console.log(jwt_decode(response.credential))
      const email = jwt_decode(response.credential).email;
      dispatch(login({ email:email }))
      navigate('/');
    };
  
    const onFailure = (response) => {
      console.log("Failure", response);
    };

  return (
    <div className="wrapper">
        <div className='card_container'>
          <div className="card_container2">
            <div className="box_top">
                <GoogleOAuthProvider 
                  clientId="743823463026-7fhca12bi6eiq60i349oshjch731frab.apps.googleusercontent.com">
                    <GoogleLogin
                      onSuccess={onSuccess}
                      text="signup_with"
                      onError={onFailure}
                    />
                </GoogleOAuthProvider>     
            </div>

            <div className="divider_container">
              <div className="divider_line"></div>
              <span className='text'>OR</span>
              <div className="divider_line"></div>
            </div>

            <div className="box_bottom">
              <form className="otp_form" onSubmit={signUp}>
                <div>
                <p className={`${errMsg?.length ? "msg_active" : "inactive"}`}>{errMsg}</p>
                  <label className="label" htmlFor="phone">Phone Number: </label>
                    <PhoneInput
                  inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true,
                  }}
                  onlyCountries={['in']} 
                  country={'in'}
                  style={{color: "black", marginTop: "0.1rem"}}
                  value={phone}
                  onChange={phoneChangeHandler}
                  isValid={(value, country) => {
                    if (!value.match(/^(91)[0-9]{10}$/)) {
                        return 'Invalid value';
                    } else {
                        return true;
                    }
                  }}
                  
                />
                </div>
                <div style={{display: "grid"}}>
                  <label htmlFor="email">Email: </label>
                  <input type="email" name='email' className="email_btn" placeholder='Email' value={email} onChange={emailChangeHandler} required/>
                </div>
                
                  
                  <button className='phone_button otp' type='submit'>Sign Up</button>
              </form>
            </div>
          </div>

          <div className="signup">
            <h3>Already have an account ?</h3>
            <h3><Link to='/login'  style={{color: "#3ea6ff"}}>Sign In</Link></h3>
          </div>
        </div>
      </div>
  )
}

export default SignUp