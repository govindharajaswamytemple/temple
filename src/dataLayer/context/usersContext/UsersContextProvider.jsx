import React, { createContext, useEffect, useReducer } from "react";

import { InitialState } from "./utils/UsersInitialState";

import * as Api from "./utils/UsersAPIs";
import * as Actions from "./utils/UsersActions"

import axios from "axios";
import UsersReducer from "./UsersReducer";

export const UsersContext = createContext();

const UserContextProvider =({children})=>{
    const [UsersState, DispatchUsers] = useReducer(UsersReducer,InitialState)
    console.log( UsersState, "UsersState99")

    const getAllUsers=async()=>{
        try{
            const {data, status}=await Api.getAllUsers();
            console.log(data, status, "hellosdnbf")
            if(status === 200){
                DispatchUsers(Actions.setAllUsers(data))
                console.log(data, "dndvbjdvb")
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const  getAllCouncellers =async()=>{
        try{
            const {data, status}= await Api.getAllCouncellers();
            if(status === 200){
                console.log(data, status, "gdhfgdhghgc")
                DispatchUsers(Actions.setAllCouncellers(data))
                console.log(data, "dndvbjdvb")
            }
        }
        catch(error){
            console.log(error)
        }
    }

    const  getAllUsersWithOutCouncellers =async()=>{
        try{
            const {data, status}= await Api.getAllUsersWithOutCouncellers();
            console.log(data, status, "hellosdsdffnbf")
            if(status === 200){
                DispatchUsers(Actions.setAllUsersWithOutCouncellers(data))
                console.log(data, "dndvbjdvb")
            }
        }
        catch(error){
            console.log(error)
        }
    }

    
    
    const PaginatedUsers = async () => {
        const {currentPage, perPage, search,filters} =UsersState.EnrolledUsers;
        DispatchUsers(Actions.setLoading("ENROLLED_USERS"))
        try{
            const{status, data}=await Api.getPaginatedUsers(currentPage, perPage, search,filters);
            console.log("responsedataddgfgfg",status, data)
            if(status === 200){
                DispatchUsers(Actions.setPaginatedUsers(data, "ENROLLED_USERS"))
            }
        }
        catch(error) {
            console.log(error)
        }
        finally{
            DispatchUsers(Actions.setLoading("ENROLLED_USERS"))
        }
    }

    const CreateUser =async(userdata)=>{
        console.log(userdata, "userdata created")
        try{
            const {data, status}=await Api.createUser(userdata);
            getAllUsers()
            PaginatedUsers()
            if(status===200){
                DispatchUsers(Actions.createUser(data, "ENROLLED_USERS"))
                getAllUsers()
                PaginatedUsers()
            }
        }
        catch(error){
            console.log(error)
        }
    }


    const getUserbyId = async(userId)=>{

        try{
            const{status, data}=await Api.getSingleUserById(userId);
            console.log("responsedatdgaddgfgfg",status, data)
            if(status === 200){
                DispatchUsers(Actions.setSingleUser(data, "SINGLE_ENROLLED_USERS"))
            }
        }
        catch(error) {
            console.log(error)
        }

    }

    


    

 useEffect(()=>{
    getAllUsers()
    PaginatedUsers()
    getAllCouncellers();
    getAllUsersWithOutCouncellers();
    getUserbyId();
  
 },[])



 useEffect(()=>{
    
    PaginatedUsers()
 },[UsersState?.EnrolledUsers?.search,
    UsersState?.EnrolledUsers?.currentPage,
    UsersState?.EnrolledUsers?.perPage,
    UsersState?.EnrolledUsers?.filters,
    UsersState?.EnrolledUsers?.filters.branch,
    UsersState?.EnrolledUsers?.filters.profile,
    UsersState?.EnrolledUsers?.filters.department
])


    return(
        <UsersContext.Provider value={{UsersState,DispatchUsers,getAllUsers,PaginatedUsers,CreateUser,getAllCouncellers,getAllUsersWithOutCouncellers}}>
            {children}
        </UsersContext.Provider>
    )
}
export default UserContextProvider;





