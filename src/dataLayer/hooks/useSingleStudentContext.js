import { useContext } from "react";
import { SingleStudentContext } from "../context/singleStudentContext/SingleStudentContext";


export const  useSingleStudentContext= () => {
    const context = useContext(SingleStudentContext);
    if (!context) {
      throw Error(
        "SingleStudentContext must be used inside an SingleStudentContextProvider"
      );
    }
    return context;
  };