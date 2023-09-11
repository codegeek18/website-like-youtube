import React, { useState }  from "react";
import "./Navbar.css";
import logo from "./logo.ico";
import SearchBar from "./SearchBar/SearchBar";
// import { RiVideoAddLine } from "react-icons/ri";
// import { IoMdNotificationsOutline } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
// import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
// import { gapi } from "gapi-script";
// import jwt_decode from 'jwt-decode';
import { useSelector } from "react-redux";
// import { login } from "../../actions/auth";
import Auth from "../../pages/Auth/Auth";

const Navbar = ({ toggleDrawer, setEditCreateChannelBtn }) => {
  const [AuthBtn, setAuthBtn] = useState(false);

  const currentUser = useSelector(state => state.currentUserReducer);

  // useEffect(() => {
  //   const start = () => {
  //     gapi.client.init({
  //       clientId: "743823463026-7fhca12bi6eiq60i349oshjch731frab.apps.googleusercontent.com",
  //       scope: "email"
  //     })
  //   };
  //   gapi.load("client:auth2", start);
  // },[]);

  // const dispatch = useDispatch();
  // const onSuccess = (response) => {
  //   // console.log(jwt_decode(response.credential))
  //   const email = jwt_decode(response.credential).email;
  //   dispatch(login({ email:email }))
  // };

  // const onFailure = (response) => {
  //   console.log("Failure", response);
  // };

  return (
    <>
      <div className="Container_Navbar">
        <div className="Burger_Logo_Navbar" onClick={() => toggleDrawer()}>
          <div className="burger">
            <p></p>
            <p></p>
            <p></p>
          </div>
          <Link to='/' className="logo_div_Navbar">
            <img src={logo} alt="" />
            <p className="logo_title_navbar">YouTube</p>
          </Link>
        </div>
        <SearchBar />
        {/* <RiVideoAddLine size={22} className="vid_bell_Navbar" />
        <IoMdNotificationsOutline size={22} className="vid_bell_Navbar" />
        <div className="apps_Box">
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>
          <p className="appBox"></p>        
        </div> */}
        <div className="Auth_cont_Navbar">
          {
            currentUser ? 
            (
              <>
                <div className="Channel_logo_App" onClick={() => setAuthBtn(true)}>
                  <p className="fstChar_logo_App">
                    {
                      currentUser?.data?.result?.name ? (
                        <>
                          {currentUser.data.result.name.charAt(0).toUpperCase()}
                        </>
                      ) 
                      : (
                          (
                            <>
                              {currentUser.data.result.email.charAt(0).toUpperCase()}
                            </>
                          )
                      )
                    }
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* <GoogleOAuthProvider 
                clientId="743823463026-7fhca12bi6eiq60i349oshjch731frab.apps.googleusercontent.com">
                  <GoogleLogin
                    onSuccess={onSuccess}
                    text="Sign In"
                    type="icon"
                    shape="circle"
                    onError={onFailure}
                    render={renderProps => (
                      <p onClick={renderProps.onClick} className="Auth_Btn">
                        <BiUserCircle size={22} />
                        <b>Sign In</b>
                      </p>
                    )}
                  />
                </GoogleOAuthProvider> */}
                <Link to={'/login'}>
                  <p className="Auth_Btn">
                    <BiUserCircle size={22} />
                    <b>Sign In</b>
                  </p>
                </Link>
              </>
              )
          }
        </div>
      </div>
      {
        AuthBtn && 
        <Auth setEditCreateChannelBtn={setEditCreateChannelBtn} setAuthBtn={setAuthBtn} User={currentUser} />
      }
    </>
  );
};

export default Navbar;
