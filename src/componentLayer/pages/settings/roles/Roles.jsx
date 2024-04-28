import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../../assets/css/Table.css"
import { MdDelete, MdEdit, MdOutlineEdit } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { HiMiniPlus } from "react-icons/hi2";
// import { RoleContext } from "../../../../dataLayer/context/roleContext/RoleContextProvider";
// import { RoleContext } from "../../../../dataLayer/context/roleContext/RoleContextProvider";
import { RoleContext } from "../../../../dataLayer/context/roleContext/RoleContextProvider";

import { useRoleContext } from "../../../../dataLayer/hooks/useRoleContext";
import Button from "../../../components/button/Button";
import BackButton from "../../../components/backbutton/BackButton";
import { MdFilterList } from "react-icons/md";
import Usedebounce from "../../../../dataLayer/hooks/useDebounce/Usedebounce";
import Swal from "sweetalert2";
import axios from "axios";
import GateKeeper from "../../../../rbac/GateKeeper";
import { usePermissionsProvider } from "../../../../dataLayer/hooks/usePermissionsProvider";
const Roles = () => {
  const { RoleState, DispatchRoleState, getAllPaginatedRoles, RoleState: { RolesData } } = useRoleContext();
  console.log(RoleState, "sfhgdjgfd")
  const { permission } = usePermissionsProvider();

  console.log(permission, "dgjfg")


  const { debouncesetSearch, debouncesetPage } = Usedebounce(DispatchRoleState);

  const handleSearch = (e) => {
    debouncesetSearch({ context: "SET_ROLES_DATA", data: e.target.value });
  };

  const handlePerPage = (e) => {
    const selectedvalue = parseInt(e.target.value, 10);

    DispatchRoleState({
      type: "SET_PER_PAGE",
      payload: {
        context: "SET_ROLES_DATA",
        data: selectedvalue,
      },
    });
  };

  let currentPage = RolesData.page;
  const totalPages = RolesData.totalPages;

  const changePage = (page) => {
    debouncesetPage({ context: "SET_ROLES_DATA", data: page });
    currentPage = page;
    console.log("Currentpagexccx:", page);
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
    debouncesetSearch({ context: "SET_ROLES_DATA", data: "" });
    debouncesetPage({ context: "SET_ROLES_DATA", data: 1 })
    DispatchRoleState({
      type: "SET_PER_PAGE",
      payload: {
        context: "SET_ROLES_DATA",
        data: 10,
      },
    });

  }, [])


  const handleDeleteRole = async (id) => {
    // Display Swal confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this Role",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        let roleID = { id: id };
        try {
          const { data, status } = await axios.delete(`${process.env.REACT_APP_API_URL}/roles/deleteRole/${id}`, id)
          console.log(data, status, "seethdsvf");



          Swal.fire({
            title: "Deleted!",
            text: "Role deleted Successfully.",
            icon: "success"
          });
          if (status === 200) {
            console.log(data, "hellobb");
            DispatchRoleState({
              type: "DELETE_ROLE",
              payload: roleID,
            });

          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };




  return (
    <div>
      <BackButton heading=" Roles" content="Back" />
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
                        className="form-control search input_bg_color text_color"
                        placeholder="Search for..."
                        name="search"
                        required
                        onChange={handleSearch}

                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="buttons_alignment">
                      <div className="fs-13 me-3 ">
                        {/* {EnrolledStudents.searchResultStudents}/{EnrolledStudents.totalStudents} */}
                      </div>
                     

                      {/* <button
                        className="btn btn-sm btn_primary fs-13 me-1 mt-2 margin_top_12"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      >
                        <MdFilterList className="me-1 mb-1" />
                        Filters
                      </button> */}
                      <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Roles" submenuReqiredPermission="canCreate">
                        <Button
                          type="button"
                          className="btn btn-sm btn_primary fs-13 mt-2 margin_top_12"
                        >
                          <Link to="/settings/roles/new" className="button_color">
                            {<HiMiniPlus />} Add Role
                          </Link>
                        </Button>
                      </GateKeeper>
                    </div>
                  </div>
                </div>

                {/* <div
                  className="offcanvas offcanvas-end bg_light "
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
                   
                    <div className="">
                      <label className="form-label fs-s fw-medium text_color">
                        Profile
                      </label>
                      <select
                      
                        className="form-select form-control bg_input input_bg_color black_300 select"
                        aria-label="Default select example"
                        placeholder="profile*"
                        id="profile"
                        required
                        name="profile"
                        value=""
                        onChange=""
                      >
                        <option value="" disabled selected>
                         Select the  Role
                        </option>
                       
                      </select>
                    </div>
                   
                    <div className="mt-2">
                      <label className="form-label fs-s fw-medium txt-color text_color">
                        Branch
                      </label>
                      <select
                        className="form-select form-control bg_input input_bg_color black_300 select"
                        aria-label="Default select example"
                        placeholder="Branch*"
                        id="branch"
                        required
                        name="branch"
                        value=""
                        onChange=""
                      >
                        <option value="" disabled selected>
                          {" "}
                          Select the Branch{" "}
                        </option>
                       
                      </select>
                    </div>
                    
                    <div className="mt-2">
                      <label className="form-label fs-s fw-medium txt-color text_color">
                        Department
                      </label>
                      <select
                        className="form-select form-control bg_input input_bg_color black_300 select"
                        aria-label="Default select example"
                        placeholder="department*"
                        id="department"
                        required
                        name="department"
                        value=""
                        onChange=""
                      >
                        <option value="" disabled selected>
                          {" "}
                          Select the Department{" "}
                        </option>
                        
                      </select>
                    </div>
                    <div>
                      <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                        <Button
                          className="btn btn_primary "
                          onClick=""
                        >
                          Clear
                        </Button>
                      </div>
                      <div className="position-absolute bottom-0 end-0 me-2 mb-2">
                        <Button
                          className="btn btn_primary"
                          onClick=""
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>


              <div className="card-body">
                <div className="table-responsive table-card border-0">
                  <div className="table-container table-scroll">
                    <table className="table table-centered align-middle table-nowrap equal-cell-table table-hover">
                      <thead>
                        <tr className="">
                          <th
                            scope="col"
                            className="fs-13 lh_xs fw-600 "
                          >
                            S.No
                          </th>
                          <th
                            scope="col"
                            className="fs-13 lh_xs  fw-600  "
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="fs-13 lh_xs  fw-600  "
                          >
                            Description
                          </th>
                          <th
                            scope="col"
                            className="fs-13 lh_xs  fw-600  "
                          >
                            Create By
                          </th>
                          <th
                            scope="col"
                            className="fs-13 lh_xs  fw-600 "
                          >
                            Create At
                          </th>



                          {permission?.permissions.map((item) => {
                            if (item.module === "Settings") {
                              return item?.submenus?.map((submenu) => {
                                if (submenu?.module === "Roles" && (submenu?.canUpdate === true || submenu?.canDelete === true)) {
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
                        {
                          RolesData?.paginatedRolesData && RolesData?.paginatedRolesData?.length > 0 ? RolesData?.loading ? "loading.." :
                            RolesData?.paginatedRolesData?.map((item, index) => {

                              let date = new Date(item.createdAt);
                              const day = date.getUTCDate();
                              const monthIndex = date.getUTCMonth();
                              const year = date.getUTCFullYear();

                              const monthAbbreviations = [
                                "Jan",
                                "Feb",
                                "Mar",
                                "Apr",
                                "May",
                                "Jun",
                                "Jul",
                                "Aug",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dec",
                              ];

                              // Formatting the date
                              date = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                                }-${year}`;
                              const roleid = item?.id
                              return (
                                <tr>
                                  <td className="fs-13 black_300 fw_500 lh_xs bg_light ">
                                    {(currentPage - 1) *
                                      RolesData.pageSize +
                                      index +
                                      1}
                                  </td>
                                  <td className="fs-13 black_300  lh_xs bg_light">
                                    {item.name}
                                  </td>
                                  <td className="fs-13 black_300  lh_xs bg_light">
                                    {item.description}
                                  </td>
                                  <td className="fs-13 black_300  lh_xs bg_light">
                                    {item.createdBy}
                                  </td>
                                  <td className="fs-13 black_300  lh_xs bg_light">
                                    {date}
                                  </td>

                                  {permission?.permissions.map((item) => {
                                    if (item.module === "Settings") {
                                      return item?.submenus?.map((submenu) => {
                                        if (submenu?.module === "Roles" && (submenu?.canUpdate === true || submenu?.canDelete === true)) {
                                          return (
                                            <td className="fs-13 black_300  lh_xs bg_light ">
                                            <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Roles" submenuReqiredPermission="canUpdate">
                                              <Link to={`/settings/roles/edit/${roleid}`}>
                                                <RiEdit2Line className=" edit_icon me-3" />
                                              </Link>
                                            </GateKeeper>
        
                                            <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Roles" submenuReqiredPermission="canDelete">
                                              <MdDelete className="delete_icon table_icons me-3"
                                                onClick={() => handleDeleteRole(roleid)}
                                              />
                                            </GateKeeper>
                                          </td>
                                          );
                                        }
                                        return null; // Return null when the conditions are not met
                                      });
                                    }
                                    return null;
                                  })}


                                  {/* <td className="fs-13 black_300  lh_xs bg_light ">
                                    <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Roles" submenuReqiredPermission="canUpdate">
                                      <Link to={`/settings/roles/edit/${item.id}`}>
                                        <RiEdit2Line className=" edit_icon me-3" />
                                      </Link>
                                    </GateKeeper>

                                    <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Roles" submenuReqiredPermission="canDelete">
                                      <MdDelete className="delete_icon table_icons me-3"
                                        onClick={() => handleDeleteRole(item.id)}
                                      />
                                    </GateKeeper>
                                  </td> */}

                                </tr>

                              )

                            })
                            :
                            <tr>
                              <td className="fs-13 black_300 fw_500 lh_xs bg_light ">
                                Sorry! No data found
                              </td>
                            </tr>
                        }



                      </tbody>
                    </table>
                  </div>

                </div>

                <div className=" mt-3 align-items-center d-flex justify-content-between row text-center text-sm-start   ">
                  <div className="col-sm">


                    {RolesData.paginatedRolesData &&
                      RolesData.paginatedRolesData.length > 0 ? (
                      RolesData?.loading ? (
                        <div className="text_mute pagination-text">
                          Showing data is Loading ....
                        </div>
                      ) : (
                        <div className="text_mute pagination-text ">
                          Showing{" "}
                          <span className="fw-semibold">
                            {RolesData.startRole}
                          </span>
                          {"  "}
                          to{"  "}
                          <span className="fw-semibold">
                            {RolesData.endRole}
                          </span>
                          {"  "}
                          of{"  "}
                          <span className="fw-semibold">
                            {"  "}
                            {RolesData.searchResultRoles}
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
                          {RolesData.searchResultRoles}
                        </span>{" "}
                        Results
                      </div>
                    )}


                  </div>


                  <div className="col-sm-auto mt-3 mt-sm-0 d-flex">
                  <div className="mt-2">
                        <select
                          className="form-select form-control me-3 input_bg_color text_color pagination-select"
                          aria-label="Default select example"
                          placeholder="Branch*"
                          name="branch"
                          id="branch"
                          required
                          onChange={handlePerPage}
                        >
                          <option value="10">10</option>
                          <option value="20">20</option>
                          <option value="30">30</option>
                          <option value="40">40</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                          <option value="150">150</option>
                          <option value="200">200</option>
                          <option value="500">500</option>
                          <option value="750">750</option>
                        </select>
                      </div>
                    <ul className="mt-2 pagination pagination-separated pagination-sm mb-0 justify-content-center">

                      <li className="page-item p-1 bg_white">
                        <button
                          onClick={previousPage}
                          disabled={
                            RolesData.loading
                              ? true
                              : false || RolesData.page === 1
                          }
                          style={{
                            cursor:
                              RolesData.loading ||
                                RolesData.page === 1
                                ? "not-allowed"
                                : "auto",
                          }}
                          className={`border bg_white border-1 rounded ${RolesData.loading
                            ? "disabled"
                            : RolesData.page === 1
                              ? "disabled"
                              : "cursor-auto"
                            }`}
                        >
                          <span className="text_color">←</span>
                        </button>
                      </li>

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
                              disabled={RolesData.loading ? true : false}
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

                      <li className="page-item p-1 bg_white">
                        <button
                          onClick={nextPage}
                          disabled={
                            RolesData.loading
                              ? true
                              : false ||
                              RolesData.page ===
                              RolesData.totalPages
                          }
                          style={{
                            cursor:
                              RolesData.loading ||
                                RolesData.page ===
                                RolesData.totalPages
                                ? "not-allowed"
                                : "auto",
                          }}
                          className={`border bg_white border-1 rounded ${RolesData.loading
                            ? "disabled"
                            : RolesData.page ===
                              RolesData.totalPages
                              ? "disabled"
                              : "cursor-auto"
                            }`}
                        >
                          <span className="text_color ">→</span>
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
    </div>

  );
};

export default Roles;
