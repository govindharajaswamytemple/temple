import axios from "axios";
import LeadSourceReducer from "./LeadSourceReducer";
import React, { createContext, useEffect, useReducer } from "react";

export const LeadSourceContext = createContext();

const LeadSourceContextProvider = ({ children }) => {
  const initialState = {
    leadSources: null,
  };

  const [leadSourceState, DispatchLeadSource] = useReducer(
    LeadSourceReducer,
    initialState
  );

  console.log(leadSourceState, "lnsdkvnf");

  const CreateleadSource = async (leadsource) => {
    try {
      const { data, status } = await axios.post();
      if (status === 200) {
        DispatchLeadSource({ type: "CREATE_LEAD_SOURCE", payload: data });
      }
    } catch (error) {
      console.log("error");
    }
  };

  const getAllLeadSource = async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_API_URL}/settings/getleadsource`
      );
      console.log(data, "lsknfsgvjfdb");

      if (status === 200) {
        DispatchLeadSource({ type: "SET_LEAD_SOURCE", payload: data });
        console.log(data, status, "lsknfsgvjfdb");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllLeadSource();
  }, []);

  return (
    <LeadSourceContext.Provider
      value={{
        leadSourceState,
        DispatchLeadSource,
        CreateleadSource,
        getAllLeadSource,
      }}
    >
      {children}
    </LeadSourceContext.Provider>
  );
};

export default LeadSourceContextProvider;
