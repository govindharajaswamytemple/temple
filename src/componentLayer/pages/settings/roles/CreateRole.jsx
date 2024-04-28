import React, { useContext, useEffect, useState } from "react";
import { RoleContext } from "../../../../dataLayer/context/roleContext/RoleContextProvider";
import { FaArrowRight } from "react-icons/fa";
import Button from "../../../components/button/Button";
import { useRoleContext } from "../../../../dataLayer/hooks/useRoleContext";
import BackButton from "../../../components/backbutton/BackButton";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../../../dataLayer/hooks/useAuthContext";
import { IoIosArrowDown } from "react-icons/io";

export const CreateRole = () => {

  const {AuthState}=useAuthContext();
  console.log(AuthState.user.fullname , "dfhgdjfg")

  const { id } = useParams();

  const [getPermissions, settheGetPermissions] = useState();

  console.log(getPermissions, "dkfjhdgfg")

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const { data, status } = await axios.get(`${process.env.REACT_APP_API_URL}/roles/getrolebyid/${id}`);
          console.log(data, status, "hdjfghjfdsgf");
          if (status === 200) {
            // settheGetPermissions(data?.role?.Permissions)
            settheGetPermissions(data)
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [id]);





  const { RoleState, createRole, DispatchRoleState, getAllPaginatedRoles } = useRoleContext();
  
  const navigate = useNavigate();

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
  console.log(permission, "dhgfjdgfjsdgf")
  const [sendPermissions, setSendPermissions] = useState();
  console.log(sendPermissions, "sendingfgfd")

  

  const updatePermissions = () => {
    if (getPermissions && permission && permission.permissions) {
      const updatedPermissions = permission.permissions.map((perm) => {
        const updatedSubmenus = perm.submenus.map((submenu) => {
          const matchingGetSubmenu = getPermissions.role?.Permissions.find((getPerm) => getPerm.module === submenu.module);
          if (matchingGetSubmenu) {
            // Update the submenu object if there's a match in getPermissions
            return {
              ...submenu,
              ...matchingGetSubmenu,
            };
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
        role: getPermissions.role?.name,
        description: getPermissions?.role?.description,
      });
      console.log(updatedPermissions, "Updatedpermission");
    } else {
      console.error("getPermissions or permission.permissions is undefined or null.");
    }
  };


  useEffect(() => {
    updatePermissions();
  }, [getPermissions && id])









  useEffect(() => {
    setSendPermissions(formatPermissions(permission?.permissions));
  }, [permission]);

  const formatPermissions = (permissions) => {
    let sendPermissions = [];
    permissions.forEach(({ module, all, submenus }) => {
      if (submenus) {
        submenus.forEach(({ module: submenuModule, ...submenuPermissions }) => {
          sendPermissions.push({
            module: submenuModule,
            all,
            ...submenuPermissions
          });
        });
      }
    });
    return sendPermissions;
  }



  const handletoggle = (permissionType, moduleIndex, submenuIndex) => {

    if (permissionType === 'all' && moduleIndex !== undefined && submenuIndex === undefined) {
      const newValue = !permission.permissions[moduleIndex].all;
      permission.permissions[moduleIndex].all = newValue;

      permission.permissions[moduleIndex].submenus.forEach((submenu) => {
        if (submenu?.all !== undefined && submenu?.all !== null ) submenu.all = newValue;
        if (submenu?.canCreate !== undefined && submenu?.canCreate !== null) submenu.canCreate = newValue;
        if (submenu?.canRead !== undefined && submenu?.canRead !== null) submenu.canRead = newValue;
        if (submenu?.canUpdate !== undefined && submenu?.canUpdate !== null) submenu.canUpdate = newValue;
        if (submenu?.canDelete !== undefined && submenu?.canDelete !== null) submenu.canDelete = newValue;
      });
    }
    if (permissionType === 'all' && moduleIndex !== undefined && submenuIndex !== undefined) {
      const newValue = !permission.permissions[moduleIndex].submenus[submenuIndex].all;
      permission.permissions[moduleIndex].submenus[submenuIndex].all = newValue;
      let setsubmenuPermission = [permission.permissions[moduleIndex].submenus[submenuIndex]]
      setsubmenuPermission.forEach((submenu) => {
        if (submenu.all !== undefined && submenu.all !== null ) submenu.all = newValue;
        if (submenu.canCreate !== undefined && submenu.canCreate !== null) submenu.canCreate = newValue;
        if (submenu.canRead !== undefined && submenu.canRead !== null) submenu.canRead = newValue;
        if (submenu.canUpdate !== undefined && submenu.canUpdate !== null) submenu.canUpdate = newValue;
        if (submenu.canDelete !== undefined && submenu.canDelete !== null) submenu.canDelete = newValue;
      })
    }
    if (permissionType === "canCreate" && moduleIndex !== undefined && submenuIndex !== undefined) {
      console.log(permissionType, moduleIndex, submenuIndex, "dfhjdf")
      const newValue = !permission.permissions[moduleIndex].submenus[submenuIndex].canCreate;
      let setsubmenuPermission = [permission.permissions[moduleIndex].submenus[submenuIndex]]
      setsubmenuPermission.forEach((submenu) => {
        if (submenu.canCreate !== undefined && submenu.canCreate !== null) submenu.canCreate = newValue;

        if (!newValue) {
          if (submenu.all !== undefined && submenu.all !== null) submenu.all = false;
        }

        if (!newValue || newValue) {
          if (submenu.canRead !== undefined && submenu.canRead !== null) submenu.canRead = true;
        }
      })
    }
    if (permissionType === "canRead" && moduleIndex !== undefined && submenuIndex !== undefined) {
      const newValue = !permission.permissions[moduleIndex].submenus[submenuIndex].canRead;
      let setsubmenuPermission = [permission.permissions[moduleIndex].submenus[submenuIndex]]

      setsubmenuPermission.forEach((submenu) => {
        if (!newValue) {
          if (submenu.all !== undefined && submenu.all !== null) submenu.all = newValue;
          if (submenu.canCreate !== undefined && submenu.canCreate !== null) submenu.canCreate = newValue;
          if (submenu.canRead !== undefined && submenu.canRead !== null) submenu.canRead = newValue;
          if (submenu.canUpdate !== undefined && submenu.canUpdate !== null) submenu.canUpdate = newValue;
          if (submenu.canDelete !== undefined && submenu.canDelete !== null) submenu.canDelete = newValue;
        }
        else if (newValue) {
          if (submenu.canRead !== undefined && submenu.canRead !== null) submenu.canRead = newValue;
        }
      })
    }
    if (permissionType === "canUpdate" && moduleIndex !== undefined && submenuIndex !== undefined) {
      const newValue = !permission.permissions[moduleIndex].submenus[submenuIndex].canUpdate;
      let setsubmenuPermission = [permission.permissions[moduleIndex].submenus[submenuIndex]]
      setsubmenuPermission.forEach((submenu) => {
        if (submenu.canUpdate !== undefined && submenu.canUpdate !== null) submenu.canUpdate = newValue;

        if (!newValue) {
          if (submenu.all !== undefined && submenu.all !== null) submenu.all = false;
        }
        if (!newValue || newValue) {
          if (submenu.canRead !== undefined && submenu.canRead !== null) submenu.canRead = true;
        }
      })
    }
    if (permissionType === "canDelete" && moduleIndex !== undefined && submenuIndex !== undefined) {
      const newValue = !permission.permissions[moduleIndex].submenus[submenuIndex].canDelete;
      let setsubmenuPermission = [permission.permissions[moduleIndex].submenus[submenuIndex]]

      setsubmenuPermission.forEach((submenu) => {
        if (submenu.canDelete !== undefined && submenu.canDelete !== null) submenu.canDelete = newValue;

        if (!newValue) {
          if (submenu.all !== undefined && submenu.all !== null) submenu.all = false;
        }
        if (!newValue || newValue) {
          if (submenu.canRead !== undefined && submenu.canRead !== null) submenu.canRead = true;
        }

      })

    }
    if (
      (permissionType === "canDelete" || permissionType === "canUpdate" || permissionType === "canRead" || permissionType === "canCreate") &&
      moduleIndex !== undefined &&
      submenuIndex !== undefined
    ) {
      const submenu = permission.permissions[moduleIndex].submenus[submenuIndex];
      const newValueCreate = (submenu?.canCreate !== undefined  && submenu?.canCreate !== null ) ? submenu.canCreate : true;
      const newValueRead = (submenu?.canRead !== undefined && submenu?.canRead !== null )? submenu.canRead : true;
      const newValueUpdate = (submenu?.canUpdate !== undefined && submenu?.canUpdate !== null ) ? submenu.canUpdate : true;
      const newValueDelete = (submenu?.canDelete !== undefined &&submenu?.canDelete !== null ) ? submenu.canDelete : true;
      console.log(newValueCreate, newValueRead, newValueUpdate, newValueDelete, "hhfhgfc")
      let allPermissionsTrue = newValueCreate && newValueRead && newValueUpdate && newValueDelete;
      console.log(allPermissionsTrue, "dfh")
      if (allPermissionsTrue) {
        permission.permissions[moduleIndex].submenus[submenuIndex].all = true;
      }
    }
    if (moduleIndex !== undefined) {
      const modulePermissions = permission.permissions[moduleIndex];
      let anyPermissionTrue = false;

      for (const submenu of modulePermissions.submenus) {
        if (
          submenu.canDelete ||
          submenu.canUpdate ||
          submenu.canRead ||
          submenu.canCreate
        ) {
          anyPermissionTrue = true;
          break; // Exit loop if any permission is true
        }
      }

      // Set the 'all' permission based on anyPermissionTrue
      modulePermissions.all = anyPermissionTrue;
    }

    // need in the future 
    // if( (permissionType === "canRead"|| permissionType === "canCreate") && moduleIndex === 0 &&
    // submenuIndex === 0){
    //   console.log(moduleIndex,submenuIndex,permissionType, "dghfgdghf")
    //   const submenu = permission.permissions[0].submenus[0];

    //   const submenuRead = submenu.canRead;
    //   const submenucreate= submenu.canCreate;

    //   if(permissionType === "canRead") {
    //     permission.permissions[0].submenus[0].canRead = submenuRead;
    //   }
    //   if(permissionType === "canCreate"){
    //     permission.permissions[0].submenus[0].canRead = false;
    //     permission.permissions[0].all = true;
    //   }
    //   if(permissionType === "canCreate"){

    //     if(submenu.canCreate === false && submenu.canRead === false &&submenu.canUpdate === false && submenu.canDelete === false ){
    //       permission.permissions[0].all = false;
    //     }
    //   }




    // }
    // Update state or perform other necessary actions
    setPermissions({ ...permission }); // Update state
  };


  const [error, seterrors] = useState({
    role: '',
    description: '',
  });

  useEffect(() => {
    if (permission.role) {
      seterrors((prev) => ({
        ...prev,
        role: '',
      }));
    } else if (permission.role.length >= 3) {
      seterrors((prev) => ({
        ...prev,
        role: '',
      }));
    }

    if (permission.description) {
      seterrors((prev) => ({
        ...prev,
        description: '',
      }));
    } else if (permission.description.length >= 3) {
      seterrors((prev) => ({
        ...prev,
        description: '',
      }));
    }
  }, [permission.role, permission.description]);





  const handleSubmit = async () => {

    if (!permission.role) {
      seterrors((prev) => {
        return {
          ...prev,
          role: 'Please Enter the Role',
        };
      });
      return false;
    } else if (permission.role.length < 3) {
      seterrors((prev) => ({
        ...prev,
        role: 'Role must be at least 3 characters',
      }));
      return false;
    }

    if (!permission.description) {
      seterrors((prev) => ({
        ...prev,
        description: 'Please Enter the Description',
      }));
      return false;
    } else if (permission.description.length < 3) {
      seterrors((prev) => ({
        ...prev,
        description: 'Description should have atleast 3 characters',
      }));
      return false
    }

    let user = {
      role: permission.role,
      description: permission.description,
      createdBy:AuthState?.user?.fullname
    };

    let permissionObj = {
      permissions: sendPermissions,
    }
    console.log(permission, "dfdjgfj")
    user = [user];
    const dataWithTitleCase = user.map((item) => {
      const newItem = {};
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          if (typeof item[key] === "string" && key !== "email") {
            newItem[key] = item[key]
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
          } else {
            newItem[key] = item[key];
          }
        }
      }
      return newItem;
    });
    user = dataWithTitleCase[0];
    console.log(user, "datawithtitilecase");
    let permissions = { ...sendPermissions };



    let userpermissionData = {
      ...user,
      ...permissionObj
    }
    console.log(userpermissionData, "jdjfhjdgf")

    if (!id) {
      try {
        const { data, status } = await toast.promise(axios.post(`${process.env.REACT_APP_API_URL}/roles/create-role`, userpermissionData),
          {
            loading: "Loading...",
            success: "Role created Successfully",
            error: "Role not Created",
          }
        );

        if (status === 201) {
          navigate("/settings/roles");
          getAllPaginatedRoles();

        }
      }
      catch (error) {
        console.log(error)
      }

    }

    if (id) {
      console.log(userpermissionData, "dshfjdgf")
      try {
        const { data, status } = await toast.promise(axios.put(`${process.env.REACT_APP_API_URL}/roles/update-role/${id}`, userpermissionData),
          {
            loading: "Loading...",
            success: "Role Updated Successfully",
            error: "Role not Updated",
          }
        );

        if (status === 200) {
          navigate("/settings/roles");
          getAllPaginatedRoles();
        }
      }
      catch (error) {
        console.log(error)
      }
    }



  };

  document.addEventListener('DOMContentLoaded', function() {
    var toggleButtons = document.querySelectorAll('[data-toggle="collapse"]');
    toggleButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var icon = button.querySelector('.collapse-icon');
            icon.classList.toggle('collapsed');
        });
    });
});


  return (
    <div>
      {
        id && id ? <BackButton heading=" Update Role" content="Back" /> : <BackButton heading=" Create Role" content="Back" />
      }

      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-xxl-3 col-md-6">
                <div>
                  <div className="form-group text-start black_300">
                    <label className="form-label fs-s black_300 " for="example-text-input">
                      Role Name<span className="text-danger">*</span>
                    </label>
                    <input
                      // className="form-control fs-s bg-form text_color input_bg_color"
                      className={
                        error && error?.role && error?.role.length > 0
                          ? "form-control fs-s bg-form text_color input_bg_color error-input"
                          : "form-control fs-s bg-form text_color input_bg_color"
                      }
                      style={id && id ? {cursor:"not-allowed"} : undefined}
                      type="text"
                      placeholder="Enter Role Name"
                      id='role'
                      name='role'
                      autoComplete='role'
                      required
                      value={permission.role}
                      onChange={(e) => {
                        setPermissions({
                          ...permission,
                          role: e.target.value,
                        });
                      }}
                      disabled={id}
                    />
                    {
                      error.role && error.role.length > 0 && (
                        <p className="text-danger m-0 fs-xs">
                          {error?.role}
                        </p>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className="col-xxl-3 col-md-6">
                <div>
                  <div className="form-group text-start black_300">
                    <label className="form-label fs-s" for="example-text-input ">
                      Role Description<span className="text-danger">*</span>
                    </label>
                    <input
                      // className="form-control fs-s bg-form text_color input_bg_color "
                      className={
                        error && error?.description && error?.description.length > 0
                          ? "form-control fs-s bg-form text_color input_bg_color error-input"
                          : "form-control fs-s bg-form text_color input_bg_color"
                      }
                      placeholder="Enter Role Discription"
                      id='description'
                      name='description'
                      type='text'
                      autoComplete='description'
                      required
                      value={permission?.description}
                      onChange={(e) => {
                        setPermissions({
                          ...permission,
                          description: e.target.value,
                        });
                      }}
                      
                    />
                    {
                      error.description && error.description.length > 0 && (
                        <p className="text-danger m-0 fs-xs">
                          {error?.description}
                        </p>
                      )
                    }
                  </div>
                </div>
              </div>

            </div>

            <div className=" row mt-5">
              <div className="table-responsive table-scroll table-card">
                <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                  <thead className="  table-light ">
                    <tr className="shadow-sm bg-body-tertiary rounded   ">
                      <th scope="col" className="fs-13 lh-xs fw-600  " >
                        Name
                      </th>
                      <th scope="col" className="fs-13 lh-xs  fw-600   " >
                        All
                      </th>
                      <th scope="col" className="fs-13 lh-xs fw-600  " >
                     Create
                      </th>
                      <th scope="col" className="fs-13 lh-xs fw-600  " >
                     Read
                     </th>
                     <th scope="col" className="fs-13 lh-xs fw-600  " >
                     Update
                     </th>
                     <th scope="col" className="fs-13 lh-xs fw-600  " >
                     Delete
                     </th>
                    </tr>

                   

                    {/* Permissions */}
                    {permission && permission?.permissions.map((item, index) => {
                      return (
                        <>
                          {/* First row for modules */}
                          <tr style={{ height: "50px" }}>
                            <td className="fs-13 lh-500 black_300" data-bs-toggle="collapse" data-bs-target={`#submenu_${index}`} aria-expanded="false" aria-controls={`submenu_${index}`} style={{ cursor: "pointer" }}>
                            {item.module}  <IoIosArrowDown className=" ms-1 collapse-icon text_color fs-13" />
                            </td>


                            <td className="fs-13 lh-500 black_300">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`flexSwitchCheckDefault_${index}`}
                                  checked={item.all}
                                  value={item.all} // Add value to checkbox
                                  onChange={() => handletoggle("all", index)}
                                />
                                <label className="form-check-label" htmlFor={`flexSwitchCheckDefault_${index}`}></label>
                              </div>
                            </td>

                            {/* <td className="fs-13 lh-500 black_300">
                              <div className="form-check form-switch">
                                <input className="form-check-input"
                                  type="checkbox"
                                  id={`flexSwitchCheckDefault_${index}`}
                                  checked={item.all}
                                  value={item.all} // Add value to checkbox
                                  onChange={() => handletoggle("all", index,)}
                                />
                                <label className="form-check-label" htmlFor={`flexSwitchCheckDefault_${index}`}></label>
                              </div>
                            </td> */}

                            {/* Empty cells */}
                            <td className="fs-13 lh-500 black_300"></td>
                            <td className="fs-13 lh-500 black_300"></td>
                            <td className="fs-13 lh-500 black_300"></td>
                            <td className="fs-13 lh-500 black_300"></td>
                          </tr>

                          {/* Second row for submenu items */}
                          {item.submenus.map((submenu, subIndex) => {
                            console.log(submenu.module, subIndex, "jghfjhgdfj")

                            return (
                              <tr style={{ height: "50px" }} className="collapse" id={`submenu_${index}`} key={subIndex}>
                                <td className="fs-13 lh-500 black_300 ps-4">{submenu.module}</td>

                                {/* You can map submenu items here */}
                                {/* Add the necessary logic to map submenu items */}

                                <td className="fs-13 lh-500 black_300 ">
                                  {submenu.hasOwnProperty('all') && (submenu.all !== null) ? (
                                    <div className="form-check form-switch">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`allCheckbox_${index}_${subIndex}`}
                                        checked={submenu.all}
                                        value={submenu.all} // Add value to checkbox
                                        onChange={() => handletoggle("all", index, subIndex)}
                                      />
                                      <label className="form-check-label" htmlFor={`allCheckbox_${index}_${subIndex}`}></label>
                                    </div>
                                  ) : (
                                    <div className="form-check form-switch">
                                      NA
                                    </div>
                                  )}
                                </td>

                                <td className="fs-13 lh-500 black_300 ">
                                  {submenu.hasOwnProperty('canCreate') && (submenu.canCreate !== null) ? (
                                    <div className="form-check form-switch">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`allCheckbox_${index}_${subIndex}`}
                                        checked={submenu.canCreate}
                                        value={submenu.canCreate} // Add value to checkbox
                                        onChange={() => handletoggle("canCreate", index, subIndex)}
                                      />
                                      <label className="form-check-label" htmlFor={`allCheckbox_${index}_${subIndex}`}></label>
                                    </div>
                                  ) : (
                                    <div className="form-check form-switch">
                                      NA
                                    </div>
                                  )}
                                </td>
                                <td className="fs-13 lh-500 black_300 ">
                                  {submenu.hasOwnProperty('canRead') && (submenu?.canRead !== null) ? (
                                    <div className="form-check form-switch">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`allCheckbox_${index}_${subIndex}`}
                                        checked={submenu.canRead}
                                        value={submenu.canRead} // Add value to checkbox
                                        onChange={() => handletoggle("canRead", index, subIndex)}
                                      />
                                      <label className="form-check-label" htmlFor={`allCheckbox_${index}_${subIndex}`}></label>
                                    </div>
                                  ) : (
                                    <div className="form-check form-switch">
                                      NA
                                    </div>
                                  )}
                                </td>

                                <td className="fs-13 lh-500 black_300">
                                  {submenu.hasOwnProperty('canUpdate') && (submenu.canUpdate !== null) ? (
                                    <div className="form-check form-switch">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`allCheckbox_${index}_${subIndex}`}
                                        checked={submenu.canUpdate}
                                        value={submenu.canUpdate} // Add value to checkbox
                                        onChange={() => handletoggle("canUpdate", index, subIndex)}
                                      />
                                      <label className="form-check-label" htmlFor={`allCheckbox_${index}_${subIndex}`}></label>
                                    </div>
                                  ) : (
                                    <div className="form-check form-switch">
                                      NA
                                    </div>
                                  )}
                                </td>

                                <td className="fs-13 lh-500 black_300">
                                  {submenu.hasOwnProperty('canDelete') && (submenu.canDelete !== null) ? (
                                    <div className="form-check form-switch">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`allCheckbox_${index}_${subIndex}`}
                                        checked={submenu.canDelete}
                                        value={submenu.canDelete} // Add value to checkbox
                                        onChange={() => handletoggle("canDelete", index, subIndex)}
                                      />
                                      <label className="form-check-label" htmlFor={`allCheckbox_${index}_${subIndex}`}></label>
                                    </div>
                                  ) : (
                                    <div className="form-check form-switch">
                                      NA
                                    </div>
                                  )}
                                </td>



                                {/* <td className="fs-13 lh-500 black_300">
                                {submenu.hasOwnProperty('all') ? (
                                  <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id={`allCheckbox_${index}_${subIndex}`} />
                                    <label className="form-check-label" htmlFor={`allCheckbox_${index}_${subIndex}`}></label>
                                  </div>
                                ) : (
                                  <div className="form-check form-switch">
                                    NA
                                  </div>
                                )}
                              </td>

                                <td className="fs-13 lh-500 black_300">
                                  {submenu.hasOwnProperty('canCreate') ? (
                                    <div className="form-check form-switch">
                                      <input className="form-check-input" type="checkbox" id={`allCheckbox_${index}_${subIndex}`} />
                                      <label className="form-check-label" htmlFor={`allCheckbox_${index}_${subIndex}`}></label>
                                    </div>
                                  ) : (
                                    <div className="form-check form-switch">
                                      NA
                                    </div>
                                  )}
                                </td>

                                <td className="fs-13 lh-500 black_300">
                                  {submenu.hasOwnProperty('canRead') ? (
                                    <div className="form-check form-switch">
                                      <input className="form-check-input" type="checkbox" id={`allCheckbox_${index}_${subIndex}`} />
                                      <label className="form-check-label" htmlFor={`allCheckbox_${index}_${subIndex}`}></label>
                                    </div>
                                  ) : (
                                    <div className="form-check form-switch">
                                      NA
                                    </div>
                                  )}
                                </td>

                                <td className="fs-13 lh-500 black_300">
                                  {submenu.hasOwnProperty('canUpdate') ? (
                                    <div className="form-check form-switch">
                                      <input className="form-check-input" type="checkbox" id={`allCheckbox_${index}_${subIndex}`} />
                                      <label className="form-check-label" htmlFor={`allCheckbox_${index}_${subIndex}`}></label>
                                    </div>
                                  ) : (
                                    <div className="form-check form-switch">
                                      NA
                                    </div>
                                  )}
                                </td>

                                <td className="fs-13 lh-500 black_300">
                                  {submenu.hasOwnProperty('canDelete') ? (
                                    <div className="form-check form-switch">
                                      <input className="form-check-input" type="checkbox" id={`allCheckbox_${index}_${subIndex}`} />
                                      <label className="form-check-label" htmlFor={`allCheckbox_${index}_${subIndex}`}></label>
                                    </div>
                                  ) : (
                                    <div className="form-check form-switch">
                                      NA
                                    </div>
                                  )}
                                </td> */}

                              </tr>

                            )
                          }
                          )}
                        </>
                      );
                    })}




                    {/* static table */}



                  </thead>
                </table>
              </div>
            </div>

          </div>
        </div>
        <div className=" ">
          <div className="d-flex justify-content-end my-3 mx-2">
            {
              id && id ? <Button className={"btn_primary"}
                onClick={handleSubmit}

              >
                Update
              </Button> 
              :
               <Button className={"btn_primary"}
                onClick={handleSubmit}
              >
                Submit
                </Button>
            }



          </div>
        </div>

      </div>
    </div>
  );
};












