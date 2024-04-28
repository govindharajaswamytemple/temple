import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye } from "react-icons/ai";
import "../../../assets/css/Table.css";
import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { HiMiniPlus } from "react-icons/hi2";
import BackButton from "../../components/backbutton/BackButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Usedebounce from "../../../dataLayer/hooks/useDebounce/Usedebounce";
import Reportsprovider from "./Reportsprovider";
import Swal from "sweetalert2";
import GateKeeper from "../../../rbac/GateKeeper";
import { RiEdit2Line } from "react-icons/ri";
function ReportsData() {
  const navigate = useNavigate();

  const [reports, setReports] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/reports/getreports`)
      .then((response) => {
        if (response.data) {
          setReports(response.data);
          console.log("Fetched reports:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);



  const { reportState, DispatchReports, reportState: { ReportsData } } = Reportsprovider();

  const { debouncesetSearch, debouncesetPage } = Usedebounce(DispatchReports);
  console.log(ReportsData, "vfhdfg")

  const handleSearch = (e) => {
    debouncesetSearch({ context: "SET_REPORT_DATA", data: e.target.value });
  };

  const handlePerPage = (e) => {
    const selectedvalue = parseInt(e.target.value, 10);

    DispatchReports({
      type: "SET_PER_PAGE",
      payload: {
        context: "SET_REPORT_DATA",
        data: selectedvalue,
      },
    });
  };

  let currentPage = ReportsData.page;
  const totalPages = ReportsData.totalPages;

  const changePage = (page) => {
    debouncesetPage({ context: "SET_REPORT_DATA", data: page });
    currentPage = page;
    console.log("Currentpsddagexccx:", page);
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


   // delete start------
   const handleDeleteReport = async (id) => {
    Swal.fire({
        title: `Are you sure?`,
        text: "You won't be able to revert this report",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        if (result.isConfirmed) {
          let reportID = { id: id };
            try {
                const {data, status } = await axios.delete(`${process.env.REACT_APP_API_URL}/reports/deletereport/${id}`);
                
                if (status === 200) {
                    DispatchReports({ type: "DELETE_REPORT", payload: reportID });
                    console.log(data, "hellobb");
                    Swal.fire({
                        title: "Deleted!",
                        text: "Report deleted Successfully.",
                        icon: "success"
                    });
                }
            } catch (error) {
                console.log(error);
            }
            console.log(result, "sriii")
        }
    });

};
// delete end--



  return (
    <div>
      <BackButton heading="Report" content="Back" />
      <div className="container-fluid">
        <div className="card">
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
                  
                  <GateKeeper requiredModule="Reports" submenumodule="Report Data" submenuReqiredPermission="canCreate">
                  <NavLink
                    to="/reports/createreport"
                    className="btn btn_primary fs-13"
                  >
                    <HiMiniPlus /> Add Report
                  </NavLink>
                  </GateKeeper>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive table-card  border-0">
              <div className="table-container table-scroll">
                <table className="table table-centered align-middle  table-nowrap equal-cell-table table-hover">
                  <thead className="table-light">
                    <tr className="shadow-sm bg-body-tertiary rounded">
                      <th scope="col" className="fs-13 lh-xs fw-600">
                        S.No
                      </th>
                      <th scope="col" className="fs-13 lh-xs fw-600 ">
                        Report Name
                      </th>
                      <th scope="col" className="fs-13 lh-xs fw-600">
                        Report Type
                      </th>
                      <th scope="col" className="fs-13 lh-xs fw-600">
                        Created By
                      </th>
                      <th scope="col" className="fs-13 lh-xs fw-600">
                        Created At
                      </th>
                      <GateKeeper requiredModule="Reports" submenumodule="Report Data" submenuReqiredPermission="canDelete">
                      <th scope="col" className="fs-13 lh-xs fw-600 sticky_column">
                        Actions
                      </th>
                      </GateKeeper>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {reports &&
                    reports.map((item, index) => (
                      <tr key={index}>
                        <td className="fs-13 black_300  lh-xs bg_light">
                          {index + 1}
                        </td>
                        {item.reports.map((report, reportIndex) => {
                          let createdAt = report.createdAt.split("T");
                          createdAt = new Date(createdAt);
                          const day = createdAt.getUTCDate();
                          const monthIndex = createdAt.getUTCMonth();
                          const year = createdAt.getUTCFullYear();

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
                          createdAt = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                            }-${year}`;

                          return (
                            <React.Fragment key={reportIndex}>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                <Link to={`/reports/reportview/${item.id}`}>
                                  {report.reportName}
                                </Link>
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                {report.reportType}
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                {report.createdBy}
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                {createdAt}
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                <MdDelete
                                  className="text-danger"
                                />
                              </td>
                            </React.Fragment>
                          );
                        })}
                      </tr>
                    ))} */}

                    {
                      ReportsData.paginatedReportsData && ReportsData.paginatedReportsData.length > 0 ? ReportsData.loading ? "loading..." :

                        ReportsData.paginatedReportsData.map((item, index) => {

                          const data = item.reports[0].reportType;
                          console.log(data, "fjdskfhdfh")

                          let date = new Date(item?.reports[0]?.createdAt);
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

                          return (
                            <tr>

                              <td className="fs-13 black_300  lh-xs bg_light">
                                {(currentPage - 1) *
                                  ReportsData.pageSize +
                                  index +
                                  1}

                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                               
                                {item.reports[0].reportName}
                          
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                {item.reports[0].reportType}
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                {item?.createdBy}
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                {date}
                                {/* {item?.createdAt} */}
                              </td>

                              <GateKeeper requiredModule="Reports" submenumodule="Report Data" submenuReqiredPermission="canDelete">
                              <td className="fs-13 black_300  lh-xs bg_light">
                              <Link to={`/reports/reportview/${item.id}`}>  <RiEdit2Line className="edit_icon me-2" /></Link>
                                <MdDelete
                                  className="text-danger"   onClick={() => handleDeleteReport(item.id)} 
                                />
                                
                              </td>
                              </GateKeeper>
                            </tr>

                          )
                        })

                        :
                        <tr>
                          <td>
                            Sorry! No Data found
                          </td>
                        </tr>
                    }





                  </tbody>
                </table>
              </div>
            </div>
            {/* pagination start */}

            <div className=" mt-3 align-items-center d-flex justify-content-between row text-center text-sm-start   ">
              <div className="col-sm">


                {ReportsData.paginatedReportsData &&
                  ReportsData.paginatedReportsData.length > 0 ? (
                  ReportsData?.loading ? (
                    <div className="text_mute pagination-text">
                      Showing data is Loading ....
                    </div>
                  ) : (
                    <div className="text_mute pagination-text ">
                      Showing{" "}
                      <span className="fw-semibold">
                        {ReportsData.startReportsData}
                      </span>
                      {"  "}
                      to{"  "}
                      <span className="fw-semibold">
                        {ReportsData.endReportsData}
                      </span>
                      {"  "}
                      of{"  "}
                      <span className="fw-semibold">
                        {"  "}
                        {ReportsData.searchResultReportsData}
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
                      {ReportsData.searchResultReportsData}
                    </span>{" "}
                    Results
                  </div>
                )}


              </div>


              <div className="col-sm-auto mt-3 mt-sm-0 d-flex">
              <div className="mt-2">
                    <select
                      className="form-select form-control me-3 input_bg_color pagination-select"
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
                        ReportsData.loading
                          ? true
                          : false || ReportsData.page === 1
                      }
                      style={{
                        cursor:
                          ReportsData.loading ||
                            ReportsData.page === 1
                            ? "not-allowed"
                            : "auto",
                      }}
                      className={`border bg_white border-1 rounded ${ReportsData.loading
                        ? "disabled"
                        : ReportsData.page === 1
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
                          disabled={ReportsData.loading ? true : false}
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
                        ReportsData.loading
                          ? true
                          : false ||
                          ReportsData.page ===
                          ReportsData.totalPages
                      }
                      style={{
                        cursor:
                          ReportsData.loading ||
                            ReportsData.page ===
                            ReportsData.totalPages
                            ? "not-allowed"
                            : "auto",
                      }}
                      className={`border bg_white border-1 rounded ${ReportsData.loading
                        ? "disabled"
                        : ReportsData.page ===
                          ReportsData.totalPages
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

            {/* pagination end */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsData;
