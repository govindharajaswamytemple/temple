import React from "react";
import  "../../../../assets/css/Table.css"
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { HiMiniPlus } from "react-icons/hi2";
import Button from "../../../components/button/Button";
import BackButton from "../../../components/backbutton/BackButton";
const AddVendor = () => {
  return (
    <div>
      <BackButton heading="Add Vendors" content="Back" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="card border-0">
            <div className="card-header">
                <div className="d-flex justify-content-end">
                 
                  
                   
                   
                    <Button
                        type="button"
                        className="btn btn-sm btn_primary fs-13"
                      >
                        <Link to="/settings/addassetstype/new" className="button_color">
                          {<HiMiniPlus />} Add Vendor
                        </Link>
                      </Button>
                 
                 
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive table-card  border-0">
                  <div className=" table-scroll">
                    <table className="table table-centered align-middle  table-nowrap equal-cell-table table-hover">
                      <thead>
                        <tr className="">
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
                            className="fs-13 lh-xs  fw-600 "
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {/* 1st row */}
                        <tr>
                          <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                            01
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            Kukkatpally
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light ">
                            <Link to={`/settings/addvendor/edit`}>
                              <RiEdit2Line className="edit_icon table_icons me-3" />
                            </Link>
                            <MdDelete className="delete_icon table_icons me-3" />
                          </td>
                        </tr>
                        {/* 2nd row */}
                        <tr>
                          <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                            01
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            Kukkatpally
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light ">
                            <Link to={`/settings/addvendor/edit`}>
                              <RiEdit2Line className="edit_icon table_icons me-3" />
                            </Link>
                            <MdDelete className="delete_icon table_icons me-3" />
                          </td>
                        </tr>
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

export default AddVendor;
