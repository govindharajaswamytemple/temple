
import { useContext } from "react";
import { PermissionsContext } from "./PermissionsProvider";
import { usePermissionsProvider } from "../dataLayer/hooks/usePermissionsProvider";

const usePermissionCheck = (requiredModule, requiredPermission, submenumodule, submenuReqiredPermission) => {
  const { permission } = usePermissionsProvider();
  if (!permission) {
    throw new Error('Permissions context not provided');
  }
  // Implement permission check logic here using permission.permissions
  // This is a placeholder, replace with your actual logic
  const allowed = permission?.permissions.some((item) => {
    // Check module and permission for top-level
    if (!submenumodule && item.module === requiredModule && item[requiredPermission]) {
      
      return true;
    }
    // Check module, submenu, and permission (if submenu provided)
    if (submenumodule && item.module === requiredModule && item.submenus?.some((submenu) => submenu.module === submenumodule && submenu[submenuReqiredPermission])) {
      return true;
    }
    return false;
  });

  console.log(allowed, "dgjfd")

  return allowed;
};

export default usePermissionCheck;




// import { useContext } from "react";
// import { PermissionsContext } from "./PermissionsProvider";
// import { usePermissionsProvider } from "../dataLayer/hooks/usePermissionsProvider";

// const usePermissionCheck=(requiredModule,requiredPermission, )=>{

    

//     const {permission} = usePermissionsProvider();
   
  
   

//     const allowed = permission?.permissions.some(

//     )
//       //permissions


//       console.log(allowed, "dfhkdgf")
//     return allowed
    
// }

// export default usePermissionCheck;



// // if(!Permissions) {
// //   throw new Error('Permissions context not provided');
// // }
//  // const allowed = Permissions.some(permission =>
//     //     permission.module === requiredModule && permission[requiredPermission] === true
//     //   );
