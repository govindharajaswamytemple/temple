import React from "react";
import OrganizationProfile from "../../componentLayer/pages/settings/organizationProfile/OrganizationProfile";
import { Route, Routes } from "react-router-dom";
import SettingsTabs from "../../componentLayer/pages/settings/SettingsTabs";
import AddAssetsType from "../../componentLayer/pages/settings/addassetstype/AddAssetsType";
import AddVendor from "../../componentLayer/pages/settings/addvendor/AddVendor";

import AdmissionFee from "../../componentLayer/pages/settings/admissionfee/AdmissionFee";
import Branch from "../../componentLayer/pages/settings/branch/Branch";

import { Communication } from "../../componentLayer/pages/settings/communication/Communication";
import CoursePackage from "../../componentLayer/pages/settings/coursePackage/CoursePackage";
import Course from "../../componentLayer/pages/settings/courses/Course";
import Departments from "../../componentLayer/pages/settings/departments/Department";
import Roles from "../../componentLayer/pages/settings/roles/Roles";
import LeadSource from "../../componentLayer/pages/settings/leadsource/LeadSource";
import Forms from "../../componentLayer/pages/settings/forms/Forms";

import { CreateRole } from "../../componentLayer/pages/settings/roles/CreateRole";
import CreateBranch from "../../componentLayer/pages/settings/branch/CreateBranch";

import CreateLeadSource from "../../componentLayer/pages/settings/leadsource/CreateLeadSource";
import CreateCoursePackage from "../../componentLayer/pages/settings/coursePackage/CreateCoursePackage";
import CreateCourse from "../../componentLayer/pages/settings/courses/CreateCourse";
import CreateAdmissionFee from "../../componentLayer/pages/settings/admissionfee/CreateAdmissionFee";
import CreateDepartment from "../../componentLayer/pages/settings/departments/CreateDepartment";
import CreateAddVendor from "../../componentLayer/pages/settings/addvendor/CreateAddVendor";
import CreateAddAssetsType from "../../componentLayer/pages/settings/addassetstype/CreateAddAssetsType";
import CustomUserForm from "../../componentLayer/pages/settings/forms/CustomUserForm";
import CustomStudentForm from "../../componentLayer/pages/settings/forms/CustomStudentForm";
import WhatsappTab from "../../componentLayer/pages/settings/communication/WhatsappTab";
import EmailTab from "../../componentLayer/pages/settings/communication/EmailTab";
import RouteBlocker from "../../rbac/RouteBlocker";
import Error from "../../componentLayer/pages/Error/Error";

function SettingsRoutes() {
  return (
    <Routes>
      <Route path="" element={<SettingsTabs />} />

      <Route path='*' element={<Error />} />
      {/* role */}
      <Route path="/roles/new" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Roles" submenuReqiredPermission="canCreate">
          <CreateRole />
        </RouteBlocker>
      } />
      <Route path="/roles" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Roles" submenuReqiredPermission="canRead">
          <Roles />
        </RouteBlocker>
      } />
      <Route path="/roles/edit/:id" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Roles" submenuReqiredPermission="canUpdate">
          <CreateRole />
        </RouteBlocker>
      } />


      {/* branch */}
      <Route path="/branch" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Branch" submenuReqiredPermission="canRead">
          <Branch />
        </RouteBlocker>
      } />
      <Route path="/branch/new" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Branch" submenuReqiredPermission="canCreate">
          <CreateBranch />
        </RouteBlocker>
      } />
      <Route path="/branch/edit/:id" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Branch" submenuReqiredPermission="canUpdate">
          <CreateBranch />
        </RouteBlocker>
      } />

      {/* coursePackage */}
      <Route path="/coursePackage" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Course Package" submenuReqiredPermission="canRead">
          <CoursePackage />
        </RouteBlocker>
      } />
      <Route path="/coursePackage/new" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Course Package" submenuReqiredPermission="canCreate">
          <CreateCoursePackage />
        </RouteBlocker>
      } />
      <Route path="/coursePackage/edit/:id" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Course Package" submenuReqiredPermission="canUpdate">
          <CreateCoursePackage />
        </RouteBlocker>
      } />


      {/* courses */}
      <Route path="/courses" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Courses" submenuReqiredPermission="canRead">
          <Course />
        </RouteBlocker>
      } />
      <Route path="/courses/new" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Courses" submenuReqiredPermission="canCreate">
          <CreateCourse />
        </RouteBlocker>
      } />
      <Route path="/courses/edit/:id" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Courses" submenuReqiredPermission="canUpdate">
          <CreateCourse />
        </RouteBlocker>
      } />

      {/* admission fee */}

      <Route path="/admissionfee" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Admission Fee" submenuReqiredPermission="canRead">
          <AdmissionFee />
        </RouteBlocker>
      } />


      {/* department */}
      <Route path="/departments" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Departments" submenuReqiredPermission="canRead">
          <Departments />
        </RouteBlocker>
      } />
      <Route path="/departments/new" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Departments" submenuReqiredPermission="canCreate">
          <CreateDepartment />
        </RouteBlocker>
      } />
      <Route path="/departments/edit/:id" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Departments" submenuReqiredPermission="canUpdate">
        </RouteBlocker>
      } />


      {/* leadsource */}

      <Route path="/leadsource" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Lead Sources" submenuReqiredPermission="canRead">
          <LeadSource />
        </RouteBlocker>
      } />
      <Route path="/lead/new" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Lead Sources" submenuReqiredPermission="canCreate">
          <CreateLeadSource />
        </RouteBlocker>
      } />
      <Route path="/lead/edit/:id" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Lead Sources" submenuReqiredPermission="canUpdate">
        </RouteBlocker>
      } />


      {/* communication */}
      <Route path="/communication" element={
        <RouteBlocker requiredModule="Settings" requiredPermission="all" submenumodule="Communication" submenuReqiredPermission="canUpdate">
          <Communication />
        </RouteBlocker>
      } />



      <Route path="/addvendor" element={<AddVendor />} />
      <Route path="/organizationprofile" element={<OrganizationProfile />} />
      <Route path="/addassetstype" element={<AddAssetsType />} />
      <Route path="/forms" element={<Forms />} />
      <Route path="/admissionfee/new" element={<CreateAdmissionFee />} />
      {/* Add id here for editing purpose */}
      <Route path="/admissionfee/edit/" element={<CreateAdmissionFee />} />
      <Route path="/addvendor/new" element={<CreateAddVendor />} />
      {/* Add id here for editing purpose */}
      <Route path="/addvendor/edit/" element={<CreateAddVendor />} />
      <Route path="/addassetstype/new" element={<CreateAddAssetsType />} />
      {/* Add id here for editing purpose */}
      <Route path="/addassetstype/edit/" element={<CreateAddAssetsType />} />
      {/* Form Routing*/}
      <Route path="/form/customuserform/" element={<CustomUserForm />} />
      <Route path="/form/customstudentform/" element={<CustomStudentForm />} />
      {/* communication Routing*/}
      <Route path="/communication/whatsapptab/" element={<WhatsappTab />} />
      <Route path="/communication/emailtab/" element={<EmailTab />} />
    </Routes>
  );
}

export default SettingsRoutes;
