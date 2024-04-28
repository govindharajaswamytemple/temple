import React, { useContext } from "react";
import "../../../../assets/css/Table.css"
import "../../../../assets/css/Table.css";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { HiMiniPlus } from "react-icons/hi2";
import { BranchContext } from "../../../../dataLayer/context/branchContext/BranchContextProvider";
import { useBranchContext } from "../../../../dataLayer/hooks/useBranchContext";
import { toast } from "react-toastify";
import axios from "axios";
import BackButton from "../../../components/backbutton/BackButton";
import Swal from 'sweetalert2';

import Button from "../../../components/button/Button";
import GateKeeper from "../../../../rbac/GateKeeper";
import { usePermissionsProvider } from "../../../../dataLayer/hooks/usePermissionsProvider";
const Branch = () => {
  const { DispatchBranch, BranchState, getAllBranches } = useBranchContext();
  console.log(BranchState.branches, "kbdvjdj");
  const { permission } = usePermissionsProvider();

  // const handleDeleteBranch = async (id) => {
  //   let branchID = { id: id };
  //   try {
  //     const { data, status } = await toast.promise(
  //       axios.delete(
  //         `${process.env.REACT_APP_API_URL}/settings/deletebranch/${id}`,
  //         id
  //       ),
  //       {
  //         loading: "Loading...",
  //         success: "Branch Deleted Successfully",
  //         error: "Lead not Deleted",
  //       }
  //     );
  //     console.log(data, status, "seethdsvf");

  //     if (status === 200) {
  //       console.log(data, "hellobb");
  //       DispatchBranch({
  //         type: "DELETE_BRANCH",
  //         payload: branchID,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };





  const handleDeleteBranch = async (id) => {
    // Display Swal confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this Branch",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        let branchID = { id: id };
        try {
          const { data, status } = await axios.delete(`${process.env.REACT_APP_API_URL}/settings/deletebranch/${id}`, id)
          console.log(data, status, "seethdsvf");
          if (status === 200) {
            console.log(data, "hellobb");
            DispatchBranch({
              type: "DELETE_BRANCH",
              payload: branchID,
            });
            // Display success Swal alert
            Swal.fire({
              title: "Deleted!",
              text: "Branch deleted Successfully.",
              icon: "success"
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
      <BackButton heading=" Branch" content="Back" />
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
                      <Link to="/settings/branch/new" className="button_color">
                        <HiMiniPlus /> Add Branch
                      </Link>
                    </button> */}
                    <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Branch" submenuReqiredPermission="canCreate">
                      <Button
                        type="button"
                        className="btn btn-sm btn_primary fs-13"
                      >
                        <Link to="/settings/branch/new" className="button_color">
                          {<HiMiniPlus />} Add Branch
                        </Link>
                      </Button>
                    </GateKeeper>

                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive table-card  border-0">
                  <div className=" table-scroll">
                    <table className="table table-centered align-middle  table-nowrap equal-cell-table table-hover">
                      <thead>
                        <tr className="">
                          <th scope="col" className="fs-13 lh-xs fw-600">
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
                          <th scope="col" className="fs-13 lh-xs fw-600 ">
                            Created At
                          </th>
                          {/* <th scope="col" className="fs-13 lh-xs fw-600 ">
                            Actions
                          </th> */}


                          {permission?.permissions.map((item) => {
                            if (item.module === "Settings") {
                              return item?.submenus?.map((submenu) => {
                                if (submenu?.module === "Branch" && (submenu?.canUpdate === true || submenu?.canDelete === true)) {
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
                      <tbody
                        style={{ maxHeight: "400px", overflowY: "auto" }}
                        className=""
                      >
                        {BranchState.branches &&
                          BranchState.branches.length > 0 ? (
                          BranchState.branches.map((item, index) => {
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

                            console.log(item, "fjdfh")
                            const branchid = item?.id

                            return (
                              <tr key={index}>
                                <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                  {index + 1}
                                </td>
                                <td className="fs-13 black_300  lh-xs bg_light">
                                  {item.branch_name}
                                </td>
                                <td className="fs-13 black_300  lh-xs bg_light">
                                  {item.description}
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
                                      if (submenu?.module === "Branch" && (submenu?.canUpdate === true || submenu?.canDelete === true)) {
                                        return (
                                          <td className="fs-13 black_300  lh-xs bg_light ">
                                            <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Branch" submenuReqiredPermission="canCreate">
                                              <Link to={`/settings/branch/edit/${branchid}`}>
                                                <RiEdit2Line className="edit_icon me-3" />
                                              </Link>
                                            </GateKeeper>
                                            <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Branch" submenuReqiredPermission="canCreate">
                                              <MdDelete
                                                className="delete_icon me-3"
                                                onClick={() => handleDeleteBranch(branchid)}
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
                                  <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Branch" submenuReqiredPermission="canCreate">
                                    <Link to={`/settings/branch/edit/${item.id}`}>
                                      <RiEdit2Line className="edit_icon me-3" />
                                    </Link>
                                  </GateKeeper>
                                  <GateKeeper requiredModule="Settings" requiredPermission="all" submenumodule="Branch" submenuReqiredPermission="canCreate">
                                    <MdDelete
                                      className="delete_icon me-3"
                                      onClick={() => handleDeleteBranch(item.id)}
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

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Branch;
