import * as ActionTypes from "./utils/DashboardActionTypes"

const DashboardReducer = (state, action) => {

    console.log(state, "dashboardReducerdffdf")
    switch (action.type) {

        case ActionTypes.SET_FILTER_DATE:
            if (action?.payload?.context === "TOTAL_ENROLLMENTS_DETAILS") {

                console.log(action?.payload?.data, action.payload, "dgjhgfdfsdf")

                return {
                    ...state,
                    TotalEnrollementDetails: {
                        ...state.TotalEnrollementDetails,
                        filterDate: action?.payload?.data
                    }
                }

            }
            else if (action?.payload?.context === "TOTAL_FEE_DETAILS") {
                console.log(action?.payload?.data, action.payload, "dgjhgfgfdfsdf")
                return {
                    ...state,
                    TotalFeeDetails: {
                        ...state.TotalFeeDetails,
                        filterDate: action?.payload?.data
                    }
                }
            }
            break;

        case ActionTypes.SET_BRANCH_DETAILS:

            if (action?.payload?.context === "TOTAL_ENROLLMENTS_DETAILS_BRANCH_WISE_COUNCELLERS") {
                console.log(action?.payload?.data, "lsjkfjkdf")

                return {
                    ...state,
                    BranchwiseCouncellers: {
                        ...state.BranchwiseCouncellers,
                        sendBranchDetails: action?.payload?.data
                    }
                }
            }


            else if (action?.payload?.context === "ALL_USERS_LIST_IN_BRANCH_WISE") {
                console.log(action?.payload?.data, "lsjkfjkdghf")
                return {
                    ...state,
                    UsersListInBranchWise: {
                        ...state.UsersListInBranchWise,
                        branchDetails: action?.payload?.data
                    }
                }
            }

            else if (action?.payload?.context === "FEE_DETAILS_BRANCH_WISE_COUNCELLORS") {
                return {
                    ...state,
                    FeeDetailsBranchwiseCouncellers: {
                        ...state.FeeDetailsBranchwiseCouncellers,
                        sendBranchDetails: action?.payload?.data
                    }
                }
            }

            else if (action?.payload?.context === "TOTAL_ENROLLMENTS_GRAPH") {
                console.log(action?.payload?.data, action.payload, "dgjhgfcsfgfdfsdf")

                return {
                    ...state,
                    TotalEnrollmentGraph: {
                        ...state.TotalEnrollmentGraph,
                        branch: action?.payload?.data
                    }
                }
            }

            break;

        case ActionTypes.SET_COUNCELLOR_DETAILS:

            if (action?.payload?.context === "TOTAL_ENROLLMENTS_DETAILS_COUNCELLOR_WISE_STUDENTS") {
                console.log(action?.payload?.data, "dfdfgff")
                return {
                    ...state,
                    CouncellerwiseStudents: {
                        ...state.CouncellerwiseStudents,
                        sendCouncellerDetails: action?.payload?.data
                    }
                }
            }

            else if (action?.payload?.context === "FEE_DETAILS_COUNCELLORS_WISE_STUDENTS") {
                return {
                    ...state,
                    FeeDetailsCouncellerwiseStudents: {
                        ...state.FeeDetailsCouncellerwiseStudents,
                        sendCouncellerDetails: action?.payload?.data
                    }
                }

            }
            break;



        case ActionTypes.SET_LOADING:
            if (action?.payload?.context === "TOTAL_ENROLLMENT_DETAILS") {
                return {
                    ...state,
                    TotalEnrollementDetails: {
                        ...state.TotalEnrollementDetails,
                        loading: !state?.TotalEnrollementDetails?.loading
                    }
                }
            }

            else if (action?.payload?.context === "TOTAL_FEE_DETAILS") {
                return {
                    ...state,
                    TotalFeeDetails: {
                        ...state.TotalFeeDetails,
                        loading: !state?.TotalFeeDetails?.loading
                    }
                }
            }

            else if (action?.payload?.context === "TOTAL_ENROLLMENTS_DETAILS_BRANCH_WISE_COUNCELLERS")
                return {
                    ...state,
                    BranchwiseCouncellers: {
                        ...state.BranchwiseCouncellers,
                        loading: !state?.BranchwiseCouncellers?.loading
                    }
                }

            else if (action?.payload?.context === "TOTAL_ENROLLMENTS_DETAILS_COUNCELLOR_WISE_STUDENTS")
                return {
                    ...state,
                    CouncellerwiseStudents: {
                        ...state.CouncellerwiseStudents,
                        loading: !state?.CouncellerwiseStudents?.loading
                    }
                }

            else if (action?.payload?.context === "FEE_DETAILS_BRANCH_WISE_COUNCELLORS") {
                return {
                    ...state,
                    FeeDetailsBranchwiseCouncellers: {
                        ...state.FeeDetailsBranchwiseCouncellers,
                        loading: !state?.FeeDetailsBranchwiseCouncellers?.loading

                    }

                }
            }

            else if (action?.payload?.context === "FEE_DETAILS_COUNCELLORS_WISE_STUDENTS") {
                return {
                    ...state,
                    FeeDetailsCouncellerwiseStudents: {
                        ...state.FeeDetailsCouncellerwiseStudents,
                        loading: !state?.FeeDetailsCouncellerwiseStudents?.loading
                    }
                }
            }

            else if (action?.payload?.context === "TOTAL_USERS_BRACHES_LIST") {
                return {
                    ...state,
                    TotalUsersInDashboad: {
                        ...state.TotalUsersInDashboad,
                        loading: !state?.TotalUsersInDashboad?.loading
                    }
                }
            }

            else if (action?.payload?.context === "ALL_USERS_LIST_IN_BRANCH_WISE") {
                return {
                    ...state,
                    UsersListInBranchWise: {
                        ...state.UsersListInBranchWise,
                        loading: !state?.UsersListInBranchWise?.loading
                    }
                }
            }

            else if (action?.payload?.context === "TOTAL_ENROLLMENTS_GRAPH") {
                return {
                    ...state,
                    TotalEnrollmentGraph: {
                        ...state.TotalEnrollmentGraph,
                        loading: !state.TotalEnrollmentGraph.loading
                    }
                }
            }

            break;

        case ActionTypes.SET_PAGINATED_TOTAL_USERS:
            if (action?.payload?.context === "TOTAL_USERS_BRACHES_LIST") {
                const reducerData = action?.payload?.data;
                return {
                    ...state,
                    TotalUsersInDashboad: {
                        ...state?.TotalUsersInDashboad,
                        paginatedBranchesList: reducerData?.branches,
                        totalNoOfUsers: reducerData?.overallUsers,

                    }
                }
            }

            else if (action?.payload?.context === "ALL_USERS_LIST_IN_BRANCH_WISE") {
                const reducerData = action?.payload?.data;
                console.log(reducerData, "dhfjhdhgfjdgf")
                return {
                    ...state,
                    UsersListInBranchWise: {
                        ...state?.UsersListInBranchWise,
                        paginatedUsersListInBranchWise: reducerData?.users,
                        totalUsers: reducerData?.overallUsers,
                    }
                }
            }
            break;

        case ActionTypes.SET_PAGINATED_TOTAL_ENROLLMENT_DETAILS:

            if (action?.payload?.context === "TOTAL_ENROLLMENT_DETAILS") {
                const reducerData = action?.payload?.data;
                console.log(reducerData, "reducerDatadjdfh")

                return {
                    ...state,
                    TotalEnrollementDetails: {
                        ...state.TotalEnrollementDetails,
                        PaginatedBranchs: reducerData?.branches,                  // branch, enrollments, bookingamount, feeReceived, feeYetTOReceived, 
                        PaginatedTopRatedCouncellers: reducerData?.topEnquiryTakenBy,             // According to the Branch, it will coming,
                        totalNoOfEnrollements: reducerData?.overallEnrollments,
                        totalBookingAmount: reducerData?.overallFinalTotal,
                        totalFeeReceived: reducerData?.overallFeeReceived,
                        totalFeeYetTOReceived: reducerData?.overallFeeYetToReceive,
                    }
                }
            }


            else if (action?.payload.context === "TOTAL_ENROLLMENTS_DETAILS_BRANCH_WISE_COUNCELLERS") {
                const reducerData = action?.payload?.data;
                console.log(reducerData, "sdjgf")

                return {
                    ...state,
                    BranchwiseCouncellers: {
                        ...state.BranchwiseCouncellers,
                        paginatedBranchwiseCouncellers: reducerData?.enquirytakenbyData
                    }
                }
            }

            else if (action?.payload.context === "TOTAL_ENROLLMENTS_DETAILS_COUNCELLOR_WISE_STUDENTS") {
                const reducerData = action?.payload?.data;
                console.log(reducerData, "svdhfdhgf")
                return {
                    ...state,
                    CouncellerwiseStudents: {
                        ...state.CouncellerwiseStudents,
                        paginatedCouncellerwiseStudents: reducerData?.students
                    }
                }
            }

            else if (action?.payload.context === "TOTAL_ENROLLMENTS_GRAPH") {
                const reducerData = action?.payload?.data;
                console.log(reducerData, "shgfjgf")
                return {
                    ...state,
                    TotalEnrollmentGraph: {
                        ...state.TotalEnrollmentGraph,
                        yearlyEnrollments: reducerData?.yearlyEnrollments,
                        currentmonthEnrollments: reducerData?.currentEnrollments,
                        lastMonthEnrollments: reducerData?.lastMonthEnrollments,
                        totalEnrollments: reducerData?.totalEnrollments,
                        difference: reducerData?.difference,
                        progressPercentageBranches: [reducerData?.branchEnrollments],
                        progressEnrollementsCount: reducerData?.totalYearlyEnrollmentsCount

                    }
                }
            }

            break;

        case ActionTypes.SET_PAGINATED_FEE_DETAILS:

            if (action?.payload.context === "TOTAL_FEE_DETAILS") {
                const reducerData = action?.payload?.data;
                return {
                    ...state,
                    TotalFeeDetails: {
                        ...state.TotalFeeDetails,
                        PaginatedBranchs: reducerData?.branch,
                        PaginatedTopRatedCouncellers: reducerData?.councellers,
                        totalBookingAmount: reducerData?.totalBookingAmount,
                        totalFeeReceived: reducerData?.totalFeeReceived,
                        totalFeeYetTOReceived: reducerData?.totalFeeYetTOReceived,
                    }
                }

            }


            if (action?.payload.context === "FEE_DETAILS_BRANCH_WISE_COUNCELLORS") {
                const reducerData = action?.payload?.data;

                return {
                    ...state,
                    FeeDetailsBranchwiseCouncellers: {
                        ...state.FeeDetailsBranchwiseCouncellers,
                        paginatedFeeDetailsBranchwiseCouncellers: reducerData?.councellerlist
                    }
                }
            }

            if (action?.payload.context === "FEE_DETAILS_COUNCELLORS_WISE_STUDENTS") {
                const reducerData = action?.payload?.data;

                return {
                    ...state,
                    FeeDetailsCouncellerwiseStudents: {
                        ...state.FeeDetailsCouncellerwiseStudents,
                        paginatedFeeDetailsCouncellerwiseStudents: reducerData?.studentlist
                    }
                }
            }

            break;






        default:
            return state;
    }

}

export default DashboardReducer;