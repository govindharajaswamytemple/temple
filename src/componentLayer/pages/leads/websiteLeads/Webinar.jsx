import React, { useEffect, useState } from "react";
import "../../../../assets/css/Table.css";
import { AiFillEye } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { MdLocalPrintshop } from "react-icons/md";
import { FaRegIdCard } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiMiniPlus } from "react-icons/hi2";
import { useUserContext } from "../../../../dataLayer/hooks/useUserContext";
import Usedebounce from "../../../../dataLayer/hooks/useDebounce/Usedebounce";
import Button from "../../../components/button/Button";
import BackButton from "../../../components/backbutton/BackButton";
import { MdFilterList } from "react-icons/md";
import { useCourseContext } from "../../../../dataLayer/hooks/useCourseContext";
import WebsiteLeadProvider from "./websitesleads/WebsiteLeadProvider";

export default function Webinar() {
  const { courseState } = useCourseContext();

  const {
    websiteLeadsState,
    DispatchwebsiteLeads,
    websiteLeadsState: { Webinar },
  } = WebsiteLeadProvider();

  const { debouncesetSearch, debouncesetPage } =
    Usedebounce(DispatchwebsiteLeads);

  console.log(Webinar, "dfjgdjfgf");

  const handleSearch = (e) => {
    debouncesetSearch({
      context: "WEBINAR_LEADS",
      data: e.target.value,
    });
  };

  const handlePerPage = (e) => {
    const selectedvalue = parseInt(e.target.value, 10);
    DispatchwebsiteLeads({
      type: "SET_PER_PAGE",
      payload: {
        context: "WEBINAR_LEADS",
        data: selectedvalue,
      },
    });
  };

  const [filterCriteria, setfilterCriteria] = useState({
    fromDate: "",
    toDate: "",
    course: "",
  });

  console.log(filterCriteria, "dhgdjsdfffg");

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
    });
  };

  const filterSubmit = () => {
    console.log("filterCriteria", filterCriteria);
    DispatchwebsiteLeads({
      type: "SET_FILTERS",
      payload: {
        context: "WEBINAR_LEADS",
        data: {
          fromDate: filterCriteria.fromDate,
          toDate: filterCriteria.toDate,
          course: filterCriteria.course,
        },
      },
    });
  };

  let currentPage = Webinar?.page;
  const totalPages = Webinar?.totalPages;

  const changePage = (page) => {
    debouncesetPage({ context: "WEBINAR_LEADS", data: page });
    currentPage = page;
    console.log("Currentxccpage:", page);
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

  console.log(Webinar.paginatedWebinar, "Webinar.paginatedWebinar");
  return (
    <div>
      <BackButton heading="Webinar" content="Back" />
      <div className="container-fluid">
        <div className="row ">
          <div className="col-xl-12">
            <div className="card border-0 bg_white">
              <div className="card-header bg_white">
                <div className="row justify-content-between ">
                  <div className="col-sm-4">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control search input_bg_color"
                        placeholder="Search for..."
                        name="search"
                        required
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="buttons_alignment">
                      <div className="fs-13 me-3 mt-2 black_300">
                        {/* {EnrolledUsers.searchResultUsers} /{" "}
                        {EnrolledUsers.totalUsers} */}
                      </div>

                      <button
                        className="btn btn-sm btn_primary fs-13 me-2 margin_top_12"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      >
                        <MdFilterList className="me-1 mb-1" />
                        Filters
                      </button>
                      {/* <button type="button" className="btn btn_primary fs-13 ">
                        <Link to="/createuser" className="btn_primary">
                          <HiMiniPlus />
                          Add User
                        </Link>
                      </button> */}
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
                      className="offcanvas-title black_300"
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
              <div className="card-body bg_white">
                <div className="table-responsive table-scroll table-container  table-card border-0 bg_white">
                  <table className="bg_white table table-centered align-middle table-nowrap equal-cell-table table-hover">
                    <thead>
                      <tr className="">
                        <th scope="col" className="fs-13 lh-xs fw-600  ">
                          S.No
                        </th>
                        <th scope="col" className="fs-13 lh-xs   fw-600  ">
                          Name
                        </th>
                        <th scope="col" className="fs-13 lh-xs  fw-600  ">
                          Email
                        </th>
                        <th scope="col" className="fs-13 lh-xs  fw-600  ">
                          Course
                        </th>
                        <th scope="col" className="fs-13 lh-xs  fw-600  ">
                          Contact Number
                        </th>
                        <th scope="col" className="fs-13 lh-xs  fw-600  ">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg_white">
                      {Webinar.paginatedWebinar &&
                      Webinar.paginatedWebinar.length > 0 ? (
                        Webinar?.loading ? (
                          "loading..."
                        ) : (
                          Webinar.paginatedWebinar.map((item, index) => {
                            let date = new Date(item.date);
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

                            date = `${day < 10 ? "0" : ""}${day}-${
                              monthAbbreviations[monthIndex]
                            }-${year}`;

                            return (
                              <>
                                <tr>
                                  <td className="fs-13 lh-xs fw-semibold black_300">
                                    {(currentPage - 1) * Webinar.pageSize +
                                      index +
                                      1}
                                  </td>
                                  <td
                                    className="fs-13 lh-xs black_300 text-truncate"
                                    style={{ maxWidth: "150px" }}
                                  >
                                    {item.name}
                                  </td>
                                  <td
                                    className="fs-13 lh-xs  black_300 text-truncate"
                                    style={{ maxWidth: "150px" }}
                                  >
                                    {item?.email}
                                  </td>

                                  <td className="fs-13 lh-xs  black_300">
                                    {item?.city}
                                  </td>

                                  <td className="fs-13 lh-xs  black_300">
                                    {item?.phone}
                                  </td>
                                  <td className="fs-13 lh-xs black_300">
                                    {date}
                                  </td>
                                </tr>
                              </>
                            );
                          })
                        )
                      ) : (
                        <tr className="bg_white">
                          <td className="fs-13 lh-xs black_300 ">
                            Sorry! No data found
                          </td>
                        </tr>
                      )}

                      {/* <tr>
                        <td className="fs-13 lh-xs fw-semibold black_300 ">
                          01
                        </td>
                        <td className="fs-13 lh-xs black_300 text-truncate" style={{ maxWidth: "150px" }}>Rahul</td>
                        <td className="fs-13 lh-xs  black_300 text-truncate" style={{ maxWidth: "150px" }}>
                          Rahul@Rahul.com
                        </td>
                        <td className="fs-13 lh-xs  black_300">B.tech</td>

                        <td className="fs-13 lh-xs  black_300">1234567890</td>

                        <td className="fs-13 lh-xs black_300 ">12-04-2012</td>
                      </tr> */}

                      {/* 1st row */}
                    </tbody>
                  </table>
                </div>
                <div className=" mt-4 align-items-center d-flex justify-content-between row text-center text-sm-start">
                  <div className="col-sm">
                    {Webinar.paginatedWebinar &&
                    Webinar.paginatedWebinar.length > 0 ? (
                      Webinar?.loading ? (
                        <div className="text_mute pagination-text">
                          Showing data is Loading ....
                        </div>
                      ) : (
                        <div className="text_mute pagination-text">
                          Showing{" "}
                          <span className="fw-semibold">
                            {Webinar.startWebinar}
                          </span>
                          {"  "}
                          to{"  "}
                          <span className="fw-semibold">
                            {Webinar.endWebinar}
                          </span>
                          {"  "}
                          of{"  "}
                          <span className="fw-semibold">
                            {"  "}
                            {Webinar.searchResultWebinar}
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
                          {Webinar.searchResultWebinar}
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
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="500">500</option>
                      </select>
                    </div>
                    <ul className="bg_white mt-2 pagination pagination-separated pagination-sm mb-0 justify-content-center ">
                      <li className="page-item p-1">
                        <button
                          onClick={previousPage}
                          disabled={
                            Webinar.loading ? true : false || Webinar.page === 1
                          }
                          style={{
                            cursor:
                              Webinar.loading || Webinar.page === 1
                                ? "not-allowed"
                                : "auto",
                          }}
                          className={`border border-1 ${
                            Webinar.loading
                              ? "disabled"
                              : Webinar.page === 1
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
                              disabled={Webinar?.loading ? true : false}
                              className={`border  page-link border-1 ${
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

                      <li className="page-item p-1">
                        <button
                          onClick={nextPage}
                          disabled={
                            Webinar.loading
                              ? true
                              : false || Webinar.page === Webinar.totalPages
                          }
                          style={{
                            cursor:
                              Webinar.loading ||
                              Webinar.page === Webinar.totalPages
                                ? "not-allowed"
                                : "auto",
                          }}
                          className={`border border-1${
                            Webinar.loading
                              ? "disabled"
                              : Webinar.page === Webinar.totalPages
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
