import React, { useEffect, useRef } from "react";
import "../../../assets/css/Table.css"
import { GiTakeMyMoney } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { FaCalendarDays } from "react-icons/fa6";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaWpforms } from "react-icons/fa6";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RiUserFollowLine } from "react-icons/ri";
import ReactApexChart from 'react-apexcharts';
import { FaLessThanEqual, FaUsers } from "react-icons/fa";
import { FiArrowDownRight } from "react-icons/fi";
import { MdArrowOutward } from "react-icons/md";
import Flatpickr from "react-flatpickr";
import { TbMoneybag } from "react-icons/tb";
// import 'flatpickr/dist/flatpickr.min.css';
// import  "flatpickr/dist/themes/dark.css";
// import DashboardProvider from "./Dashboard Utils/DashboardProvider";
import DashboardProvider from "./DashboardUtils/DashboardProvider"


import "react-datepicker/dist/react-datepicker.css";

import { GiCash } from "react-icons/gi";
import { useBranchContext } from "../../../dataLayer/hooks/useBranchContext";
const Dashboard = () => {

  const { DispatchBranch, BranchState, getAllBranches } = useBranchContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeTab, setActiveTab] = useState('totalEnrollments');
  const [progressPercentageBranches, setProgressPercentageBranches] = useState([])
  console.log(activeTab, "dhfghjhdfj")

  const handleTabChange = (tabId) => {
    console.log(tabId, "dvhfhjdfg")
    setActiveTab(tabId);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const { Dashboardstate,
    Dashboardstate: { TotalEnrollementDetails, TotalFeeDetails, BranchwiseCouncellers, CouncellerwiseStudents, TotalUsersInDashboad, UsersListInBranchWise, FeeDetailsBranchwiseCouncellers, FeeDetailsCouncellerwiseStudents, TotalEnrollmentGraph },
    DispatchDashboard } = DashboardProvider();

  console.log(Dashboardstate, "jsfhdfghjfdsghf")

  console.log(CouncellerwiseStudents.paginatedCouncellerwiseStudents, "sdbnjfjdgsf")

  const currentDate = new Date();
  const [defaultDate, setDefaultDate] = useState([
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1), // Start of the current month
    new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0) // End of the current month
  ]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // ----------------------Total Enrollemts Tab Details---------------------------------------------------


  const [selectedDates, setSelectedDates] = useState(defaultDate)

  const handleDateChange = (selectedDates, dateStr, instance) => {
    console.log(selectedDates, "dfhhg")
    setSelectedDates(selectedDates)
    const formattedDates = selectedDates.map(date => formatDate(date));
    const Dateshere = {
      fromDate: formattedDates[0],
      toDate: formattedDates[formattedDates.length - 1]
    };
    console.log(Dateshere, "snjkdsjfh")
    DispatchDashboard({
      type: "SET_FILTER_DATE",
      payload: {
        data: Dateshere,
        context: "TOTAL_ENROLLMENTS_DETAILS",
      }
    });
  };


  // handle Branch submit in TotalEnrollemts
  const [activeBranch, setActiveBranch] = useState(null);
  const [activeCouncellor, setActiveCouncellor] = useState(null);
  const [activeUsersInTotalUsers, setactiveUsersInTotalUsers] = useState(null);
  console.log(activeUsersInTotalUsers, "sdhgsf")


  const handleBranchSubmit = (branch) => {
    setActiveBranch(branch);
    const BranchDetails = { branch }
    DispatchDashboard({
      type: "SET_BRANCH_DETAILS",
      payload: {
        data: BranchDetails,
        context: "TOTAL_ENROLLMENTS_DETAILS_BRANCH_WISE_COUNCELLERS",
      }
    })
  }

  const handleCouncellorSubmit = (enquirytakenby) => {
    setActiveCouncellor(enquirytakenby)
    const counceller = { enquirytakenby }
    console.log(counceller, "dfhdjfg")
    DispatchDashboard({
      type: "SET_COUNCELLOR_DETAILS",
      payload: {
        data: counceller,
        context: "TOTAL_ENROLLMENTS_DETAILS_COUNCELLOR_WISE_STUDENTS"
      }
    })
  }



  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const startDateRef1 = useRef(null);
  const endDateRef1 = useRef(null);
  const startDateRef2 = useRef(null);
  const endDateRef2 = useRef(null);

  const startDateRef3 = useRef(null);
  const endDateRef3 = useRef(null);


  useEffect(() => {
    console.log("startDate", startDate)
  }, [startDate])


  const handleOpenStartDateCalendar1 = () => {
    startDateRef1.current.setOpen(true);
  };

  const handleOpenEndDateCalendar1 = () => {
    endDateRef1.current.setOpen(true);
  };
  const handleOpenStartDateCalendar2 = () => {
    startDateRef2.current.setOpen(true);
  };

  const handleOpenEndDateCalendar2 = () => {
    endDateRef2.current.setOpen(true);
  };
  const handleOpenStartDateCalendar3 = () => {
    startDateRef3.current.setOpen(true);
  };

  const handleOpenEndDateCalendar3 = () => {
    endDateRef3.current.setOpen(true);
  };




  //------------------Total fee Details tab----------------

  const [selectedDateFeeDetails, setSelectedDateFeeDetails] = useState(defaultDate)

  const handleDateChangeInFeeDeatils = (selectedDates, dateStr, instance) => {
    setSelectedDateFeeDetails(selectedDates)
    const formattedDates = selectedDates.map(date => formatDate(date));
    const Dateshere = {
      fromDate: formattedDates[0],
      toDate: formattedDates[formattedDates.length - 1]
    };
    console.log(Dateshere, "snjkdsjfh")
    DispatchDashboard({
      type: "SET_FILTER_DATE",
      payload: {
        data: Dateshere,
        context: "TOTAL_FEE_DETAILS",
      }
    });
  }


  const handleBranchSubmitFeeDetails = (branch) => {
    const BranchDetails = { branch }
    console.log(BranchDetails, "djfgdjgf")
    DispatchDashboard({
      type: "SET_BRANCH_DETAILS",
      payload: {
        data: BranchDetails,
        context: "FEE_DETAILS_BRANCH_WISE_COUNCELLORS",
      }
    })
  }

  const handleCouncellorSubmitfeeDetails = (enquirytakenby) => {
    setActiveCouncellor(enquirytakenby)
    const counceller = { enquirytakenby }
    console.log(counceller, "dfhdjfg")
    DispatchDashboard({
      type: "SET_COUNCELLOR_DETAILS",
      payload: {
        data: counceller,
        context: "FEE_DETAILS_COUNCELLORS_WISE_STUDENTS"
      }
    })
  }


  // ---------------------Total Users tab---------------------------

  console.log(TotalUsersInDashboad, "dfdjfdjf")

  const handleBranchSubmitInUsers = (branch) => {
    setactiveUsersInTotalUsers(branch)
    const branchName = { branch }

    console.log(branchName, "jsvfhdf")
    DispatchDashboard({
      type: "SET_BRANCH_DETAILS",
      payload: {
        data: branchName,
        context: "ALL_USERS_LIST_IN_BRANCH_WISE"
      }
    })
  }




  useEffect(() => {
    if (TotalEnrollmentGraph?.yearlyEnrollments) {
      setChartData((prev) => ({
        ...prev,
        Enrollements: transformData([TotalEnrollmentGraph?.yearlyEnrollments])
      }))
    }

  }, [TotalEnrollmentGraph?.yearlyEnrollments])

  const transformData = (monthlyData) => {
    console.log(monthlyData, "dhgfjdgf")
    const categories = Object.keys(monthlyData[0]);
    console.log(categories, "sdhjgf")
    const data = categories.map(month => monthlyData[0][month]);
    console.log(data, "sdhjfgfggf")
    return [{ data }];
  }

  console.log(TotalEnrollmentGraph?.yearlyEnrollments, "dhfduxxxgf")
  console.log(TotalEnrollmentGraph, "ggg")

  const [chartData, setChartData] = useState({
    Enrollements: [{
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,// Hides the toolbar with the download SVG and other options
        }
      },
      colors: ['#405189'],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        labels: {

        },
        axisTicks: {
          show: true,
          style: {
            colors: '#405189',

          },
        }
      }
    }
  });







  const [formDataGraph, setFormDataGraph] = useState({
    branch: "",
  })
  console.log(formDataGraph.branch, "dgjgf")
  const HandleBranchGraph = (e) => { 
    const { name, value } = e.target;
    setFormDataGraph((prev) => ({
      ...prev,
      [name]: value
    }))
    const branch = e.target.value;
    console.log(branch, "dgjgf")

    const branchDetails = { branch }
    DispatchDashboard({
      type: "SET_BRANCH_DETAILS",
      payload: {
        data: branchDetails,
        context: "TOTAL_ENROLLMENTS_GRAPH"
      }
    })
  }



  return (
    <div>
      <div className="container-fluid mt-3">
        <div className="row mb-3 pb-1">
          <div className="col-12">
            <div className="d-flex align-items-lg-center flex-lg-row flex-column">
              <div className="flex-grow-1">
                <h4 className="fs-18  fw-600 black_300" >
                  Good Morning, Anna!
                </h4>
                <p className="black_300 mb-0">
                  Here what's happening with Teks's today.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
      {/* 4 cards */}
      <div className="container-fluid">

        <ul
          className="nav mb-3 nav-tabs nav-justified mb-3 nav-fill gap-4"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="card card_animate nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
              onClick={() => handleTabChange("totalEnrollments")}

            >
              <div className="d-flex align-items-center w-100 justify-content-between">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-start text-uppercase fw-medium text-mute text-truncate mt-0 fs-14">
                    Total Enrollments{" "}
                  </p>
                </div>

                {/*
               
               overallEnrollments,
               overallFinalTotal,
               overallFeeReceived,
               overallFeeYetToReceive
               */}

                <div className="flex-shrink-0 text-end">
                  <h5 className="text-success fs-14 mb-0">
                    {/* < MdArrowOutward className="text-success " /> */}
                    {/* {TotalEnrollementDetails && TotalEnrollementDetails?.totalNoOfEnrollements} */}
                    {/* +16.24 % */}
                  </h5>
                </div>
              </div>

              <div className="d-flex align-items-end justify-content-between mt-4 w-100">
                <div>
                  <h4 className="text-start fs-22 fw-semibold ff-secondary mb-4">
                    {/* ₹ */}
                    <span className="counter-value" data-target="559.25">

                      {TotalEnrollementDetails && TotalEnrollementDetails?.totalNoOfEnrollements}

                      {/* {TotalEnrollementDetails && TotalEnrollementDetails?.totalFeeReceived } */}
                      {/* 559.25 */}
                    </span>
                    {" "}
                  </h4>
                  <Link to="" className=" fs-14" >
                    View Enrollments
                  </Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-success-subtle rounded fs-3">
                    <FaWpforms className="text-success fs-20" />
                  </span>
                </div>
              </div>
            </button>
          </li>

          <li className="nav-item" role="presentation">
            <button
              className="card nav-link card_animate"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
              onClick={() => handleTabChange("feeDetails")}

            >
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-start text-uppercase fw-medium text-mute text-truncate mt-0 fs-14">
                    Fee Details
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className="text-danger fs-14 mb-0">
                    {/* <FiArrowDownRight className="text-danger" />
                    -3.57 % */}
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end mt-4 justify-content-between w-100">
                <div>
                  <h4 className="text-start fs-22 fw-semibold ff-secondary mb-4">
                    <span className="counter-value" data-target="36894">
                      12
                    </span>
                  </h4>
                  <Link to="" className=" fs-14">
                    View Fee Details
                  </Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-info-subtle rounded fs-3">
                    <FaIndianRupeeSign className="light-blue-color fs-18" />
                  </span>
                </div>
              </div>
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <Link to={"/student/feedetailspage"}>
              <button
                className="card nav-link card_animate"
                id="pills-contact-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-contact"
                type="button"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false"

              >
                <div className="d-flex align-items-center justify-content-between w-100">
                  <div className="flex-grow-1 overflow-hidden">
                    <p className="text-start text-uppercase fw-medium text-mute text-truncate mt-0 fs-14">
                      Fee FollowUps
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <h5 className="text-success fs-14 mb-0">
                      <i className="ri-arrow-right-up-line fs-14 align-middle"></i>{" "}
                      {/* +29.08 % */}
                    </h5>
                  </div>
                </div>
                <div className="d-flex align-items-end justify-content-between mt-4 w-100">
                  <div>
                    <h4 className="text-start fs-22 fw-semibold ff-secondary mb-4">
                      <span className="counter-value" data-target="183.35">
                        13
                      </span>

                    </h4>
                    <Link to="" className=" fs-14">
                      View Fee FollowUps
                    </Link>
                  </div>
                  <div className="avatar-sm flex-shrink-0">
                    <span className="avatar-title bg-warning-subtle rounded fs-3">
                      <TbMoneybag className="text_yellow fs-20" />
                    </span>
                  </div>
                </div>
              </button>
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="card nav-link card_animate"
              id="pills-fee-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-fee"
              type="button"
              role="tab"
              aria-controls="pills-fee"
              aria-selected="false"
              onClick={() => handleTabChange("totalUsers")}

            >
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-start text-uppercase fw-medium text-mute text-truncate mt-0 fs-14">
                    Total Users
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className="text-muted fs-14 mb-0">

                    {/* +0.00 % */}

                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4 w-100">
                <div>
                  <h4 className="text-start fs-22 fw-semibold ff-secondary mb-4">

                    <span className="counter-value" data-target="165.89">
                      {/* 14 */}

                      {TotalUsersInDashboad?.totalNoOfUsers}
                    </span>

                  </h4>
                  <Link to="" className="fs-14">
                    view Total Users
                  </Link>
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span className="avatar-title bg-primary-subtle rounded fs-3">
                    <FaUsers className="dwnld_icon fs-18" />
                  </span>
                </div>
              </div>
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"

          >
            {/* graph */}

            <div className="row">
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body mb-3">

                    <div className=" d-flex justify-content-between">
                      <div> <h6 className="">Overall Status Graph</h6></div>
                      <div className="col-lg-3 mb-2">
                        <select class="form-control fs-s bg-form text_color input_bg_color select form-select"
                          aria-label=""
                          placeholder=""
                          id="branch"
                          name="branch"
                          value={formDataGraph.branch}
                          onChange={HandleBranchGraph}
                          required
                        >
                          {/* <option value="" disabled selected> {" "} Select the Branch{" "} </option> */}
                          <option value="allbranches" selected >All</option>
                          {BranchState.branches && BranchState.branches.length > 0
                            ? BranchState.branches.map((item, index) => (
                              <option key={index} value={item.fullname}>
                                {item.branch_name}
                              </option>
                            ))
                            : null}
                          {/* <option>All</option>
                          <option>Ammerpet</option> */}
                        </select>
                      </div>
                    </div>
                    <div className="row g-0 text-center text_background">
                      <div className="col-6 col-sm-3">
                        <div className="p-3 border border-dashed border-start-1">
                          <h5 className="mb-1 fs-16">
                            <span className="counter-value fw-500 black_500 " data-target="7585">
                              {/* 7,585 */}

                              {
                                TotalEnrollmentGraph?.totalEnrollments && (
                                  TotalEnrollmentGraph?.totalEnrollments
                                )
                              }
                            </span>
                          </h5>
                          <p className="mb-0 fs-7 text-mute">
                            Total Enrollments
                          </p>
                        </div>
                      </div>
                      <div className="col-6 col-sm-3">
                        <div className="p-3 border border-dashed border-start-0">
                          <h5 className="mb-1 fs-16">
                            <span className="counter-value fw-500  black_500 " data-target="22.89">
                              {/* 22.89 */}
                              {
                                TotalEnrollmentGraph?.lastMonthEnrollments && (
                                  TotalEnrollmentGraph?.lastMonthEnrollments
                                )
                              }
                            </span>
                          </h5>
                          <p className="mb-0 fs-7 text-mute">
                            Last Month Enrollments
                          </p>
                        </div>
                      </div>
                      <div className="col-6 col-sm-3">
                        <div className="p-3 border border-dashed border-start-0">
                          <h5 className="mb-1 fs-16">
                            <span className="counter-value fw-500 black_500" data-target="367">
                              {/* 367 */}
                              {
                                TotalEnrollmentGraph?.currentmonthEnrollments && (
                                  TotalEnrollmentGraph?.currentmonthEnrollments
                                )
                              }
                            </span>
                          </h5>
                          <p className=" mb-0 fs-7 text-mute ">
                            Current Enrollments
                          </p>
                        </div>
                      </div>
                      <div className="col-6 col-sm-3">
                        <div className="p-3 border border-dashed border-start-0">
                          <h5 className="mb-1 fs-16">
                            <span className="counter-value fw-500 black_500" data-target="367">
                              {/* 367% */}
                              {
                                TotalEnrollmentGraph?.difference && (
                                  TotalEnrollmentGraph?.difference
                                )
                              }
                            </span>
                          </h5>
                          <p className=" mb-0 fs-7 text-mute">Difference</p>
                        </div>
                      </div>
                    </div>
                    {/* <h2>Graph</h2> */}
                    <div>
                      <div id="chart">
                        <ReactApexChart options={chartData.options} series={chartData?.Enrollements} type="bar" height={330} />
                      </div>
                      <div id="html-dist"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 black_300">
                <div className="card">
                  <div className="card-body">

                    <h6 className="mt-1">Individual Branch Count</h6>
                    {/* {TotalEnrollmentGraph?.progressPercentageBranches?.map((branch) => (<p>{branch.Ameerpet}</p>))} */}
                    {/* {TotalEnrollmentGraph.progressPercentageBranches != null && Object.keys(TotalEnrollmentGraph.progressPercentageBranches[0]).map((branch) => {
                      return (
                        <p>{branch}<span className="float-end">{TotalEnrollmentGraph?.progressPercentageBranches[0][branch]}</span></p>
                       
                      )
                    })} */}
                    <div className="table-container table-responsive ">
                      <div className="p-2 ">
                        {TotalEnrollmentGraph.progressPercentageBranches != null && Object.keys(TotalEnrollmentGraph.progressPercentageBranches[0]).map((branch) => {
                          const percentage = TotalEnrollmentGraph.progressPercentageBranches[0][branch].toFixed(0);
                          return (
                            <div key={branch} className="">
                              <p>{branch}<span className="float-end me-3">{percentage}%</span></p>
                              <div className="progress">
                                <div
                                  className="progress-bar progress-bar-striped progress-bar-animated"
                                  role="progressbar"
                                  style={{ width: `${percentage}%` }}
                                  aria-valuenow={percentage}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* totalEnrollments:{TotalEnrollmentGraph.totalEnrollments} */}


                    {/* <div class="progress mt-2 mb-4">
                      <div class="progress-bar progress-bar-striped progress-bar-animated w-50" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div> */}
                    {/*

                    <p className="mb-1 fs-s fw-100 mt-4">Ameerpet
                      <span className="float-end">25%</span></p>
                    <div class="progress mt-2">
                      <div class="progress-bar progress-bar-striped progress-bar-animated w-25" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                      </div>
                    </div>
                    <p className="mb-1 fs-s fw-100 mt-4">Ameerpet
                      <span className="float-end ">25%</span></p>
                    <div class="progress mt-3">
                      <div class="progress-bar progress-bar-striped progress-bar-animated w-50 " role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="mb-1 fs-s fw-100 mt-4">Ameerpet
                      <span className="float-end">25%</span></p>
                    <div class="progress mt-2">
                      <div class="progress-bar progress-bar-striped progress-bar-animated w-75" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="mb-1 fs-s fw-100 mt-4">Ameerpet
                      <span className="float-end">25%</span></p>
                    <div class="progress mt-2">
                      <div class="progress-bar progress-bar-striped progress-bar-animated w-25" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="mb-1 fs-s fw-100 mt-4">Ameerpet
                      <span className="float-end">25%</span></p>
                    <div class="progress mt-2 mb-5">
                      <div class="progress-bar progress-bar-striped progress-bar-animated w-50" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>


            <div className="row mt-2 mb-2 mt-lg-0">
              <div className="mb-0 card">
                <div className="card-body">

                  <div className="d-flex justify-content-end">
                    <div className="fs-s d-flex">

                      <div>
                        <DatePicker
                          ref={startDateRef1}

                          selected={startDate}

                          onChange={(date) => setStartDate(date)}
                          dateFormat="MM-dd-yyyy"
                          className="form-control"
                          placeholderText="From Date"

                        />
                      </div>
                      <div
                        className="input-group-text bg_calendar calendar-icon text-white cursor-pointer"
                        onClick={handleOpenStartDateCalendar1}
                      >
                        <FaCalendarDays className="fs-s" />
                      </div>
                    </div>

                    <div className=" ps-2 fs-s d-flex">
                      <div >
                        <DatePicker
                          selected={endDate}
                          // onChange={handleStartDateChange}
                          // startDate={startDate}
                          ref={endDateRef1}

                          onChange={(date) => setEndDate(date)}
                          dateFormat="MM-dd-yyyy"
                          className="form-control"
                          placeholderText="To Date"

                        />
                      </div>
                      <div
                        className="input-group-text bg_calendar text-white calendar-icon cursor-pointer"
                        onClick={handleOpenEndDateCalendar1}
                      >
                        <FaCalendarDays className="fs-s" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* tables */}

            <div className="row">
              {/* branch table */}
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <h6>Enrollement By Branch</h6>
                    <div className="card-body">

                      <div className="table-responsive table-scroll table-card border-0 dashboard-tables">
                        <table className="table table-centered align-middle table-nowrap equal-cell-table table-hover">

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
                                Branch
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 text-truncate " style={{ maxWidth: "50px" }} title=" Enrollments  "
                              >
                                Enrollments
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 text-truncate " style={{ maxWidth: "100px" }} title="  Booking Amount"
                              >
                                Booking Amount
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs fw-600  text-truncate " style={{ maxWidth: "100px" }} title="   Fee Received  "
                              >
                                Fee Received
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 text-truncate " style={{ maxWidth: "100px" }} title="     Fee Yet To Received  "
                              >
                                Fee Yet To Received
                              </th>
                            </tr>
                          </thead>
                          <tbody>

                            {
                              TotalEnrollementDetails?.PaginatedBranchs && TotalEnrollementDetails?.PaginatedBranchs?.length > 0 ?
                                TotalEnrollementDetails?.loading ? "loading..." : TotalEnrollementDetails?.PaginatedBranchs.map((item, index) => {

                                  const BranchDetails = item?.branch;

                                  return (
                                    <tr className={activeBranch === item.branch ? 'table-active' : ''}>
                                      <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                        {index + 1}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light " style={{ cursor: "pointer" }} onClick={() => handleBranchSubmit(BranchDetails)}>
                                        {item.branch}
                                      </td>

                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.enrollments}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.finalTotal}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.feeReceived}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.feeYetToReceive}
                                      </td>
                                    </tr>

                                  )
                                })
                                :
                                <tr>
                                  <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                    Sorry! No data found
                                  </td>
                                </tr>
                            }

                            {/* <tr className={` ${activeBranch === "krishna" ? "bg_active" : "bg_light"}`}>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                1
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light "

                                onClick={() => handleBranchSubmit("krishna")}
                              >
                                Secunderabad
                              </td>

                              <td className="fs-13 black_300  lh-xs bg_light">
                                123
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                34,98,455
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                21,47,455
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                13,51,000
                              </td>
                            </tr> */}


                          </tbody>
                        </table>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              {/*top rated counceller table */}
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <h6>Enrollement By Counsellors</h6>
                    <div className="card-body">
                      <div className="table-responsive table-scroll table-card border-0 dashboard-tables">
                        <table className="table table-centered align-middle table-nowrap equal-cell-table table-hover">
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
                                Counsellors
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 text-truncate " style={{ maxWidth: "50px" }} title=" Enrollments  "
                              >
                                Enrollments
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 text-truncate " style={{ maxWidth: "100px" }} title="  Booking Amount"
                              >
                                Booking Amount
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600  text-truncate " style={{ maxWidth: "100px" }} title="   Fee Received  "
                              >
                                Fee Received
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 text-truncate " style={{ maxWidth: "100px" }} title="     Fee Yet To Received  "
                              >
                                Fee Yet To Received
                              </th>
                            </tr>
                          </thead>



                          <tbody>

                            {/* top rated counceller  && Barch wise Councellors */}
                            {
                              BranchwiseCouncellers?.paginatedBranchwiseCouncellers && BranchwiseCouncellers?.paginatedBranchwiseCouncellers?.length > 0 ? BranchwiseCouncellers?.loading ? "loading..." :
                                BranchwiseCouncellers?.paginatedBranchwiseCouncellers.map((item, index) => {
                                  const councellerDetails = item.enquirytakenby
                                  return (
                                    <tr className={activeCouncellor === item.enquirytakenby ? 'table-active' : ''}>
                                      <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                        {index + 1}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light text-truncate" onClick={() => handleCouncellorSubmit(councellerDetails)} style={{ cursor: "pointer", maxWidth: "100px" }} title={item.enquirytakenby}>
                                        {item.enquirytakenby}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.enrollments}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.finalTotal}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.feeReceived}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.feeYetToReceive}
                                      </td>
                                    </tr>
                                  )
                                })
                                :
                                TotalEnrollementDetails?.PaginatedTopRatedCouncellers && TotalEnrollementDetails?.PaginatedTopRatedCouncellers?.length > 0 ? TotalEnrollementDetails?.loading ? "loading..." :
                                  TotalEnrollementDetails?.PaginatedTopRatedCouncellers.map((item, index) => {
                                    const councellerDetails = item.enquirytakenby;
                                    return (
                                      <tr className={activeCouncellor === item.enquirytakenby ? 'table-active' : ''}>
                                        <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                          {index + 1}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light text-truncate" onClick={() => handleCouncellorSubmit(councellerDetails)} style={{ cursor: "pointer", maxWidth: "100px" }} title={item.enquirytakenby}>
                                          {item.enquirytakenby}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {item.enrollments}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {item.finalTotal}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {item.feeReceived}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {item.feeYetToReceive}
                                        </td>
                                      </tr>
                                    )
                                  }) :
                                  <tr>
                                    <td className="fs-13 black_300  lh-xs bg_light">
                                      Sorry! No data found
                                    </td>
                                  </tr>
                            }

                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* student table */}
            <div className="card">
              <div className="card-header">
                <h6>Student Details</h6>
                <div className="card-body">
                  <div className="table-responsive dashboard-tables table-scroll table-card border-0">
                    <table className="table table-hover table-centered align-middle table-nowrap equal-cell-table  table-hover" >                      <thead>
                      <tr className="">
                        <th
                          scope="col"
                          className="fs-13 lh-xs fw-600 "
                        >
                          S.No
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600  " style={{ maxWidth: "100px" }} title=" Student Name"
                        >
                          Student Name
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600   text-truncate " style={{ maxWidth: "100px" }} title=" course"
                        >
                          Course
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600   text-truncate " style={{ maxWidth: "100px" }} title=" Admission Date"
                        >
                          Admission Date
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600  text-truncate " style={{ maxWidth: "100px" }} title=" Booking Amount"
                        >
                          Booking Amount
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600   text-truncate " style={{ maxWidth: "100px" }} title=" Paid Fee"
                        >
                          Paid Fee
                        </th>
                        <th
                          scope="col"
                          className="fs-13 lh-xs  fw-600  text-truncate " style={{ maxWidth: "100px" }} title=" Fee Yet to Recieved"
                        >
                          Fee Yet To Received
                        </th>
                      </tr>
                    </thead>
                      <tbody>


                        {
                          CouncellerwiseStudents && CouncellerwiseStudents?.paginatedCouncellerwiseStudents?.length > 0 ? CouncellerwiseStudents?.loading ? "loading..." : CouncellerwiseStudents?.paginatedCouncellerwiseStudents.map((item, index) => {

                            return (
                              <tr>
                                <td className="fs-13 black_300  lh-xs bg_light ">
                                  {index + 1}
                                </td>
                                <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "150px" }}>
                                  {item.name}
                                </td>
                                <td className="fs-13 black_300  lh-xs bg_light">
                                  course name
                                </td>
                                <td className="fs-13 black_300  lh-xs bg_light">
                                  admission date
                                </td>
                                <td className="fs-13 black_300  lh-xs bg_light">
                                  {item?.finalTotal}
                                </td>
                                <td className="fs-13 black_300  lh-xs bg_light">
                                  {item?.totalPaidAmount}
                                </td>
                                <td className="fs-13 black_300  lh-xs bg_light">
                                  {item?.dueAmount}
                                </td>
                              </tr>

                            )
                          }) :
                            <tr>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                Sorry! No data found
                              </td>
                            </tr>

                        }

                        {/* <tr>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                1
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "150px" }}>
                                Secunderabad
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                123
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                34,98,455
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                21,47,455
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                13,51,000
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                13,51,000
                              </td>
                            </tr> */}


                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>



          {/* Fee Details start */}
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
        
            {/* graph2 */}
            <div className="row">
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body mb-3">

                    <div className=" d-flex justify-content-between">
                      <div> <h6 className="">Overall Status Graph</h6></div>
                      <div className="col-lg-3 mb-2">
                        <select class="form-control fs-s bg-form text_color input_bg_color select form-select"
                          aria-label=""
                          placeholder=""
                          id="branch"
                          name="branch"
                          value={formDataGraph.branch}
                          onChange={HandleBranchGraph}
                          required
                        >
                          {/* <option value="" disabled selected> {" "} Select the Branch{" "} </option> */}
                          <option value="allbranches" selected >All</option>
                          {BranchState.branches && BranchState.branches.length > 0
                            ? BranchState.branches.map((item, index) => (
                              <option key={index} value={item.fullname}>
                                {item.branch_name}
                              </option>
                            ))
                            : null}
                          {/* <option>All</option>
                          <option>Ammerpet</option> */}
                        </select>
                      </div>
                    </div>
                    <div className="row g-0 text-center text_background">
                      <div className="col-6 col-sm-3">
                        <div className="p-3 border border-dashed border-start-1">
                          <h5 className="mb-1 fs-16">
                            <span className="counter-value fw-500 black_500 " data-target="7585">
                              {/* 7,585 */}

                              {
                                TotalEnrollmentGraph?.totalEnrollments && (
                                  TotalEnrollmentGraph?.totalEnrollments
                                )
                              }
                            </span>
                          </h5>
                          <p className="mb-0 fs-7 text-mute">
                            Total Enrollments
                          </p>
                        </div>
                      </div>
                      <div className="col-6 col-sm-3">
                        <div className="p-3 border border-dashed border-start-0">
                          <h5 className="mb-1 fs-16">
                            <span className="counter-value fw-500  black_500 " data-target="22.89">
                              {/* 22.89 */}
                              {
                                TotalEnrollmentGraph?.lastMonthEnrollments && (
                                  TotalEnrollmentGraph?.lastMonthEnrollments
                                )
                              }
                            </span>
                          </h5>
                          <p className="mb-0 fs-7 text-mute">
                            Last Month Enrollments
                          </p>
                        </div>
                      </div>
                      <div className="col-6 col-sm-3">
                        <div className="p-3 border border-dashed border-start-0">
                          <h5 className="mb-1 fs-16">
                            <span className="counter-value fw-500 black_500" data-target="367">
                              {/* 367 */}
                              {
                                TotalEnrollmentGraph?.currentmonthEnrollments && (
                                  TotalEnrollmentGraph?.currentmonthEnrollments
                                )
                              }
                            </span>
                          </h5>
                          <p className=" mb-0 fs-7 text-mute ">
                            Current Enrollments
                          </p>
                        </div>
                      </div>
                      <div className="col-6 col-sm-3">
                        <div className="p-3 border border-dashed border-start-0">
                          <h5 className="mb-1 fs-16">
                            <span className="counter-value fw-500 black_500" data-target="367">
                              {/* 367% */}
                              {
                                TotalEnrollmentGraph?.difference && (
                                  TotalEnrollmentGraph?.difference
                                )
                              }
                            </span>
                          </h5>
                          <p className=" mb-0 fs-7 text-mute">Difference</p>
                        </div>
                      </div>
                    </div>
                    {/* <h2>Graph</h2> */}
                    <div>
                      <div id="chart">
                        <ReactApexChart options={chartData.options} series={chartData?.Enrollements} type="bar" height={330} />
                      </div>
                      <div id="html-dist"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 black_300">
                <div className="card">
                  <div className="card-body">

                    <h6 className="mt-1">Individual Branch Count</h6>
                    {/* {TotalEnrollmentGraph?.progressPercentageBranches?.map((branch) => (<p>{branch.Ameerpet}</p>))} */}
                    {/* {TotalEnrollmentGraph.progressPercentageBranches != null && Object.keys(TotalEnrollmentGraph.progressPercentageBranches[0]).map((branch) => {
                      return (
                        <p>{branch}<span className="float-end">{TotalEnrollmentGraph?.progressPercentageBranches[0][branch]}</span></p>
                       
                      )
                    })} */}
                    <div className="table-container table-responsive ">
                      <div className="p-2 ">
                        {TotalEnrollmentGraph.progressPercentageBranches != null && Object.keys(TotalEnrollmentGraph.progressPercentageBranches[0]).map((branch) => {
                          const percentage = TotalEnrollmentGraph.progressPercentageBranches[0][branch].toFixed(0);
                          return (
                            <div key={branch} className="">
                              <p>{branch}<span className="float-end me-3">{percentage}%</span></p>
                              <div className="progress">
                                <div
                                  className="progress-bar progress-bar-striped progress-bar-animated"
                                  role="progressbar"
                                  style={{ width: `${percentage}%` }}
                                  aria-valuenow={percentage}
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    {/* totalEnrollments:{TotalEnrollmentGraph.totalEnrollments} */}


                    {/* <div class="progress mt-2 mb-4">
                      <div class="progress-bar progress-bar-striped progress-bar-animated w-50" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div> */}
                    {/*

                    <p className="mb-1 fs-s fw-100 mt-4">Ameerpet
                      <span className="float-end">25%</span></p>
                    <div class="progress mt-2">
                      <div class="progress-bar progress-bar-striped progress-bar-animated w-25" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                      </div>
                    </div>
                    <p className="mb-1 fs-s fw-100 mt-4">Ameerpet
                      <span className="float-end ">25%</span></p>
                    <div class="progress mt-3">
                      <div class="progress-bar progress-bar-striped progress-bar-animated w-50 " role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="mb-1 fs-s fw-100 mt-4">Ameerpet
                      <span className="float-end">25%</span></p>
                    <div class="progress mt-2">
                      <div class="progress-bar progress-bar-striped progress-bar-animated w-75" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="mb-1 fs-s fw-100 mt-4">Ameerpet
                      <span className="float-end">25%</span></p>
                    <div class="progress mt-2">
                      <div class="progress-bar progress-bar-striped progress-bar-animated w-25" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p className="mb-1 fs-s fw-100 mt-4">Ameerpet
                      <span className="float-end">25%</span></p>
                    <div class="progress mt-2 mb-5">
                      <div class="progress-bar progress-bar-striped progress-bar-animated w-50" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            {/* graph end */}
            <div className="row mt-2 mb-2 mt-lg-0">
              <div className="mb-0 card">
                <div className="card-body">
                  <div className="d-flex justify-content-end">
                    <div className="fs-s d-flex">

                      <div>
                        <DatePicker
                          ref={startDateRef2}

                          selected={startDate}

                          onChange={(date) => setStartDate(date)}
                          dateFormat="MM-dd-yyyy"
                          className="form-control"
                          placeholderText="From Date"

                        />
                      </div>
                      <div
                        className="input-group-text bg_calendar text-white calendar-icon cursor-pointer"
                        onClick={handleOpenStartDateCalendar2}
                      >
                        <FaCalendarDays className="fs-s" />
                      </div>
                    </div>

                    <div className=" ps-2 fs-s d-flex">
                      <div >
                        <DatePicker
                          selected={endDate}
                          // onChange={handleStartDateChange}
                          // startDate={startDate}
                          ref={endDateRef2}

                          onChange={(date) => setEndDate(date)}
                          dateFormat="MM-dd-yyyy"
                          className="form-control"
                          placeholderText="To Date"

                        />
                      </div>
                      <div
                        className="input-group-text bg_calendar calendar-icon text-white cursor-pointer"
                        onClick={handleOpenEndDateCalendar2}
                      >
                        <FaCalendarDays className="fs-s" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div></div>
            <div className="row">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <div className="card-body">
                      <div className="table-responsive table-scroll table-card border-0 dashboard-tables">
                        <table className="table table-centered align-middle table-nowrap equal-cell-table table-hover ">
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
                                Branch
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600  text-truncate " style={{ maxWidth: "100px" }} title=" Fee Received"
                              >
                                Fee Received
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 text-truncate " style={{ maxWidth: "100px" }} title=" Fee Yet to Recieved"
                              >
                                Fee Yet To Received
                              </th>
                            </tr>
                          </thead>
                          <tbody>

                            {
                              TotalFeeDetails?.PaginatedBranchs && TotalFeeDetails?.PaginatedBranchs.length > 0 ? TotalFeeDetails?.loading ?
                                "loading..." :
                                TotalFeeDetails?.PaginatedBranchs.map((item, index) => {
                                  return (
                                    <tr>
                                      <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                        1
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light" onClick={() => handleBranchSubmitFeeDetails(item.branch)}>
                                        Secunderabad
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        21,47,455
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        13,51,000
                                      </td>
                                    </tr>
                                  )
                                })
                                :
                                <tr>
                                  <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                    Sorry! No data found
                                  </td>
                                </tr>
                            }

                            <tr>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                1
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light" onClick={() => handleBranchSubmitFeeDetails("Secunderabad")}>
                                Secunderabad
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                21,47,455
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                13,51,000
                              </td>
                            </tr>
                            {/* <tr>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                2
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                Ameerpet
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                21,47,455
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                13,51,000
                              </td>
                            </tr>
                            <tr>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                3
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                kukatpally
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                21,47,455
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                13,51,000
                              </td>
                            </tr>
                            <tr>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                4
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                Dilsukhnagar
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                21,47,455
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                13,51,000
                              </td>
                            </tr>
                            <tr>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                5
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                Dilsukhnagar
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                21,47,455
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                13,51,000
                              </td>
                            </tr> */}


                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <div className="card-body">
                      <div className="table-responsive table-scroll table-card border-0 dashboard-tables">
                        <table className="table table-centered align-middle table-nowrap equal-cell-table table-hover">
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
                                Counsellor
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600  text-truncate " style={{ maxWidth: "100px" }} title=" Fee Received"
                              >
                                Fee Received
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600 text-truncate " style={{ maxWidth: "100px" }} title=" Fee Yet to Recieved"
                              >
                                Fee Yet To Received
                              </th>
                            </tr>
                          </thead>
                          <tbody>


                            {
                              FeeDetailsBranchwiseCouncellers.paginatedFeeDetailsBranchwiseCouncellers && FeeDetailsBranchwiseCouncellers.paginatedFeeDetailsBranchwiseCouncellers.length > 0 ? FeeDetailsBranchwiseCouncellers?.loading ? "loading..." : FeeDetailsBranchwiseCouncellers.paginatedFeeDetailsBranchwiseCouncellers.map((item, index) => {
                                return (
                                  <tr>
                                    <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                      1
                                    </td>
                                    <td className="fs-13 black_300  lh-xs bg_light" onClick={() => handleCouncellorSubmitfeeDetails("Divya")}>
                                      divya
                                    </td>
                                    <td className="fs-13 black_300  lh-xs bg_light">
                                      21,47,455
                                    </td>
                                    <td className="fs-13 black_300  lh-xs bg_light">
                                      13,51,000
                                    </td>
                                  </tr>
                                )
                              })
                                :
                                TotalFeeDetails?.PaginatedTopRatedCouncellers && TotalFeeDetails?.PaginatedTopRatedCouncellers.length > 0 ?
                                  TotalFeeDetails?.loading ? "loading..." : TotalFeeDetails?.PaginatedTopRatedCouncellers.map((item, index) => {
                                    return (
                                      <tr>
                                        <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                          1
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light" onClick={() => handleCouncellorSubmitfeeDetails("divya")}>
                                          Divya
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          21,47,455
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          13,51,000
                                        </td>
                                      </tr>
                                    )
                                  }) :

                                  <tr>
                                    <td className="fs-13 black_300  lh-xs bg_light">
                                      Sorry! no data found
                                    </td>
                                  </tr>
                            }

                            <tr>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                1
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light" onClick={() => handleCouncellorSubmitfeeDetails("Divya")}>
                                Divya
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                21,47,455
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                13,51,000
                              </td>
                            </tr>

                            {/* <tr>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                2
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                Ameerpet
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                21,47,455
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                13,51,000
                              </td>
                            </tr>
                            <tr>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                3
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                kukatpally
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                21,47,455
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                13,51,000
                              </td>
                            </tr>
                            <tr>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                4
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                Dilsukhnagar
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                21,47,455
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                13,51,000
                              </td>
                            </tr>
                            <tr>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                5
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                Dilsukhnagar
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                21,47,455
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                13,51,000
                              </td>
                            </tr> */}


                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* new row */}
            <div className="card">
              <div className="card-header">
                <div className="card-body">
                  <div className="table-responsive table-scroll table-card border-0 dashboard-tables">
                    <table className="table table-centered align-middle table-nowrap equal-cell-table table-hover">
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
                            Student Name
                          </th>
                          <th
                            scope="col"
                            className="fs-13 lh-xs  fw-600  "
                          >
                            Admission Date
                          </th>
                          <th
                            scope="col"
                            className="fs-13 lh-xs  fw-600  "
                          >
                            Paid Fee
                          </th>
                          <th
                            scope="col"
                            className="fs-13 lh-xs  fw-600  "
                          >
                            Net Due Date
                          </th>
                          <th
                            scope="col"
                            className="fs-13 lh-xs  fw-600 "
                          >
                            Due Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>

                        {
                          FeeDetailsCouncellerwiseStudents?.paginatedFeeDetailsCouncellerwiseStudents && FeeDetailsCouncellerwiseStudents?.paginatedFeeDetailsCouncellerwiseStudents.length > 0 ? FeeDetailsCouncellerwiseStudents?.loading ? "loading..." :
                            FeeDetailsCouncellerwiseStudents?.paginatedFeeDetailsCouncellerwiseStudents.map((item, index) => {

                              return (
                                <tr>
                                  <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                    1
                                  </td>
                                  <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "150px" }}>
                                    Secunderabad
                                  </td>
                                  <td className="fs-13 black_300  lh-xs bg_light">
                                    34,98,455
                                  </td>
                                  <td className="fs-13 black_300  lh-xs bg_light">
                                    21,47,455
                                  </td>
                                  <td className="fs-13 black_300  lh-xs bg_light">
                                    13,51,000
                                  </td>
                                  <td className="fs-13 black_300  lh-xs bg_light">
                                    13,51,000
                                  </td>
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
                            Secunderabad
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            34,98,455
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            21,47,455
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            13,51,000
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            13,51,000
                          </td>
                        </tr>
                        <tr>
                          <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                            2
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "150px" }}>
                            Ameerpet
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            34,98,455
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            21,47,455
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            13,51,000
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            13,51,000
                          </td>
                        </tr>
                        <tr>
                          <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                            3
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "150px" }}>
                            kukatpally
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            34,98,455
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            21,47,455
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            13,51,000
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            13,51,000
                          </td>
                        </tr>
                        <tr>
                          <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                            4
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "150px" }}>
                            dilsukhnagar
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            34,98,455
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            21,47,455
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            13,51,000
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            13,51,000
                          </td>
                        </tr>
                        <tr>
                          <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                            5
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light text-truncate" style={{ maxWidth: "150px" }}>
                            Secunderabad
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            34,98,455
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            21,47,455
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            13,51,000
                          </td>
                          <td className="fs-13 black_300  lh-xs bg_light">
                            13,51,000
                          </td>
                        </tr> */}

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Fee Details End */}
          {/* <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          >
            3
          </div> */}


          {/* T0TAL USERS  TAB */}
          <div
            className="tab-pane fade"
            id="pills-fee"
            role="tabpanel"
            aria-labelledby="pills-fee-tab"

          >
            <div className="row mt-2 mb-2 mt-lg-0">
              <div className="mb-0 card">
                <div className="card-body">
                  <div className="d-flex justify-content-end">
                    <div className="fs-s d-flex">

                      <div>
                        <DatePicker
                          ref={startDateRef3}

                          selected={startDate}

                          onChange={(date) => setStartDate(date)}
                          dateFormat="MM-dd-yyyy"
                          className="form-control"
                          placeholderText="From Date"

                        />
                      </div>
                      <div
                        className="input-group-text bg_calendar calendar-icon text-white cursor-pointer"
                        onClick={handleOpenStartDateCalendar3}
                      >
                        <FaCalendarDays className="fs-s" />
                      </div>
                    </div>

                    <div className=" ps-2 fs-s d-flex">
                      <div >
                        <DatePicker
                          selected={endDate}
                          // onChange={handleStartDateChange}
                          // startDate={startDate}
                          ref={endDateRef3}

                          onChange={(date) => setEndDate(date)}
                          dateFormat="MM-dd-yyyy"
                          className="form-control"
                          placeholderText="To Date"

                        />
                      </div>
                      <div
                        className="input-group-text bg_calendar text-white calendar-icon cursor-pointer"
                        onClick={handleOpenEndDateCalendar3}
                      >
                        <FaCalendarDays className="fs-s" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <div className="card-body">
                      <div className="table-responsive table-scroll table-card border-0 dashboard-tables">
                        <table className="table table-centered align-middle table-nowrap equal-cell-table table-hover">
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
                                Branch
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs  fw-600  "
                              >
                                Users Count
                              </th>
                            </tr>
                          </thead>
                          <tbody>

                            {
                              TotalUsersInDashboad?.paginatedBranchesList && TotalUsersInDashboad?.paginatedBranchesList.length > 0 ?

                                TotalUsersInDashboad?.loading ? "loading" :
                                  TotalUsersInDashboad?.paginatedBranchesList.map((item, index) => {
                                    const branch = item.branch;

                                    return (
                                      <tr className={activeUsersInTotalUsers === item?.branch ? 'table-active' : ''}>
                                        <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                          {index + 1}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light" style={{ cursor: "pointer" }} onClick={() => handleBranchSubmitInUsers(branch)}>
                                          {item.branch}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {item.users}
                                        </td>
                                      </tr>
                                    )
                                  })
                                : <tr>
                                  <td className="fs-13 black_300  lh-xs bg_light">
                                    Sorry! No data found
                                  </td>
                                </tr>
                            }


                            {/* <tr>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                1
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                Secunderabad
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                34,98,455
                              </td>
                            </tr> */}


                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <div className="card-body">
                      <div className="table-responsive table-scroll table-card border-0 dashboard-tables">
                        <table className="table table-centered align-middle table-nowrap equal-cell-table table-hover">
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
                                className="fs-13 lh-xs fw-600  "
                              >
                                Username
                              </th>
                              <th
                                scope="col"
                                className="fs-13 lh-xs fw-600  "
                              >
                                Profile
                              </th>
                            </tr>
                          </thead>
                          <tbody>

                            {
                              UsersListInBranchWise?.paginatedUsersListInBranchWise && UsersListInBranchWise?.paginatedUsersListInBranchWise.length > 0 ? UsersListInBranchWise?.loading ?

                                <tr>
                                  <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                    loading...
                                  </td>
                                </tr>
                                :
                                UsersListInBranchWise?.paginatedUsersListInBranchWise?.map((item, index) => {

                                  return (
                                    <tr>
                                      <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                        {index + 1}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.fullname}
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {item.profile}
                                      </td>
                                    </tr>
                                  )
                                })
                                :
                                <tr className="fs-13 black_300  lh-xs bg_light">

                                  Sorry! No data found / Select the Branch

                                </tr>
                            }

                            {/* <tr>
                              <td className="fs-13 black_300 fw-500 lh-xs bg_light ">
                                1
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                Superman
                              </td>
                              <td className="fs-13 black_300  lh-xs bg_light">
                                God
                              </td>
                            </tr> */}


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
      </div>
    </div >

  );
};

export default Dashboard;