{/* <tr style={{ height: "50px" }}>
<td className="fs-13 lh-500 black_300" data-bs-toggle="collapse" data-bs-target="#Usermanagement" aria-expanded="false" aria-controls="Usermanagement" style={{ cursor: "pointer" }} > User Management  </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> </td>
<td className="fs-13 lh-500 black_300">  </td>
<td className="fs-13 lh-500 black_300"> </td>
<td className="fs-13 lh-500 black_300">  </td>
</tr>

<tr style={{ height: "50px" }} class="collapse" id="Usermanagement">
<td className="fs-13 lh-500 black_300">User Details </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
</tr>
<tr style={{ height: "50px" }}>
<td className="fs-13 lh-500 black_300" data-bs-toggle="collapse" data-bs-target="#Studentmanagement" aria-expanded="false" aria-controls="Studentmanagement" style={{ cursor: "pointer" }} > Student Management  </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"></td>
<td className="fs-13 lh-500 black_300">  </td>
<td className="fs-13 lh-500 black_300"> </td>
<td className="fs-13 lh-500 black_300">  </td>
</tr>
<tr style={{ height: "50px" }} class="collapse" id="Studentmanagement">
<td className="fs-13 lh-500 black_300">Enrolled Student</td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
</tr>
<tr style={{ height: "50px" }} class="collapse" id="Studentmanagement">
<td className="fs-13 lh-500 black_300">Fee Details</td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

</tr>
<tr style={{ height: "50px" }} class="collapse" id="Studentmanagement">
<td className="fs-13 lh-500 black_300">Certificate</td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>




</tr>
<tr style={{ height: "50px" }} class="collapse" id="Studentmanagement">
<td className="fs-13 lh-500 black_300">Requested Certificate</td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

</tr>
<tr style={{ height: "50px" }}>
<td className="fs-13 lh-500 black_300" data-bs-toggle="collapse" data-bs-target="#Inventory" aria-expanded="false" aria-controls="Inventory" style={{ cursor: "pointer" }} > Inventory </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300">  </td>
<td className="fs-13 lh-500 black_300">  </td>
<td className="fs-13 lh-500 black_300">  </td>
<td className="fs-13 lh-500 black_300">  </td>

</tr>
<tr style={{ height: "50px" }} class="collapse" id="Inventory">
<td className="fs-13 lh-500 black_300">Add Assets</td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>




</tr>
<tr style={{ height: "50px" }} class="collapse" id="Inventory">
<td className="fs-13 lh-500 black_300">Assign Assets</td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>




</tr>
<tr style={{ height: "50px" }}>
<td className="fs-13 lh-500 black_300" data-bs-toggle="collapse" data-bs-target="#Leads" aria-expanded="false" aria-controls="Leads" style={{ cursor: "pointer" }}> Leads  </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> </td>
<td className="fs-13 lh-500 black_300">  </td>
<td className="fs-13 lh-500 black_300"> </td>
<td className="fs-13 lh-500 black_300"> </td>

</tr>
<tr style={{ height: "50px" }} class="collapse" id="Leads">
<td className="fs-13 lh-500 black_300">Website Leads</td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>


</tr>
<tr style={{ height: "50px" }}>
<td className="fs-13 lh-500 black_300" data-bs-toggle="collapse" data-bs-target="#Report" aria-expanded="false" aria-controls="Report" style={{ cursor: "pointer" }}> Reports  </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> </td>
<td className="fs-13 lh-500 black_300">  </td>
<td className="fs-13 lh-500 black_300"> </td>
<td className="fs-13 lh-500 black_300">  </td>

</tr>
<tr style={{ height: "50px" }} class="collapse" id="Report">
<td className="fs-13 lh-500 black_300">Report Data</td>
<td className="fs-13 lh-500 black_300"><div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div>  </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>




</tr>
<tr style={{ height: "50px" }}>
<td className="fs-13 lh-500 black_300" data-bs-toggle="collapse" data-bs-target="#Settings" aria-expanded="false" aria-controls="Settings" style={{ cursor: "pointer" }}> Settings  </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> </td>
<td className="fs-13 lh-500 black_300">  </td>
<td className="fs-13 lh-500 black_300">  </td>
<td className="fs-13 lh-500 black_300">  </td>

</tr>
<tr style={{ height: "50px" }} class="collapse" id="Settings">
<td className="fs-13 lh-500 black_300">Role</td>
<td className="fs-13 lh-500 black_300">
  <div className="form-check form-switch form-switch-right form-switch-md ">

    <input
      style={{ cursor: "pointer" }}
      className="form-check-input code-switcher toggle_btn"
      type="checkbox"
      id="FormValidationDefault"
      checked=""
      onChange=""


      data-bs-toggle="modal"
      data-bs-target="#staticBackdrop"
    />

  </div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>




</tr>
<tr style={{ height: "50px" }} class="collapse" id="Settings">
<td className="fs-13 lh-500 black_300">Branch</td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>




</tr>
<tr style={{ height: "50px" }} class="collapse" id="Settings">
<td className="fs-13 lh-500 black_300">Department</td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>




</tr>
<tr style={{ height: "50px" }} class="collapse" id="Settings">
<td className="fs-13 lh-500 black_300">Lead Source</td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>




</tr>
<tr style={{ height: "50px" }} class="collapse" id="Settings">
<td className="fs-13 lh-500 black_300">Courses</td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>




</tr>
<tr style={{ height: "50px" }} class="collapse" id="Settings">
<td className="fs-13 lh-500 black_300">Course Packages</td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>

<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>
<td className="fs-13 lh-500 black_300"> <div className="form-check form-switch">
  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
  <label className="form-check-label" for="flexSwitchCheckDefault"></label></div> </td>




</tr> */}









