import React, { useContext } from "react";
import "../../../../assets/css/Table.css"
import { Link, NavLink, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { HiMiniPlus } from "react-icons/hi2";
import axios from "axios";
import { toast } from "react-toastify";
import BackButton from "../../../components/backbutton/BackButton";

import { CourseContext } from "../../../../dataLayer/context/courseContext/CourseContextProvider";
import { useCourseContext } from "../../../../dataLayer/hooks/useCourseContext";
import Button from "../../../components/button/Button";
import Swal from "sweetalert2";
import { usePermissionsProvider } from "../../../../dataLayer/hooks/usePermissionsProvider";
import GateKeeper from "../../../../rbac/GateKeeper";

const Course = () => {
  const { DispatchCourse, courseState, getAllCourses } = useCourseContext();
  const { permission } = usePermissionsProvider();

  const handleDeleteCourse = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this Course",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        let courseID = { id: id };
        try {
          const { data, status } = await axios.delete(`${process.env.REACT_APP_API_URL}/settings/deletecourse/${id}`, id)
          console.log(data, status, "seethdsvf");
          if (status === 200) {
            console.log(data, "hellobb");
            DispatchCourse({ type: "DELETE_COURSE", payload: courseID });
            Swal.fire({
              title: "Deleted!",
              text: "Course deleted Successfully.",
              icon: "success"
            });
          }
        } catch (error) {
          console.log(error);
        }

      }
    })


  };


  // let courseID = { id: id };
  // try {
  //   const { data, status } = await toast.promise(
  //     axios.delete(`${process.env.REACT_APP_API_URL}/settings/deletecourse/${id}`, id),
  //     {
  //       loading: "Loading...",
  //       success: "Course Deleted Successfully",
  //       error: "Course not Deleted",
  //     }
  //   );
  //   console.log(data, status, "seethdsvf");

  //   if (status === 200) {
  //     console.log(data, "hellobb");
  //     DispatchCourse({ type: "DELETE_COURSE", payload: courseID });
  //   }
  // } catch (error) {
  //   console.log(error);
  // }


  return (
    <div>
      <BackButton heading="Course" content="Back" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card border-0">
              <div className="card-header">
                <div className="d-flex justify-content-end">

                  <div>
                    {/* <button
                      type="button"
                      className="btn btn_primary add-btn fs-13 "
                    >
                      <Link to="/settings/courses/new" className="button_color">
                        <HiMiniPlus /> Add Course
                      </Link>
                    </button> */}
                    <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Courses" submenuReqiredPermission="canCreate">
                      <Button
                        type="button"
                        className="btn btn-sm btn_primary fs-13"
                      >
                        <Link to="/settings/courses/new" className="button_color">
                          {<HiMiniPlus />} Create Course
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
                          <th
                            scope="col"
                            className="fs-13 lh-xs fw-600  "
                          >
                            S.No
                          </th>
                          <th
                            scope="col"
                            className="fs-13 lh-xs  fw-600  "
                          >
                            Course Name
                          </th>
                          <th
                            scope="col"
                            className="fs-13 lh-xs  fw-600  "
                          >
                            Course Package
                          </th>
                          <th
                            scope="col"
                            className="fs-13 lh-xs  fw-600  "
                          >
                            Fee
                          </th>
                          <th
                            scope="col"
                            className="fs-13 lh-xs  fw-600  "
                          >
                            Max Discount
                          </th>
                          <th
                            scope="col"
                            className="fs-13 lh-xs  fw-600 "
                          >
                            Create At
                          </th>
                          {/* <th
                            scope="col"
                            className="fs-13 lh-xs fw-600 "
                          >
                            Actions
                          </th> */}

                          {permission?.permissions.map((item) => {
                            if (item.module === "Settings") {
                              return item?.submenus?.map((submenu) => {
                                if (submenu?.module === "Courses" && (submenu?.canUpdate === true || submenu?.canDelete === true)) {
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
                      <tbody className="scrollable-body">
                        {courseState.courses &&
                          courseState.courses.length > 0 ? (
                          courseState.courses.map((item, index) => {
                            let date = new Date(item.date);
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

                              const courseid =item?.id

                            return (
                              <tr>
                                <td className="fs-13 black_300 fw_500 lh-xs bg_light ">
                                  {index + 1}
                                </td>
                                <td className="fs-13 black_300  lh-xs bg_light  text-truncate" style={{ maxWidth: "150px" }} title={item.course_name}>
                                  {item.course_name}
                                </td>
                                <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "150px" }} title={item.course_package}>
                                  {item.course_package}
                                </td>
                                <td className="fs-13 black_300  lh-xs bg_light">
                                  {item.fee}
                                </td>
                                <td className="fs-13 black_300  lh-xs bg_light">
                                  {item.max_discount}
                                </td>
                                <td className="fs-13 black_300  lh-xs bg_light">
                                  {date}
                                </td>

                                {permission?.permissions.map((item) => {
                                  if (item.module === "Settings") {
                                    return item?.submenus?.map((submenu) => {
                                      if (submenu?.module === "Courses" && (submenu?.canUpdate === true || submenu?.canDelete === true)) {
                                        return (
                                          <td className="fs-13 black_300  lh-xs bg_light ">
                                            <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Courses" submenuReqiredPermission="canUpdate">
                                              <NavLink
                                                to={`/settings/courses/edit/${courseid}`}
                                              >
                                                <RiEdit2Line className="edit_icon table_icons me-3" />
                                              </NavLink>
                                            </GateKeeper>

                                            <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Courses" submenuReqiredPermission="canDelete">
                                              <MdDelete
                                                className="delete_icon table_icons me-3"
                                                onClick={(e) => handleDeleteCourse(courseid)}
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
                                <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Courses" submenuReqiredPermission="canUpdate">
                                  <NavLink
                                    to={`/settings/courses/edit/${item.id}`}
                                  >
                                    <RiEdit2Line className="edit_icon table_icons me-3" />
                                  </NavLink>
                                  </GateKeeper>

                                  <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Courses" submenuReqiredPermission="canDelete">
                                  <MdDelete
                                    className="delete_icon table_icons me-3"
                                    onClick={(e) => handleDeleteCourse(item.id)}
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
                        <a href="#" className="page-link rounded">
                          ←
                        </a>
                      </li>
                      <li className="page-item p-1">
                        <a href="#" className="page-link rounded">
                          1
                        </a>
                      </li>
                      <li className="page-item active p-1">
                        <a href="#" className="page-link rounded">
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
        </div>
      </div>
    </div>
  );
};
export default Course;
