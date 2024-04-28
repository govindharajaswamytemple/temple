import React from "react";
import BackButton from "../../components/backbutton/BackButton";
import Button from "../../components/button/Button";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useEffect } from "react";
import { useStudentsContext } from "../../../dataLayer/hooks/useStudentsContext";
import { HiMiniPlus } from "react-icons/hi2";
const ReportsView = () => {
  const { id } = useParams();
  const { students } = useStudentsContext();
  const [reportForm, setReportForm] = useState();
  const [organizedData, setOrganizedData] = useState(null);
  const {
    studentState,
    studentState: { EnrolledStudents, TotalStudents },
    Dispatchstudents,
  } = useStudentsContext();

  console.log(reportForm, "dhgfjdgf");

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/reports/getreport/${id}`)
        .then((response) => {
          console.log(response, "dvdfhdgfdhgfd");

          if (response.data) {
            const filtered = response.data.report.reports[0];
            setReportForm(filtered);
          }
          // if (response.data) {
          //     const filtered = response.data.filter(item => item.id === parseInt(id));
          //     setReportForm(filtered[0].reports[0]);
          // }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [id]);

  let [filters, setFilters] = useState();
  useEffect(() => {
    if (reportForm) {
      setFilters(reportForm.filter);
    }
  }, [reportForm]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let reports = [];
    reports.push(reportForm);
    console.log("Form submitted:", reports);
    let updatedData = {
      reports,
    };
    const updateContext = {
      reports,
    };
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/reports/updatereport/${id}`,
        updatedData
      )
      .then((res) => {
        if (res.data.updated) {
          alert("Report Updated");
          // dispatch({
          //   type: "UPDATE_NO_OF_INSTALLMENTS",
          //   payload: updateContext,
          // });

          // navigate(`/reports`);
        } else {
          alert("Try Again");
        }
      });
  };
  useEffect(() => {
    console.log("reportForm", reportForm);
    console.log("organizedData", organizedData);
    console.log("filters", filters);
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name.includes(".")) {
      let [parentProperty, nestedProperty] = name.split(".");
      setReportForm((prevForm) => ({
        ...prevForm,
        [parentProperty]: {
          ...prevForm[parentProperty],
          [nestedProperty]: value,
        },
      }));
    } else {
      if (name === "reportType") {
        setReportForm((prevForm) => ({
          ...prevForm,
          dimensions: {
            dimension1: "",
            dimension2: "",
            dimension3: "",
          },
        }));
      }
      if (name === "dateRangeType") {
        let currentDate = new Date();
        let fromDate = "";
        let toDate = "";
        if (value === "lastmonth") {
          currentDate = new Date();
          currentDate.setMonth(currentDate.getMonth() - 1);
          currentDate.setDate(1);
          fromDate = currentDate.toISOString().split("T")[0];
          currentDate = new Date();
          currentDate.setDate(0);

          toDate = currentDate.toISOString().split("T")[0];
        } else if (value === "currentmonth") {
          currentDate = new Date();
          currentDate.setDate(1);
          fromDate = currentDate.toISOString().split("T")[0];
          currentDate.setMonth(currentDate.getMonth() + 1);
          currentDate.setDate(0);

          toDate = currentDate.toISOString().split("T")[0];
        } else {
          fromDate = "";
          toDate = "";
        }
        setReportForm((prevForm) => ({
          ...prevForm,
          dateRange: {
            fromDate,
            toDate,
          },
          [name]: value,
        }));
      } else {
        setReportForm((prevForm) => ({ ...prevForm, [name]: value }));
      }
    }
  };
  const [filteredStudents, setFilteredStudents] = useState();
  useEffect(() => {
    if (TotalStudents && reportForm && reportForm.filter) {
      const filteredResults = TotalStudents.filter((item) => {
        let allConditionsMet = true;
        reportForm.filter.forEach((filter) => {
          let conditionMet = false;

          if (item.hasOwnProperty(filter.filter)) {
            conditionMet = item[filter.filter] === filter.subFilter;
          } else {
            conditionMet = true;
          }
          allConditionsMet = allConditionsMet && conditionMet;
        });

        const dateCondition =
          reportForm.dateRange.fromDate && reportForm.dateRange.toDate
            ? item.admissiondate >= reportForm.dateRange.fromDate &&
              item.admissiondate <= reportForm.dateRange.toDate
            : true;

        return allConditionsMet && dateCondition;
      });

      setFilteredStudents(filteredResults);
    }
  }, [TotalStudents, reportForm]);
  useEffect(() => {
    if (filteredStudents) {
      let organizedData;
      if (reportForm) {
        if (Object.keys(reportForm.dimensions).length == 3) {
          organizedData = filteredStudents.reduce((acc, student) => {
            const dim1 = student[reportForm.dimensions.dimension1] || "Unknown";
            const dim2 = student[reportForm.dimensions.dimension2] || "Unknown";
            const dim3 = student[reportForm.dimensions.dimension3] || "Unknown";

            if (!acc[dim1]) {
              acc[dim1] = {};
            }
            if (!acc[dim1][dim2]) {
              acc[dim1][dim2] = {};
            }
            if (!acc[dim1][dim2][dim3]) {
              acc[dim1][dim2][dim3] = [];
            }

            acc[dim1][dim2][dim3].push(student);
            return acc;
          }, {});
        }
        if (Object.keys(reportForm.dimensions).length == 2) {
          organizedData = filteredStudents.reduce((acc, student) => {
            const dim1 = student[reportForm.dimensions.dimension1] || "Unknown";
            const dim2 = student[reportForm.dimensions.dimension2] || "Unknown";

            if (!acc[dim1]) {
              acc[dim1] = {};
            }

            if (!acc[dim1][dim2]) {
              acc[dim1][dim2] = [];
            }

            acc[dim1][dim2].push(student);
            return acc;
          }, {});
        }
        if (Object.keys(reportForm.dimensions).length == 1) {
          organizedData = filteredStudents.reduce((acc, student) => {
            const dim1 = student[reportForm.dimensions.dimension1] || "Unknown";
            if (!acc[dim1]) {
              acc[dim1] = [];
            }
            acc[dim1].push(student);
            return acc;
          }, {});
        }
        setOrganizedData(organizedData);
      }
    }
  }, [filteredStudents, reportForm]);

  const handleAddDimension = () => {
    const dimensionsLength = reportForm.dimensions
      ? Object.keys(reportForm.dimensions).length
      : 0;
    if (dimensionsLength < 3) {
      const dimensionKey = `dimension${
        Object.keys(reportForm.dimensions).length + 1
      }`;
      setReportForm((prevForm) => ({
        ...prevForm,
        dimensions: {
          ...prevForm.dimensions,
          [dimensionKey]: "",
        },
      }));
    } else {
      alert("More Than 3 Dimensions are not allowed");
    }
  };

  const handleDeleteDimension = (dimension) => {
    const newDimensions = { ...reportForm.dimensions };
    delete newDimensions[dimension];

    const originalObject = newDimensions;
    const transformedObject = {};
    Object.entries(originalObject).forEach(([key, value], index) => {
      console.log(key, value, index);
      let newDimensionName = `dimension${index + 1}`;
      transformedObject[newDimensionName] = value;
    });

    setReportForm((prevForm) => ({
      ...prevForm,
      dimensions: transformedObject,
    }));
  };
  const handleMoveDimension = (dimension, direction) => {
    const dimensionsArray = Object.keys(reportForm.dimensions);
    const index = dimensionsArray.indexOf(dimension);
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < dimensionsArray.length) {
      const newDimensionsArray = [...dimensionsArray];
      // Swap the dimensions
      [newDimensionsArray[index], newDimensionsArray[newIndex]] = [
        newDimensionsArray[newIndex],
        newDimensionsArray[index],
      ];

      const newInputValues = {};
      newDimensionsArray.forEach((dimensionKey) => {
        newInputValues[dimensionKey] = reportForm.dimensions[dimensionKey];
      });
      const originalObject = newInputValues;
      const transformedObject = {};
      Object.entries(originalObject).forEach(([key, value], index) => {
        console.log(key, value, index);
        let newDimensionName = `dimension${index + 1}`;
        transformedObject[newDimensionName] = value;
      });

      setReportForm((prevForm) => ({
        ...prevForm,
        dimensions: transformedObject,
      }));
    }
  };
  useEffect(() => {
    setReportForm((prevForm) => ({
      ...prevForm,
      filter: filters,
    }));
  }, [filters]);
  const handleFilterChange = (event, index) => {
    const { name, value } = event.target;
    const updatedFilters = [...filters];
    updatedFilters[index] = {
      ...updatedFilters[index],
      [name]: value,
    };
    setFilters(updatedFilters);
    // if (name === "operator") {
    //   let filterName = filters[index].filter

    // }
  };

  const handleFilterDelete = (index) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };
  const handleAddFilter = () => {
    setFilters([...filters, { filter: "", operator: "", subFilter: "" }]);
  };
  let [metricsValue, setMetricsValue] = useState(0);
  useEffect(() => {
    if (reportForm) {
      switch (reportForm.metrics) {
        case "Number Of Enrollments":
          if (filteredStudents && filteredStudents.length !== undefined) {
            setMetricsValue(filteredStudents.length);
          } else {
            console.error("filteredStudents is undefined or null");
          }
          break;
        case "Fee Received Amount":
          if (Array.isArray(filteredStudents)) {
            setMetricsValue(
              filteredStudents.reduce(
                (total, student) => total + student.totalpaidamount,
                0
              )
            );
          }
          break;
        case "Fee Yet To Receive":
          if (Array.isArray(filteredStudents)) {
            setMetricsValue(
              filteredStudents.reduce(
                (total, student) => total + student.dueamount,
                0
              )
            );
          }
          break;
        case "Total Booking Amount":
          if (Array.isArray(filteredStudents)) {
            setMetricsValue(
              filteredStudents.reduce(
                (total, student) => total + student.finaltotal,
                0
              )
            );
          }
          break;
        default:
          break;
      }
    }
  }, [reportForm, filteredStudents]);

  return (
    <div>
      <BackButton heading="Report view" content="Back" />
      {reportForm && (
        <div className="container-fluid">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-12 col-md-4 col-lg-4 col-xl-4 ">
                      <label className="form-label fs-s fw-medium txt-color text_color">
                        Date Range
                      </label>

                      <select
                        className="form-select form-control me-3 input_bg_color select"
                        name="dateRangeType"
                        value={reportForm && reportForm.dateRangeType}
                        onChange={handleInputChange}
                      >
                        <option disabled selected value="">
                          {" "}
                          Choose
                        </option>
                        <option value="lastmonth">Last Month</option>
                        <option value="currentmonth">Current Month</option>
                        <option value="customDates">Custom Dates</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                      <label className="form-label fs-s fw-medium txt-color text_color">
                        From
                      </label>
                      <div className="text-start">
                        <input
                          className=" form-control fs-s bg-form input_bg_color"
                          type="date"
                          id="exampleInputdate border_none"
                          name="dateRange.fromDate"
                          value={reportForm?.fromDate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                      <label className="form-label fs-s fw-medium txt-color text_color">
                        To
                      </label>
                      <div className="text-start">
                        <input
                          className=" form-control fs-s bg-form  input_bg_color"
                          type="date"
                          id="exampleInputdate border_none"
                          name="dateRange.toDate"
                          value={reportForm?.toDate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mt-4 pt-1 text-end">
                  <Button className={"btn_primary"} onClick={handleSubmit}>
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-header">
                  <div className="card-body">
                    {organizedData && (
                      <div className="table-responsive table-card  border-0">
                        <div className="table-container table-scroll">
                          <table className="table table-centered align-middle  table-nowrap equal-cell-table table-hover">
                            <thead>
                              <tr>
                                <th>
                                  {reportForm.dimensions.dimension1 === "" && (
                                    <span></span>
                                  )}
                                  {reportForm.dimensions.dimension1 ===
                                    "courses" && <span>Course</span>}
                                  {reportForm.dimensions.dimension1 ===
                                    "branch" && <span>Branch</span>}
                                  {reportForm.dimensions.dimension1 ===
                                    "enquirytakenby" && <span>Counsellor</span>}
                                  {reportForm.dimensions.dimension1 ===
                                    "coursepackage" && (
                                    <span>Course Package</span>
                                  )}
                                  {reportForm.dimensions.dimension1 ===
                                    "modeoftraining" && (
                                    <span>Mode Of Training</span>
                                  )}
                                  {reportForm.dimensions.dimension1 ===
                                    "state" && <span>State</span>}
                                  {reportForm.dimensions.dimension1 ===
                                    "educationtype" && (
                                    <span>Education Type</span>
                                  )}
                                  {reportForm.dimensions.dimension1 ===
                                    "academicyear" && (
                                    <span>Academic Year</span>
                                  )}
                                  {reportForm.dimensions.dimension1 ===
                                    "leadsource" && <span>Lead Source</span>}
                                </th>
                                {reportForm.dimensions.dimension2 && (
                                  <th>
                                    {reportForm.dimensions.dimension2 ===
                                      "" && <span></span>}
                                    {reportForm.dimensions.dimension2 ===
                                      "courses" && <span>Course</span>}
                                    {reportForm.dimensions.dimension2 ===
                                      "branch" && <span>Branch</span>}
                                    {reportForm.dimensions.dimension2 ===
                                      "enquirytakenby" && (
                                      <span>Counsellor</span>
                                    )}
                                    {reportForm.dimensions.dimension2 ===
                                      "coursepackage" && (
                                      <span>Course Package</span>
                                    )}
                                    {reportForm.dimensions.dimension2 ===
                                      "modeoftraining" && (
                                      <span>Mode Of Training</span>
                                    )}
                                    {reportForm.dimensions.dimension2 ===
                                      "state" && <span>State</span>}
                                    {reportForm.dimensions.dimension2 ===
                                      "educationtype" && (
                                      <span>Education Type</span>
                                    )}
                                    {reportForm.dimensions.dimension2 ===
                                      "academicyear" && (
                                      <span>Academic Year</span>
                                    )}
                                    {reportForm.dimensions.dimension2 ===
                                      "leadsource" && <span>Lead Source</span>}
                                  </th>
                                )}
                                {reportForm.dimensions.dimension3 && (
                                  <th>
                                    {reportForm.dimensions.dimension3 ===
                                      "" && <span></span>}
                                    {reportForm.dimensions.dimension3 ===
                                      "courses" && <span>Course</span>}
                                    {reportForm.dimensions.dimension3 ===
                                      "branch" && <span>Branch</span>}
                                    {reportForm.dimensions.dimension3 ===
                                      "enquirytakenby" && (
                                      <span>Counsellor</span>
                                    )}
                                    {reportForm.dimensions.dimension3 ===
                                      "coursepackage" && (
                                      <span>Course Package</span>
                                    )}
                                    {reportForm.dimensions.dimension3 ===
                                      "modeoftraining" && (
                                      <span>Mode Of Training</span>
                                    )}
                                    {reportForm.dimensions.dimension3 ===
                                      "state" && <span>State</span>}
                                    {reportForm.dimensions.dimension3 ===
                                      "educationtype" && (
                                      <span>Education Type</span>
                                    )}
                                    {reportForm.dimensions.dimension3 ===
                                      "academicyear" && (
                                      <span>Academic Year</span>
                                    )}
                                    {reportForm.dimensions.dimension3 ===
                                      "leadsource" && <span>Lead Source</span>}
                                  </th>
                                )}
                                <th>
                                  {reportForm.metrics}
                                  <br />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {organizedData &&
                                reportForm.dimensions.dimension1 &&
                                !reportForm.dimensions.dimension2 &&
                                !reportForm.dimensions.dimension3 &&
                                Object.entries(organizedData).map(
                                  ([dim1, TotalStudents]) => {
                                    let metrics = 0;
                                    if (
                                      reportForm.metrics ===
                                      "Number Of Enrollments"
                                    ) {
                                      metrics = TotalStudents.length;
                                    }
                                    if (
                                      reportForm.metrics ===
                                      "Fee Received Amount"
                                    ) {
                                      if (Array.isArray(TotalStudents)) {
                                        TotalStudents.forEach((student) => {
                                          metrics += student.totalpaidamount;
                                        });
                                      }
                                    }
                                    if (
                                      reportForm.metrics ===
                                      "Fee Yet To Receive"
                                    ) {
                                      if (Array.isArray(TotalStudents)) {
                                        TotalStudents.forEach((student) => {
                                          metrics += student.dueamount;
                                        });
                                      }
                                    }
                                    if (
                                      reportForm.metrics ===
                                      "Total Booking Amount"
                                    ) {
                                      if (Array.isArray(TotalStudents)) {
                                        TotalStudents.forEach((student) => {
                                          metrics += student.finaltotal;
                                        });
                                      }
                                    }
                                    return (
                                      <tr key={dim1}>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {dim1}
                                          <br />
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {metrics}
                                          <br />
                                        </td>
                                      </tr>
                                    );
                                  }
                                )}
                              {reportForm.dimensions.dimension1 &&
                                reportForm.dimensions.dimension2 &&
                                !reportForm.dimensions.dimension3 &&
                                Object.entries(organizedData).map(
                                  ([dim1, dim1Data]) => (
                                    <tr key={dim1}>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {dim1}
                                        <br />
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {Object.entries(dim1Data).map(
                                          ([dim2, TotalStudents]) => (
                                            <React.Fragment key={dim2}>
                                              {dim2}
                                              <br />
                                            </React.Fragment>
                                          )
                                        )}
                                      </td>
                                      <td>
                                        {Object.entries(dim1Data).map(
                                          ([dim2, TotalStudents]) => {
                                            let metrics = 0;
                                            if (
                                              reportForm.metrics ===
                                              "Number Of Enrollments"
                                            ) {
                                              metrics = TotalStudents.length;
                                            }
                                            if (
                                              reportForm.metrics ===
                                              "Fee Received Amount"
                                            ) {
                                              if (
                                                Array.isArray(TotalStudents)
                                              ) {
                                                TotalStudents.forEach(
                                                  (student) => {
                                                    metrics +=
                                                      student.totalpaidamount;
                                                  }
                                                );
                                              }
                                            }
                                            if (
                                              reportForm.metrics ===
                                              "Fee Yet To Receive"
                                            ) {
                                              if (
                                                Array.isArray(TotalStudents)
                                              ) {
                                                TotalStudents.forEach(
                                                  (student) => {
                                                    metrics +=
                                                      student.dueamount;
                                                  }
                                                );
                                              }
                                            }
                                            if (
                                              reportForm.metrics ===
                                              "Total Booking Amount"
                                            ) {
                                              if (
                                                Array.isArray(TotalStudents)
                                              ) {
                                                TotalStudents.forEach(
                                                  (student) => {
                                                    metrics +=
                                                      student.finaltotal;
                                                  }
                                                );
                                              }
                                            }
                                            return (
                                              <React.Fragment key={dim2}>
                                                <div>
                                                  {metrics} <br />
                                                </div>
                                              </React.Fragment>
                                            );
                                          }
                                        )}
                                      </td>
                                    </tr>
                                  )
                                )}
                              {reportForm.dimensions.dimension1 &&
                                reportForm.dimensions.dimension2 &&
                                reportForm.dimensions.dimension3 &&
                                Object.entries(organizedData).map(
                                  ([dim1, dim1Data]) => (
                                    <React.Fragment key={dim1}>
                                      <tr>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {dim1}
                                          <br />
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {Object.entries(dim1Data).map(
                                            ([dim2, dim2Data]) => (
                                              <React.Fragment key={dim2}>
                                                {dim2}
                                                <br />
                                              </React.Fragment>
                                            )
                                          )}
                                        </td>
                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {Object.entries(dim1Data).map(
                                            ([dim2, dim2Data]) =>
                                              Object.entries(dim2Data).map(
                                                ([dim3, TotalStudents]) => (
                                                  <React.Fragment key={dim3}>
                                                    {dim3}
                                                    <br />
                                                  </React.Fragment>
                                                )
                                              )
                                          )}
                                        </td>

                                        <td className="fs-13 black_300  lh-xs bg_light">
                                          {Object.entries(dim1Data).map(
                                            ([dim2, dim2Data]) =>
                                              Object.entries(dim2Data).map(
                                                ([dim3, TotalStudents]) => {
                                                  let metrics = 0;
                                                  if (
                                                    reportForm.metrics ===
                                                    "Number Of Enrollments"
                                                  ) {
                                                    metrics =
                                                      TotalStudents?.length;
                                                  }
                                                  if (
                                                    reportForm.metrics ===
                                                    "Fee Received Amount"
                                                  ) {
                                                    if (
                                                      Array.isArray(
                                                        TotalStudents
                                                      )
                                                    ) {
                                                      TotalStudents?.forEach(
                                                        (student) => {
                                                          metrics +=
                                                            student.totalpaidamount;
                                                        }
                                                      );
                                                    }
                                                  }
                                                  if (
                                                    reportForm.metrics ===
                                                    "Fee Yet To Receive"
                                                  ) {
                                                    if (
                                                      Array.isArray(
                                                        TotalStudents
                                                      )
                                                    ) {
                                                      TotalStudents.forEach(
                                                        (student) => {
                                                          metrics +=
                                                            student.dueamount;
                                                        }
                                                      );
                                                    }
                                                  }
                                                  if (
                                                    reportForm.metrics ===
                                                    "Total Booking Amount"
                                                  ) {
                                                    if (
                                                      Array.isArray(
                                                        TotalStudents
                                                      )
                                                    ) {
                                                      TotalStudents.forEach(
                                                        (student) => {
                                                          metrics +=
                                                            student.finaltotal;
                                                        }
                                                      );
                                                    }
                                                  }
                                                  return (
                                                    <React.Fragment key={dim3}>
                                                      {metrics} <br />
                                                    </React.Fragment>
                                                  );
                                                }
                                              )
                                          )}
                                        </td>
                                      </tr>
                                    </React.Fragment>
                                  )
                                )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  {/* customazie start  */}

                  <div className="customazie-report p-2 my-2">
                    <h5 className="p-2">Customize Report</h5>
                    <div className="side-lines">
                      <div className="d-flex justify-content-between">
                        <p>{reportForm && reportForm?.metrics}</p>

                        <p> {metricsValue}</p>
                      </div>

                      <div className="accordion mt-3" id="accordionExample">
                        <div class="accordion-item">
                          <h3 className="accordion-header" id="headingOne">
                            <button
                              className="accordion-button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseOne"
                              aria-expanded="true"
                            >
                              Dimensions
                            </button>
                          </h3>
                          <div
                            id="collapseOne"
                            class="accordion-collapse collapse show"
                            aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample"
                          >
                            <div class="accordion-body">
                              <div className="text-end">
                                {reportForm.reportType ===
                                  "Multi Dimensional" &&
                                  Object.keys(reportForm.dimensions).length <
                                    3 && (
                                    <Button
                                      onClick={handleAddDimension}
                                      className={"btn_primary"}
                                    >
                                      {<HiMiniPlus />} Add Dimension
                                    </Button>
                                  )}
                              </div>
                              {reportForm.reportType === "One Dimensional" && (
                                <div>
                                  <label className="form-label fs-s fw-medium txt-color text_color">
                                    Choose
                                  </label>
                                  <select
                                    className="form-select form-control me-3 input_bg_color select"
                                    aria-label="Default select example"
                                    name="dimensions.dimension1"
                                    value={reportForm.dimensions.dimension1}
                                    onChange={handleInputChange}
                                  >
                                    <option value="" disabled selected>
                                      Choose
                                    </option>
                                    <option value="courses">Course</option>
                                    <option value="branch">Branch</option>
                                    <option value="enquirytakenby">
                                      Counsellor
                                    </option>
                                    <option value="coursepackage">
                                      Course Package
                                    </option>
                                    <option value="modeoftraining">
                                      Mode of Training
                                    </option>
                                    <option value="state">State</option>
                                    <option value="educationtype">
                                      Education Type
                                    </option>
                                    <option value="academicyear">
                                      Academic Year
                                    </option>
                                    <option value="leadsource">
                                      Lead Source
                                    </option>
                                  </select>
                                </div>
                              )}
                              {reportForm.reportType ===
                                "Multi Dimensional" && (
                                <div>
                                  {Object.keys(reportForm.dimensions).map(
                                    (dimension, index) => (
                                      <div className="row">
                                        <div className="col-8 col-md-8 col-lg-8 col-xl-8 px-3 ">
                                          <div key={dimension}>
                                            <label className="form-label fs-s fw-medium txt-color text_color">
                                              Choose
                                            </label>
                                            <select
                                              className="form-select form-control me-3 input_bg_color select"
                                              name={`dimensions.${dimension}`}
                                              aria-label="Default select example"
                                              value={
                                                reportForm.dimensions[dimension]
                                              }
                                              onChange={handleInputChange}
                                            >
                                              <option
                                                value=""
                                                disabled
                                                selected
                                              >
                                                Choose
                                              </option>
                                              <option value="courses">
                                                Course
                                              </option>
                                              <option value="branch">
                                                Branch
                                              </option>
                                              <option value="enquirytakenby">
                                                Counsellor
                                              </option>
                                              <option value="coursepackage">
                                                Course Package
                                              </option>
                                              <option value="modeoftraining">
                                                Mode Of Training
                                              </option>
                                              <option value="state">
                                                State
                                              </option>
                                              <option value="educationtype">
                                                Education Type
                                              </option>
                                              <option value="academicyear">
                                                Academic Year
                                              </option>
                                              <option value="leadsource">
                                                Lead Source
                                              </option>
                                            </select>
                                          </div>
                                        </div>
                                        <div className="col-4 m-auto">
                                          {Object.keys(reportForm.dimensions)
                                            .length > 1 && (
                                            <div className="d-flex justify-content-evenly">
                                              <FaArrowUp
                                                className="black_color table_icons me-3"
                                                onClick={() =>
                                                  handleMoveDimension(
                                                    dimension,
                                                    "up"
                                                  )
                                                }
                                              />
                                              <FaArrowDown
                                                className="black_color table_icons me-3"
                                                onClick={() =>
                                                  handleMoveDimension(
                                                    dimension,
                                                    "down"
                                                  )
                                                }
                                              />
                                              <MdDelete
                                                className="black_color table_icons me-3"
                                                onClick={() =>
                                                  handleDeleteDimension(
                                                    dimension
                                                  )
                                                }
                                              />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div class="accordion-item">
                          <h2 class="accordion-header" id=" headingTwo">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              Metrics
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample"
                          >
                            <div class="accordion-body">
                              <div className="">
                                <label className="form-label fs-s fw-medium txt-color text_color">
                                  Choose
                                </label>
                                <select
                                  className="form-select form-control input_bg_color select"
                                  name="metrics"
                                  value={reportForm && reportForm?.metrics}
                                  onChange={handleInputChange}
                                >
                                  <option value="Number Of Enrollments">
                                    Number of Enrollments
                                  </option>
                                  <option value="Fee Received Amount">
                                    Fee Received Amount
                                  </option>
                                  <option value="Fee Yet To Receive">
                                    Fee Yet To Receive
                                  </option>
                                  <option value="Total Booking Amount">
                                    Total Booking Amount
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h3 class="accordion-header" id="headingThree">
                            <button
                              class="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              Filters
                            </button>
                          </h3>
                          <div
                            id="collapseThree"
                            class="accordion-collapse collapse"
                            aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample"
                          >
                            <div class="accordion-body">
                              <div className="text-end">
                                <Button
                                  type="button"
                                  onClick={handleAddFilter}
                                  className={"btn_primary"}
                                >
                                  Add Filter
                                </Button>
                              </div>
                              {filters &&
                                filters.map((filter, index) => {
                                  let filterName = filters[index].filter;

                                  const groupDataAndCalculatePercentage = (
                                    data,
                                    key
                                  ) => {
                                    if (!Array.isArray(data)) {
                                      return {};
                                    }

                                    return data.reduce((result, item) => {
                                      const value = item[key];

                                      if (!result.includes(value)) {
                                        result.push(value);
                                      }

                                      return result;
                                    }, []);
                                  };

                                  let subFilterOptions =
                                    groupDataAndCalculatePercentage(
                                      TotalStudents,
                                      filterName
                                    );

                                  return (
                                    <div>
                                      <div
                                        className="row px-3 addingfilter"
                                        key={index}
                                      >
                                        <div className="col-12">
                                          <label className="form-label fs-s fw-medium txt-color text_color">
                                            Filter
                                          </label>
                                          <select
                                            className="form-select form-control me-3 input_bg_color select"
                                            name="filter"
                                            value={filter.filter}
                                            onChange={(event) =>
                                              handleFilterChange(event, index)
                                            }
                                            required
                                          >
                                            <option value="" hidden disabled>
                                              select
                                            </option>
                                            <option value="branch">
                                              Branch
                                            </option>
                                            <option value="enquirytakenby">
                                              Counsellor
                                            </option>
                                            <option value="coursepackage">
                                              Course Package
                                            </option>
                                            <option value="courses">
                                              Courses
                                            </option>
                                            <option value="modeoftraining">
                                              Mode of Training
                                            </option>
                                          </select>
                                        </div>

                                        <div className="col-12">
                                          {filter.filter && (
                                            <div>
                                              <label className="form-label fs-s fw-medium txt-color text_color">
                                                Comparison
                                              </label>
                                              <select
                                                className="form-select form-control me-3 input_bg_color select"
                                                name="operator"
                                                value={filter.operator}
                                                onChange={(event) =>
                                                  handleFilterChange(
                                                    event,
                                                    index
                                                  )
                                                }
                                              >
                                                <option
                                                  value=""
                                                  hidden
                                                  disabled
                                                >
                                                  select
                                                </option>
                                                <option value="equalto">
                                                  Equal To
                                                </option>
                                              </select>
                                            </div>
                                          )}
                                        </div>

                                        <div>
                                          {filter.operator && (
                                            <div>
                                              <label className="form-label fs-s fw-medium txt-color text_color">
                                                Sub-Filter
                                              </label>
                                              <select
                                                className="form-select form-control me-3 input_bg_color select"
                                                name="subFilter"
                                                value={filter.subFilter}
                                                onChange={(event) =>
                                                  handleFilterChange(
                                                    event,
                                                    index
                                                  )
                                                }
                                              >
                                                <option
                                                  value=""
                                                  hidden
                                                  disabled
                                                >
                                                  select
                                                </option>
                                                {subFilterOptions &&
                                                  subFilterOptions.map(
                                                    (subFilter, subIndex) => (
                                                      <option
                                                        key={subIndex}
                                                        value={subFilter}
                                                      >
                                                        {subFilter}
                                                      </option>
                                                    )
                                                  )}
                                              </select>
                                            </div>
                                          )}
                                        </div>

                                        <div className="text-end col-12">
                                          <MdDelete
                                            className="mt-2"
                                            onClick={() =>
                                              handleFilterDelete(index)
                                            }
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* customazie end  */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsView;
