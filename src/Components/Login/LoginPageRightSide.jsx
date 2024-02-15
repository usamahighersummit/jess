import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import JoinClassroom from "./LoginWidgets/JoinClassroom";

function LoginPageRightSide() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const noErrorState = useRef({ email: false, password: false });

  const navigate = useNavigate();

  const dashboardNavigation = () => {
    navigate("/home");
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const validateEmail = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!credentials.email) {
      setEmailError("Email is required");
    } else if (!emailPattern.test(credentials.email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
      noErrorState.current.email = true;
    }
  };

  const validatePassword = () => {
    if (!credentials.password) {
      setPasswordError("Password is required");
    } else if (
      credentials.password.length < 6 ||
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\.])[A-Za-z\d!@#$%^&*()_+\.]{6,}$/.test(
        credentials.password
      )
    ) {
      setPasswordError(
        "Password must have at least 6 characters, including alphabets, numbers, and special characters."
      );
    } else {
      setPasswordError("");
      noErrorState.current.password = true;
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    if (noErrorState.current.email && noErrorState.current.password) {
      axios
        .request({
          method: "POST",
          url: process.env.REACT_APP_REST_API_BASE_URL + "/student_login",
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })
        .then((res) => {
          console.log(res);
          if (res.data.access_token === undefined) {
            setPasswordError("Email or password is incorrect");
            return;
          }
          localStorage.setItem("access_token", res.data.access_token);
          localStorage.setItem("email_address", credentials.email);
          if (res.data.student_status === 1) {
            setLoggedIn(true);
          } else {
            dashboardNavigation();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <div className="w-full h-full bg-white centered md:h-screen p-10 md:p-36 sm:p-5">
        <div className="main-content-div w-[500px] sm:w-[360px] md:w-[520px]">
          {!loggedIn ? (
            <div>
              <div className="sign-in-label mb-[20px]">
                <p>Sign In</p>
              </div>
              <div className="sing-in-sub-label">
                <p>Please sign in to access Jess</p>
              </div>
              <div className="w-[85%] ml-auto mr-auto">
                <form>
                  <div className="mt-[2px] mb-[20px]">
                    <label className="email-label">Enter your Email</label>
                    <input
                      type="email"
                      name="email"
                      style={{ height: "45px" }}
                      className="textfield-text border-[1px] border-[#8B8B90] rounded-md w-full px-4 text-black leading-tight  "
                      id="username"
                      placeholder="Enter your Username"
                      value={credentials.email}
                      onChange={onChange}
                      onBlur={validateEmail}
                    />
                    <div className="error-text mt-[10px]">{emailError}</div>
                  </div>

                  <div>
                    <label className="email-label mt-[13px] ">
                      Enter your Password:
                    </label>
                    <input
                      type="password"
                      name="password"
                      style={{ height: "45px" }}
                      className=" textfield-text border-[#8B8B90] border-[1px] rounded-md w-full px-4 text-black leading-tight  focus:shadow-blue-900  "
                      id="password"
                      placeholder="Enter your Password"
                      value={credentials.password}
                      onChange={onChange}
                      onBlur={validatePassword}
                    />
                    <div className="error-text mt-[10px]">{passwordError}</div>
                  </div>

                  <div className="mt-[8px] ">
                    <button
                      style={{
                        background:
                          credentials.email.length === 0 ||
                          credentials.password.length === 0
                            ? "var(--m-3-state-layers-light-on-surface-opacity-012, rgba(28, 27, 31, 0.12))"
                            : null,
                        color:
                          credentials.email.length === 0 ||
                          credentials.password.length === 0
                            ? "color: var(--M3-sys-light-on-surface, #1C1B1F)"
                            : null,
                      }}
                      type="submit"
                      className="sign-in-button mt-[8px] bg-[#050038]  rounded-md hover:bg-black text-[white] hover:text-white font-bold py-2 px-4 w-full h-[45px]"
                      onClick={loginUser}
                      disabled={!credentials.email || !credentials.password} // Button is disabled if either email or password is empty
                    >
                      Sign In
                    </button>

                    <div
                      className=" mt-[20px] w-[75%]"
                      style={{ lineHeight: "10px" }}
                    >
                      <span className="mb-[0px] beta-text ">
                        We are in closed beta. To access Jess please request a
                        username and password
                      </span>
                      <span className="mb-[0px] beta-text-continue ml-[5px]">
                        Here
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <JoinClassroom />
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPageRightSide;
