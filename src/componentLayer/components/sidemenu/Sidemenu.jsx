import React, { useEffect, useState } from "react";
import "../../../assets/css/Sidemenu.css";
import { Link } from "react-router-dom";
// import Table from "../design/Table";
// import Card from "../design/Card";
// import { Login } from "../../Auth/Login";
// import Forms from "../design/Forms";
// import Page from "../design/Page";
// import Modal from "../design/Modal";
// import Tab from "../design/Tab";
// import Accordian from "../design/Accordian";

// icons start

import { CiSettings } from "react-icons/ci";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { AiOutlineLine } from "react-icons/ai";
import { PiStudentFill } from "react-icons/pi";
import { RiRefund2Line } from "react-icons/ri";
import { MdOutlineInventory } from "react-icons/md";
import { AiOutlineFileAdd } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { TbMessageReport } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import ForgotPassword from "../../pages/auth/ForgotPassword";
import LockScreen from "../../pages/auth/LockScreen";

import ChangePassword from "../../pages/auth/ChangePassword";
import Dashboard from "../../pages/dashboard/Dashboard";
import Teks_Logo from "../../../assets/images/Teks_Logo.svg";
// import TeksSmallLogo from "../../../assets/images/Teks_small_logo.svg";
import TeksSmallLogo from "../../../assets/images/Teks_Shape.svg";
import GateKeeper from "../../../rbac/GateKeeper";

