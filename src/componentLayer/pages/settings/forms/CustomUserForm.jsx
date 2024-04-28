import React from 'react'
import BackButton from '../../../components/backbutton/BackButton'
function CustomUserForm() {
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
                          Custom User Form
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
                      Custom User Form
                       
                      </div>
                    </div>
                  </div>
        </div>

    </div>
  
  )
}

export default CustomUserForm