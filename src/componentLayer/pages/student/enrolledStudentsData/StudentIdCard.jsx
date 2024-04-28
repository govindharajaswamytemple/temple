import React from "react";
import logo from "../../../../assets/images/student_idCard_images/Tesks_Logo.png";
import Defaultimg from '../../../../assets/images/student_idCard_images/Defaultimg.jpg'
import detail from "../../../../assets/images/student_idCard_images/Courses&details.png";
import { useReactToPrint } from "react-to-print";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MdLocalPrintshop } from "react-icons/md";
import { useEffect } from "react";
import { useStudentsContext } from "../../../../dataLayer/hooks/useStudentsContext";
import "../../../../assets/css/StudentIdCard.css";
import Button from "../../../components/button/Button";
import BackButton from "../../../components/backbutton/BackButton";
function StudentIdCard() {
  const componentRefff = React.useRef();
  const [StudentIdCard, setStudentIdCard] = useState("");
  const { id } = useParams("");
  const { studentState, studentState: { TotalStudents }, Dispatchstudents } = useStudentsContext();
  useEffect(() => {
    if (TotalStudents && id) {
      const filteredResults = TotalStudents.filter((item) => {
        const singlestudentCondition = id ? item.id === parseInt(id) : true;

        return singlestudentCondition;
      });
      if (filteredResults) {
        console.log("filteredResults[0]", filteredResults[0]);
      }
      setStudentIdCard(filteredResults[0]);

    }
  }, [TotalStudents, id, Dispatchstudents]);
  const handlePrint = useReactToPrint({
    content: () => componentRefff.current,
  });

  console.log(`Print ${componentRefff.current}`);
  return (
    <div>
      <BackButton heading="Student Id Card" content="Back" />
      <div className="container-fluid">

        <div className="text-end p-3">
          <Button className="btn btn_primary me-2 " onClick={handlePrint}>
            <MdLocalPrintshop />    Print
          </Button>
        </div>

        <div className="studentid" ref={componentRefff}>
          <div className="idcard1">
            <div className="row ">
              <div className="  col-6 col-md-6 col-lg-6 col-xl-6">
                <div className="student-info  ">
                  <div className="teksimg">
                    <img className="mb-4 " src={logo} alt="" />
                  </div>
                  <p className="fs-14 black_300"> Name:{StudentIdCard?.name}</p>
                  <p className=" fs-14 black_300"> Course:{StudentIdCard?.courses}</p>
                  <p className=" fs-14 black_300"> Registration No:{StudentIdCard?.registrationnumber}</p>

                  <p className="fs-14 black_300"> Branch:{StudentIdCard?.branch}</p>
                </div>
              </div>
              <div className="studid-photo col-6 col-md-6 col-lg-6 col-xl-6">
                <div className='stuimg'>
                  {!StudentIdCard?.studentImg && <img src={Defaultimg} alt="photo" />}
                  {StudentIdCard?.studentImg && (
                    <img
                      className=" w-75"
                      src={`https://teksacademyimages.s3.amazonaws.com/${StudentIdCard?.studentImg}`}
                      alt="photo"
                    />
                  )}</div>

                <p className="" style={{ color: "#2a619d" }}>
                  Valid Upto:
                </p>
              </div>
            </div>

            <div className="idcard2  w-100 m-auto mt-2 ">
              <div className="d-flex flex-column justify-content-center p-4">
                <img className=" tekslogo m-auto " src={logo} alt=""></img>

                <img className="detail  m-auto" src={detail} alt=""></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentIdCard;
