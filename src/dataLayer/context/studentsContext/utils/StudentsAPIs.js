import { current } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";


export const getAllStudents = async () => {
    const url = `${process.env.REACT_APP_API_URL}/student/getstudent_data`
    return axios.get(url)
};

export const getEnrolledStudents = async (currentPage, perPage, search, filters) => {

    console.log(filters, "hjdbsjbvfj")

    // {{local}}/student/list_students?page=1&pageSize=2&search=&filter[admissionFromDate]=&filter[admissionToDate]&filter[modeOfTraining]&filter[branch]=&filter[enquiryTakenby]

    //&filter[enquiryTakenby]=${filters.enquiryTakenby} - want to add enquiry taken by

    const url = `${process.env.REACT_APP_API_URL}/student/list_students?page=${currentPage}&pageSize=${perPage}&search=${search}&filter[admissionFromDate]=${filters.fromDate}&filter[admissionToDate]=${filters.toDate}&filter[modeOfTraining]=${filters.modeOfTraining}&filter[branch]=${filters.branch}`

    return axios.get(url)
}


export const getCertificateStudents = async (currentPage, perPage, search, filters) => {

    console.log(currentPage, perPage, search, filters, "seethisree")
    //add filter[enquiryTakenby]=${filters.enquiryTakenby}

    const url = `${process.env.REACT_APP_API_URL}/student/list_students?page=${currentPage}&pageSize=${perPage}&search=${search}&filter[admissionFromDate]=${filters.fromDate}&filter[admissionToDate]=${filters.toDate}&filter[branch]=${filters.branch}&filter[course]=${filters.course}&filter[certificateStatus]=${filters.certificateStatus}`

    return axios.get(url)

}

export const getRequested_CertificateStudents = async (currentPage, perPage, search, filters) => {

    console.log(currentPage, perPage, search, filters, "hdghdgfjdgfd")
    ///sc/requiestedcertificates?page=1&pageSize=&search=Shikha Soni&filter[branch]=&filter[course]=

    const url = `${process.env.REACT_APP_API_URL}/sc/requiestedcertificates?page=${currentPage}&pageSize=${perPage}&search=${search}&filter[branch]=${filters.branch}&filter[course]=${filters.course}`
    return axios.get(url)
}

export const getIssuedCertificateStudents = async (currentPage, perPage, search, filters) => {

    console.log(currentPage, perPage, search, filters, "jgefefytefyefd")

    ///sc/issuedcertificates?page=1&pageSize=&search=&filter[branch]=&filter[course]=
    const url = `${process.env.REACT_APP_API_URL}/sc/issuedcertificates?page=${currentPage}&pageSize=${perPage}&search=${search}&filter[branch]=${filters.branch}&filter[course]=${filters.course}`
    return axios.get(url)
}

export const getFeeDetailsStudents = async (currentPage, perPage, search, filters) => {

    const url = `${process.env.REACT_APP_API_URL}/student/list_students?page=${currentPage}&pageSize=${perPage}&search=${search}&filter[admissionFromDate]=${filters.fromDate}&filter[admissionToDate]=${filters.toDate}&filter[modeOfTraining]=${filters.modeOfTraining}&filter[branch]=${filters.branch}`
    return axios.get(url)

}
export const getDashboardStudents = async (currentPage, perPage, search, filters) => {
    const url = "";
    return axios.get(url)
}


export const createStudentRecord = async (studentdata) => {
    //reqiure toast
    const url = `${process.env.REACT_APP_API_URL}/student_form`;

    return await toast.promise(
        axios.post(url, studentdata),
        {
            pending: 'verifying data',
            success: {
                render(data) {
                    return `Student Enrolled Successfully`
                }
            },
            error: 'Error in creating Student Record 🤯',
        }
    )
    // return axios.post(url, studentdata)   
}

export const getStudentById = async (studentId) => {
    // const url=`${process.env.REACT_APP_API_URL}/getstudent_data/${studentId}`
    const url =`${process.env.REACT_APP_API_URL}/student/viewstudentdata/${studentId}`
    return axios.get(url)
}


export const UpdateStudentdata = async (student) => {
    // axios.put(`${process.env.REACT_APP_API_URL}/updatestudentdata/${id}`, student)
    //reqire toast
    const url = "";
    return axios.put(url, student)  
}


export const getNoDueFeeRecordsStudents = async (currentPage, perPage, search, filters) => {

    ///fee/noduefeerecords?page=1&pageSize=&search=&filter[branch]=&filter[enquiryTakenby]&filter[fromDate]=&filter[toDate]=
    //modeOfTraining

    //

    const url = `${process.env.REACT_APP_API_URL}/fee/noduefeerecords?page=${currentPage}&pageSize=${perPage}&search=${search}&filter[branch]=${filters.branch}&filter[fromDate]=${filters.fromDate}&filter[toDate]=${filters.toDate}&filter[modeOfTraining]=${filters.modeOfTraining}`

     return axios.get(url)
}


export const getTodayFeeDetailsStudents = async (currentPage, perPage, search, filters) => {

    const url =`${process.env.REACT_APP_API_URL}/fee/todayduefeerecords?page=${currentPage}&pageSize=${perPage}&search=${search}&filter[branch]=${filters.branch}&filter[course]=${filters.course}&filter[fromDate]=${filters.fromDate}&filter[toDate]=${filters.toDate}`;
    return axios.get(url)
}


export const getOverDueFeeDetailsStudents = async (currentPage, perPage, search, filters) => {
    const url =`${process.env.REACT_APP_API_URL}/fee/overduefeerecords?page=${currentPage}&pageSize=${perPage}&search=${search}&filter[branch]=${filters.branch}&filter[course]=${filters.course}&filter[fromDate]=${filters.fromDate}&filter[toDate]=${filters.toDate}`;
    return axios.get(url)
}


export const getUpComingFeeDetailsStudents = async (currentPage, perPage, search, filters) => {
    const url =`${process.env.REACT_APP_API_URL}/fee/upcomingduefeerecords?page=${currentPage}&pageSize=${perPage}&search=${search}&filter[branch]=${filters.branch}&filter[course]=${filters.course}&filter[fromDate]=${filters.fromDate}&filter[toDate]=${filters.toDate}`;
    return axios.get(url)
}



