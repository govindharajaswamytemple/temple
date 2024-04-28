import React from 'react'
import BackButton from '../../../components/backbutton/BackButton'
function CustomStudentForm() {
  return (
    <div>  <BackButton heading="Organization" content="Back" />
    <div className='container-fluid'>
        {/* <div className='card'> */}
        <ul className="nav mb-3" id="pills-tab" role="tablist">
                      <li
                        className="nav-item fs-13 fw_400  button-bg"
                        role="presentation"
                      >
                        <button
                          className=" nav-link active  button-bg black_300 rounded"
                          id="pills-overview-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-overview"
                          type="button"
                          role="tab"
                          aria-controls="pills-overview"
                          aria-selected="true"
                        >
                         Overview
                        </button>
                      </li>
                      <li
                        className="nav-item fs-13 fw_400  button-bg"
                        role="presentation"
                      >
                        <button
                          className="nav-link fs-13  button-bg black_300 rounded"
                          id="pills-customform-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-customform"
                          type="button"
                          role="tab"
                          aria-controls="pills-customform"
                          aria-selected="false"
                        >
                          Basic Details
                        </button>
                      </li>
                      <li
                        className="nav-item fs-13 fw_400  button-bg"
                        role="presentation"
                      >
                        <button
                          className="nav-link fs-13  button-bg black_300 rounded"
                          id="pills-studentdetail-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-studentdetail"
                          type="button"
                          role="tab"
                          aria-controls="pills-studentdetail"
                          aria-selected="false"
                        >
                      Student Details
                        </button>
                      </li>
                      <li
                        className="nav-item fs-13 fw_400  button-bg"
                        role="presentation"
                      >
                        <button
                          className="nav-link fs-13  button-bg black_300 rounded"
                          id="pills-contact-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-contactdetail"
                          type="button"
                          role="tab"
                          aria-controls="pills-contactdetail"
                          aria-selected="false"
                        >
                       Student Contact Details
                        </button>
                      </li>
                      <li
                        className="nav-item fs-13 fw_400  button-bg"
                        role="presentation"
                      >
                        <button
                          className="nav-link fs-13  button-bg black_300 rounded"
                          id="pills-educationdetail-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-educationdetail"
                          type="button"
                          role="tab"
                          aria-controls="pills-educationdetail"
                          aria-selected="false"
                        >
                 Education Details
                        </button>
                      </li>
                      <li
                        className="nav-item fs-13 fw_400  button-bg"
                        role="presentation"
                      >
                        <button
                          className="nav-link fs-13  button-bg black_300 rounded"
                          id="pills-photo-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-photo"
                          type="button"
                          role="tab"
                          aria-controls="pills-photo"
                          aria-selected="false"
                        >
              Photo
                        </button>
                      </li>
                      <li
                        className="nav-item fs-13 fw_400  button-bg"
                        role="presentation"
                      >
                        <button
                          className="nav-link fs-13  button-bg black_300 rounded"
                          id="pills-enquirydetails-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-enquirydetails"
                          type="button"
                          role="tab"
                          aria-controls="pills-enquiry"
                          aria-selected="false"
                        >
       Enquiry  Details
                        </button>
                      </li>
                      <li
                        className="nav-item fs-13 fw_400  button-bg"
                        role="presentation"
                      >
                        <button
                          className="nav-link fs-13  button-bg black_300 rounded"
                          id="pills-admissiondetails-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-admissiondetails"
                          type="button"
                          role="tab"
                          aria-controls="pills-admissiondetails"
                          aria-selected="false"
                        >
       Admission  Details
                        </button>
                      </li>
                     
                      <li
                        className="nav-item fs-13 fw_400  button-bg"
                        role="presentation"
                      >
                        <button
                          className="nav-link fs-13  button-bg black_300 rounded"
                          id="pills-feedetails-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-feedetails"
                          type="button"
                          role="tab"
                          aria-controls="pills-feedetails"
                          aria-selected="false"
                        >
Fee Details
                        </button>
                      </li>
                      <li
                        className="nav-item fs-13 fw_400  button-bg"
                        role="presentation"
                      >
                        <button
                          className="nav-link fs-13  button-bg black_300 rounded"
                          id="pills-billingdetails-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-billingdetails"
                          type="button"
                          role="tab"
                          aria-controls="pills-billingdetails"
                          aria-selected="false"
                        >
    Billing
                        </button>
                      </li>

                      <li
                        className="nav-item fs-13 fw_400  button-bg"
                        role="presentation"
                      >
                        <button
                          className="nav-link fs-13  button-bg black_300 rounded"
                          id="pills-other-tab"
                          data-bs-toggle="pill"
                          data-bs-target="#pills-other"
                          type="button"
                          role="tab"
                          aria-controls="pills-other"
                          aria-selected="false"
                        >
 Other
                        </button>
                      </li>
                     
                    </ul>



                    <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-overview"
                      role="tabpanel"
                      aria-labelledby="pills-overview-tab"
                    >
                      <div className=" p-1">
                       Overview
                       
                      </div>
                    </div>
                  </div>

                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-customform"
                      role="tabpanel"
                      aria-labelledby="pills-customform-tab"
                    >
                      <div className=" p-1">
                 Basic Details
                       
                      </div>
                    </div>
                  </div>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-studentdetail"
                      role="tabpanel"
                      aria-labelledby="pills-studentdetail-tab"
                    >
                      <div className=" p-1">
                Student Details
                       
                      </div>
                    </div>
                  </div>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-contactdetail"
                      role="tabpanel"
                      aria-labelledby="pills-contactdetail-tab"
                    >
                      <div className=" p-1">
              Student  Contact Details
                       
                      </div>
                    </div>
                  </div>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-educationdetail"
                      role="tabpanel"
                      aria-labelledby="pills-educationdetail-tab"
                    >
                      <div className=" p-1">
            Education Details
                       
                      </div>
                    </div>
                  </div>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-photo"
                      role="tabpanel"
                      aria-labelledby="pills-photo-tab"
                    >
                      <div className=" p-1">
         Photo
                       
                      </div>
                    </div>
                  </div>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-enquirydetails"
                      role="tabpanel"
                      aria-labelledby="pills-enquirydetails-tab"
                    >
                      <div className=" p-1">
Enquiry Details      
                       
                      </div>
                    </div>
                  </div>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-admissiondetails"
                      role="tabpanel"
                      aria-labelledby="pills-admissiondetails-tab"
                    >
                      <div className=" p-1">
Admission Details      
                       
                      </div>
                    </div>
                  </div>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-feedetails"
                      role="tabpanel"
                      aria-labelledby="pills-feedetails-tab"
                    >
                      <div className=" p-1">
Fee Details      
                       
                      </div>
                    </div>
                  </div>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-billingdetails"
                      role="tabpanel"
                      aria-labelledby="pills-billingdetails-tab"
                    >
                      <div className=" p-1">
Billing    
                       
                      </div>
                    </div>
                  </div>
                  <div className="tab-content" id="pills-tabContent">
                    <div
                      className="tab-pane fade"
                      id="pills-other"
                      role="tabpanel"
                      aria-labelledby="pills-other-tab"
                    >
                      <div className=" p-1">
Other    
                       
                      </div>
                    </div>
                  </div>

        </div>

    </div>
  )
}

export default CustomStudentForm
