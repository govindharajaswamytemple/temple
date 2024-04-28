import React from "react";

import { useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import "../../../assets/css/UserView.css";
import BackButton from "../../components/backbutton/BackButton";

import axios from "axios";
import { useUserContext } from "../../../dataLayer/hooks/useUserContext";

import useFormattedDate from "../../../dataLayer/hooks/useFormattedDate";
import Button from "../../components/button/Button";

import DefaultimgBG from '../../../assets/images/student_idCard_images/DefaultimgBG.png'

// import "./UserView.css";

// import {UserPhoto} from "../../../../images/profile.jpg" UserView() {

const UserView = () => {





  const navigate = useNavigate();

  const { id } = useParams();

  const [singleUser, setUser] = useState("");

  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState(() => {
    const data = JSON.parse(localStorage.getItem("data"))
    return data || ""
  })

  const userId = userData.user.id





  useEffect(() => {

    // Make a GET request to your backend API endpoint

    axios

      .get(`${process.env.REACT_APP_API_URL}/user/viewuser/${id}`)
      .then((response) => {
        console.log(response, "ygdjfgdj")
        // Handle the successful response here
        setUser(response?.data?.user); // Update the data state with the fetched data

        console.log("cgfgdg", response.data.user);



      })

      .catch((error) => {

        // Handle any errors that occur during the request

        console.error("Error fetching data:", error);

      });

  }, [id]);

  const handleTabClick = (tab) => {

    setActiveTab(tab);

  };

  const {
    UsersState,
    UsersState: { EnrolledUsers },
    DispatchUsers,
  } = useUserContext();
  return (
    <div>
      <BackButton heading={`${userId === Number(id) ? `User Profile` : "User View"}`} content="Back" to="/" />
      <div className="container-fluid">

        <div className="">
          <div className="student-bg-position bg-imges "></div>
        </div>

        <div className="position-absolute text-white" style={{ zIndex: 2 }}>
          <div className="container-fluid">
            <div className="d-flex">

              <div class="avatar-lg mt-3">
                <img src={DefaultimgBG} alt="user-img" class="thumbnail " />
              </div>


              <div className="">

                <div

                  className=" text-white mt-5 ms-2"

                  style={{ zIndex: 2 }}

                >

                  <div className="col ms-1">
                    <div className="ps-1">
                      <h3 className="text-white mb-1  "> {singleUser?.fullname}</h3>
                      <p className="text-white mb-1 fs-s ms-1 ">
                        {singleUser.designation}
                      </p>
                      <div className="text-mute fs-s mb-1 hstack gap-1">
                        <div className="me-2">
                          {singleUser.branch}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul class="nav p-3 " id="pills-tab" role="tablist">
              <li class="nav-item" role="presentation">
                <button class="card card_animate nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">OverView</button>
              </li>
              <li class="nav-item" role="presentation">
                <button class="card card_animate nav-link ms-3" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Activities</button>
              </li>

            </ul>
            <div class="tab-content " id="pills-tabContent">
              <div class="tab-pane fade show active " id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                <div className="container-fluid">
                  <div className="row gap-3">
                    <div className="col-lg-4">
                      <div className="card">
                        <div className="card-body">
                          <tbody className='fs-13 '>

                            <tr className="lh-400">

                              <td className="ps-0 black_300 fw-500" scope="row ">

                                Full Name

                              </td>

                              <td className="text-mute text-truncate" style={{ maxWidth: "200px" }} title={singleUser?.fullname}><span className="ms-4">: </span> {singleUser?.fullname}</td>

                            </tr>

                            <tr className="lh-400">

                              <td className="ps-0 black_300 fw-500" scope="row">

                                Email

                              </td>

                              <td className="text-mute text-truncate" style={{ maxWidth: "250px" }} title={singleUser?.email}> <span className="ms-4">: </span>{singleUser?.email}</td>

                            </tr>
                            <tr className="lh-400">
                              <td className="ps-0 black_300 fw-500" scope="row">
                                Phone No
                              </td>
                              <td className="text-mute"><span className="ms-4">: </span>{singleUser?.phonenumber}</td>
                            </tr>
                            <tr className="lh-400">
                              <td className="ps-0 black_300 fw-500" scope="row">
                                Designation
                              </td>
                              <td className="text-mute">
                                <span className="ms-4">: </span>{singleUser.designation}
                              </td>
                            </tr>
                            <tr className="lh-400">
                              <td className="ps-0 black_300 fw-500" scope="row">
                                Department
                              </td>
                              <td className="text-mute">
                                <span className="ms-4">: </span>  {singleUser.department}
                              </td>
                            </tr>
                            <tr className="lh-400">
                              <td className="ps-0 black_300 fw-500" scope="row">
                                Report To
                              </td>
                              <td className="text-mute"><span className="ms-4">: </span>{singleUser.reportto}</td>
                            </tr>
                            <tr className="lh-400">
                              <td className="ps-0 black_300 fw-500" scope="row">
                                Profile
                              </td>
                              <td className="text-mute"><span className="ms-4">: </span>{singleUser.profile}</td>
                            </tr>
                            <tr className="lh-400">
                              <td className="ps-0 black_300 fw-500" scope="row">
                                Branch
                              </td>
                              <td className="text-mute"><span className="ms-4">: </span>{singleUser.branch}</td>
                            </tr>
                          </tbody>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="card fs-s">
                        <div className="card-body">
                          <h6 className="text_color">About</h6>
                          <p>
                            Hi I'm {singleUser?.fullname}, It will be as simple as Occidental; in
                            fact, it will be Occidental. To an English person, it will
                            seem like simplified English, as a skeptical Cambridge
                            friend of mine told me what Occidental is European
                            languages are members of the same family.
                          </p>

                          <p>
                            You always want to make sure that your fonts work well
                            together and try to limit the number of fonts you use to
                            three or less. Experiment and play around with the fonts
                            that you already have in the software you’re working with
                            reputable font websites. This may be the most commonly
                            encountered tip I received from the designers I spoke
                            with. They highly encourage that you use different fonts
                            in one design, but do not over-exaggerate and go
                            overboard.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>



              <div class="tab-pane fade " id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                <div className="card ms-3">
                  <div className="card-body">
                    <table className="table">
                      <thead className="">
                        <tr className="">
                          <th

                            className="text_color fs-14"
                          >
                            Date
                          </th>
                          <th

                            className=" text_color fs-14"
                          >
                            Status
                          </th>
                          <th
                            scope="col"
                            className=" text_color fs-14"
                          >
                            Review
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {singleUser.user_remarks_history &&
                          singleUser.user_remarks_history.map((userstatus, index) => {

                            const date = new Date(userstatus.date);
                            const day = date.getUTCDate();
                            const monthIndex = date.getUTCMonth();
                            const year = date.getUTCFullYear();

                            const monthAbbreviations = [
                              "Jan",
                              "Feb",
                              "Mar",
                              "Apr",
                              "May",
                              "Jun",
                              "Jul",
                              "Aug",
                              "Sep",
                              "Oct",
                              "Nov",
                              "Dec",
                            ];

                            // Formatting the date
                            const Formatteddate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                              }-${year}`;

                            return (
                              <tr

                                key={index}
                              >
                                <td className="table-cell-heading text_color fs-14">
                                  {" "}
                                  {Formatteddate}
                                </td>

                                {userstatus.Activate_remarks && (
                                  <td className="table-cell-heading text_color fs-14">
                                    Active
                                  </td>
                                )}
                                {userstatus.Inactivate_remarks && (
                                  <td className="table-cell-heading text_color fs-14">
                                    Inactive
                                  </td>
                                )}
                                {userstatus.Activate_remarks && (
                                  <td className="table-cell-heading text_color fs-14">
                                    {userstatus.Activate_remarks}
                                  </td>
                                )}
                                {userstatus.Inactivate_remarks && (
                                  <td className="table-cell-heading text_color fs-14">
                                    {userstatus.Inactivate_remarks}
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >




      </div >
    </div>

  );

}



export default UserView;

