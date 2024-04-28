import React, { useContext, useEffect, useState } from "react";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Loginvalidation from "./LoginValidation";

import { AuthContext } from "../../../dataLayer/context/authContext/AuthContextProvider";
import { Link, useParams } from "react-router-dom";
import Teks_Logo from "../../../assets/images/Teks_Logo.svg";
import "../../../assets/css/Login.css";

const ChangePassword = () => {
  const { AuthState, ChangePasswordfun } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState();
  const [showOldPassword, setShowOldPassword] = useState();
  const [showRePassword, setShowRePassword] = useState();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleShowOldPassword = () => {
    setShowOldPassword((prev) => !prev);
  };

  const toggleShowRePassword = () => {
    setShowRePassword((prev) => !prev);
  };

  const [values, setValues] = useState({
    oldpassword: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({
    oldPassword: "",
    password: "",
    confirmpassword: "",
  });

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  useEffect(() => {
    if (values.oldpassword) {
      setErrors((prev) => ({
        ...prev,
        oldPassword: "",
      }));
    }
    if (values.password) {
      setErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }
    if (values.confirmpassword) {
      setErrors((prev) => ({
        ...prev,
        confirmpassword: "",
      }));
    }
  }, [values.oldpassword, values.password, values.confirmpassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.oldpassword) {
      setErrors((prev) => ({
        ...prev,
        oldPassword: "Old Password is required",
      }));
      return;
    } else if (values.oldpassword.length < 6) {
      setErrors((prev) => ({
        ...prev,
        oldPassword: "Password should be at least 6 characters",
      }));
      return;
    }
    if (!values.password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    } else if (values.password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password should be at least 6 characters",
      }));
      return;
    } else if (!/(?=.*[A-Z])/.test(values.password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password should contain at least one uppercase letter",
      }));
      return;
    } else if (!/(?=.*[a-z])/.test(values.password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password should contain at least one lowercase letter",
      }));
      return;
    } else if (!/(?=.*\d)/.test(values.password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password should contain at least one number",
      }));
      return;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password should contain at least one special character",
      }));
      return;
    }
    if (!values.confirmpassword) {
      setErrors((prev) => ({
        ...prev,
        confirmpassword: "Confirm password is required",
      }));
      return;
    } else if (values.password !== values.confirmpassword) {
      setErrors((prev) => ({
        ...prev,
        confirmpassword: "Password must match",
      }));
    }

    if (values.password === values.confirmpassword) {
      // here the add the user id ..
      //giving fake id

      const id = null;
      const password = values.password;
      const updatedpassword = { password };
      ChangePasswordfun(id, updatedpassword);
    }
  };

  return (
    <div>
      <div className="login_bg_image vh-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mt-3">
              <div className="text-center mt-sm-5 mb-1 text-white-50 ">
                <div>
                  <a className="d-inline-block auth-logo">
                    <img src={Teks_Logo} alt="Login page logo" height="40" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-content-center row mt-1">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className=" card">
                <div className="p-4 card-body">
                  <div className="text-center">
                    <h5 className="login_welcome_text">Create new password!</h5>
                    <p className=" login_welcome_description">
                      Your new password must be different from previous used
                      password.
                    </p>
                  </div>
                  <div className="p-2 mt-2">
                    <form action="#" className="text-start">
                      <div className="mb-2">
                        <label htmlFor="oldPassword" className="  fs-13 fw-500">
                          Old Password<span className="text-danger">*</span>
                        </label>
                        <div className="position-relative auth-pass-inputgroup">
                          <input
                            name="oldpassword"
                            id="oldPassword"
                            placeholder="Enter Old Password"
                            type={showOldPassword ? "text" : "password"}
                            className={
                              errors && errors.oldPassword
                                ? "form-control fs-s bg-form text_color input_bg_color error-input"
                                : "form-control fs-s bg-form text_color input_bg_color"
                            }
                            onChange={handleInput}
                          />
                          <div style={{ height: "10px" }}>
                            {errors.oldPassword && (
                              <span className="text-danger text-start fs-xs">
                                {errors.oldPassword}
                              </span>
                            )}
                          </div>
                          <button
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-mute"
                            type="button"
                            id="password-addon"
                          >
                            {showOldPassword ? (
                              <FaRegEye
                                onClick={toggleShowOldPassword}
                                className="black_color"
                              />
                            ) : (
                              <FaRegEyeSlash
                                onClick={toggleShowOldPassword}
                                className="black_color"
                              />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="mb-2">
                        <label htmlFor="newPassword" className="  fs-13 fw-500">
                          New Password<span className="text-danger">*</span>
                        </label>
                        <div className="position-relative auth-pass-inputgroup">
                          <input
                            name="password"
                            id="newPassword"
                            placeholder="Enter New Password"
                            // type={showPassword ? "password" : "text"}
                            type={showPassword ? "text" : "password"}
                            className={
                              errors && errors.password
                                ? "form-control fs-s bg-form text_color input_bg_color error-input"
                                : "form-control fs-s bg-form text_color input_bg_color"
                            }
                            aria-invalid=""
                            onChange={handleInput}
                          />
                          <div style={{ height: "10px" }}>
                            {errors.password && (
                              <span className="text-danger text-start fs-xs">
                                {errors.password}
                              </span>
                            )}
                          </div>
                          <button
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-mute"
                            type="button"
                            id="password-addon"
                          >
                            {showPassword ? (
                              <FaRegEye
                                onClick={toggleShowPassword}
                                className="black_color"
                              />
                            ) : (
                              <FaRegEyeSlash
                                onClick={toggleShowPassword}
                                className="black_color"
                              />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="mb-2">
                        <label
                          htmlFor="confirmpassword"
                          className="fs-13 fw-500"
                        >
                          Confirm Password<span className="text-danger">*</span>
                        </label>
                        <div className="position-relative auth-pass-inputgroup">
                          <input
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            type={showRePassword ? "text" : "password"}
                            className={
                              errors && errors.confirmpassword
                                ? "form-control fs-s bg-form text_color input_bg_color error-input"
                                : "form-control fs-s bg-form text_color input_bg_color"
                            }
                            aria-invalid={""}
                            onChange={handleInput}
                          />
                          <div style={{ height: "10px" }}>
                            {errors.confirmpassword && (
                              <span className="text-danger text-start fs-xs">
                                {errors.confirmpassword}
                              </span>
                            )}
                          </div>
                          <button
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-mute"
                            type="button"
                            id="password-addon"
                          >
                            {showRePassword ? (
                              <FaRegEye
                                onClick={toggleShowRePassword}
                                className="black_color"
                              />
                            ) : (
                              <FaRegEyeSlash
                                onClick={toggleShowRePassword}
                                className="black_color"
                              />
                            )}
                          </button>
                        </div>
                      </div>
                      <div className="d-flex flex-column gap-1">
                        <span className="fs-s">Password must contain:</span>
                        <span className="font-size-xxs">
                          - More than or equal to 6 characters
                        </span>
                        <span className="font-size-xxs">
                          - 1 Uppercase and lowercase characters
                        </span>
                        <span className="font-size-xxs">
                          - A special character
                        </span>
                      </div>

                      <div className="mt-4">
                        <button
                          type="submit"
                          className="btn btn-success w-100 btn btn-success font-size-s font-weight-500"
                          onClick={handleSubmit}
                        >
                          Reset Password
                        </button>
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
  );
};

export default ChangePassword;
