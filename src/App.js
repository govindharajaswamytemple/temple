import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardRoutes from "./routerLayer/dashboard/DashboardRoutes";
import AuthRoutes from "./routerLayer/auth/AuthRoutes";
import RequireAuth from "./componentLayer/pages/layout/RequireAuth";
import PublicLayout from "./componentLayer/pages/layout/PublicLayout";
import UserRoutes from "./routerLayer/users/UserRoutes";
import StudentRoutes from "./routerLayer/students/StudentRoutes";
import InventoryRoutes from "./routerLayer/inventory/InventoryRoutes";
import ReportsRoutes from "./routerLayer/reports/ReportsRoutes";
import SettingsRoutes from "./routerLayer/settings/SettingsRoutes";
import RefundRoutes from "./routerLayer/refund/RefundRoutes";
import { useLockScreenContext } from "./dataLayer/context/lockScreenContext/lockScreenContext";
import RouteBlocker from "./rbac/RouteBlocker";
import { useContext } from "react";
import { PermissionsContext } from "./rbac/PermissionsProvider";
import { TbRuler2Off } from "react-icons/tb";
import { usePermissionsProvider } from "./dataLayer/hooks/usePermissionsProvider";
import ErrorRoutes from "./routerLayer/Error/ErrorRoutes";
import Error from "./componentLayer/pages/Error/Error";
import UnauthorisedAccess from "./componentLayer/pages/Error/UnauthorisedAccess";

