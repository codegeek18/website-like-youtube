import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { phoneUser } from '../../api';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import OtpInput from 'react-otp-input';
import PulseLoader from 'react-spinners/PulseLoader'; 
import './Login.css';

const PhoneOption = () => {
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState('');
    const [userFound, setUserFound] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [otpBtn, setOtpBtn] = useState(false);
    const [ otpSent, setOtpSent ] = useState(false);
    const [ otpVerifyLoader, setOtpVerifyLoader ] = useState(false);

    // const phoneRef = useRef();
    const phoneChangeHandler = (phone) => {
        setErrMsg('');
        console.log(errMsg);
        setPh(phone);
    }

    const onCaptchaVerify = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
            //   console.log(response);
            },
            "expired-callback": () => {}
          });
        }
    }

    const findUser = async () => {
        try {
            // console.log({phone: ph});
            const response = await phoneUser({phone: "+" + ph});
            setUserFound(true);
            setUserEmail(response?.data?.result?.email);
            onSignup();
            // console.log(response.data);
        } catch (error) {
            console.log(error);
            setErrMsg(error.response.data.msg);
        }
    };

    const onSignup = () => {
        onCaptchaVerify();

        const appVerifier = window.recaptchaVerifier;
        const phoneNumber = "+" + ph;
        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // setUserFound(false);
                setOtpSent(true);
            window.confirmationResult = confirmationResult;
            }).catch((error) => {
                console.log(error);
            });
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onOTPVerify = () => {
        setOtpVerifyLoader(true)
        window.confirmationResult.confirm(otp).then(async (res) => {
        //   console.log(res);
          setOtpVerifyLoader(false);
          dispatch(login({ email: userEmail }));
          navigate('/');
            
        }).catch(err => {
            console.log(err);
        })
    };

  return (
    <div className='otp_form'>
        <div>
            <p className={`${errMsg?.length ? "msg_active" : "inactive"}`}>{errMsg}</p>
            <p className={`${otpSent ? "msg_active" : "inactive"}`} style={{backgroundColor: "lightgreen", color: "black"}}>OTP Sent Successfully!</p>
        <label htmlFor="phone">Phone Number:</label>
            <PhoneInput
                inputProps={{
                    name: 'phone',
                    required: true,
                    autoFocus: true,
                }} 
                onlyCountries={['in']}
                country={'in'}
                style={{color: "black", marginTop: "0.1rem"}}
                value={ph}
                onChange={phoneChangeHandler}
                isValid={(value, country) => {
                    if (!value.match(/^(91)[0-9]{10}$/)) {
                        setOtpBtn(false);
                        return 'Invalid value';
                    } else {
                        setOtpBtn(true);
                        return true;
                    }
                  }}
            />
        </div>
        
        {/* <input type='text' placeholder='Enter your phone number' value={ph} onChange={(e) => setPh(e.target.value)}/> */}
        {!userFound && <button className='phone_button otp' onClick={findUser} disabled={!otpBtn}>SEND OTP</button>}
        { userFound && otpSent && <>
        <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        inputStyle='inputStyle'
        renderSeparator={<span>-</span>}
        renderInput={(props) => <input {...props} />}
        shouldAutoFocus
        />
        <button className='phone_button otp' onClick={onOTPVerify}>Verify OTP <PulseLoader loading={otpVerifyLoader} size={'3px'} cssOverride={{display: "inline", margin: "0"}}/> </button>
         </>
        }
        </div>
  )
}

export default PhoneOption