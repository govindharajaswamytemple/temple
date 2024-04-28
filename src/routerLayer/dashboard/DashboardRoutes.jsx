import { Route, Routes } from "react-router-dom";

import Dashboard from "../../componentLayer/pages/dashboard/Dashboard";

import Sidemenu from "../../componentLayer/components/sidemenu/Sidemenu";
import Webinar from "../../componentLayer/pages/leads/websiteLeads/Webinar";
import ContactUs from "../../componentLayer/pages/leads/websiteLeads/ContactUs";
import WhatsApp from "../../componentLayer/pages/leads/websiteLeads/WhatsApp";
import DownloadSyllabus from "../../componentLayer/pages/leads/websiteLeads/DownloadSyllabus";
import ViewCourse from "../../componentLayer/pages/leads/websiteLeads/ViewCourse";
import HLPEnquireLeads from "../../componentLayer/pages/leads/websiteLeads/HLPEnquireLeads";
import SLPEnquireLeads from "../../componentLayer/pages/leads/websiteLeads/SLPEnquireLeads";
import Error from "../../componentLayer/pages/Error/Error";
function DashboardRoutes() {
  return (
    <Routes>
    
      <Route path="/" element={<Dashboard />} />
      <Route path="/webinarleads" element={<Webinar />} />
      <Route path="/contactusleads" element={<ContactUs />} />
      <Route path="/whatsappleads" element={<WhatsApp />} />
      <Route path="/downloadsyllabusleads" element={<DownloadSyllabus />} />
      <Route path="/viewcourseleads" element={<ViewCourse />} />
      <Route path="/hlpenquireleads" element={<HLPEnquireLeads />} />
      <Route path="/slpenquireleads" element={<SLPEnquireLeads />} />


    </Routes>
  );
}

export default DashboardRoutes;
