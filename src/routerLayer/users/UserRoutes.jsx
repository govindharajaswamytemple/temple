import React from "react";
import { Route, Routes } from "react-router-dom";

import CreateUserForm from "../../componentLayer/pages/users/CreateUserForm";
import UserData from "../../componentLayer/pages/users/UserData";
import UserView from "../../componentLayer/pages/users/UserView";
import RouteBlocker from "../../rbac/RouteBlocker";
import Error from "../../componentLayer/pages/Error/Error";

const UserRoutes = () => {
  return (
    <Routes>
      <Route path='*' element={<Error />} />
      <Route path="/new" element={
        <RouteBlocker requiredModule="User Mangement" requiredPermission="all" submenumodule="User Details" submenuReqiredPermission="canCreate">
          <CreateUserForm />
        </RouteBlocker>
      } />

      <Route path="/list" element={
        <RouteBlocker requiredModule="User Mangement" requiredPermission="all" submenumodule="User Details" submenuReqiredPermission="canRead">
          <UserData />
        </RouteBlocker>
      } />


      <Route path="/view/:id" element={
        <RouteBlocker requiredModule="User Mangement" requiredPermission="all" submenumodule="User Details" submenuReqiredPermission="canRead">
          <UserView />
        </RouteBlocker>
      } />

      <Route path="/edit/:id" element={
        <RouteBlocker requiredModule="User Mangement" requiredPermission="all" submenumodule="User Details" submenuReqiredPermission="canUpdate">
          <CreateUserForm />
        </RouteBlocker>
      } />
    </Routes>
  );
};

export default UserRoutes;
