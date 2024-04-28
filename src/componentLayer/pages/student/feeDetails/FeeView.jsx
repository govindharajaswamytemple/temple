import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa";
import { HiMiniPlus } from "react-icons/hi2";
import GaugeChart from "./GaugeChart";
import Button from "../../../components/button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../../../assets/css/Table.css"
import { useStudentsContext } from "../../../../dataLayer/hooks/useStudentsContext";
import { MdCreditScore } from "react-icons/md";
import { toast } from "react-toastify";
import BackButton from "../../../components/backbutton/BackButton";
import ReactEcharts from "echarts-for-react";
const FeeView = () => {


  const [noOfinstallments, setNoOfinstallments] = useState();
  const [installments, setInstallments] = useState();
  const [totalinstallments, settotalinstallments] = useState();
  const [extraDiscount, setExtraDiscount] = useState();
  const [studentInvoiceID, setStudentInvoiceID] = useState();
  const [adminInvoiceId, setAdminInvoiceId] = useState();

  console.log(studentInvoiceID, adminInvoiceId, "dgfhdf")

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  console.log(installments, "dfjgjgdf")

  console.log(extraDiscount, "lasfhdsgfgd")

  const navigate = useNavigate();
  const { id } = useParams()
  console.log("iddff", id)

  const { getStudent, studentState, studentState: { singleStudentData }, Dispatchstudents } = useStudentsContext();
  console.log(studentState, "sfjdfagafg")

  useEffect(() => {
    if (id) {
      getStudent(id)
    }
  }, [id])

  console.log(singleStudentData && singleStudentData[0], "dfkkdjh")

  // invoice id genration

  let branchName = singleStudentData && singleStudentData[0]?.branch;
  let studentRegnumber = singleStudentData && singleStudentData[0]?.registrationnumber;
  let currentdate = getCurrentDate();
  console.log(branchName, studentRegnumber, currentdate, "jgsdhfdh")
  useEffect(() => {
    if (branchName && studentRegnumber && currentdate) {

      let lastfourdigitsReg = studentRegnumber.slice(-4)

      let studentInvoiceid = "R-TA" + branchName[0] + "-" + currentdate[8] + currentdate[9] + "-" + currentdate[2] + currentdate[3] + "/" + lastfourdigitsReg + "/"
      setStudentInvoiceID(studentInvoiceid)
      let AdminInvoiceID = "IN-TA" + branchName[0] + "-" + currentdate[8] + currentdate[9] + "-" + currentdate[2] + currentdate[3] + "/" + lastfourdigitsReg + "/"
      setAdminInvoiceId(AdminInvoiceID)
    }
  }, [branchName, studentRegnumber, currentdate,])





  const TotalAmount = singleStudentData && singleStudentData[0]?.finaltotal;
  const paidamount = singleStudentData && singleStudentData[0]?.totalpaidamount;
  const dueamount = singleStudentData && singleStudentData[0]?.dueamount;
  const percentage = (paidamount / TotalAmount) * 100
  console.log(percentage, "sfvjdf")

  console.log(TotalAmount, paidamount, dueamount, percentage, "dkfjdfgdjgf")

  const staticValue = percentage?.toFixed(0); // Static value for the needle indicator


  let color;
  if (percentage <= 30) {
    color = "#405189"; // blue color
  } else {
    color = "#e6ebf8"; // gray color
  }


  var option = {
    // tooltip: {
    //   formatter: "{a} <br/>{b} : {c}%",
    // },

    color: ["#405189"], //blue color
    textStyle: {
      fontFamily: "Poppins, sans-serif",
    },
    series: [
      {
        name: "Pressure",
        type: "gauge",
        progress: {
          show: true,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value}",
          color: "#858d98",
        },
        axisLabel: {
          color: "#858d98",
        },
        data: [
          {
            title: {
              color: "#858d98", //score 
            },
            // value: value, // Use the dynamic value here
            value: staticValue, // Use the static value here
            name: "Percentage",
          },
        ],
        axisLine: {
          lineStyle: {
            // color: [
            //   [0.5, "#405189"], // blue Color at 30%
            //   [1, "#e74c3c"], // red Color at 70%
            // ],
            width: 10,
            shadowColor: "#fff", // Default is #000
            shadowBlur: 10,
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
        },
        splitLine: {
          length: 10,
          lineStyle: {
            color: "auto",
          },
        },
        pointer: {
          itemStyle: {
            color: '#e96228' // Orange color for the needle
          }
        }
      },
    ],

  };





  const [studentData, setStudentData] = useState()
  console.log(studentData, "sfhjfgjg")


  // Single Student Admission Details Binding
  let getAdmissionFee
  useEffect(() => {
    if (singleStudentData) {
      setStudentData(singleStudentData)
      let feedetails = singleStudentData[0].feedetails
      let admissiondetails = feedetails.filter((item) => item?.feetype === "Admission Fee")
      console.log("admissionFee", admissiondetails[0]?.amount)


      getAdmissionFee = admissiondetails[0]?.amount
      setAdmissionFee({
        ...admissionFee,
        initialamount: getAdmissionFee,
        // You can update other properties as needed
      });
    }
  }, [singleStudentData, Dispatchstudents])

  useEffect(() => {
    settotalinstallments(singleStudentData && singleStudentData[0]?.totalinstallments);
    setInstallments(singleStudentData && singleStudentData[0]?.installments);
  }, [singleStudentData, Dispatchstudents]);




  // Admission fee Details

  const [admissionFee, setAdmissionFee] = useState({
    initialamount: 0,
    paiddate: new Date().toISOString().substr(0, 10),
    modeofpayment: "",
    transactionID: "",
    paymentdone: false,
    invoice: {
      studentInvoiceNo: "",
      adminInvoiceNo: "",
      FeeDetails: [{
        feeType: "",
        courseType: "",
        HSNTYPE: 99843,
        beforeTaxAmount: 0,
        taxPer: 0,
        taxAmount: 0,
        afterTaxTotalAmount: 0,
      },],
      beforeTaxTotalAmount: 0,
      totalTaxAmount: 0,
      finalAmount: 0,
      taxDetails: [{
        HSNAC: "",
        beforeTaxAmount: 0,
        taxableValue: 0,
        CGSTRate: 0,
        CGSTAmount: 0,
        SGSTRate: 0,
        SGSTAmount: 0,
        totalTaxAmount: 0,
      }]
    }
  });

  console.log(admissionFee, "hsgajghf")

  useEffect(() => {
    if (adminInvoiceId && studentInvoiceID) {
      setAdmissionFee({
        ...admissionFee,
        adminInvoiceId: adminInvoiceId,
        studentInvoiveId: studentInvoiceID,
      })
    }
  }, [adminInvoiceId, studentInvoiceID])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmissionFee((prevPayment) => ({
      ...prevPayment,
      [name]: value,
    }));
  };

  const handleAdmissionFee = async () => {

    if (!admissionFee.initialamount) {
      return toast.error("Please Enter Admission fee ")
    }
    else if (!admissionFee.modeofpayment) {
      return toast.error("Please Select the Mode of Payment")
    }

    console.log(admissionFee, "admissionFeeee")
    let initialpayment = [];
    initialpayment.push(admissionFee);
    initialpayment[0].initialamount = parseInt(initialpayment[0]?.initialamount);
    initialpayment[0].paymentdone = true;

    let paidAdmissionFee = parseInt(initialpayment[0]?.initialamount)

    // invoice generationfor admission Fee;

    // admission type 
    initialpayment[0].invoice.studentInvoiceNo = studentInvoiceID;
    initialpayment[0].invoice.adminInvoiceNo = adminInvoiceId;
    initialpayment[0].invoice.FeeDetails[0].HSNTYPE = 99843
    initialpayment[0].invoice.FeeDetails[0].feeType = "Admission Fee"
    initialpayment[0].invoice.FeeDetails[0].courseType = singleStudentData && singleStudentData[0].modeoftraining
    initialpayment[0].invoice.FeeDetails[0].beforeTaxAmount = Number(parseFloat(paidAdmissionFee / 1.18).toFixed(2))
    initialpayment[0].invoice.FeeDetails[0].taxPer = 18
    initialpayment[0].invoice.FeeDetails[0].taxAmount = Number((parseFloat(paidAdmissionFee).toFixed(2) -
      parseFloat(paidAdmissionFee / 1.18).toFixed(2)).toFixed(2))
    initialpayment[0].invoice.FeeDetails[0].afterTaxTotalAmount = Number(paidAdmissionFee)

    initialpayment[0].invoice.totalTaxAmount = Number((parseFloat(paidAdmissionFee).toFixed(2) -
      parseFloat(paidAdmissionFee / 1.18).toFixed(2)).toFixed(2) )

    initialpayment[0].invoice.beforeTaxTotalAmount = Number(parseFloat(paidAdmissionFee / 1.18).toFixed(2))
    initialpayment[0].invoice.finalAmount = Number(parseInt(paidAdmissionFee))


    // tax details
    initialpayment[0].invoice.taxDetails[0].HSNAC = singleStudentData && singleStudentData[0].modeoftraining
    initialpayment[0].invoice.taxDetails[0].taxableValue = Number(parseFloat(paidAdmissionFee / 1.18).toFixed(2))
    initialpayment[0].invoice.taxDetails[0].CGSTRate = 9
    initialpayment[0].invoice.taxDetails[0].CGSTAmount =Number (((parseFloat(paidAdmissionFee).toFixed(2) -
                                  parseFloat(paidAdmissionFee / 1.18).toFixed(2)) / 2).toFixed(2))
    initialpayment[0].invoice.taxDetails[0].SGSTRate = 9
    initialpayment[0].invoice.taxDetails[0].SGSTAmount = Number(((parseFloat(paidAdmissionFee).toFixed(2) -
    parseFloat(paidAdmissionFee / 1.18).toFixed(2)) / 2).toFixed(2))
    
    initialpayment[0].invoice.taxDetails[0].totalTaxAmount = Number((parseFloat(paidAdmissionFee).toFixed(2) -
      parseFloat(paidAdmissionFee / 1.18).toFixed(2)).toFixed(2))




      console.log(initialpayment, "initialpayment")

    let totalpaidamount = parseInt(studentData[0].totalpaidamount) + parseInt(admissionFee.initialamount);
    let dueamount = parseInt(studentData[0].dueamount) - parseInt(admissionFee?.initialamount);

    const updatedData = {
      dueamount,
      initialpayment,
      totalpaidamount,
    };

    console.log(updatedData, "dhgufgdjhfdg")

    const updateContext = {
      dueamount,
      initialpayment,
      totalpaidamount,
      id: studentData[0].id,
    };



    //admissionfee
    try {
      const { data, status } = await toast.promise(
        axios.put(`${process.env.REACT_APP_API_URL}/fee/admissionfee/${id}`, updatedData),
        {
          loading: "Loading...",
          success: " Admission fee Updated Successfully",
          error: "Something went wrong Please try again",
        }
      );



      if (status === 200) {
        Dispatchstudents({
          type: "UPDATE_ADMISSIONFEE",
          payload: {
            context: "ADMISSION_FEE_UPDATED_STUDENTS",
            data: updateContext,
          },
        });
        navigate(`/student/feeview/${id}`)

      }
    }
    catch (error) {
      console.log(error)
    }
    setAdmissionFee({
      initialamount: 0,
      paiddate: "",
      modeofpayment: "",
      transactionID: "",
      paymentdone: false,
      invoice: {
        studentInvoiceNo: "",
        adminInvoiceNo: "",
        FeeDetails: [{
          feeType: "",
          courseType: "",
          HSNTYPE: 99843,
          beforeTaxAmount: 0,
          taxPer: 0,
          taxAmount: 0,
          afterTaxTotalAmount: 0,
        },],
        beforeTaxTotalAmount: 0,
        totalTaxAmount: 0,
        finalAmount: 0,
        taxDetails: [{
          HSNAC: "",
          beforeTaxAmount: 0,
          taxableValue: 0,
          CGSTRate: 0,
          CGSTAmount: 0,
          SGSTRate: 0,
          SGSTAmount: 0,
          totalTaxAmount: 0,
        }]
      }
    });
  }


  // submit no of installments----------------------------------------------------------

  const handleNoOfInstallments = async (e) => {

    if (!noOfinstallments || noOfinstallments.length <= 0) {
      return toast.error("Please enter No-of Installments")
    }


    console.log(noOfinstallments, "shagfsjfdg")
    e.preventDefault();
    const addfee = true;
    let installments = Array(parseInt(noOfinstallments))
      .fill()
      .map((_, index) => (

        {
          id: Date.now(),
          installmentNumber: index + 1,
          duedate: "",
          // dueamount: parseInt(dueamount) / parseInt(noOfinstallments),
          dueamount: 0,
          paidamount: 0,
          paiddate: "",
          modeofpayment: "",
          transactionid: "",
          paymentdone: false,
          subInstallmentNumber: 0,

          // Invoice generation purpose
          invoice: {
            studentInvoiceNo: "",
            adminInvoiceNo: "",
            FeeDetails: [{
              feeType: "",
              courseType: "",
              HSNTYPE: 99843,
              beforeTaxAmount: 0,
              taxPer: 0,
              taxAmount: 0,
              afterTaxTotalAmount: 0,
            },
            {
              feeType: "",
              courseType: "",
              HSNTYPE: 99843,
              beforeTaxAmount: 0,
              taxPer: 0,
              taxAmount: 0,
              afterTaxTotalAmount: 0,
            }
            ],
            beforeTaxTotalAmount: 0,
            totalTaxAmount: 0,
            finalAmount: 0,
            taxDetails: [{
              HSNAC: "",
              taxableValue: 0,
              CGSTRate: 0,
              CGSTAmount: 0,
              SGSTRate: 0,
              SGSTAmount: 0,
              totalTaxAmount: 0,
            }]
          }
        }
      ));
    let totalinstallments = [
      {
        totalinstallments: parseInt(noOfinstallments),
        totalinstallmentspaid: 0,
        totalinstallmentsleft: parseInt(noOfinstallments),
      },
    ];

    console.log(totalinstallments, installments, "dfjdfjdfjdfjgf")
    const updatedData = {
      totalinstallments,
      addfee,
      installments,
    };

    console.log(updatedData, "shgsdsfdf")
    const updateContext = {
      totalinstallments,
      installments,
      addfee,
      id: studentData[0].id,
    };
    try {
      //noofinstallments
      const { data, status } = await toast.promise(
        axios.put(`${process.env.REACT_APP_API_URL}/fee/noofinstallments/${id}`, updatedData),
        {
          loading: "Loading...",
          success: "Installment updated Successfully",
          error: "Something went wrong Please try again",
        }
      );

      if (status === 200) {
        // dispatch({
        //   type: "UPDATE_NO_OF_INSTALLMENTS",
        //   payload: updateContext,
        // });
        // navigator(`/feeview/${id}`);
        Dispatchstudents({
          type: "UPDATE_NO_OF_INSTALLMENTS",
          payload: {
            context: "NO_OF_INSTALLMENST_UPDATED_STUDENTS",
            data: updateContext,
          },
        });
        navigate(`/student/feeview/${id}`)

      }

    }
    catch (error) {
      console.log(error)
    }

  }

  const [selectedDate, setSelectedDate] = useState(new Date());
  console.log(selectedDate, "gfhdsgfhdfg")

  // handle installment Upadates---------------------------------------------------------------------

  const handleInstallmentUpdate = (index, name, value) => {

    setSelectedDate(value);
    setInstallments((prevInstallments) => {
      const updatedInstallments = [...prevInstallments];
      updatedInstallments[index] = {
        ...updatedInstallments[index],
        [name]: value,
      };
      if (
        updatedInstallments[index].paiddate == "" &&
        updatedInstallments[index].paidamount > 0
      ) {
        updatedInstallments[index].paiddate = getCurrentDate();
      }
      return updatedInstallments;
    });
  };





  let DisplayUpdateDueamountAndInstallmentButton = false;

  if (singleStudentData && singleStudentData[0].installments && singleStudentData[0].installments.length > 0) {
    for (let i = 0; i < singleStudentData[0].installments.length; i++) {
      if (!singleStudentData[0].installments[i].duedate && !singleStudentData[0].installments[i].dueamount) {
        DisplayUpdateDueamountAndInstallmentButton = true
      }
    }
  }

  // UPDATE DUE_DATE AND UPDATE DUE AMOUNT --------------------------------------------------------------------------------

  const UpdateDueDateAndDueAmount = async (e) => {

    if (installments.length > 0) {
      for (let i = 0; i < installments.length; i++) {
        if (!installments[i].duedate) {
          return toast.error("Please Select Installment Date")
        }
        if (!installments[i].dueamount) {
          return toast.error("Please Enter Installment Amount")
        }
      }
    }


    console.log(installments, "dhgufgdjf")
    e.preventDefault();
    console.log("installments", installments)
    // let nextduedate = [];
    let nextduedate;
    for (let i = 0; i < installments.length; i++) {
      if (installments[i].paidamount < 1) {
        nextduedate = installments[i].duedate;
        break;
      }
      // nextduedate.push(installments[i].duedate);
    }
    let totalInstallmentAmountUpdated = 0
    let validateUpdatedDueDateAndDueAmount = true
    // validations for due date and due amount
    for (let i = 0; i < installments.length; i++) {
      if (!installments[i].duedate || !installments[i].dueamount) {
        validateUpdatedDueDateAndDueAmount = false
      }
      totalInstallmentAmountUpdated = totalInstallmentAmountUpdated + parseFloat(installments[i].dueamount)

    }
    if (validateUpdatedDueDateAndDueAmount && studentData[0].dueamount === totalInstallmentAmountUpdated) {
      const updatedData = {
        installments,
        // totalinstallments,
        // dueamount,
        // totalpaidamount,
        nextduedate,
      };

      const updateContext = {
        installments,
        // totalinstallments,
        // dueamount,
        // totalpaidamount,
        nextduedate,
        id: studentData[0].id,
      };
      console.log("updatedData", updatedData, updateContext);

      try {
        const { data, status } = await toast.promise(
          axios.put(`${process.env.REACT_APP_API_URL}/fee/updateduedateanddueamount/${id}`, updatedData),
          {
            loading: "Loading...",
            success: "UpDated DueDate & DueAmout Successfully",
            error: "Something went wrong Please try again",
          }
        );

        if (status === 200) {

          // dispatch({
          //   type: "UPDATE_DUE_DATE_DUE_AMOUNT",
          //   payload: updateContext,
          // });
          Dispatchstudents({
            type: "UPDATE_DUE_DATE_DUE_AMOUNT",
            payload: {
              context: "UPDATE_DUE_DATE_DUE_AMOUNT_STUDENT",
              data: updateContext,
            },
          });
          navigate(`/student/feeview/${id}`)
        }
      }
      catch (error) {
        console.log(error);
      }

    } else if (studentData[0].dueamount != totalInstallmentAmountUpdated) {
      toast.error("Sum of all installment amount Should be equal to due amount")
    } else if (!validateUpdatedDueDateAndDueAmount) {
      toast.error("Add Due Date and Due Amount")
    }
  };


  // update the Installement payment

  const handleUpdateClick = async (index) => {
    if (installments[index].paidamount > 0 && installments[index].paiddate && installments[index].modeofpayment) {
      if (
        installments[index].paidamount > 0 &&
        installments[index].paidamount <= parseInt(studentData[0].dueamount)
      ) {
        // Update state
        const updatedInstallments = await updateInstallments(index);
        // Now that state is updated, proceed with other actions
        let nextduedate;
        let totalinstallmentspaid = 0
        for (let i = 0; i < updatedInstallments.length; i++) {
          if (updatedInstallments[i + 1]) {
            if (updatedInstallments[i].installmentNumber != updatedInstallments[i + 1].installmentNumber && updatedInstallments[i].paymentdone === true) {
              totalinstallmentspaid += 1
            }
          } else {
            if (updatedInstallments[i].paymentdone) {
              totalinstallmentspaid += 1
            }
          }

          if (updatedInstallments[i].paidamount < 1) {
            nextduedate = updatedInstallments[i].duedate;
            break;
          }
        }

        let updatedtotalinstallments = [
          {
            totalinstallments: parseInt(totalinstallments[0].totalinstallments),
            totalinstallmentspaid: parseInt(totalinstallmentspaid),
            totalinstallmentsleft: parseInt(totalinstallments[0].totalinstallments) - parseInt(totalinstallmentspaid),
          },
        ];
        // let totalpaidamount = 0;
        // totalpaidamount = totalpaidamount + parseInt(admissionFee.admissionfee);
        // for (let i = 0; i < updatedInstallments.length; i++) {
        //   if (updateInstallments[i].paidamount) {
        //     totalpaidamount =
        //       totalpaidamount + parseInt(updateInstallments[i].paidamount);
        //   }
        // }

        let totalpaidamount = 0;
        totalpaidamount =
          totalpaidamount + studentData[0].initialpayment[0].initialamount;
        for (let i = 0; i < updatedInstallments.length; i++) {
          totalpaidamount = totalpaidamount + updatedInstallments[i].paidamount;
          // console.log("updatedInstallments", updatedInstallments[i].paidamount);
        }
        //start
        let dueamount = parseInt(studentData[0].finaltotal);
        dueamount = dueamount - studentData[0].initialpayment[0].initialamount;
        for (let i = 0; i < updatedInstallments.length; i++) {
          dueamount = dueamount - updatedInstallments[i].paidamount;
        }
        let totalExtraDiscount = 0
        if (studentData[0].extra_discount) {
          for (let i = 0; i < studentData[0].extra_discount.length; i++) {
            totalExtraDiscount = totalExtraDiscount + parseInt(studentData[0].extra_discount[i].Discount)
          }
        }
        dueamount = dueamount - totalExtraDiscount


        //end
        const updatedData = {
          installments: updatedInstallments,
          totalinstallments: updatedtotalinstallments,
          dueamount,
          totalpaidamount,
          nextduedate,
        };
        console.log(
          "studentdata.initialpayment[0].initialamount",
          studentData[0].initialpayment[0].initialamount
        );
        console.log(index, "dhghff")
        // console.log("updatedDataa", updatedData, updateContext);

        const updateContext = {
          installments: updatedInstallments,
          totalinstallments: updatedtotalinstallments,
          dueamount,
          totalpaidamount,
          nextduedate,
          id: studentData[0].id,
        };

        console.log("updatedDataaa", updatedData,);

        try {
          // feeinstallments

          const { data, status } = await toast.promise(axios.put(`${process.env.REACT_APP_API_URL}/fee/feeinstallments/${id}`, updatedData),
            {
              loading: "Loading...",
              success: "Updated installment Successfully",
              error: "Something went wrong Please try again",
            }
          );

          if (status === 200) {
            Dispatchstudents({
              type: "UPDATE_INSTALLMENTS",
              payload: {
                context: "UPDATE_SINGLE_INSTALLMENT",
                data: updateContext,
              },
            });
            navigate(`/student/feeview/${id}`)

          }

        }
        catch (error) {
          console.log(error);
        }
      }
      else {
        if (installments[index].paidamount > parseInt(studentData[0].dueamount)) {
          toast.error("Amount cannot be greater than Due Amount");
        } else if (installments[index].paidamount === 0) {
          toast.error("Paying Amount should be greater than 0");
        } else {
          toast.error("Error");
        }
      }
    }

    else {
      if (!installments[index].paidamount) {
        toast.error("Please Enter Paid amount")
      }

      else if (!installments[index].paiddate) {
        toast.error("please Enter Paid date")
      }
      else if (!installments[index].modeofpayment) {
        toast.error(" please Enter mode of payment")
      }
    }


  }

  const updateInstallments = (index) => {
    return new Promise((resolve) => {
      setInstallments((prevInstallments) => {
        const updatedInstallments = [...prevInstallments];
        if (parseInt(updatedInstallments[index].paidamount) > 0) {

          updatedInstallments[index].paymentdone = true;
          //invoice generation----

          if (updatedInstallments[index].invoice && updatedInstallments[index].invoice) {

            let InstallmentPaidAmount = updatedInstallments[index].paidamount;

            // course fee
            updatedInstallments[index].invoice.FeeDetails[0].courseType = singleStudentData && singleStudentData[0].modeoftraining;
            updatedInstallments[index].invoice.FeeDetails[0].feeType = "course fee";
            updatedInstallments[index].invoice.FeeDetails[0].taxPer = 18
            updatedInstallments[index].invoice.FeeDetails[0].beforeTaxAmount = Number(parseFloat((InstallmentPaidAmount * 0.65) / 1.18).toFixed(2))
            updatedInstallments[index].invoice.FeeDetails[0].taxAmount = Number((parseFloat(InstallmentPaidAmount * 0.65).toFixed(2) - parseFloat((InstallmentPaidAmount * 0.65) / 1.18).toFixed(2)).toFixed(2))
            updatedInstallments[index].invoice.FeeDetails[0].afterTaxTotalAmount = Number(parseInt(InstallmentPaidAmount * 0.65))

            // matrial fee
            updatedInstallments[index].invoice.FeeDetails[1].feeType = "Material Fee";
            updatedInstallments[index].invoice.FeeDetails[1].beforeTaxAmount = Number(parseInt(InstallmentPaidAmount * 0.35))
            updatedInstallments[index].invoice.FeeDetails[1].afterTaxTotalAmount = Number(parseInt(InstallmentPaidAmount * 0.35))


            // total fee
            updatedInstallments[index].invoice.beforeTaxTotalAmount = Number(parseFloat(((InstallmentPaidAmount * 0.65) / 1.18) + (InstallmentPaidAmount * 0.35)).toFixed(2))
            updatedInstallments[index].invoice.finalAmount = Number(parseInt(InstallmentPaidAmount));
            updatedInstallments[index].invoice.totalTaxAmount = Number((parseFloat(InstallmentPaidAmount * 0.65).toFixed(2) -
              parseFloat(InstallmentPaidAmount * 0.65 / 1.18).toFixed(2)).toFixed(2))


            //invoice id
            updatedInstallments[index].invoice.studentInvoiceNo = adminInvoiceId
            updatedInstallments[index].invoice.adminInvoiceNo = studentInvoiceID

            // tax details
            updatedInstallments[index].invoice.taxDetails[0].HSNAC = singleStudentData && singleStudentData[0].modeoftraining
            updatedInstallments[index].invoice.taxDetails[0].taxableValue = Number(parseFloat((InstallmentPaidAmount * 0.65) / 1.18).toFixed(2))

            updatedInstallments[index].invoice.taxDetails[0].CGSTRate = 9
            updatedInstallments[index].invoice.taxDetails[0].CGSTAmount = Number(((parseFloat(InstallmentPaidAmount * 0.65).toFixed(2) -
              parseFloat((InstallmentPaidAmount * 0.65) / 1.18).toFixed(2)) / 2).toFixed(2))

            updatedInstallments[index].invoice.taxDetails[0].SGSTRate = 9
            updatedInstallments[index].invoice.taxDetails[0].SGSTAmount = Number(((parseFloat(InstallmentPaidAmount * 0.65).toFixed(2) -
              parseFloat((InstallmentPaidAmount * 0.65) / 1.18).toFixed(2)) / 2).toFixed(2))


            updatedInstallments[index].invoice.taxDetails[0].totalTaxAmount = Number(((parseFloat(InstallmentPaidAmount * 0.65).toFixed(2) -
              parseFloat((InstallmentPaidAmount * 0.65) / 1.18).toFixed(2))).toFixed(2))

          }



        }
        if (
          parseInt(updatedInstallments[index].paidamount) < 1 ||
          updatedInstallments[index].paidamount === ""
        ) {
          updatedInstallments[index].paymentdone = false;
        }
        // Check if paidamount is less than dueamount
        if (
          updatedInstallments[index].paidamount <
          updatedInstallments[index].dueamount
        ) {
          // Calculate the subInstallmentNumber based on the existing installment
          const existingSubInstallmentNumber = updatedInstallments[index].subInstallmentNumber || 0;
          const newSubInstallmentNumber = existingSubInstallmentNumber + 1;



          // Create a new installment with the remaining amount and updated subInstallmentNumber
          const newInstallment = {
            ...updatedInstallments[index],
            installmentNumber: updatedInstallments[index].installmentNumber,
            dueamount:
              updatedInstallments[index].dueamount -
              updatedInstallments[index].paidamount,
            paidamount: 0,
            paiddate: "",
            modeofpayment: "",
            transactionid: "",
            paymentdone: false,
            subInstallmentNumber: newSubInstallmentNumber,
            invoice: {
              studentInvoiceNo: "",
              adminInvoiceNo: "",
              FeeDetails: [{
                feeType: "",
                courseType: "",
                HSNTYPE: 99843,
                beforeTaxAmount: 0,
                taxPer: 0,
                taxAmount: 0,
                afterTaxTotalAmount: 0,
              },
              {
                feeType: "",
                courseType: "",
                HSNTYPE: 99843,
                beforeTaxAmount: 0,
                taxPer: 0,
                taxAmount: 0,
                afterTaxTotalAmount: 0,
              }
              ],
              beforeTaxTotalAmount: 0,
              totalTaxAmount: 0,
              finalAmount: 0,
              taxDetails: [{
                HSNAC: "",
                beforeTaxAmount: 0,
                CGSTRate: 0,
                CGSTAmount: 0,
                SGSTRate: 0,
                SGSTAmount: 0,
                totalTaxAmount: 0,
              }]
            }
          };

          // Insert the new installment after the current one
          updatedInstallments.splice(index + 1, 0, newInstallment);
        }
        if (updatedInstallments[index].paidamount > updatedInstallments[index].dueamount) {
          let extraPaidAmount = updatedInstallments[index].paidamount - updatedInstallments[index].dueamount;
          let nextIndex = index + 1;

          // Iterate through next installments to subtract extraPaidAmount
          while (extraPaidAmount > 0 && nextIndex < updatedInstallments.length) {
            if (extraPaidAmount >= updatedInstallments[nextIndex].dueamount) {
              // Subtract dueamount from extraPaidAmount
              extraPaidAmount -= updatedInstallments[nextIndex].dueamount;
              // Mark the installment as paid
              updatedInstallments[nextIndex].dueamount = 0;
              updatedInstallments[nextIndex].paymentdone = true;
            } else {
              // Subtract remaining extraPaidAmount from the current installment
              updatedInstallments[nextIndex].dueamount -= extraPaidAmount;
              extraPaidAmount = 0;
            }

            nextIndex++;
          }
        }
        // if (updatedInstallments[index].paidamount > updatedInstallments[index].dueamount) {

        //   let extraPaidAmount = updatedInstallments[index].paidamount - updatedInstallments[index].dueamount;
        //   if (updatedInstallments[index + 1].dueamount) {
        //     if (extraPaidAmount <= updatedInstallments[index + 1].dueamount) {
        //       updatedInstallments[index + 1].dueamount = updatedInstallments[index + 1].dueamount - extraPaidAmount
        //     }
        //     if (extraPaidAmount > updatedInstallments[index + 1].dueamount) {
        //       let remainingextraPaidAmount = extraPaidAmount - updatedInstallments[index + 1].dueamount
        //       updatedInstallments[index + 1].dueamount = 0
        //       updatedInstallments[index + 1].paymentdone = true
        //       if (updatedInstallments[index + 2].dueamount) {
        //         updatedInstallments[index + 2].dueamount = updatedInstallments[index + 2].dueamount - remainingextraPaidAmount
        //       }
        //     }
        //   }

        // }

        resolve(updatedInstallments);
        return updatedInstallments;
      });
    });
  };




  // HANDLE EXTRA DISCOUNT----------------------------

  const handleApplyDiscount = async () => {

    if (!extraDiscount) {
      return toast.error("Please Enter Discount amount")
    }
    else if (extraDiscount == 0) {
      return toast.error("Discount amount not be '0' ")
    }
    else if (extraDiscount > studentData[0]?.dueamount) {
      return toast.error("Discount amount cannot be greater than Due Amount")
    }


    let validateUpdatedDueDateAndDueAmount = true
    for (let i = 0; i < installments.length; i++) {
      if (!installments[i].duedate) {
        // if (!installments[i].dueamount) {
        validateUpdatedDueDateAndDueAmount = false
        // }
      }
    }
    if (validateUpdatedDueDateAndDueAmount) {
      if (extraDiscount <= parseInt(studentData[0].dueamount)) {
        // setOpen(false);

        let dueamount;
        if (extraDiscount) {
          dueamount = parseInt(studentData[0].dueamount) - parseInt(extraDiscount);
        }
        // let updatedInstallmentAmount =
        //   dueamount / totalinstallments[0].totalinstallmentsleft;
        // for (let i = 0; i < installments.length; i++) {
        //   const updatedInstallments = [...installments];
        //   if (updatedInstallments[i].paymentdone === false) {
        //     updatedInstallments[i].dueamount = parseInt(updatedInstallmentAmount);
        //   }

        //   setInstallments(updatedInstallments);
        // }
        if (extraDiscount) {
          let updatedInstallments = [...installments]
          let remainingDiscount = extraDiscount;
          // console.log("ddddupdatedInstallments", updatedInstallments)
          let totalinstallmentspaid = 0

          for (let i = 0; i < updatedInstallments.length; i++) {
            if (!updatedInstallments[i].paymentdone && remainingDiscount > 0) {
              if (remainingDiscount >= updatedInstallments[i].dueamount) {
                remainingDiscount -= updatedInstallments[i].dueamount;
                updatedInstallments[i].paidamount = 0
                updatedInstallments[i].dueamount = 0
                updatedInstallments[i].paymentdone = true
                updatedInstallments[i].paiddate = getCurrentDate();

              } else {
                const newDueAmount = updatedInstallments[i].dueamount - remainingDiscount;
                remainingDiscount = 0;
                updatedInstallments[i].dueamount = newDueAmount
              }


            }

            if (updatedInstallments[i + 1]) {
              if (updatedInstallments[i].installmentNumber != updatedInstallments[i + 1].installmentNumber && updatedInstallments[i].paymentdone === true) {
                totalinstallmentspaid += 1
              }
            } else {
              if (updatedInstallments[i].paymentdone) {
                totalinstallmentspaid += 1
              }
            }


          }
          // const updatedInstallments = installments.map(installment => {
          //   if (!installment.paymentdone && remainingDiscount > 0) {
          //     if (remainingDiscount >= installment.dueamount) {
          //       // If discount is more than the due amount, subtract from the due amount and update remainingDiscount
          //       remainingDiscount -= installment.dueamount;
          //       return { ...installment, dueamount: 0, paymentdone: true, paidamount: installment.dueamount };
          //     } else {
          //       // If discount is less than the due amount, subtract from the discount and update dueamount
          //       const newDueAmount = installment.dueamount - remainingDiscount;
          //       remainingDiscount = 0;
          //       return { ...installment, dueamount: newDueAmount };
          //     }
          //   }
          //   return installment;
          // });
          let updatedtotalinstallments = [
            {
              totalinstallments: parseInt(totalinstallments[0].totalinstallments),
              totalinstallmentspaid: parseInt(totalinstallmentspaid),
              totalinstallmentsleft: parseInt(totalinstallments[0].totalinstallments) - parseInt(totalinstallmentspaid),
            },
          ];
          let Extra_Discount_remarks_history = studentData[0].extra_discount;
          let newObject = {
            Discount: parseInt(extraDiscount),
            // Discount_remarks: text,
            date: new Date(),
          };
          Extra_Discount_remarks_history.push(newObject);
          const updatedData = {
            installments: updatedInstallments,
            totalinstallments: updatedtotalinstallments,
            dueamount,
            Extra_Discount_remarks_history,
          };
          const updateContext = {
            installments: updatedInstallments,
            totalinstallments: updatedtotalinstallments,
            dueamount,
            Extra_Discount_remarks_history,
            id: studentData[0].id,
          };

          // let uploadcontext = { user_status, user_remarks_history, id };

          try {
            const { data, status } = await toast.promise(axios.put(`${process.env.REACT_APP_API_URL}/fee/extra_discount/${id}`, updatedData),
              {
                loading: "Loading...",
                success: "Added Extra Discount Successfully",
                error: "Something went wrong Please try again",
              }
            );
            if (status === 200) {

              Dispatchstudents({
                type: "UPDATE_EXTRA_DISCOUNT",
                payload: {
                  context: "UPDATE_EXTRA_DISCOUNT_STUDENT",
                  data: updateContext,
                },
              });
              navigate(`/student/feeview/${id}`)
              setExtraDiscount("")
            }

          }
          catch (error) {
            console.log(error)
          }

          // axios
          //   .put(
          //     `${process.env.REACT_APP_API_URL}/extra_discount/${id}`,
          //     updatedData
          //   )
          //   .then((res) => {
          //     if (res.data.updated) {
          //       alert("Discount Applied");
          //       dispatch({
          //         type: "UPDATE_EXTRA_DISCOUNT",
          //         payload: updateContext,
          //       });
          //       // window.location.reload();
          //     } else {
          //       alert("Error please Try Again");
          //     }
          //   });


          // setcourseStartDate("");
          // setText("");
        } else {
          toast.error("enter Discount and remarks");
        }
      } else {
        toast.error("Discount cannot be greater than Due amount");
      }
    }

    else {
      toast.error("Add Due Date and Due Amount")
    }

  };

  // EXTRA DISCOUNT VIEW -----------

  // let extra_discount_view = 0;
  // if (studentData[0].extra_discount) {
  //   let studentdata_extra_discount = studentData[0].extra_discount;
  //   for (let i = 0; i < studentdata_extra_discount.length; i++) {
  //     extra_discount_view += parseInt(studentdata_extra_discount[i].Discount);
  //   }
  // }







  return (
    <div>
      <BackButton heading="Fee View" content="Back" />
      <div className="container-fluid">
        {/* <iframe src="https://lottie.host/embed/a4517fbf-98ce-4e58-a206-67ea5ebc1343/9cWDB4ySXW.json"
          className="img-fluid" width="100%" height="100%"></iframe> */}
        <div className="row">
          <div className="col-lg-7 col-md-4 col-sm-12">
            <div className="card border-0">
              <div className="card-header">
                <div className="row">
                  <div className="col-lg-6">

                    <div>
                      <label
                        for="firstNameinput"
                        className="form-label fs-s fw-medium txt-color"
                      >
                        Name<span className="text-danger">*</span>
                      </label>
                      <input
                        disabled
                        type="text"
                        className="form-control fs-s bg-form txt-color"
                        placeholder="Name of the Student"


                        value={singleStudentData && singleStudentData[0].name}
                        style={{ cursor: "not-allowed" }}
                      />
                    </div>

                    <div className="mt-3">
                      <label
                        for="firstNameinput"
                        className="form-label fs-s fw-medium txt-color black_300"
                      >
                        Course<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control fs-s bg-form txt-color"
                        placeholder="Course Name"
                        value={singleStudentData && singleStudentData[0]?.courses}
                        disabled
                        style={{ cursor: "not-allowed" }}
                      />
                    </div>
                    <div className="mt-3">
                      <label
                        for="firstNameinput"
                        className="form-label fs-s fw-medium txt-color"
                      >
                        Admission Date<span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className="form-control fs-s bg-form txt-color date_input_color"
                        placeholder="paid amount"
                        value={singleStudentData && singleStudentData[0]?.admissiondate}
                        disabled
                        style={{ cursor: "not-allowed" }}
                      />
                    </div>


                    <div className="mt-3">
                      <label
                        for="firstNameinput"
                        className="form-label fs-s fw-medium txt-color"
                      >
                        Branch<span className="text-danger">*</span>
                      </label>
                      <input
                        type="name"
                        className="form-control fs-s bg-form txt-color"
                        placeholder="branch name"
                        value={singleStudentData && singleStudentData[0]?.branch}
                        disabled
                        style={{ cursor: "not-allowed" }}
                      />
                    </div>

                  </div>
                  <div className="col-lg-6">
                    <div className="">
                      <label
                        for="firstNameinput"
                        className="form-label fs-s fw-medium txt-color"
                      >
                        Total Amount<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control fs-s bg-form txt-color"
                        placeholder="Enter discount amount"
                        value={TotalAmount} disabled

                      />
                    </div>
                    <div className="mt-3">
                      <label
                        for="firstNameinput"
                        className="form-label fs-s fw-medium txt-color"
                      >
                        Paid Amount<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control fs-s bg-form txt-color"
                        placeholder="Enter discount amount"
                        value={paidamount} disabled

                      />
                    </div>
                    <div className="mt-3">
                      <label
                        for="firstNameinput"
                        className="form-label fs-s fw-medium txt-color"
                      >
                        Due Amount<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control fs-s bg-form txt-color"
                        placeholder="Enter discount amount"
                        value={dueamount} disabled

                      />
                    </div>

                    <div className="mt-3">
                      <label
                        for="firstNameinput"
                        className="form-label fs-s fw-medium txt-color"
                      >
                        Extra Discount
                      </label>
                      <input
                        type="number"
                        className="form-control fs-s bg-form txt-color"
                        placeholder="Enter discount amount"
                        onChange={(e) => setExtraDiscount(e.target.value)}
                        required
                        value={extraDiscount}
                      />
                    </div>
                    <div className=" mb-4 pb-3">
                      <div className="text-end mt-4">
                        <Button className="btn btn_primary"
                          onClick={handleApplyDiscount}
                        >
                          {<HiMiniPlus />} Add Discount
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* ADDING ADMISSION FEE */}

                  {
                    singleStudentData && singleStudentData[0] && !singleStudentData[0]?.initialpayment[0] && (

                      <div className="accordion" id="accordionExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="headingFive">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="true"
                              aria-controls="collapseTwo"
                            >
                              Admission Fee
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            className="accordion-collapse collapse show"
                            aria-labelledby="headingFive"
                            data-bs-parent="#accordionExample"
                          >
                            <div class="accordion-body">
                              <div className="table-responsive table-card table-scroll border-0">
                                <table className="table table-centered align-middle table-nowrap equal-cell-table">
                                  <thead>
                                    <tr className="">
                                      <th
                                        scope="col"
                                        className="fs-13 lh_xs fw-600 black_color "
                                      >
                                        Admission Fee
                                      </th>
                                      <th
                                        scope="col"
                                        className="fs-13 lh_xs black_color fw-600  "
                                      >
                                        Paid Date
                                      </th>
                                      <th
                                        scope="col"
                                        className="fs-13 lh_xs black_color fw-600  "
                                      >
                                        Mode of Payment
                                      </th>
                                      <th
                                        scope="col"
                                        className="fs-13 lh_xs black_color fw-600  "
                                      >
                                        Transition ID
                                      </th>
                                      <th
                                        scope="col"
                                        className="fs-13 lh_xs black_color fw-600 "
                                      ></th>
                                    </tr>
                                  </thead>
                                  <tbody className="">
                                    {/* 1st row */}
                                    <tr>
                                      <td className="fs-13 black_color fw-500 lh_xs bg_light ">
                                        {/* Admission Fee */}
                                        <input
                                          type="number"
                                          className="w-100 form-control fs-s bg-form txt-color"
                                          placeholder="Enter admission fee"
                                          required
                                          name="initialamount"
                                          value={admissionFee?.initialamount}
                                          onChange={handleInputChange}
                                        />
                                      </td>
                                      <td className="fs-13 black_color  lh_xs bg_light">
                                        {/* Paid Date */}
                                        <input
                                          type="date"
                                          className="w-100 form-control fs-s bg-form txt-color"
                                          placeholder="18-Mar-2024"
                                          required
                                          name="paiddate"
                                          value={admissionFee?.paiddate}
                                          onChange={handleInputChange}
                                        />
                                      </td>
                                      <td className="fs-13 black_color  lh_xs bg_light">
                                        {/* modeofpayment */}
                                        <select
                                          className="form-select form-select-lg mb-3 fs-13 mt-3"
                                          aria-label=".form-select-lg example"
                                          name="modeofpayment"
                                          value={admissionFee?.modeofpayment}
                                          onChange={handleInputChange}
                                          required

                                        >
                                          <option value="" disabled selected>
                                            {" "}
                                            Select the mode of payment{" "}
                                          </option>
                                          <option value="UPI">UPI</option>
                                          <option value="Cash">Cash</option>
                                          <option value="Bank Transfer">Bank Transfer</option>
                                          <option value="Cheque">Cheque</option>
                                        </select>
                                      </td>
                                      <td className="fs-13 black_color  lh_xs bg_light">
                                        {/* Transation ID */}
                                        <input
                                          type="number"
                                          className="w-100 form-control fs-s bg-form txt-color"
                                          placeholder="Enter Transation ID"
                                          required
                                          value={admissionFee?.transactionID}
                                          onChange={handleInputChange}
                                          name="transactionID"
                                        />
                                      </td>
                                      <td className="fs-13 black_color lh_xs bg_light flex-row d-flex mt-3">

                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <div className="col d-flex justify-content-end mt-3 mb-2">
                                  {/* submit the admission fee */}
                                  <Button className="btn btn_primary"
                                    onClick={handleAdmissionFee}
                                  >Update</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    )
                  }

                  {/* ADDING NO OF INSTALLMENTS */}
                  {
                    singleStudentData && singleStudentData[0] &&
                    singleStudentData[0].initialpayment[0] &&
                    singleStudentData[0].initialpayment[0].paymentdone === true &&
                    !singleStudentData[0].totalinstallments[0]

                    && (
                      <div className=" ">
                        <div className="card border mt-3">
                          <div className="flex-row d-flex justify-content-start my-2">
                            <div className="  ms-3">
                              <label
                                for="firstNameinput"
                                className="form-label fs-s fw-medium txt-color"
                              >
                                <h6> No Of Fee Installments :</h6>
                              </label>
                            </div>
                            <div className=" col-lg-6 col-md-6  ms-3">
                              <input
                                type="number"
                                className="form-control fs-s bg-form txt-color"
                                placeholder="Enter No.of Installments"

                                value={noOfinstallments}
                                onChange={(e) => setNoOfinstallments(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col d-flex justify-content-end mb-2 me-1">
                            <Button className="btn btn_primary"
                              onClick={handleNoOfInstallments}
                            >
                              Submit
                            </Button>

                          </div>
                        </div>
                      </div>
                    )
                  }


                </div>
              </div>
            </div>
          </div>

          {singleStudentData && singleStudentData[0] && (
            <div className="col-lg-5">
              <div className="card border-0">
                <div className="card-header">
                  <div className="d-flex justify-content-center mt-1">
                    <React.Fragment>
                      <ReactEcharts
                        style={{ width: "400px", height: "400px" }}
                        option={option}
                      />
                    </React.Fragment>
                  </div>
                </div>
              </div>
            </div>

          )}



          {/* installments */}

          {/* <div className="card-body">
            <div className="accordion" id="accordionExampleOne">

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTen"
                    aria-expanded="false"
                    aria-controls="collapseTen"
                  >
                    Installment 1
                  </button>
                </h2>
                <div
                  id="collapseTen"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExampleOne"
                >
                  <div className="accordion-body">
                    <form>
                      <div className="row">
                        <div className=" col-lg-3 col-md-6 col-sm-12 ">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Installment Date
                            </label>
                            <input
                              type="text"
                              className="form-control fs-s bg-form txt-color"
                              placeholder="Installment Date"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Installment Amount
                            </label>
                            <input
                              type="text"
                              className="form-control fs-s bg-form txt-color"
                              placeholder="Installment Amount"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Paid Date
                            </label>
                            <input
                              type="text"
                              className="form-control fs-s bg-form txt-color"
                              placeholder="Paid Date"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Paid Amount
                            </label>
                            <input
                              type="text"
                              className="form-control fs-s bg-form txt-color"
                              placeholder="Paid Amount"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Mode Of Payement
                            </label>
                            <select
                              className="form-select form-select-lg mb-3 fs-13"
                              aria-label=".form-select-lg example"
                            >
                              <option selected>select</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Transation ID
                            </label>
                            <input
                              type="text"
                              className="form-control fs-s bg-form txt-color"
                              placeholder="Transation ID"
                            />
                          </div>
                        </div>
                      </div>
                      <Button className="btn btn_primary">Update</Button>
                    </form>

                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Installment 2
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse p-3"
                  aria-labelledby="headingThree"
                  data-bs-parent="#headingThree"
                >
                  <div className="accordion-body">
                    <form>
                      <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Installment Date
                            </label>
                            <input
                              type="text"
                              className="form-control fs-s bg-form txt-color"
                              placeholder="Installment Date"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Installment Amount
                            </label>
                            <input
                              type="text"
                              className="form-control fs-s bg-form txt-color"
                              placeholder="Installment Amount"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Paid Date
                            </label>
                            <input
                              type="text"
                              className="form-control fs-s bg-form txt-color"
                              placeholder="Paid Date"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Paid Amount
                            </label>
                            <input
                              type="text"
                              className="form-control fs-s bg-form txt-color"
                              placeholder="Paid Amount"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Mode Of Payement
                            </label>
                            <select
                              className="form-select form-select-lg mb-3 fs-13"
                              aria-label=".form-select-lg example"
                            >
                              <option selected> select</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Transation ID
                            </label>
                            <input
                              type="text"
                              className="form-control fs-s bg-form txt-color"
                              placeholder="Transation ID"
                            />
                          </div>
                        </div>
                      </div>
                      <Button className="btn btn_primary">Update</Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          {/* installments  */}

          <div className="mb-3">
            <div className="accordion" id="accordionExampleOne">
              {/* 
              {
                singleStudentData && singleStudentData[0] && singleStudentData[0].dueamount > 0 && installments && installments.map((installment, index) => {

                  if (installment.paymentdone === true) {
                    return null; // Do not render anything
                  }

                  const collapseId = `collapse_${index}`; // Unique ID for collapse element
                  const headingId = `heading_${index}`; // Unique ID for accordion header */}
              {
                singleStudentData && singleStudentData[0] && singleStudentData[0].dueamount > 0 &&
                Array.isArray(installments) &&
                installments.map((installment, index) => {

                  if (installment.paymentdone === true) {
                    return null;
                  }

                  const collapseId = `collapse_${index}`; // Unique ID for collapse element
                  const headingId = `heading_${index}`;

                  return (
                    <div className="accordion-item mt-2">
                      <h2 className="accordion-header" id={headingId}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#${collapseId}`}
                          aria-expanded="false"
                          aria-controls="collapseTen"
                        >
                          Installment{"  "} {installment.installmentNumber}
                          {installment.subInstallmentNumber != 0 && (
                            <>{" - "} {installment.subInstallmentNumber}</>
                          )}
                        </button>
                      </h2>
                      <div
                        id={collapseId}
                        className="accordion-collapse collapse"
                        aria-labelledby={headingId}
                        data-bs-parent="#accordionExampleOne"
                      >
                        <div className="accordion-body">
                          <form>
                            <div className="row">
                              <div className=" col-lg-3 col-md-6 col-sm-12 ">
                                <div className="mb-3">
                                  <label
                                    for="firstNameinput"
                                    className="form-label fs-s fw-medium txt-color"
                                  >
                                    Installment Date
                                  </label>
                                  <input
                                    disabled={singleStudentData && singleStudentData[0] && singleStudentData[0].installments && singleStudentData[0].installments[index] && singleStudentData[0].installments[index].duedate}

                                    style={{
                                      cursor:
                                        singleStudentData && singleStudentData[0] && singleStudentData[0].installments && singleStudentData[0].installments[index] && singleStudentData[0].installments[index].duedate
                                          ? "not-allowed"
                                          : "auto",
                                    }}

                                    type="date"
                                    className="form-control fs-s bg-form txt-color"
                                    placeholder="Installment Date"

                                    name="Installment Date"
                                    onChange={(e) =>
                                      handleInstallmentUpdate(
                                        index,
                                        "duedate",
                                        e.target.value
                                      )
                                    }
                                    value={installment.duedate}
                                    min={getCurrentDate()}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="mb-3">
                                  <label
                                    for="firstNameinput"
                                    className="form-label fs-s fw-medium txt-color"
                                  >
                                    Installment Amount
                                  </label>
                                  <input
                                    disabled={singleStudentData &&
                                      singleStudentData[0] && singleStudentData[0]?.installments && singleStudentData[0].installments[index] && singleStudentData[0].installments[index].dueamount}

                                    style={{
                                      cursor:
                                        singleStudentData && singleStudentData[0] && singleStudentData[0].installments && singleStudentData[0].installments[index] && singleStudentData[0].installments[index].duedate
                                          ? "not-allowed"
                                          : "auto",
                                    }}


                                    type="number"
                                    className="form-control fs-s bg-form txt-color"
                                    placeholder="Installment Amount"

                                    name="Installment Amount"
                                    onChange={(e) =>
                                      handleInstallmentUpdate(
                                        index,
                                        "dueamount",
                                        parseFloat(e.target.value)
                                      )
                                    }
                                    value={installment.dueamount}
                                    required


                                  />
                                </div>
                              </div>
                              {/* PAID DATE */}
                              {
                                singleStudentData && singleStudentData[0] &&
                                singleStudentData[0].installments[index] &&
                                singleStudentData[0].installments[index].duedate &&
                                singleStudentData[0].installments[index].dueamount && (
                                  <div className="col-lg-3 col-md-6 col-sm-12">
                                    <div className="mb-3">
                                      <label
                                        for="firstNameinput"
                                        className="form-label fs-s fw-medium txt-color"
                                      >
                                        Paid Date
                                      </label>
                                      <input
                                        type="date"
                                        className="form-control fs-s bg-form txt-color"
                                        placeholder="Paid Date"

                                        name="paiddate"
                                        onChange={(e) =>
                                          handleInstallmentUpdate(
                                            index,
                                            "paiddate",
                                            e.target.value
                                          )
                                        }
                                        value={installment.paiddate || getCurrentDate()}
                                        max={getCurrentDate()}
                                        required
                                      />
                                    </div>
                                  </div>
                                )
                              }

                              {/* <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="mb-3">
                                  <label
                                    for="firstNameinput"
                                    className="form-label fs-s fw-medium txt-color"
                                  >
                                    Paid Date
                                  </label>
                                  <input
                                    type="date"
                                    className="form-control fs-s bg-form txt-color"
                                    placeholder="Paid Date"

                                    name="paiddate"
                                    onChange={(e) =>
                                      handleInstallmentUpdate(
                                        index,
                                        "paiddate",
                                        e.target.value
                                      )
                                    }
                                    value={installment.paiddate || getCurrentDate()}
                                    required
                                  />
                                </div>
                              </div> */}

                              {/* PAID AMOUNT */}
                              {
                                singleStudentData && singleStudentData[0] &&
                                singleStudentData[0].installments[index] &&
                                singleStudentData[0].installments[index].duedate &&
                                singleStudentData[0].installments[index].dueamount && (
                                  <div className="col-lg-3 col-md-6 col-sm-12">
                                    <div className="mb-3">
                                      <label
                                        for="firstNameinput"
                                        className="form-label fs-s fw-medium txt-color"
                                      >
                                        Paid Amount
                                      </label>
                                      <input
                                        type="number"
                                        className="form-control fs-s bg-form txt-color"
                                        placeholder="Paid Amount"

                                        name="paidamount"
                                        onChange={(e) =>
                                          handleInstallmentUpdate(
                                            index,
                                            "paidamount",
                                            parseFloat(e.target.value)
                                          )
                                        }
                                        value={installment.paidamount}
                                        required

                                      />
                                    </div>
                                  </div>
                                )
                              }

                              {/* <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="mb-3">
                                  <label
                                    for="firstNameinput"
                                    className="form-label fs-s fw-medium txt-color"
                                  >
                                    Paid Amount
                                  </label>
                                  <input
                                    type="number"
                                    className="form-control fs-s bg-form txt-color"
                                    placeholder="Paid Amount"

                                    name="paidamount"
                                    onChange={(e) =>
                                      handleInstallmentUpdate(
                                        index,
                                        "paidamount",
                                        parseFloat(e.target.value)
                                      )
                                    }
                                    value={installment.paidamount}
                                    required

                                  />
                                </div>
                              </div> */}

                              {/* MODE OF PAYMENT */}

                              {singleStudentData && singleStudentData[0] &&
                                singleStudentData[0].installments[index] &&
                                singleStudentData[0].installments[index].duedate &&
                                singleStudentData[0].installments[index].dueamount && (
                                  <div className="col-lg-3 col-md-6 col-sm-12">
                                    <div className="mb-3">
                                      <label
                                        for="firstNameinput"
                                        className="form-label fs-s fw-medium txt-color"
                                      >
                                        Mode Of Payement
                                      </label>
                                      <select
                                        className="form-select form-select-lg mb-3 fs-13"
                                        aria-label=".form-select-lg example"

                                        name="modeofpayment"
                                        onChange={(e) =>
                                          handleInstallmentUpdate(
                                            index,
                                            "modeofpayment",
                                            e.target.value
                                          )
                                        }
                                        value={installment.modeofpayment}
                                        required
                                      >
                                        <option value="" disabled selected>
                                          {" "}
                                          Select the modeofpayment{" "}
                                        </option>
                                        <option value="UPI">UPI</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="Cheque">Cheque</option>
                                      </select>
                                    </div>
                                  </div>
                                )}

                              {/* <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="mb-3">
                                  <label
                                    for="firstNameinput"
                                    className="form-label fs-s fw-medium txt-color"
                                  >
                                    Mode Of Payement
                                  </label>
                                  <select
                                    className="form-select form-select-lg mb-3 fs-13"
                                    aria-label=".form-select-lg example"

                                    name="modeofpayment"
                                    onChange={(e) =>
                                      handleInstallmentUpdate(
                                        index,
                                        "modeofpayment",
                                        e.target.value
                                      )
                                    }
                                    value={installment.modeofpayment}
                                    required
                                  >
                                    <option value="" disabled selected>
                                      {" "}
                                      Select the modeofpayment{" "}
                                    </option>
                                    <option value="UPI">UPI</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                    <option value="Cheque">Cheque</option>
                                  </select>
                                </div>
                              </div> */}

                              {/* TRANSATION ID */}
                              {
                                singleStudentData && singleStudentData[0] &&
                                singleStudentData[0].installments[index] &&
                                singleStudentData[0].installments[index].duedate &&
                                singleStudentData[0].installments[index].dueamount && (
                                  <div className="col-lg-3 col-md-6 col-sm-12">
                                    <div className="mb-3">
                                      <label
                                        for="firstNameinput"
                                        className="form-label fs-s fw-medium txt-color"
                                      >
                                        Transation ID
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control fs-s bg-form txt-color"
                                        placeholder="Transation ID"
                                        name="transactionid"
                                        onChange={(e) =>
                                          handleInstallmentUpdate(
                                            index,
                                            "transactionid",
                                            e.target.value
                                          )
                                        }
                                        value={installment.transactionid}
                                        required
                                      />
                                    </div>
                                  </div>

                                )
                              }

                              {/* <div className="col-lg-3 col-md-6 col-sm-12">
                                <div className="mb-3">
                                  <label
                                    for="firstNameinput"
                                    className="form-label fs-s fw-medium txt-color"
                                  >
                                    Transation ID
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control fs-s bg-form txt-color"
                                    placeholder="Transation ID"
                                    name="transactionid"
                                    onChange={(e) =>
                                      handleInstallmentUpdate(
                                        index,
                                        "transactionid",
                                        e.target.value
                                      )
                                    }
                                    value={installment.transactionid}
                                    required
                                  />
                                </div>
                              </div> */}
                            </div>

                            {/* HANDLE INSTALLMENT UPDATE CLICK */}

                            {
                              singleStudentData && singleStudentData[0] &&
                              singleStudentData[0].installments[index] &&
                              singleStudentData[0].installments[index].duedate &&
                              singleStudentData[0].installments[index].dueamount && (
                                <Button className="btn btn_primary"
                                  onClick={() => handleUpdateClick(index)}
                                >
                                  Update
                                </Button>

                              )

                            }
                            {/* <Button className="btn btn_primary"
                              onClick={() => handleUpdateClick(index)}
                            >
                              Update
                            </Button> */}

                          </form>



                        </div>
                      </div>

                    </div>
                  )
                })
              }
              {
                DisplayUpdateDueamountAndInstallmentButton && (
                  <div className="d-flex justify-content-end mt-3 mb-3 ">
                    <Button className="btn btn_primary p-2"
                      onClick={UpdateDueDateAndDueAmount}
                    >
                      Update
                    </Button>
                  </div>
                )
              }
              {/* <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Installment 2
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse p-3"
                  aria-labelledby="headingThree"
                  data-bs-parent="#headingThree"
                >
                  <div className="accordion-body">
                    <form>
                      <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Installment Date
                            </label>
                            <input
                              type="text"
                              className="form-control fs-s bg-form txt-color"
                              placeholder="Installment Date"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Installment Amount
                            </label>
                            <input
                              type="text"
                              className="form-control fs-s bg-form txt-color"
                              placeholder="Installment Amount"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Paid Date
                            </label>
                            <input
                              type="text"
                              className="form-control fs-s bg-form txt-color"
                              placeholder="Paid Date"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Paid Amount
                            </label>
                            <input
                              type="text"
                              className="form-control fs-s bg-form txt-color"
                              placeholder="Paid Amount"
                            />
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Mode Of Payement
                            </label>
                            <select
                              className="form-select form-select-lg mb-3 fs-13"
                              aria-label=".form-select-lg example"
                            >
                              <option selected> select</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <div className="mb-3">
                            <label
                              for="firstNameinput"
                              className="form-label fs-s fw-medium txt-color"
                            >
                              Transation ID
                            </label>
                            <input
                              type="text"
                              className="form-control fs-s bg-form txt-color"
                              placeholder="Transation ID"
                            />
                          </div>
                        </div>
                      </div>
                      <Button className="btn btn_primary">Update</Button>
                    </form>
                  </div>
                </div>
              </div> */}
            </div>



            {/* DISPLAY PAID FEE */}

            {
              singleStudentData && singleStudentData[0] &&
              singleStudentData[0].initialpayment[0] &&
              singleStudentData[0].initialpayment[0].paymentdone === true && (

                <div className="accordion" id="accordionExam">
                  <div className="accordion-item mt-2">
                    <h2 className="accordion-header" id="headingFour">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwenty"
                        aria-expanded="false"
                        aria-controls="collapseTwenty"
                      >
                        Paid Fee
                      </button>
                    </h2>
                    <div
                      id="collapseTwenty"
                      className="accordion-collapse collapse p-3"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExam"
                    >
                      <div className="accordion-body">
                        <div className="table-responsive table-card table-scroll border-0">
                          <table className="table table-centered align-middle table-nowrap equal-cell-table">
                            <thead>
                              <tr className="">
                                <th
                                  scope="col"
                                  className="fs-13 lh_xs fw-600 black_color "
                                >
                                  S.No
                                </th>
                                <th
                                  scope="col"
                                  className="fs-13 lh_xs black_color fw-600  "
                                >
                                  Fee Type
                                </th>
                                <th
                                  scope="col"
                                  className="fs-13 lh_xs black_color fw-600  "
                                >
                                  Due Date
                                </th>
                                <th
                                  scope="col"
                                  className="fs-13 lh_xs black_color fw-600  "
                                >
                                  Due Amount
                                </th>
                                <th
                                  scope="col"
                                  className="fs-13 lh_xs black_color fw-600  "
                                >
                                  Paid Amount
                                </th>
                                <th
                                  scope="col"
                                  className="fs-13 lh_xs black_color fw-600 "
                                >
                                  Paid Date
                                </th>
                                <th
                                  scope="col"
                                  className="fs-13 lh_xs black_color fw-600 "
                                >
                                  Mode of Payment
                                </th>
                                <th
                                  scope="col"
                                  className="fs-13 lh_xs black_color fw-600 "
                                >
                                  Transition ID
                                </th>
                                <th
                                  scope="col"
                                  className="fs-13 lh_xs black_color fw-600 "
                                >
                                  Invoice
                                </th>
                              </tr>
                            </thead>
                            <tbody className="">

                              {/* Display the Admission fee */}
                              {/* 1st row */}
                              {
                                studentData && studentData[0] && studentData[0].initialpayment ? studentData[0].initialpayment.map((item, index) => {

                                  let paidDate = new Date(item.paiddate);
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
                                    <tr>
                                      <td className="fs-13 black_color fw-500 lh_xs bg_light ">
                                        {index + 1}
                                      </td>
                                      <td className="fs-13 black_color  lh_xs bg_light">
                                        Admission Fee

                                      </td>
                                      <td className="fs-13 black_color  lh_xs bg_light">
                                        -
                                      </td>
                                      <td className="fs-13 black_color  lh_xs bg_light">
                                        -
                                      </td>
                                      <td className="fs-13 black_color  lh_xs bg_light">
                                        {item.initialamount}
                                      </td>
                                      <td className="fs-13 black_color  lh_xs bg_light">
                                        {paidDate}
                                      </td>
                                      <td className="fs-13 black_color  lh_xs bg_light">
                                        {item.modeofpayment}
                                      </td>
                                      <td className="fs-13 black_color  lh_xs bg_light">
                                        {item.transactionID}
                                      </td>
                                      <td className="fs-13 black_color  lh_xs bg_light flex-row d-flex">

                                        <Link to={`/student/invoice/${id}/${index}/Admission Fee/admininvoice`} className="hover-container">
                                          <MdCreditScore className="eye_icon" title="admin" />

                                        </Link>

                                        <Link
                                          to={`/student/invoice/${id}/${index}/Admission Fee/studentinvoice`}
                                        >
                                          <MdCreditScore className="eye_icon ms-3" title="student" />
                                        </Link>
                                      </td>
                                    </tr>
                                  )
                                }) : null
                              }


                              {/* <tr>
                              <td className="fs-13 black_color fw-500 lh_xs bg_light ">
                                1
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light">
                                ADmission Fee
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light">
                                12-2-2024
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light">
                                15000
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light">
                                499
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light">
                                1-2-2024
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light">
                                Cash
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light">
                                202403181523310045
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light flex-row d-flex">
                                <div
                                  className="me-2"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Admin"
                                >
                                  <FaFileInvoice />
                                </div>
                                <div
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Student"
                                >
                                  <FaFileInvoice />
                                </div>
                              </td>
                            </tr> */}
                            </tbody>

                            {/* INSTALLEMENT FEE BINDING && Display the installemts*/}
                            {/* 2nd row */}

                            <tbody className="">
                              {singleStudentData && singleStudentData[0] && singleStudentData[0].installments ? singleStudentData[0].installments.map((item, index) => {

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
                                  <tr>
                                    <td className="fs-13 black_color fw-500 lh_xs bg_light ">
                                      {index + 2}
                                    </td>
                                    <td className="fs-13 black_color  lh_xs bg_light">
                                      Installment {item.installmentNumber}{" "}
                                      {item.subInstallmentNumber != 0 && (
                                        <>/ {item.subInstallmentNumber}</>
                                      )}
                                    </td>
                                    <td className="fs-13 black_color  lh_xs bg_light">
                                      {dueDate}
                                    </td>
                                    <td className="fs-13 black_color  lh_xs bg_light">
                                      {Number(
                                        parseFloat(item.dueamount).toFixed(2)
                                      ).toLocaleString("en-IN")}
                                    </td>
                                    <td className="fs-13 black_color  lh_xs bg_light">
                                      {Number(item.paidamount).toLocaleString("en-IN")}
                                    </td>
                                    <td className="fs-13 black_color  lh_xs bg_light">
                                      {paidDate}
                                    </td>
                                    <td className="fs-13 black_color  lh_xs bg_light">
                                      {item.modeofpayment}
                                    </td>
                                    <td className="fs-13 black_color  lh_xs bg_light">
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

                                )
                              }) : null
                              }

                              {/* <tr>
                              <td className="fs-13 black_color fw-500 lh_xs bg_light ">
                                2
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light">
                                Installment
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light">
                                12-2-2024
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light">
                                10000
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light">
                                10000
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light">
                                1-2-2024
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light">
                                Cash
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light">
                                202403181523310045
                              </td>
                              <td className="fs-13 black_color  lh_xs bg_light flex-row d-flex">
                                <div
                                  className="me-2"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Admin"
                                >
                                  <FaFileInvoice />
                                </div>
                                <div
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Student"
                                >
                                  <FaFileInvoice />
                                </div>
                              </td>
                            </tr> */}

                            </tbody>


                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


              )
            }
          </div>
        </div>
      </div>
    </div >
  );
};

