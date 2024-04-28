import React from "react";

const SingleStudentReducer=(state, action)=>{
    console.log(state, "reducerststestudent")
    
    switch(action.type){
        case "SET_SINGLE_STUDENT":
            return{
              ...state,
                singleStudent: action?.payload
            }
        default:
            return state;
    }
}
export default SingleStudentReducer;