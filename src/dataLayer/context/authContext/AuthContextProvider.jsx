import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import AuthReducer from "./AuthReducer"
import { Navigate, redirect, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {

  const navigate = useNavigate();


  const localStrogeData = JSON.parse(localStorage.getItem("data"))
  const localStrogeData1 = JSON.parse(localStorage.getItem("password"));

  const InitialState = {
    user: localStrogeData?.user || {},
    token: localStrogeData?.token || "",
    role: localStrogeData?.role || [],
    password: localStrogeData1?.password || "",
  }

  const [AuthState, DispatchAuth] = useReducer(AuthReducer, InitialState)
  console.log(AuthState, "AthuState99")

  // const [getPermissions, settheGetPermissions] = useState(
  //   [
  //     {
  //       module: 'User Details',
  //       all: true,
  //       canCreate: true,
  //       canRead: true,
  //       canUpdate: true,
  //       canDelete: true,
  //     },
  //     {
  //       module: 'Enrolled Students',
  //       all: true,
  //       canCreate: true,
  //       canRead: true,
  //       canUpdate: true,
  //       canDelete: true,
  //     },
  //     {
  //       module: 'Fee Details',
  //       all: true,
  //       canCreate: true,
  //       canRead: true,
  //       canUpdate: true,
  //       canDelete: true,
  //     },

  //     {
  //       module: 'Certificate',
  //       all: true,
  //       canCreate: true,
  //       canRead: true,
  //       canUpdate: true,
  //       canDelete: true,
  //     },
  //     {
  //       module: 'Requested Certificate',
  //       all: true,
  //       canCreate: true,
  //       canRead: true,
  //       canUpdate: true,
  //       canDelete: true,
  //     },
  //     {
  //       module: 'Issued Certificate',
  //       all: true,
  //       canCreate: true,
  //       canRead: true,
  //       canUpdate: true,
  //       canDelete: true,
  //     },
  //     {
  //       module: 'refund',
  //       all: false,
  //       canCreate: true,
  //       canRead: true,
  //       canUpdate: false,
  //       canDelete: false,
  //     },
  //     {
  //       module: 'Add Asserts',
  //       all: false,
  //       canCreate: false,
  //       canRead: true,
  //       canUpdate: false,
  //       canDelete: false,
  //     },
  //     {
  //       module: 'Assign Asserts',
  //       all: false,
  //       canCreate: false,
  //       canRead: true,
  //       canUpdate: false,
  //       canDelete: false,
  //     },
  //     {
  //       module: 'Website Leads',
  //       all: false,
  //       canCreate: false,
  //       canRead: true,
  //       canUpdate: false,
  //       canDelete: false,
  //     },
  //     {
  //       module: 'Report Data',
  //       all: false,
  //       canCreate: true,
  //       canRead: true,
  //       canUpdate: true,
  //       canDelete: true,
  //     },
  //     {
  //       module: 'Roles',
  //       all: false,
  //       canCreate: true,
  //       canRead: true,
  //       canUpdate: true,
  //       canDelete: true,
  //     },
  //     {
  //       module: 'Branch',
  //       all: false,
  //       canCreate: false,
  //       canRead: true,
  //       canUpdate: false,
  //       canDelete: false,
  //     },
  //     {
  //       module: 'Course Package',
  //       all: false,
  //       canCreate: false,
  //       canRead: true,
  //       canUpdate: false,
  //       canDelete: false,
  //     },
  //     {
  //       module: 'Courses',
  //       all: false,
  //       canCreate: false,
  //       canRead: true,
  //       canUpdate: false,
  //       canDelete: false,
  //     },
  //     {
  //       module: 'Admission Fee',
  //       all: false,
  //       canCreate: false,
  //       canRead: true,
  //       canUpdate: false,
  //       canDelete: false,
  //     }, {
  //       module: 'Departments',
  //       all: false,
  //       canCreate: false,
  //       canRead: true,
  //       canUpdate: false,
  //       canDelete: false,
  //     },
  //     {
  //       module: 'Lead Sources',
  //       all: false,
  //       canCreate: false,
  //       canRead: true,
  //       canUpdate: false,
  //       canDelete: false,
  //     },
  //     {
  //       module: 'Communication',
  //       all: false,
  //       canCreate: false,
  //       canRead: true,
  //       canUpdate: false,
  //       canDelete: false,
  //     },
  //     {
  //       module: 'Add Vendor',
  //       all: false,
  //       canCreate: false,
  //       canRead: true,
  //       canUpdate: false,
  //       canDelete: false,
  //     },
  //     {
  //       module: 'Add Assets Type',
  //       all: false,
  //       canCreate: false,
  //       canRead: true,
  //       canUpdate: false,
  //       canDelete: false,
  //     },
  //     {
  //       module: 'Forms',
  //       all: false,
  //       canCreate: false,
  //       canRead: true,
  //       canUpdate: false,
  //       canDelete: false,
  //     },
  //     {
  //       module: 'Organization Profile',
  //       all: false,
  //       canCreate: false,
  //       canRead: true,
  //       canUpdate: false,
  //       canDelete: false,
  //     },

  //   ]);



  // permissions setting in chlid postions
  const updatePermissions = () => {
    if (AuthState?.role && permission && permission.permissions) {
      const updatedPermissions = permission.permissions.map((perm) => {
        const updatedSubmenus = perm.submenus.map((submenu) => {
          if (AuthState?.role?.length > 0) {
            const matchingGetSubmenu = AuthState?.role?.find((getPerm) => getPerm.module === submenu.module);
            if (matchingGetSubmenu) {
              // Update the submenu object if there's a match in getPermissions
              return {
                ...submenu,
                ...matchingGetSubmenu,
              };
            }
          }
          return submenu; // Return the original submenu if no match found
        });

        // Check if any submenu item has any key pair value set to true
        const anyTrue = updatedSubmenus.some((sub) => Object.values(sub).some((value) => value === true));

        // Update the permissions.all value to true if any submenu item has any key pair value set to true
        const updatedPerm = {
          ...perm,
          submenus: updatedSubmenus,
          all: anyTrue, // Set permissions.all to true if any submenu item has any key pair value set to true
        };

        return updatedPerm;
      });

      setPermissions({
        ...permission,
        permissions: updatedPermissions,
        role: AuthState.role?.name,
        description: AuthState?.role?.description,
      });
      console.log(updatedPermissions, "Updatedpermission");
    } else {
      console.error("getPermissions or permission.permissions is undefined or null.");
    }
  };

  useEffect(() => {
    updatePermissions();
  }, [AuthState?.role,AuthState ])


  // const updatePermissions = () => {
  //   if (getPermissions && permission && permission.permissions) {
  //     const updatedPermissions = permission.permissions.map((perm) => {
  //       const updatedSubmenus = perm.submenus.map((submenu) => {
          
  //           const matchingGetSubmenu = getPermissions.find((getPerm) => getPerm.module === submenu.module);
  //           if (matchingGetSubmenu) {
  //             // Update the submenu object if there's a match in getPermissions
  //             return {
  //               ...submenu,
  //               ...matchingGetSubmenu,
  //             };
  //           }
          
  //         return submenu; // Return the original submenu if no match found
  //       });

  //       // Check if any submenu item has any key pair value set to true
  //       const anyTrue = updatedSubmenus.some((sub) => Object.values(sub).some((value) => value === true));

  //       // Update the permissions.all value to true if any submenu item has any key pair value set to true
  //       const updatedPerm = {
  //         ...perm,
  //         submenus: updatedSubmenus,
  //         all: anyTrue, // Set permissions.all to true if any submenu item has any key pair value set to true
  //       };

  //       return updatedPerm;
  //     });

  //     setPermissions({
  //       ...permission,
  //       permissions: updatedPermissions,
  //       role: getPermissions.role?.name,
  //       description: getPermissions?.role?.description,
  //     });
  //     console.log(updatedPermissions, "Updatedpermission");
  //   } else {
  //     console.error("getPermissions or permission.permissions is undefined or null.");
  //   }
  // };


  // useEffect(() => {
  //   updatePermissions();
  // }, [getPermissions])


  const getInitialState = () => {
    return {
      role: '',
      description: '',
      permissions: [
        {
          module: 'User Mangement',
          all: false,
          submenus: [
            {
              module: 'User Details',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },
          ]
        },

        {
          module: 'Student Management',
          all: false,

          submenus: [
            {
              module: 'Enrolled Students',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              // canDelete: false,
            },
            {
              module: 'Fee Details',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              // canDelete: false,
            },

            {
              module: 'Certificate',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              // canDelete: false,
            },
            {
              module: 'Requested Certificate',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              // canDelete: false,
            },
            {
              module: 'Issued Certificate',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              // canDelete: false,
            },
            {
              module: 'refund',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              // canDelete: false,
            },
          ]
        },

        {
          module: 'Inventory',
          all: false,
          submenus: [
            {
              module: 'Add Asserts',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },
            {
              module: 'Assign Asserts',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },]
        },

        {
          module: 'Leads',
          all: false,
          submenus: [
            {
              module: 'Website Leads',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },]
        },

        {
          module: 'Reports',
          all: false,
          submenus: [
            {
              module: 'Report Data',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },]
        },

        {
          module: 'Settings',
          all: false,
          submenus: [
            {
              module: 'Roles',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },
            {
              module: 'Branch',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },
            {
              module: 'Course Package',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },
            {
              module: 'Courses',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },
            {
              module: 'Admission Fee',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            }, {
              module: 'Departments',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },
            {
              module: 'Lead Sources',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },
            {
              module: 'Communication',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },
            {
              module: 'Add Vendor',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },
            {
              module: 'Add Assets Type',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },
            {
              module: 'Forms',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },
            {
              module: 'Organization Profile',
              all: false,
              canCreate: false,
              canRead: false,
              canUpdate: false,
              canDelete: false,
            },

          ]
        },
      ]
    }
  }

  const [permission, setPermissions] = useState(() => getInitialState());

  console.log(permission, "djhgsfjgf")


  const LoginAdmin = async (logindata) => {
    console.log(logindata, "logindatahere")
    // const {data, Status} = await axios.post(`${process.env.REACT_APP_API_URL}/adminlogin`, logindata);

    try {
      const { data, status } = await toast.promise(axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, logindata), {
        loading: "Loading...",
        success: "Login Successfully",
        error: "Wrong Credentials 🤯"
      })
      console.log(data, status, "axiosdatadf")
      console.log(data?.adminData?.profile, "yytf")

      if (status === 200) {
        console.log(data, "gggfgfchg")
        localStorage.setItem(
          "data",
          JSON.stringify({
            user: data?.user,
            token: data?.token,
            role: data?.role?.Permissions,
          })
        )

        localStorage.setItem("password",
          JSON.stringify({
            password: data?.user?.password
          }))
        DispatchAuth({ type: "SET_USER", payload: data?.user })
        DispatchAuth({ type: "SET_TOKEN", payload: data?.token })
        DispatchAuth({ type: "SET_ROLE", payload: data?.role?.Permissions })
        DispatchAuth({ type: "SET_PASSWORD_LOCALSTORAGE", payload: data?.user?.password })
        navigate("/");
      }
    }
    catch (error) {
      console.log(error)
    }
  }


  const Forgotpassword = async (email) => {
    console.log(email, "forgotemail1")
    try {
      const { data, status } = await toast.promise(axios.post(`${process.env.REACT_APP_API_URL}/auth/forgotpassword`, email), {
        loading: "Loading...",
        success: "email sunbmitted successfully",
        error: "Wrong Credentials 🤯"
      })
      //here add the put request for changing password with email
      if (status === 200) {
        Swal.fire({
          title: 'Reset Password Success!',
          text: 'Check your email for reset instructions.',
          icon: 'success',
        });
        return redirect('/auth/login');
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const LockTheScreen = async () => {
    try {
      console.log("hello")
      localStorage.removeItem("password")
      DispatchAuth({ type: "SET_PASSWORD_LOCALSTORAGE", payload: "" })
    }
    catch (error) {
      console.log(error)
    }
  }

  const OpenLockScreen = async (password) => {
    console.log(password, "userpassword")
    try {
      const { data, status } = await axios.post();
      if (status === 200) {
        localStrogeData.setItem("password",
          JSON.stringify({
            password: data?.user?.password
          }))
        DispatchAuth({ type: "SET_PASSWORD_LOCALSTORAGE", payload: data?.user?.password })

      }
      navigate("/")
    }
    catch (error) {
      console.log(error)
    }
  }


  const ChangePasswordfun = async (id, updatedpassword) => {

    //axios.put(`${process.env.REACT_APP_API_URL}/resetpassword/${id}`, updatedpassword
    console.log(updatedpassword, "changepasswordcontext")
    try {
      const { data, status } = await toast.promise(axios.put(`${process.env.REACT_APP_API_URL}/resetpassword/${id}`, updatedpassword), {
        loading: "Loading...",
        success: "Password Changed Successfully",
        error: "Something went wrong...🤯.        Please try again"
      })

      // if(status==="200pass"){
      //     userLogout();
      //     Swal.fire({
      //         title: 'Reset Password Success!',
      //         text: 'Check your email for reset instructions.',
      //         icon:'success',
      //     });
      //     navigate("/login")
      // }
      userLogout();
      // navigate("/login")

    }
    catch (error) {
      console.log(error)
    }
  }

  const userLogout = async () => {
    localStorage.removeItem("data")
    localStorage.removeItem("password")
    DispatchAuth({ type: "SET_USER", payload: {} })
    DispatchAuth({ type: "SET_TOKEN", payload: "" })
    DispatchAuth({ type: "SET_ROLE", payload: {} })
    DispatchAuth({ type: "SET_PASSWORD_LOCALSTORAGE", payload: "" })
    toast.success("logout successfully")
  }


  useEffect(() => {
    if (localStrogeData) {
      DispatchAuth({ type: "SET_TOKEN", payload: localStrogeData?.token })
      DispatchAuth({ type: "SET_USER", payload: localStrogeData?.user })
    }
  }, [])

  return (
    <AuthContext.Provider value={{ permission, AuthState, DispatchAuth, Forgotpassword, LoginAdmin, ChangePasswordfun, userLogout, OpenLockScreen, LockTheScreen }}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContextProvider;
