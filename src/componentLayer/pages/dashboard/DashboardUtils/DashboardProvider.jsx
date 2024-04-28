
import React, { useEffect, useReducer } from "react";
import DashboardReducer from "./DashboardReducer";
import { initialState } from "./utils/DasboardConfig";
import * as Actions from "./utils/DashboardActions"
import * as api from "./utils/DashboardAPIs"
import axios from "axios";


const DashboardProvider = () => {

    const [Dashboardstate, DispatchDashboard] = useReducer(DashboardReducer, initialState)
    console.log(Dashboardstate, "hdgfjdfg")

    //  ENROLLMENT BRANCHES

    const getTotalEnrollemtDetails = async () => {
        const { filterDate } = Dashboardstate?.TotalEnrollementDetails;
        console.log(filterDate, "jdkjkdjgdg")
        DispatchDashboard(Actions.setLoading("TOTAL_ENROLLMENT_DETAILS"))
        try {
            const { data, status } = await api.getTotalEnrollmentDeatils(filterDate)
            console.log(data, status, "fhfkjsdghjg")
            if (status === 200) {
                DispatchDashboard(Actions.setTotalEnrollmentDetails(data, "TOTAL_ENROLLMENT_DETAILS"))
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            DispatchDashboard(Actions.setLoading("TOTAL_ENROLLMENT_DETAILS"))
        }
    }

    //  enrollemnt councellers
    const getCouncellersListInTotalEnrollments = async () => {
        const { sendBranchDetails } = Dashboardstate.BranchwiseCouncellers;
        const { filterDate } = Dashboardstate?.TotalEnrollementDetails;

        const mergedObject = { ...sendBranchDetails, ...filterDate };
        console.log(mergedObject, "djfgjdgfdfg")

        DispatchDashboard(Actions.setLoading("TOTAL_ENROLLMENTS_DETAILS_BRANCH_WISE_COUNCELLERS"))

        try {
            const { data, status } = await api.getCouncellersListInTotalEnrollments(mergedObject)

            console.log(data, status, "sjfhdfdsjfg")
            if (status === 200) {
                DispatchDashboard(Actions.setCouncellersInTotalEnrollments(data, "TOTAL_ENROLLMENTS_DETAILS_BRANCH_WISE_COUNCELLERS"))
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            DispatchDashboard(Actions.setLoading("TOTAL_ENROLLMENTS_DETAILS_BRANCH_WISE_COUNCELLERS"))
        }

    }

    //  enrollemt students
    const getStudentsListInTotalEnrollments = async () => {
        const { sendCouncellerDetails } = Dashboardstate.CouncellerwiseStudents;
        const { filterDate } = Dashboardstate?.TotalEnrollementDetails;

        const mergedObject = { ...sendCouncellerDetails, ...filterDate };
        console.log(mergedObject, "sdvdfhdfh")

        DispatchDashboard(Actions.setLoading("TOTAL_ENROLLMENTS_DETAILS_COUNCELLOR_WISE_STUDENTS"))
        try {
            const { data, status } = await api.getStudentsListInTotalEnrollments(mergedObject)
            console.log(data, status, "hgdfjgdjfghgf")
            if (status === 200) {
                DispatchDashboard(Actions.setStudentsInTotalEnrollments(data, "TOTAL_ENROLLMENTS_DETAILS_COUNCELLOR_WISE_STUDENTS"))
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            DispatchDashboard(Actions.setLoading("TOTAL_ENROLLMENTS_DETAILS_COUNCELLOR_WISE_STUDENTS"))
        }
    }


    //  fee details branches
    const getTotalFeeDetails = async () => {
        const { filterDate } = Dashboardstate.TotalFeeDetails;
        console.log(filterDate, "dhfghjdgf")
        DispatchDashboard(Actions.setLoading("TOTAL_FEE_DETAILS"))
        try {
            const { data, status } = await api.getTotalFeeDetails(filterDate)
            console.log(data, status, "dkfjdhgfjfgv")
            if (status === 200) {
                DispatchDashboard(Actions.setTotalFeeDetails(data, "TOTAL_FEE_DETAILS"))
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            DispatchDashboard(Actions.setLoading("TOTAL_FEE_DETAILS"))
        }
    }

    //  feeDetails councellors
    const getCouncellorsListInFeeDetails = async () => {
        const { sendBranchDetails } = Dashboardstate?.FeeDetailsBranchwiseCouncellers;
        const { filterDate } = Dashboardstate.TotalFeeDetails;
        const mergedObject = { ...sendBranchDetails, ...filterDate }
        console.log(mergedObject, "sdhdjdsg")

        DispatchDashboard(Actions.setLoading("FEE_DETAILS_BRANCH_WISE_COUNCELLORS"))
        try {
            const { data, status } = await api.getCouncellorsListInFeeDetails(mergedObject);
            if (status === 200) {
                DispatchDashboard(Actions.setCouncellorsInFeeDetails(data, "FEE_DETAILS_BRANCH_WISE_COUNCELLORS"))
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            DispatchDashboard(Actions.setLoading("FEE_DETAILS_BRANCH_WISE_COUNCELLORS"))
        }
    }

    // fee details students

    const getStudentsListInFeeDetails = async () => {
        const { sendCouncellerDetails } = Dashboardstate?.FeeDetailsCouncellerwiseStudents;
        const { filterDate } = Dashboardstate.TotalFeeDetails;
        const mergedObject = { ...sendCouncellerDetails, ...filterDate }

        console.log(mergedObject, "hgdfhgdfhgf")

        DispatchDashboard(Actions.setLoading("FEE_DETAILS_COUNCELLORS_WISE_STUDENTS"))

        try {
            const { data, status } = await api.getStudentsListInFeeDetails(mergedObject);
            if (status === 200) {
                DispatchDashboard(Actions.setStudentsListInFeeDetails(data, "FEE_DETAILS_COUNCELLORS_WISE_STUDENTS"))
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            DispatchDashboard(Actions.setLoading("FEE_DETAILS_COUNCELLORS_WISE_STUDENTS"))
        }

    }


    const getAllBranchesListOfTotalUsers = async () => {
        DispatchDashboard(Actions.setLoading("TOTAL_USERS_BRACHES_LIST"))
        try {
            const { data, status } = await api.getAllBranchesListOfTotalUsers();
            console.log(data, status, "vdshfghgfh")
            if (status === 200) {
                DispatchDashboard(Actions.setAllBranchesListOfTotalUsers(data, "TOTAL_USERS_BRACHES_LIST"))
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            DispatchDashboard(Actions.setLoading("TOTAL_USERS_BRACHES_LIST"))
        }
    }


    const getAllBranchwiseUsersList = async () => {
        const { branchDetails } = Dashboardstate?.UsersListInBranchWise
        DispatchDashboard(Actions.setLoading("ALL_USERS_LIST_IN_BRANCH_WISE"))
        try {
            const { data, status } = await api.getAllBranchwiseUsersList(branchDetails);
            console.log(data, status, "vdshfgffghgfh")
            if (status === 200) {
                DispatchDashboard(Actions.setAllBranchwiseUsersList(data, "ALL_USERS_LIST_IN_BRANCH_WISE"))
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            DispatchDashboard(Actions.setLoading("ALL_USERS_LIST_IN_BRANCH_WISE"))
        }
    }


    // enrollment Graph

    const totalEnrollmentGraph =async()=>{
        const{branch} =Dashboardstate?.TotalEnrollmentGraph;
        DispatchDashboard(Actions.setLoading("TOTAL_ENROLLMENTS_GRAPH"))
        try{
            const {status, data} = await api.getTotalEnrollemetGraph(branch)
            console.log(status,data, "dgdfhfhdf")
            if(status === 200){
                DispatchDashboard(Actions.setTotalEnrollemetGraph(data, "TOTAL_ENROLLMENTS_GRAPH"))
            }
        }
        catch(error){
            console.log(error)
        }
        finally{
            DispatchDashboard(Actions.setLoading("TOTAL_ENROLLMENTS_GRAPH"))
        }
    }

        


    useEffect(() => {
        getTotalEnrollemtDetails();
        getTotalFeeDetails();
        getAllBranchesListOfTotalUsers();
        totalEnrollmentGraph();
    }, [])

    useEffect(() => {
        getTotalEnrollemtDetails();
    }, [Dashboardstate?.TotalEnrollementDetails?.filterDate])

    useEffect(() => {
        getCouncellersListInTotalEnrollments();
    }, [Dashboardstate?.BranchwiseCouncellers?.sendBranchDetails,
    Dashboardstate?.TotalEnrollementDetails?.filterDate,
    ])

    useEffect(() => {
        getStudentsListInTotalEnrollments();
    }, [Dashboardstate?.CouncellerwiseStudents?.sendCouncellerDetails,
    Dashboardstate?.TotalEnrollementDetails?.filterDate,
    ])


    useEffect(()=>{
        totalEnrollmentGraph();
    },[Dashboardstate?.TotalEnrollmentGraph?.branch])



    // Total FeeDetails  

    useEffect(() => {
        getTotalFeeDetails();
    }, [Dashboardstate?.TotalFeeDetails?.filterDate])

    useEffect(() => {
        getCouncellorsListInFeeDetails();
    }, [Dashboardstate?.FeeDetailsBranchwiseCouncellers?.sendBranchDetails,
    Dashboardstate?.TotalFeeDetails?.filterDate])


    useEffect(() => {
        getStudentsListInFeeDetails();
    }, [Dashboardstate?.FeeDetailsCouncellerwiseStudents?.sendCouncellerDetails,
    Dashboardstate?.TotalFeeDetails?.filterDate])




    // total users

    useEffect(() => {
        getAllBranchwiseUsersList();
    }, [Dashboardstate?.UsersListInBranchWise?.branchDetails])


    return {
        Dashboardstate,
        DispatchDashboard,
        getTotalEnrollemtDetails,
        getTotalFeeDetails,
        getCouncellersListInTotalEnrollments,
        getStudentsListInTotalEnrollments,
        getCouncellorsListInFeeDetails,
        getAllBranchesListOfTotalUsers,
        getAllBranchwiseUsersList,
        getStudentsListInFeeDetails,
        totalEnrollmentGraph,
    }
}

export default DashboardProvider;