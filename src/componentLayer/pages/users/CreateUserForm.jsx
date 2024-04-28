import React, { useEffect, useState } from "react";

import "../../../assets/css/Forms.css";
import { FaArrowRight } from "react-icons/fa";
import { useBranchContext } from "../../../dataLayer/hooks/useBranchContext";
import { useDepartmentContext } from "../../../dataLayer/hooks/useDepartmentContext";
import { useRoleContext } from "../../../dataLayer/hooks/useRoleContext";
import { toast } from "react-toastify";
import axios from "axios";
import Button from "../../components/button/Button";
import { useUserContext } from "../../../dataLayer/hooks/useUserContext";
import { useNavigate, useParams } from "react-router";
import BackButton from "../../components/backbutton/BackButton";

function CreateUserForm() {
  const { DispatchBranch, BranchState, getAllBranches } = useBranchContext();
  const { DispatchDepartment, DepartmentState, getAllDeparments } =
    useDepartmentContext();

  const {
    UsersState,
    UsersState: { TotalUsersWithCountellers, TotalUsersWithOutCountellers },
    getAllUsers,
    DispatchUsers,
  } = useUserContext();

  const { RoleState, DispatchRoleState } = useRoleContext();
  console.log(RoleState, "fjjgdajgf")

  const navigate = useNavigate();
  const { id } = useParams();

  console.log(UsersState, "showusersatevvf");

  const [UsersDropDown, setUsersDropDown] = useState();

  console.log(UsersState.TotalUsers, "dhfkjdfjgdhf");

  // useEffect(() => {
  //   if (id) {
  //     const filtereduserid = UsersState.TotalUsers.find(user => user.user_id === id)
  //     console.log(filtereduserid, "dbjudsvhjvjfv")
  //     setFormData(filtereduserid)
  //   }
  // }, [id]);

  //   useEffect(() => {
  //     if (id && UsersState.TotalUsers.length > 0) {
  //       id = parseInt(id);
  //         const filteredUser = UsersState.TotalUsers.find(user => user.id === id);
  //         console.log(filteredUser, "FilteredUser");
  //         if (filteredUser) {
  //             console.log(filteredUser, "FilteredUser");
  //             setFormData(filteredUser);
  //         } else {
  //             console.log("No user found with the id:", id);
  //         }
  //     }
  // }, [id]);

  useEffect(() => {
    console.log(id, "getuserdata");
    if (id) {
      // Fetch course details for editing
      axios
        .get(`${process.env.REACT_APP_API_URL}/user/viewuser/${id}`)
        .then((response) => {
          setFormData(response?.data?.user);
          console.log(response?.data?.user, "userresponceid");
        })
        .catch((error) => {
          console.error("Error fetching course details:", error);
        });
    }
  }, [id]);

  const [formData, setFormData] = useState({
    branch: "",
    fullname: "",
    email: "",
    phonenumber: "",
    designation: "",
    department: "",
    reportto: "",
    branch: "",
    profile: "",
  });

  const [error, setError] = useState({});

  console.log(formData, "formDatajhdfh");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError((prev) => ({
      ...prev,
      [name]: "", // Reset error for the field being changed
    }));
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullname || formData.fullname.trim() === "") {
      setError((prev) => ({
        ...prev,
        fullname: "Full name required",
      }));
      return;
    } else if (formData.fullname.length <= 2) {
      setError((prev) => ({
        ...prev,
        fullname: "Enter minimum 3 characters",
      }));
      return;
    }

    if (!formData.email || formData.email.trim() === "") {
      setError((prev) => ({
        ...prev,
        email: "Email required",
      }));
      return;
    } else if (formData.email) {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailPattern.test(formData.email)) {
        setError((prev) => ({
          ...prev,
          email: "Enter valid email",
        }));
        return;
      }
    }

    if (!formData.phonenumber || formData.phonenumber.trim() === "") {
      setError((prev) => ({
        ...prev,
        phonenumber: "Phone number required",
      }));
      return;
    } else if (formData.phonenumber.length !== 10) {
      setError((prev) => ({
        ...prev,
        phonenumber: "Incorrect mobile number",
      }));
      return;
    }

    if (!formData.designation || formData.designation.trim() === "") {
      setError((prev) => ({
        ...prev,
        designation: "Designation is required",
      }));
      return;
    } else if (formData.designation.length <= 2) {
      setError((prev) => ({
        ...prev,
        designation: "Enter minimum 3 characters",
      }));
      return;
    }

    if (!formData.department || formData.department.trim() === "") {
      setError((prev) => ({
        ...prev,
        department: "Department is required",
      }));
      return;
    }

    if (!formData.reportto || formData.reportto.trim() === "") {
      setError((prev) => ({
        ...prev,
        reportto: "Report to is required",
      }));
      return;
    }

    if (!formData.profile || formData.profile.trim() === "") {
      setError((prev) => ({
        ...prev,
        profile: "Role is required",
      }));
      return;
    }
    if (!formData.branch || formData.branch.trim() === "") {
      setError((prev) => ({
        ...prev,
        branch: "Branch is required",
      }));
      return;
    }

    let user = {
      branch: formData.branch,
      fullname: formData.fullname,
      email: formData.email,
      phonenumber: formData.phonenumber,
      designation: formData.designation,
      department: formData.department,
      reportto: formData.reportto,
      profile: formData.profile,
      user_remarks_history: [],
    };

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
    console.log(user, "ibdcjsbjvgfjv");

    if (!id) {
      try {
        const { data, status } = await toast.promise(
          axios.post(`${process.env.REACT_APP_API_URL}/user/create-user`, user),
          {
            loading: "Loading...",
            success: "User created Successfully",
            error: "User not Created",
          }
        );
        console.log(data, "hellobb");
        if (status === 200) {
          console.log(data, "hellobb");
          //getAllUsers();
          // DispatchUsers({ type: "CREATE_USER", payload: data });
          //getAllUsers();
          navigate("/user/list");
        }
        if (status === 400) {
          console.log(data, "hellobb");
          //getAllUsers();
          // DispatchUsers({ type: "CREATE_USER", payload: data });
          //getAllUsers();
          // navigate("/user/list");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (id) {
      try {
        const { data, status } = await toast.promise(
          axios.put(
            `${process.env.REACT_APP_API_URL}/user/updateuser/${id}`,
            user
          ),
          {
            loading: "Loading...",
            success: "User Upated Successfully",
            error: "User not Created",
          }
        );

        if (status === 200) {
          // getAllUsers();
          navigate(`/user/list`);
          //DispatchUsers({ type: "CREATE_USER", payload: data });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {id &&  id ? <BackButton heading=  "Edit User Details" content="Back"  /> : <BackButton heading=  "User Form" content="Back"  />}
      <div className="container-fluid">
        <div className="card border-0">
          <div className="align-items-center"></div>
          <div className="card-body">
            <div className="live-prieview">
              <form>
                <div className="row d-flex">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        for="firstNameinput"
                        className="form-label fs-s fw-medium black_300"
                      >
                        Full Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={
                          error && error.fullname
                            ? "form-control fs-s bg-form text_color input_bg_color error-input"
                            : "form-control fs-s bg-form text_color input_bg_color"
                        }
                        placeholder="Enter Full Name"
                        id="firstNameinput"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                      />

                      <div style={{ height: "8px" }}>
                        {error && error.fullname && (
                          <p className="text-danger m-0 fs-xs">
                            {error.fullname}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        for="email"
                        className="form-label fs-s fw-medium black_300"
                      >
                        Email Id<span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className={
                          error && error.email
                            ? "form-control fs-s bg-form text_color input_bg_color error-input"
                            : "form-control fs-s bg-form text_color input_bg_color"
                        }
                        placeholder="Enter Email Id"
                        id="firstNameinput"
                        name="email"
                        value={formData?.email}
                        readOnly={!!id}
                        // disabled={formData.email}
                        onChange={handleChange}
                      />
                      <div style={{ height: "8px" }}>
                        {error && error.email && (
                          <p className="text-danger m-0 fs-xs">{error.email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        for="lastNameinput"
                        className="form-label fs-s fw-medium black_300"
                      >
                        Phone Number<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        maxLength="10"
                        className={
                          error && error.phonenumber
                            ? "form-control fs-s bg-form text_color input_bg_color error-input"
                            : "form-control fs-s bg-form text_color input_bg_color"
                        }
                        placeholder="Enter Phone Number"
                        id="firstNameinput"
                        name="phonenumber"
                        value={formData.phonenumber}
                        onChange={handleChange}
                      />
                      <div style={{ height: "8px" }}>
                        {error && error.phonenumber && (
                          <p className="text-danger m-0 fs-xs">
                            {error.phonenumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        for="lastNameinput"
                        className="form-label fs-s fw-medium black_300"
                      >
                        Designation<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={
                          error && error.designation
                            ? "form-control fs-s bg-form text_color input_bg_color error-input"
                            : "form-control fs-s bg-form text_color input_bg_color"
                        }
                        placeholder="Enter Designation"
                        id="designationNameinput"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                      />
                      <div style={{ height: "8px" }}>
                        {error && error.designation && (
                          <p className="text-danger m-0 fs-xs">
                            {error.designation}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className=" col-md-4 ">
                    <label className="form-label fs-s fw-medium black_300">
                      Department<span className="text-danger">*</span>
                    </label>
                    <select
                      className={
                        error && error.department
                          ? "form-control fs-s bg-form text_color input_bg_color error-input "
                          : "form-control fs-s bg-form text_color input_bg_color select form-select"
                      }
                      aria-label=""
                      placeholder=""
                      name="department"
                      id="department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled selected className="">
                        {" "}
                        Select the Department{" "}
                      </option>
                      {DepartmentState.departments &&
                        DepartmentState.departments.length > 0 &&
                        DepartmentState.departments.map((item, index) => (
                          <option key={index}>{item.department_name}</option>
                        ))}
                    </select>
                    <div style={{ height: "8px" }}>
                      {error && error.department && (
                        <p className="text-danger m-0 fs-xs">
                          {error.department}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className=" col-md-4 ">
                    <label className="form-label fs-s fw-medium black_300">
                      Report To<span className="text-danger">*</span>
                    </label>
                    <select
                      className={
                        error && error.reportto
                          ? "form-control fs-s bg-form text_color input_bg_color error-input "
                          : "form-control fs-s bg-form text_color input_bg_color select form-select"
                      }
                      aria-label="Default select example"
                      placeholder="Report To*"
                      name="reportto"
                      id="reportto"
                      value={formData.reportto}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled selected>
                        {" "}
                        Select the Report To{" "}
                      </option>

                      {TotalUsersWithOutCountellers &&
                        TotalUsersWithOutCountellers.length > 0
                        ? TotalUsersWithOutCountellers.map((item, index) => (
                          <option key={index}>{item.fullname}</option>
                        ))
                        : null}
                      {/* <option >Select Report</option>
                      <option >Report 1</option>
                      <option >Report 2</option> */}
                    </select>
                    <div style={{ height: "8px" }}>
                      {error && error.reportto && (
                        <p className="text-danger m-0 fs-xs">
                          {error.reportto}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className=" col-md-4 ">
                    <label className="form-label fs-s fw-medium black_300">
                      Role<span className="text-danger">*</span>
                    </label>
                    <select
                      className={
                        error && error.profile
                          ? "form-control fs-s bg-form text_color input_bg_color error-input"
                          : "form-control fs-s bg-form text_color input_bg_color select form-select"
                      }
                      aria-label="Default select example"
                      placeholder="profile*"
                      name="profile"
                      id="profile"
                      value={formData.profile}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled selected>
                        {" "}
                        Select the Role{" "}
                      </option>

                      {/* <option value="Admin">Admin</option>
                      <option value="Branch Manager">Branch Manager</option> */}
                      {/* {RoleState?.RolesData?.paginatedRolesData &&
                        RoleState?.RolesData?.paginatedRolesData.length > 0 &&
                        RoleState?.RolesData?.paginatedRolesData.map((item, index) => (
                          <option key={index} value={item.name}>
                            {item?.name}
                          </option>
                        ))} */}


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
                    <div style={{ height: "8px" }}>
                      {error && error.profile && (
                        <p className="text-danger m-0 fs-xs">{error.profile}</p>
                      )}
                    </div>
                  </div>
                  <div className=" col-md-4 ">
                    <label className="form-label fs-s fw-medium black_300">
                      Branch<span className="text-danger">*</span>
                    </label>
                    <select
                      className={
                        error && error.branch
                          ? "form-control fs-s bg-form text_color input_bg_color error-input"
                          : "form-control fs-s bg-form text_color input_bg_color  select form-select"
                      }
                      aria-label="Default select example"
                      // placeholder="branch*"
                      // style={{ color: "black" }}
                      name="branch"
                      id="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                    >
                      <option
                        value=""
                        style={{ opacity: "0.5" }}
                        disabled
                        selected
                      >
                        {" "}
                        Select the Branch{" "}
                      </option>
                      {BranchState.branches &&
                        BranchState.branches.length > 0 &&
                        BranchState.branches.map((item) => (
                          <option>{item.branch_name}</option>
                        ))}
                    </select>
                    <div style={{ height: "8px" }}>
                      {error && error.branch && (
                        <p className="text-danger m-0 fs-xs">{error.branch}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" ">
                  <div className="d-flex justify-content-end mt-3">
                  {id &&  id ?   <Button className={"btn_primary"} onClick={handleSubmit} >Update </Button> :
                   <Button className={"btn_primary"} onClick={handleSubmit} >Submit </Button>
                   
                    }
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUserForm;
