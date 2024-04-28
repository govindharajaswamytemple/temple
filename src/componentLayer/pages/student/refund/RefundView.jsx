import React from "react";
import BackButton from "../../../components/backbutton/BackButton";
import Button from "../../../components/button/Button";

const RefundView = () => {
    return (
        <div>
            <BackButton heading="Refund View" content="Back" to="/" />
            <div className="container-fluid">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="table-responsive table-scroll">
                                    <div className="table-borderless">
                                        <tbody className='fs-13 '>
                                            <tr className="lh-400">
                                                <td className="ps-0 black_300 fw-500 fs-13">
                                                    Registration number
                                                </td>
                                                <td className="text-mute text-truncate fs-14 ps-2 fw-500">

                                                    <b className=" fw-500 fs-13 pe-2"> :</b>
                                                    sdfsdfdfd
                                                </td>
                                            </tr>
                                            <tr className="lh-500">
                                                <td className="ps-0 black_300 fw-500 fs-13">
                                                    Student Name
                                                </td>
                                                <td className="text-mute text-truncate fs-14 ps-2 fw-500">
                                                    {" "}
                                                    <b className=" fw-500 fs-13 pe-2"> :</b>
                                                    dsfndkgnfdkfd
                                                </td>
                                            </tr>
                                            <tr className="lh-500">
                                                <td className="ps-0 black_300  fw-500 fs-13">
                                                    Phone Number
                                                </td>
                                                <td className="text-mute text-truncate fs-14 ps-2 fw-500">
                                                    {" "}
                                                    <b className=" fw-500 fs-13 pe-2"> :</b>
                                                    dfsfds
                                                </td>
                                            </tr>
                                            <tr className="lh-500">
                                                <td className="ps-0 black_300 fw-500 fs-13">
                                                    Email Id
                                                </td>
                                                <td className="text-mute text-truncate fs-14 ps-2 fw-500">
                                                    {" "}
                                                    <b className=" fw-500 fs-13 pe-2"> :</b>
                                                    dsfdfd
                                                </td>
                                            </tr>
                                            <tr className="lh-500">
                                                <td className="ps-0 black_300 fw-500 fs-13">
                                                    Reason For Refund
                                                </td>
                                                <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                                                    {" "}
                                                    <b className=" fw-500 fs-13 pe-2"> :</b>
                                                    dsfsdfdfdf
                                                </td>
                                            </tr>
                                        </tbody>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="table-responsive table-scroll">
                                    <div className="table-borderless">
                                        <tbody className='fs-13 '>

                                            <tr className="lh-500">
                                                <td className="ps-0 black_300 fw-500 fs-13">
                                                    Enrolled Course
                                                </td>
                                                <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                                                    {" "}
                                                    <b className="fw-500 fs-13 pe-2"> :</b>
                                                    dsfsdfdfdf
                                                </td>
                                            </tr>
                                            <tr className="lh-500">
                                                <td className="ps-0 black_300  fw-500   fs-13">
                                                    Branch
                                                </td>
                                                <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                                                    {" "}
                                                    <b className=" fw-500 fs-13 pe-2"> :</b>
                                                    dsfsdfdfdf
                                                </td>
                                            </tr>
                                            <tr className="lh-500">
                                                <td className="ps-0 black_300  fw-500   fs-13">
                                                    Counsellor Name
                                                </td>
                                                <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                                                    {" "}
                                                    <b className=" fw-500 fs-13 pe-2"> :</b>
                                                    dsfsdfdfdf
                                                </td>
                                            </tr>

                                            <tr className="lh-500">
                                                <td className="ps-0 black_300  fw-500   fs-13">
                                                    Admission Date
                                                </td>
                                                <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                                                    {" "}
                                                    <b className=" fw-500 fs-13 pe-2"> :</b>
                                                    dsfsdfdfdf
                                                </td>
                                            </tr>
                                        </tbody>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="table-responsive table-scroll">
                                    <div className="table-borderless">
                                        <tbody className='fs-13 '>


                                            <tr className="lh-500">
                                                <td className="ps-0 black_300  fw-500   fs-13">
                                                    Total Course Fee
                                                </td>
                                                <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                                                    {" "}
                                                    <b className=" fw-500 fs-13 pe-2"> :</b>
                                                    dsfsdfdfdf
                                                </td>
                                            </tr>
                                            <tr className="lh-500">
                                                <td className="ps-0 black_300  fw-500   fs-13">
                                                    Fee Paid
                                                </td>
                                                <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                                                    {" "}
                                                    <b className=" fw-500 fs-13 pe-2"> :</b>
                                                    dsfsdfdfdf
                                                </td>
                                            </tr>
                                            <tr className="lh-500">
                                                <td className="ps-0 black_300  fw-500   fs-13">
                                                    Due Amount
                                                </td>
                                                <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                                                    {" "}
                                                    <b className=" fw-500 fs-13 pe-2"> :</b>
                                                    dsfsdfdfdf
                                                </td>
                                            </tr>
                                            <tr className="lh-500">
                                                <td className="ps-0 black_300  fw-500   fs-13">
                                                    Batch Timing
                                                </td>
                                                <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                                                    {" "}
                                                    <b className=" fw-500 fs-13 pe-2"> :</b>
                                                    dsfsdfdfdf
                                                </td>
                                            </tr>

                                        </tbody>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className=" col-md-4 ">
                                <label className="form-label fs-s fw-medium black_300">
                                    Support </label>
                                <select className="form-select form-control me-3 "
                                    aria-label="Default select example"
                                    placeholder="Branch*"
                                    name="branch"
                                    id="branch"
                                    required>
                                    <option value="" disabled selected className="">Select the options</option>
                                    <option>Active</option>
                                    <option>Inprogress</option>
                                    <option>Approved</option>
                                    <option>Disapproved</option>
                                    <option>On-Hold</option>
                                </select>
                            </div>
                            <div className="col-lg-4">
                                <label className="form-label fs-s fw-medium black_300">
                                    Remarks </label>
                                <textarea
                                    type="text"
                                    className=" form-control"
                                    placeholder="Enter text here...."
                                    rows="1"
                                    name="description"

                                />
                            </div>
                            <div className="col-lg-4 text-center">
                                <Button className={"btn_primary mt-4"} onClick="">Save </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className=" col-md-4 ">
                                <label className="form-label fs-s fw-medium black_300">
                                    RM </label>
                                <select className="form-select form-control me-3 "
                                    aria-label="Default select example"
                                    placeholder="Branch*"
                                    name="branch"
                                    id="branch"
                                    required>
                                    <option value="" disabled selected className="">Select the options</option>
                                    <option>Active</option>
                                    <option>Inprogress</option>
                                    <option>Approved</option>
                                    <option>Disapproved</option>
                                    <option>On-Hold</option>
                                </select>
                            </div>
                            <div className="col-lg-4">
                                <label className="form-label fs-s fw-medium black_300">
                                    Remarks </label>
                                <textarea
                                    type="text"
                                    className=" form-control"
                                    placeholder="Enter text here...."
                                    rows="1"
                                    name="description"

                                />
                            </div>
                            <div className="col-lg-4 text-center">
                                <Button className={"btn_primary mt-4"} >Save </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-4">
                                <label className="form-label fs-s fw-medium black_300"> Accounts </label>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label class="form-check-label fs-s fw-medium black_300" for="flexCheckDefaults">
                                        Refund Initiated
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label class="form-check-label fs-s fw-medium black_300" for="flexCheckDefault">
                                        On-Hold
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label class="form-check-label fs-s fw-medium black_300" for="flexCheckDefaulte">
                                        Refund Completed
                                    </label>
                                </div>
                                <Button className={"btn_primary mt-4"}>Save </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="table-responsive table-card  border-0">
                                    <div className="table-scroll">
                                        <table className="table table-centered align-middle  table-nowrap equal-cell-table table-hover">
                                            <thead className="table-light">
                                                <tr className="shadow-sm bg-body-tertiary rounded">
                                                    <th scope="col" className="fs-13 lh-xs fw-600">
                                                        User
                                                    </th>
                                                    <th scope="col" className="fs-13 lh-xs fw-600 ">
                                                        Status
                                                    </th>
                                                    <th scope="col" className="fs-13 lh-xs fw-600 ">
                                                        Remarks
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="fs-13 black_300  lh-xs bg_light">
                                                        -
                                                    </td>
                                                    <td className="fs-13 black_300  lh-xs bg_light">
                                                        -
                                                    </td>

                                                    <td className="fs-13 black_300  lh-xs bg_light">
                                                        -
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RefundView;
