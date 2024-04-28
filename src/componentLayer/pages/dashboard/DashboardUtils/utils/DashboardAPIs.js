import axios from "axios";

// total enrollments default  branch list
export const getTotalEnrollmentDeatils = async (filterDate) => {
    console.log(filterDate, "sdhgasjfehf")
    // axios.put(`${process.env.REACT_APP_API_URL}/updatestudentdata/${id}`, student)
    const url = `${process.env.REACT_APP_API_URL}/dashboard/allbranchesfee`;
    return axios.post(url,filterDate)  
}

// total enrollements councellers list
export const getCouncellersListInTotalEnrollments =async(sendBranchDetails)=>{

    console.log(sendBranchDetails, "dfdsjgfjsdgf")
     const url = `${process.env.REACT_APP_API_URL}/dashboard/branchecounsellorsfee`;
//   const url = `${process.env.REACT_APP_API_URL}/dashboard/allbranchesfee`;
    return axios.post(url,sendBranchDetails)
}

// total Enrollements student list
export const getStudentsListInTotalEnrollments =async(sendCouncellerDetails)=>{

    console.log(sendCouncellerDetails, "dfdjghhfdgf")

    const url=`${process.env.REACT_APP_API_URL}/dashboard/counsellorstudentfee`;
    return axios.post(url, sendCouncellerDetails)
}


// enrollment Graph
export const  getTotalEnrollemetGraph=async(branch)=>{
    console.log(branch, "dhfjhgf")
    const url =`${process.env.REACT_APP_API_URL}/dashboard/allbranchesyearlyenrollmentsgraph`;
    return axios.post(url,branch)
}


//-------------------- default fee details  branch list----------------------------

export const getTotalFeeDetails = async (filters) => {
    // axios.put(`${process.env.REACT_APP_API_URL}/updatestudentdata/${id}`, student)
    const url = "";
    return axios.put(url)  
}

// fee details  councellers list
export const getCouncellorsListInFeeDetails =async(sendBranchDetails)=>{
    const url="";
    return axios.get(url)
}

// fee details students list
export const getStudentsListInFeeDetails =async(sendCouncellerDetails)=>{
    const url="";
    return axios.get(url)
}

// ---------------------Total users Branches List------------------------------

export const getAllBranchesListOfTotalUsers= async()=>{
    const url=`${process.env.REACT_APP_API_URL}/dashboard/brancheswishusers`;
    return axios.get(url);
}

export const getAllBranchwiseUsersList =async(branchDetails)=>{
    console.log(branchDetails, "dhgfdfdfs")
    const url=`${process.env.REACT_APP_API_URL}/dashboard/singlebranchusers`;
    return axios.post(url,branchDetails);
}




