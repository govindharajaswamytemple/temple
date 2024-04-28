import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import PanelLayout from "./PanelLayout";
import { useAuthContext } from "../../../dataLayer/hooks/useAuthContext";

const RequireAuth = () => {
  const { AuthState } = useAuthContext();
  const location = useLocation();
  const isAuthenticated = AuthState.token && AuthState.password;

  if (!isAuthenticated) {
    return (
      <Navigate
        to={AuthState.token ? "/auth/lockscreen" : "/auth/login"}
        state={{ from: location }}
        replace
      />
    );
  }

  return (
    <div className="app">
      <PanelLayout>
        <Outlet />
      </PanelLayout>
    </div>
  );
};

export default RequireAuth;
