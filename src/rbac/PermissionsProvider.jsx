import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "../dataLayer/hooks/useAuthContext";


export const PermissionsContext = createContext();

const PermissionsProvider = ({ children }) => {

  const { AuthState, DispatchAuth,permission } = useAuthContext();


  const InitialPermissions = permission || [];
  const [permissions, setPermissions] = useState({...InitialPermissions});
  console.log(permissions, "djfhkjkdgf")
  
  return (
    <PermissionsContext.Provider
      value={{permission}}
    >
      {children}
    </PermissionsContext.Provider>
  );


}
export default PermissionsProvider;