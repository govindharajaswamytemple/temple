import React, { createContext, useEffect } from "react";
import { useReducer } from "react";
import { InitialState } from "./utils/StudentConfi";
import StudentsReducer from "./StudentsReducer";
import * as api from "./utils/StudentsAPIs";
import * as Actions from "./utils/StudentsActions";

export const StudentsContext = createContext();

const StudentsContextProvider = ({ children }) => {
  const [studentState, Dispatchstudents] = useReducer(
    StudentsReducer,
    InitialState
  );
  console.log(studentState, "studentState11");

  // All Students

  const getAllStudents = async () => {
    const { status, data } = await api.getAllStudents();
    console.log("Totalstudentsdatayy", data, status);
    if (status === 200) {
      Dispatchstudents(Actions.setStudentsData(data, "ALL_STUDENTS"));
    }
  };

  // Enrolled Students

  const getPaginatedStudentsData = async () => {
    console.log(studentState?.EnrolledStudents, "hhhfgggfghhhhh")
    const { filters, perPage, search, currentPage, } = studentState?.EnrolledStudents;

    Dispatchstudents(Actions.setLoading("ENROLLED_STUDENTS"))
    try {
      const { data, status } = await api.getEnrolledStudents(
        currentPage,
        perPage,
        search,
        filters
      );

      console.log(data, status, "paginateddatahr");
      if (status === 200) {
        Dispatchstudents(
          Actions.getEnrolledStudents(data, "ENROLLED_STUDENTS")
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      Dispatchstudents(Actions.setLoading("ENROLLED_STUDENTS"));
    }
  };

  //  Certificate Students

  const getPaginatedCertificateData = async () => {
    const { currentPage, perPage, search, filters } = studentState?.CertificateStudents;
    console.log(currentPage, perPage, search, filters, "herethefilters")
    Dispatchstudents(Actions.setLoading("CERTIFICATE_STUDENTS"))
    try {
      const { data, status } = await api.getCertificateStudents(
        currentPage,
        perPage,
        search,
        filters
      );

      if (status === 200) {
        console.log(data, status, "ramherenadh");
        Dispatchstudents(
          Actions.getCertificateStudents(data, "CERTIFICATE_STUDENTS")
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      Dispatchstudents(Actions.setLoading("CERTIFICATE_STUDENTS"));
    }
  };

  // Requested Certificate Students

  const getPaginated_Requested_CertificateStudents = async () => {
    const { currentPage, perPage, search, filters } = studentState?.Requested_CertificateStudents;

    console.log(currentPage, perPage, search, filters, "dfjgdhfdhf");

    Dispatchstudents(Actions.setLoading("REQUESTED_CERTIFICATE_STUDENTS"));
    try {
      const { data, status } = await api.getRequested_CertificateStudents(
        currentPage,
        perPage,
        search,
        filters
      );

      console.log(data, status, "seeetheehhhgfd");
      if (status === 200) {
        Dispatchstudents(
          Actions.getRequested_CertificateStudents(
            data,
            "REQUESTED_CERTIFICATE_STUDENTS"
          )
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      Dispatchstudents(Actions.setLoading("REQUESTED_CERTIFICATE_STUDENTS"));
    }
  };

  // Issued Certificates Students

  const get_Issued_CertificateStudents = async () => {
    const { filters, perPage, search, currentPage, } = studentState?.Issued_CerificateStudents;
    Dispatchstudents(Actions.setLoading("ISSUED_CERTIFICATES_STUDENTS"))
    try {
      const { data, status } = await api.getIssuedCertificateStudents(
        currentPage,
        perPage,
        search,
        filters
      );
      console.log(data, "issuedresponce");
      if (status === 200) {
        Dispatchstudents(
          Actions.getIssuedCertificateStudents(
            data,
            "ISSUED_CERTIFICATES_STUDENTS"
          )
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      Dispatchstudents(Actions.setLoading("ISSUED_CERTIFICATES_STUDENTS"));
    }
  };

  // ALL Fee Details Students

  const getPaginatedFeeDetailsStudents = async () => {
    const { currentPage, perPage, search, filters } = studentState?.FeeDetailsStudents;
    Dispatchstudents(Actions.setLoading("FEE_DETAILS_STUDENTS"))
    try {
      const { data, status } = await api.getFeeDetailsStudents(
        currentPage,
        perPage,
        search,
        filters
      );
      if (status === 200) {
        Dispatchstudents(
          Actions.getFeeDetailsStudents(data, "FEE_DETAILS_STUDENTS")
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      Dispatchstudents(Actions.setLoading("FEE_DETAILS_STUDENTS"));
    }
  };

  // No Due Fee Records

  const getNoDueFeeRecordStudents =async()=>{
    const { currentPage, perPage, search, filters } = studentState?.NoDueFeeRecords_Students;
    console.log( currentPage, perPage, search, filters , "dgjfgdgfd")
    Dispatchstudents(Actions.setLoading("NO_DUE_FEE_RECORDS_STUDENTS"))

    try {
      const { data, status } = await api.getNoDueFeeRecordsStudents(
        currentPage,
        perPage,
        search,
        filters
      );
      console.log(data, status, "djfjdsghjdgf");
      if (status === 200) {
        Dispatchstudents(
          Actions.getNoDueFeeRecordStudents(data, "NO_DUE_FEE_RECORDS_STUDENTS")
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      Dispatchstudents(Actions.setLoading("NO_DUE_FEE_RECORDS_STUDENTS"));
    }
  };

  // FeeFollowUps

  const getTodayFeeDetailsStudents =async()=>{
    const { currentPage, perPage, search, filters } = studentState?.TodayFeeDetailsStudents;
    Dispatchstudents(Actions.setLoading("TODAY_FEE_DETAILS_STUDENTS"))
    try{
      const {data, status} =await api.getTodayFeeDetailsStudents( currentPage, perPage, search, filters ); 

      console.log(data,status, "hdgfjyggfgfs" )
      if(status === 200) {
        Dispatchstudents(Actions.setTodayFeeDetailsStudents(data, "TODAY_FEE_DETAILS_STUDENTS"))
      }
    } catch (error) {
      console.log(error);
    } finally {
      Dispatchstudents(Actions.setLoading("TODAY_FEE_DETAILS_STUDENTS"));
    }
  };







  const getOverDueFeeDetailsStudents =async()=>{
    const { currentPage, perPage, search, filters } = studentState?.OverDueFeeDetailsStudents;
    Dispatchstudents(Actions.setLoading("OVER_DUE_FEE_DETAILS_STUDENTS"))
    try{
      const {data, status} =await api.getOverDueFeeDetailsStudents( currentPage, perPage, search, filters ); 

      console.log(data, status, "djhfjgf")
      if(status === 200) {
        Dispatchstudents(Actions.setOverDueFeeDetailsStudents(data, "OVER_DUE_FEE_DETAILS_STUDENTS"))
      }
    } catch (error) {
      console.log(error);
    } finally {
      Dispatchstudents(Actions.setLoading("OVER_DUE_FEE_DETAILS_STUDENTS"));
    }
  };


  const getUpComingFeeDetailsStudents =async()=>{
    const { currentPage, perPage, search, filters } = studentState?.UpComingFeeDetailsStudents;
    Dispatchstudents(Actions.setLoading("UPCOMING_FEE_DETAILS_STUDENTS"))
    try{
      const {data, status} =await api.getUpComingFeeDetailsStudents( currentPage, perPage, search, filters ); 
      console.log(data, status, "dhjfhfdjfhg")
      if(status === 200) {
        Dispatchstudents(Actions.setUpComingFeeDetailsStudents(data, "UPCOMING_FEE_DETAILS_STUDENTS"))
      }
    } catch (error) {
      console.log(error);
    } finally {
      Dispatchstudents(Actions.setLoading("UPCOMING_FEE_DETAILS_STUDENTS"));
    }
  };

  // Dashboard Students
  const getPaginatedDashboardStudents = async () => {
    const { currentPage, perPage, search, filters } =
      studentState.DashboardStudents;
    Dispatchstudents(Actions.setLoading("DASHBOARD_STUDENTS"));
    try {
      const { data, status } = await api.getDashboardStudents(
        currentPage,
        perPage,
        search,
        filters
      );
      if (status === 200) {
        Dispatchstudents(
          Actions.getDashboardStudents(data, "DASHBOARD_STUDENTS")
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      Dispatchstudents(Actions.setLoading("DASHBOARD_STUDENTS"));
    }
  };

  // Create Student Record
  const createStudentRecord = async (studentdata) => {
    console.log("Create------------------- studentdata ", studentdata);
    try {
      const { data, status } = await api.createStudentRecord(studentdata);
      if (status === "200") {
        Dispatchstudents(Actions.createStudentRecord(data, "CREATE_STUDENT"));
      }
      return { data, status };
    } catch (error) {
      console.error(error);
    }
  };
  // Single student id (get single student)

  const getStudent = async (studentId) => {
    console.log(studentId, "dhbcfjdgvfjgf");
    try {
      const { status, data } = await api.getStudentById(studentId);
      console.log(status, data, "redfdggsponcedfg");
      if (status === 200) {
        Dispatchstudents(Actions.getStudentById(data, "GET_SINGLE_STUDENT"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Update Single Student Record
  const UpdateStudent = async (student) => {
    try {
      const { status, data } = await api.UpdateStudentdata(student);
      if (status === 200) {
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPaginatedStudentsData();
    getPaginatedCertificateData();
    getPaginatedFeeDetailsStudents();
    getPaginated_Requested_CertificateStudents();
    getAllStudents();
    get_Issued_CertificateStudents();
    getNoDueFeeRecordStudents();
    getTodayFeeDetailsStudents();
    getOverDueFeeDetailsStudents();
    getUpComingFeeDetailsStudents();
  }, []);

  useEffect(() => {
    getPaginatedFeeDetailsStudents();
  }, [
    studentState?.FeeDetailsStudents?.perPage,
    studentState?.FeeDetailsStudents?.search,
    studentState?.FeeDetailsStudents?.filters,
    studentState?.FeeDetailsStudents?.currentPage,
  ]);

  useEffect(() => {
    getPaginated_Requested_CertificateStudents();
  }, [
    studentState?.Requested_CertificateStudents?.search,
    studentState?.Requested_CertificateStudents?.currentPage,
    studentState?.Requested_CertificateStudents?.perPage,
    studentState?.Requested_CertificateStudents?.filters,
  ]);

  useEffect(() => {
    getPaginatedCertificateData();
  }, [
    studentState?.CertificateStudents?.search,
    studentState?.CertificateStudents?.currentPage,
    studentState?.CertificateStudents?.perPage,
    studentState?.CertificateStudents?.filters,
  ]);

  useEffect(() => {
    getPaginatedStudentsData();
  }, [
    studentState?.EnrolledStudents?.search,
    studentState?.EnrolledStudents?.currentPage,
    studentState?.EnrolledStudents?.perPage,
    studentState?.EnrolledStudents?.filters.fromDate,
    studentState?.EnrolledStudents?.filters.toDate,
    studentState?.EnrolledStudents?.filters.enquiryTakenby,
    studentState?.EnrolledStudents?.filters.modeOfTraining,
    studentState?.EnrolledStudents?.filters.branch,
  ]);

  useEffect(() => {
    get_Issued_CertificateStudents();
  }, [
    studentState?.Issued_CerificateStudents?.search,
    studentState?.Issued_CerificateStudents?.currentPage,
    studentState?.Issued_CerificateStudents?.perPage,
    studentState?.Issued_CerificateStudents?.filters,
  ]);

  useEffect(() => {
    getNoDueFeeRecordStudents();
  },[studentState?.NoDueFeeRecords_Students?.search,
    studentState?.NoDueFeeRecords_Students?.currentPage,
    studentState?.NoDueFeeRecords_Students?.perPage,
    studentState?.NoDueFeeRecords_Students?.filters,
  ])

  useEffect(() => {
    getTodayFeeDetailsStudents();
  }, [
    studentState?.TodayFeeDetailsStudents?.search,
    studentState?.TodayFeeDetailsStudents?.currentPage,
    studentState?.TodayFeeDetailsStudents?.perPage,
    studentState?.TodayFeeDetailsStudents?.filters,
  ]);

  useEffect(() => {
    getOverDueFeeDetailsStudents();
  }, [
    studentState?.OverDueFeeDetailsStudents?.search,
    studentState?.OverDueFeeDetailsStudents?.currentPage,
    studentState?.OverDueFeeDetailsStudents?.perPage,
    studentState?.OverDueFeeDetailsStudents?.filters,
  ]);

  useEffect(() => {
    getUpComingFeeDetailsStudents();
  }, [
    studentState?.UpComingFeeDetailsStudents?.search,
    studentState?.UpComingFeeDetailsStudents?.currentPage,
    studentState?.UpComingFeeDetailsStudents?.perPage,
    studentState?.UpComingFeeDetailsStudents?.filters,
  ]);

  return (
    <StudentsContext.Provider
      value={{
        studentState,
        Dispatchstudents,
        getPaginatedStudentsData,
        createStudentRecord,
        getAllStudents,
        getStudent,
        UpdateStudent,
        getPaginatedCertificateData,
        getPaginated_Requested_CertificateStudents,
        getPaginatedFeeDetailsStudents,
        get_Issued_CertificateStudents,
        getNoDueFeeRecordStudents,
        getTodayFeeDetailsStudents,
        getOverDueFeeDetailsStudents,
        getUpComingFeeDetailsStudents,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsContextProvider;
