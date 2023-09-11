import React from "react";
// import { googleLogout } from "@react-oauth/google";
import './Auth.css';
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setCurrentUser } from '../../actions/currentUser';
import { Link } from "react-router-dom";

const Auth = ({ User, setAuthBtn, setEditCreateChannelBtn }) => {

  const dispatch = useDispatch();
  const onLogOutSuccess = () => {
    dispatch(setCurrentUser(null));
  };

  return (
    <div className="Auth_container" onClick={() => setAuthBtn(false)}>
      <div className="Auth_container2">
        <p className="User_Details">
          <span className="Channel_logo_App">
            <span className="fstChar_logo_App">
              {User?.data?.result.name ? (
                <>{User?.data.result.name.charAt(0).toUpperCase()}</>
              ) : (
                <>{User?.data.result.email.charAt(0).toUpperCase()}</>
              )}
            </span>
          </span>
          <span className="email_Auth">{User?.data?.result.email}</span>
        </p>
        <div className="btns_Auth">
          {
            User?.data?.result?.name ?
            <>
            {
              <Link to={`/channel/${User?.data?.result._id}`} className="btn_Auth">
                Your Channel
              </Link>
            }
            </> :
            <>
              <input 
                type="submit" 
                className="btn_Auth" 
                value="Create Your Channel" 
                onClick={() => setEditCreateChannelBtn(true)}
              />
            </>
          }
        <div>
            {/* <googleLogout 
                clientId="743823463026-7fhca12bi6eiq60i349oshjch731frab.apps.googleusercontent.com"
                render={(renderProps) => (
                    
                )}
            /> */}
            {/* <button onClick={googleLogout()}>Log Out</button> */}
            <div className="btn_Auth" onClick={onLogOutSuccess}>
                        <BiLogOut />
                        Log Out
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
