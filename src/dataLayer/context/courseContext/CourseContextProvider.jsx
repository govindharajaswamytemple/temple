import React, { createContext, useContext, useEffect, useReducer } from "react";
import CourseReducer from "./CourseReducer";
import axios from "axios";

export const CourseContext = createContext();

const CourseContextProvider = ({ children }) => {
  const initialState = {
    courses: null,
  };

  const [courseState, DispatchCourse] = useReducer(CourseReducer, initialState);
  console.log(courseState, "courseState");

  const getAllCourses = async () => {
    try {
      const { data, status } = await axios.get(
        `${process.env.REACT_APP_API_URL}/settings/getcourses`
      );

      if (status === 200) {
        console.log(data, "courseresponsedata");
        DispatchCourse({ type: "SET_COURSES", payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CreateCourse = async (coursedata) => {
    try {
      const { data, status } = await axios.post(
        `${process.env.REACT_APP_API_URL}/createcourse`,
        coursedata
      );
      if (status === 200) {
        DispatchCourse({ type: "CREATE_COURSE", payload: data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const UpdateCourse = async (updatedcoursedata) => {
  //   try {
  //     const { data, status } = await axios.put(
  //       `${process.env.REACT_APP_API_URL}/updatecourse`,
  //       updatedcoursedata
  //     );
  //     if (status === 200) {
  //       DispatchCourse({ type: "UPDATE_COURSE", payload: data });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    getAllCourses();
    //UpdateCourse();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        courseState,
        DispatchCourse,
        getAllCourses,
        CreateCourse,
       // UpdateCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContextProvider;
