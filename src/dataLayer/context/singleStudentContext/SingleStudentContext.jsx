import React, { createContext, useContext, useReducer } from "react";
import SingleStudentReducer from "./SingleStudentReducer";


export const  SingleStudentContext = createContext();
const  SingleStudentContextProvider =({children})=>{

    const initialState={
        student:null
    }

    const [singleStudentState, DispatchSingleStudent] = useReducer(SingleStudentReducer,initialState)



    return(
        <SingleStudentContext.Provider value={{singleStudentState,DispatchSingleStudent}}>
            {children}
        </SingleStudentContext.Provider>
    )

}

export default SingleStudentContextProvider;