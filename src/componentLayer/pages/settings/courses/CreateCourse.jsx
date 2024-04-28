import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import BackButton from "../../../components/backbutton/BackButton";
import Button from "../../../components/button/Button";
import { useNavigate, useParams } from "react-router-dom";

import { CourseContext } from "../../../../dataLayer/context/courseContext/CourseContextProvider";
import { useCourseContext } from "../../../../dataLayer/hooks/useCourseContext";
const CreateCourse = () => {
  const { DispatchCourse, courseState, getAllCourses } = useCourseContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course_name: "",
    course_package: "",
    fee: "",
    max_discount: "",
    createdBy:"",
  });

  const [createdBy, setCreatedBy] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    return userData || "";
  });

  const [error, setError] = useState({});

  useEffect(() => {
    if (id) {
      // Fetch course details for editing
      axios
        .get(`${process.env.REACT_APP_API_URL}/settings/getcourse/${id}`)
        .then((response) => {
          setFormData(response.data);
          console.log(response.data, "response.data");
        })
        .catch((error) => {
          console.error("Error fetching course details:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError((prev) => ({
      ...prev,
      [name]: "", // Reset error for the field being changed
    }));
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.course_name ||
      formData.course_name.trim() === "" ||
      formData.course_name.length < 3
    ) {
      setError((prev) => ({
        ...prev,
        course_name: "Please enter the course name (min 3 characters)",
      }));
      return;
    }

    if (
      !formData.course_package ||
      formData.course_package.trim() === "" ||
      formData.course_package.length < 3
    ) {
      setError((prev) => ({
        ...prev,
        course_package: "Please select the course package",
      }));
      return;
    }
    if (!formData.fee || formData.fee.trim() === "") {
      setError((prev) => ({
        ...prev,
        fee: "Please enter the fee",
      }));
      return;
    }

    if (!formData.max_discount || formData.max_discount.trim() === "") {
      setError((prev) => ({
        ...prev,
        max_discount: "Please enter the max discount",
      }));
      return;
    }

    let user = {
      course_name: formData.course_name,
      course_package: formData.course_package,
      fee: formData.fee,
      max_discount: formData.max_discount,
      createdby: createdBy?.user?.fullname,
    };

    console.log(user, "userfound");
    user = [user];
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
    console.log(user, "datatiltecases");

    if (!id) {
      try {
        const { data, status } = await toast.promise(
          axios.post(
            `${process.env.REACT_APP_API_URL}/settings/addcourses`,
            user
          ),
          {
            loading: "Loading...",
            success: "Course created Successfully",
            error: "Course not Created",
          }
        );

        if (status === 201) {
          console.log(data, "hellobb");
          DispatchCourse({ type: "CREATE_COURSE", payload: data });  
          getAllCourses();
          navigate("/settings/courses");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (id) {
      try {
        const { data, status } = await toast.promise(
          axios.put(
            `${process.env.REACT_APP_API_URL}/settings/updatecourse/${id}`,
            user
          ),
          {
            loading: "Loading...",
            success: "Course Updated Successfully",
            error: "Course not Updated",
          }
        );

        if (status === 200) {
          console.log(data, "hellobb");
          DispatchCourse({ type: "CREATE_COURSE", payload: data });
          getAllCourses();
          navigate("/settings/courses");
        }
      } catch (error) {
        console.log(error);
      }
    }
    
  };

  return (
    <div className="">
      {
        id && id ?<BackButton heading= "Update Course" content="Back"  /> :<BackButton heading= "Create Course" content="Back"  />
      }
       {/* <BackButton heading= "Create Course" content="Back"  /> */}
      <div className="container-fluid">
        <div className="card border-0">
          <div className="align-items-center">
            
          </div>
          <div className="card-body">
            <div className="live-prieview">
              <form>
                <div className="row d-flex">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        for="firstNameinput"
                        className="form-label fs-s fw-medium text_color"
                      >
                        Course Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className={
                          error && error.course_name
                            ? "form-control fs-s bg-form text_color input_bg_color error-input"
                            : "form-control fs-s bg-form text_color input_bg_color"
                        }
                        placeholder="Enter Course Name"
                        id="firstNameinput"
                        name="course_name"
                        value={formData.course_name}
                        onChange={handleChange}
                      />
                      <div style={{ height: "8px" }}>
                        {error && error.course_name && (
                          <p className="text-danger m-0 fs-xs">
                            {error.course_name}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className=" col-md-4 ">
                    <label className="form-label fs-s fw-medium text_color">
                      Course Package<span className="text-danger">*</span>
                    </label>
                    <select
                      className={
                        error && error.course_package
                          ? "form-control fs-s form-select text_color input_bg_color error-input"
                          : "form-control fs-s form-select text_color input_bg_color"
                      }
                      aria-label="Default select example"
                      placeholder="course_package*"
                      name="course_package"
                      id="course_package"
                      value={formData.course_package}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled selected>Select Course Package</option>
                      <option value={"Teks Job Oriented Program"}>
                        Teks Job Oriented Program
                      </option>
                      <option value={"Teks Professional Training Program"}>
                        Teks Professional Training Program
                      </option>
                    </select>
                    <div style={{ height: "8px" }}>
                      {error && error.course_package && (
                        <p className="text-danger m-0 fs-xs">
                          {error.course_package}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="">
                      <label
                        for="lastNameinput"
                        className="form-label fs-s fw-medium text_color"
                      >
                        Fee<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className={
                          error && error.fee
                            ? "form-control fs-s bg-form text_color input_bg_color error-input"
                            : "form-control fs-s bg-form text_color input_bg_color"
                        }
                        placeholder="Enter Fee"
                        id="firstNameinput"
                        name="fee"
                        value={formData.fee}
                        onChange={handleChange}
                      />
                      <div style={{ height: "8px" }}>
                        {error && error.fee && (
                          <p className="text-danger m-0 fs-xs">{error.fee}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        for="lastNameinput"
                        className="form-label fs-s fw-medium text_color"
                      >
                        Max Discount<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className={
                          error && error.max_discount
                            ? "form-control fs-s bg-form text_color input_bg_color error-input"
                            : "form-control fs-s bg-form text_color input_bg_color"
                        }
                        placeholder="Enter Max Discount"
                        id="firstNameinput"
                        name="max_discount"
                        value={formData.max_discount}
                        onChange={handleChange}
                      />
                      <div style={{ height: "8px" }}>
                        {error && error.max_discount && (
                          <p className="text-danger m-0 fs-xs">
                            {error.max_discount}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" ">
                  <div className="d-flex justify-content-end">
                    <Button className={"btn_primary"} onClick={handleSubmit}>
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateCourse;
