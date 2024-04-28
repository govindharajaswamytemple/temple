import React, { useEffect, useState } from "react";
import "../../../../assets/css/Table.css";
// import "../../../../assets/css/FeeDetails.css"
import "../../../../assets/css/FeeDetails.css";
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
import { FaArrowRight } from "react-icons/fa6";
import { MdFilterList } from "react-icons/md";
import FeeFollowUps from "./FeeFollowUps";
import Usedebounce from "../../../../dataLayer/hooks/useDebounce/Usedebounce";
import { useStudentsContext } from "../../../../dataLayer/hooks/useStudentsContext";
import { useBranchContext } from "../../../../dataLayer/hooks/useBranchContext";
import feerecordimg from "../../../../assets/images/feedetails/fee_records.svg";
import noduerecordimg from "../../../../assets/images/feedetails/No_due_records.svg";
import feefollowupimg from "../../../../assets/images/feedetails/Follow_Ups.svg";
import feerecievedimg from "../../../../assets/images/feedetails/fee_recived.svg";
import Button from "../../../components/button/Button";
import BackButton from "../../../components/backbutton/BackButton";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import GateKeeper from "../../../../rbac/GateKeeper";
function FeeDetailsPage() {
  const {
    studentState,
    studentState: { FeeDetailsStudents, NoDueFeeRecords_Students },
    Dispatchstudents,
  } = useStudentsContext();
  const { DispatchBranch, BranchState, getAllBranches } = useBranchContext();

  console.log(FeeDetailsStudents, "FeeDetailsStudentsee");

  const { debouncesetSearch, debouncesetPage } = Usedebounce(Dispatchstudents);

  const handleSearch = (e) => {
    debouncesetSearch({
      context: "FEE_DETAILS_STUDENTS",
      data: e.target.value,
    });
  };

  const handlePerPage = (e) => {
    const selectedvalue = parseInt(e.target.value, 10);
    Dispatchstudents({
      type: "SET_PER_PAGE",
      payload: {
        context: "FEE_DETAILS_STUDENTS",
        data: selectedvalue,
      },
    });
  };

  const [filterCriteria, setfilterCriteria] = useState({
    fromDate: "",
    toDate: "",
    branch: "",
    modeOfTraining: "",
  });

  console.log(filterCriteria, "hererdddaddcvvcvm");

  const HandleFilterCertria = (e) => {
    const { name, value } = e?.target;
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
      modeOfTraining: "",
    });
  };

  const filterSubmit = () => {
    console.log("filterCriteria", filterCriteria);
    Dispatchstudents({
      type: "SET_FILTERS",
      payload: {
        context: "FEE_DETAILS_STUDENTS",
        data: {
          fromDate: filterCriteria.fromDate,
          toDate: filterCriteria.toDate,
          branch: filterCriteria.branch,
          modeOfTraining: filterCriteria.modeOfTraining,
        },
      },
    });
  };

  // here the pagination----

  let currentPage = FeeDetailsStudents.currentPage;
  const totalPages = FeeDetailsStudents.totalPages;
  console.log(currentPage, "cuurentpagehere ", FeeDetailsStudents.currentPage);

  const changePage = (page) => {
    debouncesetPage({ context: "FEE_DETAILS_STUDENTS", data: page });
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

  useEffect(() => {
    debouncesetPage({ context: "FEE_DETAILS_STUDENTS", data: 1 });
    debouncesetSearch({
      context: "FEE_DETAILS_STUDENTS",
      data: "",
    });

    Dispatchstudents({
      type: "SET_FILTERS",
      payload: {
        context: "FEE_DETAILS_STUDENTS",
        data: {
          fromDate: "",
          toDate: "",
          branch: "",
          modeOfTraining: "",
        },
      },
    });

    Dispatchstudents({
      type: "SET_PER_PAGE",
      payload: {
        context: "FEE_DETAILS_STUDENTS",
        data: 10,
      },
    });
  }, []);

  //---------------------------------------HERE THE NO DUE FEE RECORDS FILTERS---------------------------------------------------

  console.log(NoDueFeeRecords_Students, "NoDueFeeRecords_Studentsde");

  const handleSearchDueFee = (e) => {
    debouncesetSearch({
      context: "NO_DUE_FEE_RECORDS_STUDENTS",
      data: e.target.value,
    });
  };

  const handlePerPageDueFee = (e) => {
    const selectedvalue = parseInt(e.target.value, 10);
    Dispatchstudents({
      type: "SET_PER_PAGE",
      payload: {
        context: "NO_DUE_FEE_RECORDS_STUDENTS",
        data: selectedvalue,
      },
    });
  };

  const [filterCriteriaDueFee, setfilterCriteriaDueFee] = useState({
    fromDate: "",
    toDate: "",
    branch: "",
    modeOfTraining: "",
  });

  console.log(filterCriteriaDueFee, "NOduefilters");

  const HandleFilterCertriaDueFee = (e) => {
    const { name, value } = e.target;
    setfilterCriteriaDueFee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const FilterResetDueFee = () => {
    setfilterCriteriaDueFee({
      fromDate: "",
      toDate: "",
      branch: "",
      modeOfTraining: "",
    });
  };

  const filterSubmitDueFee = () => {
    console.log("filterCritedffria", filterCriteriaDueFee);
    Dispatchstudents({
      type: "SET_FILTERS",
      payload: {
        context: "NO_DUE_FEE_RECORDS_STUDENTS",
        data: {
          fromDate: filterCriteriaDueFee.fromDate,
          toDate: filterCriteriaDueFee.toDate,
          branch: filterCriteriaDueFee.branch,
          modeOfTraining: filterCriteriaDueFee.modeOfTraining,
        },
      },
    });
  };

  // here Pagination

  let currentPageDueFee = NoDueFeeRecords_Students.currentPage;
  const totalPagesDueFee = NoDueFeeRecords_Students.totalPages;
  console.log(currentPageDueFee, "currentPageDueFees");

  const changePageDueFee = (pageDueFee) => {
    debouncesetPage({
      context: "NO_DUE_FEE_RECORDS_STUDENTS",
      data: pageDueFee,
    });
    currentPageDueFee = pageDueFee;
    // Add your logic here to handle page change
    console.log("Currentpagsdde:", pageDueFee);
  };

  const previousPageDueFee = () => {
    if (currentPageDueFee > 1) {
      changePageDueFee(currentPageDueFee - 1);
    }
  };

  const nextPageDueFee = () => {
    if (currentPageDueFee < totalPagesDueFee) {
      changePageDueFee(currentPageDueFee + 1);
    }
  };

  let startPageDueFee = Math.max(1, currentPageDueFee - 1);
  let endPageDueFee = Math.min(totalPagesDueFee, startPageDueFee + 2);
  if (endPageDueFee - startPageDueFee < 2) {
    startPageDueFee = Math.max(1, endPageDueFee - 2);
  }

  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (date) => {
    setSelectedDate(date[0]); // Flatpickr returns an array of dates
  };
 
  
  return (
    <div>
      <BackButton heading="Fee Details" content="Back" to="/" />
      <div className="overflow-autogtd container-fluid d-flex justify-content-center">
        <ul className="nav gap-3" id="pills-tab" role="tablist">
          <li className="nav-item w_100" role="presentation ">
            <button
              className="bg_white nav-link active card card_animate w_100 "
              id="pills-feerecords-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-feerecords"
              type="button"
              role="tab"
              aria-controls="pills-feerecords"
              aria-selected="true"
            >
              <div className="text-start ">
                <div className="d-flex justify-content-between align-items-center ">
                  <div>
                    <span className="fs_20 fw-500 me-2"> Fee Records</span>
                    {/* <div className='mt-3 fs-14 lh-100 text_underline black_300'>
                      <p>12,000 <FaArrowRight /></p>
                    </div> */}
                  </div>
                  <div className="flex-shrink-0">
                    <div className="avatar-sm">
                      <span className="avatar-title bg-danger-subtle rounded-circle fs-1">
                        <img
                          src={feerecordimg}
                          className="img-fluid"
                          width="100px"
                          height="100px"
                          alt=""
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </li>
          <li className="nav-item w_100" role="presentation">
            <button
              className="nav-link card card_animate w_100"
              id="pills-duerecords-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-duerecords"
              type="button"
              role="tab"
              aria-controls="pills-duerecords"
              aria-selected="false"
            >
              <div className="text-start">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fs_20 fw-500 me-2">No Due Records</span>
                    {/* <div className='mt-3 fs-14 lh-100 text_underline black_300'>
                      <p>5000 <FaArrowRight /></p>
                    </div> */}
                  </div>
                  <div className="flex-shrink-0">
                    <div className="avatar-sm">
                      <span className="avatar-title bg-danger-subtle rounded-circle fs-1">
                        <img
                          src={noduerecordimg}
                          className="img-fluid"
                          width="100px"
                          height="100px"
                          alt=""
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </li>
          <li className="nav-item w_100" role="presentation">
            <Link to="/student/feefollowups">
              <button
                className="nav-link card card_animate w_100"
                id="pills-feefollow-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-feefollow"
                type="button"
                role="tab"
                aria-controls="pills-feefollow"
                aria-selected="false"
              >
                <div className="text-start">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="fs_20 fw-500 me-2">Fee FollowUps</span>
                      {/* <div className='mt-3 fs-14 lh-100 text_underline black_300'>
                        <p>1100 <FaArrowRight /></p>
                      </div> */}
                    </div>
                    <div className="flex-shrink-0">
                      <div className="avatar-sm">
                        <span className="avatar-title bg-danger-subtle rounded-circle fs-1">
                          <img
                            src={feefollowupimg}
                            className="img-fluid"
                            width="100px"
                            height="100px"
                            alt=""
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </Link>
          </li>
          <li className="nav-item w_100" role="presentation">
            <button
              className="nav-link card card_animate w_100"
              id="pills-feereceived-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-feereceived"
              type="button"
              role="tab"
              aria-controls="pills-feereceived"
              aria-selected="false"
            >
              <div className="text-start">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="fs_20 fw-500 me-2">Fee Received</span>
                    {/* <div className='mt-3 fs-14 lh-100 text_underline black_300'>
                      <p>2345 <FaArrowRight /></p>
                    </div> */}
                  </div>
                  <div className="flex-shrink-0">
                    <div className="avatar-sm">
                      <span className="avatar-title bg-danger-subtle rounded-circle fs-1">
                        <img
                          src={feerecievedimg}
                          className="img-fluid"
                          width="100px"
                          height="100px"
                          alt=""
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>

      {/* FEE RECORDS */}
      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active w_100"
          id="pills-feerecords"
          role="tabpanel"
          aria-labelledby="pills-feerecords-tab"
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
                            className="form-control search text_color bg_input_color select"
                            placeholder="Search for..."
                            name="search"
                            required
                            onChange={handleSearch}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="buttons_alignment">
                          <div className="fs-13 me-3 mt-2 text_color">
                            {/* 10/40 */}
                          </div>
                         
                          <button
                            className="btn btn-sm btn_primary fs-13 me-1"
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
                      className="offcanvas offcanvas-end bg_white text_color"
                      id="offcanvasRight"
                      aria-labelledby="offcanvasRightLabel"
                    >
                      <div className="offcanvas-header">
                        <h5
                          className="offcanvas-title"
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
                            className="form-label fs-s text_color "
                            for="example-text-input "
                          >
                            From Date
                          </label>
                          <input
                            type="date"
                            className="form-control fs-s bg-form text_color bg_input_color date_input_color"
                            id="exampleInputdate"
                            name="fromDate"
                            value={filterCriteria.fromDate}
                            onChange={HandleFilterCertria}
                            required
                          />
                          {/* <Flatpickr
                            value={filterCriteria.fromDate}
                            onChange={HandleFilterCertria}
                            options={{
                              altInput: true, // Use an alternative text input instead of the default input
                              altFormat: "F j, Y", // Format for the alternative input
                              dateFormat: "D-M-Y", // Format for the date value
                              onClose: () => {
                                document
                                  .getElementById("custom-date-input")
                                  .blur(); // Blur the input field when the calendar is closed
                              },
                              altInputClass:
                                "form-control fs-s bg-form text_color bg_input_color select",
                            }}
                            id="custom-date-input" // Set an ID for the input field
                            placeholder="MM/DD/YY"
                          /> */}
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
                            className="form-control fs-s bg-form text_color bg_input_color date_input_color"
                            type="date"
                            id="exampleInputdate"
                            name="toDate"
                            value={filterCriteria.toDate}
                            onChange={HandleFilterCertria}
                            required
                          />
                          {/* <Flatpickr
                            value={filterCriteria.toDate}
                            onChange={HandleFilterCertria}
                            options={{
                              altInput: true, // Use an alternative text input instead of the default input
                              altFormat: "F j, Y", // Format for the alternative input
                              dateFormat: "D-M-Y", // Format for the date value
                              onClose: () => {
                                document
                                  .getElementById("custom-date-input")
                                  .blur(); // Blur the input field when the calendar is closed
                              },
                              altInputClass:
                                "form-control fs-s bg-form text_color bg_input_color date_input_color",
                            }}
                            id="custom-date-input" // Set an ID for the input field
                            placeholder="MM/DD/YY"
                          /> */}
                        </div>
                        {/* branch */}
                        <div className="mt-2">
                          <label className="form-label fs-s fw-medium text_color">
                            Branch
                          </label>
                          <select
                            className="form-select form-control text_color bg_input_color select"
                            aria-label="Default select example"
                            placeholder="branch*"
                            name="branch"
                            value={filterCriteria.branch}
                            onChange={HandleFilterCertria}
                            required
                          >
                            <option value="" disabled selected>
                              {" "}
                              Select the Branch{" "}
                            </option>
                            {BranchState.branches &&
                            BranchState.branches.length > 0
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
                          <label className="form-label fs-s fw-medium text_color">
                            Mode Of Training
                          </label>
                          <select
                            className="form-select form-control text_color bg_input_color select"
                            aria-label="Default select example"
                            placeholder="modeOfTraining*"
                            name="modeOfTraining"
                            value={filterCriteria.modeOfTraining}
                            onChange={HandleFilterCertria}
                            required
                          >
                            <option value="" disabled selected>
                              {" "}
                              Select Mode Of Training{" "}
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
                <div className="table-responsive table-container table-scroll table-card  border-0">
               
                    <table className="table table-centered align-middle  table-nowrap equal-cell-table table-hover">
                          <thead className="">
                            <tr className="">
                              <th scope="col" className="fs-13 lh-xs fw-600  ">
                                S.No
                              </th>
                              <th scope="col" className="fs-13 lh-xs  fw-600  ">
                                Name
                              </th>
                              <th scope="col" className="fs-13 lh-xs  fw-600  ">
                                Branch
                              </th>
                              <th scope="col" className="fs-13 lh-xs fw-600  ">
                                Counsellor
                              </th>
                              <th scope="col" className="fs-13 lh-xs fw-600  ">
                                Contact
                              </th>
                              <th scope="col" className="fs-13 lh-xs fw-600  ">
                                Course
                              </th>
                              <th scope="col" className="fs-13 lh-xs fw-600  ">
                                Date&nbsp;of&nbsp;Joining
                              </th>
                              <th scope="col" className="fs-13 lh-xs  fw-600  ">
                                Total&nbsp;Fee
                              </th>
                              <th scope="col" className="fs-13 lh-xs  fw-600 ">
                                Fee&nbsp;Paid
                              </th>
                              <th scope="col" className="fs-13 lh-xs  fw-600 ">
                                Due&nbsp;Date
                              </th>
                              <th scope="col" className="fs-13 lh-xs  fw-600 ">
                                Due&nbsp;Amount
                              </th>
                             
                              <th scope="col" className="fs-13 lh-xs  fw-600 ">
                                Installments
                              </th>
                              <GateKeeper requiredModule="Student Management" submenumodule="Fee Details" submenuReqiredPermission="canUpdate">
                              <th scope="col" className="fs-13 lh-xs  fw-600 ">
                                Action
                              </th>
                              </GateKeeper>
                            </tr>
                          </thead>
                          <tbody className="">
                            {FeeDetailsStudents?.PaginatedFeeDetailsStudents &&
                            FeeDetailsStudents?.PaginatedFeeDetailsStudents
                              .length > 0 ? (
                              FeeDetailsStudents?.loading ? (
                                "loading..."
                              ) : (
                                FeeDetailsStudents?.PaginatedFeeDetailsStudents.map(
                                  (item, index) => {
                                    return (
                                      <tr>
                                        <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                          {(currentPage - 1) *
                                            FeeDetailsStudents.perPage +
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
                                          {item.branch}
                                        </td>
                                        <td
                                          className="fs-13 black_300  lh-xs bg_light text-truncate"
                                          style={{ maxWidth: "150px" }}
                                          title={item.enquirytakenby}
                                        >
                                          {item.enquirytakenby}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {item.mobilenumber}
                                        </td>
                                        <td
                                          className="fs-13 black_300  lh-xs bg_light text-truncate"
                                          style={{ maxWidth: "150px" }}
                                          title={item.courses}
                                        >
                                          {item.courses}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {item.admissiondate}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {item.finaltotal}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {item.totalpaidamount}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.nextduedate}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {item.dueamount}
                                        </td>
                                       
                                        <td className="fs-13 black_300  lh-xs bg_light ">
                                          {/* {item.totalinstallments[0].totalinstallmentspaid} /  {item.totalinstallments[0].totalinstallments} */}
                                          {/* {item.totalinstallments} */}
                                          {
                                            item.totalinstallments
                                              .totalinstallments
                                          }

                                          {/* {item.totalinstallmentspaid}   /{item.totalinstallments} */}
                                        </td>
                                        <GateKeeper requiredModule="Student Management" submenumodule="Fee Details" submenuReqiredPermission="canUpdate">
                                        <td className="fs-14 text_mute bg_light   lh-xs">
                                          <Link
                                            to={`/student/feeview/${item.id}`}
                                          >
                                            <AiFillEye className=" eye_icon me-3" />
                                          </Link>
                                        </td>

                                        </GateKeeper>
                                      </tr>
                                    );
                                  }
                                )
                              )
                            ) : (
                              <tr>
                                <td className="fs-13 black_300  lh-xs bg_light ">
                                  Sorry!..No data found
                                </td>
                              </tr>
                            )}

                            {/* 1st row */}
                            {/* <tr>
                            <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                              01
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              K.Sadik
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              Ameerpet
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              Mohammed Afeeza
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              9347690554
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              AutoCad + Sketchup With Vray
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              18-Mar-2024
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              8,500
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              8,500
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              0
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light ">
                              1/2
                            </td>
                            <td className="fs-14 text_mute bg_light   lh-xs">
                              <Link to="/feeview">
                                <AiFillEye className="text-mute table_icons me-3" />
                              </Link>
                            </td>
                          </tr> */}
                          </tbody>
                        </table>
                      </div>
                  
                    {/* pagination */}
                    <div className=" mt-3 align-items-center d-flex justify-content-between row text-center text-sm-start">
                      <div className="col-sm">
                        {FeeDetailsStudents.PaginatedFeeDetailsStudents &&
                        FeeDetailsStudents.PaginatedFeeDetailsStudents.length >
                          0 ? (
                          FeeDetailsStudents?.loading ? (
                            <div className="text_mute pagination-text">
                              Showing data is Loading ....
                            </div>
                          ) : (
                            <div className="text_mute pagination-text">
                              Showing{" "}
                              <span className="fw-semibold">
                                {FeeDetailsStudents.startStudent}
                              </span>
                              {"  "}
                              to{"  "}
                              <span className="fw-semibold">
                                {FeeDetailsStudents.endStudent}
                              </span>
                              {"  "}
                              of{"  "}
                              <span className="fw-semibold">
                                {"  "}
                                {FeeDetailsStudents.searchResultStudents}
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
                              {FeeDetailsStudents.searchResultStudents}
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
                      <div className="mt-3">
                            <select
                              className="form-select form-control me-3 text_color bg_input_color pagination-select"
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

                        <ul
                          className="mt-3
                           pagination pagination-separated pagination-sm mb-0 justify-content-center"
                        >
                          <li className="page-item p-1">
                            <button
                              onClick={previousPage}
                              disabled={
                                FeeDetailsStudents.loading
                                  ? true
                                  : false ||
                                    FeeDetailsStudents.currentPage === 1
                              }
                              style={{
                                cursor:
                                  FeeDetailsStudents.loading ||
                                  FeeDetailsStudents.currentPage === 1
                                    ? "not-allowed"
                                    : "auto",
                              }}
                              className={`border border-1 ${
                                FeeDetailsStudents.loading
                                  ? "disabled"
                                  : FeeDetailsStudents.currentPage === 1
                                  ? "disabled"
                                  : "cursor-auto"
                              }`}
                            >
                              <span className="">←</span>
                            </button>
                          </li>

                          {[...Array(endPage - startPage + 1)].map(
                            (_, index) => {
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
                                    disabled={
                                      FeeDetailsStudents.loading ? true : false
                                    }
                                    className={`border page-link border-1 ${
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
                            }
                          )}

                          <li className="page-item p-1">
                            <button
                              onClick={nextPage}
                              disabled={
                                FeeDetailsStudents.loading
                                  ? true
                                  : false ||
                                    FeeDetailsStudents.currentPage ===
                                      FeeDetailsStudents.totalPages
                              }
                              style={{
                                cursor:
                                  FeeDetailsStudents.loading ||
                                  FeeDetailsStudents.currentPage ===
                                    FeeDetailsStudents.totalPages
                                    ? "not-allowed"
                                    : "auto",
                              }}
                              className={`border border-1${
                                FeeDetailsStudents.loading
                                  ? "disabled"
                                  : FeeDetailsStudents.currentPage ===
                                    FeeDetailsStudents.totalPages
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

        {/* -------------------------------------------------------------------------------------------------------- */}
        {/* No due record table */}
        <div
          className="tab-pane fade"
          id="pills-duerecords"
          role="tabpanel"
          aria-labelledby="pills-duerecords-tab"
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
                            className="form-control search text_color bg_input_color"
                            placeholder="Search for..."
                            name="search"
                            required
                            onChange={handleSearchDueFee}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="buttons_alignment">
                          <div className="fs-13 me-3 mt-2 text_color">
                            {/* 10/40 */}
                          </div>
                        
                          <button
                            className="btn btn-sm btn_primary fs-13 me-2"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRightSide"
                            aria-controls="offcanvasRightSide"
                          >
                            <MdFilterList className="me-1 mb-1" />
                            Filters
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="offcanvas offcanvas-end  bg_white text_color"
                      id="offcanvasRightSide"
                      aria-labelledby="offcanvasRightLabel"
                    >
                      <div className="offcanvas-header">
                        <h5
                          className="offcanvas-title"
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
                            className="form-control fs-s bg-form text_color bg_input_color date_input_color"
                            type="date"
                            id="exampleInputdate"
                            name="fromDate"
                            value={filterCriteriaDueFee.fromDate}
                            onChange={HandleFilterCertriaDueFee}
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
                            className="form-control fs-s bg-form text_color bg_input_color date_input_color"
                            type="date"
                            id="exampleInputdate"
                            name="toDate"
                            value={filterCriteriaDueFee.toDate}
                            onChange={HandleFilterCertriaDueFee}
                            required
                          />
                        </div>
                        {/* branch */}
                        <div className="mt-2">
                          <label className="form-label fs-s fw-medium text_color">
                            Branch
                          </label>
                          <select
                            className="form-select form-control text_color bg_input_color select"
                            aria-label="Default select example"
                            placeholder="branch*"
                            name="branch"
                            value={filterCriteriaDueFee.branch}
                            onChange={HandleFilterCertriaDueFee}
                            required
                          >
                            <option value="" disabled selected>
                              {" "}
                              Select the Branch{" "}
                            </option>
                            {BranchState.branches &&
                            BranchState.branches.length > 0
                              ? BranchState.branches.map((item, index) => (
                                  <option key={index} value={item.fullname}>
                                    {item.branch_name}
                                  </option>
                                ))
                              : null}
                          </select>
                        </div>
                        {/* mode of traing*/}
                        <div className="mt-2">
                          <label className="form-label fs-s fw-medium text_color">
                            Mode Of Training
                          </label>
                          <select
                            className="form-select form-control text_color bg_input_color select"
                            aria-label="Default select example"
                            placeholder="modeOfTraining*"
                            name="modeOfTraining"
                            value={filterCriteriaDueFee.modeOfTraining}
                            onChange={HandleFilterCertriaDueFee}
                            required
                          >
                            <option value="" disabled selected>
                              {" "}
                              Select Mode Of Training{" "}
                            </option>

                            <option value="online">online</option>
                            <option value="offline">offline</option>
                          </select>
                        </div>
                        <div>
                          <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                            <Button
                              className="btn btn_primary"
                              onClick={FilterResetDueFee}
                            >
                              Clear
                            </Button>
                          </div>
                          <div className="position-absolute bottom-0 end-0 me-2 mb-2">
                            <Button
                              className="btn btn_primary"
                              onClick={filterSubmitDueFee} 
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
                        <thead className="">
                          <tr className="">
                            <th scope="col" className="fs-13 lh-xs fw-600  ">
                              S.No
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600  ">
                              Name
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600  ">
                              Branch
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600  ">
                              Counsellor
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600  ">
                              Contact
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600  ">
                              Course
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600  ">
                              Date&nbsp;of&nbsp;Joining
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600  ">
                              Total&nbsp;Fee
                            </th>
                            <th scope="col" className="fs-13 lh-xs fw-600 ">
                              Fee&nbsp;Paid
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600 ">
                              Due&nbsp;Date
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600 ">
                              Due&nbsp;Amount
                            </th>
                           
                            <th scope="col" className="fs-13 lh-xs  fw-600 ">
                              Installments
                            </th>
                            <GateKeeper requiredModule="Student Management" submenumodule="Fee Details" submenuReqiredPermission="canUpdate">

                           
                            <th scope="col" className="fs-13 lh-xs fw-600 ">
                              Action
                            </th>
                            </GateKeeper>
                          </tr>
                        </thead>
                        <tbody className="">
                          {NoDueFeeRecords_Students.PaginatedNoDueFeeRecords_Students &&
                          NoDueFeeRecords_Students
                            .PaginatedNoDueFeeRecords_Students.length > 0 ? (
                            NoDueFeeRecords_Students?.loading ? (
                              "loading..."
                            ) : (
                              NoDueFeeRecords_Students.PaginatedNoDueFeeRecords_Students.map(
                                (item, index) => {
                                  return (
                                    <tr>
                                      <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                        {index + 1}
                                      </td>
                                      <td
                                        className="fs-13 black_300  lh-xs bg_light text-truncate"
                                        style={{ maxWidth: "150px" }}
                                        title={item.name}
                                      >
                                        {item.name}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.branch}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.enquirytakenby}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.mobilenumber}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.courses}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.admissiondate}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.finaltotal}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.totalpaidamount}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.nextduedate}
                                        </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.dueamount}
                                      </td>
                                     
                                      <td className="fs-13 black_300  lh-xs bg_light ">
                                        {
                                          item.totalinstallments[0]
                                            .totalinstallmentspaid
                                        }{" "}
                                        /{" "}
                                        {
                                          item.totalinstallments[0]
                                            .totalinstallments
                                        }
                                      </td>
                                      <GateKeeper requiredModule="Student Management" submenumodule="Fee Details" submenuReqiredPermission="canUpdate">
                                      <td className="fs-14 text_mute bg_light   lh-xs">
                                        <Link  to={`/student/feeview/${item.id}`}>
                                          <AiFillEye className=" eye_icon me-3" />
                                        </Link>
                                      </td>
                                      </GateKeeper>
                                    </tr>
                                  );
                                }
                              )
                            )
                          ) : (
                            <tr>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                Sorry! no Data found
                              </td>
                            </tr>
                          )}

                          {/* 1st row */}

                          {/* <tr>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                01
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                K.Sadik
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                Ameerpet
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                Mohammed Afeeza
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                9347690554
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                AutoCad + Sketchup With Vray
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                18-Mar-2024
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                8,500
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                8,500
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                0
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light ">
                                1/2
                              </td>
                              <td className="fs-14 text_mute bg_light   lh-xs">
                                <Link to="/feeview">
                                  <AiFillEye className=" eye_icon me-3" />
                                </Link>
                              </td>
                            </tr> */}
                        </tbody>
                      </table>
                   
                    {/* pagination */}

                   
                  </div>
                  <div className=" mt-4 align-items-center d-flex justify-content-between row text-center text-sm-start">
                      <div className="col-sm">
                        {NoDueFeeRecords_Students.PaginatedNoDueFeeRecords_Students &&
                        NoDueFeeRecords_Students
                          .PaginatedNoDueFeeRecords_Students.length > 0 ? (
                          NoDueFeeRecords_Students?.loading ? (
                            <div className="text_mute pagination-text">
                              Showing data is Loading ....
                            </div>
                          ) : (
                            <div className="text_mute pagination-text">
                              Showing{" "}
                              <span className="fw-semibold">
                                {NoDueFeeRecords_Students.startStudent}
                              </span>
                              {"  "}
                              to{"  "}
                              <span className="fw-semibold">
                                {NoDueFeeRecords_Students.endStudent}
                              </span>
                              {"  "}
                              of{"  "}
                              <span className="fw-semibold">
                                {"  "}
                                {NoDueFeeRecords_Students.searchResultStudents}
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
                              {NoDueFeeRecords_Students.searchResultStudents}
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
                              id="branch"
                              required
                              onChange={handlePerPageDueFee}
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
                              onClick={previousPageDueFee}
                              disabled={
                                NoDueFeeRecords_Students.loading
                                  ? true
                                  : false ||
                                    NoDueFeeRecords_Students.currentPage === 1
                              }
                              style={{
                                cursor:
                                  NoDueFeeRecords_Students.loading ||
                                  NoDueFeeRecords_Students.currentPage === 1
                                    ? "not-allowed"
                                    : "auto",
                              }}
                              className={`border border-1 ${
                                NoDueFeeRecords_Students.loading
                                  ? "disabled"
                                  : NoDueFeeRecords_Students.currentPage === 1
                                  ? "disabled"
                                  : "cursor-auto"
                              }`}
                            >
                              <span className="">←</span>
                            </button>
                          </li>

                          {[...Array(endPageDueFee - startPageDueFee + 1)].map(
                            (_, index) => {
                              const pageDueFee = startPageDueFee + index;
                              return (
                                <li className={`page-item p-1`}>
                                  <button
                                    key={pageDueFee}
                                    // onClick={() => changePage(page)}
                                    onClick={() =>
                                      changePageDueFee(
                                        currentPageDueFee === 1 &&
                                          pageDueFee === startPageDueFee
                                          ? 1
                                          : pageDueFee
                                      )
                                    }
                                    disabled={
                                      NoDueFeeRecords_Students.loading
                                        ? true
                                        : false
                                    }
                                    className={`border page-link border-1 ${
                                      currentPageDueFee === pageDueFee ||
                                      (currentPageDueFee === 1 &&
                                        pageDueFee === startPageDueFee)
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    <span className="">{pageDueFee} </span>
                                  </button>
                                </li>
                              );
                            }
                          )}

                          <li className="page-item p-1">
                            <button
                              onClick={nextPageDueFee}
                              disabled={
                                NoDueFeeRecords_Students.loading
                                  ? true
                                  : false ||
                                    NoDueFeeRecords_Students.currentPage ===
                                      NoDueFeeRecords_Students.totalPages
                              }
                              style={{
                                cursor:
                                  NoDueFeeRecords_Students.loading ||
                                  NoDueFeeRecords_Students.currentPage ===
                                    NoDueFeeRecords_Students.totalPages
                                    ? "not-allowed"
                                    : "auto",
                              }}
                              className={`border border-1${
                                NoDueFeeRecords_Students.loading
                                  ? "disabled"
                                  : NoDueFeeRecords_Students.currentPage ===
                                    NoDueFeeRecords_Students.totalPages
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
        <div
          className="tab-pane fade"
          id="pills-feereceived"
          role="tabpanel"
          aria-labelledby="pills-feereceived-tab"
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
                            className="form-control search text_color bg_input_color"
                            placeholder="Search for..."
                            name="search"
                            required
                            onChange={handleSearchDueFee}
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="buttons_alignment">
                          <div className="fs-13 me-3 mt-2 text_color">
                            {/* 10/40 */}
                          </div>
                       
                          <button
                            className="btn btn-sm btn_primary fs-13 me-2"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRightSide"
                            aria-controls="offcanvasRightSide"
                          >
                            <MdFilterList className="me-1 mb-1" />
                            Filters
                          </button>
                        </div>
                      </div>
                    </div>
                    <div
                      className="offcanvas offcanvas-end  bg_white text_color"
                      id="offcanvasRightSide"
                      aria-labelledby="offcanvasRightLabel"
                    >
                      <div className="offcanvas-header">
                        <h5
                          className="offcanvas-title"
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
                            className="form-control fs-s bg-form text_color bg_input_color select"
                            type="date"
                            id="exampleInputdate"
                            name="fromDate"
                            value={filterCriteriaDueFee.fromDate}
                            onChange={HandleFilterCertriaDueFee}
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
                            className="form-control fs-s bg-form text_color bg_input_color select "
                            type="date"
                            id="exampleInputdate"
                            name="toDate"
                            value={filterCriteriaDueFee.toDate}
                            onChange={HandleFilterCertriaDueFee}
                            required
                          />
                        </div>
                        {/* branch */}
                        <div className="mt-2">
                          <label className="form-label fs-s fw-medium text_color">
                            Branch
                          </label>
                          <select
                            className="form-select form-control text_color bg_input_color select"
                            aria-label="Default select example"
                            placeholder="branch*"
                            name="branch"
                            value={filterCriteriaDueFee.branch}
                            onChange={HandleFilterCertriaDueFee}
                            required
                          >
                            <option value="" disabled selected>
                              {" "}
                              Select the Branch{" "}
                            </option>
                            {BranchState.branches &&
                            BranchState.branches.length > 0
                              ? BranchState.branches.map((item, index) => (
                                  <option key={index} value={item.fullname}>
                                    {item.branch_name}
                                  </option>
                                ))
                              : null}
                          </select>
                        </div>
                        {/* mode of traing*/}
                        <div className="mt-2">
                          <label className="form-label fs-s fw-medium text_color">
                            Mode Of Training
                          </label>
                          <select
                            className="form-select form-control text_color bg_input_color select"
                            aria-label="Default select example"
                            placeholder="modeOfTraining*"
                            name="modeOfTraining"
                            value={filterCriteriaDueFee.modeOfTraining}
                            onChange={HandleFilterCertriaDueFee}
                            required
                          >
                            <option value="" disabled selected>
                              {" "}
                              Select Mode Of Training{" "}
                            </option>

                            <option value="online">online</option>
                            <option value="offline">offline</option>
                          </select>
                        </div>
                        <div>
                          <div className="position-absolute bottom-0 start-0 ms-2 mb-2">
                            <Button
                              className="btn btn_primary"
                              onClick={FilterResetDueFee}
                            >
                              Clear
                            </Button>
                          </div>
                          <div className="position-absolute bottom-0 end-0 me-2 mb-2">
                            <Button
                              className="btn btn_primary"
                              onClick={filterSubmitDueFee}
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
                        <thead className="">
                          <tr className="">
                            <th scope="col" className="fs-13 lh-xs fw-600  ">
                              S.No
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600  ">
                              Name
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600  ">
                              Branch
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600  ">
                              Counsellor
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600  ">
                              Contact
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600  ">
                              Course
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600  ">
                              Date&nbsp;of&nbsp;Joining
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600  ">
                              Total&nbsp;Fee
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600 ">
                              Fee&nbsp;Paid
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600 ">
                              Due&nbsp;Amount
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600 ">
                              Due&nbsp;Date
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600 ">
                              Installments
                            </th>
                            <th scope="col" className="fs-13 lh-xs  fw-600 ">
                              Action
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
                              K.Sadik
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              Ameerpet
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              Mohammed Afeeza
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              9347690554
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              AutoCad + Sketchup With Vray
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              18-Mar-2024
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              8,500
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              8,500
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              0
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                            18-Sept-2024
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light ">
                              1/2
                            </td>
                            <td className="fs-14 text_mute bg_light   lh-xs">
                              <Link to="/feeview">
                                <AiFillEye className=" eye_icon me-3" />
                              </Link>
                            </td>
                          </tr>
                          <tr>
                            <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                              01
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              K.Sadik
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              Ameerpet
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              Mohammed Afeeza
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              9347690554
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              AutoCad + Sketchup With Vray
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              18-Mar-2024
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              8,500
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              8,500
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                              0
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light">
                            18-Sept-2024
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light ">
                              1/2
                            </td>
                            <td className="fs-14 text_mute bg_light   lh-xs">
                              <Link to="/feeview">
                                <AiFillEye className=" eye_icon me-3" />
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* pagination */}

                   
                
                </div>
                <div className=" mt-3 align-items-center d-flex justify-content-between row text-center text-sm-start">
                      <div className="col-sm">
                        {NoDueFeeRecords_Students.PaginatedNoDueFeeRecords_Students &&
                        NoDueFeeRecords_Students
                          .PaginatedNoDueFeeRecords_Students.length > 0 ? (
                          NoDueFeeRecords_Students?.loading ? (
                            <div className="text_mute pagination-text">
                              Showing data is Loading ....
                            </div>
                          ) : (
                            <div className="text_mute pagination-text">
                              Showing{" "}
                              <span className="fw-semibold">
                                {NoDueFeeRecords_Students.startStudent}
                              </span>
                              {"  "}
                              to{"  "}
                              <span className="fw-semibold">
                                {NoDueFeeRecords_Students.endStudent}
                              </span>
                              {"  "}
                              of{"  "}
                              <span className="fw-semibold">
                                {"  "}
                                {NoDueFeeRecords_Students.searchResultStudents}
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
                              {NoDueFeeRecords_Students.searchResultStudents}
                            </span>{" "}
                            Results
                          </div>
                        )}

                        {/* <div className="text_mute pagination-text">
                          Showing <span className="fw-semibold">5</span> of{" "}
                          <span className="fw-semibold">25</span> Results
                        </div> */}
                      </div>
                      <div className="col-sm-auto mt-3 d-flex mt-sm-0">
                      <div className="mt-2">
                            <select
                              className="form-select form-control me-3 text_color bg_input_color pagination-select"
                              aria-label="Default select example"
                              placeholder="Branch*"
                              name="branch"
                              id="branch"
                              required
                              onChange={handlePerPageDueFee}
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
                              onClick={previousPageDueFee}
                              disabled={
                                NoDueFeeRecords_Students.loading
                                  ? true
                                  : false ||
                                    NoDueFeeRecords_Students.currentPage === 1
                              }
                              style={{
                                cursor:
                                  NoDueFeeRecords_Students.loading ||
                                  NoDueFeeRecords_Students.currentPage === 1
                                    ? "not-allowed"
                                    : "auto",
                              }}
                              className={`border border-1 ${
                                NoDueFeeRecords_Students.loading
                                  ? "disabled"
                                  : NoDueFeeRecords_Students.currentPage === 1
                                  ? "disabled"
                                  : "cursor-auto"
                              }`}
                            >
                              <span className="">←</span>
                            </button>
                          </li>

                          {[...Array(endPageDueFee - startPageDueFee + 1)].map(
                            (_, index) => {
                              const pageDueFee = startPageDueFee + index;
                              return (
                                <li className={`page-item p-1`}>
                                  <button
                                    key={pageDueFee}
                                    // onClick={() => changePage(page)}
                                    onClick={() =>
                                      changePageDueFee(
                                        currentPageDueFee === 1 &&
                                          pageDueFee === startPageDueFee
                                          ? 1
                                          : pageDueFee
                                      )
                                    }
                                    disabled={
                                      NoDueFeeRecords_Students.loading
                                        ? true
                                        : false
                                    }
                                    className={`border page-link border-1 ${
                                      currentPageDueFee === pageDueFee ||
                                      (currentPageDueFee === 1 &&
                                        pageDueFee === startPageDueFee)
                                        ? "active"
                                        : ""
                                    }`}
                                  >
                                    <span className="">{pageDueFee} </span>
                                  </button>
                                </li>
                              );
                            }
                          )}

                          <li className="page-item p-1">
                            <button
                              onClick={nextPageDueFee}
                              disabled={
                                NoDueFeeRecords_Students.loading
                                  ? true
                                  : false ||
                                    NoDueFeeRecords_Students.currentPage ===
                                      NoDueFeeRecords_Students.totalPages
                              }
                              style={{
                                cursor:
                                  NoDueFeeRecords_Students.loading ||
                                  NoDueFeeRecords_Students.currentPage ===
                                    NoDueFeeRecords_Students.totalPages
                                    ? "not-allowed"
                                    : "auto",
                              }}
                              className={`border border-1${
                                NoDueFeeRecords_Students.loading
                                  ? "disabled"
                                  : NoDueFeeRecords_Students.currentPage ===
                                    NoDueFeeRecords_Students.totalPages
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
    </div>
  );
}

export default FeeDetailsPage;
