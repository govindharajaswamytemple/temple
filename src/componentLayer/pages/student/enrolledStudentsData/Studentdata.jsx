import React, { useEffect, useState } from "react";
import "../../../../assets/css/Table.css";
import { AiFillEye } from "react-icons/ai";
import { RiEdit2Line } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import { MdLocalPrintshop } from "react-icons/md";
import { FaRegIdCard } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { HiMiniPlus } from "react-icons/hi2";
import BackButton from "../../../components/backbutton/BackButton";
import Usedebounce from "../../../../dataLayer/hooks/useDebounce/Usedebounce";
import { useUserContext } from "../../../../dataLayer/hooks/useUserContext";
import { useBranchContext } from "../../../../dataLayer/hooks/useBranchContext";
import { useStudentsContext } from "../../../../dataLayer/hooks/useStudentsContext";
import Button from "../../../components/button/Button";
import { MdFilterList } from "react-icons/md";
import { MdFileDownload } from "react-icons/md";
import GateKeeper from "../../../../rbac/GateKeeper";

function Studentdata() {
  //here the filters of the student data------------------------
  const {
    studentState,
    studentState: { EnrolledStudents },
    Dispatchstudents,
  } = useStudentsContext();
  const { DispatchBranch, BranchState, getAllBranches } = useBranchContext();
  const {
    UsersState,
    UsersState: { TotalUsersWithCountellers },
  } = useUserContext();

  console.log(BranchState, "ramkrish");

  console.log(EnrolledStudents, "dgfdhfdsjgf");

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

  const { debouncesetSearch, debouncesetPage } = Usedebounce(Dispatchstudents);

  const handleSearch = (e) => {
    debouncesetSearch({ context: "ENROLLED_STUDENTS", data: e.target.value });
  };
  // perPage
  const handlePerPage = (e) => {
    const selectedvalue = parseInt(e.target.value, 10);
    Dispatchstudents({
      type: "SET_PER_PAGE",
      payload: {
        context: "ENROLLED_STUDENTS",
        data: selectedvalue,
      },
    });
  };
  // filters
  const [filterCriteria, setfilterCriteria] = useState({
    fromDate: "",
    toDate: "",
    branch: "",
    enquiryTakenBy: "",
    modeOfTraining: "",
  });

  console.log(filterCriteria, "hereradvvcvm");

  const HandleFilterCriteria = (e) => {
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
      branch: "",
      enquiryTakenBy: "",
      modeOfTraining: "",
    });
  };

  const filterSubmit = () => {
    console.log("filterCriteria", filterCriteria);
    Dispatchstudents({
      type: "SET_FILTERS",
      payload: {
        context: "ENROLLED_STUDENTS",
        data: {
          fromDate: filterCriteria.fromDate,
          toDate: filterCriteria.toDate,
          branch: filterCriteria.branch,
          enquiryTakenBy: filterCriteria.enquiryTakenBy,
          modeOfTraining: filterCriteria.modeOfTraining,
        },
      },
    });
  };

  // here the Pagination-------------------------------------

  // const [currentPage, setCurrentPage] = useState(EnrolledStudents.currentPage);

  let currentPage = EnrolledStudents.currentPage;
  const totalPages = EnrolledStudents.totalPages;

  console.log(currentPage, "cuurentpagehere ", EnrolledStudents.currentPage);

  const changePage = (page) => {
    debouncesetPage({ context: "ENROLLED_STUDENTS", data: page });
    currentPage = page;
    // setCurrentPage(page);
    // Add your logic here to handle page change
    console.log("Currentpage:", page);
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

  // here the reset the search, filters, perpage and current page----

  useEffect(() => {
    debouncesetPage({ context: "ENROLLED_STUDENTS", data: 1 });
    debouncesetSearch({ context: "ENROLLED_STUDENTS", data: "" });

    Dispatchstudents({
      type: "SET_FILTERS",
      payload: {
        context: "ENROLLED_STUDENTS",
        data: {
          fromDate: "",
          toDate: "",
          branch: "",
          enquiryTakenBy: "",
          modeOfTraining: "",
        },
      },
    });

    Dispatchstudents({
      type: "SET_PER_PAGE",
      payload: {
        context: "ENROLLED_STUDENTS",
        data: 10,
      },
    });
  }, []);


  return (
    <div>
      <BackButton heading="Enrolled Students " content="Back" />
      <div className="container-fluid">
        <div className="row response">
          <div className="col-xl-12">
            <div className="card border-0">
              <div className="card-header">
                <div className=" row d-flex justify-content-between">
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
                  <div className="col-sm-6 response-btn">
                    <div className="buttons_alignment ">
                      <button type="button" class="btn btn-sm btn_primary ms-1  margin_top_12 me-1 " data-bs-toggle="modal" data-bs-target="#myModal"><MdFileDownload className="me-1" />Download</button>
                      <div id="myModal" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-header ">
                              <h5 class="modal-title" id="myModalLabel">Data Type</h5>
                              <button type="button" class="btn-close mt-2 " data-bs-dismiss="modal" aria-label="Close"> </button>
                            </div>
                            <div class="modal-body fs-s">
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label ms-2" for="flexCheckDefault">
                                  Enrollement Data(CSV)
                                </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label ms-2" for="flexCheckDefault">
                                  Fee Receipt
                                </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label ms-2" for="flexCheckDefault">
                                  Fee Invoice
                                </label>
                              </div>
                              <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                <label class="form-check-label ms-2" for="flexCheckDefault">
                                  Admission Form
                                </label>
                              </div>
                            </div>
                            <div class="modal-footer fs-s">
                              <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                              <button type="button" class="btn btn_primary ">Download</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn btn-sm btn_primary fs-13 me-1  margin_top_12"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      >
                        <MdFilterList className="me-1 mb-1" />
                        Filters
                      </button>
                      {/* <GateKeeper requiredModule="Student Management" submenumodule="Enrolled Students" submenuReqiredPermission="canCreate"> */}
                      <Button
                        type="button"
                        className="btn btn-sm btn_primary fs-13 mt-2 margin_top_12"
                      >
                        <Link to="/student/new" className="button_color ">
                          {<HiMiniPlus />} Add Enrollment
                        </Link>
                      </Button>
                      {/* </GateKeeper> */}
                    </div>
                  </div>
                </div>
                <div
                  className="offcanvas offcanvas-end  bg_white"
                  id="offcanvasRight"
                  aria-labelledby="offcanvasRightLabel"
                >

                  <div className="offcanvas-header ">
                    <h5
                      className="offcanvas-title  text_color"
                      id="offcanvasRightLabel"
                    >
                      Filters
                    </h5>
                    <button
                      type="button"
                      className="btn-close "
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="offcanvas-body p-2 bg_white">
                    {/* from calendar */}
                    <div className="form-group text-start">
                      <label
                        className="form-label fs-s text_color"
                        for="example-text-input "
                      >
                        From Date
                      </label>
                      <input
                        className="form-control fs-s bg-form input_bg_color text_color date_input_color"
                        type="date"
                        id="exampleInputdate"
                        name="fromDate"
                        value={filterCriteria.fromDate}
                        onChange={HandleFilterCriteria}
                        required
                      />
                    </div>
                    {/* to calendar */}
                    <div className="form-group text-start mt-2">
                      <label
                        className="form-label fs-s txt-color"
                        for="example-text-input "
                      >
                        To Date
                      </label>
                      <input
                        className="form-control fs-s bg-form input_bg_color text_color date_input_color"
                        type="date"
                        id="exampleInputdate"
                        name="toDate"
                        value={filterCriteria.toDate}
                        onChange={HandleFilterCriteria}
                        required
                      />
                    </div>
                    {/* profile */}
                    <div className="">
                      <label className="form-label fs-s fw-medium text_color">
                        Counsellors
                      </label>
                      <select
                        className="form-select form-control input_bg_color text_color select"
                        aria-label="Default select example"
                        placeholder="enquiryTakenBy*"
                        id="enquiryTakenBy"
                        name="enquiryTakenBy"
                        value={filterCriteria.enquiryTakenBy}
                        onChange={HandleFilterCriteria}
                        required
                      >
                        <option value="" disabled selected>
                          {" "}
                          Select the Counsellor{" "}
                        </option>

                        {TotalUsersWithCountellers &&
                          TotalUsersWithCountellers.length > 0
                          ? TotalUsersWithCountellers.map((item, index) => {
                            return (
                              <option key={index} value={item.fullname}>
                                {item.fullname}
                              </option>
                            );
                          })
                          : null}

                        {/* <option value="1">Select Consellors</option>
                        <option value="2">Sr. Associate</option>
                        <option value="3">Regional Manager</option>
                        <option value="4">Branch Manager</option>
                        <option value="5">Counsellor</option>
                        <option value="6">Admin</option> */}
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
                        id="branch"
                        name="branch"
                        value={filterCriteria.branch}
                        onChange={HandleFilterCriteria}
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
                    {/* department */}
                    <div className="mt-2">
                      <label className="form-label fs-s fw-medium txt-color">
                        Mode Of Training
                      </label>
                      <select
                        className="form-select form-control input_bg_color text_color select"
                        aria-label="Default select example"
                        id="modeOfTraining"
                        placeholder="modeOfTraining*"
                        name="modeOfTraining"
                        value={filterCriteria.modeOfTraining}
                        onChange={HandleFilterCriteria}
                        required
                      >
                        <option value="" disabled>
                          Select Mode Of Training
                        </option>
                        <option value="online">online</option>
                        <option value="offline">offline</option>
                      </select>
                    </div>
                    <div>
                      <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                        <Button
                          className="btn btn_primary"
                          onClick={FilterReset}
                        >
                          Clear
                        </Button>
                      </div>
                      <div className="position-absolute bottom-0 end-0 me-2 mb-2">
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
                <div className="table-responsive table-card table-container table-scroll border-0">

                  <table className="table table-centered align-middle  table-nowrap equal-cell-table table-hover">
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
                        <th

                        >

                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />

                        </th>
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
                          Student&nbsp;Name
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600  text-truncate" title="Registration Number" style={{ maxWidth: "120px" }}
                        >
                          Registration&nbsp;Number
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600  "
                        >
                          Branch
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs fw-600  "
                        >
                          Course
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs fw-600 "
                        >
                          Counsellor
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600 "
                        >
                          Mobile
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600 "
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600 "
                        >
                          Joining&nbsp;Date
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600 text-truncate" title=" Training Mode" style={{ maxWidth: "70px" }}
                        >
                          Training&nbsp;Mode
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600 action-column"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="">
                      {/* {
                          EnrolledStudents.PaginatedStudents && EnrolledStudents.PaginatedStudents.length > 0 ? EnrolledStudents.PaginatedStudents.map((item, index) => {

                            let date = new Date(item.admissiondate);
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
                              <tr key={item.id}>
                                <td className='fs-13 black_300 fw-500 lh-xs bg_light '>
                                  {(currentPage - 1) * EnrolledStudents.perPage + index + 1}
                                </td>
                                <td className='fs-13 black_300  lh-xs bg_light'>
                                  {item.name} <br />
                                  {item.registrationnumber}
                                </td>
                                <td className='fs-13 black_300  lh-xs bg_light'>
                                  {item.branch}
                                </td>
                                <td className='fs-13 black_300  lh-xs bg_light'>
                                  {item.courses}
                                </td>
                                <td className='fs-13 black_300  lh-xs bg_light'>
                                  {item.enquirytakenby}
                                </td>
                                <td className='fs-13 black_300  lh-xs bg_light '>
                                  {item.mobilenumber} <br />
                                  {item.email}
                                </td>
                                <td className='fs-13 black_300  lh-xs  bg_light'>
                                  {date ? date : "No Date"}<br />
                                  {item.modeoftraining}
                                </td>
                                <td className='fs-14 text_mute bg_light   lh-xs'>
                                  <AiFillEye className='text-mute table_icons me-3' />
                                  <MdEdit className='text-mute table_icons me-3' />
                                  <FaRupeeSign className='text-mute table_icons me-3' />
                                  <MdLocalPrintshop className='text-mute table_icons me-3' />
                                  <FaRegIdCard className='text-mute table_icons ' />
                                </td>
                              </tr>

                            )
                          }) :
                            <tr>
                              <td className='fs-13 black_300 fw-500 lh-xs bg_light '>
                                Sorry!  No data found
                              </td>
                            </tr>

                        } */}

                      {EnrolledStudents.PaginatedStudents &&
                        EnrolledStudents.PaginatedStudents.length > 0 ? (
                        EnrolledStudents.loading ? (
                          <tr>
                            <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                              Loading...
                            </td>
                          </tr>
                        ) : (
                          EnrolledStudents.PaginatedStudents.map(
                            (item, index) => {

                              let date = new Date(item.admissiondate);
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

                                <tr key={item.id}>
                                  <td>
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                  </td>
                                  <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                    {(currentPage - 1) *
                                      EnrolledStudents.perPage +
                                      index +
                                      1}
                                  </td>
                                  <td
                                    className="fs-13 black_300  lh-xs bg_light text-truncate"
                                    style={{ maxWidth: "150px" }}
                                    title={item.name}
                                  >
                                    {item.name}
                                  </td>
                                  <td className="fs-13 black_300  lh-xs bg_light">
                                    {item.registrationnumber}
                                  </td>
                                  <td className="fs-13 black_300  lh-xs bg_light">
                                    {item.branch}
                                  </td>
                                  <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "120px" }} title={item.courses} >
                                    {item.courses}
                                  </td>
                                  <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "120px" }} title={item.enquirytakenby}>
                                    {item.enquirytakenby}
                                  </td>
                                  <td className="fs-13 black_300  lh-xs bg_light ">
                                    {item.mobilenumber}
                                  </td>
                                  <td
                                    className="fs-13 black_300  lh-xs bg_light  text-truncate"
                                    style={{ maxWidth: "150px" }}
                                    title={item.email}
                                  >
                                    {item.email}
                                  </td>
                                  <td className="fs-13 black_300  lh-xs  bg_light">
                                    {date ? date : "No Date"}
                                  </td>
                                  <td className="fs-13 black_300  lh-xs  bg_light">
                                    {item.modeoftraining}
                                  </td>
                                  <td className="fs-14 text_mute bg_light   lh-xs">
                                    <GateKeeper requiredModule="Student Management" submenumodule="Enrolled Students" submenuReqiredPermission="canRead">
                                      <Link to={`/student/view/${item.id}`}>
                                        {" "}
                                        <AiFillEye className="eye_icon table_icons me-3" />
                                      </Link>
                                    </GateKeeper>

                                    <GateKeeper requiredModule="Student Management" submenumodule="Enrolled Students" submenuReqiredPermission="canUpdate">
                                      <Link
                                        to={`/student/editstudent/${item.id}`}
                                      >
                                        {" "}
                                        <RiEdit2Line className="edit_icon table_icons me-3" />{" "}
                                      </Link>
                                    </GateKeeper>

                                    <GateKeeper requiredModule="Student Management" submenumodule="Fee Details" submenuReqiredPermission="canUpdate">
                                      <Link to={`/student/feeview/${item.id}`}>
                                        <FaRupeeSign className="rupee_icon table_icons me-3" />
                                      </Link>
                                    </GateKeeper>

                                    <GateKeeper requiredModule="Student Management" submenumodule="Enrolled Students" submenuReqiredPermission="canRead">
                                      <Link
                                        to={`/student/applicationprint/${item.id}`}
                                      >
                                        {" "}
                                        <MdLocalPrintshop className="text-mute table_icons me-3" />{" "}
                                      </Link>
                                    </GateKeeper>

                                    <GateKeeper requiredModule="Student Management" submenumodule="Enrolled Students" submenuReqiredPermission="canRead">
                                      <Link
                                        to={`/student/studentidcard/${item.id}`}
                                      >
                                        {" "}
                                        <FaRegIdCard className="id_card table_icons " />
                                      </Link>
                                    </GateKeeper>

                                  </td>
                                </tr>
                              );
                            }
                          )
                        )
                      ) : (
                        <tr>
                          <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                            Sorry! No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="mt-3 align-items-center d-flex justify-content-between row text-center text-sm-start ">
                  <div className="col-sm">
                    {EnrolledStudents.PaginatedStudents &&
                      EnrolledStudents.PaginatedStudents.length > 0 ? (
                      EnrolledStudents?.loading ? (
                        <div className="text_mute pagination-text">
                          Showing data is Loading ....
                        </div>
                      ) : (
                        <div className="text_mute pagination-text ">
                          Showing{" "}
                          <span className="fw-semibold">
                            {EnrolledStudents.startStudent}
                          </span>
                          {"  "}
                          to{"  "}
                          <span className="fw-semibold">
                            {EnrolledStudents.endStudent}
                          </span>
                          {"  "}
                          of{"  "}
                          <span className="fw-semibold">
                            {"  "}
                            {EnrolledStudents.searchResultStudents}
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
                          {EnrolledStudents.searchResultStudents}
                        </span>{" "}
                        Results
                      </div>
                    )}

                    {/* <div className="text_mute pagination-text">
                      Showing {" "}
                      <span className="fw-semibold">{EnrolledStudents.startStudent}</span>{"  "}
                      to{"  "}
                      <span className="fw-semibold">{EnrolledStudents.endStudent}</span>{"  "}
                      of{"  "}
                      <span className="fw-semibold">{"  "}
                        {EnrolledStudents.totalStudents}
                      </span> Results
                    </div> */}
                  </div>
                  <div className="col-sm-auto mt-3 mt-sm-0  d-flex">
                    <div className="mt-2">
                      <select
                        className="form-select form-control me-3 input_bg_color  pagination-select"
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

                    <ul className="mt-2 pagination pagination-separated pagination-sm mb-0 justify-content-center ">
                      <li className="page-item p-1 ">
                        <button
                          onClick={previousPage}
                          disabled={
                            EnrolledStudents.loading
                              ? true
                              : false || EnrolledStudents.currentPage === 1
                          }
                          style={{
                            cursor:
                              EnrolledStudents.loading ||
                                EnrolledStudents.currentPage === 1
                                ? "not-allowed"
                                : "auto",
                          }}
                          className={`border  border-1 ${EnrolledStudents.loading
                            ? "disabled"
                            : EnrolledStudents.currentPage === 1
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
                              disabled={EnrolledStudents.loading ? true : false}
                              className={`border page-link border-1 ${currentPage === page ||
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

                      <li className="page-item p-1 ">
                        <button
                          onClick={nextPage}
                          disabled={
                            EnrolledStudents.loading
                              ? true
                              : false ||
                              EnrolledStudents.currentPage ===
                              EnrolledStudents.totalPages
                          }
                          style={{
                            cursor:
                              EnrolledStudents.loading ||
                                EnrolledStudents.currentPage ===
                                EnrolledStudents.totalPages
                                ? "not-allowed"
                                : "auto",
                          }}
                          className={`border  border-1${EnrolledStudents.loading
                            ? "disabled"
                            : EnrolledStudents.currentPage ===
                              EnrolledStudents.totalPages
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
}

export default Studentdata;

// dont Remove this comments------------

{
  /* 5th row */
}
{
  /* <tr>
 <td className='fs-13 black_300 fw-500 lh-xs bg_light '>
   01
 </td>
 <td className='fs-13 black_300  lh-xs bg_light'>
   Vishakha chachane <br />
   TK7689375826572938
 </td>
 <td className='fs-13 black_300  lh-xs bg_light'>
   Kukkatpally
 </td>
 <td className='fs-13 black_300  lh-xs bg_light'>
   Data Science
 </td>
 <td className='fs-13 black_300  lh-xs bg_light'>
   Mahitha T
 </td>
 <td className='fs-13 black_300  lh-xs bg_light '>
   8208302537
 </td>
 <td className='fs-13 black_300  lh-xs  bg_light'>
   12-Mar-2023<br />
   Offline
 </td>
 <td className='fs-14 text_mute bg_light   lh-xs'>
   <AiFillEye className='text-mute table_icons me-3' />
   <MdEdit className='text-mute table_icons me-3' />
   <FaRupeeSign className='text-mute table_icons me-3' />
   <MdLocalPrintshop className='text-mute table_icons me-3' />
   <FaRegIdCard className='text-mute table_icons ' />
 </td>
</tr> */
}

// midddle buttons

// {[...Array(endPage - startPage + 1)].map((_, index) => {
//   const page = startPage + index;
//   return (
//     <li key={page} className={`page-item p-1 ${currentPage === page ? 'active' : ''}`}>
//       <span className="page-link" style={{ cursor: 'pointer' }} onClick={() => changePage(page)}>{page}</span>
//     </li>
//   );
// })}

// pervious button click in pagination

{
  /* <li className="page-item p-1">
                        <span href="#" className="page-link"
                          onClick={nextPage}
                        >
                          →
                        </span>
                      </li> */
}

//next page button click in pagination

{
  /* <li className={`page-item ${currentPage === 1 ? 'cursor-crosshair' : ' '}  p-1`}>
                        <span className={`page-link ${currentPage > 1 ? 'cursor-pointer' : ''} `}
                          onClick={previousPage}
                        >
                          ←
                        </span>
                      </li> */
}
