import React from 'react'
import BackButton from "../../../components/backbutton/BackButton";
import Roles from "../../../../assets/images/setting_tabs_icons/Roles.svg";
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa6";
function Forms() {
  return (
    <div>
    <div>  <BackButton heading="Form" content="Back" />
    <div className='container-fluid'>
    <div className='row align-items-center justify-content-center'>
    <div  className="col-lg-3 col-sm-6">
    <div className="card card_animate">
                  <Link to="/settings/form/customuserform/" >
                    <div className="d-flex p-3 justify-content-between">
                      <div>
                        <span className="fs-16 fw-500 text-center"> User Form</span>
                        <div className="mt-3 fs-14 lh-100 text_underline black_300">
                          <p classname="black_300">
                            Explore <FaArrowRight className="black_300" />
                          </p>
                        </div>
                      </div> <div className="flex-shrink-0">
                        <div className="avatar-md me-3">
                          <span className="avatar-title bg-danger-subtle rounded-circle fs-1">
                            <img
                              src={Roles}
                              className="img-fluid"
                              width="100px"
                              height="100px"
                              alt=""
                            />
                          </span>
                        </div>
                      </div>
                      
                    </div>
                  </Link>
                </div>
    
    </div>
    <div  className="col-lg-3 col-sm-6">
    <div className="card card_animate">
                  <Link to="/settings/form/customstudentform/">
                    <div className="d-flex p-3 justify-content-between">
                      <div>
                        <span className="fs-16 fw-500 text-center"> Registration&nbsp;Form</span>
                        <div className="mt-3 fs-14 lh-100 text_underline black_300">
                          <p classname="black_300">
                            Explore <FaArrowRight className="black_300" />
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="avatar-md me-3">
                          <span className="avatar-title bg-danger-subtle rounded-circle fs-1">
                            <img
                                src={Roles}
                              className="img-fluid"
                              width="100px"
                              height="100px"
                              alt=""
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
    
    </div>
    
    
    
    
    
    
    
    </div>
    </div>
    </div>
    </div>
  )
}

export default Forms