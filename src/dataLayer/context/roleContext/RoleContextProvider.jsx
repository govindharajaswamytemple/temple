import React, { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import RoleReducer from "./RoleReducer";
import axios from "axios";

export const RoleContext = createContext();

const RoleContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const initialState = {

        RolesData: {
            paginatedRolesData: [],
            searchResultRoles: null,
            pageSize: 10,
            totalRolesCount: null,
            totalPages: null,
            loading: false,
            startRole: null,
            endRole: null,
            search: "",
            page: 1,
            AllRoles:null,
        },
    }



    const [RoleState, DispatchRoleState] = useReducer(RoleReducer, initialState);
  

    const getAllPaginatedRoles = async () => {
        DispatchRoleState({ type: "SET_LOADING" })
        const {pageSize,search,page} =RoleState?.RolesData;
        const pageSizeobj = {pageSize}
        const searchobj ={search}
        const pageobj ={page}

        const mergObj = {...pageSizeobj, ...searchobj, ...pageobj}
        console.log(mergObj, "dhgfjdf")
    
        try {
            const { data, status } = await axios.post(`${process.env.REACT_APP_API_URL}/roles/getroles`,mergObj);
            
            console.log(data, status, "dfdhfjgjf")
            if (status === 200) {
                console.log(data, "getroledata")
                DispatchRoleState({ type: "SET_PAGINATED_ROLES", payload: data })
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            DispatchRoleState({ type: "SET_LOADING" })
        }
    }

    const createRole = async (roledetails) => {
        console.log(roledetails, "roledetails")
        try {
            const { data, status } = await axios.post();
            console.log(data, "axiosdata")
            if (status === 200) {
                DispatchRoleState({ type: "CREATE_ROLE", payload: data })
                getAllPaginatedRoles();
            }

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        createRole();
        getAllPaginatedRoles();
    }, [])

    useEffect(() => {
        getAllPaginatedRoles();
    }, [RoleState.RolesData.search,
    RoleState.RolesData?.page,
    RoleState.RolesData?.pageSize,
    ])


    return (
        <RoleContext.Provider value={{ RoleState, DispatchRoleState, getAllPaginatedRoles, createRole }}>
            {children}
        </RoleContext.Provider>
    )
}
export default RoleContextProvider;