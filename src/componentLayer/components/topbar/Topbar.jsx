import React, { useContext, useEffect, useRef, useState } from "react";
import { MdFullscreen } from "react-icons/md";
import { IoMdNotificationsOutline, IoIosSettings } from "react-icons/io";
import { CgMenuLeft } from "react-icons/cg";
import {
  MdOutlineDarkMode,
  MdOutlineLightMode,
  MdOutlinePassword,
  MdOutlineFullscreenExit,
} from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import { HiUserCircle, HiOutlineLogout } from "react-icons/hi";
import { FaLock } from "react-icons/fa";
import "../../../assets/css/Topbar.css";
import { Link } from "react-router-dom";

import { AuthContext } from "../../../dataLayer/context/authContext/AuthContextProvider";
import { CiMenuFries } from "react-icons/ci";
import { FiLock } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

import { useTheme } from "../../../dataLayer/context/themeContext/ThemeContext";
import { useAuthContext } from "../../../dataLayer/hooks/useAuthContext";
import Button from "../button/Button";

// export const Topbar = ({ setOpen, open }) => {

const Topbar = ({ isExpanded, toggleSidebar }) => {
  const { userLogout, LockTheScreen } = useContext(AuthContext);
  const { setDarkMode, theme } = useTheme();

  const { AuthState } = useAuthContext();
  console.log(AuthState.user.fullname, "AuthStatehere");

  const [userData, setUserData] = useState(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    return data || "";
  });

  let id = userData?.user?.id;

  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [largeScreen, setLargeScreen] = useState(false);
  const dropdownHandler = () => {
    setIsDropdownActive((dropdown) => !dropdown);
  };

  const [userDetail, setUserDetail] = useState({
    fullname: "",
    profile: "",
  });

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen(); // Make current window go fullscreen
      setLargeScreen((prev) => !prev);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen(); // Exit fullscreen
        setLargeScreen((prev) => !prev);
      }
    }
  };

  const fullName = "John Doe";
  const firstName = fullName.split(" ")[0];

  // useEffect(() => {
  //   if (AuthState.user.fullname) {
  //     setUserDetail({ fullname: AuthState.user.fullname.substring(0,5), profile: AuthState.user.profile.substring(0,5) })
  //   }
  // }, [AuthState?.user?.fullname])

  return (
    <div className="topbar w-full">
      <nav
        className={`navbar-header border-bottom border-1 ${
          isExpanded ? "navbar-header-min" : "navbar-header-max"
        } `}
      >
        <div className="d-flex justify-content-between py-2">
          {/* Left */}
          <div>
            <div>
              {/* <button id="toggle-btn" type="button" onClick={toggleSidebar}>
                <CiMenuFries className="navbar_icons" />
              </button> */}
              <span onClick={toggleSidebar}>
                <CiMenuFries className="navbar_icons text-mute  fw-500" />
              </span>
            </div>
          </div>
          {/* Right */}
          <div className="">
            <div className="d-flex gap-2 align-items-center">
              <div className="nav-item">
                {largeScreen ? (
                  <MdOutlineFullscreenExit
                    className="navbar_icons"
                    onClick={toggleFullScreen}
                    title="Exit Full Screen"
                  />
                ) : (
                  <MdFullscreen
                    className="navbar_icons"
                    onClick={toggleFullScreen}
                    title="Enter Full Screen"
                  />
                )}
              </div>
              <div className="nav-item" onClick={setDarkMode}>
                {theme === "light" ? (
                  <MdOutlineDarkMode
                    className="navbar_icons"
                    title="Dark Mode"
                  />
                ) : (
                  <MdOutlineLightMode
                    className="navbar_icons"
                    title="Light Mode"
                  />
                )}
              </div>
              {/* <div className="nav-item">
                <IoMdNotificationsOutline className="navbar_icons" />
              </div> */}
              <div className="topbar_profile w-100 ">
                <div
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  className="d-flex align-items-center gap-2"
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                    className="avatar img-fluid "
                    alt="User Avatar"
                  />
                  <div className="fs-13  text_color  " title={firstName}>
                    {firstName}
                    <p className="fs-13 text_color m-0 ">Admin</p>
                  </div>
                </div>
                <ul className="dropdown-menu bg_white ">
                  <li>
                    <Link
                      className={
                        theme === "dark"
                          ? "dropdown-item dropdown-item-dark"
                          : "dropdown-item"
                      }
                      to={`/user/view/${id}`}
                    >
                      <span className="fs-13 text_color d-flex gap-2 align-items-center">
                        <CgProfile className="fs-13 text_color" />
                        Profile
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={
                        theme === "dark"
                          ? "dropdown-item dropdown-item-dark"
                          : "dropdown-item"
                      }
                      to={"/auth/changepassword"}
                    >
                      <span className="fs-13 text_color d-flex gap-2 align-items-center">
                        <MdOutlinePassword className="fs-13 text_color" />
                        Change Password
                      </span>
                    </Link>
                  </li>
                  <li onClick={LockTheScreen}>
                    <Link
                      className={
                        theme === "dark"
                          ? "dropdown-item dropdown-item-dark"
                          : "dropdown-item"
                      }
                    >
                      <span className="fs-13 text_color d-flex gap-2 align-items-center">
                        <FiLock className="fs-13 text_color" /> Lock Screen
                      </span>
                    </Link>
                  </li>
                  <li onClick={userLogout}>
                    <Link
                      className={
                        theme === "dark"
                          ? "dropdown-item dropdown-item-dark"
                          : "dropdown-item"
                      }
                    >
                      <span className="fs-13 text_color d-flex gap-2 align-items-center">
                        <HiOutlineLogout className="fs-13 text_color" /> Logout
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Topbar;
