import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { BranchContext } from "../../../../dataLayer/context/branchContext/BranchContextProvider";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../../../components/button/Button";
import { useBranchContext } from "../../../../dataLayer/hooks/useBranchContext";
import BackButton from "../../../components/backbutton/BackButton";
import { useAuthContext } from "../../../../dataLayer/hooks/useAuthContext";

const CreateBranch = () => {
  const { DispatchBranch, BranchState, getAllBranches } = useBranchContext();
  const { id } = useParams();
  const { AuthState, DispatchAuth } = useAuthContext();
  const navigate = useNavigate();
  const [createdBy, setCreatedBy] = useState(AuthState?.user?.fullname);

  const [formData, setFormData] = useState({
    branch_name: "",
    description: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    if (id) {
      // Fetch branch for editing
      axios
        .get(`${process.env.REACT_APP_API_URL}/settings/getbranch/${id}`)
        .then((response) => {
          setFormData({
            branch_name: response?.data?.branch_name || "",
            description: response?.data?.description || "",
          });
          console.log(response.data, "response.data");
        })
        .catch((error) => {
          console.error("Error fetching course details:", error);
        });
    }
  }, [id]);

  console.log(formData, "branchName");

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
      !formData.branch_name ||
      formData.branch_name.trim() === "" ||
      formData.branch_name.length < 3
    ) {
      setError((prev) => ({
        ...prev,
        branch_name: "Please enter the branch name (min 3 characters)",
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
        description: "Please enter the description (min 3 characters)",
      }));
      return;
    }
    
    let user = {
      branch_name: formData.branch_name,
      description: formData.description,
      createdby: createdBy,
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

    if (!id) {
      try {
        const { data, status } = await toast.promise(
          axios.post(
            `${process.env.REACT_APP_API_URL}/settings/addbranch`,
            user
          ),
          {
            loading: "Loading...",
            success: "Branch created Successfully",
            error: "Branch not Created",
          }
        );

        if (status === 201) {
          console.log(data, "branchbb");
          DispatchBranch({ type: "CREATE_BRANCH", payload: data });
          getAllBranches();
          navigate("/settings/branch");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (id) {
      try {
        const { data, status } = await toast.promise(
          axios.put(
            `${process.env.REACT_APP_API_URL}/settings/updatebranch/${id}`,
            user
          ),
          {
            loading: "Loading...",
            success: "Branch Updated Successfully",
            error: "Branch not Updated",
          }
        );

        if (status === 200) {
          console.log(data, "branchBB");
          DispatchBranch({ type: "CREATE_BRANCH", payload: data });
          getAllBranches();
          navigate("/settings/branch");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {id &&  id ? <BackButton heading=  "Update Branch" content="Back"  /> : <BackButton heading=  "Create Branch" content="Back"  />}
      {/* <BackButton heading=  "Create Branch" content="Back"  /> */}
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5">
            <div className="card">
              <div className="card-body">
                <form className="row">
                  <div className=" col-lg-12 mb-3">
                    <label
                      for="firstNameinput"
                      className="form-label fs-s fw-medium text_color"
                    >
                      Branch Name<span className="text-danger">*</span>
                    </label>

                    <input
                      type="text"
                      className={
                        error && error.branch_name
                          ? "form-control fs-s bg-form text_color input_bg_color error-input"
                          : "form-control fs-s bg-form text_color input_bg_color"
                      }
                      placeholder="Enter Branch Name"
                      id="firstNameinput"
                      name="branch_name"
                      value={formData.branch_name}
                      onChange={handlechange}
                    />
                    <div style={{ height: "8px" }}>
                      {error && error.branch_name && (
                        <p className="text-danger m-0 fs-xs">
                          {error.branch_name}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-lg-12 mb-3">
                    <label
                      for="description"
                      className="form-label fs-s fw-medium text_color "
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
                        {id ? "Update" : "Submit"}
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
export default CreateBranch;