export default FeeView;



















// import React, { useEffect, useState } from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { FaFileInvoice } from "react-icons/fa";
// import { HiMiniPlus } from "react-icons/hi2";
// import GaugeChart from "./GaugeChart";
// import Button from "../../../components/button/Button";
// import { useNavigate, useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import "../../../../assets/css/Table.css"
// import { useStudentsContext } from "../../../../dataLayer/hooks/useStudentsContext";
// import { MdCreditScore } from "react-icons/md";
// import { toast } from "react-toastify";
// import BackButton from "../../../components/backbutton/BackButton";
// import ReactEcharts from "echarts-for-react";
// const FeeView = () => {


//   const [noOfinstallments, setNoOfinstallments] = useState();
//   const [installments, setInstallments] = useState();
//   const [totalinstallments, settotalinstallments] = useState();
//   const [extraDiscount, setExtraDiscount] = useState();
//   const [studentInvoiceID, setStudentInvoiceID] = useState();
//   const [adminInvoiceId, setAdminInvoiceId] = useState();

//   console.log(studentInvoiceID, adminInvoiceId, "dgfhdf")

//   const getCurrentDate = () => {
//     const today = new Date();
//     const year = today.getFullYear();
//     let month = today.getMonth() + 1;
//     let day = today.getDate();

//     month = month < 10 ? `0${month}` : month;
//     day = day < 10 ? `0${day}` : day;

//     return `${year}-${month}-${day}`;
//   };

//   console.log(installments, "dfjgjgdf")

//   console.log(extraDiscount, "lasfhdsgfgd")

//   const navigate = useNavigate();
//   const { id } = useParams()
//   console.log("iddff", id)

//   const { getStudent, studentState, studentState: { singleStudentData }, Dispatchstudents } = useStudentsContext();
//   console.log(studentState, "sfjdfagafg")
//   console.log(singleStudentData, "SingleStudentsdfff")
//   useEffect(() => {
//     if (id) {
//       getStudent(id)
//     }
//   }, [id])

//   console.log(singleStudentData && singleStudentData[0], "dfkkdjh")

//   // invoice id genration

//   let branchName = singleStudentData && singleStudentData[0]?.branch;
//   let studentRegnumber = singleStudentData && singleStudentData[0]?.registrationnumber;
//   let currentdate = getCurrentDate();
//   console.log(branchName, studentRegnumber, currentdate, "jgsdhfdh")
//   useEffect(() => {
//     if (branchName && studentRegnumber && currentdate) {
//       let studentInvoiceid = "R-TA" + branchName[0] + "-" + currentdate[8] + currentdate[9] + "-" + currentdate[2] + currentdate[3] + "/" + studentRegnumber[9] + studentRegnumber[10] + studentRegnumber[11] + studentRegnumber[12] + "/"
//       setStudentInvoiceID(studentInvoiceid)
//       let AdminInvoiceID = "IN-TA" + branchName[0] + "-" + currentdate[8] + currentdate[9] + "-" + currentdate[2] + currentdate[3] + "/" + studentRegnumber[9] + studentRegnumber[10] + studentRegnumber[11] + studentRegnumber[12] + "/"
//       setAdminInvoiceId(AdminInvoiceID)
//     }
//   }, [branchName, studentRegnumber, currentdate,])