// const handletoggle = (permissionType, moduleIndex, submenuIndex) => {

//   if (permissionType === 'all' && moduleIndex !== undefined && submenuIndex === undefined) {
//     const newValue = !permission.permissions[moduleIndex].all;
//     permission.permissions[moduleIndex].all = newValue;

//     permission.permissions[moduleIndex].submenus.forEach((submenu) => {
//       if (submenu.all !== undefined) submenu.all = newValue;
//       if (submenu.canCreate !== undefined) submenu.canCreate = newValue;
//       if (submenu.canRead !== undefined) submenu.canRead = newValue;
//       if (submenu.canUpdate !== undefined) submenu.canUpdate = newValue;
//       if (submenu.canDelete !== undefined) submenu.canDelete = newValue;
//     });
//   }
//   if (permissionType === 'all' && moduleIndex !== undefined && submenuIndex !== undefined) {
//     const newValue = !permission.permissions[moduleIndex].submenus[submenuIndex].all;
//     permission.permissions[moduleIndex].submenus[submenuIndex].all = newValue;
//     let setsubmenuPermission = [permission.permissions[moduleIndex].submenus[submenuIndex]]
//     setsubmenuPermission.forEach((submenu) => {
//       if (submenu.all !== undefined) submenu.all = newValue;
//       if (submenu.canCreate !== undefined) submenu.canCreate = newValue;
//       if (submenu.canRead !== undefined) submenu.canRead = newValue;
//       if (submenu.canUpdate !== undefined) submenu.canUpdate = newValue;
//       if (submenu.canDelete !== undefined) submenu.canDelete = newValue;
//     })
//   }
//   if (permissionType === "canCreate" && moduleIndex !== undefined && submenuIndex !== undefined) {
//     console.log(permissionType, moduleIndex, submenuIndex, "dfhjdf")
//     const newValue = !permission.permissions[moduleIndex].submenus[submenuIndex].canCreate;
//     let setsubmenuPermission = [permission.permissions[moduleIndex].submenus[submenuIndex]]
//     setsubmenuPermission.forEach((submenu) => {
//       if (submenu.canCreate !== undefined) submenu.canCreate = newValue;

