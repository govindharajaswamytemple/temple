import React, { useEffect, useState } from "react";
import { useContext } from "react";
import "../../../assets/css/CreateReport.css";
import Button from "../../components/button/Button";
import { HiMiniPlus } from "react-icons/hi2";
import { MdDelete } from "react-icons/md";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import BackButton from "../../components/backbutton/BackButton";
import { useStudentsContext } from "../../../dataLayer/hooks/useStudentsContext";
import axios from "axios";
import { toast } from "react-toastify";

function CreateReport() {
  const navigate = useNavigate();
  let user = localStorage.getItem("user");
  user = JSON.parse(user);
  let userName;
  if (user) {
    userName = user.fullname;
  }
  
  const [createdBy, setCreatedBy] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    return userData || "";
  });

  const { id } = useParams();
  console.log(user, "try")
  // const { students } = useStudentsContext();

  const {
    studentState,
    studentState: { EnrolledStudents, TotalStudents, getAllReports },
    Dispatchstudents,
  } = useStudentsContext();

  console.log(TotalStudents, "dhfdhgf");

  const [customDates, setCustomDates] = useState(false);
  const handleDateFilterChange = (event) => {
    const selectedValue = event.target.value;
    // Update customMonth state based on the selected value
    setCustomDates(selectedValue === "customDates");
  };
  const [reportForm, setReportForm] = useState({
    reportName: "",
    reportType: "One Dimensional",
    description: "",
    dateFilter: "",
    dateRangeType: "",
    dateRange: { fromDate: "", toDate: "" },
    dimensions: { dimension1: "" },
    metrics: "",
    createdBy: userName,
    createdAt: new Date(),
    filter: [],
  });

  console.log(reportForm, "vhdffd");

  let [filters, setFilters] = useState([]);

  console.log(filters, "dfjdgjfg");

  useEffect(() => {
    setReportForm((prevForm) => ({
      ...prevForm,
      filter: filters,
    }));
  }, [filters]);

  // let [subFilterOptions, setSubFilterOptions] = useState()
  const [organizedData, setOrganizedData] = useState(null);

  const [filteredStudents, setFilteredStudents] = useState();

  useEffect(() => {
    if (TotalStudents && reportForm && reportForm.filter) {
      const filteredResults = TotalStudents?.filter((item) => {
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

  const handleFilterChange = (event, index) => {
    console.log(event, index, "jkfhjdgjf");
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
  useEffect(() => {
    console.log("reportForm", reportForm);
    console.log("filters", filters);
    // console.log("subFilterOptions", subFilterOptions)
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
  // handleSubmit -----------
  const [error, setError] = useState({
    reportName: "",
    description: "",
    dateRangeType: "",
    dateRange: {
      fromDate: "",
      toDate: "",
    },
    dimensions: { dimension1: "" },
    metrics: "",
  });
  useEffect(() => {
    const updatedErrors = {};

    if (reportForm.reportName && reportForm.reportName.length >= 3) {
      updatedErrors.reportName = "";
    }

    if (reportForm.description && reportForm.description.length >= 10) {
      updatedErrors.description = "";
    }

    if (reportForm.dateRangeType && reportForm.dateRangeType.trim() !== "") {
      updatedErrors.dateRangeType = "";
    }

    if (
      reportForm.dateRange.fromDate &&
      reportForm.dateRange.fromDate.trim() !== ""
    ) {
      updatedErrors.dateRange = { ...updatedErrors.dateRange, fromDate: "" };
    }

    if (
      reportForm.dateRange.toDate &&
      reportForm.dateRange.toDate.trim() !== ""
    ) {
      updatedErrors.dateRange = { ...updatedErrors.dateRange, toDate: "" };
    }

    if (
      reportForm.dimensions.dimension1 &&
      reportForm.dimensions.dimension1.trim() !== ""
    ) {
      updatedErrors.dimensions = {
        ...updatedErrors.dimensions,
        dimension1: "",
      };
    }

    if (reportForm.metrics && reportForm.metrics.trim() !== "") {
      updatedErrors.metrics = "";
    }

    setError((prev) => ({ ...prev, ...updatedErrors }));
  }, [reportForm]);

  // useEffect(() => {
  //   if (reportForm.reportName && reportForm.reportName.length >= 3) {
  //     setError((prev) => ({
  //       ...prev,
  //       reportName: "",
  //     }));
  //   }
  // }, [reportForm.reportName, setError]);

  // useEffect(() => {
  //   if (reportForm.description && reportForm.description.length >= 10) {
  //     setError((prev) => ({
  //       ...prev,
  //       description: "",
  //     }));
  //   }
  // }, [reportForm.description]);

  // useEffect(() => {
  //   if (reportForm.dateRangeType && reportForm.dateRangeType.trim() !== "") {
  //     setError((prev) => ({
  //       ...prev,
  //       dateRangeType: "",
  //     }));
  //   }
  // }, [reportForm.dateRangeType]);
  // useEffect(() => {
  //   if (reportForm.dateRange.fromDate && reportForm.dateRange.fromDate.trim() !== "") {
  //     setError((prev) => ({
  //       ...prev,
  //       dateRange: {
  //         ...prev.dateRange,
  //         fromDate: "",
  //       },
  //     }));
  //   }
  // }, [reportForm.dateRange.fromDate]);

  // useEffect(() => {
  //   if (reportForm.dateRange.toDate && reportForm.dateRange.toDate.trim() !== "") {
  //     setError((prev) => ({
  //       ...prev,
  //       dateRange: {
  //         ...prev.dateRange,
  //         toDate: "",
  //       },
  //     }));
  //   }
  // }, [reportForm.dateRange.toDate]);

  // useEffect(() => {
  //   if (reportForm.dimensions.dimension1 && reportForm.dimensions.dimension1.trim() !== "") {
  //     setError((prev) => ({
  //       ...prev,
  //       dimensions: {
  //         ...prev.dimensions,
  //         dimension1: "",
  //       },
  //     }));
  //   }
  // }, [reportForm.dimensions.dimension1]);

  // useEffect(() => {
  //   if (reportForm.metrics && reportForm.metrics.trim() !== "") {
  //     setError((prev) => ({
  //       ...prev,
  //       metrics: "",
  //     }));
  //   }
  // }, [reportForm.metrics]);

  // useEffect(() => {
  //   if (filter.filter && filter.filter.trim() !== "") {
  //     setError((prev) => ({
  //       ...prev,
  //       filter: "",
  //     }));
  //   }
  // }, [filter.filter]);

  // useEffect(() => {
  //   if (filter.operator && filter.operator.trim() !== "") {
  //     setError((prev) => ({
  //       ...prev,
  //       operator: "",
  //     }));
  //   }
  // }, [filter.operator]);

  // useEffect(() => {
  //   if (filter.subFilter && filter.subFilter.trim() !== "") {
  //     setError((prev) => ({
  //       ...prev,
  //       subFilter: "",
  //     }));
  //   }
  // }, [filter.subFilter]);

  const handleSubmit = async () => {
    // e.preventDefault(e);
    // reportName-------
    if (!reportForm.reportName || reportForm.reportName.trim().length < 3) {
      setError((prev) => ({
        ...prev,
        reportName: "Report Name required",
      }));
      return false;
    }

    // description--------
    if (!reportForm.description || reportForm.description.trim().length < 10) {
      setError((prev) => ({
        ...prev,
        description: "Enter minimum 10 characters",
      }));
      return false;
    }

    // dateRangeType----------
    if (!reportForm.dateRangeType || reportForm.dateRangeType.trim() === "") {
      setError((prev) => ({
        ...prev,
        dateRangeType: "Select Date Range is required",
      }));
      return false;
    }
    // fromDate-----------
    if (
      !reportForm.dateRange.fromDate ||
      reportForm.dateRange.fromDate.trim() === ""
    ) {
      setError((prev) => ({
        ...prev,
        dateRange: {
          ...prev.dateRange,
          fromDate: "From Date is required",
        },
      }));
      return false;
    }

    // toDate---------
    if (
      !reportForm.dateRange.toDate ||
      reportForm.dateRange.toDate.trim() === ""
    ) {
      setError((prev) => ({
        ...prev,
        dateRange: {
          ...prev.dateRange,
          toDate: "To Date is required",
        },
      }));
      return false;
    }
    // dimension1---
    if (
      !reportForm.dimensions.dimension1 ||
      reportForm.dimensions.dimension1.trim() === ""
    ) {
      setError((prev) => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          dimension1: "Dimensions is required",
        },
      }));
      return;
    }
    // metrics----
    if (!reportForm.metrics || reportForm.metrics.trim() === "") {
      setError((prev) => ({
        ...prev,
        metrics: "Select a metric",
      }));
      return false;
    }

    let user = {
      reportName: reportForm.reportName,
      description: reportForm.description,
      dateRangeType: reportForm.dateRangeType,
      fromDate: reportForm.dateRange.fromDate,
      toDate: reportForm.dateRange.toDate,
      dimension1: reportForm.dimension1,
      metrics: reportForm.metrics,
      createdby: createdBy?.user?.fullname
    };

    user = [user];
    console.log(user, "before");

    const dataWithTitleCase = user.map((item) => {
      const newItem = {};

      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          if (typeof item[key] === "string" && key !== "email") {
            newItem[key] = item[key]
              .split(" ")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
          } else {
            newItem[key] = item[key];
          }
        }
      }
      return newItem;
    });

    user = dataWithTitleCase[0];
    console.log(user, "after");

    const updateReports = {
      reports: [user],
    };

    if (!id) {
      try {
        const { data, status } = await toast.promise(
          axios.post(
            `${process.env.REACT_APP_API_URL}/reports/createreport`,
            user
          ),
          {
            loading: "Loading...",
            success: "Report created Successfully",
            error: "Report not Created",
          }
        );
        console.log(data, status, "dgsgfgs");
        if (status === 201) {
          console.log(data, "reportt");
          Dispatchstudents({ type: "CREATE_REPORT", payload: data });
          navigate("/reports/reportsdata");
          getAllReports();
          // navigate("/reports/reportsdata");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (id) {
      try {
        const { data, status } = await toast.promise(
          axios.put(
            `${process.env.REACT_APP_API_URL}/reports/updatereport/${id}`,
            user
          ),
          {
            loading: "Loading...",
            success: "Report Updated Successfully",
            error: "Report not Updated",
          }
        );

        if (status === 200) {
          console.log(data, "reportt");
          Dispatchstudents({ type: "CREATE_REPORT", payload: data });
          navigate("/reports/reportsdata");
          getAllReports();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   let reports = []
  //   reports.push(reportForm)
  //   console.log('Form submitted:', reports);
  //   let updatedData = {
  //     reports
  //   }
  //   const updateContext = {
  //     reports
  //   };
  //   axios
  //     .post(
  //       `${process.env.REACT_APP_API_URL}/reports/createreport`,
  //       updatedData
  //     )
  //     .then((res) => {
  //       if (res.data.updated) {
  //         alert("Report Added");

  //         navigate(`/reports`);

  //       } else {
  //         alert("Try Again");
  //       }
  //     });
  // };
  // --------------
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
  return (
    <div>
      <BackButton heading="Create Report" content="Back" />
      <div className="container-fluid">
        <div className="mt-2">
          <form className="createreport">
            <div className="row">
              <div className="col-lg-6">
                <div className="card border border-1">
                  <div className="card-body">
                    <h5 className="pb-2 black_300">Basic Information</h5>
                    <div className="row px-2">
                      <div className=" col-md-6 col-lg-6 col-xl-6">
                        <label className="form-label fs-s  black_300">
                          Report's Name
                        </label>
                        <input
                          type="text"
                          className={
                            error && error.reportName
                              ? "form-control fs-s bg-form text_color input_bg_color error-input"
                              : "form-control fs-s bg-form text_color input_bg_color"
                          }
                          placeholder="Enter Report Name"
                          name="reportName"
                          value={reportForm.reportName}
                          onChange={handleInputChange}
                        />
                        <div style={{ height: "8px" }}>
                          {error && error.reportName && (
                            <p className="text-danger m-0 fs-xs">
                              {error.reportName}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className=" col-md-6 col-lg-6 col-xl-6">
                        <form variant="standard" className="w-100">
                          <label className="form-label fs-s  black_300">
                            Report Type
                          </label>
                          <select
                            className="form-control fs-s bg-form text_color input_bg_color select form-select"
                            name="reportType"
                            value={reportForm.reportType}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="One Dimensional">
                              One Dimensional
                            </option>
                            <option value="Multi Dimensional">
                              Multi Dimensional
                            </option>
                          </select>
                        </form>
                      </div>
                    </div>
                    <div className="row px-2 mt-3 ">
                      <span className="label-family fw-light my-2 fs-14 black_300">
                        Report Description
                      </span>
                      <div className="col-md-12">
                        <textarea
                          type="text"
                          className={
                            error && error.description
                              ? "form-control fs-s bg-form input_bg_color text_color error-input"
                              : "form-control fs-s bg-form input_bg_color text_color"
                          }
                          placeholder="Enter Text...."
                          rows="3"
                          name="description"
                          value={reportForm?.description}
                          onChange={handleInputChange}
                        />
                        <div style={{ height: "8px" }}>
                          {error && error.description && (
                            <p className="text-danger m-0 fs-xs">
                              {error.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row px-2 mt-3">
                      <div className="col-12 col-md-4 col-lg-4 col-xl-4 ">
                        <label className="form-label fs-s black_300">
                          Date Range
                        </label>
                        <form variant="standard">
                          <select
                            className={
                              error && error.dateRangeType
                                ? "form-control input_bg_color form-select error-input"
                                : "form-control input_bg_color form-select"
                            }
                            name="dateRangeType"
                            value={reportForm.dateRangeType}
                            onChange={handleInputChange}
                            required
                          >
                            <option value="" disabled>
                              Choose
                            </option>
                            <option value="lastmonth">Last Month</option>
                            <option value="currentmonth">Current Month</option>
                            <option value="customDates">Custom Dates</option>
                          </select>
                          <div style={{ height: "8px" }}>
                            {error && error.dateRangeType && (
                              <p className="text-danger m-0 fs-xs">
                                {error.dateRangeType}
                              </p>
                            )}
                          </div>
                        </form>
                      </div>
                      <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                        <label className="form-label fs-s black_300">
                          From
                        </label>
                        <div className="text-start">
                          <input
                            className={
                              error.dateRange.fromDate
                                ? "form-control fs-s bg-form input_bg_color date_input_color error-input"
                                : "form-control fs-s bg-form input_bg_color date_input_color"
                            }
                            type="date"
                            id="exampleInputdate border_none"
                            name="dateRange.fromDate"
                            value={reportForm.dateRange.fromDate}
                            onChange={handleInputChange}
                          />
                          <div style={{ height: "8px" }}>
                            {error.dateRange.fromDate && (
                              <p className="text-danger m-0 fs-xs">
                                {error.dateRange.fromDate}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                        <label className="form-label fs-s black_300">To</label>
                        <div className="text-start">
                          <input
                            className={
                              error.dateRange.toDate
                                ? "form-control fs-s bg-form input_bg_color date_input_color error-input"
                                : "form-control fs-s bg-form input_bg_color date_input_color"
                            }
                            type="date"
                            id="exampleInputdate border_none"
                            name="dateRange.toDate"
                            value={reportForm.dateRange.toDate}
                            onChange={handleInputChange}
                          />
                          <div style={{ height: "8px" }}>
                            {error.dateRange.toDate && (
                              <p className="text-danger m-0 fs-xs">
                                {error.dateRange.toDate}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* dimensions start*/}
                <div className="mt-3">
                  <div className="card border border-1">
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="pb-2 black_300">Dimensions</h5>
                        <div>
                          {reportForm.reportType === "Multi Dimensional" &&
                            Object.keys(reportForm.dimensions).length < 3 && (
                              <Button
                                className={"btn_primary"}
                                onClick={handleAddDimension}
                              >
                                {<HiMiniPlus />} Add Dimensions
                              </Button>
                            )}
                        </div>
                      </div>
                      {reportForm.reportType === "One Dimensional" && (
                        <div className="col-8 col-md-8 col-lg-8 col-xl-8  pb-1 mt-2">
                          <form variant="standard" className="w-100">
                            <select
                              name="dimensions.dimension1"
                              className={
                                error.dimensions.dimension1
                                  ? "form-control fs-s bg-form text_color input_bg_color select form-select error-input"
                                  : "form-control fs-s bg-form text_color input_bg_color select form-select"
                              }
                              value={reportForm.dimensions.dimension1}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="" disabled selected>
                                Choose
                              </option>
                              <option value="courses">Course</option>
                              <option value="branch">Branch</option>
                              <option value="enquirytakenby">Counsellor</option>
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
                              <option value="leadsource">Lead Source</option>
                            </select>
                            <div style={{ height: "8px" }}>
                              {error.dimensions.dimension1 && (
                                <p className="text-danger m-0 fs-xs">
                                  {error.dimensions.dimension1}
                                </p>
                              )}
                            </div>
                          </form>
                        </div>
                      )}
                      {reportForm.reportType === "Multi Dimensional" && (
                        <div>
                          {Object.keys(reportForm.dimensions).map(
                            (dimension, index) => (
                              <div className="row">
                                <div className="col-8 col-md-8 col-lg-8 col-xl-8 px-3 pb-1">
                                  <div key={dimension}>
                                    <select
                                      name={`dimensions.${dimension}`}
                                      className={
                                        error.dimensions.dimension1
                                          ? "form-control fs-s bg-form text_color input_bg_color select form-select error-input"
                                          : "form-control fs-s bg-form text_color input_bg_color select form-select"
                                      }
                                      value={reportForm.dimensions[dimension]}
                                      onChange={handleInputChange}
                                      required
                                    >
                                      <option value="" disabled selected>
                                        Choose
                                      </option>
                                      <option value="courses">course</option>
                                      <option value="branch">branch</option>
                                      <option value="enquirytakenby">
                                        counsellor
                                      </option>
                                      <option value="coursepackage">
                                        course package
                                      </option>
                                      <option value="modeoftraining">
                                        Mode of training
                                      </option>
                                      <option value="state">State</option>
                                      <option value="educationtype">
                                        Education Type
                                      </option>
                                      <option value="academicyear">
                                        Academic year
                                      </option>
                                      <option value="leadsource">
                                        Lead source
                                      </option>
                                    </select>
                                    <div style={{ height: "8px" }}>
                                      {error.dimensions.dimension1 && (
                                        <p className="text-danger m-0 fs-xs">
                                          {error.dimensions.dimension1}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-4 m-auto">
                                  {Object.keys(reportForm.dimensions).length >
                                    1 && (
                                    <div className="d-flex justify-content-evenly">
                                      <FaArrowUp
                                        className="black_color table_icons me-3"
                                        onClick={() =>
                                          handleMoveDimension(dimension, "up")
                                        }
                                      />
                                      <FaArrowDown
                                        className="black_color table_icons me-3"
                                        onClick={() =>
                                          handleMoveDimension(dimension, "down")
                                        }
                                      />
                                      <MdDelete
                                        className="black_color table_icons me-3"
                                        onClick={() =>
                                          handleDeleteDimension(dimension)
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
                  {/* dimensions end */}

                  {/* metrics start */}
                  <div className="mt-3">
                    <div className="card border border-1">
                      <div className="card-body">
                        <h5 className="pb-2 black_300">All Metrics</h5>
                        <div className="col-8 col-md-8 col-lg-8 col-xl-8 pb-1 mt-4">
                          <form variant="standard" className="w-100">
                            <select
                              name="metrics"
                              className={
                                error && error.metrics
                                  ? "form-control fs-s bg-form text_color input_bg_color select form-select error-input"
                                  : "form-control fs-s bg-form text_color input_bg_color select form-select"
                              }
                              value={reportForm.metrics}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="" disabled selected>
                                Choose
                              </option>
                              <option value="Number Of Enrollments">
                                Number of Enrollments
                              </option>
                              <option value="Fee Received Amount">
                                Fee Received Amount{" "}
                              </option>
                              <option value="Fee Yet To Receive">
                                Fee Yet To Receive
                              </option>
                              <option value="Total Booking Amount">
                                Total Booking Amount
                              </option>
                            </select>
                            <div style={{ height: "8px" }}>
                              {error.metrics && (
                                <p className="text-danger m-0 fs-xs">
                                  {error.metrics}
                                </p>
                              )}
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* metrics end */}

                  {/* filters start */}
                  <div className="mt-3">
                    <div className="card border border-1">
                      <div className="card-body">
                        <div className="d-flex justify-content-between">
                          <h5 className=" black_300">Filters</h5>
                          <Button
                            className={"btn_primary"}
                            onClick={handleAddFilter}
                          >
                            {<HiMiniPlus />} Add Filters
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
                                TotalStudents && TotalStudents,
                                filterName
                              );

                            // console.log(subFilterOptions, "dkhfjdfg")
                            return (
                              <div className="row" key={index}>
                                <div className="col-12 col-md-6 col-lg-4 col-xl-4 px-3 mb-2">
                                  <label className="form-label fs-s  black_300">
                                    Filter
                                  </label>
                                  <select
                                    className="form-select form-control bg_input input_bg_color black_300 select"
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
                                    <option value="branch">Branch</option>
                                    <option value="enquirytakenby">
                                      Counsellor
                                    </option>
                                    <option value="coursepackage">
                                      Course Package
                                    </option>
                                    <option value="courses">Courses</option>
                                    <option value="modeoftraining">
                                      Mode of Training
                                    </option>
                                  </select>
                                </div>
                                <div className="col-12 col-md-6 col-lg-3 col-xl-3 ">
                                  {filter.filter && (
                                    <div variant="standard" className="w-100">
                                      <label className="form-label fs-s  black_300">
                                        Comparison
                                      </label>
                                      <select
                                        className="form-select form-control bg_input input_bg_color black_300 select"
                                        name="operator"
                                        value={filter.operator}
                                        onChange={(event) =>
                                          handleFilterChange(event, index)
                                        }
                                      >
                                        <option value="" hidden disabled>
                                          select
                                        </option>
                                        <option value="equalto">
                                          Equal To
                                        </option>
                                      </select>
                                    </div>
                                  )}
                                </div>
                                <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                                  {filter.operator && (
                                    <div variant="standard" className="w-100">
                                      <label className="form-label fs-s  black_300">
                                        {" "}
                                        Sub-Filter
                                      </label>
                                      <select
                                        className="form-select form-control bg_input input_bg_color black_300 select"
                                        name="subFilter"
                                        value={filter.subFilter}
                                        onChange={(event) =>
                                          handleFilterChange(event, index)
                                        }
                                      >
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
                                <div className="col-12 col-md-6 col-lg-1 col-xl-1 mt-4 pt-1 text-end ">
                                  <MdDelete
                                    className="black_color table_icons me-3"
                                    onClick={() => handleFilterDelete(index)}
                                  />
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                  {/* filters end */}
                  <div className="text-end report-footer mb-4">
                    <Button
                      type="submit"
                      className={"btn_primary"}
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    <h5 className="black_300 mb-3"> Report Preview</h5>
                    {/* dimensions data start */}
                    {organizedData && reportForm.dimensions.dimension1 && (
                      <div className="table-responsive table-card  border-0 mt-2">
                        <div className="table-container table-scroll">
                          <table className="table table-centered align-middle table-nowrap equal-cell-table">
                            <thead>
                              <tr>
                                <th className="fs-13 lh-xs fw-600">
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
                                  <th className="fs-13 lh-xs fw-600 ">
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
                                  <th className="fs-13 lh-xs fw-600 ">
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
                                <th className="fs-13 lh-xs fw-600 ">
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
                                  ([dim1, students]) => {
                                    let metrics = 0;
                                    if (
                                      reportForm.metrics ===
                                      "Number Of Enrollments"
                                    ) {
                                      metrics = students.length;
                                    }
                                    if (
                                      reportForm.metrics ===
                                      "Fee Received Amount"
                                    ) {
                                      if (Array.isArray(students)) {
                                        students.forEach((student) => {
                                          metrics += student.totalpaidamount;
                                        });
                                      }
                                    }
                                    if (
                                      reportForm.metrics ===
                                      "Fee Yet To Receive"
                                    ) {
                                      if (Array.isArray(students)) {
                                        students.forEach((student) => {
                                          metrics += student.dueamount;
                                        });
                                      }
                                    }
                                    if (
                                      reportForm.metrics ===
                                      "Total Booking Amount"
                                    ) {
                                      if (Array.isArray(students)) {
                                        students.forEach((student) => {
                                          metrics += student.finaltotal;
                                        });
                                      }
                                    }
                                    return (
                                      <tr
                                        key={dim1}
                                        className="border-botttom border border-1"
                                      >
                                        <td className="fs-13 lh-xs fw-400  ">
                                          {dim1}
                                          <br />
                                        </td>
                                        <td className="fs-13 lh-xs  fw-400  ">
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
                                    <tr
                                      key={dim1}
                                      className="border-botttom border border-1"
                                    >
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {dim1}
                                        <br />
                                      </td>
                                      <td className="fs-13 black_300  lh-xs bg_light">
                                        {Object.entries(dim1Data).map(
                                          ([dim2, students]) => (
                                            <React.Fragment key={dim2}>
                                              {dim2}
                                              <br />
                                            </React.Fragment>
                                          )
                                        )}
                                      </td>
                                      <td className="fs-13 lh-xs  fw-600">
                                        {Object.entries(dim1Data).map(
                                          ([dim2, students]) => {
                                            let metrics = 0;
                                            if (
                                              reportForm.metrics ===
                                              "Number Of Enrollments"
                                            ) {
                                              metrics = students.length;
                                            }
                                            if (
                                              reportForm.metrics ===
                                              "Fee Received Amount"
                                            ) {
                                              if (Array.isArray(students)) {
                                                students.forEach((student) => {
                                                  metrics +=
                                                    student.totalpaidamount;
                                                });
                                              }
                                            }
                                            if (
                                              reportForm.metrics ===
                                              "Fee Yet To Receive"
                                            ) {
                                              if (Array.isArray(students)) {
                                                students.forEach((student) => {
                                                  metrics += student.dueamount;
                                                });
                                              }
                                            }
                                            if (
                                              reportForm.metrics ===
                                              "Total Booking Amount"
                                            ) {
                                              if (Array.isArray(students)) {
                                                students.forEach((student) => {
                                                  metrics += student.finaltotal;
                                                });
                                              }
                                            }
                                            return (
                                              <React.Fragment key={dim2}>
                                                <div>{metrics}</div>
                                                <br />
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
                                      <tr className="border-botttom border border-1">
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
                                                ([dim3, students]) => (
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
                                                ([dim3, students]) => {
                                                  let metrics = 0;
                                                  if (
                                                    reportForm.metrics ===
                                                    "Number Of Enrollments"
                                                  ) {
                                                    metrics = students.length;
                                                  }
                                                  if (
                                                    reportForm.metrics ===
                                                    "Fee Received Amount"
                                                  ) {
                                                    if (
                                                      Array.isArray(students)
                                                    ) {
                                                      students.forEach(
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
                                                      Array.isArray(students)
                                                    ) {
                                                      students.forEach(
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
                                                      Array.isArray(students)
                                                    ) {
                                                      students.forEach(
                                                        (student) => {
                                                          metrics +=
                                                            student.finaltotal;
                                                        }
                                                      );
                                                    }
                                                  }
                                                  return (
                                                    <React.Fragment key={dim3}>
                                                      {metrics}
                                                      <br />
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateReport;
