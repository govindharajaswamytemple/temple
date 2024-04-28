import React, { useContext, useEffect, useState } from "react";
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { GrTwitter } from "react-icons/gr";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import "../../../assets/css//Login.css";
import Teks_Logo from "../../../assets/images/Teks_Logo.svg";
import { AuthContext } from "../../../dataLayer/context/authContext/AuthContextProvider";

import gif from "../../../assets/images/GIF_01.gif";
import Button from "../../components/button/Button";
import { Link } from "react-router-dom";
const LockScreen = () => {
  const { OpenLockScreen, AuthState } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  console.log(AuthState.user.email, "AuthStateefg");

  const [values, setValues] = useState({
    password: "",
  });

  console.log(values, "jhfgjgfv");

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const [errors, seterrors] = useState({
    password: "",
  });

  useEffect(() => {
    if (values.password) {
      seterrors({ ...errors, password: "" });
    }
  }, [values.email, values.password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values, "values");

    if (!values.password) {
      seterrors((prev) => ({ ...prev, password: "Password is required" }));
      return false;
    }

    if (!errors.password && values.password) {
      console.log(values, "jhfgjgfv");
      OpenLockScreen(values);
    }
  };

  return (
    <div>
      <div className="login_bg_image vh-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center mt-sm-5 mb-1 text-white-50">
                <div>
                  <a className="d-inline-block auth-logo mt-5">
                    <img src={Teks_Logo} alt="Login page logo" height="40" />
                  </a>
                </div>
              </div>
              <div className="justify-content-center row mt-3">
                <div className="col-md-8 col-lg-6 col-xl-5">
                  <div className="card">
                    <div className="p-4 card-body">
                      <div className="text-center">
                        <h5 className="login_welcome_text">Lock Screen</h5>
                        <p className="text-mute login_welcome_description m-0">
                          Enter your password to unlock the screen!
                        </p>
                      </div>
                      <div className="p-2 mt-4">
                        <form action="#" className="text-start">
                          <div className="mb-3 text-center d-flex flex-column align-items-center gap-2">
                            <img
                              src="https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8"
                              width={80}
                              height="auto"
                              alt=""
                              className="rounded-circle"
                            />

                            {AuthState.user.email && AuthState.user.email ? (
                              <h5 className="lock-screen-username fs-13">
                                {AuthState.user.email}
                              </h5>
                            ) : (
                              <h5 className="lock-screen-username ">
                                No User Found
                              </h5>
                            )}
                          </div>

                          <label
                            htmlFor="password"
                            className="form-label form-label fs-13 fw-500"
                          >
                            Password<span className="text-danger">*</span>
                          </label>
                          <div className="position-relative auth-pass-inputgroup">
                            <input
                              name="password"
                              id="password"
                              placeholder="Enter Password"
                              type={showPassword ? "text" : "password"}
                              className={
                                errors && errors.password
                                  ? "form-control fs-s bg-form text_color input_bg_color error-input"
                                  : "form-control fs-s bg-form text_color input_bg_color"
                              }
                              aria-invalid="false"
                              onChange={handleInput}
                            />
                            <div style={{ height: "8px" }}>
                              {errors.password && (
                                <span className="text-danger text-start mail error-text fs-s">
                                  {errors.password}
                                </span>
                              )}
                            </div>
                            {/* <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                            >
                              {showPassword ? (
                                <FaRegEyeSlash onClick={toggleShowPassword} />
                              ) : (
                                <FaRegEye onClick={toggleShowPassword} />
                              )}
                            </button> */}
                            <Button
                              className="btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                              icon={
                                showPassword ? (
                                  <FaRegEye
                                    onClick={toggleShowPassword}
                                    className="black_color"
                                  />
                                ) : (
                                  <FaRegEyeSlash
                                    onClick={toggleShowPassword}
                                    className="black_color"
                                  />
                                )
                              }
                            />
                          </div>
                          <div className="mt-3 ">
                            {/* <button
                              type="submit"
                              className="btn btn-success w-100 btn btn-success fs-13   "
                              onClick={handleSubmit}
                            >
                              Unlock
                            </button> */}
                            <Button
                              type="submit"
                              className=" btn-success w-100 btn btn-success fs-13   "
                              onClick={handleSubmit}
                            >
                              Unlock
                            </Button>
                          </div>
                          <div className="mt-2 text-center">
                            <div className="signin-other-title">
                              <h5 className="fs-13  title   custom-href">
                                Not you?{" "}
                                <Link to="/auth/login" className="">
                                  Sign In
                                </Link>
                              </h5>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LockScreen;
