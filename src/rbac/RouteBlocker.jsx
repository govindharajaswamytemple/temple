import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuthContext } from "../dataLayer/hooks/useAuthContext";
import usePermissionCheck from "./usePermissionCheck";

import { useContext, useEffect } from "react";
import { PermissionsContext } from "./PermissionsProvider";
import { usePermissionsProvider } from "../dataLayer/hooks/usePermissionsProvider";



const RouteBlocker = ({ requiredModule, requiredPermission,submenumodule, submenuReqiredPermission, children }) => {

    console.log(children, "fgdjfg")
    
    const { AuthState, DispatchAuth } = useAuthContext();
    const {permission } = usePermissionsProvider();
    const navigate= useNavigate();
  
    if(!permission){
        throw new Error('permission context not provided');
    }

    const allowed = usePermissionCheck(requiredModule, requiredPermission, submenumodule, submenuReqiredPermission)
    console.log(allowed, "sfgdfjg")
    return allowed ? children :navigate("/422") ;

}
export default RouteBlocker;