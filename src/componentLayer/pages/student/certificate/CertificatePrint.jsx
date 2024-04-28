import React from "react";
import "../../../../assets/css/CertificatePrint.css";
import logo1 from "../../../../assets/images/certificate_images/Hologram-Sticker_Img.png";
import sign from "../../../../assets/images/certificate_images/Zaheer_Sir_Signature 2.png";
import img1 from "../../../../assets/images/certificate_images/NASSCOM.png";
import img2 from "../../../../assets/images/certificate_images/NSDC.png";
import img3 from "../../../../assets/images/certificate_images/ISO.png";
import img4 from "../../../../assets/images/certificate_images/Skill_india.png";
import img5 from "../../../../assets/images/certificate_images/MSME_logo.png";
import tekslogo from "../../../../assets/images/certificate_images/Tesks_Logo.png";
import { useReactToPrint } from "react-to-print";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/button/Button";
import { MdLocalPrintshop } from "react-icons/md";
import BackButton from "../../../components/backbutton/BackButton";
import { useStudentsContext } from "../../../../dataLayer/hooks/useStudentsContext";

function CertificatePrint() {

  const componentRefff = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRefff.current,
  });

  console.log(`Print ${componentRefff.current}`);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const [CertificatePrint, setCertificatePrint] = useState("");
  const { id } = useParams("");
  const {
    studentState,
    studentState: { CertificateStudents },
    Dispatchstudents,
    getPaginatedCertificateData,
  } = useStudentsContext();
  console.log(CertificateStudents, "2231432"
  );
  useEffect(() => {

    if (CertificateStudents && id) {
      const filteredStudentData = CertificateStudents.PaginatedCertificateStudents.filter((item) => {
        const singleStudentData = id ? item.id === parseInt(id) : true;
        console.log(singleStudentData, "2231432");
        return singleStudentData;
      })
      if (filteredStudentData) {
        console.log(filteredStudentData[0])
      }
      setCertificatePrint(filteredStudentData[0])
    }
  }, [CertificateStudents, id, Dispatchstudents]);
  const formatDate = (dateString) => {
    const options = { month: 'short', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleString('en-Us', options);
    return formattedDate.toUpperCase();
  };

  return (
    <div>
      <BackButton heading="Certificate" content="Back" />
      <div className="text-end p-3">
        <Button className="btn btn_primary me-2 " onClick={handlePrint} >
          <MdLocalPrintshop />{" "} Print
        </Button>
      </div>
      <div className="contain" ref={componentRefff}>
        {CertificatePrint && (
          <div className="Outerline1 mb-5">
            <div className="outerborder ">

              <div className="section">
                <div className="logo">
                  <img src={tekslogo} alt="" />
                </div>
                <header className="header">
                  <h1>
                    <span>C</span>ERTIFICATE
                  </h1>
                  <p>This is to certify that</p>
                </header>

                <div className="certificate-info" action="">
                  <div className="name">
                    <p>Mr./Mrs</p>
                    <div className="studname">
                      <h4 className="studname">
                        {CertificatePrint.name}
                      </h4>
                    </div>
                  </div>
                  <div className="infor">
                    <p class="para">
                      has successfully completed Real Time Training on
                    </p>

                    <h4 className="courses">
                      {CertificatePrint.courses.toUpperCase()}
                    </h4>
                  </div>
                  <div className="period">
                    <div className="d-block">
                      <p>during the period of </p>
                    </div>
                    <h4 className="from">


                      {formatDate(CertificatePrint?.certificate_status[0]?.courseStartDate)}  </h4>

                    <p className='  d-block'>to </p>

                    <h4 className='to  d-block'> {formatDate(CertificatePrint?.certificate_status[0]?.courseEndDate)}



                    </h4>
                  </div>
                  <div className="grade ">
                    <p className="grade-start">with</p>
                    <h4 className="gradeA"> A+ </h4>
                    <p className="grade-end">Grade</p>
                  </div>
                </div>
                <div className="id">
                  <h5>ID:{CertificatePrint.registrationnumber}</h5>
                </div>
                <div className="sign-date">
                  <div className="date-left">
                    <p className="dt">{formattedDate}</p>
                    <p style={{ color: "#2a619d" }}>DATE</p>
                  </div>
                  <div className="hologram-sticker  ">
                    <img src={logo1} alt="" />
                    <div className="curved">
                      <svg viewBox="0 0 400 200" class="curved-path">
                        <path
                          id="curve"
                          d="M 100 150 Q 200 250 300 150"
                          fill="none"
                        />
                        <text text-anchor="middle" fill="grey" fontSize={"25px"}>
                          <textPath
                            xlinkHref="#curve"
                            startOffset="50%"
                            class="curve-text"
                          >
                            00001
                          </textPath>
                        </text>
                      </svg>
                    </div>
                  </div>
                  <div className="sign-right">
                    <img src={sign} alt="" />
                    <p style={{ color: "#2a619d" }}>SIGNATURE</p>
                  </div>
                </div>
                <div className="cname">
                  <img src={img1} className=" img1" alt="" />
                  <img src={img2} className=" img2" alt="" />
                  <img src={img3} className=" img3" alt="" />
                  <img src={img4} className=" img4" alt="" />
                  <img src={img5} className=" img5" alt="" />
                </div>
              </div>

            </div>
          </div>
        )}
      </div>



    </div>
  )
}

export default CertificatePrint