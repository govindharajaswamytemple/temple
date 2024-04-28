import React, { useState } from "react";
import "../../../../assets/css/Table.css";
import Usedebounce from "../../../../dataLayer/hooks/useDebounce/Usedebounce";
import Button from "../../../components/button/Button";
import BackButton from "../../../components/backbutton/BackButton";
import { MdFilterList } from "react-icons/md";
import WebsiteLeadProvider from "./websitesleads/WebsiteLeadProvider";
export default function WhatsApp() {
  // here the adding the filters and pagination-----------------------
  const {
    DispatchwebsiteLeads,
    websiteLeadsState: { whatsApp },
  } = WebsiteLeadProvider();
 
  const { debouncesetSearch, debouncesetPage } =
    Usedebounce(DispatchwebsiteLeads);
 
  const handleSearch = (e) => {
    debouncesetSearch({
      context: "WHATSAPP_LEADS",
      data: e.target.value,
    });
  };
 
  const handlePerPage = (e) => {
    const selectedvalue = parseInt(e.target.value, 10);
    DispatchwebsiteLeads({
      type: "SET_PER_PAGE",
      payload: {
        context: "WHATSAPP_LEADS",
        data: selectedvalue,
      },
    });
  };
 
  const [filterCriteria, setfilterCriteria] = useState({
    fromDate: "",
    toDate: "",
    course: "",
  });
 
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
        context: "WHATSAPP_LEADS",
        data: {
          fromDate: filterCriteria.fromDate,
          toDate: filterCriteria.toDate,
          course: filterCriteria.course,
        },
      },
    });
  };
 
  let currentPage = whatsApp?.page;
  const totalPages = whatsApp?.totalPages;
 
  const changePage = (page) => {
    debouncesetPage({ context: "WHATSAPP_LEADS", data: page });
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
      <BackButton heading="WhatsApp" content="Back" />
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
                        className="form-control search input_bg_color black_300"
                        placeholder="Search for..."
                        name="search"
                        required
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="buttons_alignment">
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
                    {/* From calendar */}
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
                    <div className="mt-2">
                      <label className="form-label fs-s fw-medium black_300">
                        Course
                      </label>
                      <select
                        className="form-select form-control input_bg_color black_300 select"
                        aria-label="Default select example"
                        placeholder="department*"
                        id="department"
                        required
                        name="course"
                        value={filterCriteria.department}
                        onChange={HandleFilterCertria}
                      >
                        <option value="" disabled selected>
                          Select Course
                        </option>
                        <option value="Counsellor">Counsellor</option>
                        <option value="Digital Marketing">
                          Digital Marketing
                        </option>
                        <option value="Student Counsellor">
                          Student Counsellor
                        </option>
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
                        <th scope="col" className="fs-13 lh_xs fw-600 ">
                          S.No
                        </th>
                        <th scope="col" className="fs-13 lh_xs  fw-600  ">
                          Name
                        </th>
                        <th scope="col" className="fs-13 lh_xs fw-600  ">
                          Email
                        </th>
                        <th scope="col" className="fs-13 lh_xs  fw-600  ">
                          Course
                        </th>
                        <th scope="col" className="fs-13 lh_xs  fw-600  ">
                          Contact Number
                        </th>
                        <th scope="col" className="fs-13 lh_xs  fw-600  ">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg_white">
                      {whatsApp?.paginatedwhatsApp &&
                      whatsApp?.paginatedwhatsApp.length > 0 ? (
                        whatsApp?.loading ? (
                          "loading"
                        ) : (
                          whatsApp?.paginatedwhatsApp.map((item, index) => {
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
                              <tr key={index}>
                                <td className="fs-13 lh-xs fw-semibold black_300">
                                  {(currentPage - 1) * whatsApp.pageSize +
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
                                  {item.city}
                                </td>
 
                                <td className="fs-13 lh-xs  black_300">
                                  {item.phone}
                                </td>
                                <td className="fs-13 lh-xs black_300">
                                  {date}
                                </td>
                              </tr>
                            );
                          })
                        )
                      ) : (
                        <tr>
                          <td className="fs-13 lh-xs  black_300">
                            Sorry! no data found
                          </td>
                        </tr>
                      )}
                      {/* 1st row */}
                    </tbody>
                  </table>
                </div>
                <div className=" mt-4 align-items-center d-flex justify-content-between row text-center text-sm-start">
                  <div className="col-sm">
                    {whatsApp.paginatedwhatsApp &&
                    whatsApp.paginatedwhatsApp.length > 0 ? (
                      whatsApp?.loading ? (
                        <div className="text_mute pagination-text">
                          Showing data is Loading ....
                        </div>
                      ) : (
                        <div className="text_mute pagination-text">
                          Showing{" "}
                          <span className="fw-semibold">
                            {whatsApp.startwhatsApp}
                          </span>
                          {"  "}
                          to{"  "}
                          <span className="fw-semibold">
                            {whatsApp.endwhatsApp}
                          </span>
                          {"  "}
                          of{"  "}
                          <span className="fw-semibold">
                            {"  "}
                            {whatsApp.searchResultwhatsApp}
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
                          {whatsApp.searchResultwhatsApp}
                        </span>{" "}
                        Results
                      </div>
                    )}
                  </div>
                  <div className="col-sm-auto mt-3 mt-sm-0 d-flex">
                    <div className="mt-2">
                      <select
                        className="form-select form-control me-3 input_bg_color black_300 pagination-select"
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
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "cursor-crosshair" : " "
                        }  p-1`}
                      >
                        <span
                          className={`page-link rounded ${
                            currentPage > 1 ? "cursor-pointer" : ""
                          } `}
                          onClick={previousPage}
                        >
                          ←
                        </span>
                      </li>
 
                      {[...Array(endPage - startPage + 1)].map((_, index) => {
                        const page = startPage + index;
                        return (
                          <li
                            key={page}
                            className={`page-item p-1  ${
                              currentPage === page ? "active" : ""
                            }`}
                          >
                            <span
                              className="page-link rounded"
                              style={{ cursor: "pointer" }}
                              onClick={() => changePage(page)}
                            >
                              {page}
                            </span>
                          </li>
                        );
                      })}
 
                      <li className="page-item p-1">
                        <span className="page-link rounded" onClick={nextPage}>
                          →
                        </span>
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
 
