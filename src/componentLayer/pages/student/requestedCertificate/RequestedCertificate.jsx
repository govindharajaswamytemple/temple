import React, { useEffect, useState } from "react";
import "../../../../assets/css/Table.css";
import { AiFillEye } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { MdLocalPrintshop } from "react-icons/md";
import { FaRegIdCard } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { HiMiniPlus } from "react-icons/hi2";
import BackButton from "../../../components/backbutton/BackButton";
import { MdFilterList } from "react-icons/md";
import { useStudentsContext } from "../../../../dataLayer/hooks/useStudentsContext";
import { PiCertificateBold } from "react-icons/pi";
import Usedebounce from "../../../../dataLayer/hooks/useDebounce/Usedebounce";
import { useBranchContext } from "../../../../dataLayer/hooks/useBranchContext";
import { useCourseContext } from "../../../../dataLayer/hooks/useCourseContext";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../../../components/button/Button";
import GateKeeper from "../../../../rbac/GateKeeper";

function RequestedCertificate() {
  const {
    studentState,
    studentState: { Requested_CertificateStudents },
    Dispatchstudents,
    getPaginatedCertificateData,
  } = useStudentsContext();
  const { DispatchBranch, BranchState, getAllBranches } = useBranchContext();
  const { courseState } = useCourseContext();

  console.log(
    Requested_CertificateStudents,
    "Requested_CertificateStudentsher"
  );

  // handle Certificate Request

  const handleRequest = async (
    studentid,
    courseStartDate,
    courseEndDate,
    requestedDate,
    currentDate
  ) => {
    //item.id,courseStartDate,courseEndDate,requestedDate,currentDate

    let certificate_status = [
      {
        courseStartDate: courseStartDate,
        courseEndDate: courseEndDate,
        certificateStatus: "issued",
        RequestedDate: requestedDate,
        issuedDate: currentDate,
      },
    ];
    const updatedData = {
      certificate_status,
    };

    const uploadcontext = { certificate_status, studentid };

    console.log(uploadcontext, "uploadcontexthdg");

    console.log("certificate_status", updatedData);
    console.log("id", studentid);

    try {
      const { data, status } = await toast.promise(
        //
        axios.put(
          `${process.env.REACT_APP_API_URL}/sc/certificatestatus/${studentid}`,
          updatedData
        ),
        {
          loading: "Loading...",
          success: "Certificate Issued Successfully",
          error: "Something went wrong Please try again",
        }
      );

      if (status === 200) {
        console.log(updatedData, "dvfjdfgdsghf");
        Dispatchstudents({
          type: "UPDATE_CERTIFICATE_STATUS",
          payload: {
            context: "REQUESTED_CERTIFICATE_STUDENTS",
            data: uploadcontext,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //here adding the filters

  const { debouncesetSearch, debouncesetPage } = Usedebounce(Dispatchstudents);

  const handleSearch = (e) => {
    debouncesetSearch({
      context: "REQUESTED_CERTIFICATE_STUDENTS",
      data: e.target.value,
    });
  };

  const handlePerPage = (e) => {
    const selectedvalue = parseInt(e.target.value, 10);

    console.log(selectedvalue, "hdjfgsdhf");
    Dispatchstudents({
      type: "SET_PER_PAGE",
      payload: {
        context: "REQUESTED_CERTIFICATE_STUDENTS",
        data: selectedvalue,
      },
    });
  };

  // filter

  const [filterCriteria, setfilterCriteria] = useState({
    fromDate: "",
    toDate: "",
    course: "",
    branch: "",
  });

  console.log(filterCriteria, "herervvvvadvvcvm");

  const HandleFilterCertria = (e) => {
    const { name, value } = e.target;
    setfilterCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const FilterReset = () => {
    setfilterCriteria({
      fromDate: "",
      toDate: "",
      course: "",
      branch: "",
    });
  };

  const filterSubmit = () => {
    console.log("filterCrddddgiteria", filterCriteria);
    Dispatchstudents({
      type: "SET_FILTERS",
      payload: {
        context: "REQUESTED_CERTIFICATE_STUDENTS",
        data: {
          fromDate: filterCriteria.fromDate,
          toDate: filterCriteria.toDate,
          course: filterCriteria.course,
          branch: filterCriteria.branch,
        },
      },
    });
  };

  useEffect(() => {
    debouncesetSearch({ context: "REQUESTED_CERTIFICATE_STUDENTS", data: "" });
    debouncesetPage({ context: "REQUESTED_CERTIFICATE_STUDENTS", data: 1 });
    Dispatchstudents({
      type: "SET_FILTERS",
      payload: {
        context: "REQUESTED_CERTIFICATE_STUDENTS",
        data: {
          fromDate: "",
          toDate: "",
          course: "",
          branch: "",
        },
      },
    });

    Dispatchstudents({
      type: "SET_PER_PAGE",
      payload: {
        context: "REQUESTED_CERTIFICATE_STUDENTS",
        data: 10,
      },
    });
  }, []);

  //here the pagination

  let currentPage = Requested_CertificateStudents.currentPage;
  const totalPages = Requested_CertificateStudents.totalPages;

  console.log(
    currentPage,
    totalPages,
    "cuurentpdgfgageherdfdfe ",
    Requested_CertificateStudents.currentPage
  );

  const changePage = (page) => {
    debouncesetPage({ context: "REQUESTED_CERTIFICATE_STUDENTS", data: page });
    currentPage = page;
    // setCurrentPage(page);
    // Add your logic here to handle page change
    console.log("Currentcpage:", page);
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
  

  return (
    <div>
       <BackButton heading=" Requested Certificate" content="Back" to="/" />
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
                        className="form-control search text_color bg_input_color"
                        placeholder="Search for..."
                        name="search"
                        required
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="buttons_alignment">
                      <div className="fs-13 me-3 mt-2">{/* 10/40 */}</div>
                     
                      <button
                        className="btn btn-sm btn_primary fs-13 me-1 margin_top_12"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      >
                        <MdFilterList className="me-1 mb-1" />
                        Filters
                      </button>

                      <GateKeeper requiredModule="Student Management" submenumodule="Issued Certificate" submenuReqiredPermission="canRead">
                      <button
                        type="button"
                        className="btn btn_primary btn-sm fs-13 margin_top_12"
                      >
                        <Link
                          to="/student/issuedcertificates"
                          className="btn_primary"
                        >
                       
                          <PiCertificateBold className="me-1 mb-1" />
                          Issued Certificates
                        </Link>
                      </button>
                      </GateKeeper>
                    </div>
                  </div>
                </div>
                <div
                  className="offcanvas offcanvas-end bg_white"
                  id="offcanvasRight"
                  aria-labelledby="offcanvasRightLabel"
                >
                  <div className="offcanvas-header">
                    <h5
                      className="offcanvas-title text_color"
                      id="offcanvasRightLabel"
                    >
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
                    {/* from calendar */}
                    <div className="form-group text-start">
                      <label
                        className="form-label fs-s text_color"
                        for="example-text-input "
                      >
                        From Date
                      </label>
                      <input
                        className="form-control fs-s bg-form text_color input_bg_color date_input_color"
                        type="date"
                        id="exampleInputdate"
                        name="fromDate"
                        value={filterCriteria.fromDate}
                        onChange={HandleFilterCertria}
                        required
                      />
                    </div>
                    {/* to calendar */}
                    <div className="form-group text-start mt-2">
                      <label
                        className="form-label fs-s text_color"
                        for="example-text-input "
                      >
                        To Date
                      </label>
                      <input
                        className="form-control fs-s bg-form date_input_color"
                        type="date"
                        id="exampleInputdate"
                        value={filterCriteria.toDate}
                        onChange={HandleFilterCertria}
                        name="toDate"
                        required
                      />
                    </div>
                    {/* course */}
                    <div className="">
                      <label className="form-label fs-s fw-medium text_color">
                        Course
                      </label>
                      <select
                        className="form-select form-control text_color input_bg_color select"
                        aria-label="Default select example"
                        placeholder="course*"
                        name="course"
                        id="course"
                        value={filterCriteria.course}
                        onChange={HandleFilterCertria}
                        required
                      >
                        <option value="" disabled selected>
                          {" "}
                          Select the Course{" "}
                        </option>
                        {courseState.courses && courseState.courses.length > 0
                          ? courseState.courses.map((item, index) => (
                            <option key={index} value={item.course_name}>
                              {item.course_name}
                            </option>
                          ))
                          : null}
                      </select>
                    </div>
                    {/* branch */}
                    <div className="mt-2">
                      <label className="form-label fs-s fw-medium text_color">
                        Branch
                      </label>
                      <select
                        className="form-select form-control text_color input_bg_color select"
                        aria-label="Default select example"
                        placeholder="Branch*"
                        name="branch"
                        id="branch"
                        value={filterCriteria.branch}
                        onChange={HandleFilterCertria}
                        required
                      >
                        <option value="" disabled selected>
                          {" "}
                          Select the Branch{" "}
                        </option>
                        {BranchState.branches && BranchState.branches.length > 0
                          ? BranchState.branches.map((item, index) => (
                            <option key={index} value={item.fullname}>
                              {item.branch_name}
                            </option>
                          ))
                          : null}
                      </select>
                    </div>
                    <div>
                      <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                        <button
                          className="btn btn_primary"
                          onClick={FilterReset}  
                        >
                          Clear
                        </button>
                      </div>
                      <div className="position-absolute bottom-0 end-0 me-2 mb-2">
                        <button
                          className="btn btn_primary"
                          onClick={filterSubmit}  
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
            
                  <div className="table-container table-scroll table-responsive table-card  border-0">
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
                          Name
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600  "
                        >
                          Course
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs fw-600  "
                        >
                          Registration ID
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600 "
                        >
                          Course StartDate
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600 "
                        >
                          Course EndDate
                        </th>
                        <GateKeeper requiredModule="Student Management" submenumodule="Requested Certificate" submenuReqiredPermission="canUpdate">
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600 "
                        >
                          Certificate
                        </th>
                        </GateKeeper>
                      </tr>
                    </thead>
                    <tbody className="">
                      {Requested_CertificateStudents.Paginated_Requested_CertificateStudents &&
                        Requested_CertificateStudents
                          .Paginated_Requested_CertificateStudents.length > 0 ? (
                        Requested_CertificateStudents.loading ? (
                          "loading ..."
                        ) : (
                          Requested_CertificateStudents.Paginated_Requested_CertificateStudents.map(
                            (item, index) => {
                              const currentDate = new Date()
                                .toISOString()
                                .split("T")[0];

                              let certificateStatusObj =
                                item.certificate_status;
                              // checking data
                              if (typeof certificateStatusObj === "string") {
                                certificateStatusObj =
                                  JSON.parse(certificateStatusObj);
                              }
                              console.log(certificateStatusObj, "seessthat");
                              // requested Date
                              const requestedDate = certificateStatusObj
                                .map((item) => item.RequestedDate)
                                .join(", ");

                              // CourseStartDate
                              const courseStartDate = certificateStatusObj
                                .map((item) => item.courseStartDate)
                                .join(", ");
                              console.log(courseStartDate, "courseStartDatejh");
                              //CourseEndDate
                              const courseEndDate = certificateStatusObj
                                .map((item) => item.courseEndDate)
                                .join(", ");
                              console.log(courseEndDate, "courseEndDatedf");
                              // certificate Status
                              const certificateStatus = certificateStatusObj
                                .map((item) => item.certificateStatus)
                                .join(", ");
                              console.log(
                                certificateStatus,
                                "certificateStadftus"
                              );

                              // RequestedDate

                              // RequestedDate

                              let formattedRequestedDate = new Date(requestedDate);
                              const requestedDateday = formattedRequestedDate.getUTCDate();
                              const requestedDatemonthIndex = formattedRequestedDate.getUTCMonth();
                              const requestedDateyear = formattedRequestedDate.getUTCFullYear();


                              //courseStartDate
                              let formattedcourseStartDate = new Date(
                                courseStartDate
                              );
                              const courseStartDateday =
                                formattedcourseStartDate.getUTCDate();
                              const courseStartDatemonthIndex =
                                formattedcourseStartDate.getUTCMonth();
                              const courseStartDateyear =
                                formattedcourseStartDate.getUTCFullYear();
                              //courseEndDate
                              let formattedcourseEndDate = new Date(
                                courseEndDate
                              );
                              const courseEndDateday =
                                formattedcourseEndDate.getUTCDate();
                              const courseEndDatemonthIndex =
                                formattedcourseEndDate.getUTCMonth();
                              const courseEndDateyear =
                                formattedcourseEndDate.getUTCFullYear();
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
                              formattedcourseStartDate = `${courseStartDateday < 10 ? "0" : ""
                                }${courseStartDateday}-${monthAbbreviations[courseStartDatemonthIndex]
                                }-${courseStartDateyear}`;

                                formattedcourseEndDate = `${courseEndDateday < 10 ? "0" : ""
                              }${courseEndDateday}-${monthAbbreviations[courseEndDatemonthIndex]
                              }-${courseEndDateyear}`;

                              formattedRequestedDate = `${requestedDateday < 10 ? "0" : ""
                                }${requestedDateday}-${monthAbbreviations[requestedDatemonthIndex]
                                }-${requestedDateyear}`;

                              console.log(
                                formattedRequestedDate,
                                "formattedRequestedDate"
                              );

                              return (
                                <tr>
                                  <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                    {(currentPage - 1) *
                                      Requested_CertificateStudents.perPage +
                                      index +
                                      1}
                                  </td>
                                  <td className="fs-13 black_300  lh-xs bg_light text-truncate"style={{maxWidth:"150px"}} title={item.name}>
                                    {item.name}
                                  </td>
                                  <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{maxWidth:"150px"}} title={item.courses}>
                                    {item.courses}
                                  </td>
                                  <td className="fs-13 black_300  lh-xs bg_light">
                                    {item.registrationnumber}
                                  </td>
                                  <td className="fs-13 black_300  lh-xs bg_light">
                                    {formattedcourseStartDate}
                                  </td>
                                  <td className="fs-13 black_300  lh-xs bg_light ">
                                    {formattedcourseEndDate}
                                  </td>

                                  <GateKeeper requiredModule="Student Management" submenumodule="Requested Certificate" submenuReqiredPermission="canUpdate">

                                  <td className="fs-13 black_300  lh-xs  bg_light">
                                    {/* certificateStatus  is request Submitted  */}

                                    {certificateStatus ===
                                      "request Submitted" && (
                                      <div
                                        className=" rounded  btn_issue_certificate font-size-xxs fw-100 btn-block text-center pt-1 pb-1 text-white"
                                        type="button"
                                        onClick={(e) =>
                                          handleRequest(
                                            item.id,
                                            courseStartDate,
                                            courseEndDate,
                                            requestedDate,
                                            currentDate
                                          )
                                        }
                                      >
                                        Issue Certificate
                                      </div>
                                    )}
                                  </td>
                                  </GateKeeper>
                                </tr>
                              );
                            }
                          )
                        )
                      ) : (
                        <tr>
                          <td className="fs-13 black_300 lh-xs bg_light">
                            Sorry! No data found
                          </td>
                        </tr>
                      )}

                      {/* 1st row */}

                      {/* <tr>
                        <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                          1
                        </td>
                        <td className="fs-13 black_300  lh-xs bg_light">
                          -fdf
                        </td>
                        <td className="fs-13 black_300  lh-xs bg_light">
                          -dgg
                        </td>
                        <td className="fs-13 black_300  lh-xs bg_light">
                          -fg
                        </td>
                        <td className="fs-13 black_300  lh-xs bg_light">
                          -jhy
                        </td>
                        <td className="fs-13 black_300  lh-xs bg_light ">
                          -
                        </td>
                        <td className="fs-13 black_300  lh-xs  bg_light">
                          -
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>

                <div className=" mt-4 align-items-center d-flex justify-content-between row text-center text-sm-start">
                  <div className="col-sm">
                    {Requested_CertificateStudents.Paginated_Requested_CertificateStudents &&
                      Requested_CertificateStudents
                        .Paginated_Requested_CertificateStudents.length > 0 ? (
                      Requested_CertificateStudents?.loading ? (
                        <div className="text_mute pagination-text">
                          Showing data is Loading ....
                        </div>
                      ) : (
                        <div className="text_mute pagination-text">
                          Showing{" "}
                          <span className="fw-semibold">
                            {Requested_CertificateStudents.startStudent}
                          </span>
                          {"  "}
                          to{"  "}
                          <span className="fw-semibold">
                            {Requested_CertificateStudents.endStudent}
                          </span>
                          {"  "}
                          of{"  "}
                          <span className="fw-semibold">
                            {"  "}
                            {Requested_CertificateStudents.searchResultStudents}
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
                          {Requested_CertificateStudents.searchResultStudents}
                        </span>{" "}
                        Results
                      </div>
                    )}

                    {/* <div className="text_mute pagination-text">
                                            Showing <span className="fw-semibold">5</span> of{" "}
                                            <span className="fw-semibold">25</span> Results
                                        </div> */}
                  </div>
                  <div className="col-sm-auto mt-3 mt-sm-0 d-flex">
                  <div className="mt-2">
                        <select
                          className="form-select form-control me-3 text_color bg_input_color pagination-select"
                          aria-label="Default select example"
                          placeholder="Branch*"
                          name="branch"
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
                      {/* left arrow */}
                      <li className="page-item p-1">
                        <button
                          onClick={previousPage}
                          disabled={
                            Requested_CertificateStudents.loading
                              ? true
                              : false ||
                              Requested_CertificateStudents.currentPage === 1
                          }
                          style={{
                            cursor:
                              Requested_CertificateStudents.loading ||
                                Requested_CertificateStudents.currentPage === 1
                                ? "not-allowed"
                                : "auto",
                          }}
                          className={`border border-1 rounded ${Requested_CertificateStudents.loading
                              ? "disabled"
                              : Requested_CertificateStudents.currentPage === 1
                                ? "disabled"
                                : "cursor-auto"
                            }`}
                        >
                          <span className="">←</span>
                        </button>
                      </li>

                      {/* {middle buttons} */}

                      {[...Array(endPage - startPage + 1)].map((_, index) => {
                        const page = startPage + index;
                        return (
                          <li className={`page-item p-1`}>
                            <button
                              key={page}
                              onClick={() =>
                                changePage(
                                  currentPage === 1 && page === startPage
                                    ? 1
                                    : page
                                )
                              }
                              disabled={
                                Requested_CertificateStudents?.loading
                                  ? true
                                  : false
                              }
                              className={`border page-link border-1 rounded ${
                                currentPage === page ||
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

                      {/* right arrow */}
                      <li className="page-item p-1">
                        <button
                          onClick={nextPage}
                          disabled={
                            Requested_CertificateStudents.loading
                              ? true
                              : false ||
                              Requested_CertificateStudents.currentPage ===
                              Requested_CertificateStudents.totalPages
                          }
                          style={{
                            cursor:
                              Requested_CertificateStudents.loading ||
                                Requested_CertificateStudents.currentPage ===
                                Requested_CertificateStudents.totalPages
                                ? "not-allowed"
                                : "auto",
                          }}
                          className={`border border-1 rounded ${Requested_CertificateStudents.loading
                              ? "disabled"
                              : Requested_CertificateStudents.currentPage ===
                                Requested_CertificateStudents.totalPages
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
    </div>
  );
}

export default RequestedCertificate;