// icons end
const Sidemenu = ({ isExpanded }) => {
  const [active, setActive] = useState("");
  console.log(active, "activeItem");

  const handleActiveClick = (activeItem) => {
    setActive(activeItem);
  };

  return (
    <div className="">
      <main className="bg-white">
        <div className="wrapper">
          <aside
            id="sidebar"
            className={`sidebar ${isExpanded ? "expand" : "close"}`}
          >
            <div className="mt-3">
              <div className="text-center">
                <Link to={"/"}>
                  <img
                    src={isExpanded ? Teks_Logo : TeksSmallLogo}
                    className={
                      isExpanded
                        ? "img-fluid logo_css"
                        : "mini_logo_css open img-fluid"
                    }
                    alt=""
                  />
                </Link>
              </div>
            </div>
            <div className="simplebar-offset">
              <ul className="sidebar-nav simplebar-content-wrapper ">
                {/* Dashboard */}
                <li
                  className="sidebar-item"
                  onClick={() => handleActiveClick("Dashboard")}
                >
                  <Link
                    className={` sidebar-link ${active === "Dashboard" ? `text-white` : ""
                      }`}
                    to="/"
                  >
                    {" "}
                    <LuLayoutDashboard className="main_icon" />
                    <span className="title_show"> Dashboard</span>
                  </Link>
                </li>

                {/* Users */}
                <GateKeeper requiredModule="User Mangement" requiredPermission="all" submenumodule="User Details" submenuReqiredPermission="canRead">
                  <li
                    className="sidebar-item"
                    onClick={() => handleActiveClick("users")}
                  >
                    <Link
                      className={`sidebar-link ${active === "users" ? `text-white` : ""
                        }`}
                      to="/user/list"
                    >
                      <FaRegUserCircle className="main_icon" />
                      <span className="title_show"> Users </span>
                    </Link>
                  </li>
                </GateKeeper>





                {/* Student Management */}

                <GateKeeper requiredModule="Student Management" requiredPermission="all" >
                  <li
                    className="sidebar-item"
                    onClick={() => handleActiveClick("studentmanagement")}
                  >
                    <Link
                      className={` sidebar-link has-dropdown collapsed ${active === "studentmanagement" ? "text-white" : ""
                        }`}
                      data-bs-toggle="collapse"
                      data-bs-target="#student"
                      aria-expanded="false"
                      aria-controls="student"
                    >
                      <PiStudentFill className="main_icon" />
                      <span> Student Management</span>
                    </Link>
                    <ul
                      id="student"
                      className="sidebar-dropdown list-unstyled collapse"
                      data-bs-parent="#sidebar"
                    >
                      {/* <li
                      className={`sidebar-item ${
                        active === "registrationform" ? "text-white" : ""
                      }`}
                    >
                      <Link
                        to={"/student/new"}
                        className="sidebar-link"
                        onClick={() => handleActiveClick("registrationform")}
                      >
                        <AiOutlineLine className="sub_icon" />
                        Registration Form
                      </Link>
                    </li> */}
                      {/* enrolled Students */}
                      <GateKeeper requiredModule="Student Management" submenumodule="Enrolled Students" submenuReqiredPermission="canRead">
                        <li
                          className={`sidebar-item ${active === "enrolledstudents" ? "text-white" : ""
                            }`}
                        >
                          <Link
                            to="/student/list"
                            className="sidebar-link"
                            onClick={() => handleActiveClick("enrolledstudents")}
                          >
                            <AiOutlineLine className="sub_icon" />
                            Enrolled Students
                          </Link>
                        </li>
                      </GateKeeper>


                      {/* fee details */}
                      <GateKeeper requiredModule="Student Management" submenumodule="Fee Details" submenuReqiredPermission="canRead">
                        <li
                          className={`sidebar-item ${active === "feedetails" ? "text-white" : ""
                            }`}
                        >
                          <Link
                            to="/student/feedetailspage"
                            className="sidebar-link"
                            onClick={() => handleActiveClick("feedetails")}
                          >
                            {" "}
                            <AiOutlineLine className="sub_icon" />
                            Fee Details
                          </Link>
                        </li>
                      </GateKeeper>

                      {/* Certificate  */}
                      <GateKeeper requiredModule="Student Management" submenumodule="Certificate" submenuReqiredPermission="canRead">
                        <li
                          className={`sidebar-item ${active === "certificate" ? "text-white" : ""
                            }`}
                        >
                          <Link
                            to="/student/certificate"
                            className="sidebar-link"
                            onClick={() => handleActiveClick("certificate")}
                          >
                            {" "}
                            <AiOutlineLine className="sub_icon" />
                            Certificate
                          </Link>
                        </li>
                      </GateKeeper>


                      {/* Requested Certificate */}
                      <GateKeeper requiredModule="Student Management" submenumodule="Requested Certificate" submenuReqiredPermission="canRead">
                        <li
                          className={`sidebar-item ${active === "requestedcertificate" ? "text-white" : ""
                            }`}
                        >
                          <Link
                            to="/student/requestedcertificate"
                            className="sidebar-link"
                            onClick={() =>
                              handleActiveClick("requestedcertificate")
                            }
                          >
                            {" "}
                            <AiOutlineLine className="sub_icon" />
                            Requested Certificate
                          </Link>
                        </li>
                      </GateKeeper>

                      <GateKeeper requiredModule="Student Management" submenumodule="refund" submenuReqiredPermission="canRead">
                        <li
                          className={`sidebar-item ${active === "refunddata" ? "text-white" : ""
                            }`}
                        >
                          <Link
                            to="/refund/refunddata"
                            className="sidebar-link"
                            onClick={() =>
                              handleActiveClick("refunddata")
                            }
                          >
                            {" "}
                            <AiOutlineLine className="sub_icon" />
                            Refund
                          </Link>
                        </li>
                      </GateKeeper>


                      {/* <li
                        className={`sidebar-item ${active === "refund" ? "text-white" : ""
                          }`}
                      >
                        <Link
                          to=""
                          onClick={() => handleActiveClick("refund")}
                          className="sidebar-link has-dropdown collapsed "
                          data-bs-toggle="collapse"
                          data-bs-target="#refund"
                          aria-expanded="false"
                          aria-controls="refund"
                        >
                          {" "}
                          <RiRefund2Line className="main_icon" />
                          Refund
                        </Link>
                        <ul
                          id="refund"
                          className="sidebar-dropdown_2 list-unstyled collapse"
                        >
                          <li className="sidebar-item">
                            <Link
                              to="/refund/refundform"
                              className={`sidebar-link  ${active === "refundform" ? "text-white" : ""
                                }`}
                              onClick={() => handleActiveClick("refundform")}
                            >
                              {" "}
                              <AiOutlineLine className="sub_icon" />
                              Refund Form
                            </Link>
                          </li>
                          <li
                            className={`sidebar-item ${active === "refunddata" ? "text-white" : ""
                              }`}
                          >
                            <Link
                              to="/refund/refunddata"
                              className="sidebar-link"
                              onClick={() => handleActiveClick("refunddata")}
                            >
                              {" "}
                              <AiOutlineLine className="sub_icon" />
                              Refund Data
                            </Link>
                          </li>
                        </ul>
                     </li> */}

                    </ul>
                  </li>
                </GateKeeper>


                {/* Inventory */}

                <GateKeeper requiredModule="Inventory" requiredPermission="all" >
                <li
                  className="sidebar-item"
                  onClick={() => handleActiveClick("inventory")}
                >
                  <Link
                    className={` sidebar-link has-dropdown collapsed ${active === "inventory" ? "text-white" : ""
                      }`}
                    data-bs-toggle="collapse"
                    data-bs-target="#inventory"
                    aria-expanded="false"
                    aria-controls="inventory"
                  >
                    <MdOutlineInventory className="main_icon" />
                    <span> Inventory</span>
                  </Link>
                  <ul
                    id="inventory"
                    className="sidebar-dropdown list-unstyled collapse"
                    data-bs-parent="#sidebar"
                  >
                    {/* add asserts */}
                    <GateKeeper requiredModule="Inventory" submenumodule="Add Asserts" submenuReqiredPermission="canRead">
                    <li
                      className="sidebar-item"
                      onClick={() => handleActiveClick("addassets")}
                    >
                      <Link
                        to="/inventory/addassets"
                        className={` sidebar-link ${active === "addassets" ? "text-white" : ""
                          }`}
                        onClick={() => handleActiveClick("addassets")}
                      >
                        <AiOutlineLine className="sub_icon" />
                        Add Assets
                      </Link>
                    </li>
                    </GateKeeper>

                    {/* assign asserts */}
                    <GateKeeper requiredModule="Inventory" submenumodule="Assign Asserts" submenuReqiredPermission="canRead">
                    <li
                      className="sidebar-item"
                      onClick={() => handleActiveClick("assignassets")}
                    >
                      <Link
                        to="/inventory/assignassets"
                        className={` sidebar-link ${active === "assignassets" ? "text-white" : ""
                          }`}
                      >
                        <AiOutlineLine className="sub_icon" />
                        Assign Assets
                      </Link>
                    </li>
                    </GateKeeper>
                  </ul>
                </li>
                </GateKeeper>

                {/* Leads */}

                <GateKeeper requiredModule="Leads" requiredPermission="all" >
                <li
                  className="sidebar-item"
                  onClick={() => handleActiveClick("leads")}
                >
                  <Link
                    className={` sidebar-link has-dropdown collapsed ${active === "leads" ? "text-white" : ""
                      }`}
                    data-bs-toggle="collapse"
                    data-bs-target="#leads"
                    aria-expanded="false"
                    aria-controls="leads"
                  >
                    <AiOutlineFileAdd className="main_icon" />
                    <span> Leads</span>
                  </Link>
                  <ul
                    id="leads"
                    className="sidebar-dropdown list-unstyled collapse "
                    data-bs-parent="#sidebar"
                  >
                    {/* website leads */}
                    <GateKeeper requiredModule="Leads" submenumodule="Website Leads" submenuReqiredPermission="canRead">
                    <li
                      className="sidebar-item"
                      onClick={() => handleActiveClick("websiteleads")}
                    >
                      <Link
                        className={` sidebar-link has-dropdown collapsed  ${active === "websiteleads" ? "text-white" : ""
                          }`}
                        data-bs-toggle="collapse"
                        data-bs-target="#websiteleads"
                        aria-expanded="false"
                        aria-controls="websiteleads"
                      >
                        <CgWebsite className="main_icon" />
                        Website Leads
                      </Link>
                      <ul
                        id="websiteleads"
                        className="sidebar-dropdown_2 list-unstyled collapse "
                      >
                        <li
                          className="sidebar-item"
                          onClick={() => handleActiveClick("webinar")}
                        >
                          <Link
                            className={` sidebar-link  ${active === "webinar" ? "text-white" : ""
                              }`}
                            to={"/webinarleads"}
                          >
                            <AiOutlineLine className="sub_icon" />
                            Webinar
                          </Link>
                        </li>
                        <li
                          className="sidebar-item"
                          onClick={() => handleActiveClick("whatsapp")}
                        >
                          <Link
                            className={` sidebar-link ${active === "whatsapp" ? "text-white" : ""
                              }`}
                            to="/whatsappleads"
                            onClick={() => handleActiveClick("whatsapp")}
                          >
                            <AiOutlineLine className="sub_icon" />
                            WhatsApp
                          </Link>
                        </li>
                        <li
                          className="sidebar-item"
                          onClick={() => handleActiveClick("downloadsyllbus")}
                        >
                          <Link
                            className={` sidebar-link ${active === "downloadsyllbus" ? "text-white" : ""
                              }`}
                            to={"/downloadsyllabusleads"}
                          >
                            <AiOutlineLine className="sub_icon" />
                            Download Syllabus
                          </Link>
                        </li>
                        <li
                          className="sidebar-item"
                          onClick={() => handleActiveClick("viewcourse")}
                        >
                          <Link
                            className={` sidebar-link ${active === "viewcourse" ? "text-white" : ""
                              }`}
                            to={"/viewcourseleads"}
                          >
                            <AiOutlineLine className="sub_icon" />
                            View Course
                          </Link>
                        </li>
                        <li
                          className="sidebar-item"
                          onClick={() => handleActiveClick("contactus")}
                        >
                          <Link
                            className={` sidebar-link ${active === "contactus" ? "text-white" : ""
                              }`}
                            to={"/contactusleads"}
                          >
                            <AiOutlineLine className="sub_icon" />
                            Contact Us
                          </Link>
                        </li>
                        <li
                          className="sidebar-item"
                          onClick={() => handleActiveClick("hlpenquireleads")}
                        >
                          <Link
                            className={` sidebar-link ${active === "hlpenquireleads" ? "text-white" : ""
                              }`}
                            to={"/hlpenquireleads"}
                          >
                            <AiOutlineLine className="sub_icon" />
                            Hlp Enquire Leads
                          </Link>
                        </li>
                        <li
                          className="sidebar-item"
                          onClick={() => handleActiveClick("slpenquireleads")}
                        >
                          <Link
                            className={` sidebar-link ${active === "slpenquireleads" ? "text-white" : ""
                              }`}
                            to={"/slpenquireleads"}
                          >
                            <AiOutlineLine className="sub_icon" />
                            Slp Enquire Leads
                          </Link>
                        </li>
                      </ul>
                    </li>
                    </GateKeeper>
                  </ul>
                </li>
                </GateKeeper>


                {/* Reports */}

                <GateKeeper requiredModule="Reports" requiredPermission="all" >
                <li
                  className="sidebar-item"
                  onClick={() => handleActiveClick("reports")}
                >
                  <Link
                    className={` sidebar-link has-dropdown collapsed ${active === "reports" ? "text-white" : ""
                      }`}
                    data-bs-toggle="collapse"
                    data-bs-target="#reports"
                    aria-expanded="false"
                    aria-controls="reports"
                  >
                    {" "}
                    <TbMessageReport className="main_icon" />
                    <span> Reports</span>
                  </Link>
                  <ul
                    id="reports"
                    className="sidebar-dropdown list-unstyled collapse"
                    data-bs-parent="#sidebar"
                  >
                    {/* report data */}
                    <GateKeeper requiredModule="Reports" submenumodule="Report Data" submenuReqiredPermission="canRead">
                    <li
                      className="sidebar-item"
                      onClick={() => handleActiveClick("reportsdata")}
                    >
                      <Link
                        to="/reports/reportsdata"
                        className={` sidebar-link ${active === "reportsdata" ? "text-white" : ""
                          }`}
                      >
                        <AiOutlineLine className="sub_icon" />
                        Reports Data
                      </Link>
                    </li>
                    </GateKeeper>

                  </ul>
                </li>
                </GateKeeper>


                {/* Settings */}


                <GateKeeper requiredModule="Settings" requiredPermission="all" >
                <li
                  className="sidebar-item"
                  onClick={() => handleActiveClick("settings")}
                >
                  <Link
                    to="/settings"
                    className={` sidebar-link ${active === "settings" ? "text-white" : ""
                      }`}
                  >
                    <CiSettings className="main_icon" />
                    <span className="title_show"> Settings</span>
                  </Link>
                </li>
                </GateKeeper>

              </ul>
            </div>
            {/* <div className='sidebar-footer'>
                  <Link className="sidebar-link">
                      <span>logout</span>
                  </Link>
              </div> */}
          </aside>
        </div>
        <div className={`${isExpanded ? "" : ""} flex-grow`}>
          {/* Your main content here */}
        </div>
      </main>
    </div>
  );
};
export default Sidemenu;