//   const TotalAmount = singleStudentData && singleStudentData[0]?.finaltotal;
//   const paidamount = singleStudentData && singleStudentData[0]?.totalpaidamount;
//   const dueamount = singleStudentData && singleStudentData[0]?.dueamount;
//   const percentage = (paidamount / TotalAmount) * 100
//   console.log(percentage, "sfvjdf")

//   console.log(TotalAmount, paidamount, dueamount, percentage, "dkfjdfgdjgf")

//   const staticValue = percentage?.toFixed(0); // Static value for the needle indicator


//   let color;
//   if (percentage <= 30) {
//     color = "#405189"; // blue color
//   } else {
//     color = "#e6ebf8"; // gray color
//   }


//   var option = {
//     // tooltip: {
//     //   formatter: "{a} <br/>{b} : {c}%",
//     // },

//     color: ["#405189"], //blue color
//     textStyle: {
//       fontFamily: "Poppins, sans-serif",
//     },
//     series: [
//       {
//         name: "Pressure",
//         type: "gauge",
//         progress: {
//           show: true,
//         },
//         detail: {
//           valueAnimation: true,
//           formatter: "{value}",
//           color: "#858d98",
//         },
//         axisLabel: {
//           color: "#858d98",
//         },
//         data: [
//           {
//             title: {
//               color: "#858d98", //score
//             },
//             // value: value, // Use the dynamic value here
//             value: staticValue, // Use the static value here
//             name: "Percentage",
//           },
//         ],
//         axisLine: {
//           lineStyle: {
//             // color: [
//             //   [0.5, "#405189"], // blue Color at 30%
//             //   [1, "#e74c3c"], // red Color at 70%
//             // ],
//             width: 10,
//             shadowColor: "#fff", // Default is #000
//             shadowBlur: 10,
//             shadowOffsetX: 2,
//             shadowOffsetY: 2,
//           },
//         },
//         splitLine: {
//           length: 10,
//           lineStyle: {
//             color: "auto",
//           },
//         },
//         pointer: {
//           itemStyle: {
//             color: '#e96228' // Orange color for the needle
//           }
//         }
//       },
//     ],

