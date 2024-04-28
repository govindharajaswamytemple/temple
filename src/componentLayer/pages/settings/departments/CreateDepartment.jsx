import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/button/Button";
import { DepartmentContext } from "../../../../dataLayer/context/deparmentContext/DepartmentContextProvider";
import { useDepartmentContext } from "../../../../dataLayer/hooks/useDepartmentContext";

import BackButton from "../../../components/backbutton/BackButton";
function CreateDepartment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { DispatchDepartment, DepartmentState, getAllDeparments } =
    useDepartmentContext();
  const [formData, setFormData] = useState({
    department_name: "",
    description: "",
  });
  const [createdBy, setCreatedBy] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    return userData || "";
  });
  const [error, setError] = useState({});

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/settings/getdepartment/${id}`)
        .then((response) => {
          setFormData({
            department_name: response?.data?.department_name || "",
            description:response?.data?.description || "",
          });
          console.log(response.data, "response.data");
        })
        .catch((error) => {
          console.error("Error fetching department details:", error);
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
      !formData.department_name ||
      formData.department_name.trim() === "" ||
      formData.department_name.length < 3
    ) {
      setError((prev) => ({
        ...prev,
        department_name: "Please enter the department name (min 3 characters)",
      }));
      return;
    }

    if (
      !formData.description ||
      formData.description.trim() === "" ||
      formData.description.length < 3
    ) {
      setError((prev) => ({
        ...prev,
        description: "Please enter the description  (min 3 characters)",
      }));
      return;
    }
    let user = {
      department_name: formData.department_name,
      description: formData.description,
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
          axios.post(`${process.env.REACT_APP_API_URL}/settings/adddepartment`, user),
          {
            loading: "Loading...",
            success: "Department created Successfully",
            error: "Department not Created",
          }
        );

        if (status === 201) {
          console.log(data, "branchbb");
          DispatchDepartment({ type: "CREATE_DEPARTMENT", payload: data });
          getAllDeparments();
          navigate("/settings/departments");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (id) {
      try {
        const { data, status } = await toast.promise(
          axios.put(
            `${process.env.REACT_APP_API_URL}/settings/updatedepartment/${id}`,
            user
          ),
          {
            loading: "Loading...",
            success: "Department Updated Successfully",
            error: "Department not Updated",
          }
        );

        if (status === 200) {
          console.log(data, "branchBB");
          DispatchDepartment({ type: "CREATE_DEPARTMENT", payload: data });
          getAllDeparments();
          navigate("/settings/departments");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {
        id && id ? <BackButton heading="Upadte Department" content="Back"  /> :<BackButton heading="Create Department" content="Back"  />
      }
      
       {/* <BackButton heading="Create Department" content="Back"  /> */}
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5">
            <div className="card">
              <div className="card-body">
                <form>
                  <div className="mb-3">
                    <label
                      htmlFor="firstNameinput"
                      className="form-label fs-s fw-medium txt-color"
                    >
                      Department Name<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={
                        error && error.department_name
                          ? "form-control fs-s bg-form text_color input_bg_color error-input"
                          : "form-control fs-s bg-form text_color input_bg_color"
                      }
                      placeholder="Enter Department Name"
                      id="firstNameinput"
                      name="department_name"
                      value={formData.department_name}
                      onChange={handlechange}
                    />
                    <div style={{ height: "8px" }}>

                    {error && error.department_name && (
                      <p className="text-danger m-0 fs-xs">
                        {error.department_name}
                      </p>
                    )}
                    </div>

                  </div>
                  <div className="col-lg-12 mb-3">
                    <label
                      htmlFor="description"
                      className="form-label fs-s fw-medium txt-color"
                    >
                      Description<span className="text-danger">*</span>
                    </label>
                    <textarea
                      type="text"
                      className={
                        error && error.description
                          ? "form-control fs-s bg-form text_color input_bg_color error-input"
                          : "form-control fs-s bg-form text_color input_bg_color"
                      }
                      placeholder="Add your description"
                      id="description"
                      name="description"
                      onChange={handlechange}
                      value={formData?.description}
                    />
                    <div style={{ height: "8px" }}>

                    {error && error.description && (
                      <p className="text-danger m-0 fs-xs">
                        {error.description}
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
}

export default CreateDepartment;
