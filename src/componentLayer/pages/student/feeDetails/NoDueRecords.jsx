import React from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa";
import Button from "../../../components/button/Button";
const NoDueRecords = () => {
  return (
    <div>
      <div>
        <div className="container-fluid">
          <div className="card border-0">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <h4>Lakshmi Fee Details</h4>
                <Button className="btn btn_primary">Extra Discount</Button>
              </div>
            </div>
            <div className="card-body">
              {/* first table */}
              <div class="table-responsive table-card table-scroll border-0">
                <table className="table table-centered align-middle table-nowrap equal-cell-table table-hover">
                  <thead>
                    <tr className="">
                      <th
                        scope="col"
                        className="fs_13 lh_xs fw_600 black_color "
                      >
                        Total Amount
                      </th>
                      <th
                        scope="col"
                        className="fs_13 lh_xs black_color fw_600  "
                      >
                        Paid Amount
                      </th>
                      <th
                        scope="col"
                        className="fs_13 lh_xs black_color fw_600  "
                      >
                        Due Amount
                      </th>
                      <th
                        scope="col"
                        className="fs_13 lh_xs black_color fw_600  "
                      >
                        Extra Discount
                      </th>
                      <th
                        scope="col"
                        className="fs_13 lh_xs black_color fw_600 "
                      >
                        Paid Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {/* 1st row */}
                    <tr>
                      <td className="fs_13 black_color fw_500 lh_xs bg_light ">
                        24,500
                      </td>
                      <td className="fs_13 black_color  lh_xs bg_light">0</td>
                      <td className="fs_13 black_color  lh_xs bg_light">0</td>
                      <td className="fs_13 black_color  lh_xs bg_light">0</td>
                      <td className="fs_13 black_color  lh_xs bg_light">
                        1/1 <FaCheckCircle />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-5"></div>
              {/* second table */}
              <div className="table-responsive table-card border-0">
                <table className="table table-centered align-middle table-nowrap equal-cell-table">
                  <thead>
                    <tr className="">
                      <th
                        scope="col"
                        className="fs_13 lh_xs fw_600 black_color"
                      >
                        Admission Fee
                      </th>
                      <th
                        scope="col"
                        className="fs_13 lh_xs black_color fw_600 "
                      >
                        Paid Date
                      </th>
                      <th
                        scope="col"
                        className="fs_13 lh_xs black_color fw_600 "
                      >
                        Mode of Payment
                      </th>
                      <th
                        scope="col"
                        className="fs_13 lh_xs black_color fw_600  "
                      >
                        Transition ID
                      </th>
                      <th
                        scope="col"
                        className="fs_13 lh_xs black_color fw_600 "
                      >
                        Invoice
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {/* 1st row */}
                    <tr>
                      <td className="fs_13 black_color fw_500 lh_xs bg_light ">
                        500
                      </td>
                      <td className="fs_13 black_color  lh_xs bg_light">
                        18-Mar-2024
                      </td>
                      <td className="fs_13 black_color  lh_xs bg_light">UPI</td>
                      <td className="fs_13 black_color  lh_xs bg_light">
                        202403181523310045
                      </td>
                      <td className="fs_13 black_color lh_xs bg_light flex-row d-flex">
                        <div
                          className="me-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Admin"
                        >
                          <Link to="/feeadmininvoice">
                            {" "}
                            <FaFileInvoice />{" "}
                          </Link>
                        </div>
                        <div
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Student"
                        >
                          <Link to="/feeadmininvoice">
                            {" "}
                            <FaFileInvoice />{" "}
                          </Link>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-5"></div>
              {/* third table */}
              <div className="table-responsive table-card border-0">
                <table className="table table-centered align-middle table-nowrap equal-cell-table">
                  <thead>
                    <tr className="">
                      <th
                        scope="col"
                        className="fs_13 lh_xs fw_600 black_color "
                      >
                        Installment
                      </th>
                      <th
                        scope="col"
                        className="fs_13 lh_xs black_color fw_600  "
                      >
                        Due Date
                      </th>
                      <th
                        scope="col"
                        className="fs_13 lh_xs black_color fw_600  "
                      >
                        Due Amount
                      </th>
                      <th
                        scope="col"
                        className="fs_13 lh_xs black_color fw_600  "
                      >
                        Paid Date
                      </th>
                      <th
                        scope="col"
                        className="fs_13 lh_xs black_color fw_600 "
                      >
                        Paid Amount
                      </th>
                      <th
                        scope="col"
                        className="fs_13 lh_xs black_color fw_600 "
                      >
                        Mode of Payment
                      </th>
                      <th
                        scope="col"
                        className="fs_13 lh_xs black_color fw_600 "
                      >
                        Transition ID
                      </th>
                      <th
                        scope="col"
                        className="fs_13 lh_xs black_color fw_600 "
                      >
                        Invoice
                      </th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {/* 1st row */}
                    <tr>
                      <td className="fs_13 black_color fw_500 lh_xs bg_light ">
                        Installment 1
                      </td>
                      <td className="fs_13 black_color  lh_xs bg_light">
                        18-Mar-2024
                      </td>
                      <td className="fs_13 black_color  lh_xs bg_light">
                        24,000
                      </td>
                      <td className="fs_13 black_color  lh_xs bg_light">
                        18-Mar-2024
                      </td>
                      <td className="fs_13 black_color  lh_xs bg_light">
                        24,000
                      </td>
                      <td className="fs_13 black_color  lh_xs bg_light">UPI</td>
                      <td className="fs_13 black_color  lh_xs bg_light">
                        202403181523310045
                      </td>
                      <td className="fs_13 black_color  lh_xs bg_light flex-row d-flex">
                        <div
                          className="me-2"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Admin"
                        >
                          <Link to="/feeadmininvoice">
                            {" "}
                            <FaFileInvoice />{" "}
                          </Link>
                        </div>
                        <div
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Student"
                        >
                          <Link to="/feeadmininvoice">
                            {" "}
                            <FaFileInvoice />{" "}
                          </Link>
                        </div>
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
  );
};

export default NoDueRecords;
