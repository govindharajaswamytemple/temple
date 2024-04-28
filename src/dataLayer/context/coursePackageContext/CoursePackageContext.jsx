import React, { createContext, useEffect, useReducer } from "react";

import CoursePackageReducer from "./CoursePackageReducer";
import axios from "axios";

export const CoursePackageContext = createContext();

const CoursePackageContextProvider = ({ children }) => {
  const initialState = {
    coursepackages: null,
  };

  const [coursePackageState, DispatchCourseState] = useReducer(
    CoursePackageReducer,
    initialState
  );

  console.log(coursePackageState, "coursePackageState");

  const createCoursePackage = async (coursepackages) => {
    try {
      const { data, status } = await axios.post();
      if (status == 200) {
        DispatchCourseState({ type: "CREATE_COURSE_PACKAGE", payload: data });
        getAllCoursePackages();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCoursePackages = async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_API_URL}/settings/getcoursespackages`
      );
      if (status === 200) {
        DispatchCourseState({ type: "SET_COURSE_PACKAGES", payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCoursePackages();
  }, []);

  return (
    <CoursePackageContext.Provider
      value={{
        coursePackageState,
        DispatchCourseState,
        getAllCoursePackages,
        createCoursePackage,
      }}
    >
      {children}
    </CoursePackageContext.Provider>
  );
};

export default CoursePackageContextProvider;
