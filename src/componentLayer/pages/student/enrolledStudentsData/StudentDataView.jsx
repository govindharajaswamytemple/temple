import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFormattedDate from "../../../../dataLayer/hooks/useFormattedDate";
import { useStudentsContext } from "../../../../dataLayer/hooks/useStudentsContext";
import Defaultimg from '../../../../assets/images/student_idCard_images/Defaultimg.jpg'
import { MdCreditScore } from "react-icons/md";
import { Link } from "react-router-dom";
import "../../../../assets/css/StudentDataView.css";
import BackButton from "../../../components/backbutton/BackButton";
function StudentDataView() {
  const [studentdata, setstudentdata] = useState("");
  const { id } = useParams();
  console.log("id", id);
  const { studentState, studentState: { TotalStudents }, Dispatchstudents } = useStudentsContext();
  console.log(studentdata, "studendata")
  useEffect(() => {
    if (TotalStudents && id) {
      const filteredResults = TotalStudents.filter((item) => {
        const singlestudentCondition = id ? item.id === parseInt(id) : true;

        return singlestudentCondition;
      });
      if (filteredResults) {
        console.log("filteredResults[0]", filteredResults[0]);
      }
      setstudentdata(filteredResults[0]);
    }
  }, [TotalStudents, id, Dispatchstudents]);
  let BirthDate = useFormattedDate(studentdata?.birthdate);
  let EnquiryDate = useFormattedDate(studentdata?.enquirydate);
  let ValidityStart = useFormattedDate(studentdata?.validitystartdate);
  let ValidityEnd = useFormattedDate(studentdata?.validityenddate);
  let AdmissionDate = useFormattedDate(studentdata?.admissiondate);
  return (
    <div>
      <BackButton heading="Student Data" content="Back" />
      <div className="container-fluid">

        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className=" col-xl-12 col-lg-12 ">
                <div className="row">
                  <div className="col-lg-4 col-md-6  col-sm-4 ">
                    <div className='stuimg'>
                      {!studentdata?.studentImg && <img src={Defaultimg} alt="photo" />}
                      {studentdata?.studentImg && (
                        <img
                          className=" w-50"
                          src={`https://teksacademyimages.s3.amazonaws.com/${studentdata?.studentImg}`}
                          //src={`https://teksacademyimages.s3.amazonaws.com/${studentdata.studentImg}`}
                          alt="photo"
                        />
                      )}
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="table-responsive table-scroll">
                      <div className="table-borderless">
                        <tbody className='fs-13 '>
                          <tr className="lh-400">
                            <td className="ps-0 black_300 fw-500   fs-13  ">
                              Full Name
                            </td>
                            <td className="text-mute text-truncate fs-14 ps-2  fw-500  ">
                              {" "}
                              <b className=" fw-500 fs-13 pe-2"> :</b>
                              {studentdata?.name}
                            </td>
                          </tr>
                          <tr className="lh-500">
                            <td className="ps-0 black_300 fw-500   fs-13  " >
                              Email-id
                            </td>
                            <td className="text-mute text-truncate fs-14 ps-2 fw-500">
                              {" "}
                              <b className=" fw-500 fs-13 pe-2"> :</b>
                              {studentdata?.email}
                            </td>
                          </tr>
                          <tr className="lh-500">
                            <td className="ps-0 black_300  fw-500   fs-13">
                              Mobile Number
                            </td>
                            <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                              {" "}
                              <b className=" fw-500 fs-13 pe-2"> :</b>
                              {studentdata?.mobilenumber}
                            </td>
                          </tr>
                          <tr className="lh-500">
                            <td className="ps-0 black_300 fw-500   fs-13">
                              Registration Number
                            </td>
                            <td className="text-mute text-truncate fs-14 ps-2 fw-500">
                              {" "}
                              <b className=" fw-500 fs-13 pe-2"> :</b>
                              {studentdata?.registrationnumber}
                            </td>
                          </tr>
                          <tr className="lh-500">
                            <td className="ps-0 black_300  fw-500   fs-13">
                              Whatsapp Number
                            </td>
                            <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                              {" "}
                              <b className=" fw-500 fs-13 pe-2"> :</b>
                              {studentdata?.whatsappno}
                            </td>
                          </tr>
                        </tbody>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6  col-sm-4">
                    <div className="table-responsive table-scroll">
                      <div className="table-borderless">
                        <tbody>
                          <tr className="lh-500">
                            <td className="ps-0 black_300 fw-500 fs-13  ">
                              Addmission Date
                            </td>
                            <td className="text-mute text-truncate fs-14 ps-2 fw-500  ">
                              {" "}
                              <b className=" fw-500 fs-13 pe-2"> :</b>
                              {AdmissionDate}
                            </td>
                          </tr>
                          <tr className="lh-500">
                            <td className="ps-0 black_300 fw-500   fs-13  ">
                              Course
                            </td>
                            <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                              {" "}
                              <b className=" fw-500 fs-13 pe-2"> :</b>
                              {studentdata?.courses}
                            </td>
                          </tr>
                          <tr className="lh-500">
                            <td className="ps-0 black_300 fw-500    fs-13">
                              Branch
                            </td>
                            <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                              {" "}
                              <b className=" fw-500 fs-13 pe-2"> :</b>
                              {studentdata?.branch}
                            </td>
                          </tr>
                          <tr className="lh-500">
                            <td className="ps-0 black_300 fw-500   0 fs-13">
                              Valid Start Date
                            </td>
                            <td className="text-mute text-truncate fs-14 ps-2 fw-500">
                              {" "}
                              <b className=" fw-500 fs-13 pe-2"> :</b>{ValidityStart}
                            </td>
                          </tr>
                          <tr className="lh-500">
                            <td className="ps-0 black_300 fw-500   fs-13">
                              Valid End Date
                            </td>
                            <td className="text-mute text-truncate fs-14 ps-2 fw-500">
                              {" "}
                              <b className=" fw-500 fs-13 pe-2"> :</b>{ValidityEnd}
                            </td>
                          </tr>
                        </tbody>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-lg-4 col-md-6  col-sm-12">
                <div className="table-responsive">
                  <div className="table-borderless">
                    <tbody>
                      <tr className="lh-500">
                        <td className="ps-0 black_300 fw-500  fs-13  ">
                          Country
                        </td>
                        <td className="text-mute text-truncate fs-14 ps-2  fw-500  ">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b>
                          {studentdata?.country}
                        </td>
                      </tr>
                      <tr className="lh-500">
                        <td className="ps-0 black_300 fw-500   fs-13  ">State</td>
                        <td className="text-mute text-truncate fs-14 ps-2 fw-500">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b>
                          {studentdata?.state}
                        </td>
                      </tr>
                      <tr className="lh-500">
                        <td className="ps-0 black_300 fw-500    fs-13">Area</td>
                        <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b> {studentdata?.area}
                        </td>
                      </tr>
                      <tr className="lh-500">
                        <td className="ps-0 black_300 fw-500   fs-13">
                          Native Place
                        </td>
                        <td className="text-mute text-truncate fs-14 ps-2 fw-500">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b>{studentdata?.native}
                        </td>
                      </tr>
                      <tr className="lh-500">
                        <td className="ps-0 black_300 fw-500    fs-13">
                          Zip Code
                        </td>
                        <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b>{studentdata?.zipcode}
                        </td>
                      </tr>
                      <tr className="lh-500">
                        <td className="ps-0 black_300 fw-500    fs-13">
                          Addmision Remark
                        </td>
                        <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b>{studentdata?.admissionremarks}

                        </td>
                      </tr>
                    </tbody>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6  col-sm-12">
                <div className="table-responsive table-scroll">
                  <div className="table-borderless">
                    <tbody>
                      <tr className="lh-500">
                        <td className="ps-0 black_300 fw-500  fs-13  ">
                          Parents Name
                        </td>
                        <td className="text-mute text-truncate fs-14 ps-2  fw-500  ">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b>{studentdata?.parentsname}
                        </td>
                      </tr>
                      <tr className="lh-500">
                        <td className="ps-0 black_300  fw-500  fs-13  ">
                          Birthdate
                        </td>
                        <td className="text-mute text-truncate fs-14 ps-2 fw-500">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b>{BirthDate}

                        </td>
                      </tr>
                      <tr className="lh-500">
                        <td className="ps-0 black_300  fw-500   fs-13">Gender</td>
                        <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b> {studentdata?.gender}
                        </td>
                      </tr>
                      <tr className="lh-500">
                        <td className="ps-0 black_300  fw-500   fs-13">
                          College
                        </td>
                        <td className="text-mute text-truncate fs-14 ps-2 fw-500">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b> {studentdata?.college}
                        </td>
                      </tr>
                      <tr className="lh-500">
                        <td className="ps-0 black_300 fw-500    fs-13">
                          Education Type
                        </td>
                        <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b>{studentdata?.educationtype}
                        </td>
                      </tr>
                      <tr className="lh-500">
                        <td className="ps-0 black_300 fw-500    fs-13">Asset</td>
                        <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b>{studentdata?.assets}
                        </td>
                      </tr>
                    </tbody>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6  col-sm-12">
                <div className="table-responsive table-scroll">
                  <div className="table-borderless">
                    <tbody>
                      <tr className="lh-500">
                        <td className="ps-0 black_300 fw-500 fs-13  ">Enquiry Date</td>
                        <td className="text-mute text-truncate fs-14 ps-2  fw-500  ">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b>{EnquiryDate}
                        </td>
                      </tr>
                      <tr className="lh-500">
                        <td className="ps-0 black_300 fw-500   fs-13  ">
                          Enquiry Taken By
                        </td>
                        <td className="text-mute text-truncate fs-14 ps-2 fw-500">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b>
                          {studentdata?.enquirytakenby}
                        </td>
                      </tr>
                      <tr className="lh-500">
                        <td className="ps-0 black_300  fw-500   fs-13">
                          Course Package
                        </td>
                        <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b>  {studentdata?.coursepackage}
                        </td>
                      </tr>
                      <tr className="lh-500">
                        <td className="ps-0 black_300  fw-500   fs-13">
                          Lead Source
                        </td>
                        <td className="text-mute text-truncate fs-14 ps-2 fw-500">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b> {studentdata?.leadsource &&
                            studentdata?.leadsource.map((source) => (
                              <span key={source.id}>
                                <span>{source.source}</span>
                                {source.name && <div>Name :{source.name} </div>}
                                {source.mobileNumber && (
                                  <div>Mobile Number:{source.mobileNumber} </div>
                                )}
                              </span>
                            ))}
                        </td>
                      </tr>
                      <tr className="lh-500">
                        <td className="ps-0 black_300 fw-500    fs-13">
                          Mode Of Training
                        </td>
                        <td className="text-mute text-truncate fs-14 ps-2 fw-500 ">
                          {" "}
                          <b className=" fw-500 fs-13 pe-2"> :</b>{studentdata?.modeoftraining}
                        </td>
                      </tr>
                    </tbody>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-lg-12">
                <div className="table-responsive table-scroll mt-2 ">
                  <table className="table  table-hover align-midle table-nowrap mb-0">
                    <thead>
                      <tr className="table-hd">
                        <th scope="col" className="fs-14 lh-xs black_300 border border-end border-white">
                          Fee Type
                        </th>
                        <th
                          scope="col"
                          className="fs-14 lh-xs black_300 fw-600 border border-end border-white"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="fs-14 lh-xs black_300 fw-600 border border-end border-white"
                        >
                          Discount
                        </th>
                        <th
                          scope="col"
                          className="fs-14 lh-xs black_300 fw-600 border border-end border-white"
                        >
                          Tax Amount
                        </th>
                        <th
                          scope="col"
                          className="fs-14 lh-xs black_300 fw-600 border border-end border-white"
                        >
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentdata?.feedetails &&
                        studentdata?.feedetails.map((item, index) => (
                          <tr

                            key={index}
                          >
                            <td className="fs-13 black_300  lh-xs bg_light ">
                              {item.feetype}
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light ">
                              {Number(
                                parseFloat(item.amount).toFixed(2)
                              ).toLocaleString("en-IN")}
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light ">
                              {item.discount &&
                                Number(
                                  parseFloat(item.discount).toFixed(2)
                                ).toLocaleString("en-IN")}
                              {!item.discount && <>0</>}
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light ">
                              {Number(
                                parseFloat(item.taxamount).toFixed(2)
                              ).toLocaleString("en-IN")}
                            </td>
                            <td className="fs-13 black_300  lh-xs bg_light ">
                              {Number(
                                parseFloat(item.totalamount).toFixed(2)
                              ).toLocaleString("en-IN")}
                              <br />
                              {item.feetype === "fee" ? (
                                <>
                                <b>
                                  Materialfee : {" "} </b>
                                  {Number(
                                    parseFloat(studentdata.materialfee).toFixed(2)
                                  ).toLocaleString("en-IN")}
                                  <br /><b> CourseFee : {" "}</b>
                                  {Number(
                                    parseFloat(
                                      item.totalamount - studentdata.materialfee
                                    ).toFixed(2)
                                  ).toLocaleString("en-IN")}
                                </>
                              ) : (
                                <span></span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>


            </div>
            <div className="row mt-4">
              <div className="col-lg-12">
                <div className="table-responsive table-scroll mt-2 ">
                  <table className="table  table-hover align-midle table-nowrap mb-0">
                    <thead>
                      <tr className="table-hd">
                        <th scope="col" className="fs-14 lh-xs black_300 border border-end border-white">
                          Installment
                        </th>
                        <th
                          scope="col"
                          className="fs-14 lh-xs black_300 fw-600 border border-end border-white"
                        >
                          Due Date
                        </th>
                        <th
                          scope="col"
                          className="fs-14 lh-xs black_300 fw-600 border border-end border-white"
                        >
                          Due Amount
                        </th>
                        <th
                          scope="col"
                          className="fs-14 lh-xs black_300 fw-600 border border-end border-white"
                        >
                          Paid Date
                        </th>
                        <th
                          scope="col"
                          className="fs-14 lh-xs black_300 fw-600 border border-end border-white"
                        >
                          Paid Amount
                        </th>
                        <th
                          scope="col"
                          className="fs-14 lh-xs black_300 fw-600 border border-end border-white"
                        >
                          Mode
                        </th>
                        <th
                          scope="col"
                          className="fs-14 lh-xs black_300 fw-600 border border-end border-white"
                        >
                          Transiction ID
                        </th>
                        <th
                          scope="col"
                          className="fs-14 lh-xs black_300 fw-600 border border-end border-white"
                        >
                          Invoice
                        </th>
                      </tr>
                    </thead>
                    {studentdata && studentdata.installments && Array.isArray(studentdata.installments) &&
                      studentdata.installments.map((item, index) => {
                        let paidDate = new Date(item.paiddate);
                        const day = paidDate.getUTCDate();
                        const monthIndex = paidDate.getUTCMonth();
                        const year = paidDate.getUTCFullYear();
                        let dueDate = new Date(item.duedate);
                        const dueday = dueDate.getUTCDate();
                        const duemonthIndex = dueDate.getUTCMonth();
                        const dueyear = dueDate.getUTCFullYear();
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
                        paidDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                          }-${year}`;
                        dueDate = `${dueday < 10 ? "0" : ""}${dueday}-${monthAbbreviations[duemonthIndex]
                          }-${dueyear}`;

                        if (item.paidamount < 1) {
                          return null; // Do not render anything
                        }

                        return (
                          <tbody>
                            <tr>
                              <td className=" Table-cell fs-14 text-center black_300">
                                Installment {index + 1}
                              </td>

                              <td className="Table-cell fs-14 text-center black_300">
                                {dueDate}
                              </td>
                              <td className="Table-cell fs-14 text-center black_300">
                                {Number(
                                  parseFloat(item.dueamount).toFixed(2)
                                ).toLocaleString("en-IN")}
                              </td>
                              <td className="Table-cell fs-14 text-center black_300">
                                {paidDate}
                              </td>
                              <td className="Table-cell fs-14 text-center black_300 ">
                                {Number(item.paidamount).toLocaleString("en-IN")}
                              </td>

                              <td className="Table-cell fs-14 text-center black_300">
                                {item.modeofpayment}
                              </td>
                              <td className="Table-cell fs-14 text-center black_300">
                                {item.transactionid}
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light flex-row d-flex">
                                <Link
                                  to={`/student/invoice/${id}/${index}/Installment/admininvoice`}

                                >
                                  <MdCreditScore className="eye_icon" title="admin" />
                                  <div ></div>
                                </Link>
                                <Link
                                  to={`/student/invoice/${id}/${index}/Installment/studentinvoice`}

                                >
                                  <MdCreditScore className="eye_icon ms-3 " title="student" />
                                  <div ></div>
                                </Link>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}



                  </table>



                </div>

              </div>



            </div>

            <div className="row mt-4">
              <h6 className="mt-3"> Extra Discount</h6>
              <div className="col-lg-12">
                <div className="table-responsive table-scroll mt-2 ">
                  <table className="table  table-hover align-midle table-nowrap mb-0">
                    <thead>
                      <tr className="table-hd">
                        <th scope="col" className="fs-14 lh-xs black_300 border border-end border-white">
                          Date
                        </th>
                        <th
                          scope="col"
                          className="fs-14 lh-xs black_300 fw-600 border border-end border-white"
                        >
                          Extra Discount
                        </th>
                        <th
                          scope="col"
                          className="fs-14 lh-xs black_300 fw-600 border border-end border-white"
                        >
                          Remarks
                        </th>


                      </tr>
                    </thead>

                    {studentdata?.extra_discount &&
                      studentdata?.extra_discount.map((item, index) => {
                        let date = new Date(item.date);
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
                        date = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
                          }-${year}`;

                        return (
                          <tbody>
                            <tr
                              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                              <td className="Table-cell black_300">{date}</td>
                              <td className="Table-cell black_300">
                                {item.Discount}
                              </td>

                              <td className="Table-cell black_300">
                                {item.Discount_remarks}
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}


                  </table>



                </div>


              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDataView;