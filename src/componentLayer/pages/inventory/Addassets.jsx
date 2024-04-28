import React from "react";
import "../../../assets/css/Table.css";
import { NavLink } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import { RiEdit2Line } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaArrowDown } from "react-icons/fa6";
import { HiMiniPlus } from "react-icons/hi2";
import "../../../assets/css/Addassests.css";
import BackButton from "../../components/backbutton/BackButton";

function Addassets() {
  return (
    <div>
      {" "}
      <BackButton heading=" Add Asset" content="Back" />
      <div className="container-fluid">
        <div className="card">

          <div className="d-flex justify-content-end mt-2 me-3 ">
            <NavLink
              to="/inventory/addassetsform"
              className="btn btn-sm btn_primary fs-13 mt-2"
            >
              <HiMiniPlus />
              Add Assets
            </NavLink>
          </div>

          <div className="card-body">
            <div className="row d-flex mb-2 ">
              <div className="col-12 col-md-4 col-lg-2 col-xl-2 mb-1">
                <div className="d-flex justify-content-between rounded">
                  <div className="card-body bg_red" style={{cursor:"pointer"}}>
                    <div className="d-flex justify-content-between mb-3">
                      <p className="fw-medium m-0 fw-400 fs-14 black_300">
                        Total Laptops:
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 col-lg-2 col-xl-2 mb-1">
                <div className="card  d-flex justify-content-between bg_white rounded">
                  <div className="card-body bg_subtle" style={{cursor:"pointer"}}>
                    <div className="d-flex justify-content-between mb-3">
                      <p className="fw-medium m-0 fw-400 fs-14 black_300">
                        Total T-shirts
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4 col-lg-2 col-xl-2 mb-1">
                <div className="card d-flex justify-content-between bg_white rounded">
                  <div className="card-body bg_yellow" style={{cursor:"pointer"}}>
                    <div className="d-flex justify-content-between mb-3">
                      <p className="fw-medium black_300 m-0 fw-400 fs-14">
                        Total shirt:
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 col-lg-2 col-xl-2 mb-1">
                <div className="card d-flex justify-content-between bg_white rounded">
                  <div className="card-body bg_infosubtle" style={{cursor:"pointer"}}>
                    <div className="d-flex justify-content-between mb-3">
                      <p className="fw-medium black_300 m-0 fw-400 fs-14">
                        Total Charger:
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="   col-12 col-md-4 col-lg-2 col-xl-2 mb-1">
                <div className="card  d-flex justify-content-between bg_white rounded">
                  <div className="card-body bg_secondary" style={{cursor:"pointer"}}>
                    <div className="d-flex justify-content-between mb-3">
                      <p className=" fw-medium black_300 m-0 fw-400 fs-14">
                        Total Mouse:
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4 col-lg-2 col-xl-2 mb-1">
                <div className="card d-flex justify-content-between bg_white rounded">
                  <div className="card-body bg_infolight" style={{cursor:"pointer"}}>
                    <div className="d-flex justify-content-between mb-3">
                      <p className=" fw-medium black_300 m-0 fw-400 fs-14">
                        Total Bags:
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
              <div className="table-responsive table-scroll table-card border-0 bg_white">
                <table className=" bg_white table table-centered align-middle table-nowrap equal-cell-table table-hover">
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
                      <th scope="col" className="fs-13 lh-xs fw-600  ">
                        ID
                      </th>
                      <th scope="col" className="fs-13 lh-xs  fw-600  ">
                        Name
                      </th>
                      <th scope="col" className="fs-13 lh-xs  fw-600  ">
                        Branch
                      </th>
                      <th scope="col" className="fs-13 lh-xs  fw-600  ">
                        Asset&nbsp;Type
                      </th>
                      <th scope="col" className="fs-13 lh-xs fw-600 ">
                        Brand&nbsp;Name
                      </th>
                      <th scope="col" className="fs-13 lh-xs  fw-600 ">
                        Asset Code
                      </th>
                      <th scope="col" className="fs-13 lh-xs  fw-600 ">
                        Issue Date
                      </th>
                      <th scope="col" className="fs-13 lh-xs  fw-600 ">
                        Quantity
                      </th>
                      <th
                        scope="col"
                        className="fs-13 lh-xs  fw-600  "
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg_white">
                    <tr>
                      <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                        1
                      </td>
                      <td
                        className="fs-13 black_300  lh-xs bg_light text-truncate"
                        style={{ maxWidth: "150px" }}
                      >
                        lipika <br />
                      </td>
                      <td className="fs-13 black_300  lh-xs bg_light">
                        Kukkatpally
                      </td>
                      <td className="fs-13 black_300  lh-xs bg_light">T-shirt</td>
                      <td className="fs-13 black_300  lh-xs bg_light"></td>
                      <td className="fs-13 black_300  lh-xs bg_light ">
                        8208702537
                      </td>
                      <td className="fs-13 black_300  lh-xs  bg_light">
                        12-Mar-2023
                        <br />
                      </td>
                      <td className="fs-13 black_300  lh-xs  bg_light">
                        12-Mar-2023
                        <br />
                      </td>
                      <td className="fs-14 text_mute bg_light lh-xs ">
                        <AiFillEye className="eye_icon table_icons me-3" />
                        <RiEdit2Line className=" edit_icon me-3" />
                        <MdDelete className="delete_icon me-3" />
                        <FaArrowDown className="dwnld_icon" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addassets;
