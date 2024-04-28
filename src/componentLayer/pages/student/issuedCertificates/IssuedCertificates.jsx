import React, { useEffect, useState } from 'react'
import "../../../../assets/css/Table.css"
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
import { useStudentsContext } from '../../../../dataLayer/hooks/useStudentsContext';
import Usedebounce from '../../../../dataLayer/hooks/useDebounce/Usedebounce';
import { useBranchContext } from '../../../../dataLayer/hooks/useBranchContext';
import { useCourseContext } from '../../../../dataLayer/hooks/useCourseContext';
import BackButton from '../../../components/backbutton/BackButton';
import { MdFilterList } from "react-icons/md";



function IssuedCertificates() {
    const { courseState } = useCourseContext();
    const { DispatchBranch, BranchState, getAllBranches } = useBranchContext();
    const { studentState, studentState: { Issued_CerificateStudents }, Dispatchstudents } = useStudentsContext();
    const { debouncesetSearch, debouncesetPage } = Usedebounce(Dispatchstudents);

    console.log(Issued_CerificateStudents, "Issued_CerificateStudentsddd")


    // here the filters , serach and perPage are functionality---------
    //  handle search

    const handleSearch = (e) => {
        debouncesetSearch({ context: "ISSUED_CERTIFICATES_STUDENTS", data: e.target.value });
    };

    // handle perPage
    const handlePerPage = (e) => {
        const selectedvalue = parseInt(e.target.value, 10);
        Dispatchstudents({
            type: "SET_PER_PAGE",
            payload: {
                context: "ISSUED_CERTIFICATES_STUDENTS",
                data: selectedvalue,
            },
        });
    };

    // filters

    const [filterCriteria, setfilterCriteria] = useState({
        fromDate: "",
        toDate: "",
        branch: "",
        course: "",
    });

    console.log(filterCriteria, "herersssadvvcvm");

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
        console.log("filterCriteria", filterCriteria);
        Dispatchstudents({
            type: "SET_FILTERS",
            payload: {
                context: "ISSUED_CERTIFICATES_STUDENTS",
                data: {
                    fromDate: filterCriteria.fromDate,
                    toDate: filterCriteria.toDate,
                    branch: filterCriteria.branch,
                    course: filterCriteria.course,
                },
            },
        });
    };


    // reset all the filters

    useEffect(() => {

        debouncesetSearch({ context: "ISSUED_CERTIFICATES_STUDENTS", data: "" });
        debouncesetPage({ context: "ISSUED_CERTIFICATES_STUDENTS", data: 1 });
        Dispatchstudents({
            type: "SET_FILTERS",
            payload: {
                context: "ISSUED_CERTIFICATES_STUDENTS",
                data: {
                    fromDate: "",
                    toDate: "",
                    branch: "",
                    course: "",
                },
            },
        });
        Dispatchstudents({
            type: "SET_PER_PAGE",
            payload: {
                context: "ISSUED_CERTIFICATES_STUDENTS",
                data: 10,
            },
        });


    }, [])



    // pagination here-----------

    let currentPage = Issued_CerificateStudents.currentPage;
    const totalPages = Issued_CerificateStudents.totalPages;
    console.log(currentPage, "cuurentpagehere ", Issued_CerificateStudents.currentPage);

    const changePage = (page) => {
        debouncesetPage({ context: "ISSUED_CERTIFICATES_STUDENTS", data: page });
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

   
  
  
   
    return (
        <div>
            <BackButton heading="Issued Certificate" content="Back" to="/student/requestedcertificate" />
            <div className='container-fluid'>
                <div className="row">
                    <div className="col-xl-12">
                        <div className="card border-0">
                            <div class="card-header">
                                <div className="row justify-content-between">
                                    <div className="col-sm-4">
                                        <div className="search-box">
                                            <input type="text"
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
                                                {/* 10/40 */}
                                            </div>
                                           
                                            <button className="btn btn_primary fs-13 me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">   <MdFilterList className="me-1 mb-1" /> Filters</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="offcanvas offcanvas-end  " id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                    <div className="offcanvas-header">
                                        <h5 className="offcanvas-title" id="offcanvasRightLabel">Filters</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div className="offcanvas-body p-2">
                                        {/* from calendar */}
                                        <div class="form-group text-start">
                                            <label
                                                class="form-label fs-s txt-color"
                                                for="example-text-input "
                                            >
                                                From Date
                                            </label>
                                            <input
                                                class="form-control fs-s bg-form input_bg_color date_input_color"
                                                type="date"
                                                id="exampleInputdate"
                                                name="fromDate"
                                                value={filterCriteria.fromDate}
                                                onChange={HandleFilterCertria}
                                                required
                                            />
                                        </div>
                                        {/* to calendar */}
                                        <div class="form-group text-start mt-2">
                                            <label
                                                class="form-label fs-s txt-color"
                                                for="example-text-input "
                                            >
                                                To Date
                                            </label>
                                            <input
                                                class="form-control fs-s bg-form input_bg_color date_input_color"
                                                type="date"
                                                id="exampleInputdate"
                                                name="toDate"
                                                value={filterCriteria.toDate}
                                                onChange={HandleFilterCertria}
                                                required
                                            />
                                        </div>
                                        {/* Course */}
                                        <div className="">
                                            <label className="form-label fs-s fw-medium txt-color">Course</label>
                                            <select
                                                className="form-select form-control input_bg_color select"
                                                aria-label="Default select example"
                                                placeholder="Branch*"
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
                                            <label className="form-label fs-s fw-medium txt-color">Branch</label>
                                            <select
                                                className="form-select form-control input_bg_color select "
                                                aria-label="Default select example"
                                                placeholder="Branch*"
                                                id="branch"
                                                name="branch"
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
                                                <button className="btn btn_primary"
                                                    onClick={FilterReset} 
                                                >Clear</button>
                                            </div>
                                            <div className="position-absolute bottom-0 end-0 me-2 mb-2">
                                                <button className="btn btn_primary"
                                                    onClick={filterSubmit}  
                                                >Save</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
            
                  <div className="table-container table-scroll table-responsive table-card  border-0">
                    <table className="table table-centered align-middle  table-nowrap equal-cell-table table-hover">
                                        <thead>
                                            <tr className=''>
                                                <th scope="col" className="fs-13 lh-xs fw-600 black_300 ">
                                                    S.No
                                                </th>
                                                <th scope="col" className="fs-13 lh-xs black_300 fw-600  ">
                                                    Name
                                                </th>
                                                <th scope="col" className="fs-13 lh-xs black_300 fw-600  ">
                                                    Course
                                                </th>
                                                <th scope="col" className="fs-13 lh-xs black_300 fw-600  ">
                                                    Registration ID
                                                </th>
                                                <th scope="col" className="fs-13 lh-xs black_300 fw-600 ">
                                                    Course StartDate
                                                </th>
                                                <th scope="col" className="fs-13 lh-xs black_300 fw-600 ">
                                                    Course EndDate
                                                </th>
                                                <th scope="col" className="fs-13 lh-xs black_300 fw-600 ">
                                                    Certificate&nbsp;Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className=''>
                                            {
                                                Issued_CerificateStudents.Paginated_Issued_CerificateStudents && Issued_CerificateStudents.Paginated_Issued_CerificateStudents.length > 0 ? Issued_CerificateStudents.loading ? "loading..." : Issued_CerificateStudents.Paginated_Issued_CerificateStudents.map((item, index) => {

                                                    let certificateStatusObj = item.certificate_status;
                                                    if (typeof certificateStatusObj === 'string') {
                                                        certificateStatusObj = JSON?.parse(certificateStatusObj);
                                                    }

                                                    console.log(certificateStatusObj, "djfjdgf")
                                                    const certificateStatus = certificateStatusObj?.map((item) => item?.certificateStatus)?.join(", ");
                                                    console.log(certificateStatus, "certificateStadftus")

                                                    const courseStartDate = certificateStatusObj?.map((item) => item?.courseStartDate)?.join(", ")
                                                    console.log(courseStartDate, "courseStartDatejh")
                                                    //CourseEndDate
                                                    const courseEndDate = certificateStatusObj?.map((item) => item?.courseEndDate)?.join(", ");
                                                    console.log(courseEndDate, "courseEndDatedf")

                                                    // let certificateStatusObj = item.certificate_status;
                                                    // if (typeof certificateStatusObj === 'string') {
                                                    //     certificateStatusObj = JSON?.parse(certificateStatusObj);
                                                    // }
                                                    // console.log(certificateStatusObj, "fdhfdf")
                                                    // const courseStartDate = certificateStatusObj?.map((item) => item?.courseStartDate)
                                                    // const courseEndDate = certificateStatusObj?.map((item) => item?.courseEndDate)
                                                    // const certificateStatus = certificateStatusObj?.map((item) => item?.certificateStatus)



                                                    //courseStartDate
                                                    let formattedcourseStartDate = new Date(courseStartDate);
                                                    const courseStartDateday = formattedcourseStartDate.getUTCDate();
                                                    const courseStartDatemonthIndex = formattedcourseStartDate.getUTCMonth();
                                                    const courseStartDateyear = formattedcourseStartDate.getUTCFullYear();

                                                    console.log(formattedcourseStartDate, "formattedcourseStartDate")
                                                    //courseEndDate
                                                    let formattedcourseEndDate = new Date(courseEndDate);
                                                    const courseEndDateday = formattedcourseEndDate.getUTCDate();
                                                    const courseEndDatemonthIndex = formattedcourseEndDate.getUTCMonth();
                                                    const courseEndDateyear = formattedcourseEndDate.getUTCFullYear();
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


                                                    return (
                                                        <tr>
                                                            <td className='fs-13 black_300 fw-500 lh-xs bg_light '>
                                                                {(currentPage - 1) *
                                                                    Issued_CerificateStudents.perPage +
                                                                    index +
                                                                    1}
                                                            </td>
                                                            <td className='fs-13 black_300  lh-xs bg_light text-truncate' style={{ maxWidth: "150px" }} title={item.name}>
                                                                {item.name}
                                                            </td>
                                                            <td className='fs-13 black_300  lh-xs bg_light text-truncate' style={{ maxWidth: "150px" }} title={item.courses}>
                                                                {item.courses}
                                                            </td>
                                                            <td className='fs-13 black_300  lh-xs bg_light'>
                                                                {item.registrationnumber}
                                                            </td>
                                                            <td className='fs-13 black_300  lh-xs bg_light'>
                                                                {formattedcourseStartDate}
                                                            </td>
                                                            <td className='fs-13 black_300  lh-xs bg_light '>
                                                                {formattedcourseEndDate}
                                                            </td>
                                                            <td className='fs-13 black_300  lh-xs  bg_light'>
                                                                {/* <span className='badge btn_primary'>Certificate Issued</span> */}

                                                                {certificateStatus ===
                                                                    "issued" && (
                                                                        <div className="text-white rounded font-size-xxs   btn_issued_certificate fw-100 text-center pt-1 pb-1 ps-1"
                                                                            type='button'

                                                                        >
                                                                            Issued Certificate
                                                                        </div>
                                                                    )
                                                                }
                                                            </td>
                                                        </tr>

                                                    )
                                                })

                                                    :
                                                    <tr>
                                                        <td className='fs-13 black_300  lh-xs  bg_light'>
                                                            Sorry! No data found
                                                        </td>
                                                    </tr>
                                            }


                                            {/* 1st row */}
                                            {/* <tr>
                                                <td className='fs-13 black_300 fw-500 lh-xs bg_light '>
                                                    1
                                                </td>
                                                <td className='fs-13 black_300  lh-xs bg_light'>
                                                    Lakshmi
                                                </td>
                                                <td className='fs-13 black_300  lh-xs bg_light'>
                                                    Phthon
                                                </td>
                                                <td className='fs-13 black_300  lh-xs bg_light'>
                                                    TRDJFVF123
                                                </td>
                                                <td className='fs-13 black_300  lh-xs bg_light'>
                                                    20-3-2024
                                                </td>
                                                <td className='fs-13 black_300  lh-xs bg_light '>
                                                    20-6-2024
                                                </td>
                                                <td className='fs-13 black_300  lh-xs  bg_light'>
                                                    <span className='badge btn_primary'>Certificate Issued</span>
                                                </td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                                <div className=" mt-3 align-items-center d-flex justify-content-between row text-center text-sm-start">
                                    <div className="col-sm">

                                        {Issued_CerificateStudents.Paginated_Issued_CerificateStudents &&
                                            Issued_CerificateStudents.Paginated_Issued_CerificateStudents.length > 0 ? (
                                            Issued_CerificateStudents?.loading ? (
                                                <div className="text_mute pagination-text">
                                                    Showing data is Loading ....
                                                </div>
                                            ) : (
                                                <div className="text_mute pagination-text">
                                                    Showing{" "}
                                                    <span className="fw-semibold">
                                                        {Issued_CerificateStudents.startStudent}
                                                    </span>
                                                    {"  "}
                                                    to{"  "}
                                                    <span className="fw-semibold">
                                                        {Issued_CerificateStudents.endStudent}
                                                    </span>
                                                    {"  "}
                                                    of{"  "}
                                                    <span className="fw-semibold">
                                                        {"  "}
                                                        {Issued_CerificateStudents.searchResultStudents}
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
                                                    {Issued_CerificateStudents.searchResultStudents}
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


                                            <li className="page-item p-1">
                                                <button
                                                    onClick={previousPage}
                                                    disabled={
                                                        Issued_CerificateStudents.loading
                                                            ? true
                                                            : false || Issued_CerificateStudents.currentPage === 1
                                                    }
                                                    style={{
                                                        cursor:
                                                            Issued_CerificateStudents.loading ||
                                                                Issued_CerificateStudents.currentPage === 1
                                                                ? "not-allowed"
                                                                : "auto",
                                                    }}
                                                    className={`border border-1 rounded ${Issued_CerificateStudents.loading
                                                        ? "disabled"
                                                        : Issued_CerificateStudents.currentPage === 1
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
                                                            // onClick={() => changePage(page)}
                                                            onClick={() =>
                                                                changePage(
                                                                    currentPage === 1 && page === startPage
                                                                        ? 1
                                                                        : page
                                                                )
                                                            }
                                                            disabled={Issued_CerificateStudents.loading ? true : false}
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

                                            <li className="page-item p-1">
                                                <button
                                                    onClick={nextPage}
                                                    disabled={
                                                        Issued_CerificateStudents.loading
                                                            ? true
                                                            : false ||
                                                            Issued_CerificateStudents.currentPage ===
                                                            Issued_CerificateStudents.totalPages
                                                    }
                                                    style={{
                                                        cursor:
                                                            Issued_CerificateStudents.loading ||
                                                                Issued_CerificateStudents.currentPage ===
                                                                Issued_CerificateStudents.totalPages
                                                                ? "not-allowed"
                                                                : "auto",
                                                    }}
                                                    className={`border border-1 rounded ${Issued_CerificateStudents.loading
                                                        ? "disabled"
                                                        : Issued_CerificateStudents.currentPage ===
                                                            Issued_CerificateStudents.totalPages
                                                            ? "disabled"
                                                            : "cursor-auto"
                                                        }`}
                                                >
                                                    <span className="">→</span>
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
        </div >
    )
}

export default IssuedCertificates