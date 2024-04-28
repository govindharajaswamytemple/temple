import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../../../../assets/css/Table.css";
import { AiFillEye } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { MdLocalPrintshop } from "react-icons/md";
import { FaRegIdCard } from "react-icons/fa";
import { HiMiniPlus } from "react-icons/hi2";
import todayimg from "../../../../assets/images/feedetails/Today.svg";
import upcommingimg from "../../../../assets/images/feedetails/Upcoming.svg";
import overdueimg from "../../../../assets/images/feedetails/Overdue.svg";
import Button from "../../../components/button/Button";
import Usedebounce from "../../../../dataLayer/hooks/useDebounce/Usedebounce";
import { useStudentsContext } from "../../../../dataLayer/hooks/useStudentsContext";
import { useCourseContext } from "../../../../dataLayer/hooks/useCourseContext";
import BackButton from "../../../components/backbutton/BackButton";
import { useBranchContext } from "../../../../dataLayer/hooks/useBranchContext";
import { MdFilterList } from "react-icons/md";
import GateKeeper from "../../../../rbac/GateKeeper";


const FeeFollowUps = () => {
  const { courseState } = useCourseContext();

  const {
    studentState,
    studentState: { TodayFeeDetailsStudents, OverDueFeeDetailsStudents, UpComingFeeDetailsStudents },
    Dispatchstudents,
  } = useStudentsContext();
  const { DispatchBranch, BranchState, getAllBranches } = useBranchContext();

  const { debouncesetSearch, debouncesetPage } = Usedebounce(Dispatchstudents);


  console.log(TodayFeeDetailsStudents, "TodayFeeDetailsStudents")

  // ------------------Today fee details--------------
  const handleSearch = (e) => {
    debouncesetSearch({
      context: "TODAY_FEE_DETAILS_STUDENTS",
      data: e.target.value,
    });
  };

  const handlePerPage = (e) => {
    const selectedvalue = parseInt(e.target.value, 10);
    Dispatchstudents({
      type: "SET_PER_PAGE",
      payload: {
        context: "TODAY_FEE_DETAILS_STUDENTS",
        data: selectedvalue,
      },
    });
  };

  const [filterCriteria, setfilterCriteria] = useState({
    fromDate: "",
    toDate: "",
    branch: "",
    course: "",
  });

  console.log(filterCriteria, "hererdddaddcvvcvm");

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
      branch: "",
      course: "",
    });
  };

  const filterSubmit = () => {
    console.log("filterCritesfria", filterCriteria);
    Dispatchstudents({
      type: "SET_FILTERS",
      payload: {
        context: "TODAY_FEE_DETAILS_STUDENTS",
        data: {
          fromDate: filterCriteria.fromDate,
          toDate: filterCriteria.toDate,
          branch: filterCriteria.branch,
          course: filterCriteria.course,
        },
      },
    });
  };

  //pagination
  let currentPage = TodayFeeDetailsStudents.currentPage;
  const totalPages = TodayFeeDetailsStudents.totalPages;
  console.log(currentPage, "cuurentpagehere ", TodayFeeDetailsStudents.currentPage);

  const changePage = (page) => {
    debouncesetPage({ context: "TODAY_FEE_DETAILS_STUDENTS", data: page });
    currentPage = page;

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

  // Upcoming Fee Details-----------------------------------------------

  console.log(UpComingFeeDetailsStudents, "UpComingFeeDetailsStudentshree")


  const handleSearchUpcoming = (e) => {
    debouncesetSearch({
      context: "UPCOMING_FEE_DETAILS_STUDENTS",
      data: e.target.value,
    });
  };

  const handlePerPageUpcoming = (e) => {
    const selectedvalue = parseInt(e.target.value, 10);
    Dispatchstudents({
      type: "SET_PER_PAGE",
      payload: {
        context: "UPCOMING_FEE_DETAILS_STUDENTS",
        data: selectedvalue,
      },
    });
  };

  const [filterCriteriaUpcoming, setfilterCriteriaUpcoming] = useState({
    fromDate: "",
    toDate: "",
    branch: "",
    course: "",
  });

  console.log(filterCriteriaUpcoming, "hererdddaddcvvcvm");

  const HandleFilterCertriaUpcoming = (e) => {
    const { name, value } = e.target;
    setfilterCriteriaUpcoming((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const FilterResetUpcoming = () => {
    setfilterCriteriaUpcoming({
      fromDate: "",
      toDate: "",
      branch: "",
      course: "",
    });
  };

  const filterSubmitUpcoming = () => {
    console.log("filterCridfddftesfria", filterCriteriaUpcoming);
    Dispatchstudents({
      type: "SET_FILTERS",
      payload: {
        context: "UPCOMING_FEE_DETAILS_STUDENTS",
        data: {
          fromDate: filterCriteriaUpcoming.fromDate,
          toDate: filterCriteriaUpcoming.toDate,
          branch: filterCriteriaUpcoming.branch,
          course: filterCriteriaUpcoming.course,
        },
      },
    });
  };

  //pagination
  let currentPageUpcoming = UpComingFeeDetailsStudents.currentPage;
  const totalPagesUpcoming = UpComingFeeDetailsStudents.totalPages;
  console.log(currentPageUpcoming, "cuurentpagehere ", UpComingFeeDetailsStudents.currentPageUpcoming);

  const changePageUpcoming = (pageUpcoming) => {
    debouncesetPage({ context: "UPCOMING_FEE_DETAILS_STUDENTS", data: pageUpcoming });
    currentPageUpcoming = pageUpcoming;

    // Add your logic here to handle page change
    console.log("Currentpage:", pageUpcoming);
  };

  const previousPageUpcoming = () => {
    if (currentPageUpcoming > 1) {
      changePageUpcoming(currentPageUpcoming - 1);
    }
  };



  const nextPageUpcoming = () => {
    if (currentPageUpcoming < totalPagesUpcoming) {
      changePageUpcoming(currentPageUpcoming + 1);
    }
  };


  let startPageUpcoming = Math.max(1, currentPageUpcoming - 1);
  let endPageUpcoming = Math.min(totalPagesUpcoming, startPageUpcoming + 2);
  if (endPageUpcoming - startPageUpcoming < 2) {
    startPageUpcoming = Math.max(1, endPageUpcoming - 2);
  }


  // ---OVERDUE FILTERS AND PAGINATION---------------------------------------------------------------------

  console.log(OverDueFeeDetailsStudents, "dgfhadfyfs")

  const handleSearchOverDue = (e) => {
    debouncesetSearch({
      context: "OVER_DUE_FEE_DETAILS_STUDENTS",
      data: e.target.value,
    });
  };


  const handlePerPageOverDue = (e) => {
    const selectedvalue = parseInt(e.target.value, 10);
    Dispatchstudents({
      type: "SET_PER_PAGE",
      payload: {
        context: "OVER_DUE_FEE_DETAILS_STUDENTS",
        data: selectedvalue,
      },
    });
  };

  const [filterCriteriaOverDue, setfilterCriteriaOverDue] = useState({
    fromDate: "",
    toDate: "",
    branch: "",
    course: "",
  });

  console.log(filterCriteriaOverDue, "hererdddaddcvdvcvm");

  const HandleFilterCertriaOverDue = (e) => {
    const { name, value } = e.target;
    setfilterCriteriaOverDue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const FilterResetOverDue = () => {
    setfilterCriteriaOverDue({
      fromDate: "",
      toDate: "",
      branch: "",
      course: "",
    });
  };

  const filterSubmitOverDue = () => {
    console.log("filterCridfddftesfria", filterCriteriaUpcoming);
    Dispatchstudents({
      type: "SET_FILTERS",
      payload: {
        context: "OVER_DUE_FEE_DETAILS_STUDENTS",
        data: {
          fromDate: filterCriteriaOverDue.fromDate,
          toDate: filterCriteriaOverDue.toDate,
          branch: filterCriteriaOverDue.branch,
          course: filterCriteriaOverDue.course,
        },
      },
    });
  };


  //pagination

  // OverDue
  let currentPageOverDue = OverDueFeeDetailsStudents.currentPage;
  const totalPagesOverDue = OverDueFeeDetailsStudents.totalPages;

  console.log(currentPageOverDue, "cuurentpagehere ", OverDueFeeDetailsStudents.currentPage);

  const changePageOverDue = (pageOverDue) => {
    debouncesetPage({ context: "OVER_DUE_FEE_DETAILS_STUDENTS", data: pageOverDue });
    currentPageOverDue = pageOverDue;

    // Add your logic here to handle page change
    console.log("Curresntpage:", pageOverDue);
  };

  const previousPageOverDue = () => {
    if (currentPageOverDue > 1) {
      changePageOverDue(currentPageOverDue - 1);
    }
  };

  const nextPageOverDue = () => {
    if (currentPageOverDue < totalPagesOverDue) {
      changePageOverDue(currentPageOverDue + 1);
    }
  };

  let startPageOverDue = Math.max(1, currentPageOverDue - 1);
  let endPageOverDue = Math.min(totalPagesOverDue, startPageOverDue + 2);
  if (endPageOverDue - startPageOverDue < 2) {
    startPageOverDue = Math.max(1, endPageOverDue - 2);
  }

  const [formIsValid, setFormIsValid] = useState(false);


  const checkFormValidity = () => {
    const { fromDate,toDate, branch, course} = filterCriteria;
    setFormIsValid(fromDate !== '' || toDate !== ''||branch!=='' || course !== '');
  };


  useEffect(() => {
    checkFormValidity();
  }, [filterCriteria]);






  return (
    <div>
      
      <BackButton heading="Fee Details" content="Back"  />
      <div className="container d-flex justify-content-center">
        <ul className="nav gap-3" id="pills-tab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active card card_animate"
              id="pills-overdue-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-overdue"
              type="button"
              role="tab"
              aria-controls="pills-overdue"
              aria-selected="true"
            >
              <div className="d-flex justify-content-between">
                <div className="text-start me-5">
                  <p className="fs_20 fw-500">Today</p>
                  <p className="mt-3 fs_14 lh-100 black_300">5000 /-</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="avatar-md">
                    <span className="avatar-title bg-danger-subtle rounded-circle fs-1">
                      <img
                        src={todayimg}
                        className="img-fluid"
                        width="100px"
                        height="100px"
                        alt=""
                      />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link card card_animate"
              id="pills-today-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-today"
              type="button"
              role="tab"
              aria-controls="pills-today"
              aria-selected="false"
            >
              <div className="d-flex justify-content-between">
                <div className="text-start me-4">
                  <p className="fs_20 fw-500">Upcoming</p>
                  <p className="mt-3 fs_14 lh-100 black_300">5000 /-</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="avatar-md">
                    <span className="avatar-title bg-danger-subtle rounded-circle fs-1">
                      <img
                        src={upcommingimg}
                        className="img-fluid"
                        width="100px"
                        height="100px"
                        alt=""
                      />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link card card_animate"
              id="pills-upcoming-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-upcoming"
              type="button"
              role="tab"
              aria-controls="pills-upcoming"
              aria-selected="false"
            >
              <div className="d-flex justify-content-between">
                <div className="text-start me-5">
                  <p className="fs_20 fw-500">Over Due</p>
                  <p className="mt-3 fs_14 lh-100 black_300">5000 /-</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="avatar-md">
                    <span className="avatar-title bg-danger-subtle rounded-circle fs-1">
                      <img
                        src={overdueimg}
                        className="img-fluid"
                        width="100px"
                        height="100px"
                        alt=""
                      />
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>

      <div className="tab-content" id="pills-tabContent">
        {/*----------------------------------------- today-------------------------------------- */}
        <div
          className="tab-pane fade show active"
          id="pills-overdue"
          role="tabpanel"
          aria-labelledby="pills-overdue-tab"
          tabindex="0"
        >
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
                            className="form-control search"
                            placeholder="Search for..."
                            name="search"
                            required
                            onChange={handleSearch}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex justify-content-end">
                          <div className="fs-13 me-3 mt-2">
                            {/* 1/4 */}

                          </div>
                        
                          <button
                            className="btn btn_primary fs-13 me-2"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRightToday"
                            aria-controls="offcanvasRight"
                          >
                          <MdFilterList className="me-1 mb-1" />
                        Filters
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="offcanvas offcanvas-end  bg_light"
                      id="offcanvasRightToday"
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
                          className="btn-close text_color"
                          data-bs-dismiss="offcanvas"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="offcanvas-body p-2 ">
                        {/* from date */}
                        <div className="form-group text-start">
                          <label
                            className="form-label fs-s text_color"
                            for="example-text-input "
                          >
                            From Date
                          </label>
                          <input
                            className="form-control fs-s bg-form text_color bg_input_color date_input_color"
                            type="date"
                            id="exampleInputdate"
                            name="fromDate"
                            value={filterCriteria.fromDate}
                            onChange={HandleFilterCertria}
                            required
                          />
                        </div>
                        {/* to date */}
                        <div className="form-group text-start mt-2">
                          <label
                            className="form-label fs-s text_color"
                            for="example-text-input "
                          >
                            To Date
                          </label>
                          <input
                            className="form-control fs-s bg-form text_color bg_input_color date_input_color"
                            type="date"
                            id="exampleInputdate"
                            name="toDate"
                            value={filterCriteria.toDate}
                            onChange={HandleFilterCertria}
                            required
                          />
                        </div>
                        {/* branch */}
                        <div className="mt-2">
                          <label className="form-label fs-s fw-medium txt-color">
                            Branch
                          </label>
                          <select
                            className="form-select input_bg_color text_color form-control select "
                            aria-label="Default select example"
                            placeholder="Branch*"
                            id="branch"
                            name="branch"
                            value={filterCriteria.branch}
                            onChange={HandleFilterCertria}
                            required
                          >
                            <option value="" disabled selected>Select Branch</option>
                            <option value="2">Hitech City</option>
                            <option value="3">Kukkatpally</option>
                            <option value="4">Dilsukhnagar</option>
                            <option value="5">Secunderabad</option>
                            <option value="6">Testing</option>
                          </select>
                        </div>
                        {/* course */}
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

                        <div>
                          <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                            <Button className="btn btn_primary"
                              onClick={FilterReset} disabled={!formIsValid}
                            >Clear</Button>
                          </div>
                          <div className="position-absolute bottom-0 end-0 me-2 mb-2">
                            <Button className="btn btn_primary"
                              onClick={filterSubmit} disabled={!formIsValid}
                            >Save</Button>
                          </div>
                        </div>
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
                                className="fs-13 lh-xs fw-600 "
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
                                Branch
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs fw-600  "
                              >
                                Counsellor
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600  "
                              >
                                Contact
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 "
                              >
                                Course
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 "
                              >
                                Due&nbsp;Date
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 "
                              >
                                Due&nbsp;Amount
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 "
                              >
                                Paid&nbsp;Status
                              </th>
                              <GateKeeper requiredModule="Student Management" submenumodule="Fee Details" submenuReqiredPermission="canUpdate">
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 "
                              >
                                Action
                              </th>
                              </GateKeeper>
                            </tr>
                          </thead>
                          <tbody>

                            {
                              TodayFeeDetailsStudents?.PaginatedTodayFeeDetails && TodayFeeDetailsStudents?.PaginatedTodayFeeDetails.length > 0 ?
                                TodayFeeDetailsStudents?.loading ? "loading.." :
                                  TodayFeeDetailsStudents?.PaginatedTodayFeeDetails.map((item, index) => {

                                    return (
                                      <tr>
                                        <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                          {(currentPage - 1) * TodayFeeDetailsStudents.perPage + index + 1}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "150px" }}>
                                          {item.name}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {item.branch}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{maxWidth:"150px"}} title={item.enquirytakenby}>
                                          {item.enquirytakenby}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {item.mobilenumber}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{maxWidth:"150px"}} title={item.courses} >
                                          {item.courses}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light ">
                                          {item?.nextduedate}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs  bg_light">
                                          {Number(
                                            parseFloat(item.dueamount).toFixed(2)
                                          ).toLocaleString("en-IN")}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs  bg_light">
                                          -

                                        </td>
                                        <GateKeeper requiredModule="Student Management" submenumodule="Fee Details" submenuReqiredPermission="canUpdate">
                                        <td className="fs_14 text_mute bg_light lh-xs ">
                                          <Link to="/student/feeview">
                                            <AiFillEye className=" me-3" />
                                          </Link>
                                        </td>
                                        </GateKeeper>
                                      </tr>

                                    )
                                  })

                                :
                                <tr>
                                  <td className="fs-13 black_300  lh-xs bg_light">
                                    Sorry! no data found
                                  </td>
                                </tr>
                            }

                            {/* <tr>
                            <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                              1
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "150px" }}>
                              Karemgar Vaibhav
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              Secunderabad
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              Usha Kiran
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              9067373129
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              AWS + Devops
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light ">
                              2024-03-19
                            </td>
                            <td className="fs-13 black_300  lh-xs  bg_light">
                              17,000
                            </td>
                            <td className="fs-13 black_300  lh-xs  bg_light">-</td>

                            <td className="fs_14 text_mute bg_light lh-xs d-flex">
                              <Link to="/student/feeview">
                                <AiFillEye className="eye_icon me-3" />
                              </Link>
                            </td>
                          </tr> */}

                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className=" mt-4 align-items-center d-flex justify-content-between row text-center text-sm-start   ">
                      <div className="col-sm">



                        {TodayFeeDetailsStudents.PaginatedTodayFeeDetails &&
                          TodayFeeDetailsStudents.PaginatedTodayFeeDetails.length > 0 ? (
                          TodayFeeDetailsStudents?.loading ? (
                            <div className="text_mute pagination-text">
                              Showing data is Loading ....
                            </div>
                          ) : (
                            <div className="text_mute pagination-text ">
                              Showing{" "}
                              <span className="fw-semibold">
                                {TodayFeeDetailsStudents.startStudent}
                              </span>
                              {"  "}
                              to{"  "}
                              <span className="fw-semibold">
                                {TodayFeeDetailsStudents.endStudent}
                              </span>
                              {"  "}
                              of{"  "}
                              <span className="fw-semibold">
                                {"  "}
                                {TodayFeeDetailsStudents.searchResultStudents}
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
                              {TodayFeeDetailsStudents.searchResultStudents}
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
                              className="form-select form-control me-3 pagination-select"
                              aria-label="Default select example"
                              required
                              onChange={handlePerPage}
                            >
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="75">75</option>
                              <option value="100">100</option>
                              <option value="200">200</option>
                              <option value="300">300</option>
                              <option value="500">500</option>
                            </select>
                          </div>
                        <ul className="mt-2 pagination pagination-separated pagination-sm mb-0 justify-content-center">


                          <li className="page-item p-1 ">
                            <button
                              onClick={previousPage}
                              disabled={
                                TodayFeeDetailsStudents.loading
                                  ? true
                                  : false || TodayFeeDetailsStudents.currentPage === 1
                              }
                              style={{
                                cursor:
                                  TodayFeeDetailsStudents.loading ||
                                    TodayFeeDetailsStudents.currentPage === 1
                                    ? "not-allowed"
                                    : "auto",
                              }}
                              className={`border  border-1 ${TodayFeeDetailsStudents.loading
                                ? "disabled"
                                : TodayFeeDetailsStudents.currentPage === 1
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
                                  disabled={TodayFeeDetailsStudents.loading ? true : false}
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
                                TodayFeeDetailsStudents.loading
                                  ? true
                                  : false ||
                                  TodayFeeDetailsStudents.currentPage ===
                                  TodayFeeDetailsStudents.totalPages
                              }
                              style={{
                                cursor:
                                  TodayFeeDetailsStudents.loading ||
                                    TodayFeeDetailsStudents.currentPage ===
                                    TodayFeeDetailsStudents.totalPages
                                    ? "not-allowed"
                                    : "auto",
                              }}
                              className={`border  border-1${TodayFeeDetailsStudents.loading
                                ? "disabled"
                                : TodayFeeDetailsStudents.currentPage ===
                                  TodayFeeDetailsStudents.totalPages
                                  ? "disabled"
                                  : "cursor-auto"
                                }`}
                            >
                              <span className="text_color ">→</span>
                            </button>
                          </li>

                          {/* <li className="page-item disabled p-1">
                        <a href="#" className="page-link ">
                          ←
                        </a>
                      </li>
                      <li className="page-item p-1">
                        <a href="#" className="page-link">
                          1
                        </a>
                      </li>
                      <li className="page-item active p-1">
                        <a href="#" className="page-link ">
                          2
                        </a>
                      </li>
                      <li className="page-item p-1">
                        <a href="#" className="page-link">
                          3
                        </a>
                      </li>
                      <li className="page-item p-1">
                        <a href="#" className="page-link">
                          →
                        </a>
                      </li> */}

                        </ul>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ------------------------upcoming--------------------------------------- */}
        <div
          className="tab-pane fade"
          id="pills-today"
          role="tabpanel"
          aria-labelledby="pills-today-tab"
          tabindex="0"
        >
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
                            className="form-control search"
                            placeholder="Search for..."
                            name="search"
                            required
                            onChange={handleSearchUpcoming}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex justify-content-end">
                          <div className="fs-13 me-3 mt-2">


                          </div>
                        
                          <button
                            className="btn btn_primary fs-13 me-2"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRightUpcoming"
                            aria-controls="offcanvasRight"
                          >
                            <MdFilterList className="me-1 mb-1" />
                        Filters
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="offcanvas offcanvas-end text_color bg_light"
                      id="offcanvasRightUpcoming"
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

                        {/* From Date */}
                        <div className="form-group text-start">
                          <label
                            className="form-label fs-s text_color"
                            for="example-text-input "
                          >
                            From Date
                          </label>
                          <input
                            className="form-control fs-s bg-form text_color bg_input_color date_input_color"
                            type="date"
                            id="exampleInputdate"
                            name="fromDate"
                            value={filterCriteriaUpcoming.fromDate}
                            onChange={HandleFilterCertriaUpcoming}
                            required
                          />
                        </div>
                        {/*   To Date */}
                        <div className="form-group text-start mt-2">
                          <label
                            className="form-label fs-s text_color"
                            for="example-text-input "
                          >
                            To Date
                          </label>
                          <input
                            className="form-control fs-s bg-form text_color bg_input_color  date_input_color"
                            type="date"
                            id="exampleInputdate"
                            name="toDate"
                            value={filterCriteriaUpcoming.toDate}
                            onChange={HandleFilterCertriaUpcoming}
                            required
                          />
                        </div>

                        {/* branch */}
                        <div className="mt-2">
                          <label className="form-label fs-s fw-medium txt-color">
                            Branch
                          </label>
                          <select
                            className="form-select form-control input_bg_color select"
                            aria-label="Default select example"
                            placeholder="Branch*"
                            id="branch"
                            name="branch"
                            value={filterCriteriaUpcoming.branch}
                            onChange={HandleFilterCertriaUpcoming}
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

                        {/* course */}
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


                            value={filterCriteriaUpcoming.course}
                            onChange={HandleFilterCertriaUpcoming}
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


                        <div>
                          <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                            <Button className="btn btn_primary"
                              onClick={FilterResetUpcoming} disabled={!formIsValid}
                            >Clear</Button>
                          </div>
                          <div className="position-absolute bottom-0 end-0 me-2 mb-2">
                            <Button className="btn btn_primary"
                              onClick={filterSubmitUpcoming} 
                            >Save</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



                  <div className="card-body">
                <div className="table-responsive table-container table-scroll table-card  border-0">
                
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
                                className="fs-13 lh-xs  fw-600  "
                              >
                                Branch
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600  "
                              >
                                Counsellor
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600  "
                              >
                                Contact
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 "
                              >
                                Course
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 "
                              >
                                Due&nbsp;Date
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 "
                              >
                                Due&nbsp;Amount
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 "
                              >
                                Paid&nbsp;Status
                              </th>
                              <GateKeeper requiredModule="Student Management" submenumodule="Fee Details" submenuReqiredPermission="canUpdate">
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 "
                              >
                                Action
                              </th>
                              </GateKeeper>
                            </tr>
                          </thead>
                          <tbody>

                            {
                              UpComingFeeDetailsStudents?.PaginatedUpComingFeeDetails && UpComingFeeDetailsStudents?.PaginatedUpComingFeeDetails?.length > 0 ? UpComingFeeDetailsStudents?.loading ? "loading.." :
                                UpComingFeeDetailsStudents?.PaginatedUpComingFeeDetails.map((item, index) => {

                                  return (
                                    <tr>
                                      <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                        {(currentPageUpcoming - 1) * UpComingFeeDetailsStudents.perPage + index + 1}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "150px" }}>
                                        {item.name}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.branch}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{maxWidth:"150px"}} title={item.enquirytakenby}>
                                        {item.enquirytakenby}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.mobilenumber}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{maxWidth:"150px"}} title={item.courses}>
                                        {item.courses}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light ">
                                        {item.nextduedate}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs  bg_light">
                                        {Number(
                                          parseFloat(item.dueamount).toFixed(2)
                                        ).toLocaleString("en-IN")}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs  bg_light">

                                        -
                                      </td>
                                      <GateKeeper requiredModule="Student Management" submenumodule="Fee Details" submenuReqiredPermission="canUpdate">
                                      <td className="fs_14 text_mute bg_light lh-xs ">
                                        <Link to={`/student/feeview/${item.id}`}>
                                          <AiFillEye className="eye_icon me-3" />
                                        </Link>
                                      </td>
                                      </GateKeeper>

                                    </tr>

                                  )
                                })
                                :
                                <tr>
                                  <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                    Sorry! no data found
                                  </td>
                                </tr>
                            }


                            {/* <tr>
                            <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                              1
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "150px" }}>
                              Karemgar Vaibhav
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              Secunderabad
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              Usha Kiran
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              9067373129
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              AWS + Devops
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light ">
                              2024-03-19
                            </td>
                            <td className="fs-13 black_300  lh-xs  bg_light">
                              17,000
                            </td>
                            <td className="fs-13 black_300  lh-xs  bg_light">-</td>

                            <td className="fs_14 text_mute bg_light lh-xs d-flex">
                              <Link to="/student/feeview">
                                <AiFillEye className="eye_icon me-3" />
                              </Link>
                            </td>
                          </tr> */}


                          </tbody>
                        </table>
                      </div>
               
                    <div className=" mt-4 align-items-center d-flex justify-content-between row text-center text-sm-start   ">
                      <div className="col-sm">



                        {UpComingFeeDetailsStudents.PaginatedUpComingFeeDetails &&
                          UpComingFeeDetailsStudents.PaginatedUpComingFeeDetails.length > 0 ? (
                          UpComingFeeDetailsStudents?.loading ? (
                            <div className="text_mute pagination-text">
                              Showing data is Loading ....
                            </div>
                          ) : (
                            <div className="text_mute pagination-text ">
                              Showing{" "}
                              <span className="fw-semibold">
                                {UpComingFeeDetailsStudents.startStudent}
                              </span>
                              {"  "}
                              to{"  "}
                              <span className="fw-semibold">
                                {UpComingFeeDetailsStudents.endStudent}
                              </span>
                              {"  "}
                              of{"  "}
                              <span className="fw-semibold">
                                {"  "}
                                {UpComingFeeDetailsStudents.searchResultStudents}
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
                              {UpComingFeeDetailsStudents.searchResultStudents}
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
                              className="form-select form-control me-3 pagination-select"
                              aria-label="Default select example"
                              required
                              onChange={handlePerPageUpcoming}
                            >
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="75">75</option>
                              <option value="100">100</option>
                              <option value="200">200</option>
                              <option value="300">300</option>
                              <option value="500">500</option>
                            </select>
                          </div>
                        <ul className="mt-2 pagination pagination-separated pagination-sm mb-0 justify-content-center">


                          <li className="page-item p-1 ">
                            <button
                              onClick={previousPageUpcoming}
                              disabled={
                                UpComingFeeDetailsStudents.loading
                                  ? true
                                  : false || UpComingFeeDetailsStudents.currentPage === 1
                              }
                              style={{
                                cursor:
                                  UpComingFeeDetailsStudents.loading ||
                                    UpComingFeeDetailsStudents.currentPage === 1
                                    ? "not-allowed"
                                    : "auto",
                              }}
                              className={`border  border-1 ${UpComingFeeDetailsStudents.loading
                                ? "disabled"
                                : UpComingFeeDetailsStudents.currentPage === 1
                                  ? "disabled"
                                  : "cursor-auto"
                                }`}
                            >
                              <span className="text_color">←</span>
                            </button>
                          </li>

                          {[...Array(endPageUpcoming - startPageUpcoming + 1)].map((_, index) => {
                            const pageUpcoming = startPageUpcoming + index;
                            return (
                              <li className={`page-item p-1`}>
                                <button
                                  key={pageUpcoming}
                                  // onClick={() => changePage(page)}
                                  onClick={() =>
                                    changePageUpcoming(
                                      currentPageUpcoming === 1 && pageUpcoming === startPageUpcoming
                                        ? 1
                                        : pageUpcoming
                                    )
                                  }
                                  disabled={UpComingFeeDetailsStudents.loading ? true : false}
                                  className={`border page-link border-1 ${currentPageUpcoming === pageUpcoming ||
                                    (currentPageUpcoming === 1 && pageUpcoming === startPageUpcoming)
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  <span className="">{pageUpcoming} </span>
                                </button>
                              </li>
                            );
                          })}

                          <li className="page-item p-1 ">
                            <button
                              onClick={nextPageUpcoming}
                              disabled={
                                UpComingFeeDetailsStudents.loading
                                  ? true
                                  : false ||
                                  UpComingFeeDetailsStudents.currentPage ===
                                  UpComingFeeDetailsStudents.totalPages
                              }
                              style={{
                                cursor:
                                  UpComingFeeDetailsStudents.loading ||
                                    UpComingFeeDetailsStudents.currentPage ===
                                    UpComingFeeDetailsStudents.totalPages
                                    ? "not-allowed"
                                    : "auto",
                              }}
                              className={`border  border-1${UpComingFeeDetailsStudents.loading
                                ? "disabled"
                                : UpComingFeeDetailsStudents.currentPage ===
                                  UpComingFeeDetailsStudents.totalPages
                                  ? "disabled"
                                  : "cursor-auto"
                                }`}
                            >
                              <span className="text_color ">→</span>
                            </button>
                          </li>




                          {/* <li className="page-item disabled p-1">
                            <a href="#" className="page-link ">
                              ←
                            </a>
                          </li>
                          <li className="page-item p-1">
                            <a href="#" className="page-link">
                              1
                            </a>
                          </li>
                          <li className="page-item active p-1">
                            <a href="#" className="page-link ">
                              2
                            </a>
                          </li>
                          <li className="page-item p-1">
                            <a href="#" className="page-link">
                              3
                            </a>
                          </li>
                          <li className="page-item p-1">
                            <a href="#" className="page-link">
                              →
                            </a>
                          </li> */}


                        </ul>
                      </div>
                    </div>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*---------------------------- over due----------------------------------------- */}
        <div
          className="tab-pane fade"
          id="pills-upcoming"
          role="tabpanel"
          aria-labelledby="pills-upcoming-tab"
          tabindex="0"
        >
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
                            className="form-control search"
                            placeholder="Search for..."
                            name="search"
                            required
                            onChange={handleSearchOverDue}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex justify-content-end">
                          <div className="fs-13 me-3 mt-2">


                          </div>
                       
                          <button
                            className="btn btn_primary fs-13 me-2"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRightOverdue"
                            aria-controls="offcanvasRight"
                          >
                           <MdFilterList className="me-1 mb-1" />
                        Filters
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="offcanvas offcanvas-end bg_light"
                      id="offcanvasRightOverdue"
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

                        {/* from date */}
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
                            value={filterCriteriaOverDue.fromDate}
                            onChange={HandleFilterCertriaOverDue}
                            required
                          />
                        </div>
                        {/* to date */}
                        <div className="form-group text-start mt-2">
                          <label
                            className="form-label fs-s text_color"
                            for="example-text-input "
                          >
                            To Date
                          </label>
                          <input
                            className="form-control fs-s bg-form text_color input_bg_color date_input_color"
                            type="date"
                            id="exampleInputdate"
                            name="toDate"
                            value={filterCriteriaOverDue.toDate}
                            onChange={HandleFilterCertriaOverDue}
                            required
                          />
                        </div>
                        {/* branch */}
                        <div className="mt-2">
                          <label className="form-label fs-s fw-medium txt-color">
                            Branch
                          </label>
                          <select
                            className="form-select form-control input_bg_color select"
                            aria-label="Default select example"
                            placeholder="Branch*"
                            id="branch"
                            name="branch"
                            value={filterCriteriaOverDue.branch}
                            onChange={HandleFilterCertriaOverDue}
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
                        {/* course */}
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
                            value={filterCriteriaOverDue.course}
                            onChange={HandleFilterCertriaOverDue}
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


                        <div>
                          <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                            <Button className="btn btn_primary"
                              onClick={FilterResetOverDue}
                            >
                              Clear
                            </Button>
                          </div>
                          <div className="position-absolute bottom-0 end-0 me-2 mb-2">
                            <Button className="btn btn_primary"

                              onClick={filterSubmitOverDue}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



                  <div className="card-body">
                <div className="table-responsive table-container table-scroll table-card  border-0">
             
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
                                className="fs-13 lh-xs fw-600  "
                              >
                                Branch
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600  "
                              >
                                Counsellor
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600  "
                              >
                                Contact
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 "
                              >
                                Course
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 "
                              >
                                Due&nbsp;Date
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 "
                              >
                                Due&nbsp;Amount
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 "
                              >
                                Paid&nbsp;Status
                              </th>
                              <GateKeeper requiredModule="Student Management" submenumodule="Fee Details" submenuReqiredPermission="canUpdate">

                              
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 "
                              >
                                Action
                              </th>
                              </GateKeeper>
                            </tr>
                          </thead>
                          <tbody>

                            {
                              OverDueFeeDetailsStudents.PaginatedOverDueFeeDetails && OverDueFeeDetailsStudents.PaginatedOverDueFeeDetails.length > 0 ? OverDueFeeDetailsStudents?.loading ? "loading.." : OverDueFeeDetailsStudents.PaginatedOverDueFeeDetails.map((item, index) => {

                                return (
                                  <tr>
                                    <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                      {(currentPageOverDue - 1) * OverDueFeeDetailsStudents.perPage + index + 1}
                                    </td>
                                    <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "150px" }} title={item.name}>
                                      {item.name}
                                    </td>
                                    <td className="fs-13 black_300  lh-xs bg_light">
                                      {item.branch}
                                    </td>
                                    <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{maxWidth:"150px"}} title={item.enquirytakenby}>
                                      {item.enquirytakenby}
                                    </td>
                                    <td className="fs-13 black_300  lh-xs bg_light">
                                      {item.mobilenumber}
                                    </td>
                                    <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{maxWidth:"150px"}} title={item.courses}>
                                      {item.courses}
                                    </td>
                                    <td className="fs-13 black_300  lh-xs bg_light ">
                                      {item.nextduedate}
                                    </td>
                                    <td className="fs-13 black_300  lh-xs  bg_light">
                                      {Number(
                                        parseFloat(item.dueamount).toFixed(2)
                                      ).toLocaleString("en-IN")}
                                    </td>
                                    <td className="fs-13 black_300  lh-xs  bg_light">
                                      -
                                    </td>
                                    <GateKeeper requiredModule="Student Management" submenumodule="Fee Details" submenuReqiredPermission="canUpdate">
                                    <td className="fs_14 text_mute bg_light lh-xs ">
                                      <Link to={`/student/feeview/${item.id}`}>
                                        <AiFillEye className="eye_icon me-3" />
                                      </Link>
                                    </td>
                                    </GateKeeper>
                                  </tr>

                                )
                              }) :
                                <tr>
                                  <td className="fs-13 black_300  lh-xs bg_light">
                                    Sorry! no data found
                                  </td>
                                </tr>
                            }


                            {/* <tr>
                            <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                              1
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              Karemgar Vaibhav
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              Secunderabad
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              Usha Kiran
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              9067373129
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              AWS + Devops
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light ">
                              2024-03-19
                            </td>
                            <td className="fs-13 black_300  lh-xs  bg_light">
                              17,000
                            </td>
                            <td className="fs-13 black_300  lh-xs  bg_light">-</td>

                            <td className="fs_14 text_mute bg_light lh-xs d-flex">
                              <Link to="/student/feeview">
                                <AiFillEye className="eye_icon me-3" />
                              </Link>
                            </td>
                          </tr> */}




                          </tbody>
                        </table>
                      </div>
                    
                    <div className=" mt-4 align-items-center d-flex justify-content-between">
                      <div>
                        {OverDueFeeDetailsStudents?.PaginatedOverDueFeeDetails &&
                          OverDueFeeDetailsStudents?.PaginatedOverDueFeeDetails?.length > 0 ? (
                          OverDueFeeDetailsStudents?.loading ? (
                            <div className="text_mute pagination-text">
                              Showing data is Loading ....
                            </div>
                          ) : (
                            <div className="text_mute pagination-text ">
                              Showing{" "}
                              <span className="fw-semibold">
                                {OverDueFeeDetailsStudents.startStudent}
                              </span>
                              {"  "}
                              to{"  "}
                              <span className="fw-semibold">
                                {OverDueFeeDetailsStudents.endStudent}
                              </span>
                              {"  "}
                              of{"  "}
                              <span className="fw-semibold">
                                {"  "}
                                {OverDueFeeDetailsStudents.searchResultStudents}
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
                              {OverDueFeeDetailsStudents.searchResultStudents}
                            </span>{" "}
                            Results
                          </div>
                        )}

                      </div>

                      {/* <div className="col-sm">
                        <div className="text_mute pagination-text">
                          Showing <span className="fw-semibold">5</span> of{" "}
                          <span className="fw-semibold">25</span> Results
                        </div>
                      </div> */}


                      <div className="col-sm-auto mt-3 mt-sm-0 d-flex">
                      <div className="mt-2">
                            <select
                              className="form-select form-control me-3 pagination-select"
                              aria-label="Default select example"
                              required
                              onChange={handlePerPageOverDue}

                            >
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="75">75</option>
                              <option value="100">100</option>
                              <option value="200">200</option>
                              <option value="300">300</option>
                              <option value="500">500</option>
                            </select>
                          </div>
                        <ul className="mt-2 pagination pagination-separated pagination-sm mb-0 justify-content-center">

                          <li className="page-item p-1 ">
                            <button
                              onClick={previousPageOverDue}
                              disabled={
                                OverDueFeeDetailsStudents.loading
                                  ? true
                                  : false || OverDueFeeDetailsStudents.currentPage === 1
                              }
                              style={{
                                cursor:
                                  OverDueFeeDetailsStudents.loading ||
                                    OverDueFeeDetailsStudents.currentPage === 1
                                    ? "not-allowed"
                                    : "auto",
                              }}
                              className={`border  border-1 ${OverDueFeeDetailsStudents.loading
                                ? "disabled"
                                : OverDueFeeDetailsStudents.currentPage === 1
                                  ? "disabled"
                                  : "cursor-auto"
                                }`}
                            >
                              <span className="text_color">←</span>
                            </button>
                          </li>

                          {[...Array(endPageOverDue - startPageOverDue + 1)].map((_, index) => {
                            const pageOverDue = startPageOverDue + index;
                            return (
                              <li className={`page-item p-1`}>
                                <button
                                  key={pageOverDue}
                                  // onClick={() => changePage(page)}
                                  onClick={() =>
                                    changePageOverDue(
                                      currentPageOverDue === 1 && pageOverDue === startPageOverDue
                                        ? 1
                                        : pageOverDue
                                    )
                                  }
                                  disabled={TodayFeeDetailsStudents.loading ? true : false}
                                  className={`border page-link border-1 ${currentPageOverDue === pageOverDue ||
                                    (currentPageOverDue === 1 && pageOverDue === startPageOverDue)
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  <span className="">{pageOverDue} </span>
                                </button>
                              </li>
                            );
                          })}


                          <li className="page-item p-1 ">
                            <button
                              onClick={nextPageOverDue}
                              disabled={
                                OverDueFeeDetailsStudents.loading
                                  ? true
                                  : false ||
                                  OverDueFeeDetailsStudents.currentPage ===
                                  OverDueFeeDetailsStudents.totalPages
                              }
                              style={{
                                cursor:
                                  OverDueFeeDetailsStudents.loading ||
                                    OverDueFeeDetailsStudents.currentPage ===
                                    OverDueFeeDetailsStudents.totalPages
                                    ? "not-allowed"
                                    : "auto",
                              }}
                              className={`border  border-1${OverDueFeeDetailsStudents.loading
                                ? "disabled"
                                : OverDueFeeDetailsStudents.currentPage ===
                                  OverDueFeeDetailsStudents.totalPages
                                  ? "disabled"
                                  : "cursor-auto"
                                }`}
                            >
                              <span className="text_color ">→</span>
                            </button>
                          </li>



                          {/* <li className="page-item disabled p-1">
                            <a href="#" className="page-link ">
                              ←
                            </a>
                          </li>
                          <li className="page-item p-1">
                            <a href="#" className="page-link">
                              1
                            </a>
                          </li>
                          <li className="page-item active p-1">
                            <a href="#" className="page-link ">
                              2
                            </a>
                          </li>
                          <li className="page-item p-1">
                            <a href="#" className="page-link">
                              3
                            </a>
                          </li>
                          <li className="page-item p-1">
                            <a href="#" className="page-link">
                              →
                            </a>
                          </li> */}


                        </ul>
                      </div>
                    </div>
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

export default FeeFollowUps;