//   };





//   const [studentData, setStudentData] = useState()
//   console.log(studentData, "sfhjfgjg")


//   // Single Student Admission Details Binding
//   let getAdmissionFee
//   useEffect(() => {
//     if (singleStudentData) {
//       setStudentData(singleStudentData)
//       let feedetails = singleStudentData[0].feedetails
//       let admissiondetails = feedetails.filter((item) => item?.feetype === "Admission Fee")
//       console.log("admissionFee", admissiondetails[0]?.amount)


//       getAdmissionFee = admissiondetails[0]?.amount
//       setAdmissionFee({
//         ...admissionFee,
//         initialamount: getAdmissionFee,
//         // You can update other properties as needed
//       });
//     }
//   }, [singleStudentData, Dispatchstudents])

//   useEffect(() => {
//     settotalinstallments(singleStudentData && singleStudentData[0]?.totalinstallments);
//     setInstallments(singleStudentData && singleStudentData[0]?.installments);
//   }, [singleStudentData, Dispatchstudents]);




//   // Admission fee Details

//   const [admissionFee, setAdmissionFee] = useState({
//     initialamount: 0,
//     paiddate: new Date().toISOString().substr(0, 10),
//     modeofpayment: "",
//     transactionID: "",
//     paymentdone: false,
//     adminInvoiceId: null,
//     studentInvoiveId: null,
//   });

//   console.log(admissionFee, "hsgajghf")

