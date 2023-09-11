import React, { useEffect, useState } from 'react'
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { gapi } from "gapi-script";
import jwt_decode from 'jwt-decode';
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from '../../firebaseConfig';
import './Login.css';
// import { phoneUser } from '../../api';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import { BsFillTelephoneFill } from 'react-icons/bs';
import PhoneOption from './PhoneOption';

const Login = () => {
    // const [otp, setOtp] = useState("");
    // const [ph, setPh] = useState('');
    // const [userFound, setUserFound] = useState(false);
    // const [errMsg, setErrMsg] = useState('');
    // const [userEmail, setUserEmail] = useState('');
    const [phoneOption, setPhoneOption] = useState(false);

    useEffect(() => {
        const start = () => {
          gapi.client.init({
            clientId: "743823463026-7fhca12bi6eiq60i349oshjch731frab.apps.googleusercontent.com",
            scope: "email"
          })
        };
        gapi.load("client:auth2", start);
      },[]);
    
      const dispatch = useDispatch();
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

    // const onCaptchaVerify = () => {
    //     if (!window.recaptchaVerifier) {
    //         window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
    //         'size': 'invisible',
    //         'callback': (response) => {
    //           // reCAPTCHA solved, allow signInWithPhoneNumber.
    //           console.log(response);
    //         },
    //         "expired-callback": () => {}
    //       });
    //     }
    // }

    // const findUser = async () => {
    //     try {
    //         console.log({phone: ph});
    //         const response = await phoneUser({phone: "+" + ph});
    //         setUserFound(true);
    //         setUserEmail(response?.data?.result?.email);
    //         onSignup();
    //         console.log(response.data);
    //     } catch (error) {
    //         console.log(error);
    //         setErrMsg(error.response.data.msg);
    //     }
    // };

    // const onSignup = () => {
    //     onCaptchaVerify();

    //     const appVerifier = window.recaptchaVerifier;
    //     const phoneNumber = "+" + ph;
    //     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    //         .then((confirmationResult) => {
    //         window.confirmationResult = confirmationResult;
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    // }

    

    return (
        <>
        <div id="sign-in-button"></div>
        <div className="wrapper">
        <div className='card_container'> 
          <h1 className='title'>Choose a Login Method</h1>
          <div className="card_container2">
            <div className="box_top">
                <GoogleOAuthProvider 
                  clientId="743823463026-7fhca12bi6eiq60i349oshjch731frab.apps.googleusercontent.com">
                    <GoogleLogin
                      onSuccess={onSuccess}
                      text="signin_with"
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
            {!phoneOption && <div onClick={() => setPhoneOption(true)}  className='phone_button'>
                              <BsFillTelephoneFill size={'22'}/>
                              <p>Sign in with phone</p>
                              </div> }
            {phoneOption && <PhoneOption />}
        </div>
      </div>
      <div className="signup">
        <h3>Don't have an account?</h3>
        <h3><Link to='/signup'  style={{color: "#3ea6ff"}}>Sign Up</Link></h3>
      </div>
        </div>
        </div>

        
        </>
    
  )
}

export default Login