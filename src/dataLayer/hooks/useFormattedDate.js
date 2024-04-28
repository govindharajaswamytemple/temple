// import { useState, useEffect } from "react";

// const useFormattedDateTime = (inputDateString, inputTimeString) => {
//   const [formattedDateTime, setFormattedDateTime] = useState("");

//   useEffect(() => {
//     const date = new Date(inputDateString);
//     const day = date.getUTCDate();
//     const monthIndex = date.getUTCMonth();
//     const year = date.getUTCFullYear();

//     const time = new Date(`1970-01-01T${inputTimeString}Z`);
//     const hours = time.getUTCHours();
//     const minutes = time.getUTCMinutes();

//     const monthAbbreviations = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];

//     const formattedDate = `${day < 10 ? "0" : ""}${day}-${
//       monthAbbreviations[monthIndex]
//     }-${year}`;
//     const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
//       minutes < 10 ? "0" : ""
//     }${minutes}`;

//     const result = `${formattedDate} ${formattedTime}`;

//     setFormattedDateTime(result);
//   }, [inputDateString, inputTimeString]);

//   return formattedDateTime;
// };

// export default useFormattedDateTime;

import { useState, useEffect } from "react";

const useFormattedDate = (inputDateString) => {
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        const date = new Date(inputDateString);
        const day = date.getUTCDate();
        const monthIndex = date.getUTCMonth();
        const year = date.getUTCFullYear();

        const monthAbbreviations = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        // Formatting the date
        const result = `${day < 10 ? "0" : ""}${day}-${monthAbbreviations[monthIndex]
            }-${year}`;

        // Updating the state with the formatted date
        setFormattedDate(result);
    }, [inputDateString]);

    return formattedDate;
};

export default useFormattedDate;
