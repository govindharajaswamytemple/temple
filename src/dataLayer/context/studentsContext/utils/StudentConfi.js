export const InitialState ={
    
    TotalStudents:[],

    singleStudentData:null,

    // Enrolled students
    
    EnrolledStudents:{
        PaginatedStudents:[],
        filters:{
            fromDate:"",
            toDate:"",
            modeOfTraining:"",
            branch:"", 
            enquiryTakenBy:"",
        },
        searchResultStudents:null,
        perPage:10,
        totalStudents:null,
        totalPages:null,
        loading:false,
        startStudent:null,
        endStudent:null,
        search:"",
        currentPage:1,
    },

    // No Due Records

    NoDueFeeRecords_Students:{
        PaginatedNoDueFeeRecords_Students:[],
        filters:{
            fromDate:"",
            toDate:"",
            branch:"",
            modeOfTraining:"",           
        },
        currentPage:1,
        perPage:10,
        totalStudents:null,
        totalPages:null,
        searchResultStudents:null,
        loading:false,
        startStudent:null,
        endStudent:null,
        search:"",
    },

    // Certificate Students

    CertificateStudents:{
        PaginatedCertificateStudents:[],
        filters:{
            fromDate:"",
            toDate:"",
            branch:"",
            course:"",
            enquiryTakenby:"",
            certificateStatus:""            
        },
        currentPage:1,
        perPage:10,
        searchResultStudents:null,
        totalStudents:null,
        totalPages:null,
        loading:false,
        startStudent:null,
        endStudent:null,
        search:"",
    },

    // Requested Certificate

    Requested_CertificateStudents:{
        Paginated_Requested_CertificateStudents:[],
        filters:{
            fromDate:"",
            toDate:"",
            branch:"",
            course:"",
        },
        currentPage:1,
        perPage:10,
        filteredSearchstudents:null,
        totalStudents:null,
        totalPages:null,
        loading:false,
        startStudent:null,
        endStudent:null,
        search:"",
    },

    // Issued Ceritificate

    Issued_CerificateStudents:{
        Paginated_Issued_CerificateStudents:[],
        filters:{
            fromDate:"",
            toDate:"",
            course:"",
            branch:"", 
        },
        searchResultStudents:null,
        perPage:10,
        totalStudents:null,
        totalPages:null,
        loading:false,
        startStudent:null,
        endStudent:null,
        search:"",
        currentPage:1,
    },

    // Fee Details

    FeeDetailsStudents:{
        PaginatedFeeDetailsStudents:[],
        filters:{
            fromDate:"",
            toDate:"",
            branch:"",
            modeOfTraining:"",   
                   
        },
        search:"",
        currentPage:1,
        perPage:10,
        totalStudents:null,
        totalPages:null,
        searchResultStudents:null,
        loading:false,
        startStudent:null,
        endStudent:null,
       
    },

    // Dashboard Students

    DashboardStudents:{
        PaginatedDashboardStudents:[],
        filters:{
            fromDate:"",
            toDate:"",
            branch:"",
            modeOfTraining:"",            
        },
        currentPage:1,
        perPage:10,
        filteredSearchstudents:null,
        totalStudents:null,
        totalPages:null,
        loading:false,
        startStudent:null,
        endStudent:null,
        search:"",

    },

    TodayFeeDetailsStudents:{
        PaginatedTodayFeeDetails:[],
        filters:{
            fromDate:"",
            toDate:"",
            course:"",
            branch:"",    
        },
        searchResultStudents:null,
        perPage:10,
        totalStudents:null,
        totalPages:null,
        loading:false,
        startStudent:null,
        endStudent:null,
        search:"",
        currentPage:1,
    },

    OverDueFeeDetailsStudents:{
        PaginatedOverDueFeeDetails:[],
        filters:{
            fromDate:"",
            toDate:"",
            course:"",
            branch:"",    
        },
        searchResultStudents:null,
        perPage:10,
        totalStudents:null,
        totalPages:null,
        loading:false,
        startStudent:null,
        endStudent:null,
        search:"",
        currentPage:1,
    },

    UpComingFeeDetailsStudents:{
        PaginatedUpComingFeeDetails:[],
        filters:{
            fromDate:"",
            toDate:"",
            course:"",
            branch:"",    
        },
        searchResultStudents:null,
        perPage:10,
        totalStudents:null,
        totalPages:null,
        loading:false,
        startStudent:null,
        endStudent:null,
        search:"",
        currentPage:1,
    },

}