import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/Settings.css";
import { FaArrowRight } from "react-icons/fa6";
import { FaGift } from "react-icons/fa";
import Branch from "../../../assets/images/setting_tabs_icons/Branch.svg";

import Roles from "../../../assets/images/setting_tabs_icons/Roles.svg";
import courses from "../../../assets/images/setting_tabs_icons/courses.svg";
import departments from "../../../assets/images/setting_tabs_icons/departments.svg";
import fee from "../../../assets/images/setting_tabs_icons/fee.svg";
import course from "../../../assets/images/setting_tabs_icons/course.svg";
import sources from "../../../assets/images/setting_tabs_icons/sources.svg";
import communications from "../../../assets/images/setting_tabs_icons/communications.svg";
import oraganisation from "../../../assets/images/setting_tabs_icons/oraganisation.svg";
import assests from "../../../assets/images/setting_tabs_icons/assests.svg";
import forms from "../../../assets/images/setting_tabs_icons/forms.svg";
import cc from "../../../assets/images/setting_tabs_icons/cc.svg";
import BackButton from "../../components/backbutton/BackButton";
import GateKeeper from "../../../rbac/GateKeeper";


export const SettingsTabs = () => {
  const settingsData = [
    {
      name: "Roles",
      icon: Roles,
      link: "roles",
    },
    {
      name: "Branch",
      icon: Branch,
      link: "branch",
    },
    {
      name: "Course Package",
      icon: course,
      link: "coursepackage",
    },
    {
      name: "Courses",
      icon: courses,
      link: "courses",
    },
    {
      name: "Admission Fee",
      icon: fee,
      link: "admissionfee",
    },
    {
      name: "Departments",
      icon: departments,
      link: "departments",
    },
    {
      name: "Lead Sources",
      icon: sources,
      link: "leadsource",
    },
    {
      name: "Communication",
      icon: communications,
      link: "communication",
    },
    {
      name: "Add Vendor",
      icon: cc,
      link: "addvendor",
    },
    {
      name: "Add Assets Type",
      icon: assests,
      link: "addassetstype",
    },
    {
      name: "Forms",
      icon: forms,
      link: "forms",
    },
    {
      name: "Organization Profile",
      icon: oraganisation,
      link: "organizationprofile",
    },
  ];

  return (
    <div>
         <BackButton heading=" Settings" content="Back"  />
      <div className="container-fluid">
  
        <div className="row">
          {settingsData.map((setting, index) => {
            return (
              <GateKeeper requiredModule="Settings" submenumodule={setting.name} submenuReqiredPermission="canRead">
              <div key={index} className="col-lg-3 col-sm-6">
                <div className="card card_animate">
                  <Link to={`/settings/${setting?.link}`}>
                    <div className="d-flex p-3 justify-content-between">
                      <div>
                        <span className="fs-16 fw-500">{setting.name}</span>
                        <div className="mt-3 fs-14 lh-100 text_underline black_300">
                          <p classname="black_300">
                            Explore <FaArrowRight className="black_300" />
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="avatar-md me-3">
                          <span className="avatar-title bg-danger-subtle rounded-circle fs-1">
                            <img
                              src={setting.icon}
                              className="img-fluid"
                              width="100px"
                              height="100px"
                              alt=""
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
             </GateKeeper>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SettingsTabs;
