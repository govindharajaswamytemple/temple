import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { CoursePackageContext } from "../../../../dataLayer/context/coursePackageContext/CoursePackageContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import BackButton from "../../../components/backbutton/BackButton";
import Button from "../../../components/button/Button";
import { useCoursePackage } from "../../../../dataLayer/hooks/useCoursePackage";
const CreateCoursePackage = () => {
  const { coursePackageState, getAllCoursePackages, DispatchCourseState } =
    useCoursePackage();
  const navigate = useNavigate();
  
  const [createdBy, setCreatedBy] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    return userData || "";
  });
  const [formData, setFormData] = useState({
    coursepackages_name: "",
  });
  const [error, setError] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch branch for editing
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/settings/getcoursepackages/${id}`
        )
        .then((response) => {
          setFormData({
            coursepackages_name: response?.data?.coursepackages_name || "",
          });
          console.log(response.data, "response.data");
        })
        .catch((error) => {
          console.error("Error fetching course details:", error);
        });
    }
  }, [id]);

  const handlechange = (e) => {
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
      !formData.coursepackages_name ||
      formData.coursepackages_name.trim() === "" ||
      formData.coursepackages_name.length < 3
    ) {
      setError((prev) => ({
        ...prev,
        coursepackages_name: "Please enter the course name (min 3 characters)",
      }));
      return;
    }
    let user = {
      coursepackages_name: formData.coursepackages_name,
      createdby: createdBy?.user?.fullname,
    };
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

    if (!id) {
      try {
        const { data, status } = await toast.promise(
          axios.post(
            `${process.env.REACT_APP_API_URL}/settings/addcoursespackages`,
            user
          ),
          {
            loading: "Loading...",
            success: "Course Packages created Successfully",
            error: "Course Packages not Created",
          }
        );

        if (status === 201) {
          console.log(data, "branchbb");
          DispatchCourseState({ type: "CREATE_COURSE_PACKAGE", payload: data });
          getAllCoursePackages();
          navigate("/settings/coursepackage");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (id) {
      try {
        const { data, status } = await toast.promise(
          axios.put(
            `${process.env.REACT_APP_API_URL}/settings/updatecoursepackages/${id}`,
            user
          ),
          {
            loading: "Loading...",
            success: "Course Packages Updated Successfully",
            error: "Course Packages not Updated",
          }
        );

        if (status === 200) {
          console.log(data, "branchBB");
          DispatchCourseState({ type: "CREATE_COURSE_PACKAGE", payload: data });
          getAllCoursePackages();
          navigate("/settings/coursepackage");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {
        id && id? <BackButton heading=  "Update Course Packages" content="Back"  /> : <BackButton heading=  "Create Course Packages" content="Back"  />
      }
       {/* <BackButton heading=  "Create Course Packages" content="Back"  /> */}
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-5">
          <div className="card">
           
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label
                    for="firstNameinput"
                    className="form-label fs-s fw-medium text_color"
                  >
                    Package Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className={
                      error && error.coursepackages_name
                        ? "form-control fs-s bg-form text_color input_bg_color error-input"
                        : "form-control fs-s bg-form text_color input_bg_color"
                    }
                    placeholder="Enter Package Name"
                    id="firstNameinput"
                    name="coursepackages_name"
                    value={formData.coursepackages_name}
                    onChange={handlechange}
                  />
                  <div style={{ height: "8px" }}>
                    {error && error.coursepackages_name && (
                      <p className="text-danger m-0 fs-xs">
                        {error.coursepackages_name}
                      </p>
                    )}
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
    </div>
  );
};
export default CreateCoursePackage;
