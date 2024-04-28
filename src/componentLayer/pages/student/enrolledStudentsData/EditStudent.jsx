import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useTheme } from "../../../../dataLayer/context/themeContext/ThemeContext";
import DefaultBG from "../../../../assets/images/student_idCard_images/DefaultimgBG.png";
import { IoMdArrowBack, IoMdCheckmark, IoMdArrowForward } from "react-icons/io";

import { useBranchContext } from "../../../../dataLayer/hooks/useBranchContext";
import { useAuthContext } from "../../../../dataLayer/hooks/useAuthContext";
import { toast } from "react-toastify";
import { useLeadSourceContext } from "../../../../dataLayer/hooks/useLeadSourceContext";
import { useCourseContext } from "../../../../dataLayer/hooks/useCourseContext";
import { useCoursePackage } from "../../../../dataLayer/hooks/useCoursePackage";
import { useStudentsContext } from "../../../../dataLayer/hooks/useStudentsContext";

import { TbDatabaseDollar } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import Button from "../../../components/button/Button";
import BackButton from "../../../components/backbutton/BackButton";

function EditStudent() {
    const { id } = useParams();
    const [activeTab, setActiveTab] = useState(1);

    const { theme } = useTheme();
    const {
        studentState,
        studentState: { TotalStudents },
        getAllStudents,
        Dispatchstudents,
    } = useStudentsContext();
    const [isPopupOpen, setPopupOpen] = useState(false);
    let select = "select";
    const openPopup = () => setPopupOpen(true);
    const closePopup = () => setPopupOpen(false);
    // const { user } = useAuthContext();
    const { BranchState } = useBranchContext();
    const { leadSourceState } = useLeadSourceContext();
    const { courseState, getAllCourses } = useCourseContext();
    const { coursePackageState } = useCoursePackage();
    const navigate = useNavigate();
    console.log(`COurse State : ${courseState}`);

    // registration form data
    const [user_id, setuserid] = useState(() => {
        const userData = JSON.parse(localStorage.getItem("data"));
        return userData?.user?.id || "";
    });
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobilenumber, setMobileNumber] = useState("");
    const [parentsname, setParentsName] = useState("");
    const [parentsnumber, SetParentsNumber] = useState("");
    const [birthdate, setBirthDate] = useState("");
    const [gender, setGender] = useState("");
    const [maritalstatus, setMaritalStatus] = useState("");
    const [college, setCollege] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [area, setArea] = useState("");
    const [native, setNative] = useState("");
    const [zipcode, setZipcode] = useState(null);
    const [whatsappno, setWhatsAppNo] = useState(null);
    const [educationtype, setEducationType] = useState("");
    const [marks, setMarks] = useState("");
    const [academicyear, setAcademicyear] = useState("");
    // const [studentImage, setSelectedFile] = useState(null);
    // const [profilepic, setProfilePic] = useState("");
    const [enquirydate, setEnquiryDate] = useState("");
    const [enquirytakenby, setEnquiryTakenBy] = useState(() => {
        const userData = JSON.parse(localStorage.getItem("data"));
        return userData?.user?.fullname || "";
    });
    console.log("enquirytakenby", enquirytakenby);
    const [coursepackage, setCoursepakage] = useState("");

    const [courses, setCourses] = useState("");
    const [leadsource, setLeadSource] = useState("");
    const [branch, setBranch] = useState("");
    const [modeoftraining, setModeOfTraining] = useState("");
    // const [admissionstatus, setAdmissionStatus] = useState("");
    const [registrationnumber, setRegistrationNumber] = useState("");
    const [admissiondate, setAdmissionDate] = useState("");
    const [validitystartdate, setValidityStartDate] = useState("");
    const [validityenddate, setValidityEndDate] = useState("");

    const [feetype, setfeetype] = useState("");
    const [amount, setAmount] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [taxamount, setTaxamount] = useState(null);
    const [totalamount, setTotalamount] = useState(null);

    const [feedetails, setFeeDetails] = useState([]);
    const [grosstotal, setGrosstotal] = useState(null);
    const [totaldiscount, setTotalDiscount] = useState(0);
    const [totaltax, settotaltax] = useState(null);
    const [grandtotal, setGrandtotal] = useState(null);
    const [finaltotal, setfinaltotal] = useState(null);
    const [admissionremarks, setadmissionremarks] = useState("");
    const [assets, setassets] = useState([]);
    const [initialpayment, setinitialamount] = useState([]);
    const [dueamount, setdueamount] = useState(null);
    const [totalinstallments, settotalinstallments] = useState(0);
    const [duedatetype, setduedatetype] = useState("");
    const [addfee, setaddfee] = useState(false);
    const [installments, setinstallments] = useState([]);
    const [leadsourceOptions, setleadsourceOptions] = useState(false);
    const [CustomLeadSource, setCustomLeadSource] = useState("");
    const [feedetailsbilling, setfeedetailsbilling] = useState([]);
    const [materialfee, setmaterialfee] = useState(null);

    const [totalfeewithouttax, settotalfeewithouttax] = useState(null);
    const [totalpaidamount, settotalpaidamount] = useState(0);
    const [educationOthersOption, setEducationOthersOption] = useState(false);
    const [customEducationType, setCustomEducationType] = useState("");
    const [student_status, setStudent_status] = useState([]);
    const [certificate_status, setcertificate_status] = useState([
        {
            courseStartDate: "",
            courseEndDate: "",
            certificateStatus: "",
            requistedDate: "",
            issuedDate: "",
        },
    ]);

    const [errorState, setErrorState] = useState({});
    const [extra_discount, setExtra_Discount] = useState([]);
    let LoggedInuser = JSON.parse(localStorage.getItem("user"));
    let userName;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        imageUrl: "",
        dob: "",
        contact: "",
        wpNum: "",
        gender: "",
        marital: "",
        college: "",
        pincode: "",
        country: "",
        state: "",
        area: "",
        native: "",
        parentsname: "",
        parentsnumber: "",
        educationtype: "",
        marks: "",
        academicyear: "",
        enquirydate: "",
        enquirytakenby: "",
        coursepackage: "",
        courses: "",
        leadsource: "",
        branch: "",
        admissionremarks: "",
        modeoftraining: "",
        admissiondate: "",
        validitystartdate: "",
        validityenddate: "",
        feetype: "",
        amount: "",
    });
    // if (LoggedInuser) {
    //   userName = LoggedInuser.fullname;
    //   setEnquiryTakenBy(userName);
    // }

    const [imageUrl, setImageUrl] = useState(null);
    // const [imageName, setImageName] = useState("");
    const displayImage = (file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const imageUrl = e.target.result; // Get the base64 image data
            console.log(imageUrl, "ewqehrewurbeurbewubewibgiwjvb");
            setImageUrl(imageUrl);
        };

        reader.readAsDataURL(file);
    };
    useEffect(() => {
        if (LoggedInuser) {
            userName = LoggedInuser.fullname;
            setEnquiryTakenBy(userName);
            console.log("userName", userName);
        }
    }, [LoggedInuser]);

    useEffect(() => {
        setuser((prevUser) => {
            return {
                ...prevUser,
                assets: assets,
            };
        });
    }, [assets]);

    const handleAssetChange = (event) => {
        const assetName = event.target.value; // Use value instead of name
        setFormData((prevData) => {
            const updatedAssets = event.target.checked
                ? [...prevData.assets, assetName]
                : prevData.assets.filter((asset) => asset !== assetName);
            return {
                ...prevData,
                assets: updatedAssets,
            };
        });
    };

    useEffect(() => {
        setfinaltotal(grandtotal + materialfee);
    }, [grandtotal, materialfee]);
    useEffect(() => {
        setdueamount(finaltotal);
    }, [finaltotal]);
    useEffect(() => {
        setTotalamount(amount - discount);
        let actualfee = (totalamount * 100) / 118;

        setTaxamount(totalamount - actualfee);
    });

    // fee binding as per course selected

    useEffect(() => {
        if (feetype === "Admission Fee") {
            setAmount(499);
        }
        if (feetype === "fee") {
            let course = courseState?.courses?.filter(
                (course) =>
                    course.course_name === courses &&
                    course.course_package === coursepackage
            );
            console.log("course fee", course);
            if (course.length > 0) {
                setAmount(course[0].fee);
            } else {
                setAmount("");
            }
        }
    }, [feetype, courses, coursepackage, courseState]);

    console.log(courseState.courses, "2564");

    const handleFeeDetails = (e) => {
        e.preventDefault();
        if (!feetype) {
            setErrorState((prev) => ({ ...prev, feetype: "Fee type is required" }));
            return;
        }

        if (!amount) {
            setErrorState((prev) => ({ ...prev, amount: "Amount is required" }));
            return;
        }
        let save = true;
        if (feetype === "fee") {
            let course = courseState.courses.filter(
                (course) =>
                    course.course_name === courses &&
                    course.course_package === coursepackage
            );

            if (
                course.length > 0 &&
                parseInt(discount) > parseInt(course[0].max_discount) &&
                course[0].course_name === courses &&
                course[0].course_package === coursepackage
            ) {
                save = false;
                alert(`Discount cannot be greater than ${course[0].max_discount}`);
            }
        }
        if (save) {
            setFeeDetails([
                ...feedetails,
                {
                    id: Date.now(),
                    feetype: feetype,
                    amount: amount,
                    discount: discount,
                    taxamount: taxamount,
                    totalamount: totalamount,
                },
            ]);
            setfeetype("");
            setAmount("");
            setDiscount("");
            setTaxamount(0);

            setTotalamount(0);
        }
    };
    // * ------------------validations-------------------------------

    const handleBasicDetails = () => {
        if (!formData.name) {
            setErrorState((prev) => ({ ...prev, name: "Please enter the name" }));
            return;
        }
        if (!formData.email) {
            setErrorState((prev) => ({ ...prev, email: "Email is required" }));
            return;
        } else {
            const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
            if (!emailPattern.test(formData.email)) {
                setErrorState((prev) => ({ ...prev, email: "Invalid Email Address" }));
                return;
            }
        }
        if (!formData.birthdate) {
            setErrorState((prev) => ({ ...prev, dob: "Date of birth is required" }));
            return;
        }

        if (!formData.mobilenumber) {
            setErrorState((prev) => ({ ...prev, contact: "Contact is required" }));
            return;
        } else {
            if (formData.mobilenumber.length !== 10) {
                setErrorState((prev) => ({
                    ...prev,
                    contact: "Incorrect mobile number",
                }));
                return;
            }
        }

        if (!formData.whatsappno) {
            setErrorState((prev) => ({ ...prev, wpNum: "WhatsApp Number required" }));
            return;
        } else {
            if (formData.whatsappno.length !== 10) {
                setErrorState((prev) => ({
                    ...prev,
                    wpNum: "Incorrect WhatsApp number",
                }));
                return;
            }
        }

        if (!formData.gender) {
            setErrorState((prev) => ({ ...prev, gender: "Gender is required" }));
            return;
        }

        if (!formData.maritalstatus) {
            setErrorState((prev) => ({
                ...prev,
                marital: "Marital status is required",
            }));
            return;
        }

        if (!formData.college) {
            setErrorState((prev) => ({
                ...prev,
                college: "College name is required",
            }));
            return;
        }

        if (!formData.zipcode) {
            setErrorState((prev) => ({ ...prev, pincode: "Pincode is required" }));
            return;
        }
        if (!formData.country) {
            setErrorState((prev) => ({ ...prev, country: "Country is required" }));
            return;
        }
        if (!formData.state) {
            setErrorState((prev) => ({ ...prev, state: "State is required" }));
            return;
        }
        if (!formData.area) {
            setErrorState((prev) => ({ ...prev, area: "Area is required" }));
            return;
        }
        if (!formData.native) {
            setErrorState((prev) => ({ ...prev, native: "Native is required" }));
            return;
        }

        handleNext();
    };

    const handleParentDetails = () => {
        if (!formData.parentsname) {
            setErrorState((prev) => ({
                ...prev,
                parentsname: "Parent Name is required",
            }));

            return;
        }

        if (!formData.parentsnumber) {
            setErrorState((prev) => ({
                ...prev,
                parentsnumber: "Parent Number is required",
            }));

            return;
        } else {
            if (formData.parentsnumber.length !== 10) {
                setErrorState((prev) => ({
                    ...prev,
                    parentsnumber: "Number is invalid",
                }));

                return;
            }
        }
        handleNext();
    };
    const handleEducationDetails = () => {
        if (!formData.educationtype) {
            setErrorState((prev) => ({
                ...prev,
                educationtype: "Education type is required",
            }));
            return;
        }
        if (!formData.marks) {
            setErrorState((prev) => ({
                ...prev,
                marks: "Percentage is required",
            }));
            return;
        }
        if (!formData.academicyear) {
            setErrorState((prev) => ({
                ...prev,
                academicyear: "Academic Year is required",
            }));
            return;
        }
        if (formData.educationtype === "others") {
            setEducationType(customEducationType);
        }

        handleNext();
    };
    // -----photo start--------------------------------------
    const fileInputRef = useRef(null);
    // const [resizedImage, setResizedImage] = useState(null);

    const [studentImage, setSelectedFile] = useState(null);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const targetSizeInBytes = 45 * 1024;
                const resizedImage = await resizeImage(file, targetSizeInBytes);
                const { width, height } = await getImageSize(resizedImage);
                const sizeInKB = (resizedImage.size / 1024).toFixed(2);
                console.log("Resized Image Dimensions:", { width, height });
                console.log("Resized Image Size:", sizeInKB, "KB");
                setSelectedFile(resizedImage);
                // setImageName(file.name);
                setFormData((prev) => ({ ...prev, imageUrl: studentImage }));
            } catch (error) {
                console.error("Error processing image:", error);
            }
        }
    };
    const getImageSize = (file) => {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
                resolve({ width: img.width, height: img.height });
            };

            img.onerror = (error) => {
                reject(error);
            };

            const reader = new FileReader();

            reader.onload = (e) => {
                img.src = e.target.result;
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };

    const resizeImage = async (file, targetSize) => {
        const img = new Image();
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        img.src = URL.createObjectURL(file);

        await new Promise((resolve) => {
            img.onload = resolve;
        });

        let width = img.width;
        let height = img.height;
        let resizedFile = file;

        while (resizedFile.size > targetSize) {
            width *= 0.9;
            height *= 0.9;

            canvas.width = width;
            canvas.height = height;

            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);

            const blob = await new Promise((resolve) => {
                canvas.toBlob(resolve, "image/jpeg", 0.85);
            });

            resizedFile = new File([blob], file.name, { type: blob.type });
        }

        return resizedFile;
    };
    useEffect(() => {
        if (studentImage) {
            displayImage(studentImage);
        }
    }, [studentImage]);

    const handlePhoto = () => {
        // const maxSizeInBytes = 45 * 1024; // 40 KB in bytes
        // if (studentImage.size > maxSizeInBytes) {
        //   alert("Image size is too large. Maximum allowed size is 45 KB");
        //   return;
        // }

        // Image size is within the limit, proceed to the next step
        handleNext();
    };

    // ----photo end--------------------------------------------
    const handleAdmissionDetails = () => {
        if (!formData.enquirydate) {
            setErrorState((prev) => ({
                ...prev,
                enquirydate: "Enquiry Date is required",
            }));
            return;
        } else if (!formData.enquirytakenby) {
            setErrorState((prev) => ({
                ...prev,
                enquirytakenby: "Enquiry Taken by is required",
            }));
            return;
        } else if (!formData.coursepackage) {
            setErrorState((prev) => ({
                ...prev,
                coursepackage: "Course Package is required",
            }));
            return;
        } else if (!formData.courses) {
            setErrorState((prev) => ({ ...prev, courses: "Courses is required" }));
            return;
        } else if (!formData.leadsource) {
            setErrorState((prev) => ({
                ...prev,
                leadsource: "Lead Source is required",
            }));
            return;
        } else if (!formData.branch) {
            setErrorState((prev) => ({ ...prev, branch: "Branch is required" }));
            return;
        } else if (!formData.modeoftraining) {
            setErrorState((prev) => ({
                ...prev,
                modeoftraining: "Mode of Training is required",
            }));
            return;
        } else if (!formData.admissiondate) {
            setErrorState((prev) => ({
                ...prev,
                admissiondate: "Admission Date is required",
            }));
            return;
        } else if (!formData.validitystartdate) {
            setErrorState((prev) => ({
                ...prev,
                validitystartdate: "Validity Start Date is required",
            }));
            return;
        } else if (!formData.validityenddate) {
            setErrorState((prev) => ({
                ...prev,
                validityenddate: "Validity End Date is required",
            }));
            return;
        }

        handleNext();
    };
    useEffect(() => {
        const today = new Date(validitystartdate);
        const futureDate = new Date(
            today.getFullYear(),
            today.getMonth() + 10,
            today.getDate()
        );

        // Format the future date as a string (e.g., "YYYY-MM-DD")
        const formattedFutureDate = `${futureDate.getFullYear()}-${(
            futureDate.getMonth() + 1
        )
            .toString()
            .padStart(2, "0")}-${futureDate.getDate().toString().padStart(2, "0")}`;
        setValidityEndDate(formattedFutureDate);
    }, [validitystartdate]);

    const handleReset = () => { };
    // useEffect(() => {
    //   setuserid(user.id);
    // }, [user]);

    useEffect(() => {
        // Clear error messages on change
        setErrorState((prev) => ({
            ...prev,
            name: "",
            email: "",
            imageUrl: "",
            dob: "",
            contact: "",
            wpNum: "",
            gender: "",
            marital: "",
            college: "",
            pincode: "",
            country: "",
            state: "",
            area: "",
            native: "",
            parentsname: "",
            parentsnumber: "",
            educationtype: "",
            marks: "",
            academicyear: "",
            enquirydate: "",
            enquirytakenby: "",
            coursepackage: "",
            courses: "",
            leadsource: "",
            branch: "",
            admissionremarks: "",
            modeoftraining: "",
            admissiondate: "",
            validitystartdate: "",
            validityenddate: "",
            feetype: "",
            amount: "",
        }));
    }, [
        name,
        email,
        imageUrl,
        birthdate,
        mobilenumber,
        whatsappno,
        gender,
        maritalstatus,
        college,
        zipcode,
        country,
        state,
        admissionremarks,
        area,
        native,
        parentsname,
        parentsnumber,
        educationtype,
        marks,
        academicyear,
        enquirydate,
        enquirytakenby,
        coursepackage,
        courses,
        leadsource,
        branch,
        modeoftraining,
        admissiondate,
        validitystartdate,
        validityenddate,
        feetype,
        amount,
    ]);
    const [error, setError] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setError((prev) => ({
            ...prev,
            [name]: "", // Reset error for the field being changed
        }));
        setFormData((prev) => {
            return { ...prev, [name]: value };

        });
    };
    useEffect(() => {
        console.log(id, "getstudentdatadata");
        if (id) {
            axios
                .get(`${process.env.REACT_APP_API_URL}/student/viewstudentdata/${id}`)
                .then((response) => {
                    setFormData(response.data.student[0]);
                    console.log(response.data.student[0], "userresponceid");
                })
                .catch((error) => {
                    console.error("Error fetching student details:", error);
                });
        }
    }, [id]);

    // console.log(formData.studentImage, "simageURl");
    const [user, setuser] = useState();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (id) {
            try {
                const { data, status } = await toast.promise(
                    axios.put(
                        `${process.env.REACT_APP_API_URL}/student/updatestudentdata/${id}`,
                        formData
                    ),
                    {
                        loading: "Loading...",
                        success: "User Upated Successfully",
                        error: "User not Created",
                    }
                );

                if (status === 200) {
                    getAllStudents();
                    navigate(`/student/list`);
                    Dispatchstudents({ type: "CREATE_USER", payload: data });
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    // const { users } = useUsersContext();
    const [filteredcounsellor, setfilteredcounsellor] = useState([]);

    const [studentData, setStudentData] = useState([{ name }, { name }]);
    useEffect(() => {
        if (studentImage) {
            displayImage(studentImage);
        }
    }, [studentImage]);
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/getstudent_data`)
            .then((response) => {
                // Handle the successful response here
                setStudentData(response.data); // Update the data state with the fetched data

                console.log("data", response.data);
            })
            .catch((error) => {
                // Handle any errors that occur during the request
                console.error("Error fetching data:", error);
            });
    }, []);

    const fetchData = async () => {
        const { zipcode } = formData;
        if (zipcode && zipcode.length > 2) {
            try {
                const response = await axios.get(
                    `https://api.postalpincode.in/pincode/${zipcode}`
                );

                if (response.data.length > 0) {
                    const postOffice = response.data[0]?.PostOffice[0];

                    if (postOffice) {
                        const {
                            Region: city,
                            State: state,
                            Country: country,
                            Block: area,
                        } = postOffice;

                        setCountry(country);
                        setState(state);
                        setArea(area || "");
                        setNative(city || "");
                    } else {
                        // Clear the state if no post office data is available
                        setCountry("");
                        setState("");
                        setArea("");
                        setNative("");
                    }
                } else {
                    // Clear the state if no data is returned
                    setCountry("");
                    setState("");
                    setArea("");
                    setNative("");
                }
            } catch (error) {
                console.error("Error fetching location information:", error);
                // Handle error as needed
            }
        } else {
            // Clear the state if the pincode is not valid
            setCountry("");
            setState("");
            setArea("");
            setNative("");
        }
    };

    useEffect(() => {
        fetchData();
    }, [zipcode]);

    function handleNext() {
        setActiveTab((prevActiveTab) => prevActiveTab + 1);
    }

    const handlePrev = () => {
        setActiveTab((prevActiveTab) => prevActiveTab - 1);
    };
    const handleKeyDown = (event) => {
        if (event.keyCode === 38 || event.keyCode === 40) {
            event.preventDefault(); // Prevent default behavior of arrow keys
        }
    };
    // console.log(formData.maritalstatus, "formData");
    return (
        <div>
            <BackButton heading="Edit Form" content="Back" />
            <div className="container-fluid">
                <div className="registration_form_section  ">
                    <div className="top">
                        <div className="registration_form_tabs row">
                            <div className="button_grp col-lg-12 p-0">
                                <button
                                    type="button"
                                    className={
                                        activeTab === 1
                                            ? `${theme === "light"
                                                ? "form_tab_btn active"
                                                : "form_tab_btn dark active"
                                            }`
                                            : "form_tab_btn "
                                    }
                                >
                                    Student Details
                                </button>
                                <button
                                    type="button"
                                    className={
                                        activeTab === 2
                                            ? `${theme === "light"
                                                ? "form_tab_btn active"
                                                : "form_tab_btn dark active"
                                            }`
                                            : "form_tab_btn "
                                    }
                                >
                                    Parent Details
                                </button>
                                <button
                                    type="button"
                                    className={
                                        activeTab === 3
                                            ? `${theme === "light"
                                                ? "form_tab_btn active"
                                                : "form_tab_btn dark active"
                                            }`
                                            : "form_tab_btn "
                                    }
                                >
                                    Education Details
                                </button>
                                <button
                                    type="button"
                                    className={
                                        activeTab === 4
                                            ? `${theme === "light"
                                                ? "form_tab_btn active"
                                                : "form_tab_btn dark active"
                                            }`
                                            : "form_tab_btn "
                                    }
                                >
                                    Admission Details
                                </button>

                                <button
                                    type="button"
                                    className={
                                        activeTab === 5
                                            ? `${theme === "light"
                                                ? "form_tab_btn active"
                                                : "form_tab_btn dark active"
                                            }`
                                            : "form_tab_btn "
                                    }
                                >
                                    Preview
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="bottom mt-3">
                        <form className="" onSubmit={handleSubmit}>
                            {/* Student Details Start */}
                            {activeTab === 1 && (
                                <>
                                    <div className="row">
                                        <div className="form-group text-start col-lg-3 col-md-6 ">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="rname"
                                            >
                                                Name<span className="text-danger">*</span>
                                            </label>

                                            <input
                                                className={
                                                    errorState && errorState.name
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="rname"
                                                type="text"
                                                required
                                                name="name"
                                                onChange={handleChange}
                                                value={formData?.name}
                                                placeholder="Enter your name"
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.name && (
                                                    <span className="fs-xs text-danger">
                                                        {errorState.name}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="remail"
                                            >
                                                Email<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.email
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="remail"
                                                type="email"
                                                name="email"
                                                required
                                             
                                                value={formData?.email}
                                                placeholder="Enter your email address"
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.email && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="rdob"
                                            >
                                                Date of Birth<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.dob
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="rdob"
                                                type="date"
                                                name="birthdate"
                                                onChange={handleChange}
                                                value={formData?.birthdate}
                                                onKeyDown={handleKeyDown}
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.dob && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.dob}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                htmlhtmlFor="rphoto"
                                                className="form-label fs-s text_color"
                                            >
                                                Choose your photo<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.imageUrl
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="rphoto"
                                                ref={fileInputRef}
                                                type="file"
                                                onChange={handleFileChange}
                                            // value={imageName || ""}
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.imageUrl && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.imageUrl}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">


                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="maritalstatus"
                                            >
                                                Marital Status<span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className={
                                                    errorState && errorState.marital
                                                        ? "form-control input_bg_color error-input select form-select"
                                                        : "form-control input_bg_color select form-select"
                                                }
                                                aria-label="Default select example"
                                                id="maritalstatus"
                                                name="maritalstatus"
                                                required
                                                onChange={handleChange}
                                                value={formData.maritalstatus}
                                            >
                                                <option disabled className="fs-s" value="">
                                                    Your Marital Status
                                                </option>
                                                <option value="Single">Single</option>
                                                <option value="Married">Married</option>
                                            </select>
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.marital && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.marital}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="rcscname"
                                            >
                                                College/School/Company
                                                <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.college
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="rcscname"
                                                type="text"
                                                name="college"
                                                required
                                                onChange={handleChange}
                                                value={formData.college}
                                                onKeyDown={handleKeyDown}
                                                placeholder="College/School/Company"
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.college && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.college}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="rpincode"
                                            >
                                                Pincode<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.pincode
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="rpincode"
                                                type="number"
                                                name="zipcode"
                                                required
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    fetchData();
                                                }}
                                                value={formData.zipcode}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Enter your pincode"
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.pincode && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.pincode}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="rcountry"
                                            >
                                                Country<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.country
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="rcountry"
                                                type="text"
                                                name="country"
                                                required
                                                onChange={handleChange}
                                                value={formData.country}
                                                placeholder="Enter your Country"
                                            />

                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.country && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.country}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3">

                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="rstate"
                                            >
                                                State<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.state
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="rstate"
                                                type="text"
                                                name="state"
                                                required
                                                onChange={handleChange}
                                                value={formData.state}
                                                placeholder="Enter your State"
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.state && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.state}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="rnative"
                                            >
                                                Native Place<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.native
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="rnative"
                                                type="text"
                                                name="native"
                                                required
                                                onChange={handleChange}
                                                value={formData.native}
                                                placeholder="Enter your Native Place"
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.native && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.native}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="rarea"
                                            >
                                                Area<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.area
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="rarea"
                                                type="text"
                                                name="area"
                                                required
                                                onChange={handleChange}
                                                value={formData.area}
                                                placeholder="Enter your Area"
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.area && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.area}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="controls d-flex justify-content-between  mt-4">
                                        <div>
                                            {activeTab !== 1 && (
                                                <Button
                                                    type="button"
                                                    className="control_prev_btn "
                                                    onClick={handlePrev}
                                                    icon={<IoMdArrowBack className="button_icons" />}
                                                >
                                                    Go Back
                                                </Button>
                                            )}
                                        </div>

                                        <div>
                                            {activeTab !== 8 && (
                                                <Button
                                                    type="button"
                                                    className="btn  right btn_primary "
                                                    onClick={handleBasicDetails}
                                                    icon={<IoMdArrowForward />}
                                                >
                                                    Continue
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* Student Details End */}

                            {/* Parent Details start */}
                            {activeTab === 2 && (
                                <>
                                    <div className="row">
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="rparentname"
                                            >
                                                Parent's Name<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.parentsname
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="rparentname"
                                                type="text"
                                                name="parentsname"
                                                required
                                                onChange={handleChange}
                                                value={formData.parentsname}
                                                placeholder="Enter your Parent's Name"
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.parentsname && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.parentsname}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="rparentscontact"
                                            >
                                                Parent's Contact<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.parentsnumber
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="rparentscontact"
                                                type="number"
                                                name="mobilenumber"
                                                required
                                                onChange={handleChange}
                                                value={formData.mobilenumber}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Enter your Parent's contact"
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.parentsnumber && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.parentsnumber}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="controls d-flex justify-content-between  mt-4">
                                        <div>
                                            {activeTab !== 1 && (
                                                <Button
                                                    type="button"
                                                    className="btn control_prev_btn reg_btn"
                                                    onClick={handlePrev}
                                                    icon={<IoMdArrowBack className="button_icons" />}
                                                >
                                                    Go Back
                                                </Button>
                                            )}
                                        </div>

                                        <div>
                                            {activeTab !== 8 && (
                                                <Button
                                                    type="button"
                                                    className="btn  right btn_primary "
                                                    onClick={handleParentDetails}
                                                    icon={<IoMdArrowForward />}
                                                >
                                                    Continue
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* Parent Details end */}

                            {/* Education Details Start */}
                            {activeTab === 3 && (
                                <>
                                    <div className="row">
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="educationtype"
                                            >
                                                Education Type<span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className={
                                                    errorState && errorState.educationtype
                                                        ? "form-control input_bg_color error-input select form-select"
                                                        : "form-control input_bg_color select form-select"
                                                }
                                                aria-label="Default select example"
                                                id="educationtype"
                                                name="educationtype"
                                                required
                                                onChange={handleChange}
                                                value={formData.educationtype}
                                            >
                                                <option disabled className="fs-s" value="">
                                                    ---Select---
                                                </option>
                                                <option value="B.Tech">B.Tech</option>
                                                <option value="MCA">MCA</option>
                                                <option value="SSC">SSC</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.educationtype && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.educationtype}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="rpercentage"
                                            >
                                                Percentage<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.marks
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="rpercentage"
                                                type="number"
                                                name="marks"
                                                required
                                                onChange={handleChange}
                                                value={formData.marks}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Enter your percentage"
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.marks && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.marks}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="racademicyear"
                                            >
                                                Academic Year<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.academicyear
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="racademicyear"
                                                type=""
                                                name="academicyear"
                                                required
                                                onChange={handleChange}
                                                value={formData.academicyear}
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.academicyear && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.academicyear}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="controls d-flex justify-content-between  mt-4">
                                        <div>
                                            {activeTab !== 1 && (
                                                <Button
                                                    type="button"
                                                    className="btn control_prev_btn reg_btn"
                                                    onClick={handlePrev}
                                                    icon={<IoMdArrowBack className="button_icons" />}
                                                >
                                                    Go Back
                                                </Button>
                                            )}
                                        </div>

                                        <div>
                                            {activeTab !== 8 && (
                                                <Button
                                                    type="button"
                                                    className="btn  right btn_primary "
                                                    onClick={handleEducationDetails}
                                                    icon={<IoMdArrowForward />}
                                                >
                                                    Continue
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* Education Details End */}

                            {/* Admission Details Start */}
                            {activeTab === 4 && (
                                <>
                                    <div className="row">
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="renqiurydate"
                                            >
                                                Enquiry Date<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.enquirydate
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="renqiurydate"
                                                type="date"
                                                name="enquirydate"
                                                required
                                                onChange={handleChange}
                                                value={formData.enquirydate}
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.enquirydate && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.enquirydate}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="renqtakeby"
                                            >
                                                Enquiry taken by<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.enquirytakenby
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="renqtakeby"
                                                type="text"
                                                name="enquirytakenby"
                                                onChange={handleChange}
                                                required
                                                value={formData.enquirytakenby}
                                                placeholder="Enter your Counsellor Name"
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.enquirytakenby && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.enquirytakenby}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="coursepackage"
                                            >
                                                Course Package<span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className={
                                                    errorState && errorState.coursepackage
                                                        ? "form-control input_bg_color error-input select form-select"
                                                        : "form-control input_bg_color select form-select"
                                                }
                                                aria-label="Default select example"
                                                name="coursepackage"
                                                required
                                                onChange={handleChange}
                                                value={formData.coursepackage}
                                            >
                                                <option disabled className="fs-s" value="">
                                                    --Select--
                                                </option>

                                                {coursePackageState &&
                                                    coursePackageState?.coursepackages?.map(
                                                        (item, index) => (
                                                            <option
                                                                key={item.id}
                                                                value={item.coursepackages_name}
                                                            >
                                                                {item.coursepackages_name}
                                                            </option>
                                                        )
                                                    )}
                                            </select>
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.coursepackage && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.coursepackage}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="leadsource"
                                            >
                                                Lead Source<span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className={
                                                    errorState && errorState.leadsource
                                                        ? "form-control input_bg_color error-input select form-select"
                                                        : "form-control input_bg_color select form-select"
                                                }
                                                aria-label="Default select example"
                                                id="leadsource"
                                                required
                                                onChange={handleChange}
                                                value={formData.leadsource.source}
                                            >
                                                <option disabled className="fs-s" value="">
                                                    --Select--
                                                </option>
                                                {leadSourceState?.leadSources &&
                                                    leadSourceState?.leadSources?.map((item, index) => (
                                                        <option key={item.id} value={item.leadsource}>
                                                            {item.leadsource}
                                                        </option>
                                                    ))}
                                            </select>
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.leadsource && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.leadsource}
                                                    </p>
                                                )}
                                            </div>

                                            {leadsourceOptions && (
                                                <div className="mt-3">
                                                    <label
                                                        htmlFor=""
                                                        className="form-label fs-s text_color"
                                                    >
                                                        Name<span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control input_bg_color"
                                                        required
                                                        onChange={(e) =>
                                                            setCustomLeadSource((prev) => ({
                                                                ...prev,
                                                                name: e.target.value,
                                                            }))
                                                        }
                                                        value={formData.CustomLeadSource.name || ""}
                                                    />
                                                    <label
                                                        htmlFor=""
                                                        className="form-label fs-s text_color"
                                                    >
                                                        Mobile Number<span className="text-danger">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control input_bg_color"
                                                        required
                                                        onChange={(e) =>
                                                            setCustomLeadSource((prev) => ({
                                                                ...prev,
                                                                mobileNumber: e.target.value,
                                                            }))
                                                        }
                                                        value={CustomLeadSource.mobileNumber || ""}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="modeoftraining"
                                            >
                                                Mode Of Training<span className="text-danger">*</span>
                                            </label>
                                            <select
                                                className={
                                                    errorState && errorState.modeoftraining
                                                        ? "form-control input_bg_color error-input select form-select"
                                                        : "form-control input_bg_color select form-select"
                                                }
                                                aria-label="Default select example"
                                                id="modeoftraining"
                                                name="modeoftraining"
                                                required
                                                onChange={handleChange}
                                                value={formData.modeoftraining}
                                            >
                                                <option disabled className="fs-s" value="">
                                                    --Select--
                                                </option>
                                                <option value="Online">Online</option>
                                                <option value="Offline">Offline</option>
                                            </select>
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.modeoftraining && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.modeoftraining}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="radmissiondate"
                                            >
                                                Admission Date<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.admissiondate
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="radmissiondate"
                                                type="date"
                                                name="radmissiondate"
                                                required
                                                onChange={handleChange}
                                                value={formData.admissiondate}
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.admissiondate && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.admissiondate}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="rvaliditystartdate"
                                            >
                                                Validity Start Date
                                                <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.validitystartdate
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="rvaliditystartdate"
                                                type="date"
                                                name="rvaliditystartdate"
                                                onChange={handleChange}
                                                value={formData.validitystartdate}
                                                required
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.validitystartdate && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.validitystartdate}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="rvalidityenddate"
                                            >
                                                Validity End Date<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className={
                                                    errorState && errorState.validityenddate
                                                        ? "form-control input_bg_color error-input"
                                                        : "form-control input_bg_color"
                                                }
                                                id="rvalidityenddate"
                                                type="date"
                                                name="rvalidityenddate"
                                                onChange={handleChange}
                                                value={formData.validityenddate}
                                                required
                                            />
                                            <div style={{ height: "8px" }}>
                                                {errorState && errorState.validityenddate && (
                                                    <p className="text-danger m-0 fs-xs">
                                                        {errorState.validityenddate}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group text-start col-lg-3 col-md-6 ">
                                            <label
                                                className="form-label fs-s text_color"
                                                htmlFor="rremarks"
                                            >
                                                Remarks<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                className="form-control input_bg_color text_color"
                                                id="rremarks"
                                                type="text"
                                                name="admissionremarks"
                                                placeholder="Enter your Remarks"
                                                required
                                                onChange={handleChange}
                                                value={formData.admissionremarks}
                                            />
                                        </div>
                                        <div className="form-group text-start col-lg-3 col-md-6">
                                            <label
                                                className="form-check-label fs-s text_color"
                                                htmlFor="cardtableCheck"
                                            >
                                                Assets
                                            </label>

                                            <div className="w-100 ">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input input_bg_color text_color"
                                                        type="checkbox"
                                                        id="bag"
                                                        name="bag"
                                                        checked={formData.assets.includes("bag")}
                                                        onChange={handleAssetChange}
                                                        value="bag"
                                                    />
                                                    <label
                                                        className="form-check-label fs-s text_color"
                                                        htmlFor="bag"
                                                    >
                                                        Bag
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input input_bg_color text_color"
                                                        type="checkbox"
                                                        id="laptop"
                                                        name="laptop"
                                                        checked={formData.assets.includes("laptop")}
                                                        onChange={handleAssetChange}
                                                        value="laptop"
                                                    />
                                                    <label
                                                        className="form-check-label fs-s text_color"
                                                        htmlFor="laptop"
                                                    >
                                                        Laptop
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input input_bg_color text_color"
                                                        type="checkbox"
                                                        id="lms"
                                                        name="lms"
                                                        checked={formData.assets.includes("lms")}
                                                        onChange={handleAssetChange}
                                                        value="lms"
                                                    />
                                                    <label
                                                        className="form-check-label fs-s text_color"
                                                        htmlFor="lms"
                                                    >
                                                        LMS
                                                    </label>
                                                </div>

                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input input_bg_color text_color"
                                                        type="checkbox"
                                                        id="courseMaterial"
                                                        name="courseMaterial"
                                                        checked={formData.assets.includes("courseMaterial")}
                                                        onChange={handleAssetChange}
                                                        value="courseMaterial"
                                                    />
                                                    <label
                                                        className="form-check-label fs-s text_color"
                                                        htmlFor="courseMaterial"
                                                    >
                                                        Course Material
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mt-3"></div>

                                    <div className="controls d-flex justify-content-between  mt-4">
                                        <div>
                                            {activeTab !== 1 && (
                                                <Button
                                                    type="button"
                                                    className="btn control_prev_btn reg_btn"
                                                    onClick={handlePrev}
                                                    icon={<IoMdArrowBack className="button_icons" />}
                                                >
                                                    Go Back
                                                </Button>
                                            )}
                                        </div>

                                        <div>
                                            {activeTab !== 8 && (
                                                <Button
                                                    type="button"
                                                    className="btn  right btn_primary "
                                                    onClick={handleAdmissionDetails}
                                                    icon={<IoMdArrowForward />}
                                                >
                                                    Continue
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* Admission Details End */}

                            {/* Preview Starts */}
                            {activeTab === 5 && (
                                <>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6 text-start">
                                                {imageUrl ? (
                                                    <img
                                                        className="img-fluid"
                                                        src={imageUrl}
                                                        alt="user_img"
                                                        width="50%"
                                                    />
                                                ) : (
                                                    <img
                                                        className="img-fluid"
                                                        src={`https://teksacademyimages.s3.amazonaws.com/${formData?.studentImg}`}
                                                        alt="default_user_img"
                                                        width="50%"
                                                    />
                                                )}
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <p className="text_color">
                                                    <b className="prev_bold">Name:{formData.name}</b>{" "}
                                                    {name}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">Email:</b> {formData.email}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">Date Of Birth:</b>{" "}
                                                    {formData.birthdate}
                                                </p>
                                                <p className="">
                                                    <b className="prev_bold">Number:</b>{" "}
                                                    {formData.mobilenumber}
                                                </p>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <p className="text_color">
                                                    <b className="prev_bold">WhatsApp Number:</b>{" "}
                                                    {formData.whatsappno}
                                                </p>

                                                <p className="text_color ">
                                                    <b className="prev_bold  ">Marital Status:</b>{" "}
                                                    {formData.maritalstatus}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">College/School/Company:</b>{" "}
                                                    {formData.college}
                                                </p>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <p className="text_color">
                                                    <b className="prev_bold">Pincode:</b>{" "}
                                                    {formData.zipcode}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">Country:</b>{" "}
                                                    {formData.country}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">State:</b> {formData.state}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">Native Place:</b>{" "}
                                                    {formData.native}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">Area:</b> {formData.area}
                                                </p>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <p className="text_color">
                                                    <b className="prev_bold">Parent's Name:</b>{" "}
                                                    {formData.parentsname}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">Parent's Number:</b>{" "}
                                                    {formData.mobilenumber}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">Relation:</b> Other
                                                </p>
                                            </div>

                                            <div className="col-lg-4 col-md-6">
                                                <p className="text_color">
                                                    <b className="prev_bold">Education Type:</b>{" "}
                                                    {formData.educationtype}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">Percentage:</b>{" "}
                                                    {formData.marks}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">Academic Year:</b>{" "}
                                                    {formData.academicyear}
                                                </p>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <p className="text_color">
                                                    <b className="prev_bold">Enquiry Date:</b>{" "}
                                                    {formData.enquirydate}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">Enquiry taken by:</b>{" "}
                                                    {formData.enquirytakenby}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">Course Package:</b>{" "}
                                                    {formData.coursepackage}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">Course:</b>{" "}
                                                    {formData.courses}
                                                </p>
                                            </div>

                                            <div className="col-lg-4 col-md-6">
                                                {/* <p className="text_color">
                            <b className="prev_bold">Lead Source:</b> 12345
                          </p> */}
                                                <p className="text_color">
                                                    <b className="prev_bold">Branch:</b> {formData.branch}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">Mode Of Training:</b>{" "}
                                                    {formData.modeoftraining}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">Admission Date:</b>{" "}
                                                    {formData.admissiondate}
                                                </p>
                                            </div>

                                            <div className="col-lg-4 col-md-6">
                                                <p className="text_color">
                                                    <b className="prev_bold"> Validity Start Date:</b>{" "}
                                                    {formData.validitystartdate}
                                                </p>
                                                <p className="text_color">
                                                    <b className="prev_bold">Validity End Date:</b>{" "}
                                                    {formData.validityenddate}
                                                </p>
                                                {formData.admissionremarks && (
                                                    <p className="text_color">
                                                        <p className="prev_bold">Remarks:</p>
                                                        {formData.admissionremarks}
                                                    </p>
                                                )}
                                                {Array.isArray(formData?.assets) &&
                                                    formData.assets.length > 0 && (
                                                        <div className="text_color">
                                                            <p className="prev_bold">Assets:</p>

                                                            {/* <p>{formData.assets}</p> */}
                                                            {formData.assets.map((item, index) => (
                                                                <span key={index}>
                                                                    {index === formData.assets.length - 1
                                                                        ? item
                                                                        : `${item}, `}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="controls d-flex justify-content-between  mt-4">
                                        <div>
                                            {activeTab !== 1 && (
                                                <Button
                                                    type="button"
                                                    className="btn control_prev_btn reg_btn"
                                                    onClick={handlePrev}
                                                    icon={<IoMdArrowBack className="button_icons" />}
                                                >
                                                    Go Back
                                                </Button>
                                            )}
                                        </div>

                                        <div>
                                            {activeTab === 5 && (
                                                <Button
                                                    type="submit"
                                                    className="btn  right btn_primary "
                                                    onClick={handleSubmit}
                                                    icon={<IoMdCheckmark />}
                                                >
                                                    Submit
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                            {/* Preview ENd */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditStudent;
