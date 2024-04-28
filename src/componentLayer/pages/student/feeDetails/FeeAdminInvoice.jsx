import React from "react";

import { useEffect, useState } from "react";

import "../../../../assets/css/FeeAdminInvoice.css"

import { useReactToPrint } from "react-to-print";

import { useStudentsContext } from "../../../../dataLayer/hooks/useStudentsContext";

import Button from "../../../components/button/Button";

import { useParams } from "react-router-dom";
import { MdLocalPrintshop } from "react-icons/md";
import numberToWords from "number-to-words";
import axios from "axios";

function FeeAdminInvoice() {

  const { id } = useParams();
  const [invoice, setinvoice] = useState();
  const { index } = useParams();
  const { name } = useParams();
  const { nametype } = useParams();
  const [number, setNumber] = useState();
  const [studentdata, setstudentdata] = useState("");
  const { studentState, studentState: { TotalStudents, singleStudentData }, getStudent, Dispatchstudents } = useStudentsContext();
  const componentRefff = React.useRef();
  console.log(singleStudentData, "gdhfdhfdgfh")
  const handlePrint = useReactToPrint({
    content: () => componentRefff.current,
  });

  console.log(`Print ${componentRefff.current}`);
  useEffect(() => {
    if (name === "Installment" && studentdata?.installments) {
      let data = studentdata?.installments;
      let paidamount = data[index]?.paidamount;
      setNumber(paidamount);
    }

    if (name === "Admission Fee" && studentdata?.initialpayment) {
      let data = studentdata?.initialpayment;
      let initialamount = data[index]?.initialamount;
      setNumber(initialamount);
    }

    if (number) {
      let words = numberToWords.toWords(number);
      words = words
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      setWords(words);
    }
  }, [studentdata]);

  const [words, setWords] = useState("");

  useEffect(() => {



    let firstbranch;

    if (studentdata?.branch) {
      firstbranch = studentdata?.branch[0]?.toUpperCase();
    }



    let paiddate;

    if (name === "Admission Fee" && studentdata?.initialpayment) {
      let data = studentdata.initialpayment;
      if (data && data[index]) {
        paiddate = data[index].paiddate;
      }
    }

    if (name === "Installment" && studentdata?.installments) {
      let data = studentdata.installments;
      if (data && data[index]) {
        paiddate = data[index].paiddate;
      }
    }

    let regnumber;

    if (studentdata?.registrationnumber) {
      let regnum = studentdata?.registrationnumber;
      regnumber = regnum.substring(9);

    }

    if (!studentdata) {
      setinvoice("");
    }

    if (name === "Admission Fee" && studentdata?.initialpayment) {
      if (nametype === "studentinvoice") {
        setinvoice(
          "R-TA" +
          firstbranch + "-" +
          paiddate[5] +
          paiddate[6] + "-" +
          paiddate[2] +
          paiddate[3] +
          "/" +
          regnumber +
          `/${parseInt(index) + 1}`
        );
      }

      if (nametype === "admininvoice") {
        setinvoice(
          "IN-TA" +
          firstbranch + "-" +
          paiddate[5] +
          paiddate[6] + "-" +
          paiddate[2] +
          paiddate[3] +
          "/" +
          regnumber +
          `/${parseInt(index) + 1}`
        );
      }
    }

    if (name === "Installment" && studentdata?.installments) {
      if (nametype === "studentinvoice") {
        setinvoice(
          "R-TA" +
          firstbranch + "-" +
          paiddate[5] +
          paiddate[6] + "-" +
          paiddate[2] +
          paiddate[3] + "/" + regnumber +
          `/${parseInt(index) + 2}`
        );
      }

      if (nametype === "admininvoice") {
        setinvoice(
          "IN-TA" + firstbranch + "-" +
          paiddate[5] +
          paiddate[6] + "-" +
          paiddate[2] +
          paiddate[3] + "/" + regnumber +

          `/${parseInt(index) + 2}`

        );
      }
    }
  }, [studentdata]);


  // useEffect(() => {
  //   if (TotalStudents && id) {
  //     const filteredResults = TotalStudents.filter((item) => {
  //       const singlestudentCondition = id ? item.id === parseInt(id) : true;
  //       return singlestudentCondition;
  //     });
  //     setstudentdata(filteredResults[0]);
  //     console.log("filteredResults[0]", filteredResults[0])
  //   }
  // }, [TotalStudents, id, Dispatchstudents]);




  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const { data, status } = await axios.get(`${process.env.REACT_APP_API_URL}/student/viewstudentdata/${id}`);
          console.log(data, status, "hdjfghjfdsgf");
          if (status === 200) {
            setstudentdata(data?.student[0]);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
    // Clean-up function
    return () => {
      // Perform any clean-up operations here if needed
    };
  }, [id]);


  return (
    <div className="container">
      <div className="mt-3 text-end me-3 ">
        <button onClick={handlePrint} className="btn btn_primary mb-3  end">
          <MdLocalPrintshop />  Print
        </button>
      </div>
      <div className="invoice" ref={componentRefff}>
        <div className="invoice-border black_300 border-black d-flex justify-content-center">
          <img
            className=" my-3 w-25"
            src="https://www.admin.teksacademy.com/static/media/Teks-Logo-with-Trade.07d75f2c54a71180af08.png"
            alt="logo"
          />
        </div>

        <div className="invoice-border border-black ">

          <h3 className="text-center my-3  black_300 fs-22 fw-500">

            {" "}

            Fee Invoice

          </h3>

        </div>



        <div className="invoice-border border-black">

          <div className="row no-rowmargin">

            <div className="col-6 pt-2  black_300">

              <b className="ps-2  black_300 fs-14 fs-14">

                Registration No :{" "}

              </b>

              {studentdata && studentdata.registrationnumber}

            </div>

            <div className="col-6 invoice-sideborder border-black pt-2  black_300 fs-14 fs-14">

              <b> Invoice NO : </b>

              <b> {invoice}</b>

              <p>
                {name === "Admission Fee" &&
                  studentdata &&
                  studentdata?.initialpayment &&
                  studentdata?.initialpayment.length > 0 ? (
                  studentdata?.initialpayment.map((student) => {
                    let paidDate = new Date(student?.paiddate);
                    const day = paidDate.getUTCDate();
                    const monthIndex = paidDate.getUTCMonth();
                    const year = paidDate.getUTCFullYear();

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
                    return (
                      <span key={student.id}>
                        <b>Date:</b> {paidDate}
                      </span>
                    );
                  })
                ) : name === "Admission Fee" ? (
                  <p>No initial payment data available</p>
                ) : null}
                {studentdata &&
                  name === "Installment" &&
                  studentdata?.installments &&
                  studentdata?.installments.length > 0 ? (
                  studentdata?.installments.map((student, indx) => {
                    const originalDate = new Date(student?.paiddate);
                    const day = String(originalDate.getDate()).padStart(2, "0");
                    const month = String(originalDate.getMonth() + 1).padStart(
                      2,
                      "0"
                    ); // Month is zero-based, so we add 1.
                    const year = originalDate.getFullYear();

                    const formattedDate = `${day}-${month}-${year}`;

                    console.log(formattedDate);
                    if (indx === parseInt(index)) {
                      return (
                        <span key={student?.id}>
                          <b>Date : </b> {formattedDate}
                        </span>
                      );
                    }
                    return null; // If the condition is not met, return null
                  })
                ) : name === "Installment" ? (
                  <p>No payment date available</p>
                ) : null}
              </p>

            </div>

          </div>

        </div>



        <div className="row invoice-border border-black no-margin">

          <div className="col-6 invoice-sideborder border-black py-2">

            <p className="">

              <strong className="ps-2  black_300 fs-14">

                {" "}

                KAPIL KNOWLEDGE HUB PVT LTD

              </strong>

            </p>

            <span className=" black_300 fs-14">

              <b className="ps-2  black_300 fs-14 ">CIN : </b>

              U80100TG2018PTC123853

            </span>{" "}

            <br />

            <span className="   black_300 fs-14">

              <b className="ps-2  black_300 fs-14 ">GSTIN : </b>{" "}

              36AAHCK0599C1ZI{" "}

            </span>{" "}

            <br />

            <span className="ps-2   fs-14  black_300" >

              <b>Branch : </b> Teks-{studentdata && studentdata?.branch}

            </span>

          </div>



          <div className="col-6 invoice-sideborder border-black py-2   black_300 fs-14">

            <p className="">BILL TO : </p>

            <span>

              <b>Name : </b>{studentdata && studentdata?.name}

            </span>

            <br />

            <span>

              <b>Contact No : </b> {studentdata && studentdata.mobilenumber}

            </span>

            <br />

            <span>

              <b>Email : </b>{studentdata && studentdata?.email}

            </span>

            <br />

            <span>

              <b>Address : </b>{" "}

              <span>

                {studentdata && (

                  <span>

                    {studentdata?.area},&nbsp;{studentdata?.native},&nbsp;

                    {studentdata?.state}, &nbsp;{studentdata?.zipcode},&nbsp;

                    {studentdata?.country}

                  </span>

                )}

              </span>

            </span>

            <br />

            <span>

              <b>Course : </b> Full Stack Java

            </span>

          </div>

        </div>



        <div className="table table-hd table-responsive pt-4  black_300">

          <table className="table table-hd table-centered align-middle table-nowrap mb-0  black_300">

            <thead className="">

              <th className="fs-14  text-center">Fee Type</th>

              <th className=" fs-14  caption text-center">Course Type</th>

              <th className=" fs-14  text-center">HSN Type</th>

              <th className=" fs-14   text-center">Amount</th>

              <th className=" fs-14   text-center">Tax</th>

              <th className=" fs-14   text-center">Tax Amount</th>

              <th className=" fs-14  text-center">Total Amount</th>

            </thead>

            <tbody>

              {name === "Admission Fee" &&
                studentdata &&
                studentdata?.initialpayment &&
                studentdata?.initialpayment.length > 0 ? (
                studentdata.initialpayment.map((student) => (
                  <tr>
                    <td className="border text-center black_300 border-black">
                      <span >   Admission Fee</span>
                    </td>
                    <td className="border text-center  black_300 border-black">
                      <span >  {studentdata.modeoftraining}</span>
                    </td>
                    <td className="border text-center  black_300 border-black">
                      <span > 99843</span>
                    </td>
                    <td className="border text-center  black_300 border-black">
                      <span > {Number(
                        parseFloat(student.initialamount / 1.18).toFixed(2)
                      ).toLocaleString("en-IN")}</span>
                    </td>
                    <td className="border text-center  black_300 border-black">
                      <span > 18%</span>
                    </td>

                    <td className="border text-center  black_300 border-black">
                      <span > {Number(
                        (
                          parseFloat(student.initialamount).toFixed(2) -
                          parseFloat(student.initialamount / 1.18).toFixed(2)
                        ).toFixed(2)
                      ).toLocaleString("en-IN")}</span>
                    </td>
                    <td className="border text-center black_300 border-black">
                      <span >{Number(student.initialamount).toLocaleString("en-IN")}</span>
                    </td>
                  </tr>

                ))

              ) : name === "Admission Fee" ? (
                <p>No initial payment data available</p>
              ) : null}
              {studentdata &&
                name === "Installment" &&
                studentdata?.installments &&
                studentdata?.installments.length > 0 ? (
                studentdata?.installments.map((student, indx) => {
                  if (indx === parseInt(index)) {
                    return (
                      <tr>
                        {/* {nametype === "studentinvoice" && (

                              <td className=" text-center border border-black border border-black 1">Fee</td>

                            )} */}

                        {/* {nametype === "admininvoice" && (

                             

                            )} */}
                        <td className=" text-center black_300 border border-black border border-black 1">
                          Course Fee
                        </td>
                        <td className=" text-center black_300 border border-black border border-black 1">
                          {studentdata?.modeoftraining}
                        </td>
                        <td className="border text-center black_300 border-black">
                          <span > 99843</span>
                        </td>
                        {/* {nametype === "studentinvoice" && (

                              <td className=" text-center border border-black border border-black 1">

                                {Number(

                                  parseFloat(student.paidamount / 1.18).toFixed(2)

                                ).toLocaleString("en-IN")}

                              </td>

                            )} */}

                        {/* {nametype === "admininvoice" && (

                             

                            )} */}

                        <td className=" text-center black_300 border border-black border border-black 1">

                          {Number(

                            parseFloat(

                              (student.paidamount * 0.65) / 1.18

                            ).toFixed(2)

                          ).toLocaleString("en-IN")}

                        </td>

                        {/* <td className=" text-center border border-black border border-black 1">

                  {parseFloat((student.paidamount * 0.65) / 1.18).toFixed(

                    2

                  )}

                </td> */}<td className="border text-center black_300 border-black">

                          <span > 18%</span>

                        </td>



                        {/* {nametype === "studentinvoice" && (

                              <td className=" text-center border border-black border border-black 1">

                                {Number(

                                  (

                                    parseFloat(student.paidamount).toFixed(2) -

                                    parseFloat(student.paidamount / 1.18).toFixed(2)

                                  ).toFixed(2)

                                ).toLocaleString("en-IN")}

                              </td>

                            )} */}

                        {/* {nametype === "admininvoice" && (

                             

                            )} */}

                        <td className=" text-center  black_300 border border-black border border-black 1">

                          {Number(
                            (
                              parseFloat(student.paidamount * 0.65).toFixed(2) -
                              parseFloat(
                                (student.paidamount * 0.65) / 1.18
                              ).toFixed(2)
                            ).toFixed(2)
                          ).toLocaleString("en-IN")}

                        </td>

                        {/* <td className=" text-center border border-black border border-black 1">

                  {(

                    parseFloat(student.paidamount * 0.65).toFixed(2) -

                    parseFloat(

                      (student.paidamount * 0.65) / 1.18

                    ).toFixed(2)

                  ).toFixed(2)}

                </td> */}

                        {/* {nametype === "studentinvoice" && (

                              <td className=" text-center border border-black border border-black 1">

                                {Number(parseInt(student.paidamount)).toLocaleString(

                                  "en-IN"

                                )}

                              </td>

                            )} */}

                        {/* {nametype === "admininvoice" && (

                             

                            )} */}

                        <td className=" text-center black_300 border border-black border border-black 1">

                          {Number(

                            parseInt(student.paidamount * 0.65)

                          ).toLocaleString("en-IN")}

                        </td>

                        {/* <td className=" text-center border border-black border border-black 1">

                  {parseInt(student.paidamount * 0.65)}

                </td> */}

                      </tr>

                    );

                  }

                  return null; // If the condition is not met, return null

                })

              ) : name === "Installment" ? (

                <p>No payment date available</p>

              ) : null}



              {studentdata &&

                // nametype === "admininvoice" &&

                name === "Installment" &&

                studentdata?.installments &&

                studentdata?.installments.length > 0 ? (

                studentdata?.installments.map((student, indx) => {

                  if (indx === parseInt(index)) {

                    return (

                      <tr>

                        <td className="border border-black black_300 border border-black 1 text-center">

                          Material Fee

                        </td>



                        <td className="border border-black black_300 border border-black 1 text-center"></td>

                        <td className="border border-black black_300 border border-black 1 text-center"></td>

                        <td className="border border-black black_300 border border-black 1 text-center">

                          {Number(

                            parseInt(student.paidamount * 0.35)

                          ).toLocaleString("en-IN")}

                        </td>

                        <td className="border border-black black_300 border border-black 1 text-center"></td>

                        <td className="border border-black black_300 border border-black 1 text-center"></td>

                        <td className="border border-black black_300 border border-black 1 text-center">

                          {Number(

                            parseInt(student.paidamount * 0.35)

                          ).toLocaleString("en-IN")}

                        </td>

                      </tr>

                    );

                  }

                  return null; // If the condition is not met, return null

                })

              ) : name === "Installment" && nametype === "admininvoice" ? (

                <p>No payment date available</p>

              ) : null}



              {name === "Admission Fee" &&

                studentdata &&

                studentdata.initialpayment &&

                studentdata.initialpayment.length > 0 ? (

                studentdata.initialpayment.map((student) => (

                  <tr>



                    <td className="border border-black black_300" colspan="3">

                      <span ><b>Total</b></span>

                    </td>

                    <td className="border text-center black_300 border-black">

                      <span > {Number(

                        parseFloat(student.initialamount / 1.18).toFixed(2)

                      ).toLocaleString("en-IN")}</span>

                    </td>

                    <td className="border border-black border black_300 border-black 1 text-center"></td>



                    <td className="border text-center black_300 border-black">

                      <span > {Number(

                        (

                          parseFloat(student.initialamount).toFixed(2) -

                          parseFloat(student.initialamount / 1.18).toFixed(2)

                        ).toFixed(2)

                      ).toLocaleString("en-IN")}</span>

                    </td>

                    <td className="border text-center black_300 border-black border border-black 1 ">

                      <strong>

                        {" "}

                        {Number(parseInt(student.initialamount)).toLocaleString(

                          "en-IN"

                        )}

                      </strong>

                    </td>

                  </tr>

                ))

              ) : name === "Admission Fee" ? (

                <p>No initial payment data available</p>

              ) : null}



              {studentdata &&

                name === "Installment" &&

                studentdata?.installments &&

                studentdata?.installments.length > 0 ? (

                studentdata?.installments.map((student, indx) => {

                  if (indx === parseInt(index)) {

                    return (

                      <tr>

                        <td className="border black_300 border-black" colspan="3">

                          <span ><b>Total</b></span>

                        </td>

                        {/* {nametype === "studentinvoice" && (

                              <td className=" text-center border border-black border border-black 1">

                                {Number(

                                  parseFloat(student.paidamount / 1.18).toFixed(2)

                                ).toLocaleString("en-IN")}

                              </td>

                            )} */}

                        {/* {nametype === "admininvoice" && (

                             

                            )} */}

                        <td className=" text-center black_300 border border-black ">

                          {Number(

                            parseFloat(

                              ((student.paidamount * 0.65) / 1.18) + (student.paidamount * 0.35)

                            ).toFixed(2)

                          ).toLocaleString("en-IN")}

                        </td>



                        <td className="border border-black black_300 text-center"></td>

                        {/* {nametype === "studentinvoice" && (

                              <td className=" text-center border border-black border border-black 1">

                                {Number(

                                  (

                                    parseFloat(student.paidamount).toFixed(2) -

                                    parseFloat(student.paidamount / 1.18).toFixed(2)

                                  ).toFixed(2)

                                ).toLocaleString("en-IN")}

                              </td>

                            )} */}

                        {/* {nametype === "admininvoice" && (

                             

                            )} */}

                        <td className=" text-center border black_300 border-black border">

                          {Number(

                            (

                              parseFloat(student?.paidamount * 0.65).toFixed(2) -

                              parseFloat(student?.paidamount * 0.65 / 1.18).toFixed(2)

                            ).toFixed(2)

                          ).toLocaleString("en-IN")}

                        </td>







                        <td className="border border-black border black_300 text-center">

                          <p>



                            {Number(parseInt(student.paidamount)).toLocaleString(

                              "en-IN"

                            )}

                          </p>

                        </td>

                      </tr>

                    );

                  }

                  return null; // If the condition is not met, return null

                })

              ) : name === "Installment" ? (

                <p>No payment date available</p>

              ) : null}



            </tbody>

          </table>

        </div>



        <div className=" table table-hd table-responsive  table-scroll pt-4">

          <table className="table table-hd table-hover table-centered align-middle table-nowrap mb-0">

            <thead>

              <tr>

                <th className="border border-black fs-14 text-center" rowspan="2">

                  HSN/AC
                </th>
                <th className="border border-black fs-14  text-center" rowspan={3}>
                  Taxable  Value
                </th>
                <th className="border border-black fs-14  text-center" colSpan={2}>
                  CGST
                </th>

                <th className="border border-black fs-14  text-center" colSpan={2}>
                  SGST
                </th>
                <th className="border border-black fs-14 text-center" rowspan="3">
                  Total Tax Amount
                </th>
              </tr>
              <tr>
                <th className="border border-black fs-14  text-center">Rate</th>
                <th className="border border-black fs-14  text-center">Amount</th>
                <th className="border border-black fs-14  text-center">Rate</th>
                <th className="border border-black fs-14  text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              {name === "Admission Fee" &&
                studentdata &&
                studentdata.initialpayment &&
                studentdata.initialpayment.length > 0 ? (
                studentdata.initialpayment.map((student) => (
                  <tr>

                    <td className="border border-black text-center black_300">
                      <span style={{ fontSize: "15px" }}>  {studentdata.modeoftraining}</span>
                    </td>

                    <td className="border border-black text-center black_300">
                      <span style={{ fontSize: "15px" }}> {Number(
                        parseFloat(student.initialamount / 1.18).toFixed(2)
                      ).toLocaleString("en-IN")}</span>
                    </td>
                    <td className="border border-black text-center black_300">
                      <span style={{ fontSize: "15px" }}> 9%</span>
                    </td>
                    <td className="border border-black text-center black_300">
                      <span style={{ fontSize: "15px" }}> {Number(
                        (
                          (parseFloat(student.initialamount).toFixed(2) -
                            parseFloat(student.initialamount / 1.18).toFixed(2)) / 2
                        ).toFixed(2)
                      ).toLocaleString("en-IN")}</span>
                    </td>
                    <td className="border border-black text-center black_300">
                      <span style={{ fontSize: "15px" }}> 9%</span>
                    </td>
                    <td className="border border-black text-center black_300">
                      <span style={{ fontSize: "15px" }}> {Number(
                        (
                          (parseFloat(student.initialamount).toFixed(2) -
                            parseFloat(student.initialamount / 1.18).toFixed(2)) / 2
                        ).toFixed(2)
                      ).toLocaleString("en-IN")}</span>
                    </td>
                    <td className="border border-black text-center black_300">
                      <span style={{ fontSize: "15px" }}> {Number(
                        (
                          (parseFloat(student.initialamount).toFixed(2) -
                            parseFloat(student.initialamount / 1.18).toFixed(2))
                        ).toFixed(2)
                      ).toLocaleString("en-IN")}</span>
                    </td>
                  </tr>
                ))
              ) : name === "Admission Fee" ? (
                <p>No initial payment data available</p>
              ) : null}
              {studentdata &&
                name === "Installment" &&
                studentdata?.installments &&
                studentdata?.installments.length > 0 ? (
                studentdata?.installments.map((student, indx) => {
                  if (indx === parseInt(index)) {
                    return (
                      <tr>


                        <td className=" text-center border border-black black_300 ">
                          {studentdata?.modeoftraining}
                        </td>

                        {/* {nametype === "studentinvoice" && (
                              <td className=" text-center border border-black border border-black 1">
                                {Number(
                                  parseFloat(student.paidamount / 1.18).toFixed(2)
                                ).toLocaleString("en-IN")}
                              </td>
                            )} */}
                        {/* {nametype === "admininvoice" && (
                             
                            )} */}
                        <td className=" text-center border border-black black_300 ">
                          {Number(
                            parseFloat(
                              (student.paidamount * 0.65) / 1.18
                            ).toFixed(2)
                          ).toLocaleString("en-IN")}
                        </td>

                        <td className="border border-black text-center black_300">
                          <span style={{ fontSize: "15px" }}> 9%</span>
                        </td>

                        {/* {nametype === "studentinvoice" && (
                              <td className=" text-center border border-black border border-black 1">
                                {Number(
                                  ((
                                    parseFloat(student.paidamount).toFixed(2) -
                                    parseFloat(student.paidamount / 1.18).toFixed(2)
                                  ) / 2

                                  ).toFixed(2)
                                ).toLocaleString("en-IN")}
                              </td>
                            )} */}
                        {/* {nametype === "admininvoice" && (
                             
                            )} */}
                        <td className=" text-center border border-black  black_300">
                          {Number(
                            ((
                              parseFloat(student.paidamount * 0.65).toFixed(2) -
                              parseFloat(
                                (student.paidamount * 0.65) / 1.18
                              ).toFixed(2)
                            ) / 2

                            ).toFixed(2)
                          ).toLocaleString("en-IN")}
                        </td>



                        <td className="border border-black text-center black_300">
                          <span style={{ fontSize: "15px" }}> 9%</span>
                        </td>

                        {/* {nametype === "studentinvoice" && (
                              <td className=" text-center border border-black border border-black 1">
                                {Number(
                                  ((
                                    parseFloat(student.paidamount).toFixed(2) -
                                    parseFloat(student.paidamount / 1.18).toFixed(2)
                                  ) / 2

                                  ).toFixed(2)
                                ).toLocaleString("en-IN")}
                              </td>
                            )} */}
                        {/* {nametype === "admininvoice" && (
                           
                            )} */}
                        <td className=" text-center border border-black black_300">
                          {Number(
                            ((
                              parseFloat(student.paidamount * 0.65).toFixed(2) -
                              parseFloat(
                                (student.paidamount * 0.65) / 1.18
                              ).toFixed(2)
                            ) / 2

                            ).toFixed(2)
                          ).toLocaleString("en-IN")}
                        </td>
                        {/* {nametype === "studentinvoice" && (
                              <td className=" text-center border border-black border border-black 1">
                                {Number(
                                  ((
                                    parseFloat(student.paidamount).toFixed(2) -
                                    parseFloat(student.paidamount / 1.18).toFixed(2)
                                  )

                                  ).toFixed(2)
                                ).toLocaleString("en-IN")}
                              </td>
                            )} */}
                        {/* {nametype === "admininvoice" && (
                             
                            )} */}
                        <td className=" text-center border border-black black_300">
                          {Number(
                            ((
                              parseFloat(student.paidamount * 0.65).toFixed(2) -
                              parseFloat(
                                (student.paidamount * 0.65) / 1.18
                              ).toFixed(2)
                            )

                            ).toFixed(2)
                          ).toLocaleString("en-IN")}
                        </td>
                      </tr>
                    );
                  }
                  return null; // If the condition is not met, return null
                })
              ) : name === "Installment" ? (
                <p>No payment date available</p>
              ) : null}






            </tbody>

          </table>

        </div>

        <div className="row">

          <div className="col-6">

            <p>

              <u>

                <b className="ps-2 black-color fs-14">Bank details:</b>

              </u>

            </p>

            <div className="black_300 fs-14">

              <b className="ps-2 black_300 fs-14">GSTIN:</b> 36AAHCK0599C1ZI

            </div>

            <div>

              {" "}

              <b className="ps-2 black_300 fs-14">Account No:</b> ...........

            </div>

            <div>

              {" "}

              <b className="ps-2 black_300 fs-14">IFSC Code:</b> ...........

            </div>

            <p>

              <b className="ps-2 black_300 fs-14">Branch:</b> ..........

            </p>

          </div>

          <div className="col-6 m-auto">

            <div className="black-color fs-14">

              {" "}

              KAPIL KNOWLEDGE HUB PVT LMD

            </div>

            <div>

              <small>(Formerly Kapil Food Park Pvt Ltd)</small>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}



export default FeeAdminInvoice;

