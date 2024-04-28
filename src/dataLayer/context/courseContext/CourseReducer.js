const CourseReducer = (state, action) => {
    console.log(state, "coursereducer")

    switch (action.type) {
        case "SET_COURSES":
            console.log(action.payload, "setcourses" )
            return {
                ...state,
                courses: action?.payload,
            };
        case "CREATE_COURSE":
            return {
                ...state,
                courses: [action?.payload]
            };

        case "UPDATE_COURSE":
            return {
                ...state,
                courses: [...state.getcourses, action.payload],
            };

        case "DELETE_COURSE":
            let id = action.payload.id;
            id = parseInt(id);
            console.log("kjndhk", action.payload.id)
            console.log(state.courses[0].id , "paticularid")
            return {
                ...state,
                courses: state.courses.filter(course=> course.id !== id)
            };

        default:
            return state;
    }

}
export default CourseReducer;