//       if (!newValue) {
//         if (submenu.all !== undefined) submenu.all = false;
//       }

//       if (!newValue || newValue) {
//         if (submenu.canRead !== undefined) submenu.canRead = true;
//       }
//     })
//   }
//   if (permissionType === "canRead" && moduleIndex !== undefined && submenuIndex !== undefined) {
//     const newValue = !permission.permissions[moduleIndex].submenus[submenuIndex].canRead;
//     let setsubmenuPermission = [permission.permissions[moduleIndex].submenus[submenuIndex]]

//     setsubmenuPermission.forEach((submenu) => {
//       if (!newValue) {
//         if (submenu.all !== undefined) submenu.all = newValue;
//         if (submenu.canCreate !== undefined) submenu.canCreate = newValue;
//         if (submenu.canRead !== undefined) submenu.canRead = newValue;
//         if (submenu.canUpdate !== undefined) submenu.canUpdate = newValue;
//         if (submenu.canDelete !== undefined) submenu.canDelete = newValue;
//       }
//       else if (newValue) {
//         if (submenu.canRead !== undefined) submenu.canRead = newValue;
//       }
//     })
//   }
//   if (permissionType === "canUpdate" && moduleIndex !== undefined && submenuIndex !== undefined) {
//     const newValue = !permission.permissions[moduleIndex].submenus[submenuIndex].canUpdate;
//     let setsubmenuPermission = [permission.permissions[moduleIndex].submenus[submenuIndex]]
//     setsubmenuPermission.forEach((submenu) => {
//       if (submenu.canUpdate !== undefined) submenu.canUpdate = newValue;

