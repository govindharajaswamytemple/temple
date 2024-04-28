import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { HiMiniPlus } from "react-icons/hi2";
import BackButton from "../../../components/backbutton/BackButton";
import "../../../../assets/css/Table.css";

import { DepartmentContext } from "../../../../dataLayer/context/deparmentContext/DepartmentContextProvider";

import { useDepartmentContext } from "../../../../dataLayer/hooks/useDepartmentContext";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../../../components/button/Button";
import Swal from "sweetalert2";
import { usePermissionsProvider } from "../../../../dataLayer/hooks/usePermissionsProvider";
import GateKeeper from "../../../../rbac/GateKeeper";

const Department = () => {
  const { DepartmentState, DispatchDepartment } = useDepartmentContext();
  console.log(DepartmentState.departments, "DepartmentStatedfhfgh");
  const { permission } = usePermissionsProvider();

  const handleDeleteDepartment = async (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this Department",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        let departmentID = { id: id };
        try {
          const { data, status } = await axios.delete(`${process.env.REACT_APP_API_URL}/settings/deletedepartment/${id}`, id)
          console.log(data, status, "seethdsvf");
          if (status === 200) {
            console.log(data, "hellobb");
            DispatchDepartment({
              type: "DELETE_DEPARTMENT",
              payload: departmentID,
            });
            Swal.fire({
              title: "Deleted!",
              text: "Department deleted Successfully.",
              icon: "success"
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    })





  };
  return (
    <div>
      <BackButton heading="Department" content="Back" />
      <div className="container-fluid">
        <div className="card border-0">
          <div className="card-header">
            <div className="d-flex justify-content-end">
              <div>
                <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Departments" submenuReqiredPermission="canCreate">
                  <Button type="button" className="btn btn-sm btn_primary fs-13">
                    <Link to="/settings/departments/new" className="button_color">
                      {<HiMiniPlus />} Add Department
                    </Link>
                  </Button>
                </GateKeeper>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive table-card  border-0">
              <div className="table-container table-scroll">
                <table className="table table-centered align-middle  table-nowrap equal-cell-table table-hover">
                  <thead>
                    <tr className="">
                      <th scope="col" className="fs-13 lh-xs fw-600  ">
                        S.No
                      </th>
                      <th scope="col" className="fs-13 lh-xs  fw-600  ">
                        Name
                      </th>
                      <th scope="col" className="fs-13 lh-xs  fw-600  ">
                        Description
                      </th>
                      <th scope="col" className="fs-13 lh-xs  fw-600  ">
                        Created By
                      </th>
                      <th scope="col" className="fs-13 lh-xs  fw-600 ">
                        Created At
                      </th>
                      {/* <th scope="col" className="fs-13 lh-xs fw-600 ">
                        Actions
                      </th> */}

                      {permission?.permissions.map((item) => {
                        if (item.module === "Settings") {
                          return item?.submenus?.map((submenu) => {
                            if (submenu?.module === "Departments" && (submenu?.canUpdate === true || submenu?.canDelete === true)) {
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
                    {DepartmentState.departments &&
                      DepartmentState?.departments.length > 0 ? (
                      DepartmentState.departments.map((item, index) => {
                        let date = new Date(item.date);
                        const day = date.getUTCDate();
                        const monthIndex = date.getUTCMonth();
                        const year = date.getUTCFullYear();
                        console.log(item.date, "kkrhqjfbewjwgfbewjgbwje");
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
                        
                          const departmentId = item?.id

                        return (
                          <tr>
                            <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                              {index + 1}
                            </td>
                            <td
                              className="fs-13 black_300  lh-xs bg_light text-truncate"
                              style={{ maxWidth: "150px" }}
                              title={item.department_name}
                            >
                              {item.department_name}
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              {item?.description}
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              {item?.createdby}
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              {date}
                            </td>


                            {permission?.permissions.map((item) => {
                              if (item.module === "Settings") {
                                return item?.submenus?.map((submenu) => {
                                  if (submenu?.module === "Departments" && (submenu?.canUpdate === true || submenu?.canDelete === true)) {
                                    return (
                                      <td className="fs-13 black_300  lh-xs bg_light ">

                                        <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Departments" submenuReqiredPermission="canUpdate">
                                          <Link
                                            to={`/settings/departments/edit/${departmentId}`}
                                          >
                                            <RiEdit2Line className="edit_icon table_icons me-3" />
                                          </Link>
                                        </GateKeeper>
                                        <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Departments" submenuReqiredPermission="canDelete">
                                          <MdDelete
                                            className="delete_icon table_icons me-3"
                                            onClick={() => handleDeleteDepartment(departmentId)}
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


                            {/* <td className="fs-13 black_300  lh-xs bg_light ">

                              <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Departments" submenuReqiredPermission="canUpdate">
                                <Link
                                  to={`/settings/departments/edit/${item.id}`}
                                >
                                  <RiEdit2Line className="edit_icon table_icons me-3" />
                                </Link>
                              </GateKeeper>
                              <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Departments" submenuReqiredPermission="canDelete">
                              <MdDelete
                                className="delete_icon table_icons me-3"
                                onClick={() => handleDeleteDepartment(item.id)}
                              />
                            </GateKeeper>
                          </td> */}



                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td className="fs-13 black_300">No Data Found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className=" mt-3 align-items-center d-flex justify-content-between row text-center text-sm-start   ">
              <div className="col-sm">
                <div className="text_mute pagination-text">
                  Showing{" "}
                  <span className="fw-semibold">5</span> of{" "}
                  <span className="fw-semibold">25</span>{" "}
                  Results
                </div>
              </div>
              <div className="col-sm-auto mt-3 mt-sm-0">
                <ul className="mt-2 pagination pagination-separated pagination-sm mb-0 justify-content-center">
                  <li className="page-item disabled p-1">
                    <a href="#" className="page-link rounded ">
                      ←
                    </a>
                  </li>
                  <li className="page-item p-1">
                    <a href="#" className="page-link rounded">
                      1
                    </a>
                  </li>
                  <li className="page-item active p-1">
                    <a href="#" className="page-link  rounded">
                      2
                    </a>
                  </li>
                  <li className="page-item p-1">
                    <a href="#" className="page-link rounded">
                      3
                    </a>
                  </li>
                  <li className="page-item p-1">
                    <a href="#" className="page-link rounded">
                      →
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
export default Department;