function App() {
  const { permissions, intialState } = usePermissionsProvider();



  // <RouteBlocker requiredModule="Enrolled Students" requiredPermission="canRead"> </RouteBlocker>

  return (
    <Routes>



      <Route element={<RequireAuth />}>

 

        <Route path="/*" element={<DashboardRoutes />} />

        {/* users */}
        <Route path="/user/*" element={
          <RouteBlocker requiredModule="User Mangement" requiredPermission="all">
            <UserRoutes />
          </RouteBlocker>
        } />
        {/* student */}
        <Route path="/student/*" element={
          <RouteBlocker requiredModule="Student Management" requiredPermission="all">
            <StudentRoutes />
          </RouteBlocker>
        } />

        <Route path="/refund/*" element={<RefundRoutes />} />
        <Route path="/inventory/*" element={<InventoryRoutes />} />
        <Route path="/reports/*" element={<ReportsRoutes />} />


        <Route path="/settings/*" element={
          <RouteBlocker requiredModule="Settings" requiredPermission="all">
            <SettingsRoutes />
          </RouteBlocker>
        } />



      </Route>


      <Route element={<PublicLayout />}>
        <Route path="/error/*" element={<ErrorRoutes />} />
        <Route path='*' element={<Error />} />
        <Route path='/422' element={<UnauthorisedAccess />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
      </Route>



    </Routes>
  );
}

export default App;

// // import React from "react";
// import "./App.css";
// // components
// import { Sidemenu } from "./components/common/sidemenu/Sidemenu";
// import { Routes, Route } from "react-router-dom";
// import ReqireAuth from "./components/Layout/ReqireAuth";
// import PublicAuth from "./components/Layout/PublicAuth";
// import Dashboard from "./components/pages/dashboard/Dashboard";
// import PublicLayout from "./components/Layout/PublicLayout";
// import { Topbar } from "./components/common/topbar/Topbar";
// import React, { useContext, useState } from "react";
// import { ForgotPassword } from "./components/Auth/ForgotPassword";
// import { AllRoutes } from "./router";
// import { ChangePassword } from "./components/Auth/ChangePassword";
// import { LockScreen } from "./components/Auth/LockScreen";
// import Card from "./components/common/design/Card";
// import Table from "./components/common/design/Table";
// import Forms from "./components/common/design/Forms";
// import WhatsappChat from "./components/common/design/WhatsappChat";
// import Accordian from "./components/common/design/Accordian";
// import Tab from "./components/common/design/Tab";
// import Modal from "./components/common/design/Modal";
// import Page from "./components/common/design/Page";
// import Button from "./components/common/design/Button";
// import { useTheme } from "./context/themeContext/ThemeContext";
// import { Login } from "./components/Auth/Login";
// import RegistrationForm from "./components/pages/Student/studentRegistrationForm/RegistrationForm";
// import { SettingsTabs } from "./components/pages/Settings/SettingsTabs";
// import { Roles } from "./components/pages/Settings/Roles/Roles";
// import { CreateRole } from "./components/pages/Settings/Roles/CreateRole";
// import Course from "./components/pages/Settings/courses/Course";
// import CreateCourse from "./components/pages/Settings/courses/CreateCourse";
// import { Branch } from "./components/pages/Settings/branch/Branch";
// import CreateBranch from "./components/pages/Settings/branch/CreateBranch";
// import Department from "./components/pages/Settings/Departments/Department";
// import CreateDepartment from "./components/pages/Settings/Departments/CreateDepartment";
// import CoursePackage from "./components/pages/Settings/coursePackage/CoursePackage";
// import CreateCoursePackage from "./components/pages/Settings/coursePackage/CreateCoursePackage";
// import Studentdata from "./components/pages/Student/studentData/Studentdata";
// import CreateUserForm from "./components/pages/User/CreateUserForm/CreateUserForm";
// import LeadSource from "./components/pages/Settings/leadsource/LeadSource";
// import CreateLeadSource from "./components/pages/Settings/leadsource/CreateLeadSource";
// import CreateAdmissionFee from "./components/pages/Settings/admissionfee/CreateAdmissionFee";
// import AdmissionFee from "./components/pages/Settings/admissionfee/AdmissionFee";
// import AddVendor from "./components/pages/Settings/addvendor/AddVendor";
// import CreateAddVendor from "./components/pages/Settings/addvendor/CreateAddVendor";
// import AddAssetsType from "./components/pages/Settings/addassetstype/AddAssetsType";
// import CreateAddAssetsType from "./components/pages/Settings/addassetstype/CreateAddAssetsType";
// import UserData from "./components/pages/User/UserData/UserData";
// import Certificate from "./components/pages/Student/Certificate/Certificate";
// import RequestedCertificate from "./components/pages/Student/requestedCertificate/RequestedCertificate";
// import IssuedCertificates from "./components/pages/Student/issuedCertificates/IssuedCertificates";

// import StudentDataView from "./components/pages/Student/studentData/StudentDataView";
// import StudentApplicationPrint from "./components/pages/Student/studentData/StudentApplicationPrint";
// import UserView from "./components/pages/User/UserData/UserView";
// import FeeDetailsPage from "./components/pages/Student/fee/FeeDetailsPage";
// import FeeFollowUps from "./components/pages/Student/fee/FeeFollowUps";
// import FeeView from "./components/pages/Student/fee/FeeView";
// import NoDueRecords from "./components/pages/Student/fee/NoDueRecords";
// import Addassets from "./components/pages/Inventory/Addassets";
// import Assignassets from "./components/pages/Inventory/Assignassets";
// import RefundData from "./components/pages/Student/refund/RefundData";
// import RefundForm from "./components/pages/Student/refund/RefundForm";
// import { Webinar } from "./components/pages/Leads/Webinar";
// import { WhatsApp } from "./components/pages/Leads/WhatsApp";
// import { DownloadSyllabus } from "./components/pages/Leads/DownloadSyllabus";
// import { ViewCourse } from "./components/pages/Leads/ViewCourse";
// import { ContactUs } from "./components/pages/Leads/ContactUs";
// import { HLPEnquireLeads } from "./components/pages/Leads/HLPEnquireLeads";
// import { SLPEnquireLeads } from "./components/pages/Leads/SLPEnquireLeads";
// function App() {
//   return (
//     <Routes>
//       <Route element={<ReqireAuth />}>
//       <Route path="/*" element={<DashboardRoutes />} />

//         {/* <Route path="/" element={<Dashboard />} />
//         <Route path="/table" element={<Table />} />
//         <Route path="/card" element={<Card />} />
//         <Route path="/forms" element={<Forms />} />
//         <Route path="/whatsapp" element={<WhatsappChat />} />
//         <Route path="/accordian" element={<Accordian />} />
//         <Route path="/tabs" element={<Tab />} />
//         <Route path="/modal" element={<Modal />} />
//         <Route path="/page" element={<Page />} />
//         <Route path="/button" element={<Button />} />
//         <Route path={"/registrationform"} element={<RegistrationForm />} />
//         <Route path="/settingstabs" element={<SettingsTabs />} />
//         <Route path="/roles" element={<Roles />} />
//         <Route path="/createrole" element={<CreateRole />} />
//         <Route path="/studentdata" element={<Studentdata />} />
//         <Route path="/createuser" element={<CreateUserForm />} />
//         <Route path="/course" element={<Course />} />
//         <Route path="/createcourse" element={<CreateCourse />} />
//         <Route path="/branch" element={<Branch />} />
//         <Route path="/createbranch" element={<CreateBranch />} />
//         <Route path="/department" element={<Department />} />
//         <Route path="/createdepartment" element={<CreateDepartment />} />
//         <Route path="/coursepackage" element={<CoursePackage />} />
//         <Route path="/createcoursepackage" element={<CreateCoursePackage />} />
//         <Route path="/leadsource" element={<LeadSource />} />
//         <Route path="/createleadsource" element={<CreateLeadSource />} />
//         <Route path="/createadmissionfee" element={<CreateAdmissionFee />} />
//         <Route path="/admissionfee" element={<AdmissionFee />} />
//         <Route path="/addvendor" element={<AddVendor />} />
//         <Route path="/createaddvendor" element={<CreateAddVendor />} />
//         <Route path="/addassetstype" element={<AddAssetsType />} />
//         <Route path="/createaddassetstype" element={<CreateAddAssetsType />} />
//         <Route path="/userdata" element={<UserData />} />
//         <Route path="/certificate" element={<Certificate />} />
//         <Route
//           path="/requestedcertificate"
//           element={<RequestedCertificate />}
//         />
//         <Route path="/issuedcertificates" element={<IssuedCertificates />} />
//         <Route path="/updatecourse/:courseId" element={<CreateCourse />} />
//         <Route
//           path="/requestedcertificate"
//           element={<RequestedCertificate />}
//         />
//         <Route path="/issuedcertificates" element={<IssuedCertificates />} />

//         <Route path="/userview/:courseId" element={<UserView />} /> */}

//         {/* <Route path="/updatecourse/:courseId" element={<CreateCourse />} /> */}
//         {/* <Route path="/feedetailspage" element={<FeeDetailsPage />} />
//         <Route path="/feefollowups" element={<FeeFollowUps />} />
//         <Route path="/feeview" element={<FeeView />} />
//         <Route path="/noduerecords" element={<NoDueRecords />} />
//         <Route path="/addassests" element={<Addassets />} />
//         <Route path="/assignassets" element={<Assignassets />} />
//         <Route path="/updatecourse/:courseId" element={<CreateCourse />} />
//         <Route path="/studentdataview" element={<StudentDataView />} />
//         <Route
//           path="/studentapplicationprint"
//           element={<StudentApplicationPrint />}
//         />
//         <Route path="/userview/:courseId" element={<UserView />} /> */}

//         {/* <Route path="/updatecourse/:courseId" element={<CreateCourse />} /> */}
//         {/* <Route path="/feedetailspage" element={<FeeDetailsPage />} />
//         <Route path="/refunddata" element={<RefundData />} />
//         <Route path="/refundform" element={<RefundForm />} /> */}

//         {/* Leads */}
// {/*
//         <Route path="/webinarleads" element={<Webinar />} />
//         <Route path="/whatsappleads" element={<WhatsApp />} />
//         <Route path="/downloadsyllabusleads" element={<DownloadSyllabus />} />
//         <Route path="/viewcourseleads" element={<ViewCourse />} />
//         <Route path="/contactusleads" element={<ContactUs />} />
//         <Route path="/hlpenquireleads" element={<HLPEnquireLeads />} />
//         <Route path="/slpenquireleads" element={<SLPEnquireLeads />} /> */}
//       </Route>

//       <Route element={<PublicLayout />}>
//         {/* <Route path="/login" element={<Login />} />
//         <Route path="/forgotpassword" element={<ForgotPassword />} />
//         <Route path="/changepassword" element={<ChangePassword />} />
//         <Route path="/lockscreen" element={<LockScreen />} /> */}
//       </Route>
//     </Routes>
//   );
// }

// {
//   /*
//   <Routes>
//         <Route element={<ReqireAuth />}>
//           <Route path="/" element={<Dashboard />} />
//         </Route>
//         <Route element={<PublicLayout />}>
//           <Route path="/login" element={<Login />} />
//           <Route path="/forgotpassword" element={<ForgotPassword />} />
//           <Route path="/changepassword" element={<ChangePassword />} />
//           <Route path="/lockscreen" element={<LockScreen />} />
//         </Route>
//       </Routes> */
// }

// export default App;
