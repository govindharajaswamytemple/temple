import React from "react";
import { Route, Routes } from "react-router-dom";
import RegistrationForm from "../../componentLayer/pages/student/studentRegistrationForm/RegistrationForm";
import Studentdata from "../../componentLayer/pages/student/enrolledStudentsData/Studentdata";
import StudentDataView from "../../componentLayer/pages/student/enrolledStudentsData/StudentDataView";
import Certificate from "../../componentLayer/pages/student/certificate/Certificate";
import RequestedCertificate from "../../componentLayer/pages/student/requestedCertificate/RequestedCertificate";
import IssuedCertificates from "../../componentLayer/pages/student/issuedCertificates/IssuedCertificates";
import StudentApplicationPrint from "../../componentLayer/pages/student/enrolledStudentsData/StudentApplicationPrint";
import FeeDetailsPage from "../../componentLayer/pages/student/feeDetails/FeeDetailsPage";
import FeeFollowUps from "../../componentLayer/pages/student/feeDetails/FeeFollowUps";
import FeeView from "../../componentLayer/pages/student/feeDetails/FeeView";
import NoDueRecords from "../../componentLayer/pages/student/feeDetails/NoDueRecords";
import FeeAdminInvoice from "../../componentLayer/pages/student/feeDetails/FeeAdminInvoice";

import RefundData from "../../componentLayer/pages/student/refund/RefundData";
import RefundForm from "../../componentLayer/pages/student/refund/RefundForm";
import StudentIdCard from "../../componentLayer/pages/student/enrolledStudentsData/StudentIdCard";
import EditStudent from "../../componentLayer/pages/student/enrolledStudentsData/EditStudent";
import CertificatePrint from "../../componentLayer/pages/student/certificate/CertificatePrint";
import RouteBlocker from "../../rbac/RouteBlocker";
import Error from "../../componentLayer/pages/Error/Error";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<Error />} />
      <Route path="/new" element={
        <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="Enrolled Students" submenuReqiredPermission="canCreate">
          <RegistrationForm />
        </RouteBlocker>
      } />

      <Route path="/list" element={
        <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="Enrolled Students" submenuReqiredPermission="canRead">
          <Studentdata />
        </RouteBlocker>
      } />


      <Route path="/view/:id" element={
        <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="Enrolled Students" submenuReqiredPermission="canRead">
          <StudentDataView />
        </RouteBlocker>
      } />

      <Route path="/applicationprint/:id" element={
        <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="Enrolled Students" submenuReqiredPermission="canRead">
          <StudentApplicationPrint />
        </RouteBlocker>
      } />


      <Route path="/studentidcard/:id" element={
        <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="Enrolled Students" submenuReqiredPermission="canRead">
          <StudentIdCard />
        </RouteBlocker>
      } />


      <Route path="/feeview/:id" element={
        <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="Fee Details" submenuReqiredPermission="canUpdate">
          <FeeView />
        </RouteBlocker>
      } />

      <Route path="/editstudent/:id" element={
        <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="Enrolled Students" submenuReqiredPermission="canUpdate">
          <EditStudent />
        </RouteBlocker>
      } />

      <Route path="/certificate" element={
        <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="Certificate" submenuReqiredPermission="canRead">
          <Certificate />
        </RouteBlocker>
      } />

      <Route path="/requestedcertificate" element={
        <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="Requested Certificate" submenuReqiredPermission="canRead">
          <RequestedCertificate />
        </RouteBlocker>

      } />
      <Route path="/issuedcertificates" element={
        <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="Issued Certificate" submenuReqiredPermission="canRead">
          <IssuedCertificates />
        </RouteBlocker>

      } />

      <Route path="/feedetailspage" element={
        <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="Fee Details" submenuReqiredPermission="canRead">
          <FeeDetailsPage />
        </RouteBlocker>
      } />
      <Route path="/feefollowups" element={
        <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="Fee Details" submenuReqiredPermission="canRead">
          <FeeFollowUps />
        </RouteBlocker>
      } />

      <Route path="/noduerecords" element={<NoDueRecords />} />


      <Route path="/refunddata" element={
        <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="refund" submenuReqiredPermission="canRead">
          <RefundData />
        </RouteBlocker>
      } />
      <Route path="/refundform" element={
        <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="refund" submenuReqiredPermission="canCreate">
          <RefundForm />
        </RouteBlocker>} />


      <Route path="/invoice/:id/:index/:name/:nametype" element={
        <FeeAdminInvoice />
      } />

      <Route path="/certificateprint/:id" element={
        <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="Certificate" submenuReqiredPermission="canRead">
          <CertificatePrint />
        </RouteBlocker>
      } />
    </Routes>
  );
};

export default StudentRoutes;
