import usePermissionCheck from "./usePermissionCheck";

const GateKeeper=({requiredModule, requiredPermission,submenumodule, submenuReqiredPermission,children })=>{
    
    const allowed = usePermissionCheck(requiredModule, requiredPermission,submenumodule, submenuReqiredPermission)
    console.log(requiredModule,requiredPermission, allowed,"fhdjgfjf")
    return allowed ? children : null;
}

export default GateKeeper;