import { createContext, useEffect, useReducer } from "react";

import axios from "axios";
import BranchReducer from "./BranchReducer";

export const BranchContext = createContext();

const BranchContextProvider = ({ children }) => {
  const intialState = {
    branches: [],
  };

  const [BranchState, DispatchBranch] = useReducer(BranchReducer, intialState);

  const getAllBranches = async () => {
    try {
      const { status, data } = await axios.get(`${process.env.REACT_APP_API_URL}/settings/getbranch`);
      console.log(data,status, "dkhbfjsvbj");
      if (status === 200) {
        DispatchBranch({ type: "SET_BRANCHES", payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const createBranch  = async (branchdetails) => {
  //     console.log(branchdetails, "uggg")
  //     try{
  //         const{Status, data}= await axios.post(`${process.env.REACT_APP_API_URL}/addbranch`, branchdetails)
  //         if(Status===201){
  //             console.log(data, "responsedtat")
  //             DispatchBranch({type:"CREATE_BRANCHES",payload:data})
  //             getAllBranches();
  //         }
  //     }
  //     catch(error){
  //         console.log(error)
  //     }
  // }

  useEffect(() => {
    // createBranch();
    getAllBranches();
  }, []);

  // useEffect(()=>{
  //     // createBranch();
  //     getAllBranches();
  // },[BranchState?.branches]);

  return (
    <BranchContext.Provider
      value={{ BranchState, DispatchBranch, getAllBranches }}
    >
      {children}
    </BranchContext.Provider>
  );
};

export default BranchContextProvider;
