import React from "react";
import Button from "../../components/button/Button";
import BackButton from "../../components/backbutton/BackButton";

function Register() {
  return (
    <div>
      <BackButton heading=" Assign Assets " content="Back" />
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
                        className="form-label fs-s fw-medium txt-color"
                      >
                        Vendor Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control fs-s bg-form txt-color input_bg_color"
                        placeholder="Vendor Name"
                        id="vendornameinput"
                        name="vendorname"
                      // value={formData.fullname}
                      // onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        for="email"
                        className="form-label fs-s fw-medium txt-color"
                      >
                        Designation<span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control fs-s bg-form input_bg_color"
                        placeholder="Designation"
                        id="designationinput"
                        name="designation"
                      // value={formData.email}
                      // onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        for="lastNameinput"
                        className="form-label fs-s fw-medium txt-color"
                      >
                        Branch<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control fs-s bg-form input_bg_color"
                        placeholder="Enter Phone Number"
                        id="branchinput"
                        name="branch"
                      // value={formData.phonenumber}
                      // onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        for="email"
                        className="form-label fs-s fw-medium txt-color"
                      >
                        Assets Type<span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control fs-s bg-form input_bg_color"
                        placeholder="Assets type"
                        id="assetstypeinput"
                        name="aasesttype"
                      // value={formData.email}
                      // onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        for="email"
                        className="form-label fs-s fw-medium txt-color"
                      >
                        Assets Code<span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        className="form-control fs-s bg-form input_bg_color"
                        placeholder="Assets Code"
                        id="firstNameinput"
                        name="email"
                      // value={formData.email}
                      // onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div>
                      <div className="form-group text-start">
                        <label
                          className="form-label fs-s txt-color"
                          for="example-text-input "
                        >
                          Issue Date<span className="text-danger">*</span>
                        </label>
                        <input
                          className="form-control fs-s bg-form input_bg_color date_input_color"
                          type="date"
                          id="exampleInputdate"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label
                        for="lastNameinput"
                        className="form-label fs-s fw-medium txt-color"
                      >
                        Quantity<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control fs-s bg-form input_bg_color"
                        placeholder="Quantity"
                        id="firstNameinput"
                        name="phonenumber"
                      // value={formData.phonenumber}
                      // onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className=" ">
                    <div className="d-flex justify-content-end">
                      {/* <button
                        className="btn btn_primary "
                        // onClick={handleSubmit}
                      >
                        Submit
                      </button> */}
                      <Button
                        className="btn btn_primary "
                      // onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
