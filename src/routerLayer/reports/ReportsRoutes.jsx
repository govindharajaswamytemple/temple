import { Route, Routes } from 'react-router-dom';
import ReportsData from "../../componentLayer/pages/reports/ReportsData"
import CreateReport from '../../componentLayer/pages/reports/CreateReport';
import ReportsView from '../../componentLayer/pages/reports/ReportsView';
import Error from '../../componentLayer/pages/Error/Error';

function ReportsRoutes() {
    return (
        <Routes>
             <Route path='*' element={<Error />} />
            <Route path="/reportsdata" element={<ReportsData />} />
            <Route path="/createreport" element={<CreateReport />} />
            <Route path="/reportview/:id" element={<ReportsView/>}/>
    
        </Routes>
    );
}

export default ReportsRoutes;