//       if (!newValue) {
//         if (submenu.all !== undefined) submenu.all = false;
//       }
//       if (!newValue || newValue) {
//         if (submenu.canRead !== undefined) submenu.canRead = true;
//       }
//     })
//   }
//   if (permissionType === "canDelete" && moduleIndex !== undefined && submenuIndex !== undefined) {
//     const newValue = !permission.permissions[moduleIndex].submenus[submenuIndex].canDelete;
//     let setsubmenuPermission = [permission.permissions[moduleIndex].submenus[submenuIndex]]

//     setsubmenuPermission.forEach((submenu) => {
//       if (submenu.canDelete !== undefined) submenu.canDelete = newValue;

//       if (!newValue) {
//         if (submenu.all !== undefined) submenu.all = false;
//       }
//       if (!newValue || newValue) {
//         if (submenu.canRead !== undefined) submenu.canRead = true;
//       }

//     })

//   }
//   if (
//     (permissionType === "canDelete" || permissionType === "canUpdate" || permissionType === "canRead" || permissionType === "canCreate") &&
//     moduleIndex !== undefined &&
//     submenuIndex !== undefined
//   ) {
//     const submenu = permission.permissions[moduleIndex].submenus[submenuIndex];
//     const newValueCreate = submenu?.canCreate !== undefined ? submenu.canCreate : true;
//     const newValueRead = submenu?.canRead !== undefined ? submenu.canRead : true;
//     const newValueUpdate = submenu?.canUpdate !== undefined ? submenu.canUpdate : true;
//     const newValueDelete = submenu?.canDelete !== undefined ? submenu.canDelete : true;
//     console.log(newValueCreate, newValueRead, newValueUpdate, newValueDelete, "hhfhgfc")
//     let allPermissionsTrue = newValueCreate && newValueRead && newValueUpdate && newValueDelete;
//     console.log(allPermissionsTrue, "dfh")
//     if (allPermissionsTrue) {
//       permission.permissions[moduleIndex].submenus[submenuIndex].all = true;
//     }
//   }
//   if (moduleIndex !== undefined) {
//     const modulePermissions = permission.permissions[moduleIndex];
//     let anyPermissionTrue = false;