//   useEffect(()=>{
//     if(adminInvoiceId && studentInvoiceID){
//       setAdmissionFee({
//        ...admissionFee,
//        adminInvoiceId: adminInvoiceId,
//        studentInvoiveId: studentInvoiceID,
//       })
//     }
//   },[adminInvoiceId,studentInvoiceID])


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAdmissionFee((prevPayment) => ({
//       ...prevPayment,
//       [name]: value,
//     }));
//   };

//   const handleAdmissionFee = async () => {

//     if (!admissionFee.initialamount) {
//       return toast.error("Please Enter Admission fee ")
//     }
//     else if (!admissionFee.modeofpayment) {
//       return toast.error("Please Select the Mode of Payment")
//     }

//     console.log(admissionFee, "admissionFeeee")
//     let initialpayment = [];
//     initialpayment.push(admissionFee);
//     initialpayment[0].initialamount = parseInt(initialpayment[0]?.initialamount);
//     initialpayment[0].paymentdone = true;
//     console.log(initialpayment, "initialpayment")

//     let totalpaidamount = parseInt(studentData[0].totalpaidamount) + parseInt(admissionFee.initialamount);
//     let dueamount = parseInt(studentData[0].dueamount) - parseInt(admissionFee?.initialamount);

//     const updatedData = {
//       dueamount,
//       initialpayment,
//       totalpaidamount,
//     };

//     const updateContext = {
//       dueamount,
//       initialpayment,
//       totalpaidamount,
//       id: studentData[0].id,
//     };


//     console.log("updatedData", updateContext)
//     //
//     ///fee/admissionfee/
//     try {
//       const { data, status } = await toast.promise(
//         axios.put(`${process.env.REACT_APP_API_URL}/fee/admissionfee/${id}`, updatedData),
//         {
//           loading: "Loading...",
//           success: " Admission fee Updated Successfully",
//           error: "Something went wrong Please try again",
//         }
//       );



//       if (status === 200) {
//         Dispatchstudents({
//           type: "UPDATE_ADMISSIONFEE",
//           payload: {
//             context: "ADMISSION_FEE_UPDATED_STUDENTS",
//             data: updateContext,
//           },
//         });
//         navigate(`/student/feeview/${id}`)

//       }
//     }
//     catch (error) {
//       console.log(error)
//     }
//     setAdmissionFee({
//       initialamount: 0,
//       paiddate: "",
//       modeofpayment: "",
//       transactionID: "",
//       paymentdone: false,
//     });
//   }


//   // submit no of installments----------------------------------------------------------

//   const handleNoOfInstallments = async (e) => {

//     if (!noOfinstallments || noOfinstallments.length <= 0) {
//       return toast.error("Please enter No-of Installments")
//     }


//     console.log(noOfinstallments, "shagfsjfdg")
//     e.preventDefault();
//     const addfee = true;
//     let installments = Array(parseInt(noOfinstallments))
//       .fill()
//       .map((_, index) => ({
//         id: Date.now(),
//         installmentNumber: index + 1,
//         duedate: "",
//         // dueamount: parseInt(dueamount) / parseInt(noOfinstallments),
//         dueamount: 0,
//         paidamount: 0,
//         paiddate: "",
//         modeofpayment: "",
//         transactionid: "",
//         paymentdone: false,
//         subInstallmentNumber: 0,
//       }));
//     let totalinstallments = [
//       {
//         totalinstallments: parseInt(noOfinstallments),
//         totalinstallmentspaid: 0,
//         totalinstallmentsleft: parseInt(noOfinstallments),
//       },
//     ];

//     console.log(totalinstallments, installments, "dfjdfjdfjdfjgf")
//     const updatedData = {
//       totalinstallments,
//       addfee,
//       installments,
//     };
//     const updateContext = {
//       totalinstallments,
//       installments,
//       addfee,
//       id: studentData[0].id,
//     };
//     try {

//       const { data, status } = await toast.promise(
//         axios.put(`${process.env.REACT_APP_API_URL}/fee/noofinstallments/${id}`, updatedData),
//         {
//           loading: "Loading...",
//           success: "Installment updated Successfully",
//           error: "Something went wrong Please try again",
//         }
//       );

//       if (status === 200) {
//         // dispatch({
//         //   type: "UPDATE_NO_OF_INSTALLMENTS",
//         //   payload: updateContext,
//         // });
//         // navigator(`/feeview/${id}`);
//         Dispatchstudents({
//           type: "UPDATE_NO_OF_INSTALLMENTS",
//           payload: {
//             context: "NO_OF_INSTALLMENST_UPDATED_STUDENTS",
//             data: updateContext,
//           },
//         });
//         navigate(`/student/feeview/${id}`)

//       }

//     }
//     catch (error) {
//       console.log(error)
//     }

//   }

//   const [selectedDate, setSelectedDate] = useState(new Date());
//   console.log(selectedDate, "gfhdsgfhdfg")

//   // handle installment Upadates---------------------------------------------------------------------

//   const handleInstallmentUpdate = (index, name, value) => {

//     setSelectedDate(value);
//     setInstallments((prevInstallments) => {
//       const updatedInstallments = [...prevInstallments];
//       updatedInstallments[index] = {
//         ...updatedInstallments[index],
//         [name]: value,
//       };
//       if (
//         updatedInstallments[index].paiddate == "" &&
//         updatedInstallments[index].paidamount > 0
//       ) {
//         updatedInstallments[index].paiddate = getCurrentDate();
//       }
//       return updatedInstallments;
//     });
//   };





//   let DisplayUpdateDueamountAndInstallmentButton = false;

//   if (singleStudentData && singleStudentData[0].installments && singleStudentData[0].installments.length > 0) {
//     for (let i = 0; i < singleStudentData[0].installments.length; i++) {
//       if (!singleStudentData[0].installments[i].duedate && !singleStudentData[0].installments[i].dueamount) {
//         DisplayUpdateDueamountAndInstallmentButton = true
//       }
//     }
//   }

//   // UPDATE DUE_DATE AND UPDATE DUE AMOUNT --------------------------------------------------------------------------------

//   const UpdateDueDateAndDueAmount = async (e) => {

//     if (installments.length > 0) {
//       for (let i = 0; i < installments.length; i++) {
//         if (!installments[i].duedate) {
//           return toast.error("Please Select Installment Date")
//         }
//         if (!installments[i].dueamount) {
//           return toast.error("Please Enter Installment Amount")
//         }
//       }
//     }


//     console.log(installments, "dhgufgdjf")
//     e.preventDefault();
//     console.log("installments", installments)
//     // let nextduedate = [];
//     let nextduedate;
//     for (let i = 0; i < installments.length; i++) {
//       if (installments[i].paidamount < 1) {
//         nextduedate = installments[i].duedate;
//         break;
//       }
//       // nextduedate.push(installments[i].duedate);
//     }
//     let totalInstallmentAmountUpdated = 0
//     let validateUpdatedDueDateAndDueAmount = true
//     // validations for due date and due amount
//     for (let i = 0; i < installments.length; i++) {
//       if (!installments[i].duedate || !installments[i].dueamount) {
//         validateUpdatedDueDateAndDueAmount = false
//       }
//       totalInstallmentAmountUpdated = totalInstallmentAmountUpdated + parseFloat(installments[i].dueamount)

//     }
//     if (validateUpdatedDueDateAndDueAmount && studentData[0].dueamount === totalInstallmentAmountUpdated) {
//       const updatedData = {
//         installments,
//         // totalinstallments,
//         // dueamount,
//         // totalpaidamount,
//         nextduedate,
//       };

//       const updateContext = {
//         installments,
//         // totalinstallments,
//         // dueamount,
//         // totalpaidamount,
//         nextduedate,
//         id: studentData[0].id,
//       };
//       console.log("updatedData", updatedData, updateContext);

//       try {
//         const { data, status } = await toast.promise(
//           axios.put(`${process.env.REACT_APP_API_URL}/fee/updateduedateanddueamount/${id}`, updatedData),
//           {
//             loading: "Loading...",
//             success: "UpDated DueDate & DueAmout Successfully",
//             error: "Something went wrong Please try again",
//           }
//         );

//         if (status === 200) {

//           // dispatch({
//           //   type: "UPDATE_DUE_DATE_DUE_AMOUNT",
//           //   payload: updateContext,
//           // });
//           Dispatchstudents({
//             type: "UPDATE_DUE_DATE_DUE_AMOUNT",
//             payload: {
//               context: "UPDATE_DUE_DATE_DUE_AMOUNT_STUDENT",
//               data: updateContext,
//             },
//           });
//           navigate(`/student/feeview/${id}`)
//         }
//       }
//       catch (error) {
//         console.log(error);
//       }

//     } else if (studentData[0].dueamount != totalInstallmentAmountUpdated) {
//       toast.error("Sum of all installment amount Should be equal to due amount")
//     } else if (!validateUpdatedDueDateAndDueAmount) {
//       toast.error("Add Due Date and Due Amount")
//     }
//   };


//   // update the Installement payment

//   const handleUpdateClick = async (index) => {
//     if (installments[index].paidamount > 0 && installments[index].paiddate && installments[index].modeofpayment) {
//       if (
//         installments[index].paidamount > 0 &&
//         installments[index].paidamount <= parseInt(studentData[0].dueamount)
//       ) {
//         // Update state
//         const updatedInstallments = await updateInstallments(index);
//         // Now that state is updated, proceed with other actions
//         let nextduedate;
//         let totalinstallmentspaid = 0
//         for (let i = 0; i < updatedInstallments.length; i++) {
//           if (updatedInstallments[i + 1]) {
//             if (updatedInstallments[i].installmentNumber != updatedInstallments[i + 1].installmentNumber && updatedInstallments[i].paymentdone === true) {
//               totalinstallmentspaid += 1
//             }
//           } else {
//             if (updatedInstallments[i].paymentdone) {
//               totalinstallmentspaid += 1
//             }
//           }

//           if (updatedInstallments[i].paidamount < 1) {
//             nextduedate = updatedInstallments[i].duedate;
//             break;
//           }
//         }

//         let updatedtotalinstallments = [
//           {
//             totalinstallments: parseInt(totalinstallments[0].totalinstallments),
//             totalinstallmentspaid: parseInt(totalinstallmentspaid),
//             totalinstallmentsleft: parseInt(totalinstallments[0].totalinstallments) - parseInt(totalinstallmentspaid),
//           },
//         ];
//         // let totalpaidamount = 0;
//         // totalpaidamount = totalpaidamount + parseInt(admissionFee.admissionfee);
//         // for (let i = 0; i < updatedInstallments.length; i++) {
//         //   if (updateInstallments[i].paidamount) {
//         //     totalpaidamount =
//         //       totalpaidamount + parseInt(updateInstallments[i].paidamount);
//         //   }
//         // }

//         let totalpaidamount = 0;
//         totalpaidamount =
//           totalpaidamount + studentData[0].initialpayment[0].initialamount;
//         for (let i = 0; i < updatedInstallments.length; i++) {
//           totalpaidamount = totalpaidamount + updatedInstallments[i].paidamount;
//           // console.log("updatedInstallments", updatedInstallments[i].paidamount);
//         }
//         //start
//         let dueamount = parseInt(studentData[0].finaltotal);
//         dueamount = dueamount - studentData[0].initialpayment[0].initialamount;
//         for (let i = 0; i < updatedInstallments.length; i++) {
//           dueamount = dueamount - updatedInstallments[i].paidamount;
//         }
//         let totalExtraDiscount = 0
//         if (studentData[0].extra_discount) {
//           for (let i = 0; i < studentData[0].extra_discount.length; i++) {
//             totalExtraDiscount = totalExtraDiscount + parseInt(studentData[0].extra_discount[i].Discount)
//           }
//         }
//         dueamount = dueamount - totalExtraDiscount


//         //end
//         const updatedData = {
//           installments: updatedInstallments,
//           totalinstallments: updatedtotalinstallments,
//           dueamount,
//           totalpaidamount,
//           nextduedate,
//         };
//         console.log(
//           "studentdata.initialpayment[0].initialamount",
//           studentData[0].initialpayment[0].initialamount
//         );
//         console.log(index, "dhghff")
//         // console.log("updatedDataa", updatedData, updateContext);

//         const updateContext = {
//           installments: updatedInstallments,
//           totalinstallments: updatedtotalinstallments,
//           dueamount,
//           totalpaidamount,
//           nextduedate,
//           id: studentData[0].id,
//         };

//         console.log("updatedDataaa", updatedData, updateContext);

//         try {

//           const { data, status } = await toast.promise(axios.put(`${process.env.REACT_APP_API_URL}/fee/feeinstallments/${id}`, updatedData),
//             {
//               loading: "Loading...",
//               success: "Updated installment Successfully",
//               error: "Something went wrong Please try again",
//             }
//           );

//           if (status === 200) {
//             Dispatchstudents({
//               type: "UPDATE_INSTALLMENTS",
//               payload: {
//                 context: "UPDATE_SINGLE_INSTALLMENT",
//                 data: updateContext,
//               },
//             });
//             navigate(`/student/feeview/${id}`)

//           }

//         }
//         catch (error) {
//           console.log(error);
//         }
//       }
//       else {
//         if (installments[index].paidamount > parseInt(studentData[0].dueamount)) {
//           toast.error("Amount cannot be greater than Due Amount");
//         } else if (installments[index].paidamount === 0) {
//           toast.error("Paying Amount should be greater than 0");
//         } else {
//           toast.error("Error");
//         }
//       }
//     }

//     else {
//       if (!installments[index].paidamount) {
//         toast.error("Please Enter Paid amount")
//       }

//       else if (!installments[index].paiddate) {
//         toast.error("please Enter Paid date")
//       }
//       else if (!installments[index].modeofpayment) {
//         toast.error(" please Enter mode of payment")
//       }
//     }


//   }

//   const updateInstallments = (index) => {
//     return new Promise((resolve) => {
//       setInstallments((prevInstallments) => {
//         const updatedInstallments = [...prevInstallments];
//         if (parseInt(updatedInstallments[index].paidamount) > 0) {
//           updatedInstallments[index].paymentdone = true;
//         }
//         if (
//           parseInt(updatedInstallments[index].paidamount) < 1 ||
//           updatedInstallments[index].paidamount === ""
//         ) {
//           updatedInstallments[index].paymentdone = false;
//         }
//         // Check if paidamount is less than dueamount
//         if (
//           updatedInstallments[index].paidamount <
//           updatedInstallments[index].dueamount
//         ) {
//           // Calculate the subInstallmentNumber based on the existing installment
//           const existingSubInstallmentNumber =
//             updatedInstallments[index].subInstallmentNumber || 0;
//           const newSubInstallmentNumber = existingSubInstallmentNumber + 1;

//           const studentinvoiceIndex = index + 2;
//           console.log(studentInvoiceID + studentinvoiceIndex, "krishsn")

//           // Create a new installment with the remaining amount and updated subInstallmentNumber
//           const newInstallment = {
//             ...updatedInstallments[index],
//             installmentNumber: updatedInstallments[index].installmentNumber,
//             dueamount:
//               updatedInstallments[index].dueamount -
//               updatedInstallments[index].paidamount,
//             paidamount: 0,
//             paiddate: "",
//             modeofpayment: "",
//             transactionid: "",
//             paymentdone: false,
//             subInstallmentNumber: newSubInstallmentNumber,
//           };

//           // Insert the new installment after the current one
//           updatedInstallments.splice(index + 1, 0, newInstallment);
//         }
//         if (updatedInstallments[index].paidamount > updatedInstallments[index].dueamount) {
//           let extraPaidAmount = updatedInstallments[index].paidamount - updatedInstallments[index].dueamount;
//           let nextIndex = index + 1;

//           // Iterate through next installments to subtract extraPaidAmount
//           while (extraPaidAmount > 0 && nextIndex < updatedInstallments.length) {
//             if (extraPaidAmount >= updatedInstallments[nextIndex].dueamount) {
//               // Subtract dueamount from extraPaidAmount
//               extraPaidAmount -= updatedInstallments[nextIndex].dueamount;
//               // Mark the installment as paid
//               updatedInstallments[nextIndex].dueamount = 0;
//               updatedInstallments[nextIndex].paymentdone = true;
//             } else {
//               // Subtract remaining extraPaidAmount from the current installment
//               updatedInstallments[nextIndex].dueamount -= extraPaidAmount;
//               extraPaidAmount = 0;
//             }

//             nextIndex++;
//           }
//         }
//         // if (updatedInstallments[index].paidamount > updatedInstallments[index].dueamount) {

//         //   let extraPaidAmount = updatedInstallments[index].paidamount - updatedInstallments[index].dueamount;
//         //   if (updatedInstallments[index + 1].dueamount) {
//         //     if (extraPaidAmount <= updatedInstallments[index + 1].dueamount) {
//         //       updatedInstallments[index + 1].dueamount = updatedInstallments[index + 1].dueamount - extraPaidAmount
//         //     }
//         //     if (extraPaidAmount > updatedInstallments[index + 1].dueamount) {
//         //       let remainingextraPaidAmount = extraPaidAmount - updatedInstallments[index + 1].dueamount
//         //       updatedInstallments[index + 1].dueamount = 0
//         //       updatedInstallments[index + 1].paymentdone = true
//         //       if (updatedInstallments[index + 2].dueamount) {
//         //         updatedInstallments[index + 2].dueamount = updatedInstallments[index + 2].dueamount - remainingextraPaidAmount
//         //       }
//         //     }
//         //   }

//         // }

//         resolve(updatedInstallments);
//         return updatedInstallments;
//       });
//     });
//   };




//   // HANDLE EXTRA DISCOUNT----------------------------

//   const handleApplyDiscount = async () => {

//     if (!extraDiscount) {
//       return toast.error("Please Enter Discount amount")
//     }
//     else if (extraDiscount == 0) {
//       return toast.error("Discount amount not be '0' ")
//     }
//     else if (extraDiscount > studentData[0]?.dueamount) {
//       return toast.error("Discount amount cannot be greater than Due Amount")
//     }


//     let validateUpdatedDueDateAndDueAmount = true
//     for (let i = 0; i < installments.length; i++) {
//       if (!installments[i].duedate) {
//         // if (!installments[i].dueamount) {
//         validateUpdatedDueDateAndDueAmount = false
//         // }
//       }
//     }
//     if (validateUpdatedDueDateAndDueAmount) {
//       if (extraDiscount <= parseInt(studentData[0].dueamount)) {
//         // setOpen(false);

//         let dueamount;
//         if (extraDiscount) {
//           dueamount = parseInt(studentData[0].dueamount) - parseInt(extraDiscount);
//         }
//         // let updatedInstallmentAmount =
//         //   dueamount / totalinstallments[0].totalinstallmentsleft;
//         // for (let i = 0; i < installments.length; i++) {
//         //   const updatedInstallments = [...installments];
//         //   if (updatedInstallments[i].paymentdone === false) {
//         //     updatedInstallments[i].dueamount = parseInt(updatedInstallmentAmount);
//         //   }

//         //   setInstallments(updatedInstallments);
//         // }
//         if (extraDiscount) {
//           let updatedInstallments = [...installments]
//           let remainingDiscount = extraDiscount;
//           // console.log("ddddupdatedInstallments", updatedInstallments)
//           let totalinstallmentspaid = 0

//           for (let i = 0; i < updatedInstallments.length; i++) {
//             if (!updatedInstallments[i].paymentdone && remainingDiscount > 0) {
//               if (remainingDiscount >= updatedInstallments[i].dueamount) {
//                 remainingDiscount -= updatedInstallments[i].dueamount;
//                 updatedInstallments[i].paidamount = 0
//                 updatedInstallments[i].dueamount = 0
//                 updatedInstallments[i].paymentdone = true
//                 updatedInstallments[i].paiddate = getCurrentDate();

//               } else {
//                 const newDueAmount = updatedInstallments[i].dueamount - remainingDiscount;
//                 remainingDiscount = 0;
//                 updatedInstallments[i].dueamount = newDueAmount
//               }


//             }

//             if (updatedInstallments[i + 1]) {
//               if (updatedInstallments[i].installmentNumber != updatedInstallments[i + 1].installmentNumber && updatedInstallments[i].paymentdone === true) {
//                 totalinstallmentspaid += 1
//               }
//             } else {
//               if (updatedInstallments[i].paymentdone) {
//                 totalinstallmentspaid += 1
//               }
//             }


//           }
//           // const updatedInstallments = installments.map(installment => {
//           //   if (!installment.paymentdone && remainingDiscount > 0) {
//           //     if (remainingDiscount >= installment.dueamount) {
//           //       // If discount is more than the due amount, subtract from the due amount and update remainingDiscount
//           //       remainingDiscount -= installment.dueamount;
//           //       return { ...installment, dueamount: 0, paymentdone: true, paidamount: installment.dueamount };
//           //     } else {
//           //       // If discount is less than the due amount, subtract from the discount and update dueamount
//           //       const newDueAmount = installment.dueamount - remainingDiscount;
//           //       remainingDiscount = 0;
//           //       return { ...installment, dueamount: newDueAmount };
//           //     }
//           //   }
//           //   return installment;
//           // });
//           let updatedtotalinstallments = [
//             {
//               totalinstallments: parseInt(totalinstallments[0].totalinstallments),
//               totalinstallmentspaid: parseInt(totalinstallmentspaid),
//               totalinstallmentsleft: parseInt(totalinstallments[0].totalinstallments) - parseInt(totalinstallmentspaid),
//             },
//           ];
//           let Extra_Discount_remarks_history = studentData[0].extra_discount;
//           let newObject = {
//             Discount: parseInt(extraDiscount),
//             // Discount_remarks: text,
//             date: new Date(),
//           };
//           Extra_Discount_remarks_history.push(newObject);
//           const updatedData = {
//             installments: updatedInstallments,
//             totalinstallments: updatedtotalinstallments,
//             dueamount,
//             Extra_Discount_remarks_history,
//           };
//           const updateContext = {
//             installments: updatedInstallments,
//             totalinstallments: updatedtotalinstallments,
//             dueamount,
//             Extra_Discount_remarks_history,
//             id: studentData[0].id,
//           };

//           // let uploadcontext = { user_status, user_remarks_history, id };

//           try {
//             const { data, status } = await toast.promise(axios.put(`${process.env.REACT_APP_API_URL}/fee/extra_discount/${id}`, updatedData),
//               {
//                 loading: "Loading...",
//                 success: "Added Extra Discount Successfully",
//                 error: "Something went wrong Please try again",
//               }
//             );
//             if (status === 200) {

//               Dispatchstudents({
//                 type: "UPDATE_EXTRA_DISCOUNT",
//                 payload: {
//                   context: "UPDATE_EXTRA_DISCOUNT_STUDENT",
//                   data: updateContext,
//                 },
//               });
//               navigate(`/student/feeview/${id}`)
//               setExtraDiscount("")
//             }

//           }
//           catch (error) {
//             console.log(error)
//           }

//           // axios
//           //   .put(
//           //     `${process.env.REACT_APP_API_URL}/extra_discount/${id}`,
//           //     updatedData
//           //   )
//           //   .then((res) => {
//           //     if (res.data.updated) {
//           //       alert("Discount Applied");
//           //       dispatch({
//           //         type: "UPDATE_EXTRA_DISCOUNT",
//           //         payload: updateContext,
//           //       });
//           //       // window.location.reload();
//           //     } else {
//           //       alert("Error please Try Again");
//           //     }
//           //   });


//           // setcourseStartDate("");
//           // setText("");
//         } else {
//           toast.error("enter Discount and remarks");
//         }
//       } else {
//         toast.error("Discount cannot be greater than Due amount");
//       }
//     }

//     else {
//       toast.error("Add Due Date and Due Amount")
//     }

//   };

//   // EXTRA DISCOUNT VIEW -----------

//   // let extra_discount_view = 0;
//   // if (studentData[0].extra_discount) {
//   //   let studentdata_extra_discount = studentData[0].extra_discount;
//   //   for (let i = 0; i < studentdata_extra_discount.length; i++) {
//   //     extra_discount_view += parseInt(studentdata_extra_discount[i].Discount);
//   //   }
//   // }







//   return (
//     <div>
//       <BackButton heading="Fee View" content="Back" />
//       <div className="container-fluid">
//         {/* <iframe src="https://lottie.host/embed/a4517fbf-98ce-4e58-a206-67ea5ebc1343/9cWDB4ySXW.json"
//           className="img-fluid" width="100%" height="100%"></iframe> */}
//         <div className="row">
//           <div className="col-lg-7 col-md-4 col-sm-12">
//             <div className="card border-0">
//               <div className="card-header">
//                 <div className="row">
//                   <div className="col-lg-6">

//                     <div>
//                       <label
//                         for="firstNameinput"
//                         className="form-label fs-s fw-medium txt-color"
//                       >
//                         Name<span className="text-danger">*</span>
//                       </label>
//                       <input
//                         disabled
//                         type="text"
//                         className="form-control fs-s bg-form txt-color"
//                         placeholder="Name of the Student"


//                         value={singleStudentData && singleStudentData[0].name}
//                         style={{ cursor: "not-allowed" }}
//                       />
//                     </div>

//                     <div className="mt-3">
//                       <label
//                         for="firstNameinput"
//                         className="form-label fs-s fw-medium txt-color black_300"
//                       >
//                         Course<span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         className="form-control fs-s bg-form txt-color"
//                         placeholder="Course Name"
//                         value={singleStudentData && singleStudentData[0]?.courses}
//                         disabled
//                         style={{ cursor: "not-allowed" }}
//                       />
//                     </div>
//                     <div className="mt-3">
//                       <label
//                         for="firstNameinput"
//                         className="form-label fs-s fw-medium txt-color"
//                       >
//                         Admission Date<span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="date"
//                         className="form-control fs-s bg-form txt-color date_input_color"
//                         placeholder="paid amount"
//                         value={singleStudentData && singleStudentData[0]?.admissiondate}
//                         disabled
//                         style={{ cursor: "not-allowed" }}
//                       />
//                     </div>


//                     <div className="mt-3">
//                       <label
//                         for="firstNameinput"
//                         className="form-label fs-s fw-medium txt-color"
//                       >
//                         Branch<span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="name"
//                         className="form-control fs-s bg-form txt-color"
//                         placeholder="branch name"
//                         value={singleStudentData && singleStudentData[0]?.branch}
//                         disabled
//                         style={{ cursor: "not-allowed" }}
//                       />
//                     </div>

//                   </div>
//                   <div className="col-lg-6">
//                     <div className="">
//                       <label
//                         for="firstNameinput"
//                         className="form-label fs-s fw-medium txt-color"
//                       >
//                         Total Amount<span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control fs-s bg-form txt-color"
//                         placeholder="Enter discount amount"
//                         value={TotalAmount} disabled

//                       />
//                     </div>
//                     <div className="mt-3">
//                       <label
//                         for="firstNameinput"
//                         className="form-label fs-s fw-medium txt-color"
//                       >
//                         Paid Amount<span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control fs-s bg-form txt-color"
//                         placeholder="Enter discount amount"
//                         value={paidamount} disabled

//                       />
//                     </div>
//                     <div className="mt-3">
//                       <label
//                         for="firstNameinput"
//                         className="form-label fs-s fw-medium txt-color"
//                       >
//                         Due Amount<span className="text-danger">*</span>
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control fs-s bg-form txt-color"
//                         placeholder="Enter discount amount"
//                         value={dueamount} disabled

//                       />
//                     </div>

//                     <div className="mt-3">
//                       <label
//                         for="firstNameinput"
//                         className="form-label fs-s fw-medium txt-color"
//                       >
//                         Extra Discount
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control fs-s bg-form txt-color"
//                         placeholder="Enter discount amount"
//                         onChange={(e) => setExtraDiscount(e.target.value)}
//                         required
//                         value={extraDiscount}
//                       />
//                     </div>
//                     <div className=" mb-4 pb-3">
//                       <div className="text-end mt-4">
//                         <Button className="btn btn_primary"
//                           onClick={handleApplyDiscount}
//                         >
//                           {<HiMiniPlus />} Add Discount
//                         </Button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* ADDING ADMISSION FEE */}

//                   {
//                     singleStudentData && singleStudentData[0] && !singleStudentData[0]?.initialpayment[0] && (

//                       <div className="accordion" id="accordionExample">
//                         <div className="accordion-item">
//                           <h2 className="accordion-header" id="headingFive">
//                             <button
//                               className="accordion-button"
//                               type="button"
//                               data-bs-toggle="collapse"
//                               data-bs-target="#collapseTwo"
//                               aria-expanded="true"
//                               aria-controls="collapseTwo"
//                             >
//                               Admission Fee
//                             </button>
//                           </h2>
//                           <div
//                             id="collapseTwo"
//                             className="accordion-collapse collapse show"
//                             aria-labelledby="headingFive"
//                             data-bs-parent="#accordionExample"
//                           >
//                             <div class="accordion-body">
//                               <div className="table-responsive table-card table-scroll border-0">
//                                 <table className="table table-centered align-middle table-nowrap equal-cell-table">
//                                   <thead>
//                                     <tr className="">
//                                       <th
//                                         scope="col"
//                                         className="fs-13 lh_xs fw-600 black_color "
//                                       >
//                                         Admission Fee
//                                       </th>
//                                       <th
//                                         scope="col"
//                                         className="fs-13 lh_xs black_color fw-600  "
//                                       >
//                                         Paid Date
//                                       </th>
//                                       <th
//                                         scope="col"
//                                         className="fs-13 lh_xs black_color fw-600  "
//                                       >
//                                         Mode of Payment
//                                       </th>
//                                       <th
//                                         scope="col"
//                                         className="fs-13 lh_xs black_color fw-600  "
//                                       >
//                                         Transition ID
//                                       </th>
//                                       <th
//                                         scope="col"
//                                         className="fs-13 lh_xs black_color fw-600 "
//                                       ></th>
//                                     </tr>
//                                   </thead>
//                                   <tbody className="">
//                                     {/* 1st row */}
//                                     <tr>
//                                       <td className="fs-13 black_color fw-500 lh_xs bg_light ">
//                                         {/* Admission Fee */}
//                                         <input
//                                           type="number"
//                                           className="w-100 form-control fs-s bg-form txt-color"
//                                           placeholder="Enter admission fee"
//                                           required
//                                           name="initialamount"
//                                           value={admissionFee?.initialamount}
//                                           onChange={handleInputChange}
//                                         />
//                                       </td>
//                                       <td className="fs-13 black_color  lh_xs bg_light">
//                                         {/* Paid Date */}
//                                         <input
//                                           type="date"
//                                           className="w-100 form-control fs-s bg-form txt-color"
//                                           placeholder="18-Mar-2024"
//                                           required
//                                           name="paiddate"
//                                           value={admissionFee?.paiddate}
//                                           onChange={handleInputChange}
//                                         />
//                                       </td>
//                                       <td className="fs-13 black_color  lh_xs bg_light">
//                                         {/* modeofpayment */}
//                                         <select
//                                           className="form-select form-select-lg mb-3 fs-13 mt-3"
//                                           aria-label=".form-select-lg example"
//                                           name="modeofpayment"
//                                           value={admissionFee?.modeofpayment}
//                                           onChange={handleInputChange}
//                                           required

//                                         >
//                                           <option value="" disabled selected>
//                                             {" "}
//                                             Select the mode of payment{" "}
//                                           </option>
//                                           <option value="UPI">UPI</option>
//                                           <option value="Cash">Cash</option>
//                                           <option value="Bank Transfer">Bank Transfer</option>
//                                           <option value="Cheque">Cheque</option>
//                                         </select>
//                                       </td>
//                                       <td className="fs-13 black_color  lh_xs bg_light">
//                                         {/* Transation ID */}
//                                         <input
//                                           type="number"
//                                           className="w-100 form-control fs-s bg-form txt-color"
//                                           placeholder="Enter Transation ID"
//                                           required
//                                           value={admissionFee?.transactionID}
//                                           onChange={handleInputChange}
//                                           name="transactionID"
//                                         />
//                                       </td>
//                                       <td className="fs-13 black_color lh_xs bg_light flex-row d-flex mt-3">

//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                                 <div className="col d-flex justify-content-end mt-3 mb-2">
//                                   {/* submit the admission fee */}
//                                   <Button className="btn btn_primary"
//                                     onClick={handleAdmissionFee}
//                                   >Update</Button>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                     )
//                   }

//                   {/* ADDING NO OF INSTALLMENTS */}
//                   {
//                     singleStudentData && singleStudentData[0] &&
//                     singleStudentData[0].initialpayment[0] &&
//                     singleStudentData[0].initialpayment[0].paymentdone === true &&
//                     !singleStudentData[0].totalinstallments[0]

//                     && (
//                       <div className=" ">
//                         <div className="card border mt-3">
//                           <div className="flex-row d-flex justify-content-start my-2">
//                             <div className="  ms-3">
//                               <label
//                                 for="firstNameinput"
//                                 className="form-label fs-s fw-medium txt-color"
//                               >
//                                 <h6> No Of Fee Installments :</h6>
//                               </label>
//                             </div>
//                             <div className=" col-lg-6 col-md-6  ms-3">
//                               <input
//                                 type="number"
//                                 className="form-control fs-s bg-form txt-color"
//                                 placeholder="Enter No.of Installments"

//                                 value={noOfinstallments}
//                                 onChange={(e) => setNoOfinstallments(e.target.value)}
//                               />
//                             </div>
//                           </div>
//                           <div className="col d-flex justify-content-end mb-2 me-1">
//                             <Button className="btn btn_primary"
//                               onClick={handleNoOfInstallments}
//                             >
//                               Submit
//                             </Button>

//                           </div>
//                         </div>
//                       </div>
//                     )
//                   }


//                 </div>
//               </div>
//             </div>
//           </div>

//           {singleStudentData && singleStudentData[0] && (
//             <div className="col-lg-5">
//               <div className="card border-0">
//                 <div className="card-header">
//                   <div className="d-flex justify-content-center mt-1">
//                     <React.Fragment>
//                       <ReactEcharts
//                         style={{ width: "400px", height: "400px" }}
//                         option={option}
//                       />
//                     </React.Fragment>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           )}



//           {/* installments */}

//           {/* <div className="card-body">
//             <div className="accordion" id="accordionExampleOne">

//               <div className="accordion-item">
//                 <h2 className="accordion-header" id="headingTwo">
//                   <button
//                     className="accordion-button collapsed"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#collapseTen"
//                     aria-expanded="false"
//                     aria-controls="collapseTen"
//                   >
//                     Installment 1
//                   </button>
//                 </h2>
//                 <div
//                   id="collapseTen"
//                   className="accordion-collapse collapse"
//                   aria-labelledby="headingTwo"
//                   data-bs-parent="#accordionExampleOne"
//                 >
//                   <div className="accordion-body">
//                     <form>
//                       <div className="row">
//                         <div className=" col-lg-3 col-md-6 col-sm-12 ">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Installment Date
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control fs-s bg-form txt-color"
//                               placeholder="Installment Date"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Installment Amount
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control fs-s bg-form txt-color"
//                               placeholder="Installment Amount"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Paid Date
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control fs-s bg-form txt-color"
//                               placeholder="Paid Date"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Paid Amount
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control fs-s bg-form txt-color"
//                               placeholder="Paid Amount"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Mode Of Payement
//                             </label>
//                             <select
//                               className="form-select form-select-lg mb-3 fs-13"
//                               aria-label=".form-select-lg example"
//                             >
//                               <option selected>select</option>
//                               <option value="1">One</option>
//                               <option value="2">Two</option>
//                               <option value="3">Three</option>
//                             </select>
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Transation ID
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control fs-s bg-form txt-color"
//                               placeholder="Transation ID"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <Button className="btn btn_primary">Update</Button>
//                     </form>

//                   </div>
//                 </div>
//               </div>

//               <div className="accordion-item">
//                 <h2 className="accordion-header" id="headingThree">
//                   <button
//                     className="accordion-button collapsed"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#collapseThree"
//                     aria-expanded="false"
//                     aria-controls="collapseThree"
//                   >
//                     Installment 2
//                   </button>
//                 </h2>
//                 <div
//                   id="collapseThree"
//                   className="accordion-collapse collapse p-3"
//                   aria-labelledby="headingThree"
//                   data-bs-parent="#headingThree"
//                 >
//                   <div className="accordion-body">
//                     <form>
//                       <div className="row">
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Installment Date
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control fs-s bg-form txt-color"
//                               placeholder="Installment Date"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Installment Amount
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control fs-s bg-form txt-color"
//                               placeholder="Installment Amount"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Paid Date
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control fs-s bg-form txt-color"
//                               placeholder="Paid Date"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Paid Amount
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control fs-s bg-form txt-color"
//                               placeholder="Paid Amount"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Mode Of Payement
//                             </label>
//                             <select
//                               className="form-select form-select-lg mb-3 fs-13"
//                               aria-label=".form-select-lg example"
//                             >
//                               <option selected> select</option>
//                               <option value="1">One</option>
//                               <option value="2">Two</option>
//                               <option value="3">Three</option>
//                             </select>
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Transation ID
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control fs-s bg-form txt-color"
//                               placeholder="Transation ID"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <Button className="btn btn_primary">Update</Button>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div> */}

//           {/* installments  */}

//           <div className="mb-3">
//             <div className="accordion" id="accordionExampleOne">
//               {/*
//               {
//                 singleStudentData && singleStudentData[0] && singleStudentData[0].dueamount > 0 && installments && installments.map((installment, index) => {

//                   if (installment.paymentdone === true) {
//                     return null; // Do not render anything
//                   }

//                   const collapseId = `collapse_${index}`; // Unique ID for collapse element
//                   const headingId = `heading_${index}`; // Unique ID for accordion header */}
//               {
//                 singleStudentData && singleStudentData[0] && singleStudentData[0].dueamount > 0 &&
//                 Array.isArray(installments) &&
//                 installments.map((installment, index) => {

//                   if (installment.paymentdone === true) {
//                     return null;
//                   }

//                   const collapseId = `collapse_${index}`; // Unique ID for collapse element
//                   const headingId = `heading_${index}`;

//                   return (
//                     <div className="accordion-item">
//                       <h2 className="accordion-header" id={headingId}>
//                         <button
//                           className="accordion-button collapsed"
//                           type="button"
//                           data-bs-toggle="collapse"
//                           data-bs-target={`#${collapseId}`}
//                           aria-expanded="false"
//                           aria-controls="collapseTen"
//                         >
//                           Installment{"  "} {installment.installmentNumber}
//                           {installment.subInstallmentNumber != 0 && (
//                             <>{" - "} {installment.subInstallmentNumber}</>
//                           )}
//                         </button>
//                       </h2>
//                       <div
//                         id={collapseId}
//                         className="accordion-collapse collapse"
//                         aria-labelledby={headingId}
//                         data-bs-parent="#accordionExampleOne"
//                       >
//                         <div className="accordion-body">
//                           <form>
//                             <div className="row">
//                               <div className=" col-lg-3 col-md-6 col-sm-12 ">
//                                 <div className="mb-3">
//                                   <label
//                                     for="firstNameinput"
//                                     className="form-label fs-s fw-medium txt-color"
//                                   >
//                                     Installment Date
//                                   </label>
//                                   <input
//                                     disabled={singleStudentData && singleStudentData[0] && singleStudentData[0].installments && singleStudentData[0].installments[index] && singleStudentData[0].installments[index].duedate}

//                                     style={{
//                                       cursor:
//                                         singleStudentData && singleStudentData[0] && singleStudentData[0].installments && singleStudentData[0].installments[index] && singleStudentData[0].installments[index].duedate
//                                           ? "not-allowed"
//                                           : "auto",
//                                     }}

//                                     type="date"
//                                     className="form-control fs-s bg-form txt-color"
//                                     placeholder="Installment Date"

//                                     name="Installment Date"
//                                     onChange={(e) =>
//                                       handleInstallmentUpdate(
//                                         index,
//                                         "duedate",
//                                         e.target.value
//                                       )
//                                     }
//                                     value={installment.duedate}
//                                     min={getCurrentDate()}
//                                     required
//                                   />
//                                 </div>
//                               </div>
//                               <div className="col-lg-3 col-md-6 col-sm-12">
//                                 <div className="mb-3">
//                                   <label
//                                     for="firstNameinput"
//                                     className="form-label fs-s fw-medium txt-color"
//                                   >
//                                     Installment Amount
//                                   </label>
//                                   <input
//                                     disabled={singleStudentData &&
//                                       singleStudentData[0] && singleStudentData[0]?.installments && singleStudentData[0].installments[index] && singleStudentData[0].installments[index].dueamount}

//                                     style={{
//                                       cursor:
//                                         singleStudentData && singleStudentData[0] && singleStudentData[0].installments && singleStudentData[0].installments[index] && singleStudentData[0].installments[index].duedate
//                                           ? "not-allowed"
//                                           : "auto",
//                                     }}


//                                     type="number"
//                                     className="form-control fs-s bg-form txt-color"
//                                     placeholder="Installment Amount"

//                                     name="Installment Amount"
//                                     onChange={(e) =>
//                                       handleInstallmentUpdate(
//                                         index,
//                                         "dueamount",
//                                         parseFloat(e.target.value)
//                                       )
//                                     }
//                                     value={installment.dueamount}
//                                     required


//                                   />
//                                 </div>
//                               </div>
//                               {/* PAID DATE */}
//                               {
//                                 singleStudentData && singleStudentData[0] &&
//                                 singleStudentData[0].installments[index] &&
//                                 singleStudentData[0].installments[index].duedate &&
//                                 singleStudentData[0].installments[index].dueamount && (
//                                   <div className="col-lg-3 col-md-6 col-sm-12">
//                                     <div className="mb-3">
//                                       <label
//                                         for="firstNameinput"
//                                         className="form-label fs-s fw-medium txt-color"
//                                       >
//                                         Paid Date
//                                       </label>
//                                       <input
//                                         type="date"
//                                         className="form-control fs-s bg-form txt-color"
//                                         placeholder="Paid Date"

//                                         name="paiddate"
//                                         onChange={(e) =>
//                                           handleInstallmentUpdate(
//                                             index,
//                                             "paiddate",
//                                             e.target.value
//                                           )
//                                         }
//                                         value={installment.paiddate || getCurrentDate()}
//                                         max={getCurrentDate()}
//                                         required
//                                       />
//                                     </div>
//                                   </div>
//                                 )
//                               }

//                               {/* <div className="col-lg-3 col-md-6 col-sm-12">
//                                 <div className="mb-3">
//                                   <label
//                                     for="firstNameinput"
//                                     className="form-label fs-s fw-medium txt-color"
//                                   >
//                                     Paid Date
//                                   </label>
//                                   <input
//                                     type="date"
//                                     className="form-control fs-s bg-form txt-color"
//                                     placeholder="Paid Date"

//                                     name="paiddate"
//                                     onChange={(e) =>
//                                       handleInstallmentUpdate(
//                                         index,
//                                         "paiddate",
//                                         e.target.value
//                                       )
//                                     }
//                                     value={installment.paiddate || getCurrentDate()}
//                                     required
//                                   />
//                                 </div>
//                               </div> */}

//                               {/* PAID AMOUNT */}
//                               {
//                                 singleStudentData && singleStudentData[0] &&
//                                 singleStudentData[0].installments[index] &&
//                                 singleStudentData[0].installments[index].duedate &&
//                                 singleStudentData[0].installments[index].dueamount && (
//                                   <div className="col-lg-3 col-md-6 col-sm-12">
//                                     <div className="mb-3">
//                                       <label
//                                         for="firstNameinput"
//                                         className="form-label fs-s fw-medium txt-color"
//                                       >
//                                         Paid Amount
//                                       </label>
//                                       <input
//                                         type="number"
//                                         className="form-control fs-s bg-form txt-color"
//                                         placeholder="Paid Amount"

//                                         name="paidamount"
//                                         onChange={(e) =>
//                                           handleInstallmentUpdate(
//                                             index,
//                                             "paidamount",
//                                             parseFloat(e.target.value)
//                                           )
//                                         }
//                                         value={installment.paidamount}
//                                         required

//                                       />
//                                     </div>
//                                   </div>
//                                 )
//                               }

//                               {/* <div className="col-lg-3 col-md-6 col-sm-12">
//                                 <div className="mb-3">
//                                   <label
//                                     for="firstNameinput"
//                                     className="form-label fs-s fw-medium txt-color"
//                                   >
//                                     Paid Amount
//                                   </label>
//                                   <input
//                                     type="number"
//                                     className="form-control fs-s bg-form txt-color"
//                                     placeholder="Paid Amount"

//                                     name="paidamount"
//                                     onChange={(e) =>
//                                       handleInstallmentUpdate(
//                                         index,
//                                         "paidamount",
//                                         parseFloat(e.target.value)
//                                       )
//                                     }
//                                     value={installment.paidamount}
//                                     required

//                                   />
//                                 </div>
//                               </div> */}

//                               {/* MODE OF PAYMENT */}

//                               {singleStudentData && singleStudentData[0] &&
//                                 singleStudentData[0].installments[index] &&
//                                 singleStudentData[0].installments[index].duedate &&
//                                 singleStudentData[0].installments[index].dueamount && (
//                                   <div className="col-lg-3 col-md-6 col-sm-12">
//                                     <div className="mb-3">
//                                       <label
//                                         for="firstNameinput"
//                                         className="form-label fs-s fw-medium txt-color"
//                                       >
//                                         Mode Of Payement
//                                       </label>
//                                       <select
//                                         className="form-select form-select-lg mb-3 fs-13"
//                                         aria-label=".form-select-lg example"

//                                         name="modeofpayment"
//                                         onChange={(e) =>
//                                           handleInstallmentUpdate(
//                                             index,
//                                             "modeofpayment",
//                                             e.target.value
//                                           )
//                                         }
//                                         value={installment.modeofpayment}
//                                         required
//                                       >
//                                         <option value="" disabled selected>
//                                           {" "}
//                                           Select the modeofpayment{" "}
//                                         </option>
//                                         <option value="UPI">UPI</option>
//                                         <option value="Cash">Cash</option>
//                                         <option value="Bank Transfer">Bank Transfer</option>
//                                         <option value="Cheque">Cheque</option>
//                                       </select>
//                                     </div>
//                                   </div>
//                                 )}

//                               {/* <div className="col-lg-3 col-md-6 col-sm-12">
//                                 <div className="mb-3">
//                                   <label
//                                     for="firstNameinput"
//                                     className="form-label fs-s fw-medium txt-color"
//                                   >
//                                     Mode Of Payement
//                                   </label>
//                                   <select
//                                     className="form-select form-select-lg mb-3 fs-13"
//                                     aria-label=".form-select-lg example"

//                                     name="modeofpayment"
//                                     onChange={(e) =>
//                                       handleInstallmentUpdate(
//                                         index,
//                                         "modeofpayment",
//                                         e.target.value
//                                       )
//                                     }
//                                     value={installment.modeofpayment}
//                                     required
//                                   >
//                                     <option value="" disabled selected>
//                                       {" "}
//                                       Select the modeofpayment{" "}
//                                     </option>
//                                     <option value="UPI">UPI</option>
//                                     <option value="Cash">Cash</option>
//                                     <option value="Bank Transfer">Bank Transfer</option>
//                                     <option value="Cheque">Cheque</option>
//                                   </select>
//                                 </div>
//                               </div> */}

//                               {/* TRANSATION ID */}
//                               {
//                                 singleStudentData && singleStudentData[0] &&
//                                 singleStudentData[0].installments[index] &&
//                                 singleStudentData[0].installments[index].duedate &&
//                                 singleStudentData[0].installments[index].dueamount && (
//                                   <div className="col-lg-3 col-md-6 col-sm-12">
//                                     <div className="mb-3">
//                                       <label
//                                         for="firstNameinput"
//                                         className="form-label fs-s fw-medium txt-color"
//                                       >
//                                         Transation ID
//                                       </label>
//                                       <input
//                                         type="text"
//                                         className="form-control fs-s bg-form txt-color"
//                                         placeholder="Transation ID"
//                                         name="transactionid"
//                                         onChange={(e) =>
//                                           handleInstallmentUpdate(
//                                             index,
//                                             "transactionid",
//                                             e.target.value
//                                           )
//                                         }
//                                         value={installment.transactionid}
//                                         required
//                                       />
//                                     </div>
//                                   </div>

//                                 )
//                               }

//                               {/* <div className="col-lg-3 col-md-6 col-sm-12">
//                                 <div className="mb-3">
//                                   <label
//                                     for="firstNameinput"
//                                     className="form-label fs-s fw-medium txt-color"
//                                   >
//                                     Transation ID
//                                   </label>
//                                   <input
//                                     type="text"
//                                     className="form-control fs-s bg-form txt-color"
//                                     placeholder="Transation ID"
//                                     name="transactionid"
//                                     onChange={(e) =>
//                                       handleInstallmentUpdate(
//                                         index,
//                                         "transactionid",
//                                         e.target.value
//                                       )
//                                     }
//                                     value={installment.transactionid}
//                                     required
//                                   />
//                                 </div>
//                               </div> */}
//                             </div>

//                             {/* HANDLE INSTALLMENT UPDATE CLICK */}

//                             {
//                               singleStudentData && singleStudentData[0] &&
//                               singleStudentData[0].installments[index] &&
//                               singleStudentData[0].installments[index].duedate &&
//                               singleStudentData[0].installments[index].dueamount && (
//                                 <Button className="btn btn_primary"
//                                   onClick={() => handleUpdateClick(index)}
//                                 >
//                                   Update
//                                 </Button>

//                               )

//                             }
//                             {/* <Button className="btn btn_primary"
//                               onClick={() => handleUpdateClick(index)}
//                             >
//                               Update
//                             </Button> */}

//                           </form>



//                         </div>
//                       </div>

//                     </div>
//                   )
//                 })
//               }
//               {
//                 DisplayUpdateDueamountAndInstallmentButton && (
//                   <div className="d-flex justify-content-end mt-3 mb-3 ">
//                     <Button className="btn btn_primary p-2"
//                       onClick={UpdateDueDateAndDueAmount}
//                     >
//                       Update
//                     </Button>
//                   </div>
//                 )
//               }
//               {/* <div className="accordion-item">
//                 <h2 className="accordion-header" id="headingThree">
//                   <button
//                     className="accordion-button collapsed"
//                     type="button"
//                     data-bs-toggle="collapse"
//                     data-bs-target="#collapseThree"
//                     aria-expanded="false"
//                     aria-controls="collapseThree"
//                   >
//                     Installment 2
//                   </button>
//                 </h2>
//                 <div
//                   id="collapseThree"
//                   className="accordion-collapse collapse p-3"
//                   aria-labelledby="headingThree"
//                   data-bs-parent="#headingThree"
//                 >
//                   <div className="accordion-body">
//                     <form>
//                       <div className="row">
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Installment Date
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control fs-s bg-form txt-color"
//                               placeholder="Installment Date"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Installment Amount
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control fs-s bg-form txt-color"
//                               placeholder="Installment Amount"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Paid Date
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control fs-s bg-form txt-color"
//                               placeholder="Paid Date"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Paid Amount
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control fs-s bg-form txt-color"
//                               placeholder="Paid Amount"
//                             />
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Mode Of Payement
//                             </label>
//                             <select
//                               className="form-select form-select-lg mb-3 fs-13"
//                               aria-label=".form-select-lg example"
//                             >
//                               <option selected> select</option>
//                               <option value="1">One</option>
//                               <option value="2">Two</option>
//                               <option value="3">Three</option>
//                             </select>
//                           </div>
//                         </div>
//                         <div className="col-lg-3 col-md-6 col-sm-12">
//                           <div className="mb-3">
//                             <label
//                               for="firstNameinput"
//                               className="form-label fs-s fw-medium txt-color"
//                             >
//                               Transation ID
//                             </label>
//                             <input
//                               type="text"
//                               className="form-control fs-s bg-form txt-color"
//                               placeholder="Transation ID"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <Button className="btn btn_primary">Update</Button>
//                     </form>
//                   </div>
//                 </div>
//               </div> */}
//             </div>



//             {/* DISPLAY PAID FEE */}

//             {
//               singleStudentData && singleStudentData[0] &&
//               singleStudentData[0].initialpayment[0] &&
//               singleStudentData[0].initialpayment[0].paymentdone === true && (

//                 <div className="accordion" id="accordionExam">
//                   <div className="accordion-item">
//                     <h2 className="accordion-header" id="headingFour">
//                       <button
//                         className="accordion-button collapsed"
//                         type="button"
//                         data-bs-toggle="collapse"
//                         data-bs-target="#collapseTwenty"
//                         aria-expanded="false"
//                         aria-controls="collapseTwenty"
//                       >
//                         Paid Fee
//                       </button>
//                     </h2>
//                     <div
//                       id="collapseTwenty"
//                       className="accordion-collapse collapse p-3"
//                       aria-labelledby="headingThree"
//                       data-bs-parent="#accordionExam"
//                     >
//                       <div className="accordion-body">
//                         <div className="table-responsive table-card table-scroll border-0">
//                           <table className="table table-centered align-middle table-nowrap equal-cell-table">
//                             <thead>
//                               <tr className="">
//                                 <th
//                                   scope="col"
//                                   className="fs-13 lh_xs fw-600 black_color "
//                                 >
//                                   S.No
//                                 </th>
//                                 <th
//                                   scope="col"
//                                   className="fs-13 lh_xs black_color fw-600  "
//                                 >
//                                   Fee Type
//                                 </th>
//                                 <th
//                                   scope="col"
//                                   className="fs-13 lh_xs black_color fw-600  "
//                                 >
//                                   Due Date
//                                 </th>
//                                 <th
//                                   scope="col"
//                                   className="fs-13 lh_xs black_color fw-600  "
//                                 >
//                                   Due Amount
//                                 </th>
//                                 <th
//                                   scope="col"
//                                   className="fs-13 lh_xs black_color fw-600  "
//                                 >
//                                   Paid Amount
//                                 </th>
//                                 <th
//                                   scope="col"
//                                   className="fs-13 lh_xs black_color fw-600 "
//                                 >
//                                   Paid Date
//                                 </th>
//                                 <th
//                                   scope="col"
//                                   className="fs-13 lh_xs black_color fw-600 "
//                                 >
//                                   Mode of Payment
//                                 </th>
//                                 <th
//                                   scope="col"
//                                   className="fs-13 lh_xs black_color fw-600 "
//                                 >
//                                   Transition ID
//                                 </th>
//                                 <th
//                                   scope="col"
//                                   className="fs-13 lh_xs black_color fw-600 "
//                                 >
//                                   Invoice
//                                 </th>
//                               </tr>
//                             </thead>
//                             <tbody className="">

//                               {/* Display the Admission fee */}
//                               {/* 1st row */}
//                               {
//                                 studentData && studentData[0] && studentData[0].initialpayment ? studentData[0].initialpayment.map((item, index) => {

//                                   let paidDate = new Date(item.paiddate);
//                                   const day = paidDate.getUTCDate();
//                                   const monthIndex = paidDate.getUTCMonth();
//                                   const year = paidDate.getUTCFullYear();

//                                   const monthAbbreviations = [
//                                     "Jan",
//                                     "Feb",
//                                     "Mar",
//                                     "Apr",
//                                     "May",
//                                     "Jun",
//                                     "Jul",
//                                     "Aug",
//                                     "Sep",
//                                     "Oct",
//                                     "Nov",
//                                     "Dec",
//                                   ];

//                                   // Formatting the date
//                                   paidDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
//                                     }-${year}`;

//                                   return (
//                                     <tr>
//                                       <td className="fs-13 black_color fw-500 lh_xs bg_light ">
//                                         {index + 1}
//                                       </td>
//                                       <td className="fs-13 black_color  lh_xs bg_light">
//                                         Admission Fee

//                                       </td>
//                                       <td className="fs-13 black_color  lh_xs bg_light">
//                                         -
//                                       </td>
//                                       <td className="fs-13 black_color  lh_xs bg_light">
//                                         -
//                                       </td>
//                                       <td className="fs-13 black_color  lh_xs bg_light">
//                                         {item.initialamount}
//                                       </td>
//                                       <td className="fs-13 black_color  lh_xs bg_light">
//                                         {paidDate}
//                                       </td>
//                                       <td className="fs-13 black_color  lh_xs bg_light">
//                                         {item.modeofpayment}
//                                       </td>
//                                       <td className="fs-13 black_color  lh_xs bg_light">
//                                         {item.transactionID}
//                                       </td>
//                                       <td className="fs-13 black_color  lh_xs bg_light flex-row d-flex">

//                                         <Link to={`/student/invoice/${id}/${index}/Admission Fee/admininvoice`} className="hover-container">
//                                           <MdCreditScore className="eye_icon" title="admin" />

//                                         </Link>

//                                         <Link
//                                           to={`/student/invoice/${id}/${index}/Admission Fee/studentinvoice`}
//                                         >
//                                           <MdCreditScore className="eye_icon ms-3" title="student" />
//                                         </Link>
//                                       </td>
//                                     </tr>
//                                   )
//                                 }) : null
//                               }


//                               {/* <tr>
//                               <td className="fs-13 black_color fw-500 lh_xs bg_light ">
//                                 1
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light">
//                                 ADmission Fee
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light">
//                                 12-2-2024
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light">
//                                 15000
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light">
//                                 499
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light">
//                                 1-2-2024
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light">
//                                 Cash
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light">
//                                 202403181523310045
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light flex-row d-flex">
//                                 <div
//                                   className="me-2"
//                                   data-bs-toggle="tooltip"
//                                   data-bs-placement="top"
//                                   title="Admin"
//                                 >
//                                   <FaFileInvoice />
//                                 </div>
//                                 <div
//                                   data-bs-toggle="tooltip"
//                                   data-bs-placement="top"
//                                   title="Student"
//                                 >
//                                   <FaFileInvoice />
//                                 </div>
//                               </td>
//                             </tr> */}
//                             </tbody>

//                             {/* INSTALLEMENT FEE BINDING && Display the installemts*/}
//                             {/* 2nd row */}

//                             <tbody className="">
//                               {singleStudentData && singleStudentData[0] && singleStudentData[0].installments ? singleStudentData[0].installments.map((item, index) => {

//                                 let paidDate = new Date(item.paiddate);
//                                 const day = paidDate.getUTCDate();
//                                 const monthIndex = paidDate.getUTCMonth();
//                                 const year = paidDate.getUTCFullYear();
//                                 let dueDate = new Date(item.duedate);
//                                 const dueday = dueDate.getUTCDate();
//                                 const duemonthIndex = dueDate.getUTCMonth();
//                                 const dueyear = dueDate.getUTCFullYear();
//                                 const monthAbbreviations = [
//                                   "Jan",
//                                   "Feb",
//                                   "Mar",
//                                   "Apr",
//                                   "May",
//                                   "Jun",
//                                   "Jul",
//                                   "Aug",
//                                   "Sep",
//                                   "Oct",
//                                   "Nov",
//                                   "Dec",
//                                 ];

//                                 // Formatting the date
//                                 paidDate = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
//                                   }-${year}`;
//                                 dueDate = `${dueday < 10 ? "0" : ""}${dueday}-${monthAbbreviations[duemonthIndex]
//                                   }-${dueyear}`;

//                                 if (item.paidamount < 1) {
//                                   return null; // Do not render anything
//                                 }


//                                 return (
//                                   <tr>
//                                     <td className="fs-13 black_color fw-500 lh_xs bg_light ">
//                                       {index + 2}
//                                     </td>
//                                     <td className="fs-13 black_color  lh_xs bg_light">
//                                       Installment {item.installmentNumber}{" "}
//                                       {item.subInstallmentNumber != 0 && (
//                                         <>/ {item.subInstallmentNumber}</>
//                                       )}
//                                     </td>
//                                     <td className="fs-13 black_color  lh_xs bg_light">
//                                       {dueDate}
//                                     </td>
//                                     <td className="fs-13 black_color  lh_xs bg_light">
//                                       {Number(
//                                         parseFloat(item.dueamount).toFixed(2)
//                                       ).toLocaleString("en-IN")}
//                                     </td>
//                                     <td className="fs-13 black_color  lh_xs bg_light">
//                                       {Number(item.paidamount).toLocaleString("en-IN")}
//                                     </td>
//                                     <td className="fs-13 black_color  lh_xs bg_light">
//                                       {paidDate}
//                                     </td>
//                                     <td className="fs-13 black_color  lh_xs bg_light">
//                                       {item.modeofpayment}
//                                     </td>
//                                     <td className="fs-13 black_color  lh_xs bg_light">
//                                       {item.transactionid}
//                                     </td>
//                                     <td className="fs-13 black_color  lh_xs bg_light flex-row d-flex">
//                                       <Link
//                                         to={`/student/invoice/${id}/${index}/Installment/admininvoice`}

//                                       >
//                                         <MdCreditScore className="eye_icon" title="admin" />
//                                         <div ></div>
//                                       </Link>
//                                       <Link
//                                         to={`/student/invoice/${id}/${index}/Installment/studentinvoice`}

//                                       >
//                                         <MdCreditScore className="eye_icon ms-3 " title="student" />
//                                         <div ></div>
//                                       </Link>
//                                     </td>
//                                   </tr>

//                                 )
//                               }) : null
//                               }

//                               {/* <tr>
//                               <td className="fs-13 black_color fw-500 lh_xs bg_light ">
//                                 2
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light">
//                                 Installment
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light">
//                                 12-2-2024
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light">
//                                 10000
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light">
//                                 10000
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light">
//                                 1-2-2024
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light">
//                                 Cash
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light">
//                                 202403181523310045
//                               </td>
//                               <td className="fs-13 black_color  lh_xs bg_light flex-row d-flex">
//                                 <div
//                                   className="me-2"
//                                   data-bs-toggle="tooltip"
//                                   data-bs-placement="top"
//                                   title="Admin"
//                                 >
//                                   <FaFileInvoice />
//                                 </div>
//                                 <div
//                                   data-bs-toggle="tooltip"
//                                   data-bs-placement="top"
//                                   title="Student"
//                                 >
//                                   <FaFileInvoice />
//                                 </div>
//                               </td>
//                             </tr> */}

//                             </tbody>


//                           </table>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>


//               )
//             }
//           </div>
//         </div>
//       </div>
//     </div >
//   );
// };

// export default FeeView;
