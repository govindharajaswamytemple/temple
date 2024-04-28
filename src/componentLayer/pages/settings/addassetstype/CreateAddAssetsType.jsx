import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Button from "../../../components/button/Button";
import BackButton from "../../../components/backbutton/BackButton";
const CreateAddAssetsType = () => {
  return (
    <div>
      <BackButton heading="Create Asset Type" content="Back" />
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-5">
          <div className="card">
           
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label
                    for="firstNameinput"
                    className="form-label fs-s fw-medium txt-color"
                  >
                    Asset Type
                  </label>
                  <input
                    type="text"
                    className="form-control fs-s bg-form txt-color"
                    placeholder="Enter Asset Type"
                    id="firstNameinput"
                  />
                </div>
                <div className=" ">
                  <div className="d-flex justify-content-end">
                    <Button className={"btn_primary"}>Submit</Button>
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

export default CreateAddAssetsType;
