export const initialState = {
    dashboard: null,


    TotalEnrollementDetails: {
        filters: {
            fromDate: "",
            toDate: "",
        },
        filterDate: "",



        loading: false,
        // default month Enrollemnts
        totalNoOfEnrollements: null,
        totalBookingAmount: null,
        totalFeeReceived: null,
        totalFeeYetTOReceived: null,

        PaginatedBranchs: [],                  // branch, enrollments, bookingamount, feeReceived, feeYetTOReceived, 
        PaginatedTopRatedCouncellers: [],             // According to the Branch, it will coming,
        // PaginatedDasboardStudents: [],         // According to the Councellers, it will coming,
    },


    BranchwiseCouncellers: {
        sendBranchDetails: "",
        paginatedBranchwiseCouncellers: [],
        loading: false,
    },

    CouncellerwiseStudents: {
        sendCouncellerDetails: "",
        paginatedCouncellerwiseStudents: [],
        loading: false,
    },


    TotalFeeDetails: {
        filters: {
            fromDate: "",
            toDate: "",
        },
        filterDate: "",
        loading: false,
        totalFeeReceived: null,
        totalFeeYetTOReceived: null,
        totalBookingAmount: null,
        PaginatedBranchs: [],                       // total branchs list
        PaginatedTopRatedCouncellers: [],                   // councellers according to  branch(note : get by paticular branch id)
        PaginatedDasboardStudents: [],              // students according to councellers (note : get by councellers id)
    },

    FeeDetailsBranchwiseCouncellers: {
        sendBranchDetails: "",
        paginatedFeeDetailsBranchwiseCouncellers: [],
        loading: false,
    },

    FeeDetailsCouncellerwiseStudents: {
        sendCouncellerDetails: "",
        paginatedFeeDetailsCouncellerwiseStudents: [],
        loading: false,
    },


    TotalUsersInDashboad: {
        loading: false,
        totalNoOfUsers: null,
        totalNoOfActiveUsers: null,
        totalNoOfInActiveUsers: null,
        paginatedBranchesList: [],
        TotalNoOfBranches: null,
    },

    UsersListInBranchWise: {

        branchDetails: "",
        loading: false,
        paginatedUsersListInBranchWise: [],
        totalUsers: null,
    },

    //Enrollment graph
    TotalEnrollmentGraph: {
        loading: false,
        branch:"",
        yearlyEnrollments:null,
        currentmonthEnrollments:null,
        lastMonthEnrollments:null,
        totalEnrollments:null,
        difference:null,
        progressPercentageBranches:null,
        progressEnrollementsCount:null
    },
 


}