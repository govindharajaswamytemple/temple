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
import { FaRegFilePdf } from "react-icons/fa6";
import { useStudentsContext } from "../../../../dataLayer/hooks/useStudentsContext";
import Usedebounce from "../../../../dataLayer/hooks/useDebounce/Usedebounce";
import { toast } from "react-toastify";
import axios from "axios";
import { useUserContext } from "../../../../dataLayer/hooks/useUserContext";
import { useBranchContext } from "../../../../dataLayer/hooks/useBranchContext";
import { useCourseContext } from "../../../../dataLayer/hooks/useCourseContext";
import BackButton from "../../../components/backbutton/BackButton";
import Button from "../../../components/button/Button";

import { MdFilterList } from "react-icons/md";
import GateKeeper from "../../../../rbac/GateKeeper";

const Certificate = () => {
  const {
    studentState,
    studentState: { CertificateStudents },
    Dispatchstudents,
    getPaginatedCertificateData,
  } = useStudentsContext();
  const { UsersState, UsersState: { TotalUsersWithCountellers } } = useUserContext();
  const { DispatchBranch, BranchState, getAllBranches } = useBranchContext();
  const { courseState } = useCourseContext();

  console.log(courseState, "courseStatehere");

  const [councellerDropDown, setCouncellerDropDown] = useState();
  console.log(councellerDropDown, "UsersStatehereram");

  // useEffect(() => {
  //   if (UsersState.TotalUsers) {
  //     const filteredUsers = UsersState.TotalUsers.filter((user) => {
  //       return user.profile && user.profile.toLowerCase() === "counsellor";
  //     });

  //     setCouncellerDropDown(filteredUsers);
  //   }
  // }, [UsersState?.TotalUsers]);

  console.log(CertificateStudents, "CertificateStudentsed");

  const [courseEndDate, setcourseEndDate] = useState();
  const [courseStartDate, setcourseStartDate] = useState();
  console.log(courseEndDate, "setcourseStartDatedf");




  // Select the CourseStart date

  const fixCurrentDate = new Date().toISOString().split("T")[0];
  const fixedcourseStartDate = courseStartDate;

  const handleRequest = async (studentid, currentDate) => {
    console.log(studentid, "studentidheee");
    console.log(courseStartDate, courseEndDate, "requestedcourssesdates");

    if (!courseStartDate) {
      toast.error("Course Start Date is required");
      return false;
    } else if (!courseEndDate) {
      toast.error("Course End Date is required");
      return false;
    } else if (courseStartDate > courseEndDate) {
      toast.error("CourseEndDate should be greater than CourseStartDate");
      return false;
    } else if (courseStartDate && courseEndDate) {
      if (courseStartDate < courseEndDate) {
        let certificate_status = [
          {
            courseStartDate: courseStartDate,
            courseEndDate: courseEndDate,
            certificateStatus: "request Submitted",
            RequestedDate: currentDate,
          },
        ];

        console.log(certificate_status, "certificate_status");
        const updatedData = {
          certificate_status,
        };

        const uploadcontext = { certificate_status, studentid };

        console.log("dffsfddfdf", updatedData);
        console.log("id", studentid);

        try {
          const { data, status } = await toast.promise(
            axios.put(
              `${process.env.REACT_APP_API_URL}/sc/certificatestatus/${studentid}`,
              updatedData
            ),
            {
              loading: "Loading...",
              success: "Certificate Request Submitted Successfully",
              error: "Something went wrong Please try again",
            }
          );

          console.log(data, status, "certificatestsufgh");

          if (status === 200) {
            console.log(updatedData, "dvfjdfgdsghf");
            Dispatchstudents({
              type: "UPDATE_CERTIFICATE_STATUS",
              payload: {
                context: "CERTIFICATE_STUDENTS",
                data: uploadcontext,
              },
            });
          }
          setcourseEndDate("");
          setcourseStartDate("");
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  // here the pagination, search, and filters------------------
  const { debouncesetSearch, debouncesetPage } = Usedebounce(Dispatchstudents);

  const handleSearch = (e) => {
    debouncesetSearch({
      context: "CERTIFICATE_STUDENTS",
      data: e.target.value,
    });
  };

  const handlePerPage = (e) => {
    const selectedvalue = parseInt(e.target.value, 10);
    Dispatchstudents({
      type: "SET_PER_PAGE",
      payload: {
        context: "CERTIFICATE_STUDENTS",
        data: selectedvalue,
      },
    });
  };
  //filter

  const [filterCriteria, setfilterCriteria] = useState({
    fromDate: "",
    toDate: "",
    course: "",
    enquiryTakenBy: "",
    branch: "",
    certificateStatus: "",
  });

  console.log(filterCriteria, "hereradvvcvm");
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
      enquiryTakenBy: "",
      branch: "",
      certificateStatus: "",
    });
  };

  const filterSubmit = () => {
    console.log("filterCriteria", filterCriteria);
    Dispatchstudents({
      type: "SET_FILTERS",
      payload: {
        context: "CERTIFICATE_STUDENTS",
        data: {
          fromDate: filterCriteria.fromDate,
          toDate: filterCriteria.toDate,
          course: filterCriteria.course,
          enquiryTakenBy: filterCriteria.enquiryTakenBy,
          branch: filterCriteria.branch,
          certificateStatus: filterCriteria.certificateStatus,
        },
      },
    });
  };

  //here the pagination

  let currentPage = CertificateStudents.currentPage;
  const totalPages = CertificateStudents.totalPages;

  console.log(
    currentPage,
    "cuurentpageherdfdfe",
    CertificateStudents.currentPage
  );

  const changePage = (page) => {
    debouncesetPage({ context: "CERTIFICATE_STUDENTS", data: page });
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

  // reset the table view---

  useEffect(() => {
    debouncesetPage({ context: "CERTIFICATE_STUDENTS", data: 1 });
    debouncesetSearch({ context: "CERTIFICATE_STUDENTS", data: "" });

    Dispatchstudents({
      type: "SET_FILTERS",
      payload: {
        context: "CERTIFICATE_STUDENTS",
        data: {
          fromDate: "",
          toDate: "",
          course: "",
          enquiryTakenBy: "",
          branch: "",
          certificateStatus: "",
        },
      },
    });

    Dispatchstudents({
      type: "SET_PER_PAGE",
      payload: {
        context: "CERTIFICATE_STUDENTS",
        data: 10,
      },
    });
  }, []);
  const [formIsValid, setFormIsValid] = useState(false);


  const checkFormValidity = () => {
    const { fromDate, toDate, branch, course, enquiryTakenBy, certificateStatus } = filterCriteria;
    setFormIsValid(fromDate !== '' || toDate !== '' || branch !== '' || course !== '' || enquiryTakenBy !== '' || certificateStatus !== '');
  };


  useEffect(() => {
    checkFormValidity();
  }, [filterCriteria]);
  return (
    <div>
      <BackButton heading="Certificate" content="Back" />
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
                        className="form-control search input_bg_color text_color "
                        placeholder="Search for..."
                        name="search"
                        required
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="buttons_alignment">
                      {/* <div className="fs-13 me-3 mt-2">10/40</div> */}
                      
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
                    </div>
                  </div>
                </div>
                <div
                  className="offcanvas offcanvas-end  bg_white"
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
                        className="form-control fs-s input_bg_color bg-form date_input_color"
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
                        className="form-control fs-s bg-form input_bg_color text_color date_input_color"
                        type="date"
                        id="exampleInputdate"
                        value={filterCriteria.toDate}
                        onChange={HandleFilterCertria}
                        name="toDate"
                        required
                      />
                    </div>
                    {/* Course */}
                    <div className="">
                      <label className="form-label fs-s fw-medium text_color">
                        Course
                      </label>
                      <select
                        className="form-select form-control input_bg_color text_color select"
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

                    {/* Consellor */}
                    <div className="">
                      <label className="form-label fs-s fw-medium text_color">
                        Counsellor
                      </label>
                      <select
                        className="form-select form-control input_bg_color text_color select"
                        aria-label="Default select example"
                        placeholder="enquiryTakenBy*"
                        name="enquiryTakenBy"
                        id="enquiryTakenBy"
                        value={filterCriteria.enquiryTakenBy}
                        onChange={HandleFilterCertria}
                        required
                      >
                        <option value="" disabled selected>
                          {" "}
                          Select the Counceller{" "}
                        </option>
                        {TotalUsersWithCountellers && TotalUsersWithCountellers.length > 0
                          ? TotalUsersWithCountellers.map((item, index) => {
                            return (
                              <option key={index} value={item.fullname}>
                                {item.fullname}
                              </option>
                            );
                          })
                          : null}
                      </select>
                    </div>
                    {/* branch */}
                    <div className="mt-2">
                      <label className="form-label fs-s fw-medium text_color">
                        Branch
                      </label>
                      <select
                        className="form-select form-control input_bg_color text_color select"
                        aria-label="Default select example"
                        placeholder="branch*"
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
                    {/* ceritificateSatus */}
                    <div className="mt-2">
                      <label className="form-label fs-s fw-medium text_color">
                        Certificate Status
                      </label>
                      <select
                        className="form-select form-control input_bg_color text_color select "
                        aria-label="Default select example"
                        placeholder="certificateStatus*"
                        name="certificateStatus"
                        id="certificateStatus"
                        value={filterCriteria.certificateStatus}
                        onChange={HandleFilterCertria}
                        required
                      >
                        <option value="" disabled selected>
                          {" "}
                          Select the Certificate Status{" "}
                        </option>
                        <option value="issued">issued</option>
                        <option value="not issued">not issued </option>
                        <option value="pending">pending </option>
                      </select>
                    </div>
                    <div>
                      <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                        {/* <button
                          className="btn btn_primary"
                          onClick={FilterReset}
                        >
                          Clear
                        </button> */}
                        <Button
                          className="btn btn_primary"
                          onClick={FilterReset} 
                        >
                          Clear
                        </Button>
                      </div>
                      <div className="position-absolute bottom-0 end-0 me-2 mb-2">
                        {/* <button
                          className="btn btn_primary"
                          onClick={filterSubmit}
                        >
                          Save
                        </button> */}
                        <Button
                          className="btn btn_primary"
                          onClick={filterSubmit} 
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive table-card  border-0">
                  <div className="table-container table-scroll">
                    <table className="table table-centered align-middle  table-nowrap equal-cell-table table-hover">
                      <thead >
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
                          <th
                            scope="col"
                            className="fs-13 lh-xs fw-600  "
                          >
                            S.No
                          </th>
                          <th
                            scope="col"
                            className="fs-13 lh-xs fw-600  "
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
                            className="fs-13 lh-xs  fw-600  "
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
                          <GateKeeper requiredModule="Student Management" submenumodule="Certificate" submenuReqiredPermission="canUpdate">

                            <th
                              scope="col"
                              className="fs-13 lh-xs  fw-600 "
                            >
                              Certificate Status
                            </th>
                          </GateKeeper>
                          <th
                            scope="col"
                            className="fs-13 lh-xs  fw-600 "
                          >
                            PDF
                          </th>
                        </tr>
                      </thead>
                      <tbody className="">
                        {CertificateStudents?.PaginatedCertificateStudents &&
                          CertificateStudents?.PaginatedCertificateStudents
                            .length > 0 ? (
                          CertificateStudents?.loading ? (
                            "loading"
                          ) : (
                            CertificateStudents?.PaginatedCertificateStudents?.map(
                              (item, index) => {
                                const currentDate = new Date()
                                  .toISOString()
                                  .split("T")[0];
                                let certificateStatusObj =
                                  item.certificate_status;

                                if (typeof certificateStatusObj === "string") {
                                  certificateStatusObj =
                                    JSON.parse(certificateStatusObj);
                                }
                                console.log(certificateStatusObj, "seessthat");

                                // CourseStartDate
                                const courseStartDate = certificateStatusObj
                                  .map((item) => item.courseStartDate)
                                  .join(", ");
                                console.log(
                                  courseStartDate,
                                  "courseStartDatejh"
                                );
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

                                return (

                                  <tr>
                                    <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                      {(currentPage - 1) *
                                        CertificateStudents.perPage +
                                        index +
                                        1}
                                    </td>
                                    <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "150px" }} title={item.name}>
                                      {item.name}
                                    </td>
                                    <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "150px" }} title={item.courses}>
                                      {item.courses}
                                    </td>
                                    <td className="fs-13 black_300  lh-xs bg_light">
                                      {item.registrationnumber}
                                    </td>
                                    <td className="fs-13 black_300  lh-xs bg_light">
                                      <div class="text-start ">
                                        <input
                                          class="date-bg form-control fs-s bg-form date_input certificate-date "
                                          type="date"
                                          id="exampleInputdate"
                                          name="courseStartDate"
                                          onChange={(e) =>
                                            setcourseStartDate(e.target.value)
                                          }
                                          required
                                          max={fixCurrentDate}
                                          value={
                                            courseStartDate !== ""
                                              ? courseStartDate
                                              : undefined
                                          }
                                        />
                                      </div>
                                    </td>
                                    <td className="fs-13 black_300  lh-xs bg_light ">
                                      <div class="text-start">
                                        <input
                                          class="date-bg form-control fs-s bg-form date_input certificate-date"
                                          type="date"
                                          id="exampleInputdate border_none"
                                          name="courseEndDate"
                                          onChange={(e) =>
                                            setcourseEndDate(e.target.value)
                                          }
                                          required
                                          min={fixedcourseStartDate}
                                          value={
                                            courseEndDate !== ""
                                              ? courseEndDate
                                              : undefined
                                          }
                                        />
                                      </div>
                                    </td>
                                    <GateKeeper requiredModule="Student Management" submenumodule="Certificate" submenuReqiredPermission="canUpdate">
                                      <td className="fs-13 black_300 lh-xs  bg_light ">
                                        {/* here the request the cerificate */}
                                        {certificateStatus === "" && (
                                          <div
                                            className="  rounded btn_primary font-size-xxs fw-100 btn-block pt-1 text-center pb-1 ps-1 text-white"
                                            type="button"
                                            onClick={(e) =>
                                              handleRequest(item.id, currentDate)
                                            }
                                          >
                                            Request Certificate
                                          </div>
                                        )}

                                        {certificateStatus ===
                                          "request Submitted" && (
                                            <div
                                              className=" rounded  btn_pending font-size-xxs fw-100 btn-block text-center  pt-1 pb-1 text-white"
                                              type="button"
                                            // onClick={(e) => handleRequest(item.id, currentDate)}
                                            >
                                              Pending Request
                                            </div>
                                          )}

                                        {/* here the request issued */}

                                        {certificateStatus === "issued" && (
                                          <div
                                            className="  rounded font-size-xxs  btn_certificate_submit fw-100 text-center pt-1 pb-1 ps-1 text-white"
                                            type="button"
                                          >
                                            Certificate Submitted
                                          </div>
                                        )}
                                      </td>
                                    </GateKeeper>

                                    <GateKeeper requiredModule="Student Management" submenumodule="Certificate" submenuReqiredPermission="canRead">
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {
                                          certificateStatus === "issued" && (
                                            <Link to={`/student/certificateprint/${item.id}`}>

                                              <FaRegFilePdf className="text_color fs-12" />

                                            </Link>
                                          )
                                        }

                                      </td>
                                    </GateKeeper>
                                  </tr>
                                );
                              }
                            )
                          )
                        ) : (
                          <tr>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              Sorry! no data found
                            </td>
                          </tr>
                        )}

                        {/* 1st row */}

                        {/* <tr>
                        <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                          01
                        </td>
                        <td className="fs-13 black_300  lh-xs bg_light">
                          Lakshmi
                        </td>
                        <td className="fs-13 black_300  lh-xs bg_light">
                          DM
                        </td>
                        <td className="fs-13 black_300  lh-xs bg_light">
                          TASJDFJ12345
                        </td>
                        <td className="fs-13 black_300  lh-xs bg_light">
                          <div className="text-start">
                            <input
                              className="form-control fs-s bg-form w-75"
                              type="date"
                              id="exampleInputdate"
                              onChange={(e) =>
                                setcourseStartDate(e.target.value)
                              }
                              required
                            />
                          </div>
                        </td>
                        <td className="fs-13 black_300  lh-xs bg_light ">
                          <div className="text-start">
                            <input
                              className="form-control fs-s bg-form w-75"
                              type="date"
                              id="exampleInputdate border_none"
                              name="courseEndDate"
                              onChange={(e) => setcourseEndDate(e.target.value)}
                              required
                            />
                          </div>
                        </td>
                        <td className="fs-13 black_300 lh-xs  bg_light">
                          <button
                            className="btn btn_primary "
                            onClick={handleRequest}
                          >
                            <span className="fw-500">Request Certificate</span>
                          </button>
                        </td>
                        <td className="fs_14 text_mute bg_light   lh-xs"></td>
                        <td className="fs_14 text_mute bg_light   lh-xs"></td>
                      </tr> */}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className=" mt-4 align-items-center d-flex justify-content-between row text-center text-sm-start">
                  <div className="col-sm">
                    {CertificateStudents.PaginatedCertificateStudents &&
                      CertificateStudents.PaginatedCertificateStudents.length >
                      0 ? (
                      CertificateStudents?.loading ? (
                        <div className="text_mute pagination-text">
                          Showing data is Loading ....
                        </div>
                      ) : (
                        <div className="text_mute pagination-text">
                          Showing{" "}
                          <span className="fw-semibold">
                            {CertificateStudents.startStudent}
                          </span>
                          {"  "}
                          to{"  "}
                          <span className="fw-semibold">
                            {CertificateStudents.endStudent}
                          </span>
                          {"  "}
                          of{"  "}
                          <span className="fw-semibold">
                            {"  "}
                            {CertificateStudents.searchResultStudents}
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
                          {CertificateStudents.searchResultStudents}
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

                      <li className="page-item p-1">
                        <button
                          onClick={previousPage}
                          disabled={
                            CertificateStudents.loading
                              ? true
                              : false || CertificateStudents.currentPage === 1
                          }
                          style={{
                            cursor:
                              CertificateStudents.loading ||
                                CertificateStudents.currentPage === 1
                                ? "not-allowed"
                                : "auto",
                          }}
                          className={`border border-1 rounded${CertificateStudents.loading
                            ? "disabled"
                            : CertificateStudents.currentPage === 1
                              ? "disabled"
                              : "cursor-auto"
                            }`}
                        >
                          <span className="">←</span>
                        </button>
                      </li>

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
                                CertificateStudents?.loading ? true : false
                              }
                              className={`border  page-link border-1 rounded ${currentPage === page ||
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

                      <li className="page-item p-1">
                        <button
                          onClick={nextPage}
                          disabled={
                            CertificateStudents.loading
                              ? true
                              : false ||
                              CertificateStudents.currentPage ===
                              CertificateStudents.totalPages
                          }
                          style={{
                            cursor:
                              CertificateStudents.loading ||
                                CertificateStudents.currentPage ===
                                CertificateStudents.totalPages
                                ? "not-allowed"
                                : "auto",
                          }}
                          className={`border border-1 rounded ${CertificateStudents.loading
                            ? "disabled"
                            : CertificateStudents.currentPage ===
                              CertificateStudents.totalPages
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
};

export default Certificate;
