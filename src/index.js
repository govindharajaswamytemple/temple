import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "./dataLayer/context/themeContext/ThemeContext";
import { ToastContainer } from "react-toastify";

import AuthContextProvider from "./dataLayer/context/authContext/AuthContextProvider";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import RoleContextProvider from "./dataLayer/context/roleContext/RoleContextProvider";
import BranchContextProvider from "./dataLayer/context/branchContext/BranchContextProvider";
import DepartmentContextProvider from "./dataLayer/context/deparmentContext/DepartmentContextProvider";
import CoursePackageContextProvider from "./dataLayer/context/coursePackageContext/CoursePackageContext";
import CourseContextProvider from "./dataLayer/context/courseContext/CourseContextProvider";
import LeadSourceContextProvider from "./dataLayer/context/leadSourceContext/LeadSourceContext";
import UsersContextProvider from "./dataLayer/context/usersContext/UsersContextProvider";
import StudentsContextProvider from "./dataLayer/context/studentsContext/StudContextProvider";
import SingleStudentContextProvider from "./dataLayer/context/singleStudentContext/SingleStudentContext";
import PermissionsProvider from "./rbac/PermissionsProvider";
import { LockScreenProvider } from "./dataLayer/context/lockScreenContext/lockScreenContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <PermissionsProvider>
          <RoleContextProvider>
            <BranchContextProvider>
              <DepartmentContextProvider>
                <CoursePackageContextProvider>
                  <CourseContextProvider>
                    <LeadSourceContextProvider>
                      <UsersContextProvider>
                        <StudentsContextProvider>
                          <SingleStudentContextProvider>
                            <ThemeProvider>
                              <LockScreenProvider>
                                <ToastContainer
                                  position="top-right"
                                  autoClose={1000}
                                  hideProgressBar={false}
                                  newestOnTop={false}
                                  closeOnClick
                                  rtl={false}
                                  pauseOnFocusLoss
                                  draggable
                                  pauseOnHover
                                />
                                <App />
                              </LockScreenProvider>
                            </ThemeProvider>
                          </SingleStudentContextProvider>
                        </StudentsContextProvider>
                      </UsersContextProvider>
                    </LeadSourceContextProvider>
                  </CourseContextProvider>
                </CoursePackageContextProvider>
              </DepartmentContextProvider>
            </BranchContextProvider>
          </RoleContextProvider>
        </PermissionsProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
