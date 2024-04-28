import { Route, Routes } from 'react-router-dom';
import RefundForm from '../../componentLayer/pages/student/refund/RefundForm';
import RefundData from '../../componentLayer/pages/student/refund/RefundData';
import RefundView from '../../componentLayer/pages/student/refund/RefundView';
import RouteBlocker from '../../rbac/RouteBlocker';
import Error from '../../componentLayer/pages/Error/Error';

function RefundRoutes() {
    return (
        <Routes>
            <Route path='*' element={<Error />} />
            <Route path="/refundform" element={
                <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="refund" submenuReqiredPermission="canCreate">
                    <RefundForm />
                </RouteBlocker>
            } />
            <Route path="/refunddata" element={
                <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="refund" submenuReqiredPermission="canRead">
                    <RefundData />
                </RouteBlocker>
            } />
               <Route path="/refundview" element={
            <RouteBlocker requiredModule="Student Management" requiredPermission="all" submenumodule="refund" submenuReqiredPermission="canRead">
            <RefundView/>
            </RouteBlocker>
            } />
        </Routes>
    );
}

export default RefundRoutes;