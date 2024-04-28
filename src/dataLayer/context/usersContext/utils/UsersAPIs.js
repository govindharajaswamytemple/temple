import axios from "axios"
import { toast } from "react-toastify";

export const getAllUsers =()=>{
    // const url=`${process.env.REACT_APP_API_URL}/list_user`;
    //user/userdata
    const url =`${process.env.REACT_APP_API_URL}/user/userdata`;
    return axios.get(url)
}
export const getPaginatedUsers=(currentPage, perPage, search, filters)=>{
  
    // const url =`${process.env.REACT_APP_API_URL}/list_user?page=${currentPage}&pageSize=${perPage}&search=${search}&filter[branch]=${filters.branch}&filter[profile]=${filters.profile}&filter[department]=${filters.department}`

    const url =`${process.env.REACT_APP_API_URL}/user/list_user?page=${currentPage}&pageSize=${perPage}&search=${search}&filter[branch]=${filters.branch}&filter[profile]=${filters.profile}&filter[department]=${filters.department}`

    return axios.get(url)    
}



export const createUser=(createUser)=>{
    const url="";
    return toast.promise()
    // return axios.post(url, createUser)
}

///user/userswithcounsellors
///user/userswithoutcounsellors

export const getAllCouncellers=()=>{
    const url= `${process.env.REACT_APP_API_URL}/user/userswithcounsellors`;
    return axios.get(url)  
}

export const getAllUsersWithOutCouncellers=()=>{
    const url= `${process.env.REACT_APP_API_URL}/user/userswithoutcounsellors`;
    return axios.get(url)  
}


export const getSingleUserById = (UserId)=>{
    const url= `${process.env.REACT_APP_API_URL}/user/viewuser/32`;
    return axios.get(url)  

}



//http://localhost:3030/user/list_user?page=&pageSize=&search=&filter[branch]=&filter[profile]=&filter[department]=Counsellor