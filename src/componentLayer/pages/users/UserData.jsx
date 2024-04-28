import React, { useEffect, useState } from "react";
import "../../../assets/css/Table.css"
import { AiFillEye } from "react-icons/ai";
import { RiEdit2Line } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { MdLocalPrintshop } from "react-icons/md";
import { FaRegIdCard } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { HiMiniPlus } from "react-icons/hi2";
import { useUserContext } from "../../../dataLayer/hooks/useUserContext";
import Usedebounce from "../../../dataLayer/hooks/useDebounce/Usedebounce";
import { useRoleContext } from "../../../dataLayer/hooks/useRoleContext";
import { useBranchContext } from "../../../dataLayer/hooks/useBranchContext";
import { useDepartmentContext } from "../../../dataLayer/hooks/useDepartmentContext";
import Button from "../../components/button/Button";
import BackButton from "../../components/backbutton/BackButton";
import axios from "axios";
import { toast } from "react-toastify";
import { MdFilterList } from "react-icons/md";
import GateKeeper from "../../../rbac/GateKeeper";
import { usePermissionsProvider } from "../../../dataLayer/hooks/usePermissionsProvider";

function UserData() {

  const navigate = useNavigate();
  const { permission } = usePermissionsProvider();
  // here the adding the filters and pagination------------------------
  const {
    UsersState,
    UsersState: { EnrolledUsers },
    DispatchUsers,
  } = useUserContext();
  const { RoleState, createRole } = useRoleContext();
  const { DispatchBranch, BranchState, getAllBranches } = useBranchContext();
  const { DispatchDepartment, DepartmentState, getAllDeparments } =
    useDepartmentContext();

  const { debouncesetSearch, debouncesetPage } = Usedebounce(DispatchUsers);
  const [userstatus, setUser_Status] = useState("");
  const [text, setText] = useState("");
  const [id, setId] = useState("");
  const [userremarkshistory, setuser_remarks_history] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const getDataInModal = (id, userStatus, userRemarkHistory) => {
    setId(id);
    setUser_Status(userStatus);
    setuser_remarks_history(userRemarkHistory);
    console.log(id, userStatus, userRemarkHistory, "bllahblha");
    setOpenModal((prev) => !prev);
  };

  const [error, setError] = useState({});
  // const handleActivate = () => {
  //   let user_remarks_history = [];
  //   if (text) {
  //     let user_status = true;
  //     user_remarks_history = userremarkshistory;
  //     let newObject = {
  //       Activate_remarks: text,
  //       date: new Date(),
  //     };
  //     console.log(user_remarks_history, "newObject");

  //     user_remarks_history.push(newObject);
  //     const updatedData = {
  //       user_status,
  //       user_remarks_history,
  //     };
  //     let uploadcontext = { user_status, user_remarks_history, id };
  // uploadcontext.user_remarks_history = JSON.stringify(
  //   uploadcontext.user_remarks_history
  // );

  //     axios
  //       .put(
  //         `${process.env.REACT_APP_API_URL}/user/userstatus/${id}`,
  //         updatedData
  //       )
  //       .then((res) => {
  //         if (res.data.updated) {
  // alert("Certificate updated successfully");
  // DispatchUsers({
  //   type: "UPDATE_USER_REMARKS_HISTORY",
  //   payload: uploadcontext,
  // });
  //           console.log(`Updated`);
  //         } else {
  //           alert("Error please Try Again");
  //         }
  //       });
  //     setText("");
  //   } else {
  //     alert("enter remarks");
  //   }
  // };

  // const handleInActivate = () => {
  //   if (text) {
  //     let user_status = false;
  //     let user_remarks_history = userremarkshistory;
  //     let newObject = {
  //       Inactivate_remarks: text,
  //       date: new Date(),
  //     };
  //     user_remarks_history.push(newObject);
  //     const updatedData = {
  //       user_status,
  //       user_remarks_history,
  //     };
  //     let uploadcontext = { user_status, user_remarks_history, id };
  // uploadcontext.user_remarks_history = JSON.stringify(
  //   uploadcontext.user_remarks_history
  // );
  //     axios
  //       .put(
  //         `${process.env.REACT_APP_API_URL}/user/userstatus/${id}`,
  //         updatedData
  //       )
  //       .then((res) => {
  //         if (res.data.updated) {
  // alert("Certificate updated successfully");
  // dispatch({
  //   type: "UPDATE_USER_REMARKS_HISTORY",
  //   payload: uploadcontext,
  // });
  //           console.log(`updated inactivate`);
  //         } else {
  //           alert("Error please Try Again");
  //         }
  //       });
  // setcourseStartDate("");
  //     setText("");
  //   } else {
  //     alert("enter remarks");
  //   }
  // };


  const handleActivate = async () => {
    if (!text) {
      toast.error("Please Enter the  remarks");
      return;
    }

    const userStatus = true;
    const newUserRemarksHistory = [...userremarkshistory];
    const newObject = {
      Activate_remarks: text,
      date: new Date(),
    };
    newUserRemarksHistory.push(newObject);

    const updatedData = {
      user_status: userStatus,
      user_remarks_history: newUserRemarksHistory,
    };

    const uploadContext = { user_status: userStatus, user_remarks_history: newUserRemarksHistory, id };

    try {

      const { data, status } = await toast.promise(
        axios.put(
          `${process.env.REACT_APP_API_URL}/user/userstatus/${id}`, updatedData),
        {
          loading: "Loading...",
          success: "User Active Successfully",
          error: "Something went wrong Please try again",
        }
      );

      console.log(data, status, "djgfjdsgfjfg")

      if (status === 200) {
        DispatchUsers({
          type: "UPDATE_USER_REMARKS_HISTORY",
          payload: uploadContext
        })
        navigate("/user/list")
      }
    }
    catch (error) {
      console.log(error)
    }

    // axios.put(`${process.env.REACT_APP_API_URL}/user/userstatus/${id}`, updatedData)
    //   .then((res) => {
    //     if (res.data.updated) {
    //       console.log(`Updated`);
    //     } else {
    //       alert("Error. Please try again.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     alert("An error occurred. Please try again.");
    //   });

    setText("");
  };

  const handleInActivate = async () => {
    if (!text) {
      toast.error("Please Enter the remarks");
      return;
    }

    const userStatus = false;
    const newUserRemarksHistory = [...userremarkshistory];
    const newObject = {
      Inactivate_remarks: text,
      date: new Date(),
    };
    newUserRemarksHistory.push(newObject);

    const updatedData = {
      user_status: userStatus,
      user_remarks_history: newUserRemarksHistory,
    };

    const uploadContext = { user_status: userStatus, user_remarks_history: newUserRemarksHistory, id };


    try {
      const { data, status } = await toast.promise(
        axios.put(
          `${process.env.REACT_APP_API_URL}/user/userstatus/${id}`, updatedData),
        {
          loading: "Loading...",
          success: "User Deactivate Successfully",
          error: "Something went wrong Please try again",
        }
      );

      console.log(data, status, "dgfjgfjsgjfdfg")

      if (status === 200) {
        DispatchUsers({
          type: "UPDATE_USER_REMARKS_HISTORY",
          payload: uploadContext
        })
        navigate("/user/list")

      }

    }
    catch (error) {
      console.log(error)
    }

    // axios.put(`${process.env.REACT_APP_API_URL}/user/userstatus/${id}`, updatedData)
    //   .then((res) => {
    //     if (res.data.updated) {
    //       console.log(`Updated inactivate`);
    //     } else {
    //       alert("Error. Please try again.");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     alert("An error occurred. Please try again.");
    //   });

    setText("");

  };

  const handleSearch = (e) => {
    debouncesetSearch({ context: "ENROLLED_USERS", data: e.target.value });
  };
  const HandlePerPage = (e) => {
    const selectedValue = e.target.value;
    DispatchUsers({
      type: "SET_PER_PAGE",
      payload: {
        context: "ENROLLED_USERS",
        data: selectedValue,
      },
    });
  };

  const [filterCriteria, setfilterCriteria] = useState({
    profile: "",
    department: "",
    branch: "",
  });

  const HandleFilterCertria = (e) => {
    const { name, value } = e.target;
    setfilterCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const filterSubmit = () => {
    console.log("filterCriteriaram", filterCriteria);
    DispatchUsers({
      type: "SET_FILTERS",
      payload: {
        context: "ENROLLED_USERS",
        data: {
          profile: filterCriteria.profile,
          department: filterCriteria.department,
          branch: filterCriteria.branch,
        },
      },
    });
  };

  const FilterReset = () => {
    setfilterCriteria({
      profile: "",
      department: "",
      branch: "",
    });
    filterSubmit();
  };

  useEffect(() => {
    DispatchUsers({
      type: "SET_FILTERS",
      payload: {
        context: "ENROLLED_USERS",
        data: {
          profile: "",
          department: "",
          branch: "",
        },
      },
    });
    debouncesetSearch({ context: "ENROLLED_USERS", data: "" });
    debouncesetPage({ context: "ENROLLED_USERS", data: 1 });
    DispatchUsers({
      type: "SET_PER_PAGE",
      payload: {
        context: "ENROLLED_USERS",
        data: 10,
      },
    });
  }, []);

  // const [currentPage, setCurrentPage] = useState(EnrolledUsers.currentPage);

  let currentPage = EnrolledUsers.currentPage;
  const totalPages = EnrolledUsers.totalPages;

  const changePage = (page) => {
    debouncesetPage({ context: "ENROLLED_USERS", data: page });
    currentPage = page;
    // setCurrentPage(page);
    // Add your logic here to handle page change
    console.log("Current page:", page);
  };

  const previousPage = () => {
    if (currentPage > 1) {
      changePage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      changePage(currentPage + 1);
    }
  };

  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);
  if (endPage - startPage < 2) {
    startPage = Math.max(1, endPage - 2);
  }

  useEffect(() => {
    // Clear error messages on change
    setError((prev) => ({
      ...prev,
      text: "",
    }));
  }, [text]);


  // const [formIsValid, setFormIsValid] = useState(false);


  // const checkFormValidity = () => {
  //   const { profile, branch, department } = filterCriteria;
  //   setFormIsValid(profile !== '' || branch !== '' || department !== '');
  // };


  // useEffect(() => {
  //   checkFormValidity();
  // }, [filterCriteria]);

  return (
    <div>
      <BackButton heading="User Details" content="Back" to="/" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card border-0">
              <div className="card-header">
                <div className="row justify-content-between">
                  <div className="col-sm-4">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search input_bg_color select"
                        placeholder="Search for..."
                        name="search"
                        required
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="buttons_alignment">
                      <div className="fs-13 me-3 mt-2">
                        {/* {EnrolledUsers.searchResultUsers} / {EnrolledUsers.totalUsers} */}
                      </div>

                      <button
                        className="btn btn-sm btn-md btn_primary fs-13 me-2 text_white"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      >
                        <MdFilterList className="me-1 mb-1 text_white" />
                        Filters
                      </button>

                      <GateKeeper requiredModule="User Mangement" requiredPermission="all" submenumodule="User Details" submenuReqiredPermission="canCreate">
                        <Button
                          type="button"
                          className="btn btn-sm btn-md btn_primary fs-13"
                        >
                          <Link to="/user/new" className="button_color">
                            <HiMiniPlus className="text_white " /> Add User
                          </Link>
                        </Button>
                      </GateKeeper>
                    </div>
                  </div>
                </div>
                <div
                  className="offcanvas offcanvas-end bg_light"
                  id="offcanvasRight"
                  aria-labelledby="offcanvasRightLabel"
                >
                  <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">
                      Filters
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body p-2">
                    {/* Profile filter */}
                    <div>
                      <label className="form-label fs-s fw-medium text_color">Profile</label>
                      <select
                        className="form-select form-control bg_input input_bg_color black_300 select"
                        id="profile"
                        name="profile"
                        value={filterCriteria.profile}
                        onChange={HandleFilterCertria}
                      >
                        <option value="" disabled selected>Select the Role</option>
                        {
                          RoleState?.RolesData?.AllRoles && RoleState?.RolesData?.AllRoles.length > 0 &&
                          RoleState?.RolesData?.AllRoles.map((item, index) => {
                            return (
                              <option key={index} value={item}>
                                {item}
                              </option>

                            )
                          })
                        }
                      </select>
                    </div>

                    {/* Branch filter */}
                    <div className="mt-2">
                      <label className="form-label fs-s fw-medium text_color">Branch</label>
                      <select
                        className="form-select form-control bg_input input_bg_color black_300 select"
                        id="branch"
                        name="branch"
                        value={filterCriteria.branch}
                        onChange={HandleFilterCertria}
                      >
                        <option value="" disabled selected>Select the Branch</option>
                        {BranchState?.branches?.map((item, index) => (
                          <option key={index} value={item.branch_name}>{item.branch_name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Department filter */}
                    <div className="mt-2">
                      <label className="form-label fs-s fw-medium text_color">Department</label>
                      <select
                        className="form-select form-control bg_input input_bg_color black_300 select"
                        id="department"
                        name="department"
                        value={filterCriteria.department}
                        onChange={HandleFilterCertria}
                      >
                        <option value="" disabled selected>Select the Department</option>
                        {DepartmentState?.departments?.map((item, index) => (
                          <option key={index} value={item.department_name}>{item.department_name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Buttons */}
                    <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                      <Button className="btn btn_primary" onClick={FilterReset} >
                        Clear
                      </Button>
                    </div>
                    <div className="position-absolute bottom-0 end-0 me-2 mb-2">
                      <Button className="btn btn_primary" onClick={filterSubmit} >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive table-card table-container table-scroll border-0">

                  <table className="table table-centered align-middle  table-nowrap equal-cell-table table-hover">
                    <thead>
                      <tr className="">
                        {/* <th scope="col">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="cardtableCheck"
                            />
                            <label
                              className="form-check-label"
                              for="cardtableCheck"
                            ></label>
                          </div>
                        </th> */}
                        <th
                          scope="col"
                          className="fs-13 lh-xs fw-600 "
                        >
                          S.No
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600  "
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600  "
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs fw-600  "
                        >
                          Phone No
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600 " >

                          Designation
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600" >

                          Department
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600 "  >
                          Report To
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600 "
                        >
                          Profile
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600 "  >

                          Branch
                        </th>
                        {/* <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600 "
                        >
                          Action
                        </th> */}


                        {permission?.permissions.map((item) => {
                          if (item.module === "User Mangement") {
                            return item?.submenus?.map((submenu) => {
                              if (submenu?.module === "User Details" && (submenu?.canUpdate === true || submenu?.canRead === true || submenu?.canDelete === true)) {
                                return (
                                  <th scope="col" className="fs-13 lh_xs 0 fw-600">
                                    Actions
                                  </th>
                                );
                              }
                              return null; // Return null when the conditions are not met
                            });
                          }
                          return null;
                        })}
                      </tr>
                    </thead>
                    <tbody className="">
                      {EnrolledUsers?.PaginatedUsers &&
                        EnrolledUsers?.PaginatedUsers?.length > 0 ? (
                        EnrolledUsers?.looading ? (
                          "loading"
                        ) : (
                          EnrolledUsers.PaginatedUsers.map((item, index) => {
                            const userid = item?.id;
                            const user = item;
                            return (
                              <>
                                <tr key={index}
                                  className={item.user_status ? '' : 'style'}>
                                  {/* {console.log("User status:", item.user_status)} */}
                                  <td className="fs-13 black_300 fw-500 lh-xs bg_light" >
                                    {(currentPage - 1) * EnrolledUsers.perPage + index + 1}

                                  </td>
                                  <td className="fs-13 black_300 lh-xs bg_light text-truncate" style={{ maxWidth: "120px" }} title={item.fullname}>
                                    {item.fullname}
                                  </td>
                                  <td className="fs-13 black_300 lh-xs bg_light text-truncate" style={{ maxWidth: "120px" }} title={item.email}>
                                    {item.email}
                                  </td>
                                  <td className="fs-13 black_300 lh-xs bg_light">
                                    {item.phonenumber}
                                  </td>
                                  <td className="fs-13 black_300 lh-xs bg_light text-truncate" style={{ maxWidth: "120px" }} title={item.designation}>
                                    {item.designation}
                                  </td>
                                  <td className="fs-13 black_300 lh-xs bg_light">
                                    {item.department}
                                  </td>
                                  <td className="fs-13 black_300 lh-xs bg_light text-truncate" style={{ maxWidth: "120px" }} title={item.reportto}>
                                    {item.reportto}
                                  </td>
                                  <td className="fs-13 black_300 lh-xs bg_light text-truncate" style={{ maxWidth: "120px" }} title={item.profile}>
                                    {item.profile}
                                  </td>
                                  <td className="fs-13 black_300 lh-xs bg_light">
                                    {item.branch}

                                  </td>




                                  {permission?.permissions.map((item) => {
                                    if (item.module === "User Mangement") {
                                      return item?.submenus?.map((submenu) => {
                                        if (submenu?.module === "User Details" && (submenu?.canUpdate === true || submenu?.canRead === true || submenu?.canDelete === true)) {
                                          return (
                                            <td className="fs-14 text_mute bg_light lh-xs d-flex">
                                              <GateKeeper requiredModule="User Mangement" requiredPermission="all" submenumodule="User Details" submenuReqiredPermission="canRead">

                                                <Link to={`/user/view/${userid}`}
                                                  style={{
                                                    cursor: user.user_status === true ? "pointer" : "not-allowed", // Conditional cursor style
                                                  }}
                                                  disabled={ user.user_status ===true }
                                                >
                                                  <AiFillEye className="me-3 eye_icon" />
                                                </Link>


                                              </GateKeeper>

                                              <GateKeeper requiredModule="User Mangement" requiredPermission="all" submenumodule="User Details" submenuReqiredPermission="canUpdate">

                                                <Link to={`/user/edit/${userid}`}
                                                  style={{
                                                    cursor: user.user_status === true ? "pointer" : "not-allowed", // Conditional cursor style
                                                  }}
                                                  disabled={ user.user_status===true}
                                                >
                                                  <RiEdit2Line className="edit_icon me-3" />
                                                </Link>


                                              </GateKeeper>

                                              <GateKeeper requiredModule="User Mangement" requiredPermission="all" submenumodule="User Details" submenuReqiredPermission="canUpdate">
                                                <div className="form-check form-switch form-switch-right form-switch-md">
                                                  {user.user_status !== undefined && (
                                                    <input
                                                      style={{ cursor: "pointer" }}
                                                      className="form-check-input code-switcher toggle_btn"
                                                      type="checkbox"
                                                      id="FormValidationDefault"
                                                      checked={user.user_status ? true : false}
                                                      onChange={(e) =>
                                                        getDataInModal(
                                                          user.id,
                                                          user.user_status,
                                                          user.user_remarks_history
                                                        )
                                                      }
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#staticBackdrop"
                                                    />
                                                  )}
                                                </div>
                                              </GateKeeper>
                                            </td>
                                          );
                                        }
                                        return null; // Return null when the conditions are not met
                                      });
                                    }
                                    return null;
                                  })}




                                  {/* <td className="fs-14 text_mute bg_light lh-xs d-flex">
                                    <GateKeeper requiredModule="User Mangement" requiredPermission="all" submenumodule="User Details" submenuReqiredPermission="canRead">
                                      <Link to={`/user/view/${userid}`}>
                                        <AiFillEye className="me-3 eye_icon" />
                                      </Link>
                                    </GateKeeper>

                                    <GateKeeper requiredModule="User Mangement" requiredPermission="all" submenumodule="User Details" submenuReqiredPermission="canUpdate">
                                      <Link to={`/user/edit/${userid}`}>
                                        <RiEdit2Line className="edit_icon me-3" />
                                      </Link>
                                    </GateKeeper>

                                    <GateKeeper requiredModule="User Mangement" requiredPermission="all" submenumodule="User Details" submenuReqiredPermission="canUpdate">
                                      <div className="form-check form-switch form-switch-right form-switch-md">
                                        {user.user_status !== undefined && (
                                          <input
                                            style={{ cursor: "pointer" }}
                                            className="form-check-input code-switcher toggle_btn"
                                            type="checkbox"
                                            id="FormValidationDefault"
                                            checked={user.user_status ? true : false}
                                            onChange={(e) =>
                                              getDataInModal(
                                                user.id,
                                                user.user_status,
                                                user.user_remarks_history
                                              )
                                            }
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                          />
                                        )}
                                      </div>
                                    </GateKeeper>
                                  </td> */}


                                </tr >
                              </>
                            );
                          })
                        )
                      ) : (
                        <tr>
                          <td className="fs-13 black_300  lh-xs  bg_light">
                            Sorry! no data found
                          </td>
                        </tr>
                      )}
                      {/* 1st row */}
                    </tbody>
                  </table>
                </div>


                <div className=" mt-3 align-items-center d-flex justify-content-between row text-center text-sm-start">
                  <div className="col-sm">
                    {EnrolledUsers.PaginatedUsers &&
                      EnrolledUsers.PaginatedUsers.length > 0 ? (
                      EnrolledUsers?.loading ? (
                        <div className="text_mute pagination-text">
                          Showing data is Loading ....
                        </div>
                      ) : (
                        <div className="text_mute pagination-text">
                          Showing{" "}
                          <span className="fw-semibold">
                            {EnrolledUsers.startUser}
                          </span>
                          {"  "}
                          to{"  "}
                          <span className="fw-semibold">
                            {EnrolledUsers.endUser}
                          </span>
                          {"  "}
                          of{"  "}
                          <span className="fw-semibold">
                            {"  "}
                            {EnrolledUsers.searchResultUsers}
                          </span>{" "}
                          Results
                        </div>
                      )
                    ) : (
                      <div className="text_mute pagination-text">
                        Showing <span className="fw-semibold">0</span>
                        {"  "}
                        to{"  "}
                        <span className="fw-semibold">0</span>
                        {"  "}
                        of{"  "}
                        <span className="fw-semibold">
                          {"  "}
                          {EnrolledUsers.searchResultUsers}
                        </span>{" "}
                        Results
                      </div>
                    )}

                    {/* <div className="text_mute pagination-text">
                      Showing {" "}
                      <span className="fw-semibold">{EnrolledUsers.startUser}</span>{"  "}
                      to{"  "}
                      <span className="fw-semibold">{EnrolledUsers.endUser}</span>{"  "}
                      of{"  "}
                      <span className="fw-semibold">{"  "}
                        {EnrolledUsers.totalUsers}
                      </span> Results
                    </div> */}
                  </div>
                  <div className="col-sm-auto mt-3 mt-sm-0 d-flex">

                    <div className="mt-2">
                      <select

                        className="form-select form-control me-3 input_bg_color pagination-select"
                        aria-label="Default select example"
                        // placeholder="Branch*"
                        // name="branch"
                        // id="branch"
                        required
                        onChange={HandlePerPage}
                      >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="500">500</option>
                      </select>
                    </div>
                    <ul className="mt-2 pagination pagination-separated pagination-sm mb-0 justify-content-center">
                      {/* <li className={`page-item ${currentPage === 1 ? 'cursor-crosshair' : ' '}  p-1`}>
                        <span  className={`page-link ${currentPage > 1 ? 'cursor-pointer' : ''} `}
                          onClick={previousPage}
                        >
                          ←
                        </span>
                    </li> */}

                      <li className="page-item p-1">
                        <button
                          onClick={previousPage}
                       
                          disabled={
                            EnrolledUsers.loading
                              ? true
                              : false || EnrolledUsers.currentPage === 1
                          }
                          style={{
                            cursor:
                              EnrolledUsers.loading ||
                                EnrolledUsers.currentPage === 1
                                ? "not-allowed"
                                : "auto",
                          }}
                          className={`border border-1 rounded ${EnrolledUsers.loading
                            ? "disabled"
                            : EnrolledUsers.currentPage === 1
                              ? "disabled"
                              : "cursor-auto"
                            }`}
                        >
                          <span className="">←</span>
                        </button>
                      </li>

                      {/* {[...Array(endPage - startPage + 1)].map((_, index) => {
                        const page = startPage + index;
                        return (
                          <li key={page} className={`page-item p-1 ${currentPage === page ? 'active' : ''}`}>
                            <span className="page-link" style={{ cursor: 'pointer' }} onClick={() => changePage(page)}>{page}</span>
                          </li>
                        );
                      })} */}

                      {[...Array(endPage - startPage + 1)].map((_, index) => {
                        const page = startPage + index;
                        return (
                          <li className={`page-item p-1`}>
                            <button
                              key={page}
                              // onClick={() => changePage(page)}
                              onClick={() =>
                                changePage(
                                  currentPage === 1 && page === startPage
                                    ? 1
                                    : page
                                )
                              }
                              disabled={EnrolledUsers.loading ? true : false}
                              className={`border page-link border-1 rounded ${currentPage === page ||
                                (currentPage === 1 && page === startPage)
                                ? "active"
                                : "" 
                                }`}
                            >
                              <span className="">{page} </span>
                            </button>
                          </li>
                        );
                      })}

                      {/* <li className="page-item p-1">
                        <span href="#" className="page-link"
                          onClick={nextPage}
                        >
                          →
                        </span>
                      </li> */}

                      <li className="page-item p-1">
                        <button
                          onClick={nextPage}
                          disabled={
                            EnrolledUsers.loading
                              ? true
                              : false ||
                              EnrolledUsers.currentPage ===
                              EnrolledUsers.totalPages
                          }
                          style={{
                            cursor:
                              EnrolledUsers.loading ||
                                EnrolledUsers.currentPage ===
                                EnrolledUsers.totalPages
                                ? "not-allowed"
                                : "auto",
                          }}
                          className={`border border-1 rounded ${EnrolledUsers.loading
                            ? "disabled"
                            : EnrolledUsers.currentPage ===
                              EnrolledUsers.totalPages
                              ? "disabled"
                              : "cursor-auto"
                            }`}
                        >
                          <span className="">→</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for activating inactivating users */}
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered  ">
          <div class="modal-content">
            {/* <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div> */}
            <div class="modal-body bg_white">
              <div className="d-flex justify-content-between">
              <label className="form-label fs-s fw-medium black_300">
                Enter Remarks* :
              </label>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <textarea
                rows="4"
                cols="10"
                name="comment"
                form="usrform"
                className={
                  error && error.text
                    ? "form-control fs-s bg-form text_color input_bg_color error-input"
                    : "form-control fs-s bg-form text_color input_bg_color"
                }
                placeholder="Enter a message"
                onChange={(e) => setText(e.target.value)}
                value={text}
              ></textarea>
              <div style={{ height: "8px" }}>
                {error && error.text && (
                  <p className="text-danger m-0 fs-xs">{error.text}</p>
                )}
              </div>
            </div>
            <div class="p-2 d-flex justify-content-end bg_white">
              <button
                type="button"
                class="btn btn-secondary me-2"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {userstatus === 0 || userstatus === false ? (
                <button
                  className="btn btn_primary"
                  onClick={() => handleActivate()}
                  data-bs-dismiss={openModal ? "" : "modal"}
                >
                  Activate
                </button>
              ) : null}

              {userstatus === 1 || userstatus === true ? (
                <button
                  className="btn btn_primary"
                  onClick={() => handleInActivate()}
                  data-bs-dismiss={openModal ? "" : "modal"}
                >
                  Deactivate
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default UserData;