//     for (const submenu of modulePermissions.submenus) {
//       if (
//         submenu.canDelete ||
//         submenu.canUpdate ||
//         submenu.canRead ||
//         submenu.canCreate
//       ) {
//         anyPermissionTrue = true;
//         break; // Exit loop if any permission is true
//       }
//     }

//     // Set the 'all' permission based on anyPermissionTrue
//     modulePermissions.all = anyPermissionTrue;
//   }

//   // need in the future 
//   // if( (permissionType === "canRead"|| permissionType === "canCreate") && moduleIndex === 0 &&
//   // submenuIndex === 0){
//   //   console.log(moduleIndex,submenuIndex,permissionType, "dghfgdghf")
//   //   const submenu = permission.permissions[0].submenus[0];

//   //   const submenuRead = submenu.canRead;
//   //   const submenucreate= submenu.canCreate;

//   //   if(permissionType === "canRead") {
//   //     permission.permissions[0].submenus[0].canRead = submenuRead;
//   //   }
//   //   if(permissionType === "canCreate"){
//   //     permission.permissions[0].submenus[0].canRead = false;
//   //     permission.permissions[0].all = true;
//   //   }
//   //   if(permissionType === "canCreate"){

//   //     if(submenu.canCreate === false && submenu.canRead === false &&submenu.canUpdate === false && submenu.canDelete === false ){
//   //       permission.permissions[0].all = false;
//   //     }
//   //   }




//   // }
//   // Update state or perform other necessary actions
//   setPermissions({ ...permission }); // Update state
